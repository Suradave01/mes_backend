/* eslint-disable prettier/prettier */

export const MessageMappingContactChannelState = {
  START: 'start',
  INIT: 'init',
  SUCCESS: 'success',
  FAIL: 'fail',
  DELETE: 'delete',
};

export const MessageMappingContactChannelTransition = {
  INIT: 'init',
  SUCCESS: 'success',
  FAIL: 'fail',
  CO_DELETE: 'co_delete',
};

export const StateMessageMappingContactChannelDef = {
  id: 'MessageMappingContactChannel',
  initial: MessageMappingContactChannelState.START,
  context: {},
  states: {
    [MessageMappingContactChannelState.START]: {
      on: {
        [MessageMappingContactChannelTransition.INIT]: {
          target: MessageMappingContactChannelState.INIT,
          actions: [''],
        },
      },
    },

    [MessageMappingContactChannelState.INIT]: {
      on: {
        [MessageMappingContactChannelTransition.SUCCESS]: {
          target: MessageMappingContactChannelState.SUCCESS,
          actions: [''],
        },
        [MessageMappingContactChannelTransition.FAIL]: {
          target: MessageMappingContactChannelState.FAIL,
          actions: [''],
        },
      },
    },
    [MessageMappingContactChannelState.SUCCESS]: {
      on: {
        [MessageMappingContactChannelTransition.CO_DELETE]: {
          target: MessageMappingContactChannelState.DELETE,
          actions: [''],
        },
      },
    },
    [MessageMappingContactChannelState.FAIL]: {
      on: {
        [MessageMappingContactChannelTransition.CO_DELETE]: {
          target: MessageMappingContactChannelState.DELETE,
          actions: [''],
        },
      },
    },
    [MessageMappingContactChannelState.DELETE]: {
      type: 'final',
    },
  },
};

export const optionsStateMessageMappingContactChannelDef = {
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
