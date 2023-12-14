import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

const EMPTYTEXT = '--';
export function hsHandleTableRender(text: string) {
  return text || EMPTYTEXT;
}
export function hsHandleDateYear(timestamp: number | string) {
  let date = EMPTYTEXT;
  if (timestamp) {
    date = dayjs(timestamp).format('YYYY');
  }
  return date;
}
export function hsHandleTableDate(timestamp?: number | string) {
  let date = EMPTYTEXT;
  if (timestamp) {
    date = dayjs(timestamp).format('YYYY-MM-DD');
  }
  return date;
}
export function hsHandleTableDateTime(timestamp?: number | string) {
  let date = EMPTYTEXT;
  if (timestamp) {
    date = dayjs(timestamp).format('YYYY-MM-DD HH:mm:ss');
  }
  return date;
}

interface SetStatePage {
  current: number;
  pageSize: number;
  showSizeChanger: boolean;
  showQuickJumper: boolean;
  pageSizeOptions: number[];
  showTotal: (total: number) => string;
}

export const usePage: any = (
  doRequest?: () => Promise<any>,
  initOptions?: SetStatePage,
) => {
  const [pagination, setPagination] = useState<SetStatePage>({
    current: 1,
    pageSize: 10,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total: number) => `共 ${total} 条数据`,
    pageSizeOptions: [10, 20, 30, 40],
    ...initOptions,
  });
  const [total, setTotal] = useState(0);

  function onChange(page: number, pageSize: number) {
    if (pageSize !== pagination.pageSize) {
      setPagination((prevPagi) => {
        prevPagi.current = 1;
        prevPagi.pageSize = pageSize;
        return { ...prevPagi };
      });
    } else {
      setPagination((prevPagi) => {
        prevPagi.current = page;
        return { ...prevPagi };
      });
    }
  }

  const resetPage = () => {
    setPagination((prevPagi) => {
      prevPagi.current = 1;
      prevPagi.pageSize = 10;
      return { ...prevPagi };
    });
  };
  const initPage = () => {
    setPagination((prevPagi) => {
      prevPagi.current = 1;
      return { ...prevPagi };
    });
  };

  useEffect(() => {
    doRequest?.().then((res) => {
      if (typeof res === 'object') {
        setTotal(res.total);
      }
    });
  }, [pagination]);

  return {
    pagination: {
      ...pagination,
      total,
      onChange,
    },
    total,
    setPagination,
    setTotal,
    onChange,
    resetPage,
    initPage,
  };
};

export const useNewPage: any = (
  doRequest?: () => Promise<any>,
  searchParams?: any,
  initOptions?: SetStatePage,
) => {
  const [pagination, setPagination] = useState<SetStatePage>({
    current: 1,
    pageSize: 10,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total: number) => `共 ${total} 条数据`,
    pageSizeOptions: [10, 20, 30, 40],
    ...initOptions,
  });
  const [total, setTotal] = useState(0);

  function onChange(page: number, pageSize: number) {
    setPagination((prevState) => {
      if (pageSize !== prevState.pageSize) {
        prevState.current = 1;
        prevState.pageSize = pageSize;
      } else {
        prevState.current = page;
      }
      return { ...prevState };
    });
  }

  const resetPage = () => {
    setPagination((prevPagi) => {
      prevPagi.current = 1;
      prevPagi.pageSize = 10;
      return { ...prevPagi };
    });
  };
  const initPage = () => {
    setPagination((prevPagi) => {
      prevPagi.current = 1;
      return { ...prevPagi };
    });
  };

  useEffect(() => {
    doRequest?.().then((res) => {
      if (typeof res === 'object') {
        setTotal(res.total);
      }
    });
  }, [pagination, searchParams]);

  return {
    pagination,
    total,
    setPagination,
    setTotal,
    onChange,
    resetPage,
    initPage,
    pageType: 'new',
  };
};
