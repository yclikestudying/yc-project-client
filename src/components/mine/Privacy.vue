<template>
  <div class="privacy">
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

    <div class="data">
      <template v-for="(item, index) in data_array" :key="index">
        <div class="part">
          <span>{{ item.title }}</span>
        </div>
        <template v-for="(content, index) in item.content" :key="index">
          <div class="content">
            <div class="item">
              <div class="left">
                <span>{{ content.name }}</span>
              </div>
              <div class="right">
                <span>{{ content.data }}</span>
                <img src="/mine/方向-向右.svg" alt="" />
              </div>
            </div>
          </div>
        </template>
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

// 编写资料内容数组
const data_array = ref([
  {
    title: "动态",
    content: [
      {
        name: "不看Ta的动态",
        data: "",
      },
      {
        name: "看到我全部动态的人",
        data: "",
      },
    ],
  },
  {
    title: "关系",
    content: [
      {
        name: "看到我关注的人",
        data: "",
      },
      {
        name: "看到我粉丝的人",
        data: "",
      },
    ],
  },
  {
    title: "互动",
    content: [
      {
        name: "评论我的动态",
        data: "",
      },
      {
        name: "接收@消息",
        data: "",
      },
    ],
  },
  {
    title: "主页",
    content: [
      {
        name: "看别人的主页",
        data: "",
      },
      {
        name: "看到我相册的人",
        data: "",
      },
    ],
  },
  {
    title: "私信",
    content: [
      {
        name: "我可以收到哪些人的私信",
        data: "",
      }
    ],
  },
]);
</script>

<style src="./css/privacy.css" scoped/>
