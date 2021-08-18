import { io } from 'socket.io-client';
import { createFakeTeacher, setupDatabaseTest, setupHttpServerAndSocket, teardownDatabaseTest } from '@tests/helpers';
import { stopHttpServer } from '@app/infra/http/server';
import { EventsLabels } from '../';
import { TypeORMTeacherRepository } from '@app/infra/repositories/TypeORMTeacherRepository';
import { Database } from '@app/infra/database';
import { Connection } from 'typeorm';

describe('SocketIOEvents', () => {
  let connection: Connection;

  beforeAll(async () => {
    connection = await setupDatabaseTest();
    await setupHttpServerAndSocket();
  });

  afterAll(async () => {
    await teardownDatabaseTest();
    stopHttpServer();
  });

  it('Should student get new event when teacher is connected', async (done) => {
    const teacherRepository = new TypeORMTeacherRepository(connection);
    const teacher = await createFakeTeacher({ id: 'teacherId', name: 'Any Name', email: 'any_email@gmail.com' });
    await teacherRepository.insert(teacher);

    const student = createStudentClient();
    const teacherClient = createTeacherClient();

    student.on(EventsLabels.NewTeacherConnected, ({ teacher }) => {
      expect(teacher).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          name: 'Any Name',
          email: 'any_email@gmail.com',
        })
      );
      done();

      student.close();
      teacherClient.close();
    });

    teacherClient.connect();
    student.connect();

    teacherClient.emit(EventsLabels.ConnectTeacherToBeChosen, { teacherId: 'teacherId' });
  });
});

function createStudentClient() {
  return io('http://localhost:3333');
}

function createTeacherClient() {
  return io('http://localhost:3333');
}
