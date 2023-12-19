import { FC } from 'react';
import { HsAdminScrollSelect } from '@react-admin/pro-components';
import { getAllUserList } from '@hs-admin/api';

const BaseDemo: FC = (props: any) => {
  return (
    <HsAdminScrollSelect
      request={getAllUserList}
      {...props}
      style={{ width: 240 }}
    ></HsAdminScrollSelect>
  );
};

export default BaseDemo;
