import { FC } from 'react';
import type { TablePageColSpanType } from './typing';
import HsAdminTable from '@hs-react-admin/pro-table';
import HsAdminPage from '@hs-react-admin/pro-page';

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

export type { TablePageColSpanType };
export { HsAdminTablePage };
export default HsAdminTablePage;
