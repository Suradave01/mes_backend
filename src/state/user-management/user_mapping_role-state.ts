/* eslint-disable prettier/prettier */

export const UserMappingRoleState = {
  START: 'start',
  ACTIVE: 'active',
  DELETE: 'delete',
};

export const UserMappingRoleTransition = {
  NEW: 'new',
  DELETE: 'delete',
};

export const StateUserMappingRoleDef = {
  id: 'userMappingRole',
  initial: UserMappingRoleState.START,
  context: {},
  states: {
    [UserMappingRoleState.START]: {
      on: {
        [UserMappingRoleTransition.NEW]: {
          target: UserMappingRoleState.ACTIVE,
        },
        [UserMappingRoleTransition.DELETE]: {
          target: UserMappingRoleState.DELETE,
        },
      },
    },
    [UserMappingRoleState.ACTIVE]: {
      on: {
        [UserMappingRoleTransition.DELETE]: {
          target: UserMappingRoleState.DELETE,
        },
      },
    },
    [UserMappingRoleState.DELETE]: {
      type: 'final',
    },
  },
};

export const optionsStateUserMappingRoleDef = {
  actions: {
    // CoDeletePermission: async (context: UserMappingRoleModel, event): Promise<any> => {
    //   return Promise.all([
    //     context.Permissions[0].CoUserMappingRoleDelete(context, event),
    //   ]);
    // },
    // CoDeleteMenuMappingRole: async (
    //   context: UserMappingRoleModel,
    //   event,
    // ): Promise<any> => {
    //   return Promise.all([
    //     context.MenuMappingRoles[0].CoUserMappingRoleDelete(context, event),
    //   ]);
    // },
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
