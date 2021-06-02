import ConfigurationsService from 'src/modules/configurations/configurationsService';
import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';

const prefix = 'CONFIGURATIONS_VIEW';

const configurationsViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: configurationsViewActions.FIND_STARTED,
      });

      const record = await ConfigurationsService.find(id);

      dispatch({
        type: configurationsViewActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: configurationsViewActions.FIND_ERROR,
      });

      getHistory().push('/configurations');
    }
  },
};

export default configurationsViewActions;
