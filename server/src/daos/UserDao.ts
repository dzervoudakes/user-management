import { User, UserType } from '../models';

export class UserDao {
  public async getUsers(): Promise<UserType[]> {
    const result = await User.find({});
    return result;
  }

  public async getUser(id: string): Promise<UserType | null> {
    const result = await User.findById(id);
    return result;
  }

  public async createUser(user: UserType): Promise<UserType> {
    const result = await User.create(user);
    return result;
  }

  public async updateUser(id: string, user: UserType): Promise<UserType | null> {
    const result = await User.findByIdAndUpdate(id, user);
    return result;
  }

  public async deleteUser(id: string): Promise<UserType | null> {
    const result = await User.findByIdAndDelete(id);
    return result;
  }
}

export default UserDao;
