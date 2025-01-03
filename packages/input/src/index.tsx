import { MyElementComponent } from './MyElementComponent'

const ZsAiInput: any = (props: any) => {
  return (
    <div>
      <input {...props} name="input" placeholder="请输入搜索文字1" />
      <MyElementComponent />
    </div>
  )
}

export { ZsAiInput }
export default ZsAiInput
