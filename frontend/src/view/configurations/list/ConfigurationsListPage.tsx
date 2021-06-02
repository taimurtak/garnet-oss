import React from 'react';
import { i18n } from 'src/i18n';
import ConfigurationsListFilter from 'src/view/configurations/list/ConfigurationsListFilter';
import ConfigurationsListTable from 'src/view/configurations/list/ConfigurationsListTable';
import ConfigurationsListToolbar from 'src/view/configurations/list/ConfigurationsListToolbar';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';

const ConfigurationsListPage = (props) => {
  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('entities.configurations.menu')],
        ]}
      />

      <ContentWrapper>
        <PageTitle>
          {i18n('entities.configurations.list.title')}
        </PageTitle>

        <ConfigurationsListToolbar />
        <ConfigurationsListFilter />
        <ConfigurationsListTable />
      </ContentWrapper>
    </>
  );
};

export default ConfigurationsListPage;
