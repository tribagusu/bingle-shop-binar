import { Response } from "express";

export const createResponse = (
  res: Response,
  code: number,
  data: Object,
) => {
  return res.status(code).json({
    status: true,
    code: code,
    data: data,
  });
};
