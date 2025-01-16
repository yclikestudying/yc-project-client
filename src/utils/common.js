import useMyStore from "@/store/useMyStore";

// 状态管理
const myStore = useMyStore();

/**
 * 计算用户信息的完善情况
 */
export const userInfoProgress = () => {
  const totle = Object.keys(myStore.userInfo).length;
  let count = 0;
  for (let item in myStore.userInfo) {
    if (
      !myStore.userInfo[`${item}`] &&
      myStore.userInfo[`${item}`] !== "userAvatar" &&
      myStore.userInfo[`${item}`] !== 0
    ) {
      count++;
    }
  }

  return Math.round(((totle - count) / totle) * 100) + "%";
};

/**
 * 计算当前时间
 */
export const formatDate = (time) => {
  let date = new Date(time); 
  let year = date.getUTCFullYear();
  let month = date.getUTCMonth() + 1; 
  let day = date.getUTCDate(); 
  let hour = date.getUTCHours();
  let minute = date.getUTCMinutes();
  let second = date.getUTCSeconds();
  month = month < 10 ? '0' + month : month;
  day = day < 10 ? '0' + day : day;
  hour = hour < 10 ? '0' + hour : hour;
  minute = minute < 10 ? '0' + minute : minute;
  second = second < 10 ? '0' + second : second;
  
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
};
