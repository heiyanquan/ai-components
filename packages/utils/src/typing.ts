import type { ReactNode } from 'react';

export interface ProFieldProps {
  /**
   * 是否启用轻量模式
   */
  light?: boolean;
  /**
   * 空文本占位符
   */
  emptyText?: ReactNode;
  /**
   * 标签名称
   */
  label?: React.ReactNode;
  /**
   * 渲染模式
   */
  mode?: 'read' | 'edit';
  /**
   * 设置 useSwr 的 key
   */
  proFieldKey?: string;
  /**
   * 自定义渲染函数
   */
  render?: any;
  /**
   * 是否只读
   */
  readonly?: boolean;
}
