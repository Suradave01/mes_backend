/* eslint-disable prettier/prettier */

export const MessageState = {
  START: 'start',
  CREATE: 'create',
  SENDING: 'sending',
  SENT: 'sent',
  PARTIAL: 'partial',
  FAIL: 'fail',
  DELETE: 'delete',
};

export const MessageTransition = {
  NEW: 'new',
  CO_CREATE: 'co_create',
  CO_START_SEND: 'co_start_send',
  CO_SEND_ALL: 'co_send_all',
  CO_SEND_COMPLETE: 'co_send_complete',
  CO_SEND_FAIL: 'co_send_fail',
  DELETE: 'delete',
};

export const StateMessageDef = {
  id: 'message',
  initial: MessageState.START,
  context: {},
  states: {
    [MessageState.START]: {
      on: {
        [MessageTransition.CO_CREATE]: {
          target: MessageState.CREATE,
          actions: [''],
        },
      },
    },
    [MessageState.CREATE]: {
      on: {
        [MessageTransition.CO_START_SEND]: {
          target: MessageState.SENDING,
          actions: [''],
        },
      },
    },
    [MessageState.SENDING]: {
      on: {
        [MessageTransition.CO_SEND_ALL]: {
          target: MessageState.PARTIAL,
          actions: [''],
        },
        [MessageTransition.CO_SEND_COMPLETE]: {
          target: MessageState.SENT,
          actions: [''],
        },
        [MessageTransition.CO_SEND_FAIL]: {
          target: MessageState.FAIL,
          actions: [''],
        },
      },
    },
    [MessageState.PARTIAL]: {
      on: {
        [MessageTransition.DELETE]: {
          target: MessageState.DELETE,
          actions: [''],
        },
      },
    },
    [MessageState.SENT]: {
      on: {
        [MessageTransition.DELETE]: {
          target: MessageState.DELETE,
          actions: [''],
        },
      },
    },
    [MessageState.FAIL]: {
      on: {
        [MessageTransition.DELETE]: {
          target: MessageState.DELETE,
          actions: [''],
        },
      },
    },
    [MessageState.DELETE]: {
      type: 'final',
    },
  },
};

export const optionsStateMessageDef = {
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
