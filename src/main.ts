import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import * as dotenv from 'dotenv';
import { join } from 'path';
import helmet from 'fastify-helmet';
import { contentParser } from 'fastify-multer';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import line from '@line/bot-sdk';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  const prefix = '/api/mes';
  app.setGlobalPrefix(prefix);
  app.enableCors({
    origin: '*',
    methods: '*',
  });

  const options = new DocumentBuilder()
    .setTitle('MES Service')
    .setDescription('MES service')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);

  app.register(helmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [`'self'`],
        styleSrc: [`'self'`, `'unsafe-inline'`],
        imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
        scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
      },
    },
  });
  app.register(contentParser);

  app.useStaticAssets({ root: join(__dirname, '../../backend') });

  const microserviceMqtt = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.MQTT,
    options: {
      url: 'mqtt://broker.hivemq.com:1883',
    },
  });

  SwaggerModule.setup(`${prefix}/swagger`, app, document);
  await app.startAllMicroservices();
  await app.listen(+process.env.PORT || 3000, '0.0.0.0');
}
bootstrap();

// async function mqtt() {
//   const appMqtt = await NestFactory.createMicroservice(AppModule, {
//     transport: Transport.MQTT,
//     options: {
//       // url: 'mqtt://90.10.100.27:21883',
//       url: 'mqtt://broker.hivemq.com:1883',
//     },
//   });
//   await appMqtt.listen();
// }
// mqtt();
