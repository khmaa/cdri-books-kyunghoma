# CERTICOS BOOKS

카카오 도서 검색 API를 활용한 도서 검색 및 찜하기 SPA입니다.

---

## 진행 상황

| Phase | 내용                                     | 상태       |
| ----- | ---------------------------------------- | ---------- |
| 0     | 프로젝트 부트스트랩                      | ✅ 완료    |
| 1     | 라우팅 + 레이아웃 + 디자인 토큰 + 아이콘 | ✅ 완료    |
| 2     | Kakao API 클라이언트 + 기본 검색         | ✅ 완료    |
| 3     | 상세보기 Accordion                       | ✅ 완료    |
| 4     | 상세 검색 (popup)                        | ✅ 완료    |
| 5     | 최근 검색어                              | ✅ 완료    |
| 6     | 찜하기 + 내가 찜한 책 페이지             | ✅ 완료    |
| 7     | 무한 스크롤 + Prefetch                   | ✅ 완료    |
| 8     | 디테일 / 폴리시                          | 🚧 진행 중 |
| 9     | 테스트 (선택)                            | ⏭ 보류    |
| 10    | 최종 README + 제출                       | 🚧 진행 중 |

---

## 1. 프로젝트 개요

카카오 Daum 도서 검색 API를 활용한 SPA로, 도서 검색 및 찜하기 기능을 제공합니다.

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
├── shared/
│   └── ui/                     # 공용 UI 컴포넌트 (Header, Icons)
├── assets/icons/               # 피그마 export SVG 9종
└── styles/index.css            # Tailwind v4 + @theme 디자인 토큰
```

---

## 4. 라이브러리 선택 이유

| 라이브러리           | 선택 이유                                                                      |
| -------------------- | ------------------------------------------------------------------------------ |
| **React Query**      | 서버 상태 관리 및 캐시 자동화 (Phase 2~에서 활용 예정)                         |
| **Tailwind v4**      | `@theme`으로 디자인 토큰 ↔ 유틸 직결, 임의 값 사용 0                           |
| **React Router 7**   | 탭을 URL로 보존 (새로고침 / 뒤로가기 자연스러움)                               |
| **vite-plugin-svgr** | 피그마 SVG를 `?react` import로 컴포넌트화, `currentColor`로 Tailwind 토큰 연동 |
| **lucide-react**     | 로딩 스피너(`Loader2`) 1종 한정 사용 예정                                      |
