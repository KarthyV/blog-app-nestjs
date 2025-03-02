import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const port:any = configService.get<string | number>("PORT");

  await app.listen(port);

  console.log(`App running on ${port}`);

}

bootstrap();
