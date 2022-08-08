/* eslint-disable prettier/prettier */

export const TriggerState = {
  START: 'start',
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DISABLE_ACTIVE: 'disable_active',
  DISABLE_INACTIVE: 'disable_inactive',
  DELETE: 'delete',
};

export const TriggerTransition = {
  NEW: 'new',
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DELETE: 'delete',
  CO_DISABLE: 'co_disable',
  CO_ENABLE: 'co_enable',
  CO_DELETE: 'co_delete',
};

export const StateTriggerDef = {
  id: 'Trigger',
  initial: TriggerState.START,
  context: {},
  states: {
    [TriggerState.START]: {
      on: {
        [TriggerTransition.NEW]: {
          target: TriggerState.ACTIVE,
        },
      },
    },
    [TriggerState.ACTIVE]: {
      on: {
        [TriggerTransition.INACTIVE]: {
          target: TriggerState.INACTIVE,
        },
        [TriggerTransition.CO_DELETE]: {
          target: TriggerState.DELETE,
        },
        [TriggerTransition.CO_DISABLE]: {
          target: TriggerState.DISABLE_ACTIVE,
        },
      },
    },
    [TriggerState.INACTIVE]: {
      on: {
        [TriggerTransition.ACTIVE]: {
          target: TriggerState.ACTIVE,
        },
        [TriggerTransition.DELETE]: {
          target: TriggerState.DELETE,
        },
        [TriggerTransition.CO_DELETE]: {
          target: TriggerState.DELETE,
        },
        [TriggerTransition.CO_DISABLE]: {
          target: TriggerState.DISABLE_INACTIVE,
        },
      },
    },
    [TriggerState.DISABLE_ACTIVE]: {
      on: {
        [TriggerTransition.CO_ENABLE]: {
          target: TriggerState.ACTIVE,
        },
      },
    },
    [TriggerState.DISABLE_INACTIVE]: {
      on: {
        [TriggerTransition.CO_ENABLE]: {
          target: TriggerState.INACTIVE,
        },
      },
    },
    [TriggerState.DELETE]: {
      type: 'final',
    },
  },
};

export const optionsStateTriggerDef = {
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
