import { Spin } from 'antd'
import { FC } from 'react'
import type { SpinColSpanType } from './typing'

const HsAdminSpin: FC<any> = (props: any) => {
  const style = {
    position: 'fixed',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: '998'
  }
  return <Spin style={style} size="large" {...props} />
}

export type { SpinColSpanType }
export { HsAdminSpin }
export default HsAdminSpin
