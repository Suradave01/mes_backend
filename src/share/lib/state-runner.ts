import { Connection, EntityManager, QueryRunner } from 'typeorm';
import { Subject } from 'rxjs';
import { isEmpty, each, uniq } from 'lodash';

export class StateRunner {
  private readonly queryRunner: QueryRunner;
  public report: Subject<any> = new Subject<any>();

  private errors: any[] = [];
  private afterCommits: any[] = [];
  private afterRollbacks: any[] = [];

  constructor(protected connection: Connection) {
    this.queryRunner = this.connection.createQueryRunner();
    this.report.subscribe((e) => {
      this.errors.push(e);
    });
  }

  get manager(): EntityManager {
    return this.queryRunner.manager;
  }

  get hasErrors(): boolean {
    return this.errors.length !== 0;
  }

  get error(): any {
    return this.hasErrors && this.errors.join(', ');
  }

  async start(): Promise<this> {
    await this.queryRunner.startTransaction();
    return this;
  }

  async cleanup(commit = true): Promise<boolean> {
    const result = commit && !this.hasErrors;

    if (result) {
      await this.commit(result);
    } else {
      await this.rollback();
    }

    await this.queryRunner.release();
    this.report.complete();

    console.log('cleanup state-runner with', { errors: this.errors, result });
    return result;
  }

  async commit(force = false): Promise<any> {
    if (!force && this.hasErrors) {
      throw new Error('There are some errors when applying co-state');
    }

    await this.queryRunner.commitTransaction();

    if (!isEmpty(this.afterCommits)) {
      const uniqCallbacks = uniq(this.afterCommits);
      each(uniqCallbacks, (func) => {
        if (typeof func === 'function') {
          func();
        }
      });
      this.afterCommits = [];
    }
  }

  async rollback(): Promise<any> {
    await this.queryRunner.rollbackTransaction();

    if (!isEmpty(this.afterRollbacks)) {
      const uniqCallbacks = uniq(this.afterRollbacks);
      each(uniqCallbacks, (func) => {
        if (typeof func === 'function') {
          func();
        }
      });
      this.afterRollbacks = [];
    }
  }

  async release(): Promise<any> {
    await this.queryRunner.release();
  }

  addAfterCommit(callback: any): boolean {
    if (typeof callback === 'function') {
      this.afterCommits.push(callback);
      return true;
    }

    return false;
  }

  addAfterRollback(callback: any): boolean {
    if (typeof callback === 'function') {
      this.afterRollbacks.push(callback);
      return true;
    }

    return false;
  }
}
