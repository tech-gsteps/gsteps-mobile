// 格式化后日期为：yyyy-MM-dd HH:mm:ss
export const formatAllDate = function (sDate) {
  const date = new Date(sDate);
  const seperator1 = '/';
  const seperator2 = ':';
  let month = date.getMonth() + 1;
  let strDate = date.getDate();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  // 月
  if (month >= 1 && month <= 9) {
    month = `0${month}`;
  }
  // 日
  if (strDate >= 0 && strDate <= 9) {
    strDate = `0${strDate}`;
  }
  // 时
  if (hours >= 0 && hours <= 9) {
    hours = `0${hours}`;
  }
  // 分
  if (minutes >= 0 && minutes <= 9) {
    minutes = `0${minutes}`;
  }
  // 秒
  if (seconds >= 0 && seconds <= 9) {
    seconds = `0${seconds}`;
  }
  // 格式化后日期为：yyyy-MM-dd HH:mm:ss
  const currentdate = `${date.getFullYear() + seperator1 + month + seperator1 + strDate
  } ${hours}${seperator2}${minutes}`;
  return currentdate;
};
