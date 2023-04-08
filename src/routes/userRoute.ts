import express, { type Response, type Router } from 'express';
import {
  ReasonPhrases,
  StatusCodes,
  getReasonPhrase,
  // getStatusCode,
} from 'http-status-codes';
import { UserModel } from '@/models/user';
import type { User } from '@/utils/types';
import handleError from '@/utils/handleError';

const router: Router = express.Router();

// Get all users
export const GetAllUsers = router.get('/users', async (__, res: Response) => {
  try {
    const users = await UserModel.find();
    res.status(StatusCodes.OK).json({
      message: ReasonPhrases.OK,
      data: users,
    });
  } catch (evt: unknown) {
    handleError({ evt, errorNo: StatusCodes.INTERNAL_SERVER_ERROR, res });
  }
});

// Create a new user
export const CreateUser = router.post('/user', async (req, res) => {
  const user: User = req.body;
  try {
    const newUser = new UserModel(user);
    await newUser.save();
    res.status(StatusCodes.OK).json(newUser);
  } catch (evt: unknown) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
    });
  }
});
