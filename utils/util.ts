  // 작성 시간 파서
  export const compareDate = (date: string) => {
    const dateObj = new Date(date);
    const now = new Date();
    const diff = now.getTime() - dateObj.getTime();
    const day = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hour = Math.floor(diff / (1000 * 60 * 60));
    const minute = Math.floor(diff / (1000 * 60));
    if (day > 0) {
      return date.slice(2, 10);
    } else if (hour > 0) {
      return `${hour}시간 전`;
    } else if (minute > 0) {
      return `${minute}분 전`;
    } else {
      return `방금 전`;
    }
  };