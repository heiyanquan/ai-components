# HsAdminSelect

下拉选择

```jsx
import { HsAdminSelect } from '@hs-react-admin/base-components';

export default () => 
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
```
