import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import passport from 'passport';
import session from 'express-session';
import { ValidationPipe } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { PORT } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.use(
    session({
      secret: 'KLJeoqwjdnkNAHDi',
      resave: false,
      saveUninitialized: false,
      genid: () => randomBytes(128).toString('hex'),
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  await app
    .listen(PORT)
    .then(() => console.log(`👌  API listening at localhost: ${PORT}.`))
    .catch((error) => console.log(error));
}
bootstrap();
