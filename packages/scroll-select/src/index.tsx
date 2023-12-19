import { FC, useState, useEffect, useMemo, useCallback } from 'react';
import { Select } from 'antd';
import debounce from 'lodash/debounce';
import { useImmer } from 'use-immer';
import type { SelectProps } from 'antd';
import type { ScrollSelectColSpanType } from './typing';

interface Page {
  page: number;
  page_size: number;
}
export interface SelectInfiniteProps extends SelectProps {
  options?: any[];
  value?: string | number | null | undefined;
  onFocus?: () => void;
  onBlur?: () => void;
  onChange?: (value: string | number | null, option: any | Array<any>) => void;
  request: (params: any) => Promise<any>;
  searchParams?: object;
  keywordsKey?: string;
  finishFlag?: boolean;
}
const HsAdminScrollSelect: FC<SelectInfiniteProps> = (props: SelectInfiniteProps) => {
  const {
    options,
    value,
    onFocus,
    onBlur,
    onChange,
    request,
    keywordsKey,
    searchParams,
    finishFlag,
    ...rest
  } = props;
  const [userList, setuserList] = useImmer<any[]>([]);
  const [keywords, setkeywords] = useState<string | undefined>(undefined);
  const [pagination, setPagination] = useImmer<Page>({
    page: 1,
    page_size: 10,
  });
  const [localValue, setlocalValue] = useState<string | number | null | undefined>(undefined);
  const debounceTimeout = 400;
  const [loadListFlag, setloadListFlag] = useState(false);

  const callList = useCallback(() => {
    return request({
      [keywordsKey || 'keywords']: keywords || undefined,
      ...pagination,
      ...searchParams,
    }).then((res: any[]) => {
      if (pagination.page === 1) {
        setuserList(res);
      } else {
        setuserList((prevList) => (prevList = [...prevList, ...res]));
      }
    });
  }, [keywords, pagination, setuserList, request, searchParams, keywordsKey]);

  const getMoreList = (e: any) => {
    const currentTarget = e.currentTarget as HTMLElement;
    if (currentTarget.scrollTop + currentTarget.offsetHeight - currentTarget.scrollHeight >= -10) {
      setPagination((prevPagi) => {
        prevPagi.page = pagination.page + 1;
      });
    }
  };

  const handleSearch = useMemo(() => {
    const loadOptions = (newValue: string) => {
      setkeywords(newValue);
      setPagination((prevPagi) => {
        prevPagi.page = 1;
      });
    };
    return debounce(loadOptions, debounceTimeout);
  }, [debounceTimeout, setPagination]);

  const focusChange = () => {
    setloadListFlag(true);
    setPagination({
      page: 1,
      page_size: 10,
    });
    setkeywords('');
    onFocus?.();
  };
  const blurChange = () => {
    setloadListFlag(false);
    setuserList(options || []);
    onBlur?.();
  };
  const selectChange = (value: string | number | null, option: any | Array<any>) => {
    if (!value) {
      setkeywords('');
      setPagination({
        page: 1,
        page_size: 10,
      });
    }
    onChange?.(value, option);
  };

  useEffect(() => {
    if (loadListFlag) {
      callList();
    } else if (options?.length) {
      setuserList(options);
    }
  }, [pagination, keywords, finishFlag, options, loadListFlag, setuserList, callList]);

  useEffect(() => {
    setlocalValue(value);
  }, [value]);

  return (
    <Select
      allowClear
      value={localValue}
      options={userList}
      showSearch
      filterOption={false}
      placeholder="请选择"
      onPopupScroll={getMoreList}
      onSearch={handleSearch}
      onFocus={focusChange}
      onBlur={blurChange}
      onChange={selectChange}
      {...rest}
    ></Select>
  );
};

export type { ScrollSelectColSpanType };
export { HsAdminScrollSelect };
export default HsAdminScrollSelect;
