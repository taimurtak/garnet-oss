import {
  EditOutlined,
  EyeOutlined,
  FileSearchOutlined,
} from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { i18n } from 'src/i18n';
import Toolbar from 'src/view/shared/styles/Toolbar';
import { useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import userSelectors from 'src/modules/user/userSelectors';
import selectors from 'src/modules/user/view/userViewSelectors';

const UserViewToolbar = () => {
  const match = useRouteMatch();

  const user = useSelector(selectors.selectUser);
  const hasPermissionToEdit = useSelector(
    userSelectors.selectPermissionToEdit,
  );  

  const id = match.params.id;
  return (
    <Toolbar>
      {hasPermissionToEdit && (
        <Link to={`/user/${id}/edit`}>
          <Button type="primary" icon={<EditOutlined />}>
            {i18n('common.edit')}
          </Button>
        </Link>
      )}
    </Toolbar>
  );
};

export default UserViewToolbar;
