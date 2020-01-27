import mongoose from 'mongoose';

export interface TransactionSchema extends mongoose.Document {
  user: String;
  benefactor: String;
  transactionType: String;
  transactionAmount: Number;
  description: String;
  transactionDate: Date;
}

const transactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  benefactor: {
    type: String,
  },
  transactionType: {
    type: String,
    enum: ['DEBIT', 'CREDIT'],
  },
  transactionAmount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  transactionDate: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<TransactionSchema>(
  'transactions',
  transactionSchema,
);
