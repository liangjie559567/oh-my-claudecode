import { readFileSync } from 'fs';
import { join } from 'path';

test('executor prompt contains TDD iron law', () => {
  const prompt = readFileSync(join('agents', 'executor.md'), 'utf-8');
  expect(prompt).toContain('NO PRODUCTION CODE WITHOUT A FAILING TEST');
});

test('deep-executor prompt contains TDD iron law', () => {
  const prompt = readFileSync(join('agents', 'deep-executor.md'), 'utf-8');
  expect(prompt).toContain('NO PRODUCTION CODE WITHOUT A FAILING TEST');
});
