# Kakao Book Store

카카오 도서 검색 API를 활용한 **도서 검색 + 찜하기 SPA**입니다.
React 19 · TypeScript · React Query 기반으로, 무한 스크롤 검색 · 상세보기 아코디언 · 상세 검색 popup · 최근 검색어 · 찜하기를 제공합니다.

---

## 1. 프로젝트 개요

카카오 Daum 도서 검색 API로 책을 검색하고, 마음에 드는 책을 찜해 모아보는 단일 페이지 애플리케이션입니다.

- **도서 검색** — 검색어로 도서 목록 조회, 무한 스크롤로 다음 페이지 자동 로드
- **상세보기 아코디언** — 목록 항목을 인플레이스로 펼쳐 표지 · 책 소개 · 가격 표시 (한 번에 하나만)
- **상세 검색 popup** — 제목 / 저자명 / 출판사 필드를 지정한 정밀 검색
- **최근 검색어** — 검색 기록을 저장하고 검색창에서 다시 선택 (localStorage 영속)
- **찜하기 / 내가 찜한 책** — 책을 찜하고 별도 페이지에서 모아보기 (localStorage 영속)

---

## 2. 실행 방법 및 환경 설정

**요구 환경**: Node.js 20.19+ (또는 22.12+)

```bash
# 1. 패키지 설치
npm install

# 2. 환경 변수 설정
cp .env.example .env
# .env 파일에 카카오 REST API 키 입력
# VITE_KAKAO_REST_API_KEY=발급받은_REST_API_키

# 3. 개발 서버 실행 (http://localhost:5173)
npm run dev

# 4. 프로덕션 빌드 / 미리보기
npm run build
npm run preview

# 5. 테스트 / 커버리지
npm test              # 전체 테스트 1회 실행
npm run test:watch    # watch 모드
npm run test:coverage # 커버리지 리포트 (터미널 + coverage/ HTML)
```

