import { Document, Schema, model } from 'mongoose';

export interface AdminType {
  username: string;
  password: string;
}

export interface AdminDocument extends AdminType, Document {}

export const AdminSchema = new Schema<AdminDocument>({
  username: { type: String, required: true },
  password: { type: String, required: true }
});

export const Admin = model('Admin', AdminSchema);

export default Admin;
