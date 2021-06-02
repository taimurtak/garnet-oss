import list from 'src/modules/projects/list/projectsListReducers';
import form from 'src/modules/projects/form/projectsFormReducers';
import view from 'src/modules/projects/view/projectsViewReducers';
import destroy from 'src/modules/projects/destroy/projectsDestroyReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
});
