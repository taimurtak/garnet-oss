import React from 'react';
import { i18n } from 'src/i18n';
import ProjectsListFilter from 'src/view/projects/list/ProjectsListFilter';
import ProjectsListTable from 'src/view/projects/list/ProjectsListTable';
import ProjectsListToolbar from 'src/view/projects/list/ProjectsListToolbar';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';

const ProjectsListPage = (props) => {
  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('entities.projects.menu')],
        ]}
      />

      <ContentWrapper>
        <PageTitle>
          {i18n('entities.projects.list.title')}
        </PageTitle>

        <ProjectsListToolbar />
        <ProjectsListFilter />
        <ProjectsListTable />
      </ContentWrapper>
    </>
  );
};

export default ProjectsListPage;
