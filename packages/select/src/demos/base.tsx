import { HsAdminSelect } from '@react-admin/pro-components';

export default () => (
  <HsAdminSelect
    defaultValue="lucy"
    style={{ width: 120 }}
    options={[
      { value: 'jack', label: 'Jack' },
      { value: 'lucy', label: 'Lucy' },
      { value: 'Yiminghe', label: 'yiminghe' },
      { value: 'disabled', label: 'Disabled', disabled: true },
    ]}
  />
);
