<template>
  <div class="customerService">
    <div class="header">
      <van-nav-bar
        fixed
        placeholder
        class="navBar"
        :title="title"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>

    <div class="main">
      <template v-for="(item, itemIndex) in array" :key="itemIndex">
        <div class="title">
          <span>{{ item.title }}</span>
        </div>
        <div class="item">
          <template
            v-for="(content, contentIndex) in item.data"
            :key="contentIndex"
          >
            <div class="content">
              <img :src="content.img_path" alt="" />
              <span>{{ content.title }}</span>
            </div>
          </template>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import router from "@/router";
import { useRoute } from "vue-router";

// 获取 title
const route = useRoute();
const title = ref(route.query.title);

// 返回上一页
const onClickLeft = () => {
  router.back();
};

// 数组
const array = ref([
  {
    title: "自助服务",
    data: [
      {
        img_path: "/mine/意见反馈.svg",
        title: "意见反馈",
        path: "",
      },
      {
        img_path: "/mine/账号申诉.svg",
        title: "账号申诉",
        path: "",
      },
    ],
  },
]);
</script>

<style src="./css/customerService.css" scoped/>
