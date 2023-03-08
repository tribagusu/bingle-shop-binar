import express, {
  Request,
  Response,
  NextFunction,
} from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { productsRouter } from "./routers/products.router";
import { usersRouter } from "./routers/users.router";
import { ordersRouter } from "./routers/orders.router";
import { orderUpdateRouter } from "./routers/order-update.router";
import { requestLogging } from "./middlewares/logger";

export const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(requestLogging);

app.use("/api/v1/users", usersRouter);
app.use("/api/v1/products", productsRouter);
app.use("/api/v1/orders", ordersRouter);
app.use("/api/v1/order-update", orderUpdateRouter);
app.use("/uploads", express.static("uploads"));

app.use(
  (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    console.log(err);

    return res.status(err.status).json({
      status: false,
      data: {},
      error: err.error,
    });
  },
);
