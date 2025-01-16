/**
 * 支持监听触摸事件
 * 应用于水平滑动切换内容
 */

/**
 * 触摸事件需要的相关数据
 */
import { ref } from "vue";
// 触摸起点
let startX = 0;
// 触摸终点
let endX = 0;
// 触摸距离
let distanceX = 0;
// 当前页面索引
let pageIndex = ref(0);
// 是否具备滑动切换的资格
let isMove = false;
// 当前页面宽度
let pageWidth = 0;
// 当前页面dom
let boxEl = null;
// 当前页面长度
let length = 0;

/**
 * 如果有加载下过的话
 * 需要额外配置这几个变量进行控制
 */
// 下滑的起点
let startY = 0;
// 下滑的终点
let endY = 0;
// 下滑的距离
let distanceY = 0;

// 数据初始化
const dataInit = (currentTabIndex, width, bottomEl, arrayLength) => {
  (pageIndex.value = currentTabIndex),
    (pageWidth = width),
    (boxEl = bottomEl),
    (length = arrayLength);
};

/**
 * 事件监听
 */
// 开始触摸
const touchstart = (event) => {
  startX = event.touches[0].clientX;
  startY = event.touches[0].pageY;
};
// 触摸过程
const touchmove = (event) => {
  endX = event.touches[0].clientX;
  endY = event.touches[0].pageY;
  distanceX = endX - startX;
  distanceY = endY - startY;
  if (
    (distanceX > 0 && pageIndex.value === 0) ||
    (distanceX < 0 && pageIndex.value === length)
  ) {
    return;
  }
  // 滑动距离太短就不滑动，不然页面移动太敏感
  // if (Math.abs(distanceX) >= 50) {

  // }
  if (Math.abs(distanceY) < 10) {
    move(-pageIndex.value * pageWidth + distanceX);
    isMove = true;
  }
};
// 触摸结束
const touchend = () => {
  if (isMove) {
    if (Math.abs(distanceX) >= pageWidth / 3) {
      if (distanceX > 0) {
        pageIndex.value--;
      }
      if (distanceX < 0) {
        pageIndex.value++;
      }
    }
    move(-pageIndex.value * pageWidth);
  }
  isMove = false;
  startX = 0;
  distanceX = 0;
  endX = 0;

  startY = 0;
  distanceY = 0;
  endY = 0;
};
// 滑动函数
const move = (transX) => {
  boxEl.style.transform = `translateX(${transX}px)`;
};

export { dataInit, touchstart, touchmove, touchend, pageIndex };
