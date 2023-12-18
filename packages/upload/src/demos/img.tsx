import { HsAdminUpload } from '@react-admin/pro-components';
import { action } from './hooks';
import { downloadFile, getFileInfoByIds, previewImg } from '@hs-admin/api';

export default () => {
  return (
    <HsAdminUpload
      action={action}
      ids={'1616,1617'}
      multiple
      accept=".jpg,.jpeg,.png"
      listType="picture"
      updateFile={(ids: any) => {
        console.log('[ ids ] >', ids);
      }}
      downloadFile={downloadFile}
      getFileInfoByIds={getFileInfoByIds}
      previewImg={previewImg}
    />
  );
};
