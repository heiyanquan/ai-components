import type { InputType } from './typing'

const ZsAiInput: any = (props: any) => {
  return <input {...props} name="input" placeholder="请输入搜索文字" />
}

export type { InputType }
export { ZsAiInput }
export default ZsAiInput
