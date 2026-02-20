import { readFileSync, mkdirSync, writeFileSync } from 'fs';
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

// 边界测试
test('isBrainstormingApproved returns false for corrupted JSON', () => {
  const dir = '/tmp/corrupt-' + Date.now();
  mkdirSync(dir + '/.omc/state', { recursive: true });
  writeFileSync(dir + '/.omc/state/brainstorming-approved.json', 'not-json');
  expect(isBrainstormingApproved(dir)).toBe(false);
});

test('isBrainstormingApproved returns false when approved field is missing', () => {
  const dir = '/tmp/no-approved-' + Date.now();
  mkdirSync(dir + '/.omc/state', { recursive: true });
  writeFileSync(dir + '/.omc/state/brainstorming-approved.json', JSON.stringify({ taskId: 'x' }));
  expect(isBrainstormingApproved(dir)).toBe(false);
});

test('setBrainstormingApproved persists taskId and timestamp', () => {
  const dir = '/tmp/persist-' + Date.now();
  setBrainstormingApproved(dir, 'my-task-id');
  const data = JSON.parse(readFileSync(dir + '/.omc/state/brainstorming-approved.json', 'utf-8'));
  expect(data.taskId).toBe('my-task-id');
  expect(data.approved).toBe(true);
  expect(typeof data.timestamp).toBe('string');
});

test('checkBrainstormingGate skips when OMC_SKIP_IRON_LAWS=1', () => {
  process.env.OMC_SKIP_IRON_LAWS = '1';
  try {
    expect(() => checkBrainstormingGate('/tmp/no-state-' + Date.now())).not.toThrow();
  } finally {
    delete process.env.OMC_SKIP_IRON_LAWS;
  }
});

test('checkBrainstormingGate error message contains instructions', () => {
  try {
    checkBrainstormingGate('/tmp/no-state-' + Date.now());
    expect.fail('should have thrown');
  } catch (e: any) {
    expect(e.message).toContain('superpowers:brainstorming');
    expect(e.message).toContain('OMC_SKIP_IRON_LAWS=1');
  }
});

// 集成测试
test('setBrainstormingApproved overwrites previous state', () => {
  const dir = '/tmp/overwrite-' + Date.now();
  setBrainstormingApproved(dir, 'task-1');
  setBrainstormingApproved(dir, 'task-2');
  const data = JSON.parse(readFileSync(dir + '/.omc/state/brainstorming-approved.json', 'utf-8'));
  expect(data.taskId).toBe('task-2');
});

test('checkBrainstormingGate respects state written by setBrainstormingApproved', () => {
  const dir = '/tmp/integration-' + Date.now();
  expect(() => checkBrainstormingGate(dir)).toThrow('HARD-GATE');
  setBrainstormingApproved(dir, 'approved');
  expect(() => checkBrainstormingGate(dir)).not.toThrow();
});
