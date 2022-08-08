/* eslint-disable prettier/prettier */

export const WipFlowState = {
  START: 'start',
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DELETE: 'delete',
};

export const WipFlowTransition = {
  CREATE: 'create',
  CO_CREATE: 'co_create',
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DELETE: 'delete',
};

export const StateWipFlowDef = {
  id: 'WipFlow',
  initial: WipFlowState.START,
  context: {},
  states: {
    [WipFlowState.START]: {
      on: {
        [WipFlowTransition.CREATE]: {
          target: WipFlowState.ACTIVE,
          actions: [''],
        },
        [WipFlowTransition.CO_CREATE]: {
          target: WipFlowState.ACTIVE,
          actions: [''],
        },
      },
    },
    [WipFlowState.ACTIVE]: {
      on: {
        [WipFlowTransition.INACTIVE]: {
          target: WipFlowState.INACTIVE,
          actions: [''],
        },
      },
    },
    [WipFlowState.INACTIVE]: {
      on: {
        [WipFlowTransition.ACTIVE]: {
          target: WipFlowState.ACTIVE,
          actions: [''],
        },
        [WipFlowTransition.DELETE]: {
          target: WipFlowState.DELETE,
          actions: [''],
        },
      },
    },
    [WipFlowState.DELETE]: {
      type: 'final',
    },
  },
};

export const optionsStateWipFlowDef = {
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
