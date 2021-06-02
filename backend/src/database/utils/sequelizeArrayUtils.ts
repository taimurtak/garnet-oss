import { getConfig } from '../../config';
import { DataTypes } from 'sequelize';
import Sequelize from 'sequelize';

export default class SequelizeArrayUtils {
  // MySQL doesn't have Array Field
  static get DataType() {
    return getConfig().DATABASE_DIALECT === 'mysql'
      ? DataTypes.JSON
      : DataTypes.ARRAY(DataTypes.TEXT);
  }

  static filter(tableName, fieldName, filterValue) {
    const filterValueAsArray = Array.isArray(filterValue)
      ? filterValue
      : [filterValue];

    if (getConfig().DATABASE_DIALECT === 'mysql') {
      return {
        [Sequelize.Op
          .and]: filterValueAsArray.map((filterValue) =>
          arrayContainsForMySQL(
            tableName,
            fieldName,
            filterValue,
          ),
        ),
      };
    } else {
      return {
        [fieldName]: {
          [Sequelize.Op.contains]: filterValueAsArray,
        },
      };
    }
  }
}

function arrayContainsForMySQL(model, column, value) {
  return Sequelize.fn(
    'JSON_CONTAINS',
    Sequelize.col(`${model}.${column}`),
    `"${value}"`,
  );
}
