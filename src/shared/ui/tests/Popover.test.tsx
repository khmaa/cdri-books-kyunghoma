import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Popover } from '../Popover';

describe('Popover', () => {
  it('open=false 면 렌더하지 않는다', () => {
    render(
      <Popover open={false} onClose={() => {}}>
        <div>내용</div>
      </Popover>,
    );
    expect(screen.queryByText('내용')).not.toBeInTheDocument();
  });

  it('open=true 면 children 을 렌더한다', () => {
    render(
      <Popover open onClose={() => {}}>
        <div>내용</div>
      </Popover>,
    );
    expect(screen.getByText('내용')).toBeInTheDocument();
  });

  it('Esc 키로 onClose 를 호출한다', async () => {
    const onClose = vi.fn();
    render(
      <Popover open onClose={onClose}>
        <div>내용</div>
      </Popover>,
    );
    await userEvent.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalled();
  });

  it('외부 클릭 시 onClose 를 호출한다', async () => {
    const onClose = vi.fn();
    render(
      <div>
        <Popover open onClose={onClose}>
          <span>popup</span>
        </Popover>
        <button>바깥</button>
      </div>,
    );
    await userEvent.click(screen.getByText('바깥'));
    expect(onClose).toHaveBeenCalled();
  });

  it('열릴 때 첫 input 에 자동 포커스한다', () => {
    render(
      <Popover open onClose={() => {}}>
        <input placeholder="검색어 입력" />
      </Popover>,
    );
    expect(screen.getByPlaceholderText('검색어 입력')).toHaveFocus();
  });
});
