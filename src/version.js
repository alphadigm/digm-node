const packagejson = require('../package.json');
const executionPath = __dirname.toString();

const chalk = require('chalk');
const buildVersion = {
    main: `
  ${chalk.greenBright(packagejson.name)} ${chalk.yellowBright(packagejson.version)} ${executionPath}
  `,
  };
export const versionString = buildVersion.main;

// version()
export async function version(args) {
  const subCmd = args._[0] === 'version' ? args._[1] : args._[0];
  console.log(buildVersion[subCmd] || buildVersion.main);
}
