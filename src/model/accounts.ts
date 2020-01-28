import mongoose from 'mongoose';

export interface iAccountSchema extends mongoose.Document {
  user: string;
  accountNumber: string;
  accountBalance: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

const accountSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
    accountNumber: {
      type: String,
      unique: true,
    },
    accountBalance: {
      type: Number,
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

export default mongoose.model<iAccountSchema>('accounts', accountSchema);
