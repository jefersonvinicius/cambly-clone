import { FinishLessonUseCase } from '@app/core/use-cases/FinishLesson';
import { createFakeLesson } from '@tests/helpers';
import { LessonRepositoryInMemory } from '@tests/LessonRepositoryInMemory';
import { FakeSocketServer } from '@tests/SocketServerFake';
import { FinishLessonRoute } from './FinishLessonRoute';

describe('FinishLessonRoute', () => {
  it("should get 404 status code when lesson doesn't exists", async () => {
    const { sut } = createSut();
    const response = await sut.handle({
      body: {
        lessonId: 'invalid_id',
      },
    });
    expect(response.statusCode).toBe(404);
  });

  it('should call FinishLessonUseCase and return status code 200', async () => {
    const { sut, lessonRepository, finishLessonUseCase } = createSut();
    const lesson = await createFakeLesson({ id: 'any' });
    await lessonRepository.insert(lesson);
    const finishLessonUseCasePerformSpy = jest.spyOn(finishLessonUseCase, 'perform');

    const response = await sut.handle({ body: { lessonId: 'any' } });

    expect(finishLessonUseCasePerformSpy).toHaveBeenCalledWith({ lessonId: 'any' });
    expect(response.statusCode).toBe(200);
  });
});

function createSut() {
  const socketServer = new FakeSocketServer();
  const lessonRepository = new LessonRepositoryInMemory();
  const finishLessonUseCase = new FinishLessonUseCase(socketServer, lessonRepository);
  const sut = new FinishLessonRoute(finishLessonUseCase);
  return { sut, socketServer, lessonRepository, finishLessonUseCase };
}
