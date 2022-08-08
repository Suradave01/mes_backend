/* eslint-disable prettier/prettier */

import { ResourceModel } from 'src/user-management/entities/resource.entity';

export const ResourceState = {
  START: 'start',
  ACTIVE: 'active',
  DELETE: 'delete',
};

export const ResourceTransition = {
  NEW: 'new',
  DELETE: 'delete',
};

export const StateResourceDef = {
  id: 'resource',
  initial: ResourceState.START,
  context: {},
  states: {
    [ResourceState.START]: {
      on: {
        [ResourceTransition.NEW]: {
          target: ResourceState.ACTIVE,
          actions: [''],
        },
      },
    },
    [ResourceState.ACTIVE]: {
      on: {
        [ResourceTransition.DELETE]: {
          target: ResourceState.DELETE,
          actions: ['CoDeletePermission', 'CoDeleteMenuMappingRole'],
        },
      },
    },
    [ResourceState.DELETE]: {
      type: 'final',
    },
  },
};

export const optionsStateResourceDef = {
  actions: {
    CoDeletePermission: async (context: ResourceModel, event): Promise<any> => {
      for (let i = 0; i < context.Permissions.length; i++) {
        Promise.all([context.Permissions[i].CoResourceDelete(context, event)]);
      }
    },
    CoDeleteMenuMappingRole: async (
      context: ResourceModel,
      event,
    ): Promise<any> => {
      for (let i = 0; i < context.MenuMappingRoles.length; i++) {
        Promise.all([
          context.MenuMappingRoles[i].CoResourceDelete(context, event),
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
