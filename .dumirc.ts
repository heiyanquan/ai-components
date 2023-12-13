import chalk from 'chalk';
import { defineConfig } from 'dumi';
import { readdirSync } from 'fs';
import { join } from 'path';

const headPkgList: string[] = [];
const pkgList = readdirSync(join(__dirname, 'packages')).filter(
  (pkg) => pkg.charAt(0) !== '.' && !headPkgList.includes(pkg),
);

const alias = pkgList.reduce((pre, pkg) => {
  pre[`@hs-react-admin/${pkg}`] = join(__dirname, 'packages', pkg, 'src');
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
              title: 'foo - 测试组件',
              link: '/components/foo',
            },
            {
              title: 'input - 输入框',
              link: '/components/input',
            },
          ],
        },
      ],
    },
  },
  hash: true,
  ignoreMomentLocale: true,
});
