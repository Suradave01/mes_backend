/* eslint-disable prettier/prettier */
import { CompanyModel } from '../../company-management/entities/company.entity';

export const CompanyState = {
  START: 'start',
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DELETE: 'delete',
};

export const CompanyTransition = {
  NEW: 'new',
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DELETE: 'delete',
};

export const StateCompanyDef = {
  id: 'company',
  initial: CompanyState.START,
  context: {},
  states: {
    [CompanyState.START]: {
      on: {
        [CompanyTransition.NEW]: {
          target: CompanyState.ACTIVE,
          actions: [''],
        },
      },
    },
    [CompanyState.ACTIVE]: {
      on: {
        [CompanyTransition.INACTIVE]: {
          target: CompanyState.INACTIVE,
          actions: [''],
        },
      },
    },
    [CompanyState.INACTIVE]: {
      on: {
        [CompanyTransition.ACTIVE]: {
          target: CompanyState.ACTIVE,
          actions: [''],
        },
        [CompanyTransition.DELETE]: {
          target: CompanyState.DELETE,
          actions: [
            'CoDeleteUserMappingCompany',
            'CoDeleteAsset',
            'CoDeleteDevice',
          ],
        },
      },
    },
    [CompanyState.DELETE]: {
      type: 'final',
    },
  },
};

export const optionsStateCompanyDef = {
  actions: {
    CoDeleteUserMappingCompany: async (
      context: CompanyModel,
      event,
    ): Promise<any> => {
      for (let i = 0; i < context.UserMappingCompanies.length; i++) {
        Promise.all([
          context.UserMappingCompanies[i].CoCompanyDelete(context, event),
        ]);
      }
    },
    CoDeleteAsset: async (context: CompanyModel, event): Promise<any> => {
      for (let i = 0; i < context.Assets.length; i++) {
        Promise.all([context.Assets[i].CoCompanyDelete(context, event)]);
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
