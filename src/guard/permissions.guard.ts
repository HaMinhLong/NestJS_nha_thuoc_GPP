import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
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
    const { user, headers } = context.switchToHttp().getRequest();

    const authHeader = headers.authorization;

    if (!authHeader) {
      return false;
    }

    const token = authHeader.split(' ')[1];
    const { userGroupId } = this.jwtService.verify(token);

    const userGroupPermissions =
      await this.userGroupPermissionService.getPermissionsByUserGroup(
        userGroupId,
      );
    const permissions = transformPermissions(userGroupPermissions);

    if (!user) {
      return false; // Nếu không có thông tin người dùng hoặc không có quyền, từ chối truy cập
    }

    // Kiểm tra xem quyền của người dùng có bao gồm quyền yêu cầu không
    return permissions.includes(requiredPermission);
  }
}
