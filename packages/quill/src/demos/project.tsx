import { HsAdminQuill } from '@react-admin/pro-components'
import { useState } from 'react'

export default () => {
  const [value, setValue] =
    useState(`<div class="article-content">\n                <p style="text-align: center;"><strong>穗科字〔2022〕4号</strong></p><p style="text-align: justify;">各有关单位：</p><p style="text-align: justify;">　　我能识别好多标签, 可把我牛坏了</p><p style="text-align: justify;"><br></p><p style="text-align: justify;">　　附件：<a target="_blank" class="nfw-cms-attachment" attachment-id="7111205" href="" alt="广州科技创新母基金直接股权投资管理实施细则.pdf">猜猜我是谁.pdf</a></p><p style="text-align: right;">火石大牛头</p><p style="text-align: right;">　　2022年6月9日</p><p><br></p>\n                <br>\n                            </div>
`)

  return <HsAdminQuill theme="snow" value={value} onChange={setValue} />
}
