import { EntitySchema } from 'typeorm';
import { BaseSchemaProperties, schemesBaseColumns } from '.';

export type UserSchemaProperties = BaseSchemaProperties & {
  name: string;
  type: string;
  email: string;
  password: string;
};

export const UserSchema = new EntitySchema<UserSchemaProperties>({
  name: 'user',
  tableName: 'users',
  columns: {
    ...schemesBaseColumns,
    name: {
      type: String,
      nullable: false,
    },
    type: {
      type: String,
      nullable: false,
    },
    email: {
      type: String,
      unique: true,
      nullable: false,
    },
    password: {
      type: String,
      nullable: false,
    },
  },
});
