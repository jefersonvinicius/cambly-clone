import { io, Socket } from 'socket.io-client';
import {
  createFakeTeacher,
  setupDatabaseTest,
  setupHttpServerAndSocket,
  teardownDatabaseTest,
  waitForCallbacks,
} from '@tests/helpers';
import { stopHttpServer } from '@app/infra/http/server';
import { EventsLabels } from '../';
import { TypeORMTeacherRepository } from '@app/infra/repositories/TypeORMTeacherRepository';
import { Connection } from 'typeorm';
import { connectTeacher } from '@tests/helpers/socket-events';

describe('SocketIOEvents', () => {
  let connection: Connection;

  beforeAll(async () => {
    connection = await setupDatabaseTest();
    await setupHttpServerAndSocket();
  });

  afterAll(async () => {
    await teardownDatabaseTest();
    await stopHttpServer();
  });

  it('Should student get new event when teacher is connected', async () => {
    const teacherRepository = new TypeORMTeacherRepository(connection);
    const teacher = await createFakeTeacher({ id: 'teacherId', name: 'Any Name', email: 'any_email@gmail.com' });
    await teacherRepository.insert(teacher);

    const sut = await createStudentClient();
    const teacherClient = await createTeacherClient();

    await waitForCallbacks(1, (incrementCalls) => {
      sut.on(EventsLabels.NewTeacherConnected, async ({ teacher }) => {
        expect(teacher).toEqual(
          expect.objectContaining({
            id: expect.any(String),
            name: 'Any Name',
            email: 'any_email@gmail.com',
          })
        );

        sut.close();
        teacherClient.close();
        await teacherRepository.deleteById(teacher.id);
        incrementCalls();
      });

      connectTeacher(teacherClient, { teacherId: 'teacherId' });
    });
  });
});

async function createStudentClient() {
  return await createIOClient();
}

async function createTeacherClient() {
  return await createIOClient();
}

function createIOClient() {
  return new Promise<Socket>((resolve) => {
    const client = io('http://localhost:3333');
    client.on('connect', () => resolve(client));
  });
}
