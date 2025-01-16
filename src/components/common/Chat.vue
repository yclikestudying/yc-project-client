<template>
  <div class="chat">
    <div class="navBar">
      <NavBar @back="back"></NavBar>
    </div>
    <div class="chat-content"></div>
  </div>
</template>

<script setup>
import NavBar from "./NavBar.vue";
import { defineEmits, onMounted } from "vue";

// 数据变量
const emit = defineEmits(["chatBack"]);

// 返回
const back = () => {
  emit("chatBack");
};
</script>

<style src="./css/chat.css" scoped></style>
