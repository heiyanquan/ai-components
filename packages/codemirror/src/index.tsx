import { FC, useEffect, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import type { LanguageName } from './typing';
import { langs } from './typing';
import { color } from '@uiw/codemirror-extensions-color';

interface Props {
  lang: string;
}
const HsAdminCodemirror: FC<Props> = (props: Props) => {
  const { lang } = props;
  const [extensions, setExtensions] = useState<any[]>();

  useEffect(() => {
    if (langs[lang]) {
      setExtensions([color, langs[lang]()]);
    }
  }, [lang]);

  return <CodeMirror extensions={extensions} {...props} />;
};

export type { LanguageName };
export { HsAdminCodemirror };
export default HsAdminCodemirror;
