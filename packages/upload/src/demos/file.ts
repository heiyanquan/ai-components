import { businessAxios } from './request';

export function previewPdfUrl(blob: Blob) {
  const blobData = new Blob([blob], { type: 'application/pdf' });
  const link = window.URL.createObjectURL(blobData);
  return link;
}
export function previewImgUrl(blob: Blob) {
  const blobData = new Blob([blob], { type: 'image/png' });
  const link = window.URL.createObjectURL(blobData);
  return link;
}
export function downloadBlobFile(blob: Blob, fileName: string) {
  const downloadElement = document.createElement('a');
  const href = window.URL.createObjectURL(blob); //创建下载的链接
  downloadElement.href = href;
  downloadElement.download = fileName;
  document.body.appendChild(downloadElement);
  downloadElement.click(); //点击下载
  document.body.removeChild(downloadElement); //下载完成移除元素
  window.URL.revokeObjectURL(href); //释放掉blob对象
}

export const uploadFile = (data: any) => {
  return businessAxios({
    url: '/api/datamarket/file/upload',
    method: 'post',
    data,
  });
};
export const downloadFile = (params: any) => {
  return businessAxios({
    url: '/api/datamarket/file/download',
    method: 'get',
    params,
    responseType: 'blob',
  }).then((res: any) => {
    downloadBlobFile(res, res.name);
  });
};
export const previewImg = (params: any) => {
  return businessAxios({
    url: '/api/datamarket/file/download',
    method: 'get',
    params,
    responseType: 'blob',
  }).then((res: any) => {
    return previewImgUrl(res);
  });
};

export const downloadFileBlob = (params: any) => {
  return businessAxios({
    url: '/api/datamarket/file/download',
    method: 'get',
    params,
    responseType: 'blob',
  });
};

//根据文件id获取文件信息
export const getFileInfoByIds = (data: any) => {
  return businessAxios({
    url: '/api/datamarket/file/getFileInfoByIds',
    method: 'post',
    data,
  });
};
