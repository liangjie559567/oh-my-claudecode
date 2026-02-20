import { detectMagicKeywords } from '../../src/features/magic-keywords.js';

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
