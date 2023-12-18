import { HsAdminUpload } from '@react-admin/pro-components';
import { action } from './hooks';
import { login } from '@hs-admin/api';
import { useEffect } from 'react';
import { downloadFile, getFileInfoByIds, previewImg } from '@hs-admin/api';

export default () => {
  // 登录逻辑，不必关注
  useEffect(() => {
    login();
  }, []);

  return (
    <HsAdminUpload
      action={action}
      ids={'458'}
      multiple
      updateFile={(ids: any) => {
        console.log('[ ids ] >', ids);
      }}
      downloadFile={downloadFile}
      getFileInfoByIds={getFileInfoByIds}
      previewImg={previewImg}
    />
  );
};
