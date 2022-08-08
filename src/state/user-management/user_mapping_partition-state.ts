/* eslint-disable prettier/prettier */

export const UserMappingPartitionState = {
  START: 'start',
  ACTIVE: 'active',
  DELETE: 'delete',
};

export const UserMappingPartitionTransition = {
  NEW: 'new',
  DELETE: 'delete',
};

export const StateUserMappingPartitionDef = {
  id: 'userMappingPartition',
  initial: UserMappingPartitionState.START,
  context: {},
  states: {
    [UserMappingPartitionState.START]: {
      on: {
        [UserMappingPartitionTransition.NEW]: {
          target: UserMappingPartitionState.ACTIVE,
        },
        [UserMappingPartitionTransition.DELETE]: {
          target: UserMappingPartitionState.DELETE,
        },
      },
    },
    [UserMappingPartitionState.ACTIVE]: {
      on: {
        [UserMappingPartitionTransition.DELETE]: {
          target: UserMappingPartitionState.DELETE,
        },
      },
    },
    [UserMappingPartitionState.DELETE]: {
      type: 'final',
    },
  },
};

export const optionsStateUserMappingPartitionDef = {
  actions: {
    // CoDeletePermission: async (context: UserMappingPartitionModel, event): Promise<any> => {
    //   return Promise.all([
    //     context.Permissions[0].CoUserMappingPartitionDelete(context, event),
    //   ]);
    // },
    // CoDeleteMenuMappingRole: async (
    //   context: UserMappingPartitionModel,
    //   event,
    // ): Promise<any> => {
    //   return Promise.all([
    //     context.MenuMappingRoles[0].CoUserMappingPartitionDelete(context, event),
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
