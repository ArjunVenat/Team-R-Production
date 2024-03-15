/* eslint-env node */
// Import the command runner utility using ES6 import syntax
import { executeCommands } from './commandRunner.mjs';

// Define the sync command logic as an array of commands
const syncCommands = [
    "git add .",
    "git commit -m \"Auto-commit before merge | $(git rev-parse --abbrev-ref HEAD) - $(date +'%Y-%m-%d %I:%M%p')\" || true",
    "git fetch",
    "git push --set-upstream origin $(git rev-parse --abbrev-ref HEAD)",
    "git fetch origin main:main",
    "git merge -m 'Synced with main' FETCH_HEAD",
    "git push",
];

// Execute the sync commands using the command runner
executeCommands(syncCommands, () => {
  console.log('Sync process completed.');
});
