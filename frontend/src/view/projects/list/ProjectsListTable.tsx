import { Table, Popconfirm, Tag } from 'antd';
import { i18n } from 'src/i18n';
import actions from 'src/modules/projects/list/projectsListActions';
import destroyActions from 'src/modules/projects/destroy/projectsDestroyActions';
import selectors from 'src/modules/projects/list/projectsListSelectors';
import destroySelectors from 'src/modules/projects/destroy/projectsDestroySelectors';
import projectsSelectors from 'src/modules/projects/projectsSelectors';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import TableWrapper from 'src/view/shared/styles/TableWrapper';
import ButtonLink from 'src/view/shared/styles/ButtonLink';


const ProjectsListTable = (props) => {
  const dispatch = useDispatch();

  const findLoading = useSelector(selectors.selectLoading);
  const destroyLoading = useSelector(
    destroySelectors.selectLoading,
  );
  const loading = findLoading || destroyLoading;

  const rows = useSelector(selectors.selectRows);
  const pagination = useSelector(
    selectors.selectPagination,
  );
  const selectedKeys = useSelector(
    selectors.selectSelectedKeys,
  );
  const hasPermissionToEdit = useSelector(
    projectsSelectors.selectPermissionToEdit,
  );
  const hasPermissionToDestroy = useSelector(
    projectsSelectors.selectPermissionToDestroy,
  );

  const handleTableChange = (
    pagination,
    filters,
    sorter,
  ) => {
    dispatch(
      actions.doChangePaginationAndSort(pagination, sorter),
    );
  };

  const doDestroy = (id) => {
    dispatch(destroyActions.doDestroy(id));
  };

  const columns = [
    {
      title: i18n('entities.projects.fields.projectName'),
      sorter: true,
      dataIndex: 'projectName',
    },
    {
      title: i18n('entities.projects.fields.projectDescription'),
      sorter: true,
      dataIndex: 'projectDescription',
    },
    {
      title: i18n('entities.projects.fields.projectTags'),
      dataIndex: 'projectTags',
      render: (values) =>
        (values || []).map((value) => (
          <Tag key={value} color="volcano">
            <div key={value}>
              {value
                ? i18n(
                  `entities.projects.enumerators.projectTags.${value}`,
                )
                : null}
            </div>
          </Tag>
        )),
    },
    {
      title: '',
      dataIndex: '',
      width: '160px',
      render: (_, record) => (
        <div className="table-actions">
          <Link to={`/projects/${record.id}`}>
            {i18n('common.view')}
          </Link>
          {hasPermissionToEdit && (
            <Link to={`/projects/${record.id}/edit`}>
              {i18n('common.edit')}
            </Link>
          )}
          {hasPermissionToDestroy && (
            <Popconfirm
              title={i18n('common.areYouSure')}
              onConfirm={() => doDestroy(record.id)}
              okText={i18n('common.yes')}
              cancelText={i18n('common.no')}
            >
              <ButtonLink>
                {i18n('common.destroy')}
              </ButtonLink>
            </Popconfirm>
          )}
        </div>
      ),
    },
  ];

  const rowSelection = () => {
    return {
      selectedRowKeys: selectedKeys,
      onChange: (selectedRowKeys) => {
        dispatch(actions.doChangeSelected(selectedRowKeys));
      },
    };
  };

  return (
    <TableWrapper>
      <Table
        rowKey="id"
        loading={loading}
        columns={columns as any}
        dataSource={rows}
        pagination={pagination}
        onChange={handleTableChange}
        rowSelection={rowSelection()}
        scroll={{
          x: true,
        }}
      />
    </TableWrapper>
  );
};

export default ProjectsListTable;
