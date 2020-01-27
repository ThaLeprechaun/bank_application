import Accounts from '../model/accounts';

// get account number given userId
// Function to Get a user's account number
export async function getAccountNumber(userId: string) {
  try {
    const accountNumber = await Accounts.findOne(
      { user: userId },
      'accountNumber',
    );

    if (!accountNumber) {
      throw Error('No such account');
    }

    return accountNumber;
  } catch (err) {
    console.error('no account', err.message);
    throw Error(err.message);
  }
}

//Function to create an account for a user
export async function createAccount(userId: string) {
  const newAccount = {
    user: userId,
    accountNumber: Number(`2${Math.trunc(Math.random() * 1000000000)}`),
    accountBalance: 0,
  };

  try {
    const account = new Accounts(newAccount);
    const saved = await account.save();

    return saved;
  } catch (err) {
    console.error('Unable to save');
    throw Error(err.message);
  }
}

//Function to credit a user account
export async function creditAccount(accountNumber: string, amount: string) {
  const newAccountNumber = Number(accountNumber);
  const newAmount = Number(amount);

  if (Number.isNaN(newAccountNumber) || Number.isNaN(newAmount)) {
    throw Error('Invalid account number or amount');
  }

  try {
    const [account] = await Accounts.find({ accountNumber: newAccountNumber });

    if (!account) {
      throw Error('Account does not exist');
    }

    const updatedAccount = await Accounts.findByIdAndUpdate(
      { id: account._id },
      {
        accountBalance: account.accountBalance + newAmount,
      },
    );

    return updatedAccount;
  } catch (err) {
    throw Error(err.message);
  }
}

//Function to debit a user's account
export async function debitAccount(accountNumber: string, amount: string) {
  const newAccountNumber = Number(accountNumber);
  const newAmount = Number(amount);

  if (Number.isNaN(newAccountNumber) || Number.isNaN(newAmount)) {
    throw Error('Invalid account number or amount');
  }

  try {
    const [account] = await Accounts.find({ accountNumber: newAccountNumber });

    if (!account) {
      throw Error('Account does not exist');
    }

    if (account.accountBalance < newAmount) {
      throw Error('Insufficient Funds');
    }

    const updatedAccount = await Accounts.findByIdAndUpdate(
      { id: account._id },
      {
        accountBalance: account.accountBalance - newAmount,
      },
    );

    return updatedAccount;
  } catch (err) {
    throw Error(err.message);
  }
}

// view all accounts
export async function viewAllAccounts() {
  try {
    const accounts = await Accounts.find();

    return accounts;
  } catch (err) {
    throw Error(err.message);
  }
}

// view all account by a user
export async function viewAllAccountsByUser(userId: string) {
  try {
    const accounts = await Accounts.find({ user: userId });

    if (!accounts) {
      throw Error('No accounts found');
    }

    return accounts;
  } catch (err) {
    throw Error(err.message);
  }
}

// view a user's account
export async function viewAnAccount(accountId: string) {
  try {
    const account = await Accounts.findById({ id: accountId });

    if (!account) {
      throw Error('Account not found');
    }

    return account;
  } catch (err) {
    throw Error(err.message);
  }
}
