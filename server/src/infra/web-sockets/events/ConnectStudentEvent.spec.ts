import { stopHttpServer } from '@app/infra/http/server';
import {
  createStudentClient,
  setupDatabaseTest,
  setupHttpServerAndSocket,
  teardownDatabaseTest,
  waitForCallbacks,
} from '@tests/helpers';
import { EventsLabels } from '..';

describe('ConnectStudentEvent suite test', () => {
  beforeAll(async () => {
    await setupDatabaseTest();
    await setupHttpServerAndSocket();
  });

  afterAll(async () => {
    await teardownDatabaseTest();
    await stopHttpServer();
  });

  it('Should connect student successfully', async () => {
    const student = await createStudentClient();
    await waitForCallbacks(1, (incrementCalls) => {
      student.socket.emit(EventsLabels.ConnectStudent, { studentId: student.data.id }, async () => {
        expect(true).toBe(true);
        await student.destroy();
        incrementCalls();
      });
    });
  });
});
