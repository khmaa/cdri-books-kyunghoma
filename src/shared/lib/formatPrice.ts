/** 13300 → "13,300원" */
export function formatPrice(price: number): string {
  return `${price.toLocaleString('ko-KR')}원`;
}
