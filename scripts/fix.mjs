/* eslint-env node */
import { executeCommands } from './commandRunner.mjs';

// Function to execute all fix tasks
function executeFixes() {
  const commands = [
    'yarn cache clean', 
    'rm -rf node_modules', 
    'yarn install', 
    'yarn build:dev'
  ];

  executeCommands(commands, () => {
    console.log('Fixes applied.');
    console.warn(
      '\x1b[33m%s\x1b[0m',
      `Notice: ESLint path errors may arise after clearing cache and node_modules. 
      WebStorm is designed to auto-resolve this, but it may take some time. 
      Restarting WebStorm will expedite the process.

      If the issue persists a long time after restarting, you can try the following: 
          - Navigate to \`File -> Invalidate Caches...\`, then select \`Invalidate Caches and Restart\`.`
    );
  });
}

// Execute the fix tasks
executeFixes();

