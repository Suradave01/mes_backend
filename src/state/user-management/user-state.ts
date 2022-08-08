/* eslint-disable prettier/prettier */

import { UserModel } from '../../user-management/entities/user.entity';

export const UserState = {
  START: 'start',
  ACTIVE: 'active',
  DELETE: 'delete',
  INACTIVE: 'inactive',
};

export const UserTransition = {
  NEW: 'new',
  DELETE: 'delete',
  ACTIVE: 'active',
  INACTIVE: 'inactive',
};

export const StateUserDef = {
  id: 'user',
  initial: UserState.START,
  context: {},
  states: {
    [UserState.START]: {
      on: {
        [UserTransition.NEW]: {
          target: UserState.ACTIVE,
          actions: [''],
        },
      },
    },
    [UserState.ACTIVE]: {
      on: {
        [UserTransition.INACTIVE]: {
          target: UserState.INACTIVE,
          actions: [''],
        },
      },
    },
    [UserState.INACTIVE]: {
      on: {
        [UserTransition.DELETE]: {
          target: UserState.DELETE,
          actions: [
            'CoDeleteUserMappingRole',
            'CoDeleteUserMappingPartition',
            'CoDeleteUserMappingGroup',
            'CoDeleteUserMappingCompany',
          ],
        },
        [UserTransition.ACTIVE]: {
          target: UserState.ACTIVE,
          actions: [''],
        },
      },
    },
    [UserState.DELETE]: {
      type: 'final',
    },
  },
};

export const optionsStateUserDef = {
  actions: {
    CoDeleteUserMappingRole: async (
      context: UserModel,
      event,
    ): Promise<any> => {
      for (let i = 0; i < context.UserMappingRoles.length; i++) {
        Promise.all([context.UserMappingRoles[i].CoUserDelete(context, event)]);
      }
    },
    CoDeleteUserMappingPartition: async (
      context: UserModel,
      event,
    ): Promise<any> => {
      for (let i = 0; i < context.UserMappingPartitions.length; i++) {
        Promise.all([
          context.UserMappingPartitions[i].CoUserDelete(context, event),
        ]);
      }
    },
    CoDeleteUserMappingGroup: async (
      context: UserModel,
      event,
    ): Promise<any> => {
      for (let i = 0; i < context.UserMappingGroups.length; i++) {
        Promise.all([
          context.UserMappingGroups[i].CoUserDelete(context, event),
        ]);
      }
    },
    CoDeleteUserMappingCompany: async (
      context: UserModel,
      event,
    ): Promise<any> => {
      for (let i = 0; i < context.UserMappingCompanies.length; i++) {
        Promise.all([
          context.UserMappingCompanies[i].CoUserDelete(context, event),
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
