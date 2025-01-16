<template>
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
import { defineEmits, ref } from "vue";
import request from "@/axios";
import { showFailToast, showSuccessToast, showToast } from "vant";

// 图片数组
const fileList = ref([]);
// 文本
let content = ref("");
// 自定义事件
const emit = defineEmits(["cancel"]);

// 取消发布
const onClickLeft = () => {
  emit("cancel", true);
  content.value = "";
  fileList.value.length = 0;
};

// 发布动态
const onClickRight = () => {
  if (content.value.length === 0 && fileList.value.length === 0) {
    showFailToast("内容不能为空");
    return;
  }

  let formData = new FormData();
  if (content.value.length !== 0) {
    formData.append("text", content.value);
  }
  if (fileList.value.length !== 0) {
    fileList.value.forEach((item) => {
      formData.append("files", item.file);
    });
  }
  request
    .post("/article/publish", formData)
    .then((res) => {
      if (res.code === 200) {
        showSuccessToast("发布成功");
        onClickLeft();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
</script>

<style src="./css/publish.css" scoped></style>
