import { HsAdminCodemirror } from '@react-admin/pro-components';
import { SetStateAction, useState } from 'react';

export default () => {
  const [code, setCode] = useState('');

  const codemirrorChange = (val: SetStateAction<string>, viewUpdate: any) => {
    console.log('CodeMirror: onChange', val, viewUpdate);
    setCode(val);
  };

  return (
    <HsAdminCodemirror value={code} setValue={setCode} height="300px" onChange={codemirrorChange} />
  );
};
