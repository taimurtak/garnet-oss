import SequelizeRepository from '../../database/repositories/sequelizeRepository';
import lodash from 'lodash';
import SequelizeFilterUtils from '../../database/utils/sequelizeFilterUtils';
import Error404 from '../../errors/Error404';
import Sequelize from 'sequelize';import SequelizeArrayUtils from '../utils/sequelizeArrayUtils';
import { IRepositoryOptions } from './IRepositoryOptions';
import { encrypt, decrypt } from '../../security/encryption'


const Op = Sequelize.Op;

class ConfigurationsRepository {

  static async create(data, options: IRepositoryOptions) {
    const currentUser = SequelizeRepository.getCurrentUser(
      options,
    );

    const tenant = SequelizeRepository.getCurrentTenant(
      options,
    );

    const transaction = SequelizeRepository.getTransaction(
      options,
    );

    // Encrypt the secret value using AES
    data.variableValue = encrypt(data.variableValue)

    const record = await options.database.configurations.create(
      {
        ...lodash.pick(data, [
          'variableName',
          'variableValue',
          'scope',
          'serviceName',          
          'importHash',
        ]),
        projectNameId: data.projectName || null,
        tenantId: tenant.id,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      {
        transaction,
      },
    );

    return this.findById(record.id, options);
  }

  static async update(id, data, options: IRepositoryOptions) {
    const currentUser = SequelizeRepository.getCurrentUser(
      options,
    );

    const transaction = SequelizeRepository.getTransaction(
      options,
    );


    const currentTenant = SequelizeRepository.getCurrentTenant(
      options,
    );

    // Encrypt the secret value using AES
    data.variableValue = encrypt(data.variableValue)

    let record = await options.database.configurations.findOne(      
      {
        where: {
          id,
          tenantId: currentTenant.id,
        },
        transaction,
      },
    );

    if (!record) {
      throw new Error404();
    }

    record = await record.update(
      {
        ...lodash.pick(data, [
          'variableName',
          'variableValue',
          'scope',
          'serviceName',          
          'importHash',
        ]),
        projectNameId: data.projectName || null,
        updatedById: currentUser.id,
      },
      {
        transaction,
      },
    );

    return this.findById(record.id, options);
  }

  static async destroy(id, options: IRepositoryOptions) {
    const transaction = SequelizeRepository.getTransaction(
      options,
    );

    const currentTenant = SequelizeRepository.getCurrentTenant(
      options,
    );

    let record = await options.database.configurations.findOne(
      {
        where: {
          id,
          tenantId: currentTenant.id,
        },
        transaction,
      },
    );

    if (!record) {
      throw new Error404();
    }

    await record.destroy({
      transaction,
    });

  }

  static async findById(id, options: IRepositoryOptions) {
    const transaction = SequelizeRepository.getTransaction(
      options,
    );

    const include = [
      {
        model: options.database.projects,
        as: 'projectName',
      },
    ];

    const currentTenant = SequelizeRepository.getCurrentTenant(
      options,
    );

    const record = await options.database.configurations.findOne(
      {
        where: {
          id,
          tenantId: currentTenant.id,
        },
        include,
        transaction,
      },
    );

    if (!record) {
      throw new Error404();
    }

    // Decrypt the config value using AES
    record.variableValue = decrypt(record.variableValue);

    //continue
    return this._fillWithRelationsAndFiles(record, options);
  }


  static async findByProjectAndEnv(projectName, scope, options: IRepositoryOptions){
    const transaction = SequelizeRepository.getTransaction(
      options,
    );
    
    const currentTenant = SequelizeRepository.getCurrentTenant(
      options,
    );

    let projectRecord = await options.database.projects.findOne(
      {
        where: {
          projectName: projectName,
          tenantId: currentTenant.id,
        },
        transaction,
      },
    );

    if (!projectRecord) {
      throw new Error404();
    }

    const projectID = projectRecord.id

    let record = await options.database.configurations.findAll(
      {
        where: {
          projectNameId: projectID,
          scope: { [Op.contains]: [scope]},
        },
        transaction,
      },
    );
     
    if (!record) {
      throw new Error404();
    }

    record.forEach(
      (record) => {
        record.dataValues.variableValue = decrypt(record.dataValues.variableValue);
      }
    );
    
    //continue
    return Promise.all(
      record.map((record) =>
        this._fillWithRelationsAndFiles(record, options),
      ),
    );
  }
  

  static async filterIdInTenant(
    id,
    options: IRepositoryOptions,
  ) {
    return lodash.get(
      await this.filterIdsInTenant([id], options),
      '[0]',
      null,
    );
  }

  static async filterIdsInTenant(
    ids,
    options: IRepositoryOptions,
  ) {
    if (!ids || !ids.length) {
      return [];
    }

    const currentTenant =
      SequelizeRepository.getCurrentTenant(options);

    const where = {
      id: {
        [Op.in]: ids,
      },
      tenantId: currentTenant.id,
    };

    const records = await options.database.configurations.findAll(
      {
        attributes: ['id'],
        where,
      },
    );

    // Decrypt the config value using AES
    records.forEach(
      (record) => {
        record.dataValues.variableValue = decrypt(record.dataValues.variableValue);
      }
    );

    return records.map((record) => record.id);
  }

  static async count(filter, options: IRepositoryOptions) {
    const transaction = SequelizeRepository.getTransaction(
      options,
    );

    const tenant = SequelizeRepository.getCurrentTenant(
      options,
    );

    return options.database.configurations.count(
      {
        where: {
          ...filter,
          tenantId: tenant.id,
        },
        transaction,
      },
    );
  }

  static async findAndCountAll(
    { filter, limit = 0, offset = 0, orderBy = '' },
    options: IRepositoryOptions,
  ) {
    const tenant = SequelizeRepository.getCurrentTenant(
      options,
    );

    let whereAnd: Array<any> = [];
    let include = [
      {
        model: options.database.projects,
        as: 'projectName',
      },      
    ];

    whereAnd.push({
      tenantId: tenant.id,
    });

    if (filter) {
      if (filter.id) {
        whereAnd.push({
          ['id']: SequelizeFilterUtils.uuid(filter.id),
        });
      }

      if (filter.variableName) {
        whereAnd.push(
          SequelizeFilterUtils.ilikeIncludes(
            'configurations',
            'variableName',
            filter.variableName,
          ),
        );
      }

      if (filter.variableValue) {
        whereAnd.push(
          SequelizeFilterUtils.ilikeIncludes(
            'configurations',
            'variableValue',
            filter.variableValue,
          ),
        );
      }

      if (filter.scope) {
        whereAnd.push(
          SequelizeArrayUtils.filter(
            'configurations',
            'scope',
            filter.scope,
          ),
        );
      }

      if (filter.projectName) {
        whereAnd.push({
          ['projectNameId']: SequelizeFilterUtils.uuid(
            filter.projectName,
          ),
        });
      }

      if (filter.serviceName) {
        whereAnd.push(
          SequelizeFilterUtils.ilikeIncludes(
            'configurations',
            'serviceName',
            filter.serviceName,
          ),
        );
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (
          start !== undefined &&
          start !== null &&
          start !== ''
        ) {
          whereAnd.push({
            ['createdAt']: {
              [Op.gte]: start,
            },
          });
        }

        if (
          end !== undefined &&
          end !== null &&
          end !== ''
        ) {
          whereAnd.push({
            ['createdAt']: {
              [Op.lte]: end,
            },
          });
        }
      }
    }

    const where = { [Op.and]: whereAnd };

    let {
      rows,
      count,
    } = await options.database.configurations.findAndCountAll({
      where,
      include,
      limit: limit ? Number(limit) : undefined,
      offset: offset ? Number(offset) : undefined,
      order: orderBy
        ? [orderBy.split('_')]
        : [['createdAt', 'DESC']],
      transaction: SequelizeRepository.getTransaction(
        options,
      ),
    });

    rows = await this._fillWithRelationsAndFilesForRows(
      rows,
      options,
    );

    // Decrypt the config value using AES
    rows.forEach(
      (row) => {
        row.variableValue = decrypt(row.variableValue);
      }
    );

    return { rows, count };
  }

  static async findAllAutocomplete(query, limit, options: IRepositoryOptions) {
    const tenant = SequelizeRepository.getCurrentTenant(
      options,
    );

    let whereAnd: Array<any> = [{
      tenantId: tenant.id,
    }];

    if (query) {
      whereAnd.push({
        [Op.or]: [
          { ['id']: SequelizeFilterUtils.uuid(query) },

        ],
      });
    }

    const where = { [Op.and]: whereAnd };

    const records = await options.database.configurations.findAll(
      {
        attributes: ['id', 'id'],
        where,
        limit: limit ? Number(limit) : undefined,
        order: [['id', 'ASC']],
      },
    );

    const recordObject = records.map((record) => ({
      id: record.id,
      label: record.id,
    }));

    // Decrypt the config value using AEs
    recordObject.forEach(
      (record) => {
        record.dataValues.variableValue = decrypt(record.dataValues.variableValue);
      }
    );

    return recordObject;
  }

  static async _fillWithRelationsAndFilesForRows(
    rows,
    options: IRepositoryOptions,
  ) {
    if (!rows) {
      return rows;
    }

    return Promise.all(
      rows.map((record) =>
        this._fillWithRelationsAndFiles(record, options),
      ),
    );
  }

  static async _fillWithRelationsAndFiles(record, options: IRepositoryOptions) {
    if (!record) {
      return record;
    }

    const output = record.get({ plain: true });

    const transaction = SequelizeRepository.getTransaction(
      options,
    );



    return output;
  }
}

export default ConfigurationsRepository;
