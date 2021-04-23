import * as React from 'react';
export interface Error {
  /** 错误的数据路径 */
  name: string;
  /** 错误的内容 */
  error: string[];
}
export interface FormParams {
  formData?: any;
  onChange?: (data: any) => void;
  onValidate?: (valid: any) => void;
}

export interface FormInstance {
  formData: any;
  schema: any;
  touchedKeys: string[];
  touchKey: (key: string) => void;
  onItemChange: (path: string, value: any) => void;
  setValues: (formData: any) => void;
  getValues: () => void;
  resetFields: () => void;
  submit: () => void;
  submitData: any;
  errorFields: Error[];
  isValidating: boolean;
  outsideValidating: boolean;
  isSubmitting: boolean;
  endValidating: () => void;
  endSubmitting: () => void;
  setErrorFields: (error: Error[]) => void;
  removeErrorField: (path: string) => void;
  isEditing: boolean;
  setEditing: (status: boolean) => void;
  syncStuff: (any) => void;
}

export interface FRProps {
  /** 表单 schema */
  schema: any;
  /** form单例 */
  form: FormInstance;
  /** 组件和schema的映射规则 */
  mapping?: any;
  /** 自定义组件 */
  widgets?: any;
  /** 表单提交前钩子 */
  displayType?: string;
  /** 只读模式 */
  readOnly?: boolean;
  /** 标签宽度 */
  labelWidth?: string;
  /** antd的全局config */
  configProvider?: any;
  theme?: string | number;
  /** 覆盖默认的校验信息 */
  validateMessages?: any;
  flatten?: any;
  /** 显示当前表单内部状态 */
  debug?: boolean;
  /** 显示css布局提示线 */
  debugCss?: boolean;
  locale?: string;
  column?: number;
  debounceInput?: boolean;
  size?: string;
  // 数据会作为 beforeFinish 的第四个参数传入
  config?: any;
  /** 表单提交前钩子 */
  beforeFinish?: (
    formData: any,
    schema: any,
    error: Error[],
    config: any
  ) => Error[] | Promise<Error[]>;
  /** 表单提交后钩子 */
  onFinish: (formData: any, error: Error[]) => void;
}

declare const FR: React.FC<FRProps>;

export declare function useForm(params?: FormParams): FormInstance;

export declare function connectForm(component: React.FC<any>): any;

export default FR;
