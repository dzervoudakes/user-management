import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true },
  address: { type: String, required: true },
  gender: { type: String, required: true, enum: ['male', 'female', 'other'] }
});

export default UserSchema;
