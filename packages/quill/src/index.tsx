import { FC } from 'react'
import type { QuillColSpanType } from './typing'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const HsAdminQuill: FC<any> = (props: any) => {
  return <ReactQuill {...props} />
}

export type { QuillColSpanType }
export { HsAdminQuill }
export default HsAdminQuill
