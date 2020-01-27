import { Router } from 'express';
import { viewAllAccounts } from '../controllers/accounts';

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

export default router;
