import { businessAxios, datashopAxios } from './request';

// 获取用户列表
export const getAllUserList = (params: any = {}): Promise<any> => {
  return datashopAxios({
    url: '/api/datashop/v3/users',
    method: 'get',
    params: {
      page: 1,
      page_size: 10,
      ...params,
    },
  }).then((res: any) =>
    res.items.map((item: any) => ({
      label: item.name,
      value: item.id,
    })),
  );
};

// 数据主题
export const getAllThemeList = (data: any = {}): Promise<any> => {
  return businessAxios({
    url: '/api/datamarket/basicData/getList',
    method: 'post',
    data: {
      page: 1,
      page_size: 10,
      ...data,
    },
  }).then((res: any) =>
    res.data.list.map((item: any) => ({
      label: item.name,
      value: item.id,
    })),
  );
};

// 数据项列表
export const getDataItemTableList = (params: any): Promise<any> => {
  return datashopAxios({
    url: '/api/datashop/v3/data-item-products',
    method: 'get',
    params: {
      page: 1,
      page_size: 10,
      ...params,
    },
  }).then((res: any) =>
    res.items.map((item: any) => ({
      label: item.ref_table_name,
      value: item.id,
      data_item_name: item.name,
    })),
  );
};

// 数据项列表
export const getDomainList = (data: any): Promise<any> => {
  return businessAxios({
    url: '/api/datamarket/industryDataWarehouse/getDomainList',
    method: 'post',
    data: {
      page: 1,
      page_size: 10,
      ...data,
    },
  }).then((res: any) =>
    res.data.list.map((item: any) => ({
      label: item.name,
      value: item.id,
    })),
  );
};
