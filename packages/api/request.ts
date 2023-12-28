import { getItem, setItem, TOKEN } from '@react-admin/pro-utils'
import { message } from 'antd'
import { newAxiosRequest } from './axiosRequest'
import { login } from './login'

const commonConfig = {
  loginUrl: '/api/users/v1/auth/token',
  refreshTokenUrl: {
    login,
    axiosConfig: {
      url: `https://analysis.aihuoshi.net/api/users/v1/auth/token`,
      method: 'post'
    },
    setToken: (res: { access_token: string; token_type: string }) => setItem(TOKEN, res.access_token)
  },
  getToken: () => getItem(TOKEN),
  handleMessage: message,
  loadingFunction: null
}

const { mainAxios: businessAxios } = newAxiosRequest({
  ...commonConfig,
  baseUrl: `https://analysis.aihuoshi.net`
})
const { mainAxios: datashopAxios } = newAxiosRequest({
  ...commonConfig,
  baseUrl: `https://datashop.aihuoshi.net`
})

export { businessAxios, datashopAxios }
