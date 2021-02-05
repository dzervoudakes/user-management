import { Admin, AdminType } from '@src/models';

export class AdminDao {
  public async getAdmin({ username, password }: AdminType): Promise<AdminType | null> {
    const result = await Admin.findOne({ username, password });
    return result;
  }
}

export default AdminDao;
