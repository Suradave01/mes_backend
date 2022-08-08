/* eslint-disable prettier/prettier */

import { AssetMappingDeviceModel } from 'src/asset-management/entities/asset_mapping_device.entity';

export const AssetMappingDeviceState = {
  START: 'start',
  ACTIVE: 'active',
  DELETE: 'delete',
};

export const AssetMappingDeviceTransition = {
  NEW: 'new',
  DELETE: 'delete',
  CO_DELETE: 'co_delete',
};

export const StateAssetMappingDeviceDef = {
  id: 'assetMappingDevice',
  initial: AssetMappingDeviceState.START,
  context: {},
  states: {
    [AssetMappingDeviceState.START]: {
      on: {
        [AssetMappingDeviceTransition.NEW]: {
          target: AssetMappingDeviceState.ACTIVE,
        },
        [AssetMappingDeviceTransition.CO_DELETE]: {
          target: AssetMappingDeviceState.DELETE,
        },
      },
    },
    [AssetMappingDeviceState.ACTIVE]: {
      on: {
        [AssetMappingDeviceTransition.DELETE]: {
          target: AssetMappingDeviceState.DELETE,
        },
        [AssetMappingDeviceTransition.CO_DELETE]: {
          target: AssetMappingDeviceState.DELETE,
        },
      },
    },
    [AssetMappingDeviceState.DELETE]: {
      type: 'final',
    },
  },
};

export const optionsStateAssetMappingDeviceDef = {
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
