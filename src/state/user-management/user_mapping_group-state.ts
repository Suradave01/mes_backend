/* eslint-disable prettier/prettier */

export const UserMappingGroupState = {
  START: 'start',
  ACTIVE: 'active',
  DELETE: 'delete',
};

export const UserMappingGroupTransition = {
  NEW: 'new',
  DELETE: 'delete',
};

export const StateUserMappingGroupDef = {
  id: 'userMappingGroup',
  initial: UserMappingGroupState.START,
  context: {},
  states: {
    [UserMappingGroupState.START]: {
      on: {
        [UserMappingGroupTransition.NEW]: {
          target: UserMappingGroupState.ACTIVE,
        },
        [UserMappingGroupTransition.DELETE]: {
          target: UserMappingGroupState.DELETE,
        },
      },
    },
    [UserMappingGroupState.ACTIVE]: {
      on: {
        [UserMappingGroupTransition.DELETE]: {
          target: UserMappingGroupState.DELETE,
          actions: ['', ''],
        },
      },
    },
    [UserMappingGroupState.DELETE]: {
      type: 'final',
    },
  },
};

export const optionsStateUserMappingGroupDef = {
  actions: {},
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
