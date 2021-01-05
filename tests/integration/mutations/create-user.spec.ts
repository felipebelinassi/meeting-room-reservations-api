describe('Create user integration tests', () => {
  const defaultUser = {
    firstName: 'John',
    lastName: 'Doe',
    username: 'johndoe',
    email: 'johndoe@gmail.com',
    password: 'p4$$w0rd',
  };

  it('should create a new user in database - John Doe', async () => {
    const createUserMutation = `
      mutation {
        createUser(input: {
          firstName: "${defaultUser.firstName}"
          lastName: "${defaultUser.lastName}"
          username: "${defaultUser.username}"
          email: "${defaultUser.email}"
          password: "${defaultUser.password}"
        }), {
          userId
          firstName
          lastName
          username
          email
          password
        }
      }
    `;

    const { body } = await global.testRequest
      .post('/graphql')
      .send({ query: createUserMutation })
      .expect(200)
      .expect('Content-Type', /json/);

    expect(body.data.createUser).toEqual({
      ...defaultUser,
      userId: expect.any(String),
      password: '******',
    });
  });

  it('should not create user with duplicated username - johndoe', async () => {
    const createUserMutation = `
      mutation {
        createUser(input: {
          firstName: "James"
          lastName: "Jameson"
          username: "${defaultUser.username}"
          email: "jamesjameson@gmail.com"
          password: "ot3rhp4$$w0rd"
        }), {
          userId
          firstName
          lastName
          username
          email
          password
        }
      }
    `;

    const { body } = await global.testRequest
      .post('/graphql')
      .send({ query: createUserMutation })
      .expect(200)
      .expect('Content-Type', /json/);

    expect(body).toHaveProperty('errors', expect.any(Array));
    expect(body.data.createUser).toEqual(null);
  });

  it('should not create user with duplicated email - johndoe@gmail.com', async () => {
    const createUserMutation = `
      mutation {
        createUser(input: {
          firstName: "John"
          lastName: "Jones"
          username: "johnjones_1998"
          email: "${defaultUser.email}"
          password: "john_p4$$w0rd"
        }), {
          userId
          firstName
          lastName
          username
          email
          password
        }
      }
    `;

    const { body } = await global.testRequest
      .post('/graphql')
      .send({ query: createUserMutation })
      .expect(200)
      .expect('Content-Type', /json/);

    expect(body).toHaveProperty('errors', expect.any(Array));
    expect(body.data.createUser).toEqual(null);
  });
});