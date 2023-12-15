import { Select } from 'antd';
import { memo } from 'react';

const HsAdminSelect = (props: any) => {
  const filterOption: any = (
    input: string,
    option: { label: string; value: string },
  ) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  return (
    <Select
      allowClear
      showSearch
      filterOption={filterOption}
      placeholder="请选择"
      {...props}
    ></Select>
  );
};

export default memo(HsAdminSelect);
