import { message } from 'antd';
import {
  getItem,
  getUrlSearchParams,
  MENUOPTIONS,
  PERMISSIONROUTERLIST,
  PERMISSIONS,
  setItem,
  TOKEN,
  USERRESULT,
} from '@hs-react-admin/pro-utils';

// 处理当前账号权限
function hsHandleUserAuth(res: any) {
  const permissions = res.permissions.map((item: any) => item.name);
  setItem(PERMISSIONS, permissions);
  Reflect.deleteProperty(res, 'permissions');
  setItem(USERRESULT, res);
}
// 生成可看路由
const generateEnableRouter = (originMenuOptions: any[]): void => {
  const permissions = getItem(PERMISSIONS);
  const permissionRouterList = new Set();
  if (permissions?.length) {
    let menuOptions = [...originMenuOptions];
    const deepMenu = (list: any[], parent?: any) => {
      list.forEach((item: any) => {
        if (permissions.includes(item.permission)) {
          item.show = 1;
        }
        deepMenu(item.children ?? [], item);
      });
      if (parent && !parent.permission && !parent.show) {
        parent.show = list.some((item) => item.show);
        parent.show &= 1;
      }
    };
    deepMenu(menuOptions);

    const deepFilter = (list: any[]) => {
      list.forEach((item: any) => {
        item.children = item.children?.filter((ele: any) => ele.show);
        if (item.routerlist) {
          item.routerlist.forEach((second: any) => permissionRouterList.add(second.key));
        } else if (item.key.includes('/')) {
          permissionRouterList.add(item.key);
        }
        deepFilter(item.children ?? []);
      });
    };
    menuOptions = menuOptions.filter((ele) => ele.show);
    deepFilter(menuOptions);
    permissionRouterList.add('/demo');
    setItem(PERMISSIONROUTERLIST, [...permissionRouterList]);
    setItem(MENUOPTIONS, menuOptions);
  }
};

// 处理登录回调的code
export function hsHandleLoginCode(
  url: string,
  originMenuOptions: any[],
  codeGetToken: { (data: object): Promise<any>; (arg0: { code: string | null }): Promise<any> },
  getUserInfo: { (params?: object | undefined): Promise<any>; (): Promise<any> },
  redirect,
) {
  if (url.includes('code=')) {
    return codeGetToken({
      code: getUrlSearchParams('code'),
    })
      .then((res) => {
        setItem(TOKEN, res.access_token);
        return getUserInfo()
          .then((res) => {
            hsHandleUserAuth(res);
            generateEnableRouter(originMenuOptions);
            message.success('登录成功');
            if (url.includes('returnto')) {
              return redirect(getUrlSearchParams('returnto') || '/');
            } else {
              return redirect('/');
            }
          })
          .catch((error) => {
            return Promise.reject(error);
          });
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  } else {
    return null;
  }
}
