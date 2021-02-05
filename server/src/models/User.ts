import { Document, Schema, model } from 'mongoose';

export interface UserType {
  firstName: string;
  lastName: string;
  username: string;
  address: string;
  gender: 'male' | 'female' | 'other';
}

export interface UserDocument extends UserType, Document {}

export const UserSchema = new Schema<UserDocument>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  gender: { type: String, required: true, enum: ['male', 'female', 'other'] }
});

export const User = model('User', UserSchema);

export default User;
