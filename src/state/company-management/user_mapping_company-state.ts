/* eslint-disable prettier/prettier */

export const UserMappingCompanyState = {
  START: 'start',
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DELETE: 'delete',
};

export const UserMappingCompanyTransition = {
  NEW: 'new',
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DELETE: 'delete',
};

export const StateUserMappingCompanyDef = {
  id: 'userMappingCompany',
  initial: UserMappingCompanyState.START,
  context: {},
  states: {
    [UserMappingCompanyState.START]: {
      on: {
        [UserMappingCompanyTransition.NEW]: {
          target: UserMappingCompanyState.ACTIVE,
          actions: [''],
        },
        [UserMappingCompanyTransition.DELETE]: {
          target: UserMappingCompanyState.DELETE,
          actions: [''],
        },
      },
    },
    [UserMappingCompanyState.ACTIVE]: {
      on: {
        [UserMappingCompanyTransition.INACTIVE]: {
          target: UserMappingCompanyState.INACTIVE,
          actions: [''],
        },
        [UserMappingCompanyTransition.DELETE]: {
          target: UserMappingCompanyState.DELETE,
          actions: [''],
        },
      },
    },
    [UserMappingCompanyState.INACTIVE]: {
      on: {
        [UserMappingCompanyTransition.ACTIVE]: {
          target: UserMappingCompanyState.ACTIVE,
          actions: [''],
        },
        [UserMappingCompanyTransition.DELETE]: {
          target: UserMappingCompanyState.DELETE,
          actions: [''],
        },
      },
    },
    [UserMappingCompanyState.DELETE]: {
      type: 'final',
    },
  },
};

export const optionsStateUserMappingCompanyDef = {
  actions: {
    /* ... */
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
