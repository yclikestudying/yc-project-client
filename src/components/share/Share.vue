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
    <div class="search" @click="goToSearch">
      <van-search placeholder="点击搜索" />
    </div>
    <div class="bottom">
      <van-pull-refresh
        class="refresh"
        v-model="loading"
        @refresh="onRefresh"
        :disabled="isDisabledOne"
      >
        <div class="page">
          <template v-for="item in 3">
            <div class="box">
              <div class="message-box" @click="goToChat">
                <div class="left">
                  <div class="img">
                    <img src="/public/mine/默认头像.jpg" alt="" />
                  </div>
                </div>
                <div class="right">
                  <div class="top">
                    <span>名称</span>
                    <button>关注</button>
                  </div>
                  <div class="bottom">
                    <span>2024/12/16</span>
                  </div>
                </div>
              </div>
              <div class="text">
                <div class="text-box">
                  <span
                    >有人有好看的头像吗有人有好看的头像吗有人有好看的头像吗有人有好看的头像吗有人有好看的头像吗</span
                  >
                </div>
              </div>
              <div class="img">
                <div class="img-box">
                  <img src="/public/mine/默认头像.jpg" alt="" />
                  <img src="/public/mine/默认头像.jpg" alt="" />
                  <img src="/public/mine/默认头像.jpg" alt="" />
                  <img src="/public/mine/默认头像.jpg" alt="" />
                </div>
              </div>
              <div class="function">
                <div>
                  <van-icon name="good-job-o" />
                  <span>10</span>
                </div>
                <div>
                  <van-icon name="chat-o" />
                  <span>10</span>
                </div>
                <div>
                  <van-icon name="eye-o" />
                  <span>140</span>
                </div>
              </div>
            </div>
          </template>
        </div>
      </van-pull-refresh>
      <van-pull-refresh
        class="refresh"
        v-model="loading1"
        @refresh="onRefresh1"
        :disabled="isDisabledTwo"
      >
        <div class="page">
          <template v-for="item in 3">
            <div class="box">
              <div class="message-box" @click="goToChat">
                <div class="left">
                  <div class="img">
                    <img src="/public/mine/默认头像.jpg" alt="" />
                  </div>
                </div>
                <div class="right">
                  <div class="top">
                    <span>名称</span>
                    <button>关注</button>
                  </div>
                  <div class="bottom">
                    <span>2024/12/16</span>
                  </div>
                </div>
              </div>
              <div class="text">
                <div class="text-box">
                  <span
                    >有人有好看的头像吗有人有好看的头像吗有人有好看的头像吗有人有好看的头像吗有人有好看的头像吗</span
                  >
                </div>
              </div>
              <div class="img">
                <div class="img-box">
                  <img src="/public/mine/默认头像.jpg" alt="" />
                  <img src="/public/mine/默认头像.jpg" alt="" />
                  <img src="/public/mine/默认头像.jpg" alt="" />
                  <img src="/public/mine/默认头像.jpg" alt="" />
                </div>
              </div>
              <div class="function">
                <div>
                  <van-icon name="good-job-o" />
                  <span>10</span>
                </div>
                <div>
                  <van-icon name="chat-o" />
                  <span>10</span>
                </div>
                <div>
                  <van-icon name="eye-o" />
                  <span>140</span>
                </div>
              </div>
            </div>
          </template>
        </div>
      </van-pull-refresh>
    </div>
    <div class="publish">
      <Publish @cancel="cancelPublish"></Publish>
    </div>
  </div>
  <div class="bubble">
    <van-floating-bubble
      style="--van-floating-bubble-background: var(--main-color)"
      v-model:offset="offset"
      icon="plus"
      axis="lock"
      @click="publish"
    />
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { showToast } from "vant";
import {
  dataInit,
  touchstart,
  touchmove,
  touchend,
  pageIndex,
} from "@/utils/sliding";
import Publish from "./Publish.vue";
import router from "@/router";

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
let offset = ref({});
let publishEl = null;
// 内容的dom元素
let pageEls = null;
// 刷新组件的dom元素
let refreshes = null;
// 刷新是否禁用
let isDisabledOne = ref(false);
let isDisabledTwo = ref(false);
onMounted(() => {
  // 获取DOM节点
  itemEl = document.querySelector(".item");
  boxWidth = itemEl.offsetWidth;
  underlineEl = document.querySelector(".underline");
  pageEl = document.querySelector(".page");
  pageEls = document.querySelectorAll(".page");
  refreshes = document.querySelectorAll(".refresh");
  pageEls.forEach((item) => {
    item.addEventListener("scroll", scrollY);
  });
  pageWidth = pageEl.offsetWidth;
  bottomEl = document.querySelector(".bottom");
  publishEl = document.querySelector(".publish");
  // 数据初始化
  dataInit(currentTabIndex.value, pageWidth, bottomEl, tabs.value.length - 1);
  bottomEl.addEventListener("touchstart", touchstart);
  bottomEl.addEventListener("touchmove", touchmove);
  bottomEl.addEventListener("touchend", touchend);
  // 悬浮气泡
  offset.value = { x: pageWidth * 0.8, y: pageEl.offsetHeight * 1.05 };
});

// 滚动监听
const scrollY = () => {
  if (pageEls[0].scrollTop === 0) {
    isDisabledOne.value = false;
  } else {
    isDisabledOne.value = true;
  }
  if (pageEls[1].scrollTop === 0) {
    isDisabledTwo.value = false;
  } else {
    isDisabledTwo.value = true;
  }
};

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
  currentTabIndex.value = value;
});

// 发表动态
const publish = () => {
  publishEl.style.transform = `translateY(-93vh)`;
};

// 取消发布
const cancelPublish = (flag) => {
  if (flag) {
    publishEl.style.transform = `translateY(0)`;
  }
};

// 去到搜索页面
const goToSearch = () => {
  router.push('/search')
}
</script>

<style src="./css/share.css" scoped></style>
