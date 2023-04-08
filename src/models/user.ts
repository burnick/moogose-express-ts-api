import mongoose from 'mongoose';
import type { User } from '@/utils/types';

const userSchema = new mongoose.Schema<User>({
  name: String,
  age: Number,
  email: String,
});

export const UserModel = mongoose.model<User>('User', userSchema);
