import { Pagination } from 'antd';
import { FC } from 'react';

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

export default HsAdminPage;
