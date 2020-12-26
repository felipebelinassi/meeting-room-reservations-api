let id = 0;

interface User {
  id: number;
  name: string;
  age: number;
}

const providers = {
  users: [] as User[],
};

const resolvers = {
  user(user: User) {
    return providers.users.find(item => item.id === Number(user.id));
  },
  users() {
    return providers.users;
  },
  createUser({ name, age }: User) {
    const user = {
      id: id += 1,
      name,
      age,
    };

    providers.users.push(user);

    return user;
  },
};

export default resolvers;
