/* eslint-disable prettier/prettier */

import { AssetModel } from 'src/asset-management/entities';

export const AssetState = {
  START: 'start',
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  RUNNING: 'running',
  WARNING: 'warning',
  STOP: 'stop',
  DELETE: 'delete',
  CANCEL: 'cancel',
};

export const AssetTransition = {
  NEW: 'new',
  INACTIVE: 'inactive',
  ACTIVE: 'active',
  FINISH: 'finish',
  CO_WARNING: 'co_warning',
  ACKNOWLEDGE: 'acknowledge',
  STOP: 'stop',
  START: 'start',
  RESUME: 'resume',
  DELETE: 'delete',
  CO_DELETE: 'co_delete',
  RETRIEVE: 'retrieve',
};

export const StateAssetDef = {
  id: 'asset',
  initial: AssetState.START,
  context: {},
  states: {
    [AssetState.START]: {
      on: {
        [AssetTransition.NEW]: {
          target: AssetState.ACTIVE,
          // actions: ['CoReadyWip'],
        },
      },
    },
    [AssetState.ACTIVE]: {
      on: {
        [AssetTransition.INACTIVE]: {
          target: AssetState.INACTIVE,
          // actions: ['CoNotReadyWip'],
        },
        [AssetTransition.START]: {
          target: AssetState.RUNNING,
          // actions: ['CoStartWorkOrderItem', 'CoResumeWorkOrderItem'],
        },
      },
    },
    [AssetState.INACTIVE]: {
      on: {
        [AssetTransition.ACTIVE]: {
          target: AssetState.ACTIVE,
          // actions: ['CoReadyWip'],
        },
        [AssetTransition.DELETE]: {
          target: AssetState.DELETE,
          // actions: [
          //   'CoDeleteAssetWip',
          //   'CoDeleteAssetMappingDevice',
          //   'CoDeleteTrigger',
          // ],
        },
        [AssetTransition.CO_DELETE]: {
          target: AssetState.DELETE,
          // actions: ['CoDeleteTrigger'],
        },
      },
    },
    [AssetState.RUNNING]: {
      on: {
        [AssetTransition.FINISH]: {
          target: AssetState.ACTIVE,
          // actions: ['CoReadyWip', 'CoFinishWorkOrderItem'],
        },
        [AssetTransition.STOP]: {
          target: AssetState.STOP,
          // actions: ['CoStopWorkOrderItem'],
        },
        [AssetTransition.CO_WARNING]: {
          target: AssetState.WARNING,
        },
      },
    },
    [AssetState.WARNING]: {
      on: {
        [AssetTransition.FINISH]: {
          target: AssetState.ACTIVE,
          // actions: ['CoFinishWorkOrderItem', 'CoReadyWip'],
        },
        [AssetTransition.ACKNOWLEDGE]: {
          target: AssetState.RUNNING,
        },
        [AssetTransition.STOP]: {
          target: AssetState.STOP,
          // actions: ['CoStopWorkOrderItem'],
        },
      },
    },
    [AssetState.STOP]: {
      on: {
        [AssetTransition.RESUME]: {
          target: AssetState.RUNNING,
          // actions: ['CoResumeWorkOrderItem'],
        },
        [AssetTransition.FINISH]: {
          target: AssetState.CANCEL,
          // actions: ['CoCancelWorkOrderItem'],
        },
      },
    },
    [AssetState.CANCEL]: {
      on: {
        [AssetTransition.ACTIVE]: {
          target: AssetState.ACTIVE,
          // actions: ['CoReadyWip'],
        },
        [AssetTransition.RETRIEVE]: {
          target: AssetState.RUNNING,
          // actions: ['CoRetrieveWorkOrderItem', 'CoStopWorkOrderItem'],
        },
        [AssetTransition.INACTIVE]: {
          target: AssetState.INACTIVE,
          // actions: ['CoNotReadyWip'],
        },
      },
    },
    [AssetState.DELETE]: {
      type: 'final',
    },
  },
};

export const optionsStateAssetDef = {
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
