import {
  FileExcelOutlined,
  FileSearchOutlined,
  MailOutlined,
  DeleteOutlined,
  ImportOutlined,
} from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { i18n } from 'src/i18n';
import actions from 'src/modules/user/list/userListActions';
import selectors from 'src/modules/user/list/userListSelectors';
import userSelectors from 'src/modules/user/userSelectors';
import Toolbar from 'src/view/shared/styles/Toolbar';

const UserToolbar = (props) => {
  const dispatch = useDispatch();

  const selectedKeys = useSelector(
    selectors.selectSelectedKeys,
  );
  const loading = useSelector(selectors.selectLoading);
  const exportLoading = useSelector(
    selectors.selectExportLoading,
  );
  const hasRows = useSelector(selectors.selectHasRows);
  const hasPermissionToDestroy = useSelector(
    userSelectors.selectPermissionToDestroy,
  );
  const hasPermissionToCreate = useSelector(
    userSelectors.selectPermissionToCreate,
  );


  

  const doDestroyAllSelected = () => {
    dispatch(actions.doDestroyAllSelected());
  };


  const renderDestroyButton = () => {
    if (!hasPermissionToDestroy) {
      return null;
    }

    const disabled = !selectedKeys.length || loading;
    const button = (
      <Button
        disabled={disabled}
        type="primary"
        icon={<DeleteOutlined />}
        onClick={doDestroyAllSelected}
      >
        {i18n('common.destroy')}
      </Button>
    );

    if (disabled) {
      return (
        <Tooltip title={i18n('common.mustSelectARow')}>
          {button}
        </Tooltip>
      );
    }

    return button;
  };

  return (
    <Toolbar>
      {hasPermissionToCreate && (
        <Link to="/user/new">
          <Button type="primary" icon={<MailOutlined />}>
            {i18n('user.invite')}
          </Button>
        </Link>
      )}


      {renderDestroyButton()}

    </Toolbar>
  );
};

export default UserToolbar;
