import { describe, expect, it } from 'vitest';
import { joinAuthors } from '../joinAuthors';

describe('joinAuthors', () => {
  it('여러 저자를 쉼표로 연결한다', () => {
    expect(joinAuthors(['기시미 이치로', '고가 후미타케'])).toBe('기시미 이치로, 고가 후미타케');
  });

  it('단일 저자는 그대로 반환한다', () => {
    expect(joinAuthors(['무라카미 하루키'])).toBe('무라카미 하루키');
  });

  it('저자가 없으면 빈 문자열을 반환한다', () => {
    expect(joinAuthors([])).toBe('');
  });
});
