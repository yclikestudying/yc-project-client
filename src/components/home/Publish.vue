<template>
  <div class="all">
    <!-- 导航栏 -->
    <van-nav-bar
      title="选择发布"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- 发布的选择 -->
    <div class="publish">
      <div class="publish-content">
        <template v-for="(item, index) in arrayList" :key="index">
          <div class="item" @click="publish(index)">
            <div class="left">
              <img :src="item.img" alt="" />
            </div>
            <div class="right">
              <div class="top">
                <span>{{ item.name }}</span>
              </div>
              <div class="bottom">
                <span>{{ item.description }}</span>
              </div>
            </div>
            <div class="icon">
              <img src="/public/home/方向-向右.svg" alt="" />
            </div>
          </div>
        </template>
      </div>
    </div>
    <!-- 具体的发布内容 -->
    <div class="content">
      <template v-if="currentIndex === 0">
        <CampusPublish @toPublish="toPublish"></CampusPublish>
      </template>
      <template v-if="currentIndex === 1">
        <GoodsPublish @toPublish="toPublish"></GoodsPublish>
      </template>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import router from "@/router";
import CampusPublish from "./CampusPublish.vue";
import GoodsPublish from "./GoodsPublish.vue";
let currentIndex = ref(0);
// 具体的发布内容的dom
let contentEl = null;
onMounted(() => {
  // 获取具体的发布内容的dom
  contentEl = document.querySelector(".content");
});

// 数组
const arrayList = [
  {
    img: "/home/校园.svg",
    name: "校园动态",
    description: "发布动态",
  },
  {
    img: "/home/集市.svg",
    name: "二手集市",
    description: "转卖、求购、悬赏",
  },
];

// 回到上一页
const onClickLeft = () => {
  router.back();
};

// 发布
const publish = (index) => {
  currentIndex.value = index;
  contentEl.style.transform = `translateX(-100vw)`;
};

// 返回到选择发布的地方
const toPublish = () => {
  contentEl.style.transform = `translateX(0)`;
};
</script>

<style src="./css/publish.css" scoped></style>
