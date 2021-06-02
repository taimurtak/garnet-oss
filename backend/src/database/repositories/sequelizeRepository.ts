import Error400 from '../../errors/Error400';
import lodash from 'lodash';
import { UniqueConstraintError } from 'sequelize';
import { IRepositoryOptions } from './IRepositoryOptions';

/**
 * Abstracts some basic Sequelize operations.
 * See https://sequelize.org/v5/index.html to learn how to customize it.
 */
export default class SequelizeRepository {
  /**
   * Cleans the database.
   */
  static async cleanDatabase(database) {
    if (process.env.NODE_ENV !== 'test') {
      throw new Error(
        'Clean database only allowed for test!',
      );
    }

    await database.sequelize.sync({ force: true });
  }

  /**
   * Returns the currentUser if it exists on the options.
   */
  static getCurrentUser(options: IRepositoryOptions) {
    return (options && options.currentUser) || { id: null };
  }

  /**
   * Returns the tenant if it exists on the options.
   */
  static getCurrentTenant(options: IRepositoryOptions) {
    return (
      (options && options.currentTenant) || { id: null }
    );
  }

  /**
   * Returns the transaction if it exists on the options.
   */
  static getTransaction(options: IRepositoryOptions) {
    return (options && options.transaction) || undefined;
  }

  /**
   * Creates a database transaction.
   */
  static async createTransaction(database) {
    return database.sequelize.transaction();
  }

  /**
   * Commits a database transaction.
   */
  static async commitTransaction(transaction) {
    return transaction.commit();
  }

  /**
   * Rolls back a database transaction.
   */
  static async rollbackTransaction(transaction) {
    return transaction.rollback();
  }

  static handleUniqueFieldError(
    error,
    language,
    entityName,
  ) {
    if (!(error instanceof UniqueConstraintError)) {
      return;
    }

    const fieldName = lodash.get(error, 'errors[0].path');
    throw new Error400(
      language,
      `entities.${entityName}.errors.unique.${fieldName}`,
    );
  }
}
