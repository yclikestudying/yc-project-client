<template>
  <div class="share">
    <div class="top">
      <div class="title">
        <template v-for="(tab, index) in tabs" :key="index">
          <div class="item" @click="setCurrentTabIndex(index)">
            <span :class="{ active: index === currentTabIndex }">{{
              tab
            }}</span>
            <div :class="{ underline: true, isDisplay: index === 0 }"></div>
          </div>
        </template>
      </div>
    </div>
    <div class="search">
      <van-search v-model="searchContent" placeholder="请输入搜索关键词" />
    </div>
    <div class="bottom">
      <van-pull-refresh v-model="loading" @refresh="onRefresh">
        <div class="page">
          <span>关注</span>
        </div>
      </van-pull-refresh>
      <van-pull-refresh v-model="loading1" @refresh="onRefresh1">
        <div class="page">
          <span>推荐</span>
        </div>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { showToast } from "vant";
import { dataInit, touchstart, touchmove, touchend, pageIndex } from "@/utils/sliding";

const loading = ref(false);
const onRefresh = () => {
  setTimeout(() => {
    showToast("刷新成功");
    loading.value = false;
    console.log("刷新page1");
  }, 1000);
};

const loading1 = ref(false);
const onRefresh1 = () => {
  setTimeout(() => {
    showToast("刷新成功");
    loading1.value = false;
    console.log("刷新page2");
  }, 1000);
};

let itemEl = null;
let underlineEl = null;
let bottomEl = null;
let pageEl = null;
let boxWidth = 0;
let pageWidth = 0;
onMounted(() => {
  // 获取DOM节点
  itemEl = document.querySelector(".item");
  boxWidth = itemEl.offsetWidth;
  underlineEl = document.querySelector(".underline");
  pageEl = document.querySelector(".page");
  pageWidth = pageEl.offsetWidth;
  bottomEl = document.querySelector(".bottom");
  // 数据初始化
  dataInit(currentTabIndex.value, pageWidth, bottomEl, tabs.value.length - 1)
  bottomEl.addEventListener('touchstart', touchstart)
  bottomEl.addEventListener('touchmove', touchmove)
  bottomEl.addEventListener('touchend', touchend)
});

// 默认列表
let tabs = ref(["关注", "推荐"]);
// 当前tab索引
let currentTabIndex = ref(0);
// 设置新的索引
const setCurrentTabIndex = (index) => {
  currentTabIndex.value = index;
};

// 对tab进行监听，对下划线进行操作
watch(currentTabIndex, (value) => {
  let transX = 0;
  let pageTransX = 0;
  if (value !== 0) {
    transX = value * (boxWidth + 20);
  } else {
    transX = value * boxWidth;
  }
  underlineEl.style.transform = `translateX(${transX}px)`;

  pageTransX = -value * pageWidth;
  bottomEl.style.transform = `translateX(${pageTransX}px)`;
});

watch(pageIndex, (value) => {
  currentTabIndex.value = value
})

// 搜索内容
let searchContent = ref("");
</script>

<style src="./css/share.css" scoped></style>
