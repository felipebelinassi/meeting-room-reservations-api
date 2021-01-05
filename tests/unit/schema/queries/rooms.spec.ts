import moment from 'moment';
import availableRooms from '../../../../src/graphql/queries/rooms';
import mockContext from '../../../doubles/spys/context';
import decodedUserJwt from '../../../doubles/mocks/decoded-user-jwt.json';

jest.mock('../../../../src/middlewares/authentication', () => 
  jest.fn(() => decodedUserJwt));

const { repositories: mockRepositories } = mockContext;

mockContext.request.headers = {
  'x-access-token': '5e13f245e13f24a-4b0c-421f-9943-9806c8de1374a',
};

describe('Available rooms query unit tests', () => {
  it('should return list of all rooms if range is not informed', async () => {
    const fakeParams = {};

    const rooms = [
      {
        roomId: 'e3d1eeb1-a84b-4b07-aa5e-cd38006082af',
        description: 'Mock room 1',
        openAt: '08:00:00',
        closeAt: '17:00:00',
      },
      {
        roomId: '2dc783d9-cb82-43de-b4fd-548353182b0e',
        description: 'Mock room 2',
        openAt: '10:00:00',
        closeAt: '19:00:00',
      },
    ];

    mockRepositories.room.getRooms.mockResolvedValue(rooms);

    const response = await availableRooms.resolve(undefined, fakeParams, mockContext);
    expect(response).toEqual(rooms);
  });

  it('should return list of available rooms by range', async () => {
    const fakeParams = {
      from: moment().add(1, 'hours').format(),
      to: moment().add(2, 'hours').format(),
    };

    const rooms = [
      {
        roomId: 'e3d1eeb1-a84b-4b07-aa5e-cd38006082af',
        description: 'Mock room 1',
        openAt: '08:00:00',
        closeAt: '17:00:00',
      },
    ];

    mockRepositories.room.getAvailable.mockResolvedValue(rooms);

    const response = await availableRooms.resolve(undefined, fakeParams, mockContext);
    expect(response).toEqual(rooms);
  });

  it('should throw an error if time range informed is invalid', async () => {
    const pastStartDay = moment().subtract(1, 'days').format();
    const currentDay = moment().format();

    const fakeParams = { 
      from: pastStartDay,
      to: currentDay,
    };

    const response = availableRooms.resolve(undefined, fakeParams, mockContext);
    await expect(() => response).rejects.toThrow(Error);
  });
});