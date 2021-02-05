import mongoose, { Mongoose } from 'mongoose';
import { UserDao } from '../src/daos';
import { User, UserType } from '../src/models';

describe('UserDao', () => {
  let connection: Mongoose;

  beforeAll(async () => {
    connection = await mongoose.connect(process.env.MONGO_URL || '', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  });

  afterAll(async () => {
    await connection.disconnect();
  });

  const mockUserOne = {
    firstName: 'Eli',
    lastName: 'Manning',
    username: 'nyg10', // unique constraint
    address: '1925 Giants Drive, East Rutherford, NJ 07071',
    gender: 'male' as UserType['gender']
  };

  const mockUserTwo = {
    firstName: 'Saquon',
    lastName: 'Barkley',
    username: 'nyg26', // unique constraint
    address: '1925 Giants Drive, East Rutherford, NJ 07071',
    gender: 'male' as UserType['gender']
  };

  it('gets a list of users', async () => {
    const userDao = new UserDao();

    await User.create([mockUserOne, mockUserTwo]);
    const result = await userDao.getUsers();

    expect(result?.[0].firstName).toEqual(mockUserOne.firstName);
    expect(result?.[0].lastName).toEqual(mockUserOne.lastName);
    expect(result?.[0].username).toEqual(mockUserOne.username);
    expect(result?.[0].address).toEqual(mockUserOne.address);
    expect(result?.[0].gender).toEqual(mockUserOne.gender);

    expect(result?.[1].firstName).toEqual(mockUserTwo.firstName);
    expect(result?.[1].lastName).toEqual(mockUserTwo.lastName);
    expect(result?.[1].username).toEqual(mockUserTwo.username);
    expect(result?.[1].address).toEqual(mockUserTwo.address);
    expect(result?.[1].gender).toEqual(mockUserTwo.gender);
  });

  it('gets a user by id', async () => {
    const userDao = new UserDao();
    const payload = { ...mockUserOne, username: 'test2' };

    const user = await User.create(payload);
    const result = await userDao.getUser(user._id);

    expect(result?.firstName).toEqual(mockUserOne.firstName);
    expect(result?.lastName).toEqual(mockUserOne.lastName);
    expect(result?.username).toEqual('test2');
    expect(result?.address).toEqual(mockUserOne.address);
    expect(result?.gender).toEqual(mockUserOne.gender);
  });

  it('creates a user', async () => {
    const userDao = new UserDao();
    const payload = { ...mockUserOne, username: 'test3' };

    const result = await userDao.createUser(payload);

    expect(result?.firstName).toEqual(mockUserOne.firstName);
    expect(result?.lastName).toEqual(mockUserOne.lastName);
    expect(result?.username).toEqual('test3');
    expect(result?.address).toEqual(mockUserOne.address);
    expect(result?.gender).toEqual(mockUserOne.gender);
  });

  it('updates a user', async () => {
    const userDao = new UserDao();
    const payload = { ...mockUserOne, username: 'test4' };

    const user = await User.create(payload);
    const result = await userDao.updateUser(user._id, {
      ...payload,
      firstName: 'Peyton'
    });

    expect(result?.firstName).toEqual('Peyton');
    expect(result?.lastName).toEqual(mockUserOne.lastName);
    expect(result?.username).toEqual('test4');
    expect(result?.address).toEqual(mockUserOne.address);
    expect(result?.gender).toEqual(mockUserOne.gender);
  });

  it('deletes a user', async () => {
    const userDao = new UserDao();
    const payload = { ...mockUserOne, username: 'test5' };

    const user = await User.create(payload);
    await userDao.deleteUser(user._id);

    const result = await userDao.getUser(user._id);
    expect(result).toBeNull();
  });
});
