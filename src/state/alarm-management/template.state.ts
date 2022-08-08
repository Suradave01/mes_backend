/* eslint-disable prettier/prettier */

export const TemplateState = {
  START: 'start',
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DELETE: 'delete',
};

export const TemplateTransition = {
  NEW: 'new',
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DELETE: 'delete',
};

export const StateTemplateDef = {
  id: 'template',
  initial: TemplateState.START,
  context: {},
  states: {
    [TemplateState.START]: {
      on: {
        [TemplateTransition.NEW]: {
          target: TemplateState.ACTIVE,
          actions: [''],
        },
      },
    },
    [TemplateState.ACTIVE]: {
      on: {
        [TemplateTransition.INACTIVE]: {
          target: TemplateState.INACTIVE,
          actions: [''],
        },
      },
    },
    [TemplateState.INACTIVE]: {
      on: {
        [TemplateTransition.ACTIVE]: {
          target: TemplateState.ACTIVE,
          actions: [''],
        },
        [TemplateTransition.DELETE]: {
          target: TemplateState.DELETE,
          actions: [''],
        },
      },
    },
    [TemplateState.DELETE]: {
      type: 'final',
    },
  },
};

export const optionsStateTemplateDef = {
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
