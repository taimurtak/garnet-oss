import ConfigurationsService from 'src/modules/configurations/configurationsService';
import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';
import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';

const prefix = 'CONFIGURATIONS_FORM';

const configurationsFormActions = {
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
        type: configurationsFormActions.INIT_STARTED,
      });

      let record = {};

      const isEdit = Boolean(id);

      if (isEdit) {
        record = await ConfigurationsService.find(id);
      }

      dispatch({
        type: configurationsFormActions.INIT_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: configurationsFormActions.INIT_ERROR,
      });

      getHistory().push('/configurations');
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: configurationsFormActions.CREATE_STARTED,
      });

      await ConfigurationsService.create(values);

      dispatch({
        type: configurationsFormActions.CREATE_SUCCESS,
      });

      Message.success(
        i18n('entities.configurations.create.success'),
      );

      getHistory().push('/configurations');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: configurationsFormActions.CREATE_ERROR,
      });
    }
  },

  doUpdate: (id, values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: configurationsFormActions.UPDATE_STARTED,
      });

      await ConfigurationsService.update(id, values);

      dispatch({
        type: configurationsFormActions.UPDATE_SUCCESS,
      });

      Message.success(
        i18n('entities.configurations.update.success'),
      );

      getHistory().push('/configurations');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: configurationsFormActions.UPDATE_ERROR,
      });
    }
  },
};

export default configurationsFormActions;
