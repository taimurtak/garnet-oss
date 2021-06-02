import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { i18n } from 'src/i18n';
import actions from 'src/modules/projects/view/projectsViewActions';
import selectors from 'src/modules/projects/view/projectsViewSelectors';
import ProjectsView from 'src/view/projects/view/ProjectsView';
import ProjectsViewToolbar from 'src/view/projects/view/ProjectsViewToolbar';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';

const ProjectsPage = (props) => {
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
          [i18n('entities.projects.menu'), '/projects'],
          [i18n('entities.projects.view.title')],
        ]}
      />

      <ContentWrapper>
        <PageTitle>
          {i18n('entities.projects.view.title')}
        </PageTitle>

        <ProjectsViewToolbar match={match} />

        <ProjectsView loading={loading} record={record} />
      </ContentWrapper>
    </>
  );
};

export default ProjectsPage;
