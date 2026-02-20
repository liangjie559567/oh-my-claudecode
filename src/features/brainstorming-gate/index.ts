import * as fs from 'fs';
import * as path from 'path';

const STATE_FILE = '.omc/state/brainstorming-approved.json';

export function isBrainstormingApproved(worktreeRoot: string): boolean {
  const file = path.join(worktreeRoot, STATE_FILE);
  if (!fs.existsSync(file)) return false;
  try {
    const data = JSON.parse(fs.readFileSync(file, 'utf-8'));
    return data.approved === true;
  } catch {
    return false;
  }
}

export function setBrainstormingApproved(worktreeRoot: string, taskId: string): void {
  const dir = path.join(worktreeRoot, '.omc/state');
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(
    path.join(worktreeRoot, STATE_FILE),
    JSON.stringify({ approved: true, taskId, timestamp: new Date().toISOString() })
  );
}

export function checkBrainstormingGate(worktreeRoot: string): void {
  if (process.env.OMC_SKIP_IRON_LAWS === '1') return;
  if (!isBrainstormingApproved(worktreeRoot)) {
    throw new Error(
      'HARD-GATE: Design must be approved before implementation.\n' +
      'Run superpowers:brainstorming first, then call setBrainstormingApproved().\n' +
      'Skip with OMC_SKIP_IRON_LAWS=1'
    );
  }
}
