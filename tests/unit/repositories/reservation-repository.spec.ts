import loggerMock from '../../doubles/mocks/logger';
import createRepositories from '../../../src/repositories';

const findAllSpy = jest.fn();
const findOrCreateSpy = jest.fn();
const findOneSpy = jest.fn();

jest.mock('../../../src/database/models', () => 
  jest.fn(() => ({
    Reservation: {
      findOrCreate: findOrCreateSpy,
      findOne: findOneSpy,
      findAll: findAllSpy,
    },
    Room: {},
    User: {},
  })),
);

describe('Reservation repository unit tests', () => {
  describe('Get list of reservations', () => {
    it('should return a list of reservations by userId', async () => {
      const { reservation: reservationRepository } = createRepositories(loggerMock);
  
      const expectedResponse = [
        {
          reservationId: '3444b43b-119f-41ca-a7a2-36fb0dd8c27b',
          startAt: '08:00:00',
          endAt: '17:00:00',
        },
        {
          roomId: '7c94a883-e560-4c85-b1b5-f5a70160e92e',
          startAt: '09:00:00',
          endAt: '15:00:00',
        },
      ];
  
      findAllSpy.mockResolvedValue(expectedResponse);
  
      const reservations = await reservationRepository.getReservations({
        userId: '60943fea-5ef9-4706-9ba5-e1a539e848df',
        date: new Date().toString(),
      });
      expect(reservations).toEqual(expectedResponse);
    });

    it('should return a list of reservations by roomId', async () => {
      const { reservation: reservationRepository } = createRepositories(loggerMock);
  
      const expectedResponse = [
        {
          reservationId: '3444b43b-119f-41ca-a7a2-36fb0dd8c27b',
          startAt: '08:00:00',
          endAt: '17:00:00',
        },
        {
          roomId: '7c94a883-e560-4c85-b1b5-f5a70160e92e',
          startAt: '09:00:00',
          endAt: '15:00:00',
        },
      ];
  
      findAllSpy.mockResolvedValue(expectedResponse);
  
      const reservations = await reservationRepository.getReservations({
        roomId: '60943fea-5ef9-4706-9ba5-e1a539e848df',
        date: new Date().toString(),
      });
      expect(reservations).toEqual(expectedResponse);
    });
  });

  describe('Create a new reservation', () => {
    it('should find or create a new reservation and return results', async () => {
      const { reservation: reservationRepository } = createRepositories(loggerMock);
  
      const expectedResponse = [
        true,
        {
          reservationId: '3444b43b-119f-41ca-a7a2-36fb0dd8c27b',
          startAt: '08:00:00',
          endAt: '17:00:00',
        },
      ];

  
      findOrCreateSpy.mockResolvedValue(expectedResponse);
  
      const reservation = await reservationRepository.create({
        roomId: 'db78cf2c-876e-4f00-b2c6-f228eb823b19',
        userId: 'f083e48c-6423-48b1-ba28-d23052e97a88',
        startTime: new Date().toString(),
        endTime: new Date().toString(),
      });
      expect(typeof reservation).toBe(Array);
      expect(reservation).toEqual(expectedResponse);
    });
  });

  describe('Get single reservation', () => {
    it('should return a single user reservation', async () => {
      const { reservation: reservationRepository } = createRepositories(loggerMock);
  
      const expectedResponse = {
        reservationId: '3444b43b-119f-41ca-a7a2-36fb0dd8c27b',
        startAt: '08:00:00',
        endAt: '17:00:00',
      };
  
      const fakeReservationId = '3444b43b-119f-41ca-a7a2-36fb0dd8c27b';
      const fakeUserId = 'f083e48c-6423-48b1-ba28-d23052e97a88';
  
      findOneSpy.mockResolvedValue(null);
  
      const reservation = await reservationRepository.get(fakeReservationId, fakeUserId);
      expect(reservation).toEqual(expectedResponse);
    });
  });
});
