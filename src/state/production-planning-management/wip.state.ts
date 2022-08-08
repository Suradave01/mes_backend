/* eslint-disable prettier/prettier */

export const WipState = {
  START: 'start',
  WAITING_ASSET: 'waiting_asset',
  READY: 'ready',
  NOT_READY: 'not_ready',
  DELETE: 'delete',
};

export const WipTransition = {
  NEW: 'new',
  MAPPING_ASSET: 'mapping_asset',
  CO_DELETE_ASSET: 'co_delete_asset',
  UN_MAP_ASSET: 'un_map_asset',
  CO_NOT_READY: 'co_not_ready',
  CO_READY: 'co_ready',
  DELETE: 'delete',
};

export const StateWipDef = {
  id: 'Wip',
  initial: WipState.START,
  context: {},
  states: {
    [WipState.START]: {
      on: {
        [WipTransition.NEW]: {
          target: WipState.WAITING_ASSET,
          actions: [''],
        },
      },
    },
    [WipState.WAITING_ASSET]: {
      on: {
        [WipTransition.DELETE]: {
          target: WipState.DELETE,
          actions: [''],
        },
        [WipTransition.MAPPING_ASSET]: {
          target: WipState.READY,
          actions: [''],
        },
      },
    },
    [WipState.READY]: {
      on: {
        [WipTransition.UN_MAP_ASSET]: {
          target: WipState.WAITING_ASSET,
          actions: [''],
        },
        [WipTransition.CO_DELETE_ASSET]: {
          target: WipState.WAITING_ASSET,
          actions: [''],
        },
        [WipTransition.CO_NOT_READY]: {
          target: WipState.NOT_READY,
          actions: [''],
        },
        [WipTransition.DELETE]: {
          target: WipState.DELETE,
          actions: [''],
        },
      },
    },
    [WipState.NOT_READY]: {
      on: {
        [WipTransition.CO_DELETE_ASSET]: {
          target: WipState.WAITING_ASSET,
          actions: [''],
        },
        [WipTransition.CO_READY]: {
          target: WipState.READY,
          actions: [''],
        },
      },
    },
    [WipState.DELETE]: {
      type: 'final',
    },
  },
};

export const optionsStateWipDef = {
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
