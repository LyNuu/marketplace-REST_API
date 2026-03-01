import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../../user/shemas/user.shema';

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);