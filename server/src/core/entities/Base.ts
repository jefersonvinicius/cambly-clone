import UUID from '@app/shared/UUID';

export default class BaseEntity {
  readonly id: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor(data?: BaseEntityData) {
    this.id = data?.id ?? UUID.v4();
    this.createdAt =
      typeof data?.createdAt === 'string'
        ? new Date(data.createdAt)
        : data?.createdAt ?? new Date(new Date().toUTCString());

    this.updatedAt =
      typeof data?.updatedAt === 'string'
        ? new Date(data.updatedAt)
        : data?.updatedAt ?? new Date(new Date().toUTCString());
  }
}

export type BaseEntityData = {
  id?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
};
