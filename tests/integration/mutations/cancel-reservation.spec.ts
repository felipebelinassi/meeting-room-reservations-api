import moment from 'moment';
import { v4 as uuidV4 } from 'uuid';
import createModels from '../../../src/database/models';
import services from '../../../src/services';
import roomsMock from '../../doubles/mocks/rooms.json';

const { User, Room, Reservation } = createModels();

describe('Cancel reservation integration tests', () => {
  const defaultUser = {
    userId: uuidV4(),
    firstName: 'John',
    lastName: 'Doe',
    username: 'johndoe',
    email: 'johndoe@gmail.com',
    password: 'p4$$w0rd',
  };

  let token: string;

  const reservationDate = moment().add(1, 'days');

  beforeEach(async () => {
    await Reservation.destroy({ where: {} });
    await Room.destroy({ where: {} });
    await User.destroy({ where: {} });

    await Room.bulkCreate(roomsMock);
    const user = await User.create(defaultUser);
    token = services.authService.generateToken(user.toJSON() as Record<string, unknown>);
  });

  it('should let user cancel his own reservation', async () => {
    const reservation = await Reservation.create({
      roomId: roomsMock[0].roomId,
      reservedBy: defaultUser.userId,
      startAt: reservationDate.set({ hour: 8 }).format('YYYY-MM-DD HH:mm:ss'),
      endAt: reservationDate.set({ hour: 10 }).format('YYYY-MM-DD HH:mm:ss'),
    });

    const cancelReservationMutation = `
      mutation {
        cancelReservation(
          reservationId: "${reservation.reservationId}"
        ), {
          status
        }
      }
    `;

    const { body } = await global.testRequest
      .post('/graphql')
      .set({ 'x-access-token': token })
      .send({ query: cancelReservationMutation })
      .expect(200)
      .expect('Content-Type', /json/);

    expect(body.data.cancelReservation).toHaveProperty('status', expect.any(String));
  });

  it('should return an error if reservation is not found', async () => {
    const cancelReservationMutation = `
      mutation {
        cancelReservation(
          reservationId: "${uuidV4()}"
        ), {
          status
        }
      }
    `;

    const { body } = await global.testRequest
      .post('/graphql')
      .set({ 'x-access-token': token })
      .send({ query: cancelReservationMutation })
      .expect(200)
      .expect('Content-Type', /json/);

    expect(body).toHaveProperty('errors', expect.any(Array));
    expect(body.data.cancelReservation).toEqual(null);
  });

  it('should not cancel reservation if its already occurring', async () => {
    const reservation = await Reservation.create({
      roomId: roomsMock[0].roomId,
      reservedBy: defaultUser.userId,
      startAt: moment().subtract(15, 'minutes').format('YYYY-MM-DD HH:mm:ss'),
      endAt: moment().add(1, 'hours').format('YYYY-MM-DD HH:mm:ss'),
    });

    const cancelReservationMutation = `
      mutation {
        cancelReservation(
          reservationId: "${reservation.reservationId}"
        ), {
          status
        }
      }
    `;

    const { body } = await global.testRequest
      .post('/graphql')
      .set({ 'x-access-token': token })
      .send({ query: cancelReservationMutation })
      .expect(200)
      .expect('Content-Type', /json/);

    expect(body).toHaveProperty('errors', expect.any(Array));
    expect(body.data.cancelReservation).toEqual(null);
  });
});