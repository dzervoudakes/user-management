import { Document, Schema, model } from 'mongoose';

// @todo value to extending 'Document'?

export interface UserType extends Document {
  firstName: string;
  lastName: string;
  username: string;
  address: string;
  gender: 'male' | 'female' | 'other';
}

export const UserSchema = new Schema<UserType>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  gender: { type: String, required: true, enum: ['male', 'female', 'other'] }
});

export const User = model('User', UserSchema);

export default User;
