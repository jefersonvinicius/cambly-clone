import User from '../entities/User';

export interface UserRepository {
  insert(user: User): Promise<void>;
  findByEmail(email: string): Promise<User | null>;
}
