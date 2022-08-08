/* eslint-disable prettier/prettier */

export const DeviceFieldState = {
  START: 'start',
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DELETE: 'delete',
};

export const DeviceFieldTransition = {
  NEW: 'new',
  CO_ACTIVE: 'active',
  CO_INACTIVE: 'inactive',
  DELETE: 'delete',
  CO_DELETE: 'co_delete',
};

export const StateDeviceFieldDef = {
  id: 'DeviceField',
  initial: DeviceFieldState.START,
  context: {},
  states: {
    [DeviceFieldState.START]: {
      on: {
        [DeviceFieldTransition.NEW]: {
          target: DeviceFieldState.ACTIVE,
        },
      },
    },
    [DeviceFieldState.ACTIVE]: {
      on: {
        [DeviceFieldTransition.CO_INACTIVE]: {
          target: DeviceFieldState.INACTIVE,
          actions: ['CoDisableTrigger'],
        },
        [DeviceFieldTransition.DELETE]: {
          target: DeviceFieldState.DELETE,
          actions: ['CoDeleteTrigger'],
        },
        [DeviceFieldTransition.CO_DELETE]: {
          target: DeviceFieldState.DELETE,
          actions: ['CoDeleteTrigger'],
        },
      },
    },
    [DeviceFieldState.INACTIVE]: {
      on: {
        [DeviceFieldTransition.CO_ACTIVE]: {
          target: DeviceFieldState.ACTIVE,
          actions: ['CoEnableTrigger'],
        },
        [DeviceFieldTransition.DELETE]: {
          target: DeviceFieldState.DELETE,
          actions: ['CoDeleteTrigger'],
        },
        [DeviceFieldTransition.CO_DELETE]: {
          target: DeviceFieldState.DELETE,
          actions: ['CoDeleteTrigger'],
        },
      },
    },
    [DeviceFieldState.DELETE]: {
      type: 'final',
    },
  },
};

export const optionsStateDeviceFieldDef = {
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
