import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateLessonsTable1631920483967 implements MigrationInterface {
  name = 'CreateLessonsTable1631920483967';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'lessons',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'code',
            type: 'varchar',
            length: '50',
          },
          {
            name: 'student_id',
            type: 'uuid',
            isUnique: true,
          },
          {
            name: 'teacher_id',
            type: 'uuid',
          },
          {
            name: 'started_at',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'ended_at',
            type: 'timestamp',
            isNullable: true,
          },
          {
            default: 'now()',
            name: 'created_at',
            type: 'timestamp',
          },
          {
            default: 'now()',
            name: 'updated_at',
            type: 'timestamp',
          },
        ],
      }),
      true
    );

    await queryRunner.createForeignKey(
      'lessons',
      new TableForeignKey({
        columnNames: ['student_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
      })
    );

    await queryRunner.createForeignKey(
      'lessons',
      new TableForeignKey({
        columnNames: ['teacher_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('lessons');
  }
}
