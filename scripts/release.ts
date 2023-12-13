import { copy } from "fs-extra";
import { series } from "gulp";
import path from "path";
import run from "./run";

const rootPath = path.resolve(__dirname, "../");
const distPath = path.resolve(__dirname, "../dist");
const rootPathPkg = path.resolve(__dirname, "../package.json");
const distPathPkg = path.resolve(__dirname, "../dist/package.json");

//打包组件
const publish = async () => {
  try {
    //先给version升个版本
    await run("npm version patch", rootPath);
    // 打包
    await run("pnpm run build", rootPath);
    // 复制package.json同步到dist
    await copy(rootPathPkg, distPathPkg);
    //在dist下执行发布命令
    await run("npm publish", `${distPath}`);
  } catch (error) {
    console.log(error);
  }
};

export default series(async () => publish());
