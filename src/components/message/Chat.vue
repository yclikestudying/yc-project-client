<template>
  <div class="chat">
    <div class="header">
      <van-nav-bar
        fixed
        placeholder
        class="navBar"
        title="用户名"
        left-arrow
        right-text="更多"
        @click-left="onClickLeft"
      />
    </div>

    <div :class="{ main: true, newMain: status === 2 }">
      <template v-for="index in 10">
        <div class="time">
          <span>09:02</span>
        </div>
        <div class="otherUser">
          <div class="user">
            <img src="/mine/默认头像.jpg" alt="" />
          </div>
          <div class="message left-message">
            <span>傻逼</span>
          </div>
        </div>
        <div class="self">
          <div class="user">
            <img src="/mine/默认头像.jpg" alt="" />
          </div>
          <div class="message right-message">
            <span>傻逼</span>
          </div>
        </div>
      </template>
    </div>

    <div :class="{ submit: true, newSubmit: status === 2 }">
      <div :class="{ all: true, newAll: true }">
        <div class="item">
          <img src="/message/输入框-语音.svg" alt="" />
        </div>
        <div class="item">
          <input v-model="message" type="text" />
        </div>
        <div class="item">
          <img src="/message/输入框-表情.svg" alt="" />
        </div>
        <div class="item">
          <template v-if="status === 0">
            <img
              @click="moreFunction()"
              class="status-zero"
              src="/message/输入框-更多功能.svg"
              alt=""
            />
          </template>
          <template v-if="status === 1">
            <span class="status-one">发送</span>
          </template>
          <template v-if="status === 2">
            <img
              @click="toOriginal()"
              class="status-zero"
              src="/message/输入框-键盘.svg"
              alt=""
            />
          </template>
        </div>
      </div>
      <template v-if="status === 2">
          <div class="extension">
            <div class="item">
              <img src="/message/图片.svg" alt="">
              <span>图片</span>
            </div>
            <div class="item">
              <img src="/message/文件.svg" alt="">
              <span>文件</span>
            </div>
          </div>
        </template>
    </div>
  </div>
</template>

<script setup>
import { nextTick, onMounted, ref, watch } from "vue";
import router from "@/router";
import { useRoute } from "vue-router";

onMounted(() => {
  toBottom();
});

function toBottom() {
  nextTick(() => {
    const mainContainer = document.querySelector(".main");
    if (mainContainer) {
      mainContainer.scrollTop = mainContainer.scrollHeight; // 滚动到底部
    }
  });
}

// 获取聊天对象信息
const route = useRoute();

// 返回上一页
const onClickLeft = () => {
  router.back()
};

// 发送的消息
const message = ref("");

// 监听消息
watch(message, (newValue) => {
  if (newValue.length !== 0 && newValue.trim() !== "") {
    status.value = 1;
  } else {
    status.value = 0;
  }
});

let status = ref(0);

// 更多功能
const moreFunction = () => {
  status.value = 2;
  toBottom();
};

// 回到原本
const toOriginal = () => {
  status.value = 0;
}
</script>

<style src="/src/components/css/common.css" />
<style src="./css/chat.css" />
