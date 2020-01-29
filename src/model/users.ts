import mongoose from 'mongoose';

export interface IUserSchema extends mongoose.Document {
  firstName: string;
  lastName: string;
  phone: string;
  bvn: string;
  email: string;
  password: string;
  transactionPin: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      lowercase: true,
      trim: true,
      index: true,
      required: true,
    },
    lastName: {
      type: String,
      lowercase: true,
      trim: true,
      index: true,
      required: true,
    },
    phone: {
      type: String,
      trim: true,
      index: true,
      unique: true,
      required: true,
    },
    bvn: {
      type: String,
      trim: true,
      index: true,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      index: true,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    transactionPin: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 4,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IUserSchema>('users', userSchema);
