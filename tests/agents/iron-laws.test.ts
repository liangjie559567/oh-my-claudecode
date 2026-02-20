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

test('verifier prompt contains verification iron law', () => {
  const prompt = readFileSync(join('agents', 'verifier.md'), 'utf-8');
  expect(prompt).toContain('NO COMPLETION CLAIMS WITHOUT FRESH VERIFICATION');
});

test('debugger prompt contains debugging iron law', () => {
  const prompt = readFileSync(join('agents', 'debugger.md'), 'utf-8');
  expect(prompt).toContain('NO FIXES WITHOUT ROOT CAUSE INVESTIGATION');
});
