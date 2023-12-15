import { Pagination } from 'antd';
import { FC } from 'react';
import type { PageColSpanType } from './typing';

const HsAdminPage: FC<any> = (props: any) => {
  let pagination = props;
  if (props.pageType === 'new') {
    pagination = {
      ...props.pagination,
      total: props.total,
      onChange: props.onChange,
    };
  }
  return <Pagination {...pagination} />;
};

export type { PageColSpanType };
export { HsAdminPage };
export default HsAdminPage;
