import Roles from 'src/security/roles';
import Plans from 'src/security/plans';
import Storage from 'src/security/storage';

const storage = Storage.values;
const roles = Roles.values;
const plans = Plans.values;

class Permissions {
  static get values() {
    return {
      tenantEdit: {
        id: 'tenantEdit',
        allowedRoles: [roles.admin],
      },
      tenantDestroy: {
        id: 'tenantDestroy',
        allowedRoles: [roles.admin],
         allowedPlans: [
          plans.free,
        ],
      },
      userEdit: {
        id: 'userEdit',
        allowedRoles: [roles.admin],
         allowedPlans: [
          plans.free,
        ],
      },
      userDestroy: {
        id: 'userDestroy',
        allowedRoles: [roles.admin],
         allowedPlans: [
          plans.free,
        ],
      },
      userCreate: {
        id: 'userCreate',
        allowedRoles: [roles.admin],
         allowedPlans: [
          plans.free,
        ],
      },
      userImport: {
        id: 'userImport',
        allowedRoles: [roles.admin],
         allowedPlans: [
          plans.free,
        ],
      },
      userRead: {
        id: 'userRead',
        allowedRoles: [roles.admin],
         allowedPlans: [
          plans.free,
        ],
      },
      userAutocomplete: {
        id: 'userAutocomplete',
        allowedRoles: [roles.admin],
         allowedPlans: [
          plans.free,
        ],
      },
      
      settingsEdit: {
        id: 'settingsEdit',
        allowedRoles: [roles.admin],
         allowedPlans: [
          plans.free,
        ],
        allowedStorage: [
          storage.settingsBackgroundImages,
          storage.settingsLogos,
        ],
      },
      configurationsImport: {
        id: 'secretsImport',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free],
      },
      configurationsCreate: {
        id: 'secretsCreate',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free],
        allowedStorage: [

        ],
      },
      configurationsEdit: {
        id: 'secretsEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free],
        allowedStorage: [

        ],
      },
      configurationsDestroy: {
        id: 'secretsDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free],
        allowedStorage: [

        ],
      },
      configurationsRead: {
        id: 'secretsRead',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free],
      },
      configurationsAutocomplete: {
        id: 'secretsAutocomplete',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free],
      },

      projectsImport: {
        id: 'projectsImport',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free],
      },
      projectsCreate: {
        id: 'projectsCreate',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free],
        allowedStorage: [

        ],
      },
      projectsEdit: {
        id: 'projectsEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free],
        allowedStorage: [

        ],
      },
      projectsDestroy: {
        id: 'projectsDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free],
        allowedStorage: [

        ],
      },
      projectsRead: {
        id: 'projectsRead',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free],
      },
      projectsAutocomplete: {
        id: 'projectsAutocomplete',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free],
      },
    };
  }

  static get asArray() {
    return Object.keys(this.values).map((value) => {
      return this.values[value];
    });
  }
}

export default Permissions;
