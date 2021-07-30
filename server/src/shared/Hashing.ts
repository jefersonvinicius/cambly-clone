import bcrypt from 'bcrypt';

export interface Hashing {
  hash(data: string): Promise<string>;
}

export class BcryptHashing implements Hashing {
  async hash(data: string): Promise<string> {
    return await bcrypt.hash(data, 10);
  }
}
