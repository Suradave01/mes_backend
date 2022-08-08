import { faker } from '@faker-js/faker';
import { GroupModel } from 'src/user-management/entities';
import { define } from 'typeorm-seeding';

define(GroupModel, () => {
  const group = new GroupModel();
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  group.group_name = `${firstName} ${lastName}`;
  group.group_description = faker.lorem.lines();
  group.default_role = 0;
  return group;
});
