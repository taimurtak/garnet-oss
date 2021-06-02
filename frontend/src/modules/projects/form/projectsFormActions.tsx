import ProjectsService from 'src/modules/projects/projectsService';
import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';
import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';

const prefix = 'PROJECTS_FORM';

const projectsFormActions = {
  INIT_STARTED: `${prefix}_INIT_STARTED`,
  INIT_SUCCESS: `${prefix}_INIT_SUCCESS`,
  INIT_ERROR: `${prefix}_INIT_ERROR`,

  CREATE_STARTED: `${prefix}_CREATE_STARTED`,
  CREATE_SUCCESS: `${prefix}_CREATE_SUCCESS`,
  CREATE_ERROR: `${prefix}_CREATE_ERROR`,

  UPDATE_STARTED: `${prefix}_UPDATE_STARTED`,
  UPDATE_SUCCESS: `${prefix}_UPDATE_SUCCESS`,
  UPDATE_ERROR: `${prefix}_UPDATE_ERROR`,

  doInit: (id) => async (dispatch) => {
    try {
      dispatch({
        type: projectsFormActions.INIT_STARTED,
      });

      let record = {};

      const isEdit = Boolean(id);

      if (isEdit) {
        record = await ProjectsService.find(id);
      }

      dispatch({
        type: projectsFormActions.INIT_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: projectsFormActions.INIT_ERROR,
      });

      getHistory().push('/projects');
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: projectsFormActions.CREATE_STARTED,
      });

      await ProjectsService.create(values);

      dispatch({
        type: projectsFormActions.CREATE_SUCCESS,
      });

      Message.success(
        i18n('entities.projects.create.success'),
      );

      getHistory().push('/projects');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: projectsFormActions.CREATE_ERROR,
      });
    }
  },

  doUpdate: (id, values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: projectsFormActions.UPDATE_STARTED,
      });

      await ProjectsService.update(id, values);

      dispatch({
        type: projectsFormActions.UPDATE_SUCCESS,
      });

      Message.success(
        i18n('entities.projects.update.success'),
      );

      getHistory().push('/projects');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: projectsFormActions.UPDATE_ERROR,
      });
    }
  },
};

export default projectsFormActions;
