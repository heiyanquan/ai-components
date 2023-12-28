import { readdirSync, existsSync, writeFileSync, readFileSync } from 'fs'
import { join, dirname } from 'path'
import * as prettier from 'prettier'
import { fileURLToPath } from 'url'

// 获取 __filename 的 ESM 写法
const __filenameNew = fileURLToPath(import.meta.url)
const __dirnameNew = dirname(__filenameNew)
// utils must build before core
// runtime must build before renderer-react
let packagesPath = join(__dirnameNew, '../packages')
const pkgList = readdirSync(packagesPath)
  .filter((pkg) => pkg.charAt(0) !== '.')
  .map((pkg) => {
    const package_path = join(packagesPath, pkg)
    if (!existsSync(join(package_path, 'package.json'))) return
    const jsonUrl = join(package_path, 'package.json')
    const json = JSON.parse(readFileSync(jsonUrl, 'utf8'))
    return {
      name: json.name,
      version: json.version
    }
  })

const file_content = `

export const version = {
    ${pkgList
      .map((pak) => {
        return `"${pak.name}": '${pak.version}'`
      })
      .join(',\n    ')}    
}
`

const lastContent = await prettier.format(file_content, { parser: 'typescript', semi: false, singleQuote: true, trailingComma: 'none' })
writeFileSync(join(packagesPath, 'components', '/src/version.ts'), lastContent.toString())
