import { HsAdminCodemirror } from '@react-admin/pro-components';
import { useEffect, useState } from 'react';

export default () => {
  const [allModuleTxt, setallModuleTxt] = useState<any>({});

  useEffect(() => {
    import('/node_modules/code-example/txt/sample.css.txt').then((res) => {
      console.log('[ res ] >', res);
    });
    setallModuleTxt(modules);
  }, []);
  return <HsAdminCodemirror allModuleTxt={allModuleTxt} defaultValue="Hello dumi!" />;
};
