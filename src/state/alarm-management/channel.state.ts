/* eslint-disable prettier/prettier */

export const ChannelState = {
  START: 'start',
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DELETE: 'delete',
};

export const ChannelTransition = {
  NEW: 'new',
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DELETE: 'delete',
};

export const StateChannelDef = {
  id: 'channel',
  initial: ChannelState.START,
  context: {},
  states: {
    [ChannelState.START]: {
      on: {
        [ChannelTransition.NEW]: {
          target: ChannelState.ACTIVE,
          actions: [''],
        },
      },
    },
    [ChannelState.ACTIVE]: {
      on: {
        [ChannelTransition.INACTIVE]: {
          target: ChannelState.INACTIVE,
          actions: [''],
        },
      },
    },
    [ChannelState.INACTIVE]: {
      on: {
        [ChannelTransition.ACTIVE]: {
          target: ChannelState.ACTIVE,
          actions: [''],
        },
        [ChannelTransition.DELETE]: {
          target: ChannelState.DELETE,
          actions: [''],
        },
      },
    },
    [ChannelState.DELETE]: {
      type: 'final',
    },
  },
};

export const optionsStateChannelDef = {
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
