import { isBrainstormingApproved, setBrainstormingApproved, checkBrainstormingGate } from '../../src/features/brainstorming-gate/index.js';

test('isBrainstormingApproved returns false when no state', () => {
  expect(isBrainstormingApproved('/tmp/test-worktree')).toBe(false);
});

test('setBrainstormingApproved then isBrainstormingApproved returns true', () => {
  const dir = '/tmp/test-worktree-' + Date.now();
  setBrainstormingApproved(dir, 'test-task');
  expect(isBrainstormingApproved(dir)).toBe(true);
});

test('checkBrainstormingGate throws when not approved', () => {
  expect(() => checkBrainstormingGate('/tmp/no-state-dir-' + Date.now())).toThrow('HARD-GATE');
});

test('checkBrainstormingGate passes when approved', () => {
  const dir = '/tmp/gate-test-' + Date.now();
  setBrainstormingApproved(dir, 'task');
  expect(() => checkBrainstormingGate(dir)).not.toThrow();
});
