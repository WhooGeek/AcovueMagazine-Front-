export function formatTime(timestamp) {
  const now = new Date();
  const date = new Date(timestamp);

  const diffMs = now - date; // 두 시간 차이 (밀리초)
  const diffMin = Math.floor(diffMs / (1000 * 60)); // 분 단위 변환

  // 1시간 이내 → "n분 전"
  if (diffMin < 60) {
    return `${diffMin}분 전`;
  }

  // 1시간 이상 → YYYY-MM-DD 형식
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}년 ${month}월 ${day}일`;
}
