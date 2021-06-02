import React from 'react';
import Toolbar from 'src/view/shared/styles/Toolbar';
import { Button, Tooltip, Popconfirm } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import configurationsSelectors from 'src/modules/configurations/configurationsSelectors';
import selectors from 'src/modules/configurations/list/configurationsListSelectors';
import actions from 'src/modules/configurations/list/configurationsListActions';
import destroyActions from 'src/modules/configurations/destroy/configurationsDestroyActions';
import { Link } from 'react-router-dom';
import { i18n } from 'src/i18n';
import destroySelectors from 'src/modules/configurations/destroy/configurationsDestroySelectors';
import {
  FileExcelOutlined,
  DeleteOutlined,
  PlusOutlined,
  UploadOutlined,
  FileSearchOutlined,
} from '@ant-design/icons';

const ConfigurationsToolbar = (props) => {
  const dispatch = useDispatch();
  const selectedKeys = useSelector(
    selectors.selectSelectedKeys,
  );
  const loading = useSelector(selectors.selectLoading);
  const destroyLoading = useSelector(
    destroySelectors.selectLoading,
  );
  const exportLoading = useSelector(
    selectors.selectExportLoading,
  );
  const hasRows = useSelector(selectors.selectHasRows);
  const hasPermissionToDestroy = useSelector(
    configurationsSelectors.selectPermissionToDestroy,
  );
  const hasPermissionToCreate = useSelector(
    configurationsSelectors.selectPermissionToCreate,
  );
  const hasPermissionToImport = useSelector(
    configurationsSelectors.selectPermissionToImport,
  );


  const doDestroyAllSelected = () => {
    dispatch(destroyActions.doDestroyAll(selectedKeys));
  };


  const renderDestroyButton = () => {
    if (!hasPermissionToDestroy) {
      return null;
    }

    const disabled = !selectedKeys.length || loading;
    const button = (
      <Button
        disabled={disabled}
        loading={destroyLoading}
        type="primary"
        icon={<DeleteOutlined />}
      >
        {i18n('common.destroy')}
      </Button>
    );
    const buttonWithConfirm = (
      <Popconfirm
        title={i18n('common.areYouSure')}
        onConfirm={() => doDestroyAllSelected()}
        okText={i18n('common.yes')}
        cancelText={i18n('common.no')}
      >
        {button}
      </Popconfirm>
    );

    if (disabled) {
      return (
        <Tooltip title={i18n('common.mustSelectARow')}>
          {button}
        </Tooltip>
      );
    }

    return buttonWithConfirm;
  };

  return (
    <Toolbar>
      {hasPermissionToCreate && (
        <Link to="/configurations/new">
          <Button type="primary" icon={<PlusOutlined />}>
            {i18n('common.new')}
          </Button>
        </Link>
      )}


      {renderDestroyButton()}


    </Toolbar>
  );
};

export default ConfigurationsToolbar;
