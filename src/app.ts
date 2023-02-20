import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { productsRouter } from "./routers/products.router";
import { usersRouter } from "./routers/users.router";
import { ordersRouter } from "./routers/orders.router";
import { orderUpdateRouter } from "./routers/order-update.router";

export const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1", usersRouter);
app.use("/api/v1", productsRouter);
app.use("/api/v1/orders", ordersRouter);
app.use("/api/v1", orderUpdateRouter);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err);

  return res.status(err.status).json({
    status: false,
    data: {},
    error: err.error,
  });
});
