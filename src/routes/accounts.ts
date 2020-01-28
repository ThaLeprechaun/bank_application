import { Router } from 'express';
import { viewAllAccounts, viewAnAccount } from '../controllers/accounts';

const router = Router();

// view all accounts
// for admin alone
router.get('/api/v1/users/accounts', async (_req, res) => {
  try {
    const doc = await viewAllAccounts();

    if (!doc) {
      res.status(404).json({ msg: 'No transactions yet' });

      return;
    }

    res.status(200).json({ doc });

    return;
  } catch (err) {
    res.status(500).json({ err: err.message });
    return;
  }
});

router.get('/api/v1/users/accounts/:accountNumber', async (req, res) => {
  const accountNumber = req.params.accountNumber;
  if (!accountNumber) {
    res.status(400).json({ message: 'Account not found' });

    return;
  }
  try {
    const doc = await viewAnAccount(accountNumber);

    if (!doc) {
      res.status(400).json({ message: 'Invalid details' });
      return;
    }

    res.status(200).json({ doc });
    return;
  } catch (error) {
    res.status(500).json({ error: error.message });

    return;
  }
});

export default router;
