import { Router } from 'express';
import joi from '@hapi/joi';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Response } from 'express';

import Users from '../model/users';
import auth from '../middleware/auth';

const router = Router();

// interface IReq extends Request {
//   user: {
//     id: string
//   }
// }

//Route for authorized user (Private route)
router.get('/', auth, async (req: any, res: Response) => {
  try {
    const user = await Users.findById({ _id: req.user.id }).select('-password'); // Dont return the password
    res.json({ user });
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');
  }
});

//Authenticate user and get token(Public route)
router.post('/', async (req, res) => {
  const schema = joi.object({
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
    let user = await Users.findOne({ email: value.email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials ' });
    }
    const isMatch = await bcrypt.compare(value.password, user.password);

    if (!isMatch) {
      res.status(400).json({ message: 'Invalid credentials ' });

      return;
    }
    const payload = {
      user: {
        id: user._id,
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
        res.status(200).json({ token });
        return;
      },
    );

    return;
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');
    return;
  }
});

export default router;
