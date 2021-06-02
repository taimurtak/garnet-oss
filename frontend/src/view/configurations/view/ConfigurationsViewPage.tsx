import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { i18n } from 'src/i18n';
import actions from 'src/modules/configurations/view/configurationsViewActions';
import selectors from 'src/modules/configurations/view/configurationsViewSelectors';
import ConfigurationsView from 'src/view/configurations/view/ConfigurationsView';
import ConfigurationsViewToolbar from 'src/view/configurations/view/ConfigurationsViewToolbar';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';

const ConfigurationsPage = (props) => {
  const dispatch = useDispatch();
  const match = useRouteMatch();

  const loading = useSelector(selectors.selectLoading);
  const record = useSelector(selectors.selectRecord);

  useEffect(() => {
    dispatch(actions.doFind(match.params.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('entities.configurations.menu'), '/configurations'],
          [i18n('entities.configurations.view.title')],
        ]}
      />

      <ContentWrapper>
        <PageTitle>
          {i18n('entities.configurations.view.title')}
        </PageTitle>

        <ConfigurationsViewToolbar match={match} />

        <ConfigurationsView loading={loading} record={record} />
      </ContentWrapper>
    </>
  );
};

export default ConfigurationsPage;
