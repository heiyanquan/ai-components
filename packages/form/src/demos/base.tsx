import { Form, Button, Space } from 'antd';
import { FC, useEffect, useMemo } from 'react';
import { HsAdminForm } from '@react-admin/pro-components';
import { DraftFunction, useImmer } from 'use-immer';
import { getAllUserList } from '@hs-admin/api';

const FormPage: FC = () => {
  const [form] = Form.useForm();
  const [formValues, setformValues] = useImmer<any>({});
  const [userList, setUserList] = useImmer<any[]>([]);
  // Row Props配置参数，同antd文档
  const rowProps = useMemo(
    () => ({
      gutter: [0, 16],
    }),
    [],
  );
  // 每个FormItem里面的表单相关配置参数
  const formItemOptions = useMemo(
    () => [
      {
        // 标题
        label: '用户名',
        // 绑定字段名称
        name: 'plan_lead_id',
        // 组件名称
        component: 'Select',
        // 是否必填
        required: true,
        // 表单组件相关配置参数，同antd文档
        componentProps: {
          options: userList,
          onChange: handleSearch,
        },
        // FormItem Col配置参数，同antd文档
        FormItemColProps: {
          span: 12,
        },
        // FormItem配置参数，同antd文档
        FormItemProps: {
          labelCol: { span: 6 },
          wrapperCol: { span: 18 },
        },
        // 自定义后缀插槽
        suffix: () => <div className="flex-none ml-2">后缀</div>,
      },
      {
        label: '表名',
        name: 'en_table_name',
        component: 'Input',
        required: true,
        FormItemColProps: {
          span: 12,
        },
        // 自定义后缀插槽
        suffix: () => <div className="mt-2">后缀</div>,
        // 自定义插槽父级class名称
        fixClassName: 'flex flex-col',
      },
      {
        label: '表类型',
        name: 'table_type',
        component: 'Select',
        required: true,
        componentProps: {
          options: [
            {
              label: '主表',
              value: 'main',
            },
            {
              label: '从表-属性表',
              value: 'attribute_subtable',
            },
            {
              label: '从表-实体关联表',
              value: 'entity_relation_subtable',
            },
            {
              label: '配置表',
              value: 'configuration',
            },
            {
              label: '其他',
              value: 'other',
            },
          ],
        },
        FormItemColProps: {
          span: 12,
        },
        // 自定义前缀插槽
        prefix: () => <div className="flex-none mr-2">前缀</div>,
      },
      {
        label: '',
        name: 'submit',
        // 自定义插槽
        slot: 'submit',
        FormItemColProps: {
          span: 24,
        },
        FormItemProps: {
          wrapperCol: { offset: 16 },
        },
      },
    ],
    [],
  );

  async function handleSearch() {
    const fieldsValues = form.getFieldsValue();
    console.log('handleSearch', fieldsValues);
    console.log('formItemOptions', formItemOptions);
  }
  const onReset = () => {
    form.resetFields();
  };
  const onFill = () => {
    form.setFieldsValue(formValues);
  };

  useEffect(() => {
    setformValues({
      en_table_name: 'yhtest1',
      table_type: 'other',
      plan_lead: '测试1',
      production_lead: '章振南',
      plan_lead_id: 'f28b68fd-ecd7-48d0-8c39-09b74f551994',
      production_lead_id: 'a03efbb2-f89c-4798-ba7c-5a91aaf6e418',
    });
    getAllUserList({
      page: 1,
      page_size: 100,
    }).then((res: any[] | DraftFunction<any[]>) => {
      setUserList(res);
    });
  }, []);

  return (
    // 除了formItemOptions、rowProps、children以外剩余参数均为Form Props配置参数，同antd文档
    <HsAdminForm
      formItemOptions={formItemOptions}
      form={form}
      rowProps={rowProps}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
    >
      <div slot="submit">
        <Space>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
          <Button htmlType="button" onClick={onReset}>
            重置
          </Button>
          <Button type="link" htmlType="button" onClick={onFill}>
            填充表单
          </Button>
        </Space>
      </div>
    </HsAdminForm>
  );
};

export default FormPage;
