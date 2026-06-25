import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { BookCover } from '../BookCover';

describe('BookCover', () => {
  it('정상 src 면 이미지를 렌더한다', () => {
    render(<BookCover src="https://example.com/c.jpg" alt="책 표지" />);
    expect(screen.getByRole('img', { name: '책 표지' })).toBeInTheDocument();
  });

  it('src 가 비어있으면 placeholder 를 렌더한다', () => {
    render(<BookCover src="" alt="책 표지" />);
    expect(screen.getByText('이미지 없음')).toBeInTheDocument();
  });

  it('이미지 로드 실패 시 placeholder 로 대체한다', () => {
    render(<BookCover src="https://example.com/broken.jpg" alt="책 표지" />);
    fireEvent.error(screen.getByRole('img'));
    expect(screen.getByText('이미지 없음')).toBeInTheDocument();
  });
});
