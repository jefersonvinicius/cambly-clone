import jsonwebtoken from 'jsonwebtoken';

export class JWT {
  static create(data: any): string {
    return jsonwebtoken.sign(data, 'secret');
  }

  static decode<T extends any>(token: string) {
    return jsonwebtoken.decode(token) as T | null;
  }
}
