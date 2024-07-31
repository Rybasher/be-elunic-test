import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "../err/errorHandler";

function errorHandlerMiddleware(
  err: ErrorHandler,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof ErrorHandler) {
    res.status(err.status).json(err.toJSON());
  } else {
    res.status(500).json({
      message: "Internal Server Error",
      status: 500,
    });
  }
}

export { errorHandlerMiddleware };