> 카카오 REST API 키는 [Kakao Developers](https://developers.kakao.com) → 내 애플리케이션 → 앱 키 → **REST API 키**에서 발급합니다.

---

## 3. 폴더 구조 및 주요 코드 설명

FSD(Feature-Sliced Design)-lite 구조로, **도메인 단위(`features/books`)와 공용 레이어(`shared`)를 분리**했습니다.

```
src/
├── app/                          # 앱 진입 · 글로벌 설정
│   ├── App.tsx                   # Providers + Router 조립
│   ├── providers.tsx             # QueryClientProvider (staleTime 5분, gcTime 30분)
│   └── router.tsx                # createBrowserRouter (/ , /favorites)
├── pages/                        # 라우트 페이지 (default export)
│   ├── BookSearchPage.tsx        # 도서 검색
│   └── FavoritesPage.tsx         # 내가 찜한 책
├── features/books/               # 도서 도메인
│   ├── api/                      # API 호출 + React Query 훅
│   │   ├── kakaoBookApi.ts       # 검색 요청 함수
│   │   ├── queryKeys.ts          # 쿼리키 팩토리 (인라인 배열 금지)
│   │   └── useBookSearch.ts      # useInfiniteQuery 훅
│   ├── components/               # 도메인 컴포넌트
│   │   ├── SearchBar.tsx         # 검색창 + 돋보기 + 상세검색 버튼/popup
│   │   ├── AdvancedSearchPopover.tsx  # 상세 검색 popup
│   │   ├── RecentKeywords.tsx    # 최근 검색어 드롭다운
│   │   ├── BookList.tsx          # 목록 + 무한 스크롤 sentinel
│   │   ├── BookListItem.tsx      # 한 줄형 항목 ↔ 아코디언 토글
│   │   ├── BookDetailPanel.tsx   # 펼친 상세 영역
│   │   ├── BookCover.tsx         # 표지 (로드 실패 시 fallback)
│   │   ├── FavoriteHeartButton.tsx    # 찜 토글 버튼
│   │   └── EmptyState.tsx        # 빈 상태 (검색/찜 공용)
│   ├── store/                    # Zustand + persist
│   │   ├── favoritesStore.ts     # 찜 목록
│   │   └── recentKeywordsStore.ts  # 최근 검색어
│   ├── constants/search.ts       # PAGE_SIZE, MAX_RECENT, STORAGE_KEY
│   └── types/book.ts             # KakaoBook, SearchTarget 등
├── shared/                       # 도메인 비의존 공용 레이어
│   ├── api/apiClient.ts          # axios 인스턴스 (KakaoAK 헤더 · 에러 가공 인터셉터)
│   ├── lib/                      # cn(clsx+tailwind-merge), formatPrice, joinAuthors
│   └── ui/                       # 재사용 UI (Button, Popover, Select, TextInput, Icons, Header)
└── styles/index.css              # Tailwind v4 @theme 디자인 토큰
```

### 설계 회고

- **FSD-lite 구조** — 도서 도메인 로직을 `features/books`에 응집하고, 어디서나 쓰이는 UI/유틸은 `shared`로 분리해 의존 방향을 단방향(`features → shared`)으로 유지했습니다.
- **상태 3분할** — 서버 상태는 **React Query**(`useInfiniteQuery`), 브라우저 재시작 후에도 남아야 하는 영속 상태(찜·최근 검색어)는 **Zustand + persist**, 아코디언 열림/popup 표시 같은 일시 상태는 **`useState`**로 분리했습니다.
- **재사용 컴포넌트 추상화** — `cn()`(clsx + tailwind-merge) 위에 `Button`(variant), `Popover`, `Select`, `TextInput`을 만들어 마크업 중복을 제거하고, 네이티브 HTML 속성을 그대로 확장할 수 있게 했습니다.
- **성능** — 무한 스크롤은 `IntersectionObserver`의 `rootMargin: 600px`로 바닥 도달 **전에** 선행 로드하고, `staleTime: 5분`으로 같은 검색어 재진입 시 네트워크 요청이 0입니다. 도서 데이터는 거의 정적이라 5분 캐시가 적절합니다.

---

## 4. 라이브러리 선택 이유

| 라이브러리                | 선택 이유                                                                        |
| ------------------------- | -------------------------------------------------------------------------------- |
| **React Query**           | 서버 상태 · 무한 쿼리(`useInfiniteQuery`) · 캐시(`staleTime`)를 선언적으로 처리  |
| **Zustand + persist**     | 보일러플레이트 최소, `localStorage` 자동 동기화로 찜·최근 검색어 영속            |
| **Tailwind v4**           | `@theme`으로 디자인 토큰 ↔ 유틸 클래스 직결, 임의 hex/px 값 사용 0               |
| **clsx + tailwind-merge** | `cn()` 헬퍼로 조건부 클래스 + 유틸 충돌 해소 → 재사용 컴포넌트의 className 확장  |
| **React Router 7**        | 탭을 URL로 보존 (새로고침 / 뒤로가기 자연스러움)                                 |
| **axios**                 | 인터셉터로 `KakaoAK` 인증 헤더 주입과 에러 가공을 한 곳에 집중                   |
| **lucide-react**          | 로딩 스피너(`Loader2`) 1종만 사용. 그 외 아이콘은 피그마 SVG를 svgr로 컴포넌트화 |
| **vite-plugin-svgr**      | 피그마 export SVG를 `?react` import로 컴포넌트화 — `currentColor`로 토큰과 연동  |

---

## 5. 강조하고 싶은 기능

- **무한 스크롤 선행 로드** — `useInfiniteQuery` + `IntersectionObserver(rootMargin: 600px)`로 바닥에 닿기 전에 다음 페이지를 미리 불러와 끊김 없는 스크롤. 남은 페이지가 있는 동안 하단 스피너로 로딩을 명시.
- **캐시 최적화** — `staleTime: 5분`으로 같은 검색어 재진입 시 네트워크 0, `keepPreviousData`로 검색어 전환 시 빈 화면 깜빡임 제거.
- **재사용 가능한 컴포넌트 설계** — `Button`/`Popover`/`Select`/`TextInput`을 `cn()` + variant 패턴으로 추상화해, 구매하기·상세보기·상세검색·검색하기 버튼이 한 컴포넌트로 재사용됩니다. `BookList`/`EmptyState`는 검색·찜 페이지 양쪽에서 공유됩니다.
- **디자인 토큰 일원화** — 색상·타이포·radius를 `@theme` 토큰으로 정의하고 `text-title1`, `bg-primary` 같은 유틸로만 사용 — 컴포넌트에 임의 값 0.
- **상세보기 아코디언** — 라우팅 없이 목록 항목을 인플레이스로 펼치고, 한 번에 하나만 열리도록 단일 상태로 제어.
- **상세 검색 popup** — 상세검색 버튼 하단에 popup으로 노출. 메인 검색과 동시 진행이 불가(외부 클릭 시 닫힘)하도록 해 두 검색 흐름을 명확히 분리.
- **영속 상태** — 최근 검색어·찜 목록을 `localStorage`에 저장해 브라우저 재시작 후에도 유지.
- **견고한 표지 처리** — 표지 URL이 없거나 로드 실패 시 placeholder로 대체(`BookCover`), 모든 이미지 `loading="lazy"`.

---

## 6. 추후 개선 (TODO)

- 정렬 옵션(정확도순 / 발간일순) UI 노출 — 카카오 API `sort` 파라미터로 즉시 확장 가능
- 모바일 본격 반응형 (헤더 햄버거화, 카드 세로 스택) — 현재는 데스크탑 기준
- 정렬/필터 등 기능 확장 시 E2E 테스트(Playwright) 도입
- 페이지 진입 / popup 트랜지션 애니메이션

> **테스트**: Vitest + React Testing Library로 단위·통합 테스트 73개를 작성했습니다 (커버리지 statements 88% / lines 90%). 공용 UI(`Button`/`Popover`/`Select`/`TextInput`), 도메인 컴포넌트(`SearchBar`/`BookList`/`BookDetailPanel`/`FavoriteHeartButton` 등), store(`favoritesStore`/`recentKeywordsStore`), 훅(`useBookSearch`), 검색 페이지 흐름을 커버합니다. `npm run test:coverage`로 리포트를 확인할 수 있습니다.
