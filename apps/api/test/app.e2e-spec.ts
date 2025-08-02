import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './../src/app.module';
import * as http from 'http';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let server: http.Server;
  let moduleFixture: TestingModule;

  beforeAll(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    
    // Démarrer le serveur sur un port aléatoire
    server = app.getHttpServer();
    await app.listen(0);
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ (GET)', () => {
    const address = server.address();
    if (!address || typeof address === 'string') {
      throw new Error('Could not get server address');
    }
    
    const port = typeof address === 'string' ? 3000 : address.port;

    return new Promise<void>((resolve, reject) => {
      const req = http.request(
        {
          hostname: 'localhost',
          port,
          path: '/',
          method: 'GET',
        },
        (res) => {
          expect(res.statusCode).toBe(200);

          const chunks: Buffer[] = [];
          res.on('data', (chunk: Buffer) => chunks.push(chunk));

          res.on('end', () => {
            const data = Buffer.concat(chunks).toString();
            expect(data).toBe('Hello World!');
            resolve();
          });
        }
      );

      req.on('error', (error: Error) => {
        reject(error);
      });

      req.end();
    });
  });
});
