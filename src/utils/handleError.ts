import { type Response } from 'express';
interface HandleErrorProps {
  evt: unknown;
  errorNo?: number;
  res: Response;
}
const errorNumber = 500;
const handleError = ({
  evt,
  errorNo = errorNumber,
  res,
}: HandleErrorProps): void => {
  if (typeof evt === 'string') {
    res.status(errorNo).send(evt.toString());
  } else if (evt instanceof Error) {
    res.status(errorNo).send(evt.message);
  }
};

export default handleError;
