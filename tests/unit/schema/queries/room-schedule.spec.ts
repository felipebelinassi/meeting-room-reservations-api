import moment from 'moment';
import roomSchedule from '../../../../src/graphql/queries/room-schedule';
import mockContext from '../../../doubles/spys/context';
import decodedUserJwt from '../../../doubles/mocks/decoded-user-jwt.json';

jest.mock('../../../../src/middlewares/authentication', () => 
  jest.fn(() => decodedUserJwt));

const { repositories: mockRepositories } = mockContext;

mockContext.request.headers = {
  'x-access-token': '5e13f245e13f24a-4b0c-421f-9943-9806c8de1374a',
};

describe('Room schedule query unit tests', () => {
  it('should return a valid room schedule', async () => {
    const fakeParams = { 
      roomId: '331a0691-ae92-438a-b7c4-e6e7641b1fb3',
      date: moment().format('YYYY-MM-DD'),
    };

    const reservations = [{
      reservationId: '3444b43b-119f-41ca-a7a2-36fb0dd8c27b',
      startAt: '08:00:00',
      endAt: '17:00:00',
    }];

    mockRepositories.reservation.getReservations.mockResolvedValue(reservations);

    const response = await roomSchedule.resolve(undefined, fakeParams, mockContext);
    expect(response).toEqual({
      date: fakeParams.date,
      schedule: reservations,
    });
  });
});