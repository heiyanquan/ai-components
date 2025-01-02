import { getUrlSearchParams } from '@zs-ai/pro-utils'

export default () => {
  const paramsString = 'https://datashop.aihuoshi.net/?q=URLUtils.searchParams&topic=api'
  const q = getUrlSearchParams('q', paramsString)
  const topic = getUrlSearchParams('topic', paramsString)

  return (
    <>
      <h1>q：{q}</h1>
      <h1>topic：{topic}</h1>
    </>
  )
}
