<template>
  <div class="myIndex">
    <div class="header">
      <img src="/public/mine/默认头像.jpg" alt="背景图片" />
      <div class="back" @click="goToBack">
        <img src="/public/mine/方向箭头-向左.svg" alt="返回">
      </div>
      <div class="more">
        <img src="/public/mine/省略号.svg" alt="">
      </div>
    </div>
    <div class="footer">
      <div class="info">
        <div class="left">
          <img src="/public/mine/默认头像.jpg" alt="头像" />
        </div>
        <div class="right" @click="goToEditInfo">
          <span>资料待完善<span>20%</span></span>
        </div>
      </div>
      <div class="content">
        <div class="tab">
          <template v-for="(tab, index) in tabs" :key="index">
            <div class="item" @click="setCurrentTabIndex(index)">
              <span :class="{ active: index === currentTabIndex }">{{
                tab
              }}</span>
              <div :class="{ underline: true, isDisplay: index === 0 }"></div>
            </div>
          </template>
        </div>
        <div class="article">
          <div class="page">主页</div>
          <div class="page">动态</div>
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

// 默认列表
let tabs = ref(["主页", "动态"]);
// 当前tab索引
let currentTabIndex = ref(0);
// tab的dom节点
let itemEl = null;
// tab的宽度
let itemWidth = null;
// 滑块dom节点
let underlineEl = null;
// 文章dom节点
let articleEl = null;
// page宽度
let pageWidth = null;

onMounted(() => {
  // 获取dom节点
  itemEl = document.querySelector(".item");
  itemWidth = itemEl.offsetWidth;
  underlineEl = document.querySelector(".underline");
  pageWidth = document.querySelector(".page").offsetWidth;
  articleEl = document.querySelector(".article");
  // 触摸事件数据初始化
  dataInit(currentTabIndex.value, pageWidth, articleEl, tabs.value.length - 1);
  // 监听触摸事件
  articleEl.addEventListener("touchstart", touchstart);
  articleEl.addEventListener("touchmove", touchmove);
  articleEl.addEventListener("touchend", touchend);
});

// 设置新的索引
const setCurrentTabIndex = (index) => {
  currentTabIndex.value = index;
};
// 对currentTabIndex进行监听
watch(currentTabIndex, (value) => {
  underlineEl.style.transform = `translateX(${value * itemWidth}px)`;
  articleEl.style.transform = `translateX(${-value * pageWidth}px)`;
});
// 对pageIndex进行监听
watch(pageIndex, (value) => {
  currentTabIndex.value = value;
});

// 跳转到编辑页
const goToEditInfo = () => {
  router.push({
    path: "/editInfo",
  });
};

// 返回上一页
const goToBack = () => {
  router.back()
}
</script>

<style src="./css/myIndex.css" scoped></style>
