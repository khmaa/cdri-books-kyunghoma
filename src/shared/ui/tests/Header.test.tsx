import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';
import { Header } from '../Header';

describe('Header', () => {
  it('로고와 두 탭을 렌더한다', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
    expect(screen.getByText('Kakao Book Store')).toBeInTheDocument();
    expect(screen.getByText('도서 검색')).toBeInTheDocument();
    expect(screen.getByText('내가 찜한 책')).toBeInTheDocument();
  });

  it('탭이 라우트 링크로 연결된다', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
    expect(screen.getByRole('link', { name: '내가 찜한 책' })).toHaveAttribute(
      'href',
      '/favorites',
    );
  });
});
