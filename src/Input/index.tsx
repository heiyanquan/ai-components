import { Input } from 'antd';
import React, { FC, memo } from 'react';

const HsAdminInput: FC<any> = (props: any) => {
  const { TextArea, Search, Password, ...rest } = props;
  if (TextArea) {
    return (
      <Input.TextArea
        allowClear
        showCount
        maxLength={500}
        {...rest}
      ></Input.TextArea>
    );
  } else if (Search) {
    return (
      <Input.Search
        allowClear
        showCount
        maxLength={50}
        {...rest}
      ></Input.Search>
    );
  } else if (Password) {
    return (
      <Input.Password
        allowClear
        showCount
        maxLength={50}
        show-password-on="mousedown"
        {...rest}
      ></Input.Password>
    );
  } else {
    return <Input allowClear showCount maxLength={50} {...rest}></Input>;
  }
};

export default memo(HsAdminInput);
