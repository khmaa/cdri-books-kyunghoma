import { describe, expect, it } from 'vitest';
import { cn } from '../cn';

describe('cn', () => {
  it('여러 클래스를 합친다', () => {
    expect(cn('a', 'b')).toBe('a b');
  });

  it('falsy 값을 무시한다', () => {
    expect(cn('a', false, undefined, null, 'b')).toBe('a b');
  });

  it('충돌하는 tailwind 유틸은 뒤의 값으로 덮어쓴다', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4');
  });
});
