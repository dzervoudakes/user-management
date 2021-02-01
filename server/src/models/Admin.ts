import { Schema, model } from 'mongoose';

export const AdminSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true }
});

export const Admin = model('Admin', AdminSchema);

export default Admin;
