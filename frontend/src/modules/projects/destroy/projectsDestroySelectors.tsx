import { createSelector } from 'reselect';

const selectRaw = (state) => state.projects.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const projectsDestroySelectors = {
  selectLoading,
};

export default projectsDestroySelectors;
