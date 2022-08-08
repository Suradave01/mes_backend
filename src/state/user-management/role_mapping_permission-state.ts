/* eslint-disable prettier/prettier */

export const RoleMappingPermissionState = {
  START: 'start',
  ACTIVE: 'active',
  DELETE: 'delete',
};

export const RoleMappingPermissionTransition = {
  NEW: 'new',
  DELETE: 'delete',
};

export const StateRoleMappingPermissionDef = {
  id: 'role_mapping_permission',
  initial: RoleMappingPermissionState.START,
  context: {},
  states: {
    [RoleMappingPermissionState.START]: {
      on: {
        [RoleMappingPermissionTransition.NEW]: {
          target: RoleMappingPermissionState.ACTIVE,
        },
        [RoleMappingPermissionTransition.DELETE]: {
          target: RoleMappingPermissionState.DELETE,
        },
      },
    },
    [RoleMappingPermissionState.ACTIVE]: {
      on: {
        [RoleMappingPermissionTransition.DELETE]: {
          target: RoleMappingPermissionState.DELETE,
        },
      },
    },
    [RoleMappingPermissionState.DELETE]: {
      type: 'final',
    },
  },
};
