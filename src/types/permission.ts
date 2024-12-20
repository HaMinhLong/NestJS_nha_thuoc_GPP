export interface Permission {
  permission: {
    name: string;
  };
  getList: boolean;
  getDetail: boolean;
  create: boolean;
  update: boolean;
  remove: boolean;
}
