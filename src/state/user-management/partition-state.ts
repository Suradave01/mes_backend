/* eslint-disable prettier/prettier */

import { PartitionModel } from 'src/user-management/entities/partition.entity';

export const PartitionState = {
  START: 'start',
  ACTIVE: 'active',
  DELETE: 'delete',
};

export const PartitionTransition = {
  NEW: 'new',
  DELETE: 'delete',
};

export const StatePartitionDef = {
  id: 'partition',
  initial: PartitionState.START,
  context: {},
  states: {
    [PartitionState.START]: {
      on: {
        [PartitionTransition.NEW]: {
          target: PartitionState.ACTIVE,
          actions: [''],
        },
      },
    },
    [PartitionState.ACTIVE]: {
      on: {
        [PartitionTransition.DELETE]: {
          target: PartitionState.DELETE,
          actions: [
            'CoDeleteUserMappingPartition',
            'CoDeletePartitionMappingGroup',
          ],
        },
      },
    },
    [PartitionState.DELETE]: {
      type: 'final',
    },
  },
};

export const optionsStatePartitionDef = {
  actions: {
    CoDeleteUserMappingPartition: async (
      context: PartitionModel,
      event,
    ): Promise<any> => {
      for (let i = 0; i < context.UserMappingPartitions.length; i++) {
        Promise.all([
          context.UserMappingPartitions[i].CoPartitionDelete(context, event),
        ]);
      }
    },
    CoDeletePartitionMappingGroup: async (
      context: PartitionModel,
      event,
    ): Promise<any> => {
      for (let i = 0; i < context.PartitionMappingGroups.length; i++) {
        Promise.all([
          context.PartitionMappingGroups[i].CoPartitionDelete(context, event),
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
