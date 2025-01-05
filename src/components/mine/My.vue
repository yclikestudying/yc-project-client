<template>
  <div class="my">
    <!-- header -->
    <div class="header" @click="goToInfoPage">
      <div class="img">
        <img src="/mine/默认头像.jpg" alt="" />
      </div>
      <div class="name">
        <div class="left">
          <span>coderyc</span>
          <img src="/mine/性别男.svg" alt="" />
        </div>
        <div class="right">
          <img src="/mine/方向-向右.svg" alt="">
        </div>
      </div>
    </div>

    <!-- function -->
    <div class="function">
      <template v-for="(item, index) in function_array" :key="index">
        <div class="item">
          <span>{{ item.number }}</span>
          <span>{{ item.name }}</span>
        </div>
      </template>
    </div>

    <!-- setting -->
    <div class="setting">
      <template v-for="(setting, index) in setting_array" :key="index">
        <div class="item" @click="goToPage(setting.path, setting.name)">
          <div class="left">
            <img :src="setting['left-img']" alt="" />
            <span>{{ setting.name }}</span>
          </div>
          <div class="right">
            <img :src="setting['right-img']" alt="" />
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import router from "@/router";
import { ref } from "vue";

// funciton 数组
const function_array = ref([
  {
    number: 0,
    name: "动态",
  },
  {
    number: 0,
    name: "互关",
  },
  {
    number: 0,
    name: "关注",
  },
  {
    number: 0,
    name: "圈子",
  },
  {
    number: 0,
    name: "粉丝",
  },
]);

// setting 数组
const setting_array = ref([
  {
    "left-img": "/mine/隐私策略.svg",
    name: "隐私",
    "right-img": "/mine/方向-向右.svg",
    path: '/privacy'
  },
  {
    "left-img": "/mine/眼睛.svg",
    name: "访客",
    "right-img": "/mine/方向-向右.svg",
    path: '/visitor'
  },
  {
    "left-img": "/mine/邀请.svg",
    name: "邀请",
    "right-img": "/mine/方向-向右.svg",
    path: ''
  },
  {
    "left-img": "/mine/活动.svg",
    name: "活动",
    "right-img": "/mine/方向-向右.svg",
    path: '/activity'
  },
  {
    "left-img": "/mine/扫一扫.svg",
    name: "扫一扫",
    "right-img": "/mine/方向-向右.svg",
    path: ''
  },
  {
    "left-img": "/mine/帮助与客服.svg",
    name: "帮助与客服",
    "right-img": "/mine/方向-向右.svg",
    path: '/customerService'
  },
  {
    "left-img": "/mine/设置.svg",
    name: "设置",
    "right-img": "/mine/方向-向右.svg",
    path: '/setting'
  },
]);

// 跳转到个人页面
const goToInfoPage = () => {
  router.push({
    path: '/myIndex'
  })
}

// 跳转到相应的设置页面
const goToPage = (path, name) => {
  router.push({
    path: path,
    query: {
      title: name
    }
  })
}
</script>

<style src="./css/my.css" scoped/>
