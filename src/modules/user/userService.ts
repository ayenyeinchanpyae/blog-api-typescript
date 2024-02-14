import { Types } from 'mongoose';
import User from './userModel';

export async function add(userData: any) {
  const user = new User(userData);
  return user.save();
}
export async function getByEmail(email: string) {
  return User.findOne({ email });
}

export async function update(userId: string, updatedFields: any) {
  try {
    // Assuming you're using Mongoose to interact with MongoDB
    const user = await User.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    // Update the user object with the provided fields
    Object.assign(user, updatedFields);

    // Save the updated user object
    await user.save();

    return user;
  } catch (error) {
    throw error;
  }
}
