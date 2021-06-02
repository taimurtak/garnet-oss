import { DataTypes } from 'sequelize';
import SequelizeArrayUtils from '../utils/sequelizeArrayUtils';

export default function (sequelize) {
  const projects = sequelize.define(
    'projects',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      projectName: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
        }
      },
      projectDescription: {
        type: DataTypes.TEXT,
      },
      projectTags: {
        type: SequelizeArrayUtils.DataType,
        validate: {
          isValidOption: function (value) {
            if (!value || !value.length) {
              return value;
            }

            const validOptions: any = [
        "Web App",
        "Backend",
        "Frontend",
        "Static website",
        "CLI",
        "Infrastructure",
        "Other"
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

  projects.associate = (models) => {



    
    models.projects.belongsTo(models.tenant, {
      as: 'tenant',
      foreignKey: {
        allowNull: false,
      },
    });

    models.projects.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.projects.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return projects;
}
