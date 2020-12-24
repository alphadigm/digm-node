// STANDARD CLI FUNCTIONS
const {configr} = require('./configr');
const {help} = require('./help');
const {version} = require('./version');
// CLI ARGUMENTS GUTS
const minimist = require('minimist');
// WEATHER-CALLING-API
const {now} = require('./now');

// CLI ENTRY
export async function cli(argsArray) {
    const args = minimist(argsArray.slice(2));
    let cmd = args._[0] || 'help';
  
    if (args.version || args.v) {
      cmd = 'version';
    }
  
    if (args.help || args.h) {
      cmd = 'help';
    }
  
    switch (cmd) {
      case 'version':
        version(args);
        break;
  
      case 'help':
        help(args);
        break;
  
      case 'now':
        now(args);
        break;
  
      case 'configr':
        configr(args);
        break;
  
      default:
        console.error(`"${cmd}" is not a valid command!`);
        break;
    }
  }