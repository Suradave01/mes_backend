/* eslint-disable prettier/prettier */

export const WorkOrderState = {
  START: 'start',
  READY: 'ready',
  ON_PROCESS: 'on_process',
  COMPLETE: 'complete',
  COMPLETE_WITH_CONDITION: 'complete_with_condition',
};

export const WorkOrderTransition = {
  CO_CREATE: 'co_create',
  CO_PROCESS: 'co_process',
  CO_COMPLETE_WITH_CONDITION: 'co_complete_with_condition',
  CO_COMPLETE: 'co_complete',
  CO_RETRIEVE: 'co_retrieve',
};

export const StateWorkOrderDef = {
  id: 'WorkOrder',
  initial: WorkOrderState.START,
  context: {},
  states: {
    [WorkOrderState.START]: {
      on: {
        [WorkOrderTransition.CO_CREATE]: {
          target: WorkOrderState.READY,
        },
      },
    },
    [WorkOrderState.READY]: {
      on: {
        [WorkOrderTransition.CO_PROCESS]: {
          target: WorkOrderState.ON_PROCESS,
        },
      },
    },
    [WorkOrderState.ON_PROCESS]: {
      on: {
        [WorkOrderTransition.CO_COMPLETE]: {
          target: WorkOrderState.COMPLETE,
        },
        [WorkOrderTransition.CO_COMPLETE_WITH_CONDITION]: {
          target: WorkOrderState.COMPLETE_WITH_CONDITION,
        },
      },
    },
    [WorkOrderState.COMPLETE_WITH_CONDITION]: {
      on: {
        [WorkOrderTransition.CO_RETRIEVE]: {
          target: WorkOrderState.ON_PROCESS,
        },
      },
    },
    [WorkOrderState.COMPLETE]: {
      // type: 'final',
    },
  },
};

export const optionsStateWorkOrderDef = {
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
