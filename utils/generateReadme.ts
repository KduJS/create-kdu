import getCommand from './getCommand'

const sfcTypeSupportDoc = [
  '',
  '## Type Support for `.kdu` Imports in TS',
  '',
  'TypeScript cannot handle type information for `.kdu` imports by default, so we replace the `tsc` CLI with `kdu-tsc` for type checking. In editors, we need [TypeScript Kdu Plugin (Kocan)](https://marketplace.visualstudio.com/items?itemName=Kdu-Code.kocan) to make the TypeScript language service aware of `.kdu` types.',
  '',
  "If the standalone TypeScript plugin doesn't feel fast enough to you, Kocan has also implemented a `Take Over Mode` that is more performant. You can enable it by the following steps:",
  '',
  '1. Disable the built-in TypeScript Extension',
  "    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette",
  '    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`',
  '2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.',
  ''
].join('\n')

export default function generateReadme({
  projectName,
  packageManager,
  needsTypeScript,
  // needsCypress,
  // needsCypressCT,
  // needsVitest,
  needsEslint
}) {
  let readme = `# ${projectName}

This template should help get you started developing with Kdu 3 in Wite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Kocan](https://marketplace.visualstudio.com/items?itemName=Kdu-Code.kocan).
${needsTypeScript ? sfcTypeSupportDoc : ''}
## Customize configuration

See [Wite Configuration Reference](https://witejs.web.app/config/).

## Project Setup

`

  let npmScriptsDescriptions = `\`\`\`sh
${getCommand(packageManager, 'install')}
\`\`\`

### Compile and Hot-Reload for Development

\`\`\`sh
${getCommand(packageManager, 'dev')}
\`\`\`

### ${needsTypeScript ? 'Type-Check, ' : ''}Compile and Minify for Production

\`\`\`sh
${getCommand(packageManager, 'build')}
\`\`\`
`

  //   if (needsVitest) {
  //     npmScriptsDescriptions += `
  // ### Run Unit Tests with [Vitest](https://vitest.dev/)
  //
  // \`\`\`sh
  // ${getCommand(packageManager, 'test:unit')}
  // \`\`\`
  // `
  //   }

  //   if (needsCypressCT) {
  //     npmScriptsDescriptions += `
  // ### Run Headed Component Tests with [Cypress Component Testing](https://on.cypress.io/component)
  //
  // \`\`\`sh
  // ${getCommand(packageManager, 'test:unit')} # or \`${getCommand(
  //       packageManager,
  //       'test:unit:ci'
  //     )}\` for headless testing
  // \`\`\`
  // `
  //   }

  //   if (needsCypress) {
  //     npmScriptsDescriptions += `
  // ### Run End-to-End Tests with [Cypress](https://www.cypress.io/)
  //
  // \`\`\`sh
  // ${getCommand(packageManager, 'build')}
  // ${getCommand(packageManager, 'test:e2e')} # or \`${getCommand(
  //       packageManager,
  //       'test:e2e:ci'
  //     )}\` for headless testing
  // \`\`\`
  // `
  //   }

  if (needsEslint) {
    npmScriptsDescriptions += `
### Lint with [ESLint](https://eslint.org/)

\`\`\`sh
${getCommand(packageManager, 'lint')}
\`\`\`
`
  }

  readme += npmScriptsDescriptions

  return readme
}
