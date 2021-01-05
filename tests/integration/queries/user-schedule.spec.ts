import moment from 'moment';
import services from '../../../src/services';
import createModels from '../../../src/database/models';
import roomsMock from '../../doubles/mocks/rooms.json';

const { User, Room, Reservation } = createModels();

describe('Get rooms schedule integration tests', () => {
  const defaultUser = {
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

    const user = await User.create(defaultUser);
    await Room.bulkCreate(roomsMock);
    await Reservation.create({
      roomId: roomsMock[0].roomId,
      reservedBy: user.userId,
      startAt: reservationDate.set({ hour: 8 }).format('YYYY-MM-DD HH:mm:ss'),
      endAt: reservationDate.set({ hour: 10 }).format('YYYY-MM-DD HH:mm:ss'),
    });

    token = services.authService.generateToken(user.toJSON() as Record<string, unknown>);
  });

  it('should return user schedule by informed date', async () => {
    const formattedDate = reservationDate.format('YYYY-MM-DD');

    const userScheduleQuery = `
      query {
        userSchedule(
          date: "${formattedDate}"
        ), {
          date
          schedule {
            roomId
            roomDescription
            reservedBy
            reservedByName
            startAt
            endAt
          }
        }
      }
    `;

    const { body } = await global.testRequest
      .post('/graphql')
      .set({ 'x-access-token': token })
      .send({ query: userScheduleQuery })
      .expect(200)
      .expect('Content-Type', /json/);

    expect(body.data.userSchedule).toHaveProperty('date', formattedDate);
    expect(body.data.userSchedule).toHaveProperty('schedule', expect.any(Array));
    expect(body.data.userSchedule.schedule.length).toEqual(1);
  });

  it('should return user today schedule if date is not informed', async () => {
    const userScheduleQuery = `
      query {
        userSchedule, {
          date
          schedule {
            roomId
            roomDescription
            reservedBy
            reservedByName
            startAt
            endAt
          }
        }
      }
    `;

    const todayDate = moment().format('YYYY-MM-DD');

    const { body } = await global.testRequest
      .post('/graphql')
      .set({ 'x-access-token': token })
      .send({ query: userScheduleQuery })
      .expect(200)
      .expect('Content-Type', /json/);

    expect(body.data.userSchedule).toHaveProperty('date', todayDate);
    expect(body.data.userSchedule.schedule.length).toEqual(0);
  });
});