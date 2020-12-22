import chalk from 'chalk';
import { versionString } from './version';

const menus = {
  main: `
${chalk.yellowBright('Usage:')} ${chalk.greenBright('digm')} ${chalk.blueBright('[command]')} <options>

  ${chalk.blueBright('now')} ................ show current date and time
  ${chalk.blueBright('version')} ............ show package version
  ${chalk.blueBright('help')} ............... show help menu for a command

Version information:
  ${versionString}`,
};

export async function help(args) {
  const subCmd = args._[0] === 'help' ? args._[1] : args._[0];
  console.log(menus[subCmd] || menus.main);
}