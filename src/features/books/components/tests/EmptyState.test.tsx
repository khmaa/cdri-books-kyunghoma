import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { EmptyState } from '../EmptyState';

describe('EmptyState', () => {
  it('전달한 메시지를 렌더한다', () => {
    render(<EmptyState message="검색된 결과가 없습니다." />);
    expect(screen.getByText('검색된 결과가 없습니다.')).toBeInTheDocument();
  });
});
