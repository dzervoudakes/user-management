import mongoose from 'mongoose';
import { UserDao } from '../src/daos';
import { User } from '../src/models';

describe('UserDao', () => {
  let connection: any;

  beforeAll(async () => {
    connection = await mongoose.connect(process.env.MONGO_URL || '', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  });

  afterAll(async () => {
    await connection.disconnect();
  });

  it('gets a list of users', async () => {
    const userDao = new UserDao();
    const mockUserOne = {
      firstName: 'Eli',
      lastName: 'Manning',
      username: 'nyg10',
      address: '1925 Giants Drive, East Rutherford, NJ 07071',
      gender: 'male'
    };
    const mockUserTwo = {
      firstName: 'Saquon',
      lastName: 'Barkley',
      username: 'nyg26',
      address: '1925 Giants Drive, East Rutherford, NJ 07071',
      gender: 'male'
    };

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
});
