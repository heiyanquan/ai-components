import { HsAdminUpload } from '@hs-react-admin/pro-components';
import { action } from './hooks';
import { downloadFile, getFileInfoByIds, previewImg } from './file';

export default () => {
  return (
    <HsAdminUpload
      action={action}
      ids={'458,462'}
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
