import { createAccount } from './../controllers/accounts';
import { Router } from 'express';
import joi from '@hapi/joi';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import {
  getAllUsers,
  getAUser,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/user';

const router = Router();

//Route to GET all users
router.get('/', (_req, res) => {
  getAllUsers()
    .then(data => {
      res.status(200).json({ data });
      return;
    })
    .catch(err => {
      console.log(err);

      res
        .status(500)
        .json({ message: 'An error occured. Please try again later' });
      return;
    });
});

// Route to GET a user
router.get('/:userId', (req, res) => {
  const userId = req.params.userId;

  getAUser(userId)
    .then(data => {
      if (!data || data.deletedAt !== null) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.status(200).json({ data });
      return;
    })
    .catch(err => {
      console.log(err);

      res
        .status(500)
        .json({ message: 'An error occurred. Please try again later' });
      return;
    });
});

//Route to create a new user
router.post('/', async (req, res) => {
  const schema = joi.object({
    firstName: joi
      .string()
      .min(1)
      .max(255)
      .trim()
      .lowercase()
      .required(),
    lastName: joi
      .string()
      .min(1)
      .max(255)
      .trim()
      .lowercase()
      .required(),
    phone: joi
      .string()
      .pattern(/^(\+234[789][01]\d{8})$|^(0[789][01]\d{8})$/)
      .min(11)
      .max(14)
      .trim()
      .lowercase()
      .required(),
    bvn: joi
      .string()
      .min(10)
      .max(10)
      .trim()
      .lowercase()
      .required(),
    email: joi
      .string()
      .email()
      .lowercase()
      .allow('')
      .required(),
    password: joi
      .string()
      .min(6)
      .max(50)
      .lowercase()
      .required(),
    transactionPin: joi
      .string()
      .min(4)
      .max(4)
      .required(),
  });
  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    res.status(400).json({ message: 'Please provide valid parameters', error });
    return;
  }

  try {
    const salt = await bcrypt.genSalt(10);
    value.password = await bcrypt.hash(value.password, salt);

    const doc = await createUser(value);
    const userId = doc._id;
    const userAccount = await createAccount(userId);

    const payload = {
      user: {
        id: userId,
      },
    };
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      console.log('no secret');
      return;
    }

    jwt.sign(
      payload,
      secret,
      {
        expiresIn: '36000',
      },
      (err, token) => {
        if (err) {
          throw err;
        }
        res.status(201).json({ token, doc, userAccount });
      },
    );

    return;
  } catch (err) {
    res.status(400).json({ message: err.message });
    return;
  }
});

//Route to edit a user info
router.patch('/:userId', async (req, res) => {
  const schema = joi.object({
    firstName: joi
      .string()
      .min(1)
      .max(255)
      .trim()
      .lowercase()
      .required(),
    lastName: joi
      .string()
      .min(1)
      .max(255)
      .trim()
      .lowercase()
      .required(),
    phone: joi
      .string()
      .pattern(/^(\+234[789][01]\d{8})$|^(0[789][01]\d{8})$/)
      .min(11)
      .max(14)
      .trim()
      .lowercase()
      .required(),
    email: joi
      .string()
      .email()
      .lowercase()
      .allow('')
      .required(),
  });

  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    res.status(400).json({ message: 'Please provide valid parameters', error });

    return;
  }

  const doc = await updateUser(req.params.userId, value);

  if (!doc) {
    res.status(404).json({ message: 'User to edit not found' });

    return;
  }

  res.status(200).json({ data: doc.toJSON() });
});

//Route to delete a user
router.delete('/:userId', async (req, res) => {
  const userId = req.params.userId;

  const doc = await deleteUser(userId);

  if (!doc) {
    res.status(404).json({ message: 'User to delete not found' });

    return;
  }

  res.status(200).json({ data: doc.id });

  return;
});

export default router;
