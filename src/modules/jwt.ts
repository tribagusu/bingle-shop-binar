import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

export default class ModuleJwt {
  public static signToken = (id: string) => {
    const secretKey: string = process.env.JWT_SECRET_KEY;

    const accessToken = jwt.sign(
      {
        id,
      },
      secretKey,
      {
        expiresIn: "60s",
      },
    );
    return accessToken;
  };

  public static signRefreshToken = (id: string) => {
    const secretKey: string = process.env.JWT_REFRESH_KEY;

    const refreshToken = jwt.sign(
      {
        id,
      },
      secretKey,
      {
        expiresIn: "30d",
      },
    );
    return refreshToken;
  };

  public static verifyToken = (token: string) => {
    const secretKey: string = process.env
      .JWT_SECRET_KEY as string;

    let data: any;
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        data = null;
      } else {
        data = decoded;
      }
    });
    return data;
  };

  public static verifyRefreshToken = (token: string) => {
    const secretKey: string = process.env
      .JWT_REFRESH_KEY as string;

    let data: any;
    jwt.verify(token, secretKey, async (err, decoded) => {
      if (err) {
        data = null;
      } else {
        data = decoded;
      }
    });
    return data;
  };
}
