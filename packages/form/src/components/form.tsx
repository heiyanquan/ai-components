import { FC, ReactNode } from 'react';
import {
  Form,
  InputNumber,
  Row,
  Col,
  AutoComplete,
  Cascader,
  Checkbox,
  DatePicker,
  Radio,
  Switch,
  TimePicker,
  Transfer,
  TreeSelect,
} from 'antd';

import HsAdminInput from './input';
import HsAdminSelect from './select';

export interface Options {
  label?: string;
  // 绑定字段名称
  name: string;
  // 是否必填
  required?: boolean;
  // 组件名称
  component: string;
  // 自定义插槽
  slot?: string;
  // 自定义前缀插槽
  prefix?: () => ReactNode;
  // 自定义后缀插槽
  suffix?: () => ReactNode;
  // 自定义插槽父级class名称
  fixClassName?: string;
  // 自定义验证规则，同antd文档
  rules?: object[];
  // 表单相关配置参数，同antd文档
  componentProps?: any;
  // FormItem Col配置参数，同antd文档
  FormItemColProps?: any;
  // FormItem配置参数，同antd文档
  FormItemProps?: any;
}
export interface Props {
  // 除了formItemOptions、rowProps、children以外剩余参数均为Form Props配置参数，同antd文档
  rest?: any;
  // Row Props配置参数，同antd文档
  rowProps?: any;
  // 每个FormItem里面的表单相关配置参数
  formItemOptions: Options[];
  // 插槽子节点
  children?: any[];
}

const HsAdminForm: FC<Props> = (props: Props) => {
  const { formItemOptions, rowProps, children, ...rest } = props;
  const slotsMap = Object.create(null);
  if (children) {
    const customChildren = Array.isArray(children) ? children : [children];
    customChildren?.forEach((item) => {
      const { slot, children: slotChildren } = item.props;
      slotsMap[slot] = slotChildren;
    });
  }
  const selectComponentsList = [
    'Select',
    'DatePicker',
    'TreeSelect',
    'HsAdminSelect',
    'Cascader',
    'Checkbox',
    'Radio',
    'TimePicker',
    'Transfer',
  ];

  const handleRules = (item: Options) => {
    let prefix: string = '请输入';
    if (item.component && selectComponentsList.includes(item.component)) {
      prefix = '请选择';
    }
    if (item.rules) {
      return item.rules;
    } else if (item.required) {
      return [{ required: true, message: `${prefix}${item.label}` }];
    }
    return undefined;
  };
  const componentMap: any = {
    Input: {
      Component: HsAdminInput,
    },
    TextArea: {
      Component: HsAdminInput,
      defaultProps: { TextArea: true },
    },
    Search: {
      Component: HsAdminInput,
      defaultProps: { Search: true },
    },
    Password: {
      Component: HsAdminInput,
      defaultProps: { Password: true },
    },
    Select: {
      Component: HsAdminSelect,
    },
    InputNumber: {
      Component: InputNumber,
    },
    AutoComplete: {
      Component: AutoComplete,
    },
    Cascader: {
      Component: Cascader,
    },
    Checkbox: {
      Component: Checkbox,
    },
    DatePicker: {
      Component: DatePicker,
    },
    Radio: {
      Component: Radio,
    },
    Switch: {
      Component: Switch,
    },
    TimePicker: {
      Component: TimePicker,
    },
    Transfer: {
      Component: Transfer,
    },
    TreeSelect: {
      Component: TreeSelect,
    },
  };
  const LoadItemComponent = (item: Options) => {
    if (item.slot) {
      return slotsMap[item.slot];
    } else {
      const { Component, defaultProps } = componentMap[item.component];
      let placeholder: string = `请输入${item.label}`;
      if (item.component && selectComponentsList.includes(item.component)) {
        placeholder = `请选择${item.label}`;
      }
      if (item.componentProps?.placeholder) {
        placeholder = item.componentProps.placeholder;
      }
      return <Component {...defaultProps} placeholder={placeholder} {...item.componentProps} />;
    }
  };

  return (
    <Form labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} autoComplete="off" {...rest}>
      <Row {...rowProps}>
        {formItemOptions.map((item) => (
          <Col span={24} {...item.FormItemColProps} key={item.name || item.slot}>
            <Form.Item
              label={item.label}
              name={item.name || item.slot}
              rules={handleRules(item)}
              {...item.FormItemProps}
            >
              {(item.prefix || item.suffix) && (
                <div className={item.fixClassName || 'flex items-center'}>
                  {item.prefix && item.prefix()}
                  <Form.Item
                    name={item.name || item.slot}
                    rules={handleRules(item)}
                    {...item.FormItemProps}
                  >
                    {LoadItemComponent(item)}
                  </Form.Item>
                  {item.suffix && item.suffix()}
                </div>
              )}
              {!item.prefix && !item.suffix && LoadItemComponent(item)}
            </Form.Item>
          </Col>
        ))}
      </Row>
    </Form>
  );
};

export default HsAdminForm;
