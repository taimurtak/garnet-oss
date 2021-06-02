import validator from 'validator';
import { v4 as uuid } from 'uuid';
import Sequelize from 'sequelize';

/**
 * Utilities to use on Sequelize queries.
 */
export default class SequelizeFilterUtils {
  /**
   * If you pass an invalid uuid to a query, it throws an exception.
   * To hack this behaviour, if the uuid is invalid, it creates a new one,
   * that won't match any of the database.
   * If the uuid is invalid, brings no results.
   */
  static uuid(value) {
    let id = value;

    // If ID is invalid, sequelize throws an error.
    // For that not to happen, if the UUID is invalid, it sets
    // some random uuid
    if (!validator.isUUID(id)) {
      id = uuid();
    }

    return id;
  }

  /**
   * Creates an ilike condition.
   */
  static ilikeIncludes(model, column, value) {
    return Sequelize.where(
      Sequelize.fn(
        'lower',
        Sequelize.col(`${model}.${column}`),
      ),
      {
        [Sequelize.Op.like]: `%${value}%`.toLowerCase(),
      },
    );
  }

  static ilikeExact(model, column, value) {
    return Sequelize.where(
      Sequelize.fn(
        'lower',
        Sequelize.col(`${model}.${column}`),
      ),
      {
        [Sequelize.Op.like]: (value || '').toLowerCase(),
      },
    );
  }
}
