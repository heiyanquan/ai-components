import { FC, SetStateAction, useEffect, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { Select } from 'antd';
import { langs } from './typing';
import { color } from '@uiw/codemirror-extensions-color';
import type { LanguageName } from './typing';

interface Props {
  allModuleTxt: any;
}
const HsAdminCodemirror: FC<Props> = (props: Props) => {
  const { allModuleTxt } = props;
  const [code, setCode] = useState('');
  const [mode, setMode] = useState<string>('');
  const options = [
    { label: 'javascript', value: 'javascript' },
    { label: 'sql', value: 'sql' },
    { label: 'json', value: 'json' },
    { label: 'markdown', value: 'markdown' },
    { label: 'python', value: 'python' },
  ];
  const [extensions, setExtensions] = useState<any[]>();

  function handleLangChange(lang: keyof typeof langs) {
    for (const path in allModuleTxt) {
      if (path.includes(lang)) {
        setCode(allModuleTxt[path]);
        if (langs[lang]) {
          setExtensions([color, langs[lang]()]);
        }
        setMode(lang);
      }
    }
  }
  const onChange = (val: SetStateAction<string>, viewUpdate: any) => {
    console.log('CodeMirror: onChange', val, viewUpdate);
  };

  return (
    <>
      <Select value={mode} options={options} onChange={handleLangChange}></Select>
      <CodeMirror value={code} height="600px" extensions={extensions} onChange={onChange} />
    </>
  );
};

export type { LanguageName };
export { HsAdminCodemirror };
export default HsAdminCodemirror;
