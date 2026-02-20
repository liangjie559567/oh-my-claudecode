import { detectMagicKeywords } from '../../src/features/magic-keywords.js';

test('superpowered keywords trigger superpowered skill', () => {
  expect(detectMagicKeywords('superpowered build me a feature')).toContain('superpowered');
  expect(detectMagicKeywords('quality-gated implementation')).toContain('quality-gated');
});
