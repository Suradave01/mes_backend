/* eslint-disable prettier/prettier */

import { GroupModel } from '../../user-management/entities/group.entity';

export const GroupState = {
  START: 'start',
  ACTIVE: 'active',
  DELETE: 'delete',
};

export const GroupTransition = {
  NEW: 'new',
  DELETE: 'delete',
};

export const StateGroupDef = {
  id: 'group',
  initial: GroupState.START,
  context: {},
  states: {
    [GroupState.START]: {
      on: {
        [GroupTransition.NEW]: {
          target: GroupState.ACTIVE,
          actions: [''],
        },
      },
    },
    [GroupState.ACTIVE]: {
      on: {
        [GroupTransition.DELETE]: {
          target: GroupState.DELETE,
          actions: [
            'CoDeleteUserMappingGroup',
            'CoDeletePartitionMappingGroup',
          ],
        },
      },
    },
    [GroupState.DELETE]: {
      type: 'final',
    },
  },
};

export const optionsStateGroupDef = {
  actions: {
    CoDeleteUserMappingGroup: async (
      context: GroupModel,
      event,
    ): Promise<any> => {
      for (let i = 0; i < context.UserMappingGroups.length; i++) {
        Promise.all([
          context.UserMappingGroups[i].CoGroupDelete(context, event),
        ]);
      }
    },
    CoDeletePartitionMappingGroup: async (
      context: GroupModel,
      event,
    ): Promise<any> => {
      for (let i = 0; i < context.PartitionMappingGroups.length; i++) {
        Promise.all([
          context.PartitionMappingGroups[i].CoGroupDelete(context, event),
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
