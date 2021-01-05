import moment from 'moment';
import createReservation from '../../../../src/graphql/mutations/create-reservation';
import mockContext from '../../../doubles/spys/context';
import decodedUserJwt from '../../../doubles/mocks/decoded-user-jwt.json';

jest.mock('../../../../src/middlewares/authentication', () => 
  jest.fn(() => decodedUserJwt));

const { repositories: mockRepositories } = mockContext;

mockContext.request.headers = {
  'x-access-token': '5e13f245e13f24a-4b0c-421f-9943-9806c8de1374a',
};

describe('Create reservation mutation unit tests', () => {
  it('should create and return a new reservation', async () => {
    const fakeParams = { 
      input: {
        roomId: '5e13f24a-4b0c-421f-9943-9806c8de1374',
        start: moment().add(15, 'minutes').format(),
        end: moment().add(30, 'minutes').format(),
      },
    };

    const reservation = {
      reservationId: '3444b43b-119f-41ca-a7a2-36fb0dd8c27b',
      startAt: '08:00:00',
      endAt: '17:00:00',
    };

    mockRepositories.room.isRoomOpen.mockResolvedValue(true);
    mockRepositories.reservation.create.mockResolvedValue([reservation, true]);

    const response = await createReservation.resolve(undefined, fakeParams, mockContext);
    expect(response).toEqual(reservation);
  });

  it('should throw error if date range is invalid', async () => {
    const pastStartDay = moment().subtract(1, 'days').format();
    const currentDay = moment().format();

    const fakeParams = { 
      input: {
        roomId: '5e13f24a-4b0c-421f-9943-9806c8de1374',
        start: pastStartDay,
        end: currentDay,
      },
    };

    await expect(() => createReservation.resolve(undefined, fakeParams, mockContext))
      .rejects.toThrow(Error);
  });

  it('should throw error if requested room is closed', async () => {
    const fakeParams = { 
      input: {
        roomId: '5e13f24a-4b0c-421f-9943-9806c8de1374',
        start: moment().add(15, 'minutes').format(),
        end: moment().add(30, 'minutes').format(),
      },
    };

    mockRepositories.room.isRoomOpen.mockResolvedValue(false);

    await expect(() => createReservation.resolve(undefined, fakeParams, mockContext))
      .rejects.toThrow(Error);
  });

  it('should throw error if room is not available at requested period', async () => {
    const fakeParams = { 
      input: {
        roomId: '5e13f24a-4b0c-421f-9943-9806c8de1374',
        start: moment().add(15, 'minutes').format(),
        end: moment().add(30, 'minutes').format(),
      },
    };

    mockRepositories.room.isRoomOpen.mockResolvedValue(true);
    mockRepositories.reservation.create.mockResolvedValue([{}, false]);

    await expect(() => createReservation.resolve(undefined, fakeParams, mockContext))
      .rejects.toThrow(Error);
  });
});