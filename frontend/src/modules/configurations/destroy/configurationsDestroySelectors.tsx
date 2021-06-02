import { createSelector } from 'reselect';

const selectRaw = (state) => state.configurations.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const configurationsDestroySelectors = {
  selectLoading,
};

export default configurationsDestroySelectors;
