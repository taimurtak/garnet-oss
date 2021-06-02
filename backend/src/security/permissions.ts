import Roles from './roles';
import Plans from './plans';
import Storage from './storage';

const storage = Storage.values;
const roles = Roles.values;
const plans = Plans.values;

class Permissions {
  static get values() {
    return {
      tenantEdit: {
        id: 'tenantEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
        ],
      },
      tenantDestroy: {
        id: 'tenantDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
        ],
      },
      planEdit: {
        id: 'planEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
        ],
      },
      planRead: {
        id: 'planRead',
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
        id: 'configurationsImport',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free],
      },
      configurationsCreate: {
        id: 'configurationsCreate',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free],
        allowedStorage: [

        ],
      },
      configurationsEdit: {
        id: 'configurationsEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free],
        allowedStorage: [

        ],
      },
      configurationsDestroy: {
        id: 'configurationsDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free],
        allowedStorage: [

        ],
      },
      configurationsRead: {
        id: 'configurationsRead',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free],
      },
      configurationsAutocomplete: {
        id: 'configurationsAutocomplete',
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
