import express, { type Response, type Router } from 'express';
import {
  StatusCodes,
  // getStatusCode,
} from 'http-status-codes';
import handleError from '@/utils/handleError';

const router: Router = express.Router();

router.get('/', (__, res: Response) => {
  try {
    res
      .status(StatusCodes.OK)
      .json({ message: `Welcome to default api route` });
  } catch (evt: unknown) {
    handleError({ evt, errorNo: StatusCodes.INTERNAL_SERVER_ERROR, res });
  }
});

export default router;
