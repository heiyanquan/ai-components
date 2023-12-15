import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Button, message, Modal, Upload } from 'antd';
import type { UploadFile, UploadProps } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { getItem } from '@hs-react-admin/pro-utils';
import type { UploadColSpanType } from './typing';

type IdsType = number[] | string | number;
interface Props extends UploadProps {
  // 是否支持多选文件
  multiple?: boolean;
  // 文件id数组
  ids?: IdsType;
  // 更新外部传入的文件
  updateFile?: (ids: IdsType) => void;
  children?: any;
  // 接受上传的文件类型
  accept?: string;
  // 标题，默认值：上传文件
  title?: string;
  // 隐藏默认预览，自定义预览
  hidePreview?: boolean;
  downloadFile: (params: any) => void;
  getFileInfoByIds: (params: any) => Promise<any>;
  previewImg?: (params: any) => Promise<string>;
  // 上传地址
  action: string;
}
const HsAdminUpload: FC<Props> = (props: Props) => {
  const {
    multiple = false,
    ids,
    accept = '.rar,.zip,.doc,.docx,.xlsx,.xls,.pdf',
    title = '上传文件',
    updateFile,
    children,
    hidePreview = false,
    downloadFile,
    getFileInfoByIds,
    previewImg,
    action = '',
    ...rest
  } = props;
  const [fileList, setFileList] = useState<any[]>([]);
  const [fileShowList, setFileShowList] = useState<any[]>([]);
  const slotsMap = useMemo(() => {
    const childrenMap = Object.create(null);
    if (children) {
      const customChildren = Array.isArray(children) ? children : [children];
      customChildren?.forEach((item) => {
        const { slot, children: slotChildren } = item.props;
        childrenMap[slot] = slotChildren;
      });
    }
    return childrenMap;
  }, [children]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');

  // 上传文件改变时的回调
  const handleChange: UploadProps['onChange'] = useCallback(
    (info: { file: any; fileList: any[] }) => {
      if (multiple) {
        setFileList([...info.fileList]);
      } else {
        setFileList([info.file]);
      }
      const done = info.fileList.every((item) => item.status === 'done');
      if (done) {
        info.fileList.forEach((item: any) => {
          if (!item.id) {
            item.id = item.response.id;
            item.name = item.response.name;
          }
        });
        let emitIds: IdsType = info.fileList.map((item: any) => item.id);
        if (Array.isArray(ids) && !multiple) {
          emitIds = [info.file.id];
        } else if (typeof ids === 'string') {
          emitIds = emitIds.join(',');
        } else if (typeof ids === 'number') {
          emitIds = emitIds[0];
        }
        updateFile?.(emitIds);
      }
    },
    [ids, multiple, updateFile],
  );
  // 是否是图片
  const isImg = (file: { name: string | string[] }) => {
    return file.name.includes('.jpg') || file.name.includes('.jpeg') || file.name.includes('.png');
  };
  // 预览
  const handlePreview = useCallback(async (file: UploadFile & { id: string; url: string }) => {
    if (isImg(file)) {
      setPreviewImage(file.url);
      setPreviewOpen(true);
      setPreviewTitle(file.name);
    } else {
      downloadFile({
        file_id: file.id,
      });
    }
  }, []);

  // 上传组件属性
  const uploadProps: any = useMemo(
    () => ({
      action,
      headers: {
        Authorization: `Bearer ${getItem('token')}`,
        'X-Requested-With': null,
      },
      fileList: hidePreview ? [] : fileShowList,
      multiple,
      accept,
      showUploadList: {
        showPreviewIcon: true,
        showDownloadIcon: true,
        showRemoveIcon: true,
      },
      onChange: handleChange,
      onPreview: handlePreview,
      onDownload: handlePreview,
    }),
    [accept, fileShowList, handleChange, handlePreview, hidePreview, multiple],
  );

  // 获取图片url
  const getImgUrl = async (file: UploadFile & { id: string }) => {
    if (!previewImg) {
      message.warning('请先传入预览图片函数previewImg');
      return;
    }
    return previewImg({
      file_id: file.id,
    });
  };
  const handleCancel = () => setPreviewOpen(false);

  useEffect(() => {
    let localIds: number[] = [];
    if (Array.isArray(ids)) {
      localIds = ids;
    } else if (typeof ids === 'string') {
      localIds = ids
        .split(',')
        .filter((item) => item)
        .map((item) => +item);
    } else if (typeof ids === 'number') {
      localIds = [ids];
    }
    if (!multiple && localIds.length > 1) {
      message.warning('不支持多个文件，如要支持多个文件请设置multiple');
      return;
    }
    getFileInfoByIds({ ids: localIds }).then((res: any) => {
      setFileList(
        res.map((item: any) => ({
          ...item,
          percent: 100,
          status: 'done',
        })),
      );
    });
  }, [getFileInfoByIds, ids, multiple, setFileList]);
  useEffect(() => {
    const hasImg = fileList.some((item) => isImg(item));
    if (hasImg) {
      fileList.forEach(async (item) => {
        if (isImg(item)) {
          try {
            // 获取图片url
            item.url = await getImgUrl(item);
            setFileShowList(fileList);
          } catch (error) {
            return Promise.reject(error);
          }
        }
      });
    } else {
      setFileShowList(fileList);
    }
  }, [fileList]);

  return (
    <>
      <Upload.Dragger {...uploadProps} {...rest}>
        {slotsMap.upload}
        {!slotsMap.upload && <Button icon={<UploadOutlined />}>{title}</Button>}
        {slotsMap.accept}
        {!slotsMap.accept && <p>支持扩展名：{accept}</p>}
      </Upload.Dragger>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img alt="preview" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
};

export type { UploadColSpanType };
export { HsAdminUpload };
export default HsAdminUpload;
