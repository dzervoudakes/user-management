import { Schema } from 'mongoose';

export const AdminSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true }
});

export default AdminSchema;
