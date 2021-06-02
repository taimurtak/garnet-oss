import { Table, Popconfirm, Input, Tag } from 'antd';
import { i18n } from 'src/i18n';
import actions from 'src/modules/configurations/list/configurationsListActions';
import destroyActions from 'src/modules/configurations/destroy/configurationsDestroyActions';
import selectors from 'src/modules/configurations/list/configurationsListSelectors';
import destroySelectors from 'src/modules/configurations/destroy/configurationsDestroySelectors';
import configurationsSelectors from 'src/modules/configurations/configurationsSelectors';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import TableWrapper from 'src/view/shared/styles/TableWrapper';
import ButtonLink from 'src/view/shared/styles/ButtonLink';
import ProjectsListItem from 'src/view/projects/list/ProjectsListItem';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';


const ConfigurationsListTable = (props) => {
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
    configurationsSelectors.selectPermissionToEdit,
  );
  const hasPermissionToDestroy = useSelector(
    configurationsSelectors.selectPermissionToDestroy,
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
        title: i18n('entities.configurations.fields.variableName'),
        sorter: true,
        dataIndex: 'variableName',
      },
    {
      title: i18n('entities.configurations.fields.variableValue'),
      //sorter: true,
      hidden: true,
      dataIndex: 'variableValue',
      render: (dataIndex) => (
        <Input.Password
          type="password"
          value={dataIndex}
          iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          readOnly />
      )
    },
    {
      title: i18n('entities.configurations.fields.scope'),
      dataIndex: 'scope',
      render: (values) =>
        (values || []).map((value) => (
          <div key={value}>
            <Tag key={value} color={i18n(
              `entities.configurations.${value}.color`
            )}>
              {value
                ? i18n(
                  `entities.configurations.enumerators.scope.${value}`,
                )
                : null}
            </Tag>
          </div>
        )),
    },
    {
      title: i18n('entities.configurations.fields.projectName'),
      sorter: false,
      dataIndex: 'projectName',
      render: (value) => <Tag color="volcano"><ProjectsListItem value={value} /></Tag>,
    },
      {
        title: i18n('entities.configurations.fields.serviceName'),
        sorter: true,
        dataIndex: 'serviceName',
      },
    {
      title: '',
      dataIndex: '',
      width: '160px',
      render: (_, record) => (
        <div className="table-actions">
          <Link to={`/configurations/${record.id}`}>
            {i18n('common.view')}
          </Link>
          {hasPermissionToEdit && (
            <Link to={`/configurations/${record.id}/edit`}>
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

export default ConfigurationsListTable;
