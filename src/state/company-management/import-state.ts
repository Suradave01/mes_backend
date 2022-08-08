/* eslint-disable prettier/prettier */

import { actions } from 'xstate';

export const ImportState = {
  START: 'start',
  READY: 'ready',
  ON_PROCESS: 'on_process',
  DONE: 'done',
  DELETE: 'delete',
};

export const ImportTransition = {
  IMPORT: 'import',
  READY: 'ready',
  PROCESS: 'process',
  CO_COMPLETE_PROCESS: 'co_complete_process',
  DELETE: 'delete',
};

export const StateImportDef = {
  id: 'import',
  initial: ImportState.START,
  context: {},
  states: {
    [ImportState.START]: {
      on: {
        [ImportTransition.IMPORT]: {
          target: ImportState.READY,
          actions: [''],
        },
        [ImportTransition.DELETE]: {
          target: ImportState.DELETE,
          actions: [''],
        },
      },
    },
    [ImportState.READY]: {
      actions: [''],
      on: {
        [ImportTransition.PROCESS]: {
          target: ImportState.ON_PROCESS,
          actions: [''],
        },
        [ImportTransition.DELETE]: {
          target: ImportState.DELETE,
          actions: [''],
        },
      },
    },
    [ImportState.ON_PROCESS]: {
      on: {
        [ImportTransition.CO_COMPLETE_PROCESS]: {
          target: ImportState.DONE,
          actions: [''],
        },
        [ImportTransition.DELETE]: {
          target: ImportState.DELETE,
          actions: [''],
        },
      },
    },
    [ImportState.DONE]: {
      on: {
        [ImportTransition.DELETE]: {
          target: ImportState.DELETE,
          actions: [''],
        },
      },
    },
    [ImportState.DELETE]: {
      type: 'final',
    },
  },
};

export const optionsStateImportDef = {
  actions: {
    /* ... */
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
