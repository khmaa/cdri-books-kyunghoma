import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// jsdom 은 IntersectionObserver 를 제공하지 않아 무한 스크롤 컴포넌트용으로 stub
class IntersectionObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}

vi.stubGlobal('IntersectionObserver', IntersectionObserverMock);
