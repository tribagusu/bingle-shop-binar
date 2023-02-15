import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class Authentication {
  public static passwordHash = (password: string) => {
    return bcrypt.hash(password, 10);
  };

  public static passwordCompare = async (
    text: string,
    encryptedText: string
  ) => {
    const result = await bcrypt.compare(text, encryptedText);
    return result;
  };

  public static generateToken = (id: string) => {
    const secretKey = process.env.JWT_SECRET_KEY || "secret";

    const accessToken = jwt.sign({ id }, secretKey, { expiresIn: "30 Days" });
    return accessToken;
  };
}
