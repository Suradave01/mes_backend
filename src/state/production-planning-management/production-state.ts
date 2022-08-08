/* eslint-disable prettier/prettier */

export const ProductionState = {
  START: 'start',
  IMPORTED: 'imported',
  PASS: 'pass',
  FAIL: 'fail',
  INACTIVE: 'inactive',
  COMPLETE: 'complete',
};

export const ProductionTransition = {
  CO_IMPORT: 'co_import',
  NEW: 'new',
  APPROVE: 'approve',
  REJECT: 'reject',
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  START_WORK_ORDER: 'start_work_order',
};

export const StateProductionDef = {
  id: 'Production',
  initial: ProductionState.START,
  context: {},
  states: {
    [ProductionState.START]: {
      on: {
        [ProductionTransition.CO_IMPORT]: {
          target: ProductionState.IMPORTED,
          actions: [''],
        },
        [ProductionTransition.NEW]: {
          target: ProductionState.PASS,
          actions: [''],
        },
      },
    },
    [ProductionState.IMPORTED]: {
      on: {
        [ProductionTransition.REJECT]: {
          target: ProductionState.FAIL,
          actions: [''],
        },
        [ProductionTransition.APPROVE]: {
          target: ProductionState.PASS,
          actions: [''],
        },
      },
    },
    [ProductionState.PASS]: {
      on: {
        [ProductionTransition.INACTIVE]: {
          target: ProductionState.INACTIVE,
          actions: [''],
        },
        [ProductionTransition.START_WORK_ORDER]: {
          target: ProductionState.COMPLETE,
          actions: [''],
        },
      },
    },
    [ProductionState.INACTIVE]: {
      on: {
        [ProductionTransition.ACTIVE]: {
          target: ProductionState.PASS,
          actions: [''],
        },
      },
    },
    [ProductionState.COMPLETE]: {
      type: 'final',
    },
  },
};

export const optionsStateProductionDef = {
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
