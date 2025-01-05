<template>
  <div class="setting">
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
      <template v-for="(item, index) in array" :key="index">
        <div class="gap"></div>
        <template
          v-for="(content, contentIndex) in item.content"
          :key="contentIndex"
        >
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

    <div class="logout">
      <div class="gap"></div>
      <div class="item">
        <span>退出登录</span>
      </div>
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
    content: [
      {
        name: "安全中心",
        data: "",
        path: "",
      },
    ],
  },
  {
    content: [
      {
        name: "关于",
        data: "",
        path: "",
      },
    ],
  },
]);
</script>

<style src="/src/components/css/common.css" />
<style src="./css/setting.css" />
<style scope>
.main > .gap > .content {
  box-sizing: border-box;
  width: 100%;
  border: 1px solid black;
}
</style>
