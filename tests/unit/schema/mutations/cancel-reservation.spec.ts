import moment from 'moment';
import cancelReservation from '../../../../src/graphql/mutations/cancel-reservation';
import mockContext from '../../../doubles/spys/context';
import decodedUserJwt from '../../../doubles/mocks/decoded-user-jwt.json';

jest.mock('../../../../src/middlewares/authentication', () => 
  jest.fn(() => decodedUserJwt));

const { repositories: mockRepositories } = mockContext;

mockContext.request.headers = {
  'x-access-token': '5e13f245e13f24a-4b0c-421f-9943-9806c8de1374a',
};

describe('Cancel reservation mutation unit tests', () => {
  it('should cancel and remove reservation from database', async () => {
    const fakeParams = { 
      reservationId: 'db78cf2c-876e-4f00-b2c6-f228eb823b19',
    };

    const futureStartAt = moment().add(1, 'days').format();

    const reservation = {
      reservationId: '3444b43b-119f-41ca-a7a2-36fb0dd8c27b',
      startAt: '08:00:00',
      endAt: '17:00:00',
      destroy: jest.fn(),
      getDataValue: jest.fn().mockReturnValue(futureStartAt),
    };

    mockRepositories.reservation.get.mockResolvedValue(reservation);

    const response = await cancelReservation.resolve(undefined, fakeParams, mockContext);
    expect(response).toEqual(undefined);
    expect(reservation.destroy).toHaveBeenCalled();
  });

  it('should throw an error if reservation is not found', async () => {
    const fakeParams = { 
      reservationId: 'db78cf2c-876e-4f00-b2c6-f228eb823b19',
    };

    mockRepositories.reservation.get.mockResolvedValue(null);

    const response = cancelReservation.resolve(undefined, fakeParams, mockContext);
    await expect(() => response).rejects.toThrow(Error);
  });

  it('should throw an error if reservation start time is is the past', async () => {
    const fakeParams = { 
      reservationId: 'db78cf2c-876e-4f00-b2c6-f228eb823b19',
    };

    const pastStartAt = moment().subtract(15, 'minutes').format();

    const reservation = {
      reservationId: '3444b43b-119f-41ca-a7a2-36fb0dd8c27b',
      startAt: '08:00:00',
      endAt: '17:00:00',
      destroy: jest.fn(),
      getDataValue: jest.fn().mockReturnValue(pastStartAt),
    };

    mockRepositories.reservation.get.mockResolvedValue(reservation);

    const response = cancelReservation.resolve(undefined, fakeParams, mockContext);
    await expect(() => response).rejects.toThrow(Error);
  });
});