import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { ValidationPipe } from "@nestjs/common";


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const port:any = configService.get<string | number>("PORT");

  app.useGlobalPipes(new ValidationPipe({
    transform: true, // Ensures input is transformed to the correct types
    whitelist: true, // Removes properties not defined in the DTO
  }));

  await app.listen(port);

  console.log(`App running on ${port}`);

}

bootstrap();
