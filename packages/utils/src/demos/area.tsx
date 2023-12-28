import { allProvinceList } from '@react-admin/pro-utils'

export default () => {
  return (
    <>
      <h1>省allProvinceList：</h1>
      <pre>{JSON.stringify(allProvinceList, null, 2)}</pre>
      <h1>市allCityList、区allAreaList可自行查看</h1>
    </>
  )
}
