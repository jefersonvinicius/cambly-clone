import Teacher from '@app/core/entities/Teacher';
import { TeacherRepository } from '@app/core/repositories/TeacherRepository';
import { Connection, Repository } from 'typeorm';
import { UserScheme, UserSchemeProperties } from '../database/schemes/UserScheme';
import { UserMapper } from '../mappers/UserMapper';

export class TypeORMTeacherRepository implements TeacherRepository {
  private userRepository: Repository<UserSchemeProperties>;

  constructor(private connection: Connection) {
    this.userRepository = this.connection.getRepository(UserScheme);
  }

  async deleteById(id: string): Promise<boolean> {
    const { affected } = await this.userRepository.delete(id);
    return !!affected;
  }

  async findById(id: string): Promise<Teacher | null> {
    const scheme = await this.userRepository.findOne(id);
    return scheme ? new Teacher({ ...scheme }) : null;
  }

  async insert(teacher: Teacher): Promise<void> {
    const scheme = this.userRepository.create(UserMapper.toUserScheme(teacher));
    await this.userRepository.save(scheme);
  }
}
