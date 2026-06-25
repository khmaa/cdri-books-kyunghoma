import { describe, expect, it } from 'vitest';
import { formatPrice } from '../formatPrice';

describe('formatPrice', () => {
  it('천 단위 구분 쉼표를 넣고 "원"을 붙인다', () => {
    expect(formatPrice(13300)).toBe('13,300원');
  });

  it('백만 단위도 구분한다', () => {
    expect(formatPrice(1234567)).toBe('1,234,567원');
  });

  it('0원을 처리한다', () => {
    expect(formatPrice(0)).toBe('0원');
  });
});
