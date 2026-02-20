import { readFileSync, existsSync } from 'fs';

test('superpowered skill file exists', () => {
  expect(existsSync('src/features/builtin-skills/superpowered.md')).toBe(true);
});

test('superpowered skill contains pipeline definition', () => {
  const content = readFileSync('src/features/builtin-skills/superpowered.md', 'utf-8');
  expect(content).toContain('brainstorming');
  expect(content).toContain('using-git-worktrees');
  expect(content).toContain('writing-plans');
  expect(content).toContain('finishing-a-development-branch');
});
