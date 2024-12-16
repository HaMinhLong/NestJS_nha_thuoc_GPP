import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  app.setGlobalPrefix('/api/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
  });

  // const configService = app.get<ConfigService>(ConfigService);
  // const swaggerConfig = configService.get<SwaggerConfig>('swagger');

  // Swagger Api
  // if (configService.get<string>('ENABLE_SWAGGER') === 'true') {
  //   const options = new DocumentBuilder()
  //     .setTitle(swaggerConfig.title || 'Nestjs')
  //     .setDescription(swaggerConfig.description || 'The nestjs API description')
  //     .setVersion(swaggerConfig.version || '1.0')
  //     .addBearerAuth()
  //     .build();
  //   const document = SwaggerModule.createDocument(app, options);
  //   const customOptions: SwaggerCustomOptions = {
  //     swaggerOptions: {
  //       persistAuthorization: true,
  //     },
  //   };
  //   SwaggerModule.setup(
  //     swaggerConfig.path || 'api',
  //     app,
  //     document,
  //     customOptions,
  //   );
  // }

  const PORT = process.env.PORT;
  await app.listen(PORT || 8080);
}
bootstrap();
