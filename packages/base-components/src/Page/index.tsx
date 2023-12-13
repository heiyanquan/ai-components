import { Pagination } from 'antd';
import React, { memo } from 'react';

const HsAdminPage = (props: any) => {
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

export default memo(HsAdminPage);
