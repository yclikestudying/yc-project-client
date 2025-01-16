<template>
  <div class="navBar">
    <van-nav-bar
      fixed
      placeholder
      title="标题"
      left-arrow
      right-text=""
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
  </div>
</template>

<script setup>
import { defineEmits } from "vue";
import { ref } from "vue";
import { onMounted } from "vue";

// 数据变量
const emit = defineEmits(["back"]);
let rightText = ref(""); // 右侧文字

const onClickLeft = () => {
  emit("back");
};

// 右侧方法
const onClickRight = () => {
  if (rightText.value !== "") {
    console.log("更多")
  }
};
</script>

<style scoped></style>
