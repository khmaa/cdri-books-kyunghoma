# CERTICOS BOOKS

카카오 도서 검색 API를 활용한 도서 검색 및 찜하기 SPA입니다.

---

## 1. 프로젝트 개요

- 카카오 Daum 도서 검색 API 연동
- 검색 결과 무한 스크롤 (React Query `useInfiniteQuery`)
- 상세보기 accordion (한 번에 하나만 펼침)
- 상세 검색 모달 (제목 / 저자명 / 출판사 필터)
- 최근 검색어 드롭다운 (localStorage 영속)
- 찜하기 토글 및 찜한 책 목록 페이지 (localStorage 영속)

---

## 2. 실행 방법 및 환경 설정

**요구 환경**: Node.js 20.19+ 또는 22.12+

```bash
# 패키지 설치
npm install

# 환경 변수 설정
cp .env.example .env
# .env 파일에 VITE_KAKAO_REST_API_KEY 값 입력

# 개발 서버 실행
npm run dev

# 빌드
npm run build
```

---

## 3. 폴더 구조 및 주요 코드 설명

```
src/
├── app/                        # 앱 진입 및 글로벌 설정
│   ├── App.tsx                 # Provider + Router 조립
│   ├── providers.tsx           # QueryClientProvider
│   └── router.tsx              # createBrowserRouter (/ , /favorites)
├── pages/                      # 페이지 컴포넌트 (default export)
│   ├── BookSearchPage.tsx      # 도서 검색 페이지
│   └── FavoritesPage.tsx       # 내가 찜한 책 페이지
├── features/
│   └── books/
│       ├── api/                # API 호출 함수 + React Query 훅
│       ├── components/         # 도메인 컴포넌트
│       ├── store/              # Zustand 스토어 (찜하기, 최근검색어)
│       ├── constants/          # PAGE_SIZE, MAX_RECENT 등
│       └── types/              # KakaoBook, SearchTarget 타입
├── shared/
│   ├── api/                    # axios 인스턴스 (KakaoAK 헤더 인터셉터)
│   ├── lib/                    # formatPrice, joinAuthors 유틸
│   └── ui/                     # 공용 UI 컴포넌트 (Header, Button, Modal 등)
├── assets/icons/               # 피그마 export SVG 9종
└── styles/index.css            # Tailwind v4 + @theme 디자인 토큰
```

**상태 관리 분리 전략**

- 서버 상태: React Query (`useInfiniteQuery`) — API 응답 캐시 및 무한 스크롤
- 클라이언트 영속 상태: Zustand + persist — 찜하기 / 최근 검색어 (브라우저 재시작 후 유지)
- 일시 상태: `useState` — accordion 열림 여부, 모달 표시 등

---

## 4. 라이브러리 선택 이유

| 라이브러리            | 선택 이유                                                                      |
| --------------------- | ------------------------------------------------------------------------------ |
| **React Query**       | 서버 상태 / 무한쿼리 / `staleTime` 캐시 자동화                                 |
| **Zustand + persist** | 보일러플레이트 최소, localStorage 자동 동기화                                  |
| **Tailwind v4**       | `@theme`으로 디자인 토큰 ↔ 유틸 직결, 임의 값 사용 0                           |
| **axios**             | 인터셉터로 KakaoAK 헤더 · 에러 가공을 한 곳에 집중                             |
| **React Router 7**    | 탭을 URL로 보존 (새로고침 / 뒤로가기 자연스러움)                               |
| **lucide-react**      | 로딩 스피너(`Loader2`) 1종 한정 사용                                           |
| **vite-plugin-svgr**  | 피그마 SVG를 `?react` import로 컴포넌트화, `currentColor`로 Tailwind 토큰 연동 |

---

## 5. 강조하고 싶은 기능

- `useInfiniteQuery` + IntersectionObserver `rootMargin: 600px`으로 바닥 도달 전 다음 페이지 선행 로드
- `staleTime: 5분`으로 같은 검색어 재진입 시 네트워크 요청 0
- 디자인 토큰 → Tailwind 유틸 (`text-title1`, `bg-primary` 등) — 임의 hex / px 값 사용 없음
- accordion 인플레이스 펼침 + 하나만 펼침 정책
- 최근 검색어 / 찜하기 모두 localStorage 영속 (브라우저 재시작 후 유지)

---

## 6. 추후 개선 (TODO)

- 정렬 옵션 UI (정확도순 / 발간일순) — Kakao API `sort` 파라미터로 즉시 가능
- 모바일 본격 반응형 (햄버거 메뉴, 카드 세로 스택)
- 테스트 코드 — `useFavoritesStore`, 유틸 함수 단위 테스트 우선
- 페이지 진입 / 모달 트랜지션 애니메이션
