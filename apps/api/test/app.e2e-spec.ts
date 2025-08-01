import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/ (GET)', async () => {
    // Utilisation de l'API HTTP native de Node.js avec une approche plus simple
    const http = await import('http');

    return new Promise<void>((resolve) => {
      const req = http.request(
        {
          hostname: 'localhost',
          port: 3000,
          path: '/',
          method: 'GET',
        },
        (res) => {
          // Vérification du code de statut
          expect(res.statusCode).toBe(200);

          // Lecture de la réponse
          const chunks: Buffer[] = [];
          res.on('data', (chunk) => chunks.push(chunk));

          res.on('end', () => {
            const data = Buffer.concat(chunks).toString();
            expect(data).toBe('Hello World!');
            resolve();
          });
        },
      );

      // Gestion simplifiée des erreurs
      req.on('error', () => {
        // En cas d'erreur, le test échouera avec le timeout
        // C'est acceptable pour un test simple
        console.error('Erreur lors de la requête de test');
      });

      req.end();
    });
  });
});
