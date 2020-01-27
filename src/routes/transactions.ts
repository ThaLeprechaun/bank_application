import { Router } from 'express';
import {
  addTransaction,
  viewATransaction,
  viewTransactions,
  viewTransactionsByUser,
} from '../controllers/transactions';
import { ITransaction } from '../controllers/transactions';

const router = Router();

// view all transactions
router.get('/', async (_req, res) => {
  try {
    const doc = await viewTransactions();

    if (!doc) {
      res.status(404).json({ msg: 'No Transactions yet' });

      return;
    }

    res.status(200).json({ doc });

    return;
  } catch (err) {
    res.status(500).json({ err: err.message });

    return;
  }
});

// add transaction
router.post('/:userId', async (req, res) => {
  const user = req.params.userId;
  if (!user) {
    res.status(400).json({ msg: 'Unable to add' });

    return;
  }
  try {
    const {
      benefactor,
      transactionType,
      transactionAmount,
      description,
    } = req.body;
    const body: ITransaction = {
      user,
      benefactor,
      transactionType,
      transactionAmount,
      description,
    };
    const doc = await addTransaction(body);

    if (!doc) {
      res.status(400).json({ msg: 'Could not add transaction' });

      return;
    }

    res.status(201).json({ doc });

    return;
  } catch (err) {
    res.status(500).json({ err: err.message });

    return;
  }
});

// view transactions by a user
router.get('/:userId', async (req, res) => {
  const userId = req.params.userId;
  if (!userId) {
    res.status(400).json({ msg: 'Invalid url' });

    return;
  }

  try {
    const doc = await viewTransactionsByUser(userId);

    if (!doc) {
      res.status(400).json({ msg: 'No transactions yet' });

      return;
    }

    res.status(200).json({ doc });

    return;
  } catch (err) {
    res.status(500).json({ err: err.message });

    return;
  }
});

// view a transaction
router.get('/:transactionId', async (req, res) => {
  const transactionId = req.params.transactionId;
  if (!transactionId) {
    res.status(400).json({ msg: 'Incomplete Url' });

    return;
  }

  try {
    const doc = await viewATransaction(transactionId);

    if (!doc) {
      res.status(404).json({ err: 'Transaction not found' });

      return;
    }

    res.status(200).json({ doc });

    return;
  } catch (err) {
    res.status(500).json({ err: err.message });

    return;
  }
});

export default router;
