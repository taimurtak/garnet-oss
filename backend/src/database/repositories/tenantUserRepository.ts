import SequelizeRepository from '../../database/repositories/sequelizeRepository';
import Roles from '../../security/roles';
import crypto from 'crypto';
import { IRepositoryOptions } from './IRepositoryOptions';

export default class TenantUserRepository {
  
  static async findByTenantAndUser(
    tenantId,
    userId,
    options: IRepositoryOptions,
  ) {
    const transaction = SequelizeRepository.getTransaction(
      options,
    );

    return await options.database.tenantUser.findOne({
      where: {
        tenantId,
        userId,
      },
      transaction,
    });
  }

  static async findByInvitationToken(
    invitationToken,
    options: IRepositoryOptions,
  ) {
    const transaction = SequelizeRepository.getTransaction(
      options,
    );

    return await options.database.tenantUser.findOne({
      where: {
        invitationToken,
      },
      include: ['tenant', 'user'],
      transaction,
    });
  }

  static async create(
    tenant,
    user,
    roles,
    options: IRepositoryOptions,
  ) {
    roles = roles || [];
    const transaction = SequelizeRepository.getTransaction(
      options,
    );

    const status = selectStatus('active', roles);

    await options.database.tenantUser.create(
      {
        tenantId: tenant.id,
        userId: user.id,
        status,
        roles,
      },
      { transaction },
    );
  }

  static async destroy(
    tenantId,
    id,
    options: IRepositoryOptions,
  ) {
    const transaction = SequelizeRepository.getTransaction(
      options,
    );

    let user = await options.database.user.findByPk(id, {
      transaction,
    });

    let tenantUser = await this.findByTenantAndUser(
      tenantId,
      id,
      options,
    );

    await tenantUser.destroy({ transaction });

  }

  static async updateRoles(tenantId, id, roles, options) {
    const transaction = SequelizeRepository.getTransaction(
      options,
    );

    let user = await options.database.user.findByPk(id, {
      transaction,
    });

    let tenantUser = await this.findByTenantAndUser(
      tenantId,
      id,
      options,
    );

    let isCreation = false;

    if (!tenantUser) {
      isCreation = true;
      tenantUser = await options.database.tenantUser.create(
        {
          tenantId,
          userId: id,
          status: selectStatus('invited', []),
          invitationToken: crypto
            .randomBytes(20)
            .toString('hex'),
          roles: [],
        },
        { transaction },
      );
    }

    let { roles: existingRoles } = tenantUser;

    let newRoles = [] as Array<string>;

    if (options.addRoles) {
      newRoles = [...new Set([...existingRoles, ...roles])];
    } else if (options.removeOnlyInformedRoles) {
      newRoles = existingRoles.filter(
        (existingRole) => !roles.includes(existingRole),
      );
    } else {
      newRoles = roles || [];
    }

    tenantUser.roles = newRoles;
    tenantUser.status = selectStatus(
      tenantUser.status,
      newRoles,
    );

    await tenantUser.save({
      transaction,
    });

    return tenantUser;
  }

  static async acceptInvitation(
    invitationToken,
    options: IRepositoryOptions,
  ) {
    const transaction = SequelizeRepository.getTransaction(
      options,
    );

    const currentUser = SequelizeRepository.getCurrentUser(
      options,
    );

    let invitationTenantUser = await this.findByInvitationToken(
      invitationToken,
      options,
    );

    const isSameEmailFromInvitation =
      invitationTenantUser.userId === currentUser.id;

    let existingTenantUser = await this.findByTenantAndUser(
      invitationTenantUser.tenantId,
      currentUser.id,
      options,
    );

    // There might be a case that the invite was sent to another email,
    // and the current user is also invited or is already a member
    if (
      existingTenantUser &&
      existingTenantUser.id !== invitationTenantUser.id
    ) {
      // destroys the new invite
      await this.destroy(
        invitationTenantUser.tenantId,
        invitationTenantUser.userId,
        options,
      );

      // Merges the roles from the invitation and the current tenant user
      existingTenantUser.roles = [
        ...new Set([
          ...existingTenantUser.roles,
          ...invitationTenantUser.roles,
        ]),
      ];

      // Change the status to active (in case the existing one is also invited)
      existingTenantUser.invitationToken = null;
      existingTenantUser.status = selectStatus(
        'active',
        existingTenantUser.roles,
      );

      await existingTenantUser.save({
        transaction,
      });
    } else {
      // In this case there's no tenant user for the current user and the tenant

      // Sometimes the invitation is sent not to the
      // correct email. In those cases the userId must be changed
      // to match the correct user.
      invitationTenantUser.userId = currentUser.id;
      invitationTenantUser.invitationToken = null;
      invitationTenantUser.status = selectStatus(
        'active',
        invitationTenantUser.roles,
      );

      await invitationTenantUser.save({
        transaction,
      });
    }

    const emailVerified =
      currentUser.emailVerified ||
      isSameEmailFromInvitation;

    await options.database.user.update(
      {
        emailVerified,
      },
      { where: { id: currentUser.id }, transaction },
    );

    const auditLogRoles = existingTenantUser
      ? existingTenantUser.roles
      : invitationTenantUser.roles;
  }
}

function selectStatus(oldStatus, newRoles) {
  newRoles = newRoles || [];

  if (oldStatus === 'invited') {
    return oldStatus;
  }

  if (!newRoles.length) {
    return 'empty-permissions';
  }

  return 'active';
}
