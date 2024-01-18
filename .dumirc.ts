import { defineConfig } from 'dumi'
import { readdirSync } from 'fs'
import { join } from 'path'
import { chalk } from '@umijs/utils'

const headPkgList: string[] = []
const pkgList = readdirSync(join(__dirname, 'packages')).filter((pkg) => pkg.charAt(0) !== '.' && !headPkgList.includes(pkg))

const alias = pkgList.reduce((pre, pkg) => {
  pre[`@react-admin/pro-${pkg}`] = join(__dirname, 'packages', pkg, 'src')
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
    name: 'react-admin',
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
              title: 'spin - 加载中',
              link: '/components/spin'
            },
            {
              title: 'table-page - 表格+分页',
              link: '/components/table-page'
            },
            {
              title: 'upload - 上传',
              link: '/components/upload'
            },
            {
              title: 'scroll-select - 下拉滚动',
              link: '/components/scroll-select'
            },
            {
              title: 'form - 表单',
              link: '/components/form'
            },
            {
              title: 'codemirror - 代码编辑器',
              link: '/components/codemirror'
            },
            {
              title: 'quill - 富文本编辑器',
              link: '/components/quill'
            }
          ]
        },
        {
          title: '工具方法',
          children: [
            {
              title: 'utils - 工具方法',
              link: '/components/utils'
            }
          ]
        }
      ]
    }
  },
  hash: true,
  ignoreMomentLocale: true
})
