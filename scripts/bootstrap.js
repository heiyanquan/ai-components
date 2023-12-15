const { existsSync, writeFileSync, readdirSync } = require('fs');
const { join } = require('path');
const { yParser } = require('@umijs/utils');

(async () => {
  const args = yParser(process.argv);
  const version = '1.0.0-beta.1';

  const pkgs = readdirSync(join(__dirname, '../packages')).filter(
    (pkg) => pkg.charAt(0) !== '.',
  );

  pkgs.forEach((shortName) => {
    const name = `@hs-react-admin/pro-${shortName}`;

    const pkgJSONPath = join(
      __dirname,
      '..',
      'packages',
      shortName,
      'package.json',
    );
    const pkgJSONExists = existsSync(pkgJSONPath);
    let json;
    if (args.force || !pkgJSONExists) {
      console.log('[ bootstrap ] >', bootstrap)
      json = {
        name,
        version,
        description: name,
        module: 'es/index.js',
        main: 'lib/index.js',
        types: 'lib/index.d.ts',
        files: ['lib', 'src', 'dist', 'es'],
        browserslist: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 11'],
        keywords: ['antd', 'admin', 'hs-react-admin'],
        license: 'MIT',
        bugs: 'http://github.com/umijs/plugins/issues',
        homepage: `https://git.aihuoshi.net/algo_analysis_plat/web/fd-react-admin-components/-/tree/release/packages/${shortName}#readme`,
        peerDependencies: {
          umi: '3.x',
        },
        publishConfig: {
          registry: 'https://repo.aihuoshi.net/repository/npm-huoshi/',
        },
      };
      if (pkgJSONExists) {
        const pkg = require(pkgJSONPath);
        [
          'dependencies',
          'devDependencies',
          'peerDependencies',
          'bin',
          'version',
          'files',
          'authors',
          'types',
          'sideEffects',
          'main',
          'module',
          'description',
        ].forEach((key) => {
          if (pkg[key]) json[key] = pkg[key];
        });
      }
      writeFileSync(pkgJSONPath, `${JSON.stringify(json, null, 2)}\n`);
    }

    const readmePath = join(
      __dirname,
      '..',
      'packages',
      shortName,
      'README.md',
    );
    if (args.force || !existsSync(readmePath)) {
      writeFileSync(
        readmePath,
        `# ${name}

> ${json.description}.

See our website [${name}](https://umijs.org/plugins/${shortName}) for more information.

## Install

Using npm:

\`\`\`bash
$ npm install --save ${name}
\`\`\`

or using pnpm:

\`\`\`bash
$ pnpm add ${name}
\`\`\`
`,
      );
    }
  });
})();
