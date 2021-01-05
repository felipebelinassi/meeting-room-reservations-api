import supertest from 'supertest';
import { app } from '../../../src/app';
import createModels from '../../../src/database/models';

const { User } = createModels();

describe('Authenticate user integration tests', () => {
  const defaultUser = {
    firstName: 'John',
    lastName: 'Doe',
    username: 'johndoe',
    email: 'johndoe@gmail.com',
    password: 'p4$$w0rd',
  };

  beforeEach(async () => {
    await User.destroy({ where: {} });
    await User.create(defaultUser);
  });

  it('should generate a token for a valid user', async () => {
    const loginMutation = `
      mutation {
        login(
          email: "${defaultUser.email}"
          password: "${defaultUser.password}"
        ), {
          email
          token
        }
      }
    `;

    const { body } = await supertest(app)
      .post('/graphql')
      .send({ query: loginMutation })
      .expect(200)
      .expect('Content-Type', /json/);

    expect(body.data.login).toEqual({
      email: defaultUser.email,
      token: expect.any(String),
    });
  });

  it('should return an error if user is not found', async () => {
    const loginMutation = `
      mutation {
        login(
          email: "user@mail.com"
          password: "us3r_p4$$w0rd"
        ), {
          email
          token
        }
      }
    `;

    const { body } = await supertest(app)
      .post('/graphql')
      .send({ query: loginMutation })
      .expect(200)
      .expect('Content-Type', /json/);

    expect(body).toHaveProperty('errors', expect.any(Array));
    expect(body.data.login).toEqual(null);
  });

  it('should return an error when user if found but password does not match', async () => {
    const loginMutation = `
      mutation {
        login(
          email: "${defaultUser.email}"
          password: "us3r_p4$$w0rd"
        ), {
          email
          token
        }
      }
    `;

    const { body } = await supertest(app)
      .post('/graphql')
      .send({ query: loginMutation })
      .expect(200)
      .expect('Content-Type', /json/);

    expect(body).toHaveProperty('errors', expect.any(Array));
    expect(body.data.login).toEqual(null);
  });
});