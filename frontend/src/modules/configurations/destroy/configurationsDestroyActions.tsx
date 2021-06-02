import listActions from 'src/modules/configurations/list/configurationsListActions';
import ConfigurationsService from 'src/modules/configurations/configurationsService';
import Errors from 'src/modules/shared/error/errors';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import Message from 'src/view/shared/message';

const prefix = 'CONFIGURATIONS_DESTROY';

const configurationsDestroyActions = {
  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  DESTROY_ALL_STARTED: `${prefix}_DESTROY_ALL_STARTED`,
  DESTROY_ALL_SUCCESS: `${prefix}_DESTROY_ALL_SUCCESS`,
  DESTROY_ALL_ERROR: `${prefix}_DESTROY_ALL_ERROR`,

  doDestroy: (id) => async (dispatch) => {
    try {
      dispatch({
        type: configurationsDestroyActions.DESTROY_STARTED,
      });

      await ConfigurationsService.destroyAll([id]);

      dispatch({
        type: configurationsDestroyActions.DESTROY_SUCCESS,
      });

      Message.success(
        i18n('entities.configurations.destroy.success'),
      );

      dispatch(listActions.doFetchCurrentFilter());

      getHistory().push('/configurations');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: configurationsDestroyActions.DESTROY_ERROR,
      });
    }
  },

  doDestroyAll: (ids) => async (dispatch) => {
    try {
      dispatch({
        type: configurationsDestroyActions.DESTROY_ALL_STARTED,
      });

      await ConfigurationsService.destroyAll(ids);

      dispatch({
        type: configurationsDestroyActions.DESTROY_ALL_SUCCESS,
      });

      if (listActions) {
        dispatch(listActions.doChangeSelected([]));
        dispatch(listActions.doFetchCurrentFilter());
      }

      Message.success(
        i18n('entities.configurations.destroyAll.success'),
      );

      getHistory().push('/configurations');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: configurationsDestroyActions.DESTROY_ALL_ERROR,
      });
    }
  },
};

export default configurationsDestroyActions;
