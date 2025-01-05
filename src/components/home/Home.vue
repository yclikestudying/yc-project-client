<template>
  <div class="home">
    <div class="title"></div>
    <div class="content">
      <div class="top">
        <div class="left">
          <template v-for="(tab, index) in tabs" :key="index">
            <div class="tab" @click="setCurrentTabIndex(index)">
              <span :class="{ active: index === currentTabIndex }">{{
                tab
              }}</span>
              <div :class="{ underline: true, isDisplay: index === 0 }"></div>
            </div>
          </template>
        </div>
        <div class="right">
          <img src="/public/home/搜索.svg" alt="" />
        </div>
      </div>
      <div class="bottom">
        <van-pull-refresh v-model="loading1" @refresh="onRefresh1">
          <div class="page">
            <span>圈子动态</span>
          </div>
        </van-pull-refresh>
        <van-pull-refresh v-model="loading2" @refresh="onRefresh2">
          <div class="page">
            <span>二手集市</span>
          </div>
        </van-pull-refresh>
        <van-pull-refresh v-model="loading3" @refresh="onRefresh3">
          <div class="page">
            <span>快递代取</span>
          </div>
        </van-pull-refresh>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { showToast } from "vant";
import {
  dataInit,
  touchstart,
  touchmove,
  touchend,
  pageIndex,
} from "@/utils/sliding";

// 默认数据
let tabs = ref(["圈子动态", "二手集市", "快递代取"]);
// 当前tab索引
let currentTabIndex = ref(0);
let underlineEl = null;
let bottomEl = null;
let pageEl = null;
let pageWidth = 0;
let tabEl = null;
let tabWidth = 0;
onMounted(() => {
  // 获取DOM节点
  underlineEl = document.querySelector(".underline");
  bottomEl = document.querySelector(".bottom");
  pageEl = document.querySelector(".page");
  pageWidth = pageEl.offsetWidth;
  tabEl = document.querySelector(".tab");
  tabWidth = tabEl.offsetWidth;
  // 触摸事件数据初始化
  dataInit(currentTabIndex.value, pageWidth, bottomEl, tabs.value.length - 1);
  // 监听触摸事件
  bottomEl.addEventListener("touchstart", touchstart);
  bottomEl.addEventListener("touchmove", touchmove);
  bottomEl.addEventListener("touchend", touchend);
});

// 设置新索引
const setCurrentTabIndex = (index) => {
  currentTabIndex.value = index;
};
watch(currentTabIndex, (value) => {
  let transX = value * (tabWidth + 10);
  underlineEl.style.transform = `translateX(${transX}px)`;
  bottomEl.style.transform = `translateX(${-value * pageWidth}px)`;
});
watch(pageIndex, (value) => {
  currentTabIndex.value = value
})

// 刷新
const loading1 = ref(false);
const onRefresh1 = () => {
  setTimeout(() => {
    showToast("刷新成功");
    loading1.value = false;
  }, 1000);
};
const loading2 = ref(false);
const onRefresh2 = () => {
  setTimeout(() => {
    showToast("刷新成功");
    loading2.value = false;
  }, 1000);
};
const loading3 = ref(false);
const onRefresh3 = () => {
  setTimeout(() => {
    showToast("刷新成功");
    loading3.value = false;
  }, 1000);
};
</script>

<style src="./css/home.css" scoped></style>
