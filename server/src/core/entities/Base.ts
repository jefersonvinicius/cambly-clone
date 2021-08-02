import UUID from '@app/shared/UUID';

export default class BaseEntity {
  readonly id: string;
  protected createdAt: Date;
  protected updatedAt: Date;

  constructor(data?: BaseEntityData) {
    this.id = data?.id ?? UUID.v4();
    this.createdAt = data?.createdAt ?? new Date();
    this.updatedAt = data?.updatedAt ?? new Date();
  }
}

export type BaseEntityData = {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
};
