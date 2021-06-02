import { createSelector } from 'reselect';

const selectRaw = (state) => state.configurations.view;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const configurationsViewSelectors = {
  selectLoading,
  selectRecord,
  selectRaw,
};

export default configurationsViewSelectors;
