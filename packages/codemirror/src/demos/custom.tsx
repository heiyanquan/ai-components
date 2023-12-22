import { HsAdminBaseCodemirror } from '@react-admin/pro-components';
import { useState } from 'react';
import { Select } from 'antd';

export default () => {
  const [mode, setMode] = useState<string | undefined>(undefined);
  const options = [
    { label: 'javascript', value: 'javascript' },
    { label: 'sql', value: 'sql' },
    { label: 'json', value: 'json' },
    { label: 'markdown', value: 'markdown' },
    { label: 'python', value: 'python' },
  ];
  const [code, setCode] = useState('');

  const handleLangChange = (lang: string) => {
    import(`code-example/txt/sample.${lang}.txt`).then((data) => {
      setMode(lang);
      fetch(data.default)
        .then((res) => res.text())
        .then((res) => {
          setCode(res);
        });
    });
  };
  const codemirrorChange = (val: any, viewUpdate: any) => {
    console.log('CodeMirror: onChange', val, viewUpdate);
  };

  return (
    <>
      <Select
        value={mode}
        options={options}
        onChange={handleLangChange}
        style={{ width: 240 }}
        placeholder="请选择语言"
      ></Select>
      <br />
      <br />
      <HsAdminBaseCodemirror value={code} lang={mode} height="300px" onChange={codemirrorChange} />
    </>
  );
};
