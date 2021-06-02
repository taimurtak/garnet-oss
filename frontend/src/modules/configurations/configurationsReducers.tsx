import list from 'src/modules/configurations/list/configurationsListReducers';
import form from 'src/modules/configurations/form/configurationsFormReducers';
import view from 'src/modules/configurations/view/configurationsViewReducers';
import destroy from 'src/modules/configurations/destroy/configurationsDestroyReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
});
