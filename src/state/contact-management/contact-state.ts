/* eslint-disable prettier/prettier */

export const ContactState = {
  START: 'start',
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DELETE: 'delete',
};

export const ContactTransition = {
  NEW: 'new',
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DELETE: 'delete',
};

export const StateContactDef = {
  id: 'contact',
  initial: ContactState.START,
  context: {},
  states: {
    [ContactState.START]: {
      on: {
        [ContactTransition.NEW]: {
          target: ContactState.ACTIVE,
          actions: [''],
        },
      },
    },
    [ContactState.ACTIVE]: {
      on: {
        [ContactTransition.INACTIVE]: {
          target: ContactState.INACTIVE,
          actions: [''],
        },
      },
    },
    [ContactState.INACTIVE]: {
      on: {
        [ContactTransition.ACTIVE]: {
          target: ContactState.ACTIVE,
          actions: [''],
        },
        [ContactTransition.DELETE]: {
          target: ContactState.DELETE,
          actions: [''],
        },
      },
    },
    [ContactState.DELETE]: {
      type: 'final',
    },
  },
};

export const optionsStateContactDef = {
  actions: {
    //
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
