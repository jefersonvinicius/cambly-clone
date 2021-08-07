import User from '@app/core/entities/User';
import { UserRepository } from '@app/core/repositories/UserRepository';

export class UserRepositoryInMemory implements UserRepository {
  private users: User[] = [];

  async insert(user: User): Promise<void> {
    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((u) => u.email === email) ?? null;
  }

  async deleteById(id: string): Promise<boolean> {
    this.users = this.users.filter((u) => u.id !== id);
    return true;
  }
}
