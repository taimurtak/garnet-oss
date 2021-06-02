import listActions from 'src/modules/projects/list/projectsListActions';
import ProjectsService from 'src/modules/projects/projectsService';
import Errors from 'src/modules/shared/error/errors';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import Message from 'src/view/shared/message';

const prefix = 'PROJECTS_DESTROY';

const projectsDestroyActions = {
  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  DESTROY_ALL_STARTED: `${prefix}_DESTROY_ALL_STARTED`,
  DESTROY_ALL_SUCCESS: `${prefix}_DESTROY_ALL_SUCCESS`,
  DESTROY_ALL_ERROR: `${prefix}_DESTROY_ALL_ERROR`,

  doDestroy: (id) => async (dispatch) => {
    try {
      dispatch({
        type: projectsDestroyActions.DESTROY_STARTED,
      });

      await ProjectsService.destroyAll([id]);

      dispatch({
        type: projectsDestroyActions.DESTROY_SUCCESS,
      });

      Message.success(
        i18n('entities.projects.destroy.success'),
      );

      dispatch(listActions.doFetchCurrentFilter());

      getHistory().push('/projects');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: projectsDestroyActions.DESTROY_ERROR,
      });
    }
  },

  doDestroyAll: (ids) => async (dispatch) => {
    try {
      dispatch({
        type: projectsDestroyActions.DESTROY_ALL_STARTED,
      });

      await ProjectsService.destroyAll(ids);

      dispatch({
        type: projectsDestroyActions.DESTROY_ALL_SUCCESS,
      });

      if (listActions) {
        dispatch(listActions.doChangeSelected([]));
        dispatch(listActions.doFetchCurrentFilter());
      }

      Message.success(
        i18n('entities.projects.destroyAll.success'),
      );

      getHistory().push('/projects');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: projectsDestroyActions.DESTROY_ALL_ERROR,
      });
    }
  },
};

export default projectsDestroyActions;
