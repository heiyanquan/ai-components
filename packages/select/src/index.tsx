import { Select } from 'antd';
import { FC } from 'react';

const HsAdminSelect: FC<any> = (props: any) => {
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

export { HsAdminSelect };
export default HsAdminSelect;
