/* eslint-disable prettier/prettier */

import {
  WorkOrderItemModel,
  WorkOrderModel,
} from 'src/production-planning-management/entities';

export const WorkOrderItemState = {
  START: 'start',
  READY: 'ready',
  ON_PROCESS: 'on_process',
  COMPLETE: 'complete',
  STOP: 'stop',
  CANCEL: 'cancel',
};

export const WorkOrderItemTransition = {
  CO_CREATE: 'co_create',
  CO_START: 'co_start',
  CO_STOP: 'co_stop',
  CO_RESUME: 'co_resume',
  CO_RETRIEVE: 'co_retrieve',
  CO_CANCEL: 'co_cancel',
  CO_FINISH: 'co_finish',
};

export const StateWorkOrderItemDef = {
  id: 'WorkOrderItem',
  initial: WorkOrderItemState.START,
  context: {},
  states: {
    [WorkOrderItemState.START]: {
      on: {
        [WorkOrderItemTransition.CO_CREATE]: {
          target: WorkOrderItemState.READY,
        },
      },
    },
    [WorkOrderItemState.READY]: {
      on: {
        [WorkOrderItemTransition.CO_START]: {
          target: WorkOrderItemState.ON_PROCESS,
          actions: ['CoProcessWorkOrder'],
        },
      },
    },
    [WorkOrderItemState.ON_PROCESS]: {
      on: {
        [WorkOrderItemTransition.CO_STOP]: {
          target: WorkOrderItemState.STOP,
        },
        [WorkOrderItemTransition.CO_FINISH]: {
          target: WorkOrderItemState.COMPLETE,
          // actions: ['CoCompleteWorkOrder'],
        },
      },
    },
    [WorkOrderItemState.STOP]: {
      on: {
        [WorkOrderItemTransition.CO_RESUME]: {
          target: WorkOrderItemState.ON_PROCESS,
          actions: ['CoProcessWorkOrder'],
        },
        [WorkOrderItemTransition.CO_CANCEL]: {
          target: WorkOrderItemState.CANCEL,
          actions: ['CoCompleteWithConditionWorkOrder'],
        },
      },
    },
    [WorkOrderItemState.CANCEL]: {
      on: {
        [WorkOrderItemTransition.CO_START]: {
          target: WorkOrderItemState.ON_PROCESS,
          actions: ['ON_PROCESS'],
        },
        [WorkOrderItemTransition.CO_RETRIEVE]: {
          target: WorkOrderItemState.STOP,
          actions: ['CoRetrieveWorkOrder'],
        },
      },
    },
    [WorkOrderItemState.COMPLETE]: {
      // type: 'final',
    },
  },
};

export const optionsStateWorkOrderItemDef = {
  actions: {
    CoProcessWorkOrder: async (
      context: WorkOrderItemModel,
      event,
    ): Promise<any> => {
      Promise.all([context.WorkOrder.CoProcessWorkOrder(context, event)]);
    },
    // CoCompleteWorkOrder: async (
    //   context: WorkOrderItemModel,
    //   event,
    // ): Promise<any> => {
    // Promise.all([context.WorkOrder.CoCompleteWorkOrder(context, event)]);
    // },
    CoCompleteWithConditionWorkOrder: async (
      context: WorkOrderItemModel,
      event,
    ): Promise<any> => {
      Promise.all([
        context.WorkOrder.CoCompleteWithConditionWorkOrder(context, event),
      ]);
    },
    CoRetrieveWorkOrder: async (
      context: WorkOrderItemModel,
      event,
    ): Promise<any> => {
      Promise.all([context.WorkOrder.CoRetrieveWorkOrder(context, event)]);
    },
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
