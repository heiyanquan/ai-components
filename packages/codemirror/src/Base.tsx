import { FC, useEffect, useState } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { langs } from './typing'
import { color } from '@uiw/codemirror-extensions-color'

interface Props {
  lang?: string
  value: string
  [key: string | number]: any
}
const HsAdminBaseCodemirror: FC<Props> = (props: Props) => {
  const { lang, ...rest } = props
  const [extensions, setExtensions] = useState<any[]>()

  useEffect(() => {
    if (lang && langs[lang]) {
      setExtensions([color, langs[lang]()])
    }
  }, [lang])

  return <CodeMirror extensions={extensions} {...rest} />
}

export default HsAdminBaseCodemirror
