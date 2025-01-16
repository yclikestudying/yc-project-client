<template>
  <div class="my">
    <!-- header -->
    <div class="header" @click="goToInfoPage">
      <div class="img">
        <img
          :src="myStore.userInfo.userAvatar ?? '/mine/默认头像.jpg'"
          alt="头像"
        />
      </div>
      <div class="name">
        <div class="left">
          <span>{{ myStore.userInfo.userName ?? "暂无名称" }}</span>
          <img
            style="display: none"
            class="gender"
            :src="
              myStore.userInfo.userGender === 1
                ? '/mine/性别男.svg'
                : '/mine/性别女.svg'
            "
            alt="性别"
          />
        </div>
        <div class="right">
          <van-icon name="arrow" />
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
import { onMounted, ref } from "vue";
import request from "@/axios";
import useMyStore from "@/store/useMyStore";

// 状态管理
const myStore = useMyStore();

// dom元素
let genderEl = null;

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

// 获取用户个人信息
onMounted(async () => {
  // 获取dom元素
  genderEl = document.querySelector(".gender");
  if (
    myStore.userInfo.userGender === 1 ||
    myStore.userInfo.userGender === 0
  ) {
    genderEl.style.display = "block";
  }

  // 获取“动态”数据
  request.get("/article/queryAll").then(res => {
    myStore.articles = res.data
    function_array.value[0].number = res.data.length
  }).catch(err => {
    console.log(err)
  })

  // 互关、关注和粉丝
  request.get("/follow/queryUserFollowData").then(res => {
    function_array.value[1].number = res.data[2].length
    function_array.value[2].number = res.data[0].length
    function_array.value[4].number = res.data[1].length
  }).catch(err => {
    console.log(err)
  })
  
});



// setting 数组
const setting_array = ref([
  {
    "left-img": "/mine/隐私策略.svg",
    name: "隐私",
    "right-img": "/mine/方向-向右.svg",
    path: "/privacy",
  },
  {
    "left-img": "/mine/眼睛.svg",
    name: "访客",
    "right-img": "/mine/方向-向右.svg",
    path: "/visitor",
  },
  {
    "left-img": "/mine/邀请.svg",
    name: "邀请",
    "right-img": "/mine/方向-向右.svg",
    path: "",
  },
  {
    "left-img": "/mine/活动.svg",
    name: "活动",
    "right-img": "/mine/方向-向右.svg",
    path: "/activity",
  },
  {
    "left-img": "/mine/扫一扫.svg",
    name: "扫一扫",
    "right-img": "/mine/方向-向右.svg",
    path: "",
  },
  {
    "left-img": "/mine/帮助与客服.svg",
    name: "帮助与客服",
    "right-img": "/mine/方向-向右.svg",
    path: "/customerService",
  },
  {
    "left-img": "/mine/设置.svg",
    name: "设置",
    "right-img": "/mine/方向-向右.svg",
    path: "/setting",
  },
]);

// 跳转到个人页面
const goToInfoPage = () => {
  router.push({
    path: "/myIndex",
  });
};

// 跳转到相应的设置页面
const goToPage = (path, name) => {
  router.push({
    path: path,
    query: {
      title: name,
    },
  });
};
</script>

<style src="./css/my.css" scoped />
