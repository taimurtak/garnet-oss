import ProjectsService from 'src/modules/projects/projectsService';
import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';

const prefix = 'PROJECTS_VIEW';

const projectsViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: projectsViewActions.FIND_STARTED,
      });

      const record = await ProjectsService.find(id);

      dispatch({
        type: projectsViewActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: projectsViewActions.FIND_ERROR,
      });

      getHistory().push('/projects');
    }
  },
};

export default projectsViewActions;
