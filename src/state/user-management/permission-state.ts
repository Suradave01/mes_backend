/* eslint-disable prettier/prettier */

import { PermissionModel } from 'src/user-management/entities/permission.entity';

export const PermissionState = {
  START: 'start',
  ACTIVE: 'active',
  DELETE: 'delete',
};

export const PermissionTransition = {
  NEW: 'new',
  DELETE: 'delete',
};

export const StatePermissionDef = {
  id: 'permission',
  initial: PermissionState.START,
  context: {},
  states: {
    [PermissionState.START]: {
      on: {
        [PermissionTransition.NEW]: {
          target: PermissionState.ACTIVE,
        },
      },
    },
    [PermissionState.ACTIVE]: {
      on: {
        [PermissionTransition.DELETE]: {
          target: PermissionState.DELETE,
          actions: ['CoDeleteRoleMappingPermission'],
        },
      },
    },
    [PermissionState.DELETE]: {
      type: 'final',
    },
  },
};

export const optionsStatePermissionDef = {
  actions: {
    // CoCreateTestCo: async (context: TestModel, event): Promise<any> => {
    //   const coModel = new TestCoModel();
    //   coModel.title = 'testCo';
    //   await context.stateRunner.manager.save(coModel);
    //   context.testCo_id = coModel.id;
    //   // return Promise.all(
    //   //   context.contentCategories.map((contentCategory) => {
    //   //     contentCategory.CoCreateTestCo(context, event);
    //   //   }),
    //   // );
    // },

    CoDeleteRoleMappingPermission: async (
      context: PermissionModel,
      event,
    ): Promise<any> => {
      for (let i = 0; i < context.RoleMappingPermissions.length; i++) {
        Promise.all([
          context.RoleMappingPermissions[i].CoPermissionDelete(context, event),
        ]);
      }
    },
  },
  activities: {
    /* ... */
  },
  delays: {
    /* ... */
  },
  guards: {
    /* ... */
  },
  services: {
    /* ... */
  },
};
