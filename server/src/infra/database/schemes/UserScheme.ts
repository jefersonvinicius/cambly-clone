import { EntitySchema } from 'typeorm';
import { schemesBaseColumns } from '.';

export type UserSchemeProperties = {
  name: string;
  type: string;
  email: string;
  password: string;
  id: string;
  createdAt: string;
  updatedAt: string;
};

export const UserScheme = new EntitySchema<UserSchemeProperties>({
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
