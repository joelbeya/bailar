import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventsService } from './events.service';
import { Event } from '../../entities/event.entity';

describe('EventsService', () => {
  let service: EventsService;
  let repository: Repository<Event>;

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    createQueryBuilder: jest.fn(() => ({
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockResolvedValue([
        { id: '1', title: 'Test Event 1' },
        { id: '2', title: 'Test Event 2' },
      ]),
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventsService,
        {
          provide: getRepositoryToken(Event),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<EventsService>(EventsService);
    repository = module.get<Repository<Event>>(getRepositoryToken(Event));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create an event', async () => {
      const eventData = {
        title: 'Test Event',
        description: 'Test Description',
        startDate: new Date(),
        endDate: new Date(),
        location: 'Test Location',
      };

      const savedEvent = { id: '1', ...eventData };
      mockRepository.create.mockReturnValue(eventData);
      mockRepository.save.mockResolvedValue(savedEvent);

      const result = await service.create(eventData);
      expect(result).toEqual(savedEvent);
      expect(mockRepository.create).toHaveBeenCalledWith(eventData);
      expect(mockRepository.save).toHaveBeenCalledWith(eventData);
    });
  });

  describe('findAll', () => {
    it('should return an array of events', async () => {
      const events = [
        { id: '1', title: 'Event 1' },
        { id: '2', title: 'Event 2' },
      ];
      mockRepository.find.mockResolvedValue(events);

      const result = await service.findAll();
      expect(result).toEqual(events);
      expect(mockRepository.find).toHaveBeenCalled();
    });
  });

  describe('search', () => {
    it('should search events with filters', async () => {
      const query = 'test';
      const filters = {
        category: 'music',
        startDate: new Date(),
        location: 'Paris',
      };

      const events = [
        { id: '1', title: 'Test Event 1' },
        { id: '2', title: 'Test Event 2' },
      ];

      const result = await service.search(query, filters);
      expect(result).toEqual(events);
      expect(mockRepository.createQueryBuilder).toHaveBeenCalled();
    });
  });
});
