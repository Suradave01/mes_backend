/* eslint-disable prettier/prettier */
import mysql from 'mysql';
import { createConnection } from 'typeorm';
export class ServerSideRender {
  connection = createConnection({
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: '1234',
  });

  private error: any[] = [];
  private results: any[] = [];

  async GetData(request: any, resultsCallback: any, table: string) {
    const SQL = this.buildSql(request, table);

    // (await this.connection).createQueryBuilder(SQL, (error, results) => {
    //   const rowCount = this.getRowCount(request, results);
    //   const resultsForPage = this.cutResultsToPageSize(request, results);
    //   resultsCallback(resultsForPage, rowCount);
    // });

    const con = (await this.connection).query(SQL);
    console.log('con: ' + con);
  }

  buildSql(request, table) {
    const selectSql = this.createSelectSql(request);
    const fromSql = ` FROM db_mes.${table} `;
    const whereSql = this.createWhereSql(request);
    const limitSql = this.createLimitSql(request);

    const orderBySql = this.createOrderBySql(request);
    const groupBySql = this.createGroupBySql(request);

    const SQL =
      selectSql + fromSql + whereSql + groupBySql + orderBySql + limitSql;

    return SQL;
  }

  createSelectSql(request) {
    const rowGroupCols = request.rowGroupCols;
    console.log(rowGroupCols);
    const valueCols = request.valueCols;
    const groupKeys = request.groupKeys;

    if (this.isDoingGrouping(rowGroupCols, groupKeys)) {
      const colsToSelect = [];

      const rowGroupCol = rowGroupCols[groupKeys.length];
      colsToSelect.push(rowGroupCol.field);

      valueCols.forEach(function (valueCol) {
        colsToSelect.push(
          valueCol.aggFunc + '(' + valueCol.field + ') as ' + valueCol.field,
        );
      });

      return ' select ' + colsToSelect.join(', ');
    }

    return ' select *';
  }

  createFilterSql(key, item) {
    switch (item.filterType) {
      case 'text':
        return this.createTextFilterSql(key, item);
      case 'number':
        return this.createNumberFilterSql(key, item);
      default:
        console.log('unkonwn filter type: ' + item.filterType);
    }
  }

  createNumberFilterSql(key, item) {
    switch (item.type) {
      case 'equals':
        return key + ' = ' + item.filter;
      case 'notEqual':
        return key + ' != ' + item.filter;
      case 'greaterThan':
        return key + ' > ' + item.filter;
      case 'greaterThanOrEqual':
        return key + ' >= ' + item.filter;
      case 'lessThan':
        return key + ' < ' + item.filter;
      case 'lessThanOrEqual':
        return key + ' <= ' + item.filter;
      case 'inRange':
        return (
          '(' +
          key +
          ' >= ' +
          item.filter +
          ' and ' +
          key +
          ' <= ' +
          item.filterTo +
          ')'
        );
      default:
        console.log('unknown number filter type: ' + item.type);
        return 'true';
    }
  }

  createTextFilterSql(key, item) {
    switch (item.type) {
      case 'equals':
        return key + ' = "' + item.filter + '"';
      case 'notEqual':
        return key + ' != "' + item.filter + '"';
      case 'contains':
        return key + ' like "%' + item.filter + '%"';
      case 'notContains':
        return key + ' not like "%' + item.filter + '%"';
      case 'startsWith':
        return key + ' like "' + item.filter + '%"';
      case 'endsWith':
        return key + ' like "%' + item.filter + '"';
      default:
        console.log('unknown text filter type: ' + item.type);
        return 'true';
    }
  }

  createWhereSql(request) {
    const rowGroupCols = request.rowGroupCols;
    const groupKeys = request.groupKeys;
    const filterModel = request.filterModel;

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;
    const whereParts = [];

    if (groupKeys.length > 0) {
      groupKeys.forEach(function (key, index) {
        const colName = rowGroupCols[index].field;
        whereParts.push(colName + ' = "' + key + '"');
      });
    }

    if (filterModel) {
      const keySet = Object.keys(filterModel);
      keySet.forEach(function (key) {
        const item = filterModel[key];
        whereParts.push(that.createFilterSql(key, item));
      });
    }

    if (whereParts.length > 0) {
      return ' where ' + whereParts.join(' and ');
    } else {
      return '';
    }
  }

  createGroupBySql(request) {
    const rowGroupCols = request.rowGroupCols;
    const groupKeys = request.groupKeys;

    if (this.isDoingGrouping(rowGroupCols, groupKeys)) {
      const colsToGroupBy = [];

      const rowGroupCol = rowGroupCols[groupKeys.length];
      colsToGroupBy.push(rowGroupCol.field);

      return ' group by ' + colsToGroupBy.join(', ');
    } else {
      // select all columns
      return '';
    }
  }

  createOrderBySql(request) {
    const rowGroupCols = request.rowGroupCols;
    const groupKeys = request.groupKeys;
    const sortModel = request.sortModel;

    const grouping = this.isDoingGrouping(rowGroupCols, groupKeys);

    const sortParts = [];
    if (sortModel) {
      const groupColIds = rowGroupCols
        .map((groupCol) => groupCol.id)
        .slice(0, groupKeys.length + 1);

      sortModel.forEach(function (item) {
        if (grouping && groupColIds.indexOf(item.colId) < 0) {
          // ignore
        } else {
          sortParts.push(item.colId + ' ' + item.sort);
        }
      });
    }

    if (sortParts.length > 0) {
      return ' order by ' + sortParts.join(', ');
    } else {
      return '';
    }
  }

  isDoingGrouping(rowGroupCols, groupKeys) {
    // we are not doing grouping if at the lowest level. we are at the lowest level
    // if we are grouping by more columns than we have keys for (that means the user
    // has not expanded a lowest level group, OR we are not grouping at all).
    return rowGroupCols.length > groupKeys.length;
  }

  createLimitSql(request) {
    const startRow = request.startRow;
    const endRow = request.endRow;
    const pageSize = endRow - startRow;
    return ' limit ' + (pageSize + 1) + ' offset ' + startRow;
  }

  getRowCount(request, results) {
    if (results === null || results === undefined || results.length === 0) {
      return null;
    }
    const currentLastRow = request.startRow + results.length;
    return currentLastRow <= request.endRow ? currentLastRow : -1;
  }

  cutResultsToPageSize(request, results) {
    console.log('results ' + results);
    const pageSize = request.endRow - request.startRow;
    console.log(pageSize);
    console.log(results.length);
    if (results && results.length > pageSize) {
      console.log('results true ' + results.splice(0, pageSize));
      return results.splice(0, pageSize);
    } else {
      console.log('results false ' + results);
      return results;
    }
  }
}
