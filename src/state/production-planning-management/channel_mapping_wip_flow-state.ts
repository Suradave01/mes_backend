/* eslint-disable prettier/prettier */

export const ChannelMappingWipFlowState = {
  START: 'start',
  ACTIVE: 'active',
  DELETE: 'delete',
};

export const ChannelMappingWipFlowTransition = {
  NEW: 'new',
  CO_DELETE: 'co_delete',
  DELETE: 'delete',
};

export const StateChannelMappingWipFlowDef = {
  id: 'ChannelMappingWipFlow',
  initial: ChannelMappingWipFlowState.START,
  context: {},
  states: {
    [ChannelMappingWipFlowState.START]: {
      on: {
        [ChannelMappingWipFlowTransition.NEW]: {
          target: ChannelMappingWipFlowState.ACTIVE,
          actions: [''],
        },
      },
    },
    [ChannelMappingWipFlowState.ACTIVE]: {
      on: {
        [ChannelMappingWipFlowTransition.CO_DELETE]: {
          target: ChannelMappingWipFlowState.DELETE,
          actions: [''],
        },
        [ChannelMappingWipFlowTransition.DELETE]: {
          target: ChannelMappingWipFlowState.DELETE,
          actions: [''],
        },
      },
    },
    [ChannelMappingWipFlowState.DELETE]: {
      type: 'final',
    },
  },
};

export const optionsStateChannelMappingWipFlowDef = {
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
