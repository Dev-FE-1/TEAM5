/**
 * 출퇴근 시간을 통해 근무 상태를 도출해주는 함수
 *
 * @param {string} arriveTime - 출근 숫자
 * @param {string} leaveTime - 퇴근 숫자
 * @returns {string} 직원의 근태 상태
 */
const setCommuteStatus = (arriveTime, leaveTime) => {
  if (!arriveTime && !leaveTime) return "결근";
  if (arriveTime > "09:00") return "지각";
  if (leaveTime < "18:00") return "조퇴";
  return "정상";
};

export default setCommuteStatus