import { connectRouter } from 'connected-react-router';
import layout from 'src/modules/layout/layoutReducers';
import auth from 'src/modules/auth/authReducers';
import tenant from 'src/modules/tenant/tenantReducers';
import user from 'src/modules/user/userReducers';
import settings from 'src/modules/settings/settingsReducers';
import configurations from 'src/modules/configurations/configurationsReducers';
import projects from 'src/modules/projects/projectsReducers';
import { combineReducers } from 'redux';

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    layout,
    auth,
    tenant,
    user,
    settings,
    configurations,
    projects,
  });
