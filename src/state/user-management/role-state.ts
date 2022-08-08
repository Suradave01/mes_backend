/* eslint-disable prettier/prettier */

import { RoleModel } from 'src/user-management/entities/role.entity';

export const RoleState = {
  START: 'start',
  ACTIVE: 'active',
  DELETE: 'delete',
};

export const RoleTransition = {
  NEW: 'new',
  DELETE: 'delete',
};

export const StateRoleDef = {
  id: 'role',
  initial: RoleState.START,
  context: {},
  states: {
    [RoleState.START]: {
      on: {
        [RoleTransition.NEW]: {
          target: RoleState.ACTIVE,
        },
      },
    },
    [RoleState.ACTIVE]: {
      on: {
        [RoleTransition.DELETE]: {
          target: RoleState.DELETE,
          actions: [
            'CoDeleteMenuMappingRole',
            'CoDeleteRoleMappingPermission',
            'CoDeleteUserMappingRole',
          ],
        },
      },
    },
    [RoleState.DELETE]: {
      type: 'final',
    },
  },
};

export const optionsStateRoleDef = {
  actions: {
    CoDeleteRoleMappingPermission: async (
      context: RoleModel,
      event,
    ): Promise<any> => {
      for (let i = 0; i < context.RoleMappingPermissions.length; i++) {
        Promise.all([
          context.RoleMappingPermissions[i].CoRoleDelete(context, event),
        ]);
      }
    },
    CoDeleteMenuMappingRole: async (
      context: RoleModel,
      event,
    ): Promise<any> => {
      for (let i = 0; i < context.MenuMappingRoles.length; i++) {
        Promise.all([context.MenuMappingRoles[i].CoRoleDelete(context, event)]);
      }
    },
    CoDeleteUserMappingRole: async (
      context: RoleModel,
      event,
    ): Promise<any> => {
      for (let i = 0; i < context.UserMappingRoles.length; i++) {
        Promise.all([context.UserMappingRoles[i].CoRoleDelete(context, event)]);
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
