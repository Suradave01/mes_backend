/* eslint-disable prettier/prettier */

export const ContactMappingChannelState = {
  START: 'start',
  ACTIVE: 'active',
  DELETE: 'delete',
};

export const ContactMappingChannelTransition = {
  NEW: 'new',
  DELETE: 'delete',
  CO_DELETE: 'co_delete',
};

export const StateContactMappingChannelDef = {
  id: 'contactMappingChannel',
  initial: ContactMappingChannelState.START,
  context: {},
  states: {
    [ContactMappingChannelState.START]: {
      on: {
        [ContactMappingChannelTransition.NEW]: {
          target: ContactMappingChannelState.ACTIVE,
        },
      },
    },
    [ContactMappingChannelState.ACTIVE]: {
      on: {
        [ContactMappingChannelTransition.DELETE]: {
          target: ContactMappingChannelState.DELETE,
        },
        [ContactMappingChannelTransition.CO_DELETE]: {
          target: ContactMappingChannelState.DELETE,
        },
      },
    },
    [ContactMappingChannelState.DELETE]: {
      type: 'final',
    },
  },
};

export const optionsStateContactMappingChannelDef = {
  actions: {
    /** */
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
