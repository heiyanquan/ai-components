import { yParser, chalk } from '@umijs/utils'
import { join } from 'path'
import exec from './utils/exec.js'
import { execa } from 'execa'
import getPackages from './utils/getPackages.js'
import isNextVersion from './utils/isNextVersion.js'
import { readFileSync } from 'fs'

const cwd = process.cwd()
const args = yParser(process.argv)

function printErrorAndExit(message) {
  console.error(chalk.red(message))
  process.exit(1)
}

function logStep(name) {
  console.log(`${chalk.gray('>> Release:')} ${chalk.magenta.bold(name)}`)
}

async function packageExists({ name, version }) {
  const { stdout } = await execa('npm', ['info', `${name}@${version}`], {})
  return stdout.length > 0
}

async function release() {
  // Check npm registry
  logStep('check npm registry')
  const userRegistry = await execa('npm', ['config', 'get', 'registry'], {})
  if (userRegistry.stdout.includes('https://registry.yarnpkg.com/')) {
    printErrorAndExit(`Release failed, please use ${chalk.blue('npm run release')}.`)
  }

  let updated = null

  if (!args.publishOnly) {
    // Get updated packages
    logStep('check updated packages')
    const updatedStdout = await execa('lerna', ['changed'], {})
    updated = updatedStdout.stdout
      .split('\n')
      .map((pkg) => {
        return pkg.split('/')[1]
      })
      .filter(Boolean)
    if (!updated.length) {
      printErrorAndExit('Release failed, no updated package is updated.')
    }

    // Clean
    logStep('clean')

    // Build
    if (!args.skipBuild) {
      logStep('build')
      await exec('npm', ['run', 'build'])
    } else {
      logStep('build is skipped, since args.skipBuild is supplied')
    }

    // Bump version
    // Commit
    // Git Tag
    // Push
    logStep('bump version with lerna version')

    const conventionalGraduate = args.conventionalGraduate
      ? ['--conventional-graduate'].concat(Array.isArray(args.conventionalGraduate) ? args.conventionalGraduate.join(',') : [])
      : []
    const conventionalPrerelease = args.conventionalPrerelease
      ? ['--conventional-prerelease'].concat(Array.isArray(args.conventionalPrerelease) ? args.conventionalPrerelease.join(',') : [])
      : []

    const major = args.major ? 'major' : ''
    const minor = args.minor ? 'minor' : ''
    try {
      await execa('lerna', ['version', major || minor || 'patch'], {
        stdio: 'inherit'
      })
    } catch (error) {
      console.log('[ lerna error ] >', error)
    }
  }

  // Publish
  // Umi must be the latest.
  let pkgs = args.publishOnly ? getPackages() : updated
  pkgs = pkgs.filter((item) => item !== 'api')
  logStep(`publish packages: ${chalk.blue(pkgs.join(', '))}`)
  const publishList = pkgs.map(async (pkg, index) => {
    const pkgPath = join(cwd, 'packages', pkg.replace('pro-', ''))
    const pkgPathUrl = join(pkgPath, 'package.json')
    const { name, version } = JSON.parse(readFileSync(pkgPathUrl, 'utf8'))
    const isNext = isNextVersion(version)
    let isPackageExist = null
    if (args.publishOnly) {
      isPackageExist = await packageExists({ name, version })
      if (isPackageExist) {
        console.log(`package ${name}@${version} is already exists on npm, skip.`)
      }
    }
    if (!args.publishOnly || !isPackageExist) {
      console.log(`[${index + 1}/${pkgs.length}] Publish package ${name} ${isNext ? 'with next tag' : ''}`)
      // tag默认设置为latest
      let cliArgs = isNext ? ['publish', '--tag', 'next'] : ['publish', '--tag', 'latest']

      if (args.tag) {
        cliArgs = ['publish', '--tag', args.tag]
      }
      return execa('npm', cliArgs, {
        cwd: pkgPath
      })
    }
  })
  console.log('发布中' + pkgs.join('/'))
  await Promise.all(publishList)
  console.log('发布成功！')
  await exec('npm', ['run', 'prettier'])

  logStep('done')
}

release().catch((err) => {
  console.error(err)
  process.exit(1)
})
