import { createFakeLesson } from '@tests/helpers';

describe('Lesson entity', () => {
  it('should calculate the lesson duration', async () => {
    let lesson = await createFakeLesson({
      startedAt: new Date('2020-09-26T10:00:00Z'),
      endedAt: new Date('2020-09-26T10:15:00Z'),
    });
    expect(lesson.durationTime).toBe(900000);
    expect(lesson.durationInMinutes).toBe(15);

    lesson = await createFakeLesson({
      startedAt: new Date('2020-09-26T10:00:10Z'),
      endedAt: new Date('2020-09-26T10:03:20Z'),
    });
    expect(lesson.durationTime).toBe(190000);
    expect(lesson.durationInMinutes).toBe(3);

    lesson = await createFakeLesson({
      startedAt: new Date('2020-09-26T10:00:10Z'),
      endedAt: new Date('2020-09-26T10:05:50Z'),
    });
    expect(lesson.durationTime).toBe(340000);
    expect(lesson.durationInMinutes).toBe(6);
  });

  it('should get zero when isn"t possible calculate the duration', async () => {
    let lesson = await createFakeLesson();
    expect(lesson.durationTime).toBe(0);
    expect(lesson.durationInMinutes).toBe(0);

    lesson = await createFakeLesson({
      startedAt: new Date('2020-09-26T10:00:10Z'),
    });
    expect(lesson.durationTime).toBe(0);
    expect(lesson.durationInMinutes).toBe(0);
  });

  it('should calculate finished property', async () => {
    let lesson = await createFakeLesson();
    expect(lesson.finished).toBe(false);

    lesson = await createFakeLesson({
      startedAt: new Date('2020-09-26T10:00:10Z'),
      endedAt: new Date('2020-09-26T10:05:50Z'),
    });
    expect(lesson.finished).toBe(true);
  });
});
