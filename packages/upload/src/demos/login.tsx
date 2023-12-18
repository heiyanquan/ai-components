import { HsAdminSpin } from '@react-admin/pro-components';
import { login } from '@hs-admin/api';
import { useEffect, useState } from 'react';

export default () => {
  const [loading, setloading] = useState(true);
  // 为了正常显示必须调用的登录逻辑，不必关注
  useEffect(() => {
    login().then(() => {
      setloading(false);
    });
  }, []);

  return <>{loading && <HsAdminSpin />}</>;
};
