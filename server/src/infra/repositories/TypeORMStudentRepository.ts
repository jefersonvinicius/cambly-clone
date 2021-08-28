import Student from '@app/core/entities/Student';
import { StudentRepository } from '@app/core/repositories/StudentRepository';
import { Connection, Repository } from 'typeorm';
import { UserScheme, UserSchemeProperties } from '../database/schemes/UserScheme';
import { UserMapper } from '../mappers/UserMapper';

export class TypeORMStudentRepository implements StudentRepository {
  private userRepository: Repository<UserSchemeProperties>;

  constructor(private connection: Connection) {
    this.userRepository = this.connection.getRepository(UserScheme);
  }

  async deleteById(id: string): Promise<boolean> {
    const { affected } = await this.userRepository.delete(id);
    return !!affected;
  }

  async findById(id: string): Promise<Student | null> {
    const scheme = await this.userRepository.findOne(id);
    return scheme ? new Student({ ...scheme }) : null;
  }

  async insert(student: Student): Promise<void> {
    const scheme = this.userRepository.create(UserMapper.toUserScheme(student));
    await this.userRepository.save(scheme);
  }
}
