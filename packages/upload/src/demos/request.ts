import { getItem, setItem, TOKEN } from '@hs-react-admin/pro-utils';
import { message } from 'antd';
import { newAxiosRequest } from './axiosRequest';

const commonConfig = {
  loginUrl: '/api/datashop/v3/auth/oauth/hs/login',
  refreshTokenUrl: {
    axiosConfig: {
      url: `https://analysis.aihuoshi.net/api/datashop/v3/auth/refresh-token`,
      method: 'post',
    },
    setToken: (res: { access_token: string; token_type: string }) =>
      setItem(TOKEN, res.access_token),
  },
  getToken: () => getItem(TOKEN),
  handleMessage: message,
  loadingFunction: null,
};

const { mainAxios: businessAxios } = newAxiosRequest({
  ...commonConfig,
  baseUrl: `https://analysis.aihuoshi.net`,
});

export { businessAxios };
