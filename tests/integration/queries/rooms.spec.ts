import moment from 'moment';
import createModels from '../../../src/database/models';
import roomsMock from '../../doubles/mocks/rooms.json';

const { Room } = createModels();

describe('Get rooms integration tests', () => {
  beforeEach(async () => {
    await Room.destroy({ where: {} });
    await Room.bulkCreate(roomsMock);
  });

  it('should return list of all rooms if time range filter is not informed', async () => {
    const roomsQuery = `
      query {
        rooms, {
          roomId
          description
          openAt
          closeAt
        }
      }
    `;

    const { body } = await global.testRequest.post('/graphql').send({ query: roomsQuery }).expect(200).expect('Content-Type', /json/);

    expect(body.data.rooms.length).toEqual(2);
    expect(body.data.rooms).toEqual(roomsMock);
  });

  it('should list rooms open at request time range', async () => {
    const fromDate = moment().add(1, 'days').set({ hour: 8 }).format('YYYY-MM-DDTHH:mm');
    const toDate = moment().add(1, 'days').set({ hour: 10 }).format('YYYY-MM-DDTHH:mm');

    const roomsQuery = `
      query {
        rooms(
          from: "${fromDate}"
          to: "${toDate}"
        ), {
          roomId
          description
          openAt
          closeAt
        }
      }
    `;

    const { body } = await global.testRequest.post('/graphql').send({ query: roomsQuery }).expect(200).expect('Content-Type', /json/);

    expect(body.data.rooms.length).toEqual(1);
    expect(body.data.rooms[0]).toEqual(roomsMock[0]);
  });

  it('should return empty room list if none is open at requested period', async () => {
    const fromDate = moment().add(1, 'days').set({ hour: 21 }).format('YYYY-MM-DDTHH:mm');
    const toDate = moment().add(1, 'days').set({ hour: 22 }).format('YYYY-MM-DDTHH:mm');

    const roomsQuery = `
      query {
        rooms(
          from: "${fromDate}"
          to: "${toDate}"
        ), {
          roomId
          description
          openAt
          closeAt
        }
      }
    `;

    const { body } = await global.testRequest.post('/graphql').send({ query: roomsQuery }).expect(200).expect('Content-Type', /json/);

    expect(body.data.rooms).toEqual([]);
  });
});
