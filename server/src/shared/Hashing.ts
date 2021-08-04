import bcrypt from 'bcrypt';

export class Hashing {
  static async hash(data: string): Promise<string> {
    return await bcrypt.hash(data, 10);
  }

  static async compare(data: string, hashed: string): Promise<boolean> {
    return await bcrypt.compare(data, hashed);
  }
}
