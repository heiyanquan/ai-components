import { defineConfig } from 'dumi'
import { readdirSync } from 'fs'
import { join } from 'path'
import { chalk } from '@umijs/utils'

const headPkgList: string[] = []
const pkgList = readdirSync(join(__dirname, 'packages')).filter((pkg) => pkg.charAt(0) !== '.' && !headPkgList.includes(pkg))

const alias = pkgList.reduce((pre, pkg) => {
  pre[`@zs-ai/pro-${pkg}`] = join(__dirname, 'packages', pkg, 'src')
  return {
    ...pre
  }
}, {})
console.log(`🌼 alias list \n${chalk.blue(Object.keys(alias).join('\n'))}`)

const tailPkgList = pkgList.map((path) => `packages/${path}/src`)

export default defineConfig({
  alias,
  resolve: {
    docDirs: ['docs', ...tailPkgList]
  },
  themeConfig: {
    name: 'zs-ai',
    nav: [
      { title: '文档', link: '/docs' },
      { title: '组件', link: '/components' }
    ],
    sidebar: {
      '/components': [
        {
          title: '基础组件',
          children: [
            {
              title: 'input - 加载中',
              link: '/components/input'
            },
          ]
        },
      ]
    }
  },
  hash: true,
  ignoreMomentLocale: true
})
