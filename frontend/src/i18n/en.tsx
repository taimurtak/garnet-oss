const en = {
  common: {
    or: 'or',
    cancel: 'Cancel',
    reset: 'Reset',
    save: 'Save',
    search: 'Search',
    edit: 'Edit',
    remove: 'Remove',
    new: 'New',
    export: 'Download',
    noDataToExport: 'No data to export',
    import: 'Import',
    discard: 'Discard',
    yes: 'Yes',
    no: 'No',
    pause: 'Pause',
    areYouSure: 'Are you sure?',
    view: 'View',
    destroy: 'Delete',
    mustSelectARow: 'Must select a row',
    filters: 'Filters',
  },

  app: {
    title: 'garnet',
  },

  api: {
    menu: 'API',
  },

  entities: {
    configurations: {
      name: 'Configurations',
      label: 'Configurations',
      menu: 'Configurations',
      exporterFileName: 'configs_export',
      list: {
        menu: 'Configurations',
        title: 'Configurations',
      },
      create: {
        success: 'Configuration successfully saved',
      },
      update: {
        success: 'Configuration successfully saved',
      },
      destroy: {
        success: 'Configuration successfully deleted',
      },
      destroyAll: {
        success: 'Configuration(s) successfully deleted',
      },
      edit: {
        title: 'Edit Configuration',
      },
      fields: {
        id: 'Id',
        'variableName': 'Config Key',
        'variableValue': 'Config Value',
        'scope': 'Scope',
        'projectName': 'Project Name',
        'serviceName': 'Service Name',
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        createdAtRange: 'Created at',
      },
      enumerators: {
        'scope': {
          'default': 'Default',
          'dev': 'Dev',
          'test': 'Test',
          'staging': 'Staging',
          'prod': 'Prod',
        },
      },
      default: {
        'color': '#949494',
      },
      dev: {
        'color': '#b787f5',
      },
      test: {
        'color': '#f25757',
      },
      staging: {
        'color': '#648df5',
      },
      prod: {
        'color': '#2fc496',
      },
      placeholders: {
        'variableName': 'e.g. STRIPE_SECRET_KEY',
        'variableValue': 'e.g. AKIATO74EALHY4TQ6D5B',
        'scope': 'e.g. dev, prod',
        'projectName': 'e.g. foo-frontend',
        'serviceName': 'e.g. Stripe',
      },
      hints: {
        'variableName': 'Name of config variable (case-sensitive)',
        'variableValue': 'Value of config variable (will be encrypted)',
        'scope': 'Define your scope(s) (e.g. staging, prod) ',
        'projectName': 'Select an existing project from the dropdown',
        'serviceName': 'Name of service (e.g. Stripe) ',
      },
      new: {
        title: 'New Configuration',
      },
      view: {
        title: 'View Configuration',
      },
    },

    projects: {
      name: 'projects',
      label: 'Projects',
      menu: 'Projects',
      list: {
        menu: 'Projects',
        title: 'Projects',
      },
      create: {
        success: 'Projects successfully saved',
      },
      update: {
        success: 'Projects successfully saved',
      },
      destroy: {
        success: 'Projects successfully deleted',
      },
      destroyAll: {
        success: 'Projects(s) successfully deleted',
      },
      edit: {
        title: 'Edit Projects',
      },
      fields: {
        id: 'Id',
        'projectName': 'Project Name',
        'projectDescription': 'Project Description',
        'projectTags': 'Project Tags',
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        createdAtRange: 'Created at',
      },
      enumerators: {
        'projectTags': {
          'Web App': 'Web App',
          'Backend': 'Backend',
          'Frontend': 'Frontend',
          'Static website': 'Static website',
          'CLI': 'CLI',
          'Infrastructure': 'Infrastructure',
          'Other': 'Other',
        },
      },
      placeholders: {
        'projectName': 'e.g. foo-frontend (no whitespaces) ',
        'projectDescription': 'Describe your project (optional)',
      },
      hints: {
        'projectTags': 'What best describes your project?',
      },
      new: {
        title: 'New Projects',
      },
      view: {
        title: 'View Projects',
      },
      validation: {
        url:
          'Your Project name can only contain lowercase letters, numbers and dashes (and must start with a letter or number).',
      },
    },
  },

  auth: {
    tenants: 'Workspaces',
    profile: {
      title: 'Profile',
      success: 'Profile successfully updated',
    },
    createAnAccount: 'Create an account',
    rememberMe: 'Remember me',
    forgotPassword: 'Forgot password',
    signinGoogle: 'Sign in with Google',
    signinGithub: 'Sign in with GitHub',
    signin: 'Sign in',
    signup: 'Sign up',
    signout: 'Sign out',
    alreadyHaveAnAccount:
      'Already have an account? Sign in.',
    social: {
      errors: {
        'auth-invalid-provider':
          'This email is already registered to another provider.',
        'auth-no-email': `The email associated with this account is private or inexistent.`,
      },
    },
    signinWithAnotherAccount:
      'Sign in with another account',
    passwordChange: {
      title: 'Change Password',
      success: 'Password successfully changed',
      mustMatch: 'Passwords must match',
    },
    emailUnverified: {
      message: `Please confirm your email at <strong>{0}</strong> to continue.`,
      submit: `Resend email verification`,
    },
    emptyPermissions: {
      message: `You have no permissions yet. Wait for the admin to grant you privileges.`,
    },
    passwordResetEmail: {
      message: 'Send password reset email',
      error: `Email not recognized`,
    },
    passwordReset: {
      message: 'Reset password',
    },
    emailAddressVerificationEmail: {
      error: `Email not recognized`,
    },
    verificationEmailSuccess: `Verification email successfully sent`,
    passwordResetEmailSuccess: `Password reset email successfully sent`,
    passwordResetSuccess: `Password successfully changed`,
    verifyEmail: {
      success: 'Email successfully verified.',
      message:
        'Just a moment, your email is being verified...',
    },
  },

  tenant: {
    name: 'tenant',
    label: 'Workspaces',
    menu: 'Workspaces',
    list: {
      menu: 'Workspaces',
      title: 'Workspaces',
    },
    create: {
      button: 'Create Workspace',
      success: 'Workspace successfully saved',
    },
    update: {
      success: 'Workspace successfully saved',
    },
    destroy: {
      success: 'Workspace successfully deleted',
    },
    destroyAll: {
      success: 'Workspace(s) successfully deleted',
    },
    edit: {
      title: 'Edit Workspace',
    },
    fields: {
      id: 'Id',
      name: 'Name',
      url: 'URL',
      tenantName: 'Workspace Name',
      tenantId: 'Workspace',
      tenantUrl: 'Workspace URL',
      plan: 'Plan',
    },
    enumerators: {},
    new: {
      title: 'New Workspace',
    },
    invitation: {
      view: 'View Invitations',
      invited: 'Invited',
      accept: 'Accept Invitation',
      decline: 'Decline Invitation',
      declined: 'Invitation successfully declined',
      acceptWrongEmail: 'Accept Invitation With This Email',
    },
    select: 'Select Workspace',
    validation: {
      url:
        'Your workspace URL can only contain lowercase letters, numbers and dashes (and must start with a letter or number).',
    },
  },

  roles: {
    admin: {
      label: 'Admin',
      description: 'Full access to all resources',
    },
    custom: {
      label: 'Custom Role',
      description: 'Custom access to resources',
    },
  },

  user: {
    invite: 'Invite',
    title: 'Users',
    menu: 'Team',
    fields: {
      id: 'Id',
      avatars: 'Avatar',
      email: 'Email',
      emails: 'Email(s)',
      fullName: 'Name',
      firstName: 'First Name',
      lastName: 'Last Name',
      status: 'Status',
      phoneNumber: 'Phone Number',
      apiToken: 'API Token',
      role: 'Role',
      createdAt: 'Created at',
      updatedAt: 'Updated at',
      roleUser: 'Role/User',
      roles: 'Roles',
      createdAtRange: 'Created at',
      password: 'Password',
      rememberMe: 'Remember me',
      oldPassword: 'Old Password',
      newPassword: 'New Password',
      newPasswordConfirmation: 'Confirm Password',
    },
    validations: {
      // eslint-disable-next-line
      email: 'Email ${value} is invalid',
    },
    disable: 'Disable',
    enable: 'Enable',
    doAddSuccess: 'User(s) successfully saved',
    doUpdateSuccess: 'User successfully saved',
    status: {
      active: 'Active',
      invited: 'Invited',
      'empty-permissions': 'Waiting for Permissions',
    },
    exporterFileName: 'users_export',
    doDestroySuccess: 'User successfully deleted',
    doDestroyAllSelectedSuccess:
      'User(s) successfully deleted',
    edit: {
      title: 'Edit User',
    },
    new: {
      title: 'New User(s)',
      titleModal: 'New User',
      emailsHint:
        'Separate multiple email addresses using the comma character.',
    },
    view: {
      title: 'View User',
      activity: 'Activity',
    },
    importer: {
      title: 'Import Users',
      fileName: 'users_import_template',
      hint:
        'Files/Images columns must be the URLs of the files separated by space. Relationships must be the ID of the referenced records separated by space. Roles must be the role ids separated by space.',
    },
    errors: {
      userAlreadyExists:
        'User with this email already exists',
      userNotFound: 'User not found',
      disablingHimself: `You can't disable yourself`,
      revokingOwnPermission: `You can't revoke your own admin permission`,
    },
  },
  dashboard: {
    menu: 'Home',
    message: `For Getting Started, please navigate to https://docs.usegarnet.com.`,
  },

  errors: {
    backToHome: 'Back to home',
    backToPlan: 'Upgrade',
    403: `Your free limit has been reached. Please upgrade to get unlimited access.`,
    404: 'Sorry, the page you visited does not exist',
    500: 'Sorry, the server is reporting an error',
    429: 'Too many requests. Please try again later.',
    forbidden: {
      message: 'Forbidden',
    },
    validation: {
      message: 'An error occurred',
    },
    defaultErrorMessage: 'Ops, an error occurred',
  },

  preview: {
    error:
      'Sorry, this operation is not allowed in preview mode.',
  },

  // See https://github.com/jquense/yup#using-a-custom-locale-dictionary
  /* eslint-disable */
  validation: {
    mixed: {
      default: '${path} is invalid',
      required: '${path} is required',
      oneOf:
        '${path} must be one of the following values: ${values}',
      notOneOf:
        '${path} must not be one of the following values: ${values}',
      notType: ({ path, type, value, originalValue }) => {
        return `${path} must be a ${type}`;
      },
    },
    string: {
      length:
        '${path} must be exactly ${length} characters',
      min: '${path} must be at least ${min} characters',
      max: '${path} must be at most ${max} characters',
      matches:
        '${path} must follow this format i.e. (frontend, foo-backend etc)',
      email: '${path} must be a valid email',
      url: '${path} must be a valid URL',
      trim: '${path} must be a trimmed string',
      lowercase: '${path} must be a lowercase string',
      uppercase: '${path} must be a upper case string',
      selected: '${path} must be selected',
    },
    number: {
      min:
        '${path} must be greater than or equal to ${min}',
      max: '${path} must be less than or equal to ${max}',
      lessThan: '${path} must be less than ${less}',
      moreThan: '${path} must be greater than ${more}',
      notEqual: '${path} must be not equal to ${notEqual}',
      positive: '${path} must be a positive number',
      negative: '${path} must be a negative number',
      integer: '${path} must be an integer',
    },
    date: {
      min: '${path} field must be later than ${min}',
      max: '${path} field must be at earlier than ${max}',
    },
    boolean: {},
    object: {
      noUnknown:
        '${path} field cannot have keys not specified in the object shape',
    },
    array: {
      min: ({ min, path }) =>
        min === 1
          ? `${path} is required`
          : `${path} field must have at least ${min} items`,
      max:
        '${path} field must have less than or equal to ${max} items',
    },
  },
  /* eslint-disable */
  fileUploader: {
    upload: 'Upload',
    image: 'You must upload an image',
    size: 'File is too big. Max allowed size is {0}',
    formats: `Invalid format. Must be one of: {0}.`,
  },
  
  autocomplete: {
    loading: 'Loading...',
  },

  imagesViewer: {
    noImage: 'No image',
  },
};

export default en;
