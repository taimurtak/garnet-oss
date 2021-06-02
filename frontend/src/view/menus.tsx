import { i18n } from 'src/i18n';
import React from 'react';
import config from 'src/config';

import {
  ProjectOutlined,
  UnlockOutlined
} from '@ant-design/icons';


export default [
  {
    path: '/projects',
    permissionRequired: null,
    icon: <ProjectOutlined />,
    label: i18n('entities.projects.menu'),
  },
  {
    path: '/configurations',
    permissionRequired: null,
    icon: <UnlockOutlined />,
    label: i18n('entities.configurations.menu'),
  },
].filter(Boolean);
