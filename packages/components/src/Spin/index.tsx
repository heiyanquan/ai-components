import { Spin } from 'antd';
import { memo } from 'react';

const HsAdminSpin = (props: any) => {
  const style = {
    position: 'fixed',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: '9999',
  };
  return <Spin style={style} size="large" {...props} />;
};

export default memo(HsAdminSpin);
