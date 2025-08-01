import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3001); // Changement du port par défaut à 3001
}

bootstrap().catch((err) => {
  console.error('Failed to start the application', err);
  process.exit(1);
});
