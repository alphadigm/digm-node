// STANDARD CLI FUNCTIONS
import { configr } from './configr';
import { help } from './help';
import { version } from './version';
// CLI ARGUMENTS GUTS
const minimist = require('minimist');
// WEATHER-CALLING-API
import { now } from './now'; 

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