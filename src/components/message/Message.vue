<template>
  <div class="message">
    <div class="header">
      <div class="title">
        <span>私信</span>
      </div>
      <div class="more">
        <img src="/public/message/加.svg" alt="" />
      </div>
    </div>
    <div class="tab">
      <template v-for="(tab, index) in tabs" :key="index">
        <div class="item" @click="setCurrentTabIndex(index)">
          <span :class="{ active: index === currentTabIndex }">{{ tab }}</span>
          <div :class="{ underline: true, isDisplay: index === 0 }"></div>
        </div>
      </template>
    </div>
    <div class="bottom">
      <div class="page">
        <div class="message-box" @click="goToChat">
          <div class="left">
            <div class="img">
              <img src="/public/mine/默认头像.jpg" alt="" />
            </div>
          </div>
          <div class="right">
            <div class="top">
              <span>名称</span>
              <span>2024/12/16</span>
            </div>
            <div class="bottom">
              <span>最后一条消息</span>
            </div>
          </div>
        </div>
      </div>
      <div class="page">
        <div class="message-box">
          <div class="left">
            <div class="img">
              <img src="/public/mine/默认头像.jpg" alt="" />
            </div>
          </div>
          <div class="right">
            <div class="top">
              <span>名称</span>
              <span>2024/12/16</span>
            </div>
            <div class="bottom">
              <span>你好啊，我是你的粉丝</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import {
  dataInit,
  touchstart,
  touchmove,
  touchend,
  pageIndex,
} from "@/utils/sliding";
import router from "@/router";
// 选择菜单
let tabs = ref(["互关私信", "粉丝来信"]);
// 当前tab的索引
let currentTabIndex = ref(0);

let underlineEl = null;
let itemEl = null;
let bottomEl = null;
let pageEl = null;
// 一个tab的宽度
let boxWidth = 0;
// 一个页面的宽度
let pageWidth = 0;

onMounted(() => {
  // 获取DOM节点
  underlineEl = document.querySelector(".underline");
  itemEl = document.querySelector(".item");
  bottomEl = document.querySelector(".bottom");
  pageEl = document.querySelector(".page");
  // 获取tab宽度
  boxWidth = itemEl.offsetWidth;
  // 获取页面宽度
  pageWidth = pageEl.offsetWidth;

  // 触摸事件数据初始化
  dataInit(currentTabIndex.value, pageWidth, bottomEl, tabs.value.length - 1);
  // 监听触摸事件
  bottomEl.addEventListener("touchstart", touchstart);
  bottomEl.addEventListener("touchmove", touchmove);
  bottomEl.addEventListener("touchend", touchend);
});

// 设置新的索引
const setCurrentTabIndex = (index) => {
  currentTabIndex.value = index;
};
// 对tab索引进行监听
watch(currentTabIndex, (value) => {
  underlineEl.style.transform = `translateX(${value * boxWidth}px)`;
  bottomEl.style.transform = `translateX(${-value * pageWidth}px)`;
});
// 对触摸监听中的pageIndex进行监听
watch(pageIndex, (value) => {
  currentTabIndex.value = value;
});

</script>

<style src="./css/message.css" scoped></style>
