/* eslint-disable prettier/prettier */

export const WipFlowMappingState = {
  START: 'start',
  ACTIVE: 'active',
  DELETE: 'delete',
};

export const WipFlowMappingTransition = {
  NEW: 'new',
  CO_CREATE: 'co_create',
  CO_DELETE: 'co_delete',
  DELETE: 'delete',
};

export const StateWipFlowMappingDef = {
  id: 'WipFlowMapping',
  initial: WipFlowMappingState.START,
  context: {},
  states: {
    [WipFlowMappingState.START]: {
      on: {
        [WipFlowMappingTransition.NEW]: {
          target: WipFlowMappingState.ACTIVE,
          actions: [''],
        },
        [WipFlowMappingTransition.CO_CREATE]: {
          target: WipFlowMappingState.ACTIVE,
          actions: [''],
        },
      },
    },
    [WipFlowMappingState.ACTIVE]: {
      on: {
        [WipFlowMappingTransition.CO_DELETE]: {
          target: WipFlowMappingState.DELETE,
          actions: [''],
        },
        [WipFlowMappingTransition.DELETE]: {
          target: WipFlowMappingState.DELETE,
          actions: [''],
        },
      },
    },
    [WipFlowMappingState.DELETE]: {
      type: 'final',
    },
  },
};

export const optionsStateWipFlowMappingDef = {
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
