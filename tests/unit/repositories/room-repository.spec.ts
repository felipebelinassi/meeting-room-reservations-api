import loggerMock from '../../doubles/mocks/logger';
import createRepositories from '../../../src/repositories';

const findAllSpy = jest.fn();
const findOneSpy = jest.fn();

jest.mock('../../../src/database/models', () => 
  jest.fn(() => ({
    Room: {
      findAll: findAllSpy,
      findOne: findOneSpy,
    },
  })),
);

describe('Room repository unit tests', () => {
  describe('Get list of rooms', () => {
    it('should return a list of rooms', async () => {
      const { room: roomRepository } = createRepositories(loggerMock);
  
      const expectedResponse = [
        {
          roomId: '3444b43b-119f-41ca-a7a2-36fb0dd8c27b',
          description: 'Mock room 1',
          openAt: '08:00:00',
          closeAt: '17:00:00',
        },
        {
          roomId: '7c94a883-e560-4c85-b1b5-f5a70160e92e',
          description: 'Mock room 2',
          openAt: '09:00:00',
          closeAt: '15:00:00',
        },
      ];
  
      findAllSpy.mockResolvedValue(expectedResponse);
  
      const rooms = await roomRepository.getRooms();
      expect(rooms).toEqual(expectedResponse);
    });
  });

  describe('Get available rooms', () => {
    it('should return available rooms based on requested period', async () => {
      const { room: roomRepository } = createRepositories(loggerMock);
  
      const expectedResponse = [
        {
          roomId: '3444b43b-119f-41ca-a7a2-36fb0dd8c27b',
          description: 'Mock room 1',
          openAt: '08:00:00',
          closeAt: '17:00:00',
        },
      ];
  
      findAllSpy.mockResolvedValue(expectedResponse);
  
      const rooms = await roomRepository.getAvailable({
        from: new Date().toString(),
        to: new Date().toString(),
        startHour: '08:00:00',
        endHour: '09:00:00',
      });
      expect(rooms).toEqual(expectedResponse);
    });
  });

  describe('Check if room is open', () => {
    it('should return false if requested room is closed or not found', async () => {
      const { room: roomRepository } = createRepositories(loggerMock);
  
      const fakeRoomId = 'ea368f7d-bd45-4342-8a14-bc00cc0c8fe9';
      const fakeStartHour = '08:00:00';
      const fakeEndHour = '10:00:00';
  
      findOneSpy.mockResolvedValue(null);
  
      const isRoomOpen = await roomRepository.isRoomOpen(
        fakeRoomId, fakeStartHour, fakeEndHour,
      );
      expect(isRoomOpen).toBeFalsy();
    });

    it('should return true if requested room is open', async () => {
      const { room: roomRepository } = createRepositories(loggerMock);
  
      const fakeRoomId = 'ea368f7d-bd45-4342-8a14-bc00cc0c8fe9';
      const fakeStartHour = '08:00:00';
      const fakeEndHour = '10:00:00';
  
      findOneSpy.mockResolvedValue({
        roomId: 'ea368f7d-bd45-4342-8a14-bc00cc0c8fe9',
        openAt: '08:00:00',
        closeAt: '17:00:00',
      });
  
      const isRoomOpen = await roomRepository.isRoomOpen(
        fakeRoomId, fakeStartHour, fakeEndHour,
      );
      expect(isRoomOpen).toBeTruthy();
    });
  });
});
