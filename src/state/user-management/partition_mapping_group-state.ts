/* eslint-disable prettier/prettier */

export const PartitionMappingGroupState = {
  START: 'start',
  ACTIVE: 'active',
  DELETE: 'delete',
};

export const PartitionMappingGroupTransition = {
  NEW: 'new',
  DELETE: 'delete',
};

export const StatePartitionMappingGroupDef = {
  id: 'partition_mapping_group',
  initial: PartitionMappingGroupState.START,
  context: {},
  states: {
    [PartitionMappingGroupState.START]: {
      on: {
        [PartitionMappingGroupTransition.NEW]: {
          target: PartitionMappingGroupState.ACTIVE,
        },
        [PartitionMappingGroupTransition.DELETE]: {
          target: PartitionMappingGroupState.DELETE,
        },
      },
    },
    [PartitionMappingGroupState.ACTIVE]: {
      on: {
        [PartitionMappingGroupTransition.DELETE]: {
          target: PartitionMappingGroupState.DELETE,
        },
      },
    },
    [PartitionMappingGroupState.DELETE]: {
      type: 'final',
    },
  },
};

export const optionsStatePartitionMappingGroupDef = {
  actions: {
    // CoDeletePermission: async (context: Partition_Mapping_GroupModel, event): Promise<any> => {
    //   return Promise.all([
    //     context.Permissions[0].CoPartition_Mapping_GroupDelete(context, event),
    //   ]);
    // },
    // CoDeleteMenuMappingRole: async (
    //   context: Partition_Mapping_GroupModel,
    //   event,
    // ): Promise<any> => {
    //   return Promise.all([
    //     context.MenuMappingRoles[0].CoPartition_Mapping_GroupDelete(context, event),
    //   ]);
    // },
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
