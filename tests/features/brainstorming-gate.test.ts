import { isBrainstormingApproved, setBrainstormingApproved } from '../../src/features/brainstorming-gate/index.js';

test('isBrainstormingApproved returns false when no state', () => {
  expect(isBrainstormingApproved('/tmp/test-worktree')).toBe(false);
});

test('setBrainstormingApproved then isBrainstormingApproved returns true', () => {
  const dir = '/tmp/test-worktree-' + Date.now();
  setBrainstormingApproved(dir, 'test-task');
  expect(isBrainstormingApproved(dir)).toBe(true);
});
