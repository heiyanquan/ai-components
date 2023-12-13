import React, { FC, memo } from 'react';
import HsAdminPage from '../Page';
import HsAdminTable from '../Table';

const HsAdminTablePage: FC<any> = (props: any) => {
  const { pagination, ...rest } = props;
  const style = {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 16,
  };

  return (
    <>
      <HsAdminTable {...rest} pagination={false}></HsAdminTable>
      {pagination && (
        <div style={style}>
          <HsAdminPage {...pagination} />
        </div>
      )}
    </>
  );
};

export default memo(HsAdminTablePage);
