import supertest from 'supertest';
import moment from 'moment';
import { app } from '../../../src/app';
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
  });

  it('should return room schedule by informed date', async () => {
    const formattedDate = reservationDate.format('YYYY-MM-DD');

    const roomScheduleQuery = `
      query {
        roomSchedule(
          roomId: "${roomsMock[0].roomId}"
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

    const { body } = await supertest(app)
      .post('/graphql')
      .send({ query: roomScheduleQuery })
      .expect(200)
      .expect('Content-Type', /json/);

    expect(body.data.roomSchedule).toHaveProperty('date', formattedDate);
    expect(body.data.roomSchedule).toHaveProperty('schedule', expect.any(Array));
    expect(body.data.roomSchedule.schedule.length).toEqual(1);
  });

  it('should return room today schedule if date is not informed', async () => {
    const roomScheduleQuery = `
      query {
        roomSchedule(
          roomId: "${roomsMock[1].roomId}"
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

    const todayDate = moment().format('YYYY-MM-DD');

    const { body } = await supertest(app)
      .post('/graphql')
      .send({ query: roomScheduleQuery })
      .expect(200)
      .expect('Content-Type', /json/);

    expect(body.data.roomSchedule).toHaveProperty('date', todayDate);
    expect(body.data.roomSchedule.schedule.length).toEqual(0);
  });
});