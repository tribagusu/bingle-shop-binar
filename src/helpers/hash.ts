import bcrypt from "bcrypt";

export default class Hash {
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
}
