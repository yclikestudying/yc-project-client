<template>
  <!-- 二手集市 -->
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
            placeholder="请输入闲置、转卖的描述信息"
            v-model="content"
          ></textarea>
        </div>
        <van-uploader v-model="fileList" multiple />
      </div>

      <div class="baseInfo">
        <span>基础信息</span>
        <div class="baseInfoContent">
          <div class="price" @click="showBox">
            <div class="left">
              <span>价格</span>
            </div>
            <div class="right">
              <span>￥{{ price }}</span>
              <van-icon name="arrow" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <van-number-keyboard
    :show="show"
    theme="custom"
    extra-key="."
    close-button-text="完成"
    @blur="show = false"
    @input="onInput"
    @delete="onDelete"
  />
</template>
<script setup>
import { onMounted, ref } from "vue";
import { defineEmits } from "vue";

// 自定义事件
const emit = defineEmits(["toPublish"]);
// 文本内容
let content = ref("");
// 数字键盘显示与隐藏
let show = ref(false);
// 价格
let price = ref("0");
// 图片
const fileList = ref([]);

// 取消发布
const onClickLeft = () => {
  emit("toPublish");
  price.value = "0";
};

// 发布动态
const onClickRight = () => {
  if (content.value.length !== 0 || fileList.value.length !== 0) {
    console.log("发布动态");
  } else {
    console.log("动态内容为空");
  }
};

// 显示数字键盘
const showBox = () => {
  show.value = true;
};

// 输入数字
const onInput = (value) => {
  if (price.value === "0") {
    price.value = value;
    return;
  }
  price.value = price.value + "" + value;
};

// 删除数字
const onDelete = () => {
  if (price.value.length > 0) {
    price.value = price.value.substring(0, price.value.length - 1);
  }
  if (price.value.length === 0) {
    price.value = "0"
  }
};
</script>

<style src="./css/campusPublish.css" scoped></style>
<style src="./css/goodsPublish.css" scoped></style>
