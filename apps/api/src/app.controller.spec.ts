import { Test, type TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Création d'un mock typé pour AppService
const createMockAppService = (): jest.Mocked<AppService> => ({
  // Utilisation d'une fonction fléchée pour éviter les problèmes de liaison de 'this'
  getHello: jest.fn().mockImplementation((): string => 'Hello World!'),
});

describe('AppController', () => {
  let appController: AppController;
  let moduleFixture: TestingModule;
  let mockAppService: jest.Mocked<AppService>;

  beforeEach(async () => {
    // Initialisation du mock
    mockAppService = createMockAppService();

    // Configuration du module de test avec typage explicite
    const testModuleBuilder = Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: mockAppService,
        },
      ],
    });

    // Compilation du module
    const testModule = await testModuleBuilder.compile();

    // Initialisation des références
    moduleFixture = testModule;

    // Utilisation d'une fonction fléchée pour éviter les problèmes de liaison de 'this'
    const getAppController = () => testModule.get<AppController>(AppController);
    appController = getAppController();
  });

  afterEach(async () => {
    if (moduleFixture) {
      await moduleFixture.close();
    }
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      // Given
      const expected = 'Hello World!';

      // When
      const result = appController.getHello();

      // Then
      expect(result).toBe(expected);
      expect(mockAppService.getHello).toHaveBeenCalled();
    });
  });
});
