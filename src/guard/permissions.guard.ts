import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { UserGroupPermissionService } from 'src/modules/user-group-permission/user-group-permission.service';
import { transformPermissions } from 'src/utils/utils';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private userGroupPermissionService: UserGroupPermissionService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Lấy quyền yêu cầu từ metadata
    const requiredPermission = this.reflector.get<string>(
      'permission',
      context.getHandler(),
    );

    // Nếu không có quyền yêu cầu, cho phép truy cập
    if (!requiredPermission) {
      return true;
    }

    // Lấy thông tin người dùng từ request
    const { headers } = context.switchToHttp().getRequest();

    const authHeader = headers.authorization;

    if (!authHeader) {
      throw new ForbiddenException(
        'You do not have permission to access this resource',
      );
    }

    const token = authHeader.split(' ')[1];
    const { userGroupId } = this.jwtService.verify(token);

    const userGroupPermissions =
      await this.userGroupPermissionService.getPermissionsByUserGroup(
        userGroupId,
      );
    const permissions = transformPermissions(userGroupPermissions);

    // Kiểm tra xem quyền của người dùng có bao gồm quyền yêu cầu không
    return permissions.includes(requiredPermission);
  }
}
