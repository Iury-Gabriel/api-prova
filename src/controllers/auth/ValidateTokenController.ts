import { Request, Response } from 'express';

const ValidateTokenController = (req: Request, res: Response) => {
  return res.status(200).json({ message: 'Token válido' });
};

export { ValidateTokenController };
