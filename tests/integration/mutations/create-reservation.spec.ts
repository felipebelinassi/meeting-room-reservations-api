import moment from 'moment';
import createModels from '../../../src/database/models';
import services from '../../../src/services';
import roomsMock from '../../doubles/mocks/rooms.json';

const { User, Room, Reservation } = createModels();

const setMockDate = (date: string, hours: number, minutes = 0) =>
  moment(date).set({ hours, minutes }).format('YYYY-MM-DDTHH:mm');

describe('Create reservation integration tests', () => {
  const defaultUser = {
    firstName: 'John',
    lastName: 'Doe',
    username: 'johndoe',
    email: 'johndoe@gmail.com',
    password: 'p4$$w0rd',
  };

  let token: string;
  const reservationDate = moment().add(1, 'days').format();

  beforeAll(async () => {
    await Reservation.destroy({ where: {} });
    await Room.destroy({ where: {} });
    await User.destroy({ where: {} });

    await Room.bulkCreate(roomsMock);
    const user = await User.create(defaultUser);
    token = services.authService.generateToken(user.toJSON() as Record<string, unknown>);
  });

  describe('when user 1 reservating room 1', () => {
    it('should create new reservation between 09:00am and 12:00am', async () => {
      const startDate = setMockDate(reservationDate, 9);
      const endDate = setMockDate(reservationDate, 12);
  
      const createReservationMutation = `
        mutation {
          createReservation(input: {
            roomId: "${roomsMock[0].roomId}"
            start: "${startDate}"
            end: "${endDate}"
          }), {
            reservationId
            roomId
            reservedBy
            startAt
            endAt
          }
        }
      `;
  
      const { body } = await global.testRequest
        .post('/graphql')
        .set({ 'x-access-token': token })
        .send({ query: createReservationMutation })
        .expect(200)
        .expect('Content-Type', /json/);
  
      expect(body.data.createReservation).toEqual(
        expect.objectContaining({
          reservationId: expect.any(String),
          startAt: '09:00:00',
          endAt: '12:00:00',
        }),
      );
    });
  
    it('should block a reservation between 08:00am and 10:00am', async () => {
      const startDate = setMockDate(reservationDate, 8);
      const endDate = setMockDate(reservationDate, 10);
  
      const createReservationMutation = `
        mutation {
          createReservation(input: {
            roomId: "${roomsMock[0].roomId}"
            start: "${startDate}"
            end: "${endDate}"
          }), {
            reservationId
            roomId
            reservedBy
            startAt
            endAt
          }
        }
      `;
  
      const { body } = await global.testRequest
        .post('/graphql')
        .set({ 'x-access-token': token })
        .send({ query: createReservationMutation })
        .expect(200)
        .expect('Content-Type', /json/);
  
      expect(body).toHaveProperty('errors', expect.any(Array));
      expect(body.data.createReservation).toEqual(null);
    });

    it('should allow a reservation from 12:00pm to 15:00pm', async () => {
      const startDate = setMockDate(reservationDate, 12);
      const endDate = setMockDate(reservationDate, 15);
  
      const createReservationMutation = `
        mutation {
          createReservation(input: {
            roomId: "${roomsMock[0].roomId}"
            start: "${startDate}"
            end: "${endDate}"
          }), {
            reservationId
            roomId
            reservedBy
            startAt
            endAt
          }
        }
      `;
  
      const { body } = await global.testRequest
        .post('/graphql')
        .set({ 'x-access-token': token })
        .send({ query: createReservationMutation })
        .expect(200)
        .expect('Content-Type', /json/);
  
      expect(body.data.createReservation).toEqual(
        expect.objectContaining({
          reservationId: expect.any(String),
          startAt: '12:00:00',
          endAt: '15:00:00',
        }),
      );
    });

    it('should block a reservation beyond 16:00pm (closed room)', async () => {
      const startDate = setMockDate(reservationDate, 16);
      const endDate = setMockDate(reservationDate, 17);
  
      const createReservationMutation = `
        mutation {
          createReservation(input: {
            roomId: "${roomsMock[0].roomId}"
            start: "${startDate}"
            end: "${endDate}"
          }), {
            reservationId
            roomId
            reservedBy
            startAt
            endAt
          }
        }
      `;
  
      const { body } = await global.testRequest
        .post('/graphql')
        .set({ 'x-access-token': token })
        .send({ query: createReservationMutation })
        .expect(200)
        .expect('Content-Type', /json/);
  
      expect(body).toHaveProperty('errors', expect.any(Array));
      expect(body.data.createReservation).toEqual(null);
    });
  });

  describe('when user 1 reservating room 2', () => {
    it('should block a reservation between 13:00pm and 14:00pm', async () => {
      const startDate = setMockDate(reservationDate, 13);
      const endDate = setMockDate(reservationDate, 14);
  
      const createReservationMutation = `
        mutation {
          createReservation(input: {
            roomId: "${roomsMock[1].roomId}"
            start: "${startDate}"
            end: "${endDate}"
          }), {
            reservationId
            roomId
            reservedBy
            startAt
            endAt
          }
        }
      `;
  
      const { body } = await global.testRequest
        .post('/graphql')
        .set({ 'x-access-token': token })
        .send({ query: createReservationMutation })
        .expect(200)
        .expect('Content-Type', /json/);
  
      expect(body).toHaveProperty('errors', expect.any(Array));
      expect(body.data.createReservation).toEqual(null);
    });
  });
});