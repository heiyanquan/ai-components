import chalk from 'chalk';
import { defineConfig } from 'dumi';
import { readdirSync } from 'fs';
import { join } from 'path';

const headPkgList: string[] = [];
const pkgList = readdirSync(join(__dirname, 'packages')).filter(
  (pkg) => pkg.charAt(0) !== '.' && !headPkgList.includes(pkg),
);

const alias = pkgList.reduce((pre, pkg) => {
  pre[`@hs-react-admin/pro-${pkg}`] = join(__dirname, 'packages', pkg, 'src');
  return {
    ...pre,
  };
}, {});
console.log(`🌼 alias list \n${chalk.blue(Object.keys(alias).join('\n'))}`);

const tailPkgList = pkgList.map((path) => `packages/${path}/src`);

export default defineConfig({
  alias,
  resolve: {
    docDirs: ['docs', ...tailPkgList],
  },
  themeConfig: {
    name: 'hs-react-admin',
    nav: [
      { title: '文档', link: '/docs' },
      { title: '组件', link: '/components' },
    ],
    sidebar: {
      '/components': [
        {
          title: '基础组件',
          children: [
            {
              title: 'input - 输入框',
              link: '/components/input',
            },
            {
              title: 'select - 选择器',
              link: '/components/select',
            },
            {
              title: 'spin - 加载中',
              link: '/components/spin',
            },
            {
              title: 'table - 表格',
              link: '/components/table',
            },
            {
              title: 'page - 分页',
              link: '/components/page',
            },
            {
              title: 'table-page - 表格+分页',
              link: '/components/table-page',
            },
            // {
            //   title: 'upload - 上传',
            //   link: '/components/upload',
            // },
          ],
        },
      ],
    },
  },
  hash: true,
  ignoreMomentLocale: true,
});
