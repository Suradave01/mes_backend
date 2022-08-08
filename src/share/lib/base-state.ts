import {
  createMachine,
  EventObject,
  interpret,
  Interpreter,
  StateMachine,
  StateSchema,
} from 'xstate';
import {
  AfterLoad,
  AfterUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  getConnection,
  QueryRunner,
  UpdateDateColumn,
} from 'typeorm';
import { every, omit } from 'lodash';
import { assign, pure } from 'xstate/lib/actions';
import { isArray } from 'xstate/lib/utils';
import { DATA_TYPES } from './data-types';
import { StateRunner } from './state-runner';

export type VCCoStateResponse = {
  id: string;
  type: string;
  can: boolean;
  transition?: string;
  before?: string;
  after?: string;
};

export type VCContext = Partial<
  | any
  | BaseState
  | {
      coStates: VCCoStateResponse[];
      coStatesCallback: (() => any)[];
      coStatesApply: () => Promise<any[]>;
    }
>;

export type VCStateMachineContext = Partial<
  | any
  | {
      value: any;
      context: VCContext;
    }
>;

export type VCStateMachine = StateMachine<
  VCStateMachineContext,
  StateSchema<any>,
  EventObject
>;
export type VCMachineInterpreter = Interpreter<
  VCStateMachineContext,
  StateSchema<any>,
  EventObject
>;

export const canResult = (model: BaseState, transition): VCCoStateResponse => {
  return {
    id: model.getPrimaryKey(),
    type: model.getStateMachine().id,
    can: model.can(transition),
    transition,
    before: model.state,
    after: model.getStateMachine().transition(model.state, transition)
      .value as string,
  };
};

const initialVCContext = {
  coStates: [],
  coStatesCallback: [],
  async coStatesApply() {
    const { coStates, coStatesCallback } = this;
    return new Promise((resolve, reject) => {
      if (every(coStates, (n: VCCoStateResponse) => n.can)) {
        resolve(Promise.all(coStatesCallback.map((i) => i())));
      } else {
        reject({
          message: 'Can not apply state',
          coStates,
        });
      }
    });
  },
};

export class BaseState {
  public stateRunner: StateRunner;

  public extraParam: any;

  private machine;

  protected machineDef;

  protected optionsDef = {};

  private machineService;

  constructor(machineDef: any, optionsDef?: any) {
    this.machineDef = machineDef;
    this.optionsDef = optionsDef;
  }

  initialStateMachine() {
    this.machine = this.getStateMachine();

    const machineService = interpret(this.machine).start();
    machineService.onDone(this.coFinalState);
    this.machineService = machineService;
  }

  can(transition: string) {
    if (!this.machineService) {
      this.initialStateMachine();
    }
    console.log(
      `${
        (this as any).__proto__.constructor.name
      } test transition with ${transition}, from state ${
        this.machineService.state.value
      }/${this.state}`,
    );
    return this.machineService.state.can(transition);
  }

  apply(
    transition: string,
    parentStateContext: VCStateMachineContext = null,
    extraParam?: any,
  ) {
    /**
     * Bind State Runner
     */
    this.bindRunner(parentStateContext?.stateRunner || parentStateContext);
    if (extraParam) {
      this.extraParam = extraParam;
    }

    console.log('transition ->', transition, `from state "${this.state}"`);
    if (!this.can(transition)) {
      const message = `Invalid transition: ${
        this.machineDef.id
      }:${this.getPrimaryKey()} can not transit '${transition}' from state '${
        this.state
      }', [allowed only '${this.getTransition().join("','")}'] transitions`;
      this.runner?.report?.next(message);
      throw new Error(message);
    }
    // const nextState = this.machine.transition(this.state, {
    //   type: transition,
    // });

    const nextState = this.machineService.send(transition);
    this.state = nextState.value;
  }

