/* eslint-disable prettier/prettier */

export const CustomerState = {
  START: 'start',
  IMPORTED: 'imported',
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DELETE: 'delete',
};

export const CustomerTransition = {
  NEW: 'new',
  CO_IMPORT: 'co_import',
  APPROVE: 'approve',
  REJECT: 'reject',
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DELETE: 'delete',
};

export const StateCustomerDef = {
  id: 'customer',
  initial: CustomerState.START,
  context: {},
  states: {
    [CustomerState.START]: {
      on: {
        [CustomerTransition.NEW]: {
          target: CustomerState.ACTIVE,
          actions: [''],
        },
        [CustomerTransition.CO_IMPORT]: {
          target: CustomerState.IMPORTED,
          actions: [''],
        },
        [CustomerTransition.DELETE]: {
          target: CustomerState.DELETE,
          actions: [''],
        },
      },
    },
    [CustomerState.IMPORTED]: {
      on: {
        [CustomerTransition.APPROVE]: {
          target: CustomerState.ACTIVE,
          actions: [''],
        },
        [CustomerTransition.REJECT]: {
          target: CustomerState.INACTIVE,
          actions: [''],
        },
        [CustomerTransition.DELETE]: {
          target: CustomerState.DELETE,
          actions: [''],
        },
      },
    },
    [CustomerState.ACTIVE]: {
      on: {
        [CustomerTransition.INACTIVE]: {
          target: CustomerState.INACTIVE,
          actions: [''],
        },
        [CustomerTransition.DELETE]: {
          target: CustomerState.DELETE,
          actions: [''],
        },
      },
    },
    [CustomerState.INACTIVE]: {
      on: {
        [CustomerTransition.ACTIVE]: {
          target: CustomerState.ACTIVE,
          actions: [''],
        },
        [CustomerTransition.DELETE]: {
          target: CustomerState.DELETE,
          actions: [''],
        },
      },
    },
    [CustomerState.DELETE]: {
      type: 'final',
    },
  },
};

export const optionsStateCustomerDef = {
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
