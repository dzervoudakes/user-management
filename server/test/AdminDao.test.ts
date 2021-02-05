import mongoose, { Mongoose } from 'mongoose';
import { AdminDao } from '@src/daos';
import { Admin } from '@src/models';

describe('AdminDao', () => {
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

  it('gets admin by username and password', async () => {
    const adminDao = new AdminDao();
    const mockAdmin = { username: 'admin', password: 'letmein' };

    await Admin.create(mockAdmin);
    const result = await adminDao.getAdmin(mockAdmin);

    expect(result?.username).toEqual(mockAdmin.username);
    expect(result?.password).toEqual(mockAdmin.password);
  });
});
