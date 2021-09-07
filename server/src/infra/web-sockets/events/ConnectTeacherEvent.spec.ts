import {
  createStudentClient,
  createTeacherClient,
  setupDatabaseTest,
  setupHttpServerAndSocket,
  teardownDatabaseTest,
  teardownHttpServer,
  waitForCallbacks,
} from '@tests/helpers';
import { connectStudent, connectTeacher } from '@tests/helpers/socket-events';

describe('ConnectStudentEvent suite test', () => {
  beforeAll(async () => {
    await setupDatabaseTest();
    await setupHttpServerAndSocket();
  });

  afterAll(async () => {
    await teardownDatabaseTest();
    await teardownHttpServer();
  });

  it('Should connect teacher successfully', async () => {
    const teacher = await createTeacherClient();
    await waitForCallbacks(1, (incrementCalls) => {
      connectTeacher(teacher.socket, { teacherId: teacher.data.id }, async () => {
        expect(true).toBe(true);
        await teacher.destroy();
        incrementCalls();
      });
    });
  });
});
