import { DataTypes } from 'sequelize';import SequelizeArrayUtils from '../utils/sequelizeArrayUtils';

export default function (sequelize) {
  const configurations = sequelize.define(
    'configurations',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      variableName: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
        }
      },
      variableValue: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
        }
      },
      scope: {
        type: SequelizeArrayUtils.DataType,
        validate: {
          isValidOption: function (value) {
            if (!value || !value.length) {
              return value;
            }

            const validOptions: any = [
        "default",
        "dev",
        "test",
        "staging",
        "prod"
      ];

            if (
              value.some(
                (item) => !validOptions.includes(item),
              )
            ) {
              throw new Error(
                `${value} is not a valid option`,
              );
            }

            return value;
          },
        },
      },
      serviceName: {
        type: DataTypes.TEXT,
      },
      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,    
        validate: {
          len: [0, 255],
        },    
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ['importHash', 'tenantId'],
          where: {
            deletedAt: null,
          },
        },

      ],
      timestamps: true,
      paranoid: true,
    },
  );

  configurations.associate = (models) => {
    models.configurations.belongsTo(models.projects, {
      as: 'projectName',
      constraints: false,
      foreignKey: {
        allowNull: false,
      },
    });


    
    models.configurations.belongsTo(models.tenant, {
      as: 'tenant',
      foreignKey: {
        allowNull: false,
      },
    });

    models.configurations.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.configurations.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return configurations;
}