  async checkTransition(transition: string, apply = false): Promise<VCContext> {
    const machine: any = interpret(this.getStateMachine()).start();
    machine.send(transition);

    const context = machine.state.context as VCContext;

    if (apply) {
      console.log('auto-apply checkTransition ', context.coStates);
      await context
        .coStatesApply()
        .then(async (res) => {
          console.log('co-state saving', res);
          return Promise.all([this.saveState(null, machine), res]);
        })
        .catch((res) => {
          console.log('co-state error', res);
        });
    }

    const { coStates, coStatesApply, coStatesCallback } = context;

    return Promise.resolve({
      can: every(coStates, (n: VCCoStateResponse) => n.can),
      coStates,
      coStatesApply,
      coStatesCallback,
    });
  }

  async saveState<T>(
    properties: Partial<T> = {},
    stateMachine: VCMachineInterpreter = null,
  ): Promise<any> {
    if (!this.stateRunner) {
      throw new Error(
        `Can not save state without StateRunner, please bind StateRunner to entity before executing saveState`,
      );
    }

    const state = stateMachine?.state?.value.toString() || this.state;

    console.log(
      `${
        (this as any).__proto__.constructor.name
      } saving sate with value: '${state}' [current '${
        this.state
      }'] with properties`,
      properties,
    );
    /**
     * TODO - add script to save state field
     */
    if (state) {
      return this.stateRunner.manager
        .getRepository((this as any).__proto__.constructor)
        .update({ id: this.getPrimaryKey() }, { ...properties, state })
        .then(() => {
          this.afterLoad();
        });
    }

    return !!state;
  }

  getStateMachine() {
    return createMachine(
      {
        ...this.machineDef,
        initial: this.state,
      },
      this.optionsDef,
    ).withContext({
      ...this,
      ...initialVCContext,
    });
  }

  getStateContext(): VCContext {
    return this.machineService?.state?.context;
  }

  getTransition(): string[] {
    return this.machineService.initialState.nextEvents;
  }

  getCurrentState(): string {
    return this.state;
  }

  withoutMachineProps() {
    return omit(this, [
      'optionsDef',
      'machineDef',
      'machine',
      'machineService',
      'coStates',
      'coStatesCallback',
      'coStatesApply',
      'stateRunner',
    ]);
  }

  @Column({ type: DATA_TYPES.VARCHAR, length: 32, default: 'start' })
  state: string;

  @Column({
    type: DATA_TYPES.UUID,
    name: 'create_by',
    nullable: true,
  })
  createdBy: number;

  @Column({
    type: DATA_TYPES.UUID,
    name: 'update_by',
    nullable: true,
  })
  updatedBy?: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  getPrimaryKey(): any {
    return (this as any)?.id;
  }

  static coState(
    transition: string,
    can: (
      transition: string,
      context: VCStateMachineContext,
      event,
    ) => {
      id?: any;
      can: boolean;
      type?: any;
    },
    apply: (
      transition: string,
      context: VCStateMachineContext,
      event,
    ) => (transition: string, context: VCStateMachineContext, event) => any,
  ) {
    return pure((context: VCStateMachineContext, event) => {
      console.log('co delete ' + event.type);
      return assign({
        coStates: (_) => {
          const result = can(transition, context, event);
          return [
            ...(_.coStates || []),
            ...(isArray(result) ? result : [result]),
          ];
        },
        coStatesCallback: (_) => {
          const result = apply(transition, context, event);
          return [
            ...(_.coStatesCallback || []),
            ...(isArray(result) ? result : [result]),
          ];
        },
      });
    });
  }

  coFinalState = async (): Promise<any> => {
    return this.runner?.manager
      .getRepository((this as any).__proto__.constructor)
      .softDelete({ id: this.getPrimaryKey() });
  };

  public fill(data: any): this {
    for (const key in data) {
      this[key] = data[key];
    }
    return this;
  }

  public bindRunner(stateRunner: StateRunner): void {
    if (stateRunner) {
      this.stateRunner = stateRunner;
    } else {
      console.log('binding call to unknown state-runner', stateRunner);
    }
  }

  get runner(): StateRunner {
    return this.stateRunner;
  }

  public transitions: string[] = [];

  @AfterLoad()
  @AfterUpdate()
  afterLoad(): void {
    this.transitions = this.getStateMachine()?.initialState?.nextEvents;
  }
}
