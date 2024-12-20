import { Permission } from 'src/types/permission';

export const transformPermissions = (data: Permission[]): string[] => {
  return data.flatMap((item) => {
    const permissionName = item.permission.name
      .toLowerCase()
      .replace(/\s+/g, '_'); // Chuyển tên permission thành chữ thường, thay dấu cách bằng "_"
    const actions = [];

    // Kiểm tra và tạo ra chuỗi cho mỗi hành động nếu giá trị là true
    if (item.getList) actions.push(`${permissionName}_getList`);
    if (item.getDetail) actions.push(`${permissionName}_getDetail`);
    if (item.create) actions.push(`${permissionName}_create`);
    if (item.update) actions.push(`${permissionName}_update`);
    if (item.remove) actions.push(`${permissionName}_remove`);

    return actions;
  });
};
