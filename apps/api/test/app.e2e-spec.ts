import { Test } from '@nestjs/testing';
import { type INestApplication } from '@nestjs/common';
import { AppModule } from './../src/app.module';
import * as http from 'http';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let server: http.Server;
  let serverPort: number;

  beforeAll(async () => {
    // Configuration du module de test
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    // Création de l'application
    app = moduleRef.createNestApplication();

    // Démarrer l'application sur un port aléatoire
    await app.init();
    server = await app.listen(0);

    // Récupérer l'adresse du serveur de manière sécurisée
    const address = server.address();
    if (!address || typeof address !== 'object') {
      throw new Error('Could not get server address');
    }

    serverPort = address.port;
  });

  afterAll(async () => {
    if (app) {
      await app.close();
    }
  });

  it('should return "Hello World!" on GET /', () => {
    return new Promise<void>((resolve, reject) => {
      // Configuration de la requête HTTP
      const requestOptions: http.RequestOptions = {
        hostname: 'localhost',
        port: serverPort,
        path: '/',
        method: 'GET',
      };

      // Gestion de la réponse
      const handleResponse = (res: http.IncomingMessage): void => {
        expect(res.statusCode).toBe(200);

        const chunks: Buffer[] = [];
        res.on('data', (chunk: Buffer) => {
          chunks.push(chunk);
        });

        res.on('end', () => {
          try {
            const data = Buffer.concat(chunks).toString('utf-8');
            expect(data).toBe('Hello World!');
            resolve();
          } catch (err) {
            if (err instanceof Error) {
              reject(err);
            } else {
              reject(new Error('An unknown error occurred'));
            }
          }
        });
      };

      // Gestion des erreurs
      const handleError = (error: Error): void => {
        reject(error);
      };

      // Envoi de la requête
      const req = http.request(requestOptions, handleResponse);
      req.on('error', handleError);
      req.end();
    });
  });
});
