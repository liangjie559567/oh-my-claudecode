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

// 边界测试：Iron Law 包含 disable 说明
test('executor iron law contains OMC_SKIP_IRON_LAWS disable instruction', () => {
  const prompt = readFileSync(join('agents', 'executor.md'), 'utf-8');
  expect(prompt).toContain('OMC_SKIP_IRON_LAWS');
});

test('verifier iron law contains OMC_SKIP_IRON_LAWS disable instruction', () => {
  const prompt = readFileSync(join('agents', 'verifier.md'), 'utf-8');
  expect(prompt).toContain('OMC_SKIP_IRON_LAWS');
});

test('debugger iron law contains escalation rule', () => {
  const prompt = readFileSync(join('agents', 'debugger.md'), 'utf-8');
  expect(prompt).toContain('architect');
});

// 集成测试：Iron Law 引用 superpowers skill
test('executor iron law references superpowers:test-driven-development', () => {
  const prompt = readFileSync(join('agents', 'executor.md'), 'utf-8');
  expect(prompt).toContain('superpowers:test-driven-development');
});

test('verifier iron law references superpowers:verification-before-completion', () => {
  const prompt = readFileSync(join('agents', 'verifier.md'), 'utf-8');
  expect(prompt).toContain('superpowers:verification-before-completion');
});

test('debugger iron law references superpowers:systematic-debugging', () => {
  const prompt = readFileSync(join('agents', 'debugger.md'), 'utf-8');
  expect(prompt).toContain('superpowers:systematic-debugging');
});
