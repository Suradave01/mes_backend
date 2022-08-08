/* eslint-disable prettier/prettier */

export const ChannelMappingWipState = {
  START: 'start',
  ACTIVE: 'active',
  DELETE: 'delete',
};

export const ChannelMappingWipTransition = {
  NEW: 'new',
  CO_DELETE: 'co_delete',
  DELETE: 'delete',
};

export const StateChannelMappingWipDef = {
  id: 'ChannelMappingWip',
  initial: ChannelMappingWipState.START,
  context: {},
  states: {
    [ChannelMappingWipState.START]: {
      on: {
        [ChannelMappingWipTransition.NEW]: {
          target: ChannelMappingWipState.ACTIVE,
          actions: [''],
        },
      },
    },
    [ChannelMappingWipState.ACTIVE]: {
      on: {
        [ChannelMappingWipTransition.CO_DELETE]: {
          target: ChannelMappingWipState.DELETE,
          actions: [''],
        },
        [ChannelMappingWipTransition.DELETE]: {
          target: ChannelMappingWipState.DELETE,
          actions: [''],
        },
      },
    },
    [ChannelMappingWipState.DELETE]: {
      type: 'final',
    },
  },
};

export const optionsStateChannelMappingWipDef = {
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
