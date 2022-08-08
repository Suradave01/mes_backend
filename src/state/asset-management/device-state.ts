/* eslint-disable prettier/prettier */

import { DeviceModel } from 'src/asset-management/entities/device.entity';
import { DeviceFieldModel } from 'src/asset-management/entities/device_field.entity';

export const DeviceState = {
  START: 'start',
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DELETE: 'delete',
};

export const DeviceTransition = {
  NEW: 'new',
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DELETE: 'delete',
  CO_DELETE: 'co_delete',
};

export const StateDeviceDef = {
  id: 'Device',
  initial: DeviceState.START,
  context: {},
  states: {
    [DeviceState.START]: {
      on: {
        [DeviceTransition.NEW]: {
          target: DeviceState.ACTIVE,
        },
      },
    },
    [DeviceState.ACTIVE]: {
      on: {
        [DeviceTransition.INACTIVE]: {
          target: DeviceState.INACTIVE,
          actions: ['CoInactiveDeviceField'],
        },
        [DeviceTransition.CO_DELETE]: {
          target: DeviceState.DELETE,
          actions: ['CoDeleteDeviceField', 'CoDeleteAssetMappingDevice'],
        },
      },
    },
    [DeviceState.INACTIVE]: {
      on: {
        [DeviceTransition.ACTIVE]: {
          target: DeviceState.ACTIVE,
          actions: ['CoActiveDeviceField'],
        },
        [DeviceTransition.DELETE]: {
          target: DeviceState.DELETE,
          actions: ['CoDeleteDeviceField', 'CoDeleteAssetMappingDevice'],
        },
        [DeviceTransition.CO_DELETE]: {
          target: DeviceState.DELETE,
          actions: ['CoDeleteDeviceField', 'CoDeleteAssetMappingDevice'],
        },
      },
    },
    [DeviceState.DELETE]: {
      type: 'final',
    },
  },
};

export const optionsStateDeviceDef = {
  actions: {
    CoActiveDeviceField: async (context: DeviceModel, event): Promise<any> => {
      for (let i = 0; i < context.DeviceFields.length; i++) {
        if (context.DeviceFields[i].state == 'inactive') {
          Promise.all([
            context.DeviceFields[i].CoDeviceFieldActive(context, event),
          ]);
        }
      }
    },
    CoInactiveDeviceField: async (
      context: DeviceModel,
      event,
    ): Promise<any> => {
      for (let i = 0; i < context.DeviceFields.length; i++) {
        if (context.DeviceFields[i].state == 'active') {
          Promise.all([
            context.DeviceFields[i].CoDeviceFieldInactive(context, event),
          ]);
        }
      }
    },
    CoDeleteDeviceField: async (context: DeviceModel, event): Promise<any> => {
      for (let i = 0; i < context.DeviceFields.length; i++) {
        Promise.all([
          context.DeviceFields[i].CoDeviceFieldDelete(context, event),
        ]);
      }
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
