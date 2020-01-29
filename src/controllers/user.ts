import Users from '../model/users';
import { IUserSchema } from '../model/users';

// Function to get All users
export async function getAllUsers() {
  return Users.find({ deletedAt: null }).sort({ firstName: 'asc' });
}

// Function to get a user
export async function getAUser(userId: string) {
  return Users.findById(userId);
}

// Function to create a user
export async function createUser(userObj: IUserSchema) {
  const existingUser = await Users.findOne({ email: userObj.email });

  if (existingUser) {
    throw new Error('User already exists');
  }

  const newUser = new Users(userObj);
  return newUser.save();
}

//Function to update a user
export async function updateUser(
  userId: string,
  userObj: Partial<IUserSchema>,
) {
  return Users.findOneAndUpdate({ _id: userId }, userObj, { new: true });
}

//Function to delete a user
export async function deleteUser(userId: string) {
  return Users.findOneAndUpdate({ _id: userId }, { deletedAt: new Date() });
}
