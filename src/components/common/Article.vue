<template>
  <div class="article">
    <div class="navBar">
      <NavBar @back="back"></NavBar>
    </div>
    <div>
      <div class="box">
        <div class="message-box" @click="goToChat">
          <div class="left">
            <div class="img">
              <img :src="userInfo.userAvatar" alt="头像" />
            </div>
          </div>
          <div class="right">
            <div class="top">
              <span>{{ userInfo.userName }}</span>
            </div>
            <div class="bottom">
              <span>{{ formatDate(article.createTime) }}</span>
            </div>
          </div>
        </div>
        <div class="text">
          <div class="text-box">
            <span>{{ article.articleContent }}</span>
          </div>
        </div>
        <div class="img">
          <div class="img-box">
            <template
              v-if="article.articlePhotos"
              v-for="(img, imgIndex) in JSON.parse(article.articlePhotos)"
              :key="imgIndex"
            >
              <img :src="img" alt="图片" />
            </template>
          </div>
        </div>
        <div class="function">
          <div>
            <van-icon name="good-job-o" />
            <span>10</span>
          </div>
          <div>
            <van-icon name="chat-o" />
            <span>10</span>
          </div>
          <div>
            <van-icon name="eye-o" />
            <span>140</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import NavBar from "./NavBar.vue";
import { defineProps, defineEmits, onMounted, reactive } from "vue";
import { ref } from "vue";
import request from "@/axios";
import { formatDate } from "@/utils/common";

// 数据变量
const props = defineProps({
  articleId: {
    type: Number
  }
})
const emit = defineEmits(["articleDetailBack"])
let articleId = ref(props.articleId); // 文章id
let article = reactive({}); // 文章内容
let userInfo = reactive({}); // 用户信息

onMounted(() => {
  // 根据文章id查询文章
  request.get(`/article/queryArticleByArticleId/${articleId.value}`).then(res => {
    Object.assign(article, res.data[0])
    Object.assign(userInfo, res.data[1])
  }).catch(err => {
    console.log(err)
  })
})

// 文章详情页返回
const back = () => {
  emit("articleDetailBack")
}

</script>

<style src="./css/article.css" scoped></style>
