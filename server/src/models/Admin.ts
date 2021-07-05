import { Schema, model } from 'mongoose';

export interface AdminType {
  username: string;
  password: string;
}

export const AdminSchema = new Schema<AdminType>({
  username: { type: String, required: true },
  password: { type: String, required: true }
});

export const Admin = model('Admin', AdminSchema);

export default Admin;
