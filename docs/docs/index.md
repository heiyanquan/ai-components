---
title: 快速开始
order: 2

nav:
  title: 文档
  path: /docs
---

## zs-ai

zs-ai 是基于 lit 二次开发的管理后台组件库，提供了更高级别的抽象支持，开箱即用。可以显著的提升制作页面的效率，更加专注于页面。

- [HsAdminSpin](/components/spin) 加载器基础组件

## 安装

```shell
$ pnpm i @zs-ai/components --save
```

.npmrc需要指定安装源，文件内容如下

```npmrc
registry=http://nexus.cmschina.com/repository/npmjs/
strict-peer-dependencies=false
```

我们所有的包都使用 css in js 管理样式，只需引入 js 即可。
