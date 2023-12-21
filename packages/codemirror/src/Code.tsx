import HsAdminBaseCodemirror from './Base';
import { FC, useState } from 'react';
import { Select } from 'antd';

interface Props {
  selectProps?: any;
  onLangChange?: (lang: string) => void;
  value: string;
  setValue: (value: string) => void;
}
const HsAdminCodemirror: FC<Props> = (props: Props) => {
  const { selectProps, onLangChange, value, setValue, ...rest } = props;
  const [mode, setMode] = useState<string | undefined>(undefined);
  const options = [
    { label: 'javascript', value: 'javascript' },
    { label: 'sql', value: 'sql' },
    { label: 'json', value: 'json' },
    { label: 'markdown', value: 'markdown' },
    { label: 'python', value: 'python' },
  ];

  const handleLangChange = (lang: string) => {
    import(`code-example/txt/sample.${lang}.txt`).then((data) => {
      setMode(lang);
      fetch(data.default)
        .then((res) => res.text())
        .then((res) => {
          setValue(res);
          onLangChange?.(lang);
        });
    });
  };

  return (
    <>
      <Select
        value={mode}
        options={options}
        onChange={handleLangChange}
        style={{ width: 240 }}
        placeholder="请选择语言"
        {...selectProps}
      ></Select>
      <br />
      <br />
      <HsAdminBaseCodemirror value={value} height="300px" {...rest} />
    </>
  );
};

export default HsAdminCodemirror;
