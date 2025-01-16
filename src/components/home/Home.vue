<template>
  <div class="home">
    <div class="title">
      <div class="item">
        <div class="item-box">
          <div class="left-img">
            <img src="/home/重庆文理学院校徽.png" alt="">
          </div>
          <div class="right-content">
            <div class="name">
              <span>重庆文理学院</span>
            </div>
            <div class="number">
              <span>1864动态</span>
              <span>|</span>
              <span>2350吃瓜群众</span>
              <van-icon name="arrow" />
            </div>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="item-box">
          <!-- 活动链接 -->
        </div>
      </div>
    </div>
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
        <div class="right" @click="goToSearch">
          <img src="/public/home/搜索.svg" alt="搜索" />
        </div>
      </div>
      <div class="bottom">
        <van-pull-refresh
          v-model="loading1"
          @refresh="onRefresh1"
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
          v-model="loading2"
          @refresh="onRefresh2"
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
                <div class="function connect">
                  <div>
                    <van-icon name="eye-o" />
                    <span>140</span>
                  </div>
                  <div class="method">
                    <span>￥9999</span>
                    <button>联系我</button>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </van-pull-refresh>
        <van-pull-refresh
          v-model="loading3"
          @refresh="onRefresh3"
          :disabled="isDisabledThree"
        >
          <div class="page">
            <span>快递代取</span>
          </div>
        </van-pull-refresh>
      </div>
    </div>
    <!-- 浮动气泡 -->
    <div class="bubble" @click="goToPublish">
      <van-icon name="plus" size="28" color="white" />
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
let tabs = ref(["校园动态", "二手集市", "快递代取"]);
import router from "@/router";
// 当前tab索引
let currentTabIndex = ref(0);
let underlineEl = null;
let bottomEl = null;
let pageEl = null;
let pageEls = null;
let pageWidth = 0;
let tabEl = null;
let tabWidth = 0;
let contentEl = null;
// 页面刷新
let isDisabledOne = ref(false);
let isDisabledTwo = ref(false);
let isDisabledThree = ref(false);
onMounted(() => {
  // 获取DOM节点
  contentEl = document.querySelector(".content");
  contentEl.addEventListener("scroll", scroll);
  underlineEl = document.querySelector(".underline");
  bottomEl = document.querySelector(".bottom");
  pageEl = document.querySelector(".page");
  pageEls = document.querySelectorAll(".page");
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
  currentTabIndex.value = value;
});

// 监听滚动
const scroll = () => {
  if (contentEl.scrollTop > 165) {
    pageEls.forEach((item) => {
      item.style.overflow = "scroll";
    });
  } else {
    pageEls.forEach((item) => {
      item.style.overflow = "hidden";
    });
  }
  if (contentEl.scrollTop === 0) {
    isDisabledOne.value = false;
    isDisabledTwo.value = false;
    isDisabledThree.value = false;
  } else {
    isDisabledOne.value = true;
    isDisabledTwo.value = true;
    isDisabledThree.value = true;
  }
};

// 去到发表页面
const goToPublish = () => {
  router.push("/publish");
};

// 去到搜索页面
const goToSearch = () => {
  router.push('/search')
}

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
