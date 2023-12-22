import { HsAdminCodemirror } from '@react-admin/pro-components';
import { SetStateAction, useState } from 'react';

export default () => {
  const [code, setCode] = useState('');

  const langChange = (lang: string) => {
    // vite环境请自行处理默认值赋值逻辑
    console.log('[ lang ] >', lang);
  };
  const codemirrorChange = (val: SetStateAction<string>, viewUpdate: any) => {
    console.log('CodeMirror: onChange', val, viewUpdate);
    setCode(val);
  };

  return (
    <HsAdminCodemirror
      value={code}
      setValue={setCode}
      height="300px"
      onLangChange={langChange}
      onChange={codemirrorChange}
    />
  );
};
