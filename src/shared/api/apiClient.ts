import axios from 'axios';

const KAKAO_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;

if (!KAKAO_REST_API_KEY) {
  // 빌드/dev 진입 시 즉시 경고 — 빈 키로 호출 시 디버깅 비용 절감
  console.warn('VITE_KAKAO_REST_API_KEY 가 비어있습니다. .env 확인.');
}

export const kakaoApi = axios.create({
  baseURL: 'https://dapi.kakao.com',
  headers: {
    Authorization: `KakaoAK ${KAKAO_REST_API_KEY}`,
  },
});

kakaoApi.interceptors.response.use(
  (response) => response,
  (error) => {
    // 가공된 에러 메시지를 React Query 로 전파
    if (error.response) {
      return Promise.reject(new Error(error.response.data?.message ?? '요청 실패'));
    }
    return Promise.reject(error);
  },
);
