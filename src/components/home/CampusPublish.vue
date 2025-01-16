<template>
  <!-- 校园动态 -->
  <div class="publish">
    <van-nav-bar
      title="发布动态"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <template #right>
        <van-icon name="success" size="18" />
      </template>
    </van-nav-bar>
    <div class="content">
      <div class="box">
        <div class="text">
          <textarea
            class="textarea"
            style="width: 100%; min-height: 10px; border: none"
            placeholder="分享有趣的事"
            v-model="content"
          ></textarea>
        </div>
        <van-uploader v-model="fileList" multiple />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { defineEmits } from "vue";

const emit = defineEmits(["toPublish"]);

let content = ref("");
let buttonEl = null;
onMounted(() => {
  buttonEl = document.querySelector(".button");
});

// 取消发布
const onClickLeft = () => {
  emit("toPublish");
};

// 图片
const fileList = ref([]);

// 对文本内容进行监听
watch([content, fileList], ([newValue1, newValue2]) => {
  if (
    (newValue1.trim().length !== 0 || newValue2.length !== 0) &&
    buttonEl !== null
  ) {
    buttonEl.style.backgroundColor = "var(--main-color)";
    buttonEl.style.color = "black";
  } else {
    buttonEl.style.backgroundColor = "rgb(222, 222, 222)";
    buttonEl.style.color = "white";
  }
});

// 发布动态
const onClickRight = () => {
  if (content.value.length !== 0 || fileList.value.length !== 0) {
    console.log("发布动态");
  } else {
    console.log("动态内容为空");
  }
};
</script>

<style src="./css/campusPublish.css" scoped></style>
