import BaseEntity from '@app/core/entities/Base';

export class ViewModel<Entity = BaseEntity> {
  protected hiddenFields: string[] = [];

  constructor(private entity: Entity) {}

  toJSON() {
    const result: { [key: string]: any } = {};
    for (const key in this.entity) {
      if (this.hiddenFields.includes(key)) continue;
      result[key] = this.entity[key];
    }
    return result;
  }
}
