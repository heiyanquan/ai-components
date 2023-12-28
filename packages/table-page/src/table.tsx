import { Table } from 'antd'
import { FC } from 'react'
import { hsHandleTableDate, hsHandleTableDateTime, hsHandleTableRender } from '@react-admin/pro-utils'

interface ColumnsType {
  title: string
  dataIndex: string
  key: string
  type?: string
  render?: (text: string, record: any) => JSX.Element
}
const HsAdminTable: FC<any> = (props: any) => {
  const { columns, ...rest } = props
  columns?.forEach((item: ColumnsType) => {
    if (!item.render) {
      if (item.type === 'date') {
        item.render = (text: string) => <span>{hsHandleTableDate(text)}</span>
      } else if (item.type === 'datetime') {
        item.render = (text: string) => <span>{hsHandleTableDateTime(text)}</span>
      } else {
        if (item.dataIndex?.includes('.')) {
          const nameList: string[] = item.dataIndex.split('.')
          item.render = (_text: string, record: any) => {
            return <span>{hsHandleTableRender(record[nameList[0]]?.[nameList[1]])}</span>
          }
        } else {
          item.render = (text: string) => <span>{hsHandleTableRender(text)}</span>
        }
      }
    }
  })

  return <Table columns={columns} {...rest}></Table>
}

export default HsAdminTable
