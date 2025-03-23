import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { BlobServiceClient } from '@azure/storage-blob';
import { ConfigService } from '@nestjs/config';
import { Readable } from 'stream';

@Injectable()
export class AzureStorageService {

    private containerName = 'profile-picture';

    constructor(private configService: ConfigService) {}

    private get blobServiceClient(): BlobServiceClient {
        const connectionString = this.configService.get<string>('AZURE_STORAGE_CONNECTION_STRING');
        if (!connectionString) {
          throw new InternalServerErrorException('Azure Storage connection string is not configured');
        }
        return BlobServiceClient.fromConnectionString(connectionString);
      }

    async uploadFile(stream: Readable, filename: string): Promise<string> {
        const containerClient = this.blobServiceClient.getContainerClient(this.containerName);
        const blobName = `${Date.now()}-${filename}`;
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);

        let contentType = 'application/octet-stream';
        if (filename.toLowerCase().endsWith('.jpg') || filename.toLowerCase().endsWith('.jpeg')) {
            contentType = 'image/jpeg';
        } else if (filename.toLowerCase().endsWith('.png')) {
            contentType = 'image/png';
        } else if (filename.toLowerCase().endsWith('.gif')) {
            contentType = 'image/gif';
        }

        await blockBlobClient.uploadStream(stream,8,2, {
            blobHTTPHeaders: {
                blobContentType: contentType
            }
        });
      
        return blockBlobClient.url;
      }
}