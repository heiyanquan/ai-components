import { TOKEN, setItem } from '@hs-react-admin/pro-utils';
import { businessAxios } from './request';

/**
 * @description: 登录接口
 * @param {T} data
 * @return {*}
 */
export const login = (): Promise<any> => {
  const formData: any = new FormData();
  formData.append('username', '13968114180');
  formData.append('password', 'b7e283a09511d95d6eac86e39e7942c0');
  formData.append('grant_type', 'password');
  formData.append('scope', 'user.profile');
  return businessAxios({
    url: '/api/users/v1/auth/token',
    method: 'post',
    data: formData,
  }).then((res) => {
    setItem(TOKEN, res.access_token);
  });
};
// 当前用户详情
export const getCurrentUserInfo = (params: any) => {
  return businessAxios({
    url: '/api/users/v1/users/me',
    method: 'get',
    params,
  });
};
