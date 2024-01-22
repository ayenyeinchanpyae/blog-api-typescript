import { Request, Response, NextFunction } from 'express';

const notFound = async (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not Found ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  console.log(`middle ware: ${JSON.stringify(err)}`);
  res.status(statusCode);
  res.json({ success: false, message: `middleware ${err.message}` });
};

export { notFound, errorHandler };
