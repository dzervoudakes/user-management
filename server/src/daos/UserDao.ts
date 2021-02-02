import { User, UserType } from '../models';

export class UserDao {
  public async getUsers(): Promise<UserType[]> {
    const result = await User.find({});
    return result;
  }
}

export default UserDao;
