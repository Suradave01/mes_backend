/* eslint-disable prettier/prettier */

export const MenuMappingRoleState = {
  START: 'start',
  ACTIVE: 'active',
  DELETE: 'delete',
};

export const MenuMappingRoleTransition = {
  NEW: 'new',
  DELETE: 'delete',
};

export const StateMenuMappingRoleDef = {
  id: 'menu_mapping_role',
  initial: MenuMappingRoleState.START,
  context: {},
  states: {
    [MenuMappingRoleState.START]: {
      on: {
        [MenuMappingRoleTransition.NEW]: {
          target: MenuMappingRoleState.ACTIVE,
        },
        [MenuMappingRoleTransition.DELETE]: {
          target: MenuMappingRoleState.DELETE,
        },
      },
    },
    [MenuMappingRoleState.ACTIVE]: {
      on: {
        [MenuMappingRoleTransition.DELETE]: {
          target: MenuMappingRoleState.DELETE,
        },
      },
    },
    [MenuMappingRoleState.DELETE]: {
      type: 'final',
    },
  },
};
