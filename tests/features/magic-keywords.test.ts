import { detectMagicKeywords, createMagicKeywordProcessor, extractPromptText } from '../../src/features/magic-keywords.js';

test('superpowered keywords trigger superpowered skill', () => {
  expect(detectMagicKeywords('superpowered build me a feature')).toContain('superpowered');
  expect(detectMagicKeywords('quality-gated implementation')).toContain('quality-gated');
});

// 边界测试
test('unrelated input does not trigger superpowered', () => {
  const result = detectMagicKeywords('build me a feature');
  expect(result).not.toContain('superpowered');
  expect(result).not.toContain('quality-gated');
});

test('empty string returns no keywords', () => {
  expect(detectMagicKeywords('')).toHaveLength(0);
});

test('superpowered keyword is case-insensitive', () => {
  expect(detectMagicKeywords('SUPERPOWERED mode')).toContain('superpowered');
});

// 集成测试：quality-gated 触发（注意 \b 不匹配连字符，需单独出现）
test('quality-gated at start of message triggers keyword', () => {
  expect(detectMagicKeywords('quality-gated')).toContain('quality-gated');
});

// createMagicKeywordProcessor
test('processor applies ultrawork enhancement', () => {
  const process = createMagicKeywordProcessor();
  const result = process('ultrawork build a feature');
  expect(result).toContain('ULTRAWORK MODE ENABLED');
});

test('processor applies search enhancement', () => {
  const process = createMagicKeywordProcessor();
  const result = process('find all usages of this function');
  expect(result).toContain('search-mode');
});

test('processor applies analyze enhancement', () => {
  const process = createMagicKeywordProcessor();
  const result = process('analyze this codebase');
  expect(result).toContain('analyze-mode');
});

test('processor applies ultrathink enhancement', () => {
  const process = createMagicKeywordProcessor();
  const result = process('ultrathink about this problem');
  expect(result).toContain('ULTRATHINK MODE');
});

test('processor returns prompt unchanged when no keyword matches', () => {
  const process = createMagicKeywordProcessor();
  expect(process('hello world')).toBe('hello world');
});

test('processor respects config overrides for ultrawork', () => {
  const process = createMagicKeywordProcessor({ ultrawork: ['supermode'] });
  expect(process('supermode now')).toContain('ULTRAWORK MODE ENABLED');
});

test('processor respects config overrides for search', () => {
  const process = createMagicKeywordProcessor({ search: ['lookup'] });
  expect(process('lookup something')).toContain('search-mode');
});

test('processor respects config overrides for analyze', () => {
  const process = createMagicKeywordProcessor({ analyze: ['inspect'] });
  expect(process('inspect this')).toContain('analyze-mode');
});

test('search enhancement skips non-search prompts', () => {
  const process = createMagicKeywordProcessor();
  const result = process('build a feature');
  expect(result).not.toContain('search-mode');
});

test('analyze enhancement skips non-analyze prompts', () => {
  const process = createMagicKeywordProcessor();
  const result = process('build a feature');
  expect(result).not.toContain('analyze-mode');
});

test('ultrathink enhancement skips non-think prompts', () => {
  const process = createMagicKeywordProcessor();
  const result = process('build a feature');
  expect(result).not.toContain('ULTRATHINK MODE');
});

// extractPromptText
test('extractPromptText joins text parts', () => {
  const parts = [
    { type: 'text', text: 'hello' },
    { type: 'image', data: 'base64' },
    { type: 'text', text: 'world' },
  ];
  expect(extractPromptText(parts)).toBe('hello\nworld');
});

test('extractPromptText returns empty string for no text parts', () => {
  expect(extractPromptText([{ type: 'image', data: 'x' }])).toBe('');
});

test('extractPromptText handles missing text field', () => {
  expect(extractPromptText([{ type: 'text' }])).toBe('');
});

// code block stripping
test('keywords inside code blocks are not detected', () => {
  const result = detectMagicKeywords('```\nultrawork\n```');
  expect(result).not.toContain('ultrawork');
});

test('keywords inside inline code are not detected', () => {
  const result = detectMagicKeywords('use `ultrawork` carefully');
  expect(result).not.toContain('ultrawork');
});

// detectMagicKeywords with config overrides
test('detectMagicKeywords respects config ultrawork override', () => {
  expect(detectMagicKeywords('supermode now', { ultrawork: ['supermode'] })).toContain('supermode');
});

test('detectMagicKeywords respects config search override', () => {
  expect(detectMagicKeywords('lookup something', { search: ['lookup'] })).toContain('lookup');
});

test('detectMagicKeywords respects config analyze override', () => {
  expect(detectMagicKeywords('inspect this', { analyze: ['inspect'] })).toContain('inspect');
});

test('detectMagicKeywords respects config ultrathink override', () => {
  expect(detectMagicKeywords('deepthink now', { ultrathink: ['deepthink'] })).toContain('deepthink');
});
