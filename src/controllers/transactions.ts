import Transactions from '../model/transactions';

export interface ITransaction {
  user: string;
  benefactorAccountNumber: string;
  benefactorAccountName?: string;
  transactionType: string;
  transactionAmount: number;
  transactionPin: string;
  description?: string;
}

//Create a new transaction
export async function addTransaction(body: ITransaction) {
  try {
    const transaction = new Transactions(body);
    const saved = await transaction.save();

    return saved;
  } catch (err) {
    console.error('Could not add transaction');
    throw Error(err.message);
  }
}

//View all transactions
export async function viewTransactions() {
  try {
    const transactions = await Transactions.find();

    if (!transactions) {
      throw Error('No transactions exist');
    }

    return transactions;
  } catch (err) {
    console.error('Could not get transactions');
    throw Error(err.message);
  }
}

//View all transactions by a user
export async function viewTransactionsByUser(userId: string) {
  try {
    const transactions = await Transactions.find({ id: userId });

    if (!transactions) {
      throw Error('Transaction does not exist');
    }

    return transactions;
  } catch (err) {
    console.error('Could not get transactions');
    throw Error(err.message);
  }
}

// View a transaction
export async function viewATransaction(transactionId: string) {
  try {
    const transaction = await Transactions.findById({ id: transactionId });

    if (!transaction) {
      throw Error('Transaction does not exist');
    }

    return transaction;
  } catch (err) {
    console.error('Could not get transaction');
    throw Error(err.message);
  }
}
