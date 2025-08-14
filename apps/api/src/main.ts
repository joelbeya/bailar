import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {Logger} from "@nestjs/common";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const port = process.env.PORT || 3001; // Port par défaut rétabli à 3001
    await app.listen(port);
    Logger.log(`Application is running on: http://localhost:${port}`);
}

bootstrap().catch((err) => {
    Logger.error('Failed to start the application', err);
    process.exit(1);
});
