import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

export class Authentication {
  public static hashing = (
    text: string,
  ): Promise<string> => {
    return bcrypt.hash(text, 10);
  };

  public static hashCompare = async (
    text: string,
    encryptedText: string,
  ) => {
    const result = await bcrypt.compare(
      text,
      encryptedText,
    );
    return result;
  };

  public static generateToken = (
    id: string,
    role: string,
  ) => {
    const secretKey: string = process.env.JWT_SECRET_KEY;

    const accessToken = jwt.sign(
      {
        user: {
          id: id,
          role: role,
        },
      },
      secretKey,
      {
        expiresIn: "20s",
      },
    );
    return accessToken;
  };

  public static generateRefreshToken = (
    id: string,
    role: string,
  ) => {
    const secretKey: string = process.env.JWT_REFRESH_KEY;

    const accessToken = jwt.sign(
      {
        user: {
          id: id,
          role: role,
        },
      },
      secretKey,
      {
        expiresIn: "30d",
      },
    );
    return accessToken;
  };

  public static extractToken = (token: string) => {
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

  public static extractRefreshToken = (token: string) => {
    const secretKey: string = process.env
      .JWT_REFRESH_KEY as string;

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
}
