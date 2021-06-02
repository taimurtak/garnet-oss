import config from 'src/config';

const privateRoutes = [
  
  {
    path: '/profile',
    loader: () => import('src/view/auth/ProfileFormPage'),
    permissionRequired: null,
    exact: true,
  },

  {
    path: '/password-change',
    loader: () =>
      import('src/view/auth/PasswordChangeFormPage'),
    permissionRequired: null,
    exact: true,
  },

  {
    path: '/tenant',
    loader: () =>
      import('src/view/tenant/list/TenantListPage'),
    permissionRequired: null,
    exact: true,
  },
  {
    path: '/tenant/new',
    loader: () =>
      import('src/view/tenant/form/TenantFormPage'),
    permissionRequired: null,
    exact: true,
  },
  {
    path: '/tenant/:id/edit',
    loader: () =>
      import('src/view/tenant/form/TenantFormPage'),
    permissionRequired: null,
    exact: true,
  },

  {
    path: '/user',
    loader: () => import('src/view/user/list/UserPage'),
    permissionRequired: null,
    exact: true,
  },

  {
    path: '/user/new',
    loader: () => import('src/view/user/new/UserNewPage'),
    permissionRequired: null,
    exact: true,
  },

  {
    path: '/user/:id/edit',
    loader: () => import('src/view/user/edit/UserEditPage'),
    permissionRequired: null,
    exact: true,
  },
  {
    path: '/user/:id',
    loader: () => import('src/view/user/view/UserViewPage'),
    permissionRequired: null,
    exact: true,
  },
  {
    path: '/configurations',
    loader: () =>
      import('src/view/configurations/list/ConfigurationsListPage'),
    permissionRequired: null,
    exact: true,
  },
  {
    path: '/configurations/new',
    loader: () =>
      import('src/view/configurations/form/ConfigurationsFormPage'),
    permissionRequired: null,
    exact: true,
  },
  
  {
    path: '/configurations/:id/edit',
    loader: () =>
      import('src/view/configurations/form/ConfigurationsFormPage'),
    permissionRequired: null,
    exact: true,
  },
  {
    path: '/configurations/:id',
    loader: () =>
      import('src/view/configurations/view/ConfigurationsViewPage'),
    permissionRequired: null,
    exact: true,
  },

  {
    path: '/projects',
    loader: () =>
      import('src/view/projects/list/ProjectsListPage'),
    permissionRequired: null,
    exact: true,
  },
  {
    path: '/projects/new',
    loader: () =>
      import('src/view/projects/form/ProjectsFormPage'),
    permissionRequired: null,
    exact: true,
  },

  {
    path: '/projects/:id/edit',
    loader: () =>
      import('src/view/projects/form/ProjectsFormPage'),
    permissionRequired: null,
    exact: true,
  },
  {
    path: '/projects/:id',
    loader: () =>
      import('src/view/projects/view/ProjectsViewPage'),
    permissionRequired: null,
    exact: true,
  },
].filter(Boolean);

const publicRoutes = [
  {
    path: '/auth/signin',
    loader: () => import('src/view/auth/SigninPage'),
  },
  {
    path: '/auth/signup',
    loader: () => import('src/view/auth/SignupPage'),
  },
  {
    path: '/auth/forgot-password',
    loader: () =>
      import('src/view/auth/ForgotPasswordPage'),
  },
].filter(Boolean);

const emptyTenantRoutes = [
  {
    path: '/auth/tenant',
    loader: () => import('src/view/auth/TenantPage'),
  },
].filter(Boolean);

const emptyPermissionsRoutes = [
  {
    path: '/auth/empty-permissions',
    loader: () =>
      import('src/view/auth/EmptyPermissionsPage'),
  },
].filter(Boolean);

const emailUnverifiedRoutes = [
  {
    path: '/auth/email-unverified',
    loader: () =>
      import('src/view/auth/EmailUnverifiedPage'),
  },
].filter(Boolean);

const simpleRoutes = [
  {
    path: '/auth/password-reset',
    loader: () => import('src/view/auth/PasswordResetPage'),
  },
  {
    path: '/auth/invitation',
    loader: () => import('src/view/auth/InvitationPage'),
  },
  {
    path: '/auth/verify-email',
    loader: () => import('src/view/auth/VerifyEmailPage'),
  },
  {
    path: '/403',
    loader: () =>
      import('src/view/shared/errors/Error403Page'),
  },
  {
    path: '/500',
    loader: () =>
      import('src/view/shared/errors/Error500Page'),
  },
  {
    path: '**',
    loader: () =>
      import('src/view/shared/errors/Error404Page'),
  },
].filter(Boolean);

export default {
  privateRoutes,
  publicRoutes,
  emptyTenantRoutes,
  emptyPermissionsRoutes,
  emailUnverifiedRoutes,
  simpleRoutes,
};
