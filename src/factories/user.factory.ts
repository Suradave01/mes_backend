import { faker } from '@faker-js/faker';
import { UserModel } from 'src/user-management/entities';
import { define } from 'typeorm-seeding';
import * as bcrypt from 'bcrypt';

define(UserModel, () => {
  const model = new UserModel();
  model.is_system = true;
  model.username = 'admin';
  model.email = 'arthinankaraket@gmail.com';
  model.password = 'admin';
  return model;
});
