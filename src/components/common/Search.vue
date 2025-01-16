<template>
  <div class="search">
    <form action="/">
      <van-search
        ref="childRef"
        v-model="search"
        show-action
        placeholder="找人或查找动态"
        @search="onSearch"
        @cancel="onCancel"
        @clear="onClear"
      />
    </form>
    <div
      class="history"
      v-if="history.length !== 0 && users.length === 0 && articles.length === 0"
    >
      <div class="title">
        <span>历史搜索</span>
        <van-icon name="delete-o" @click="clean" />
      </div>
      <div class="content">
        <template v-for="(item, index) in history" :key="index">
          <div class="item">
            <span>{{ item }}</span>
          </div>
        </template>
      </div>
    </div>
    <div class="show">
      <div class="user" v-if="users.length !== 0">
        <div class="title">
          <div><span>用户</span></div>
          <div>
            <span>查看更多</span>
            <van-icon name="arrow" />
          </div>
        </div>
        <div class="detail">
          <template v-for="(user, index) in users" :key="index">
            <div class="detail-user" @click="checkDetail(user.userId)">
              <div class="top-img" v-if="user.userAvatar">
                <img :src="user.userAvatar" alt="头像" />
              </div>
              <div class="top-img" v-else>
                <img src="/public/mine/默认头像.jpg" alt="头像" />
              </div>
              <div class="bottom-name">
                <span>{{ user.userName }}</span>
              </div>
            </div>
          </template>
        </div>
      </div>
      <div class="article" v-if="articles.length !== 0">
        <div><span style="font-size: 12px">动态</span></div>
        <template v-for="(article, index) in articles" :key="index">
          <div class="content" @click="checkArticle(article.articleId)">
            <div class="top-text">
              <span>{{ article.articleContent }}</span>
            </div>
            <div class="bottom-user">
              <span>{{ article.userName }}</span>
              <span>{{ formatDate(article.createTime) }}</span>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
  <!-- 用户详情页 -->
  <div class="userDetail">
    <UserIndex
      v-if="userId"
      @userDetailBack="userDetailBack"
      @toChat="toChat"
      :userId="userId"
    ></UserIndex>
  </div>
  <!-- 动态详情页 -->
  <div class="articleDetail">
    <Article
      v-if="articleId"
      @articleDetailBack="articleDetailBack"
      :articleId="articleId"
    ></Article>
  </div>
  <!-- 聊天页面 -->
  <div class="chatDetail">
    <Chat @chatBack="chatBack"></Chat>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import router from "@/router";
import request from "@/axios";
import UserIndex from "./UserIndex.vue";
import Article from "./Article.vue";
import { formatDate } from "@/utils/common";
import Chat from "./Chat.vue";

// 数据变量
let childRef = ref(null); // 搜索组件实例对象
const search = ref(""); // 搜索内容
let history = ref([]); // 历史记录
let users = reactive([]); // 查询的用户
let articles = reactive([]); // 查询的文章
let userDetailEl = null; // 用户详情页DOM元素
let articleDetailEl = null; // 文章详情页DOM元素
let chatDetailEl = null; // 聊天页面DOM元素
let userId = ref(null); // 当前要展示的用户的id
let articleId = ref(null); // 当前要展示的文章id

onMounted(() => {
  userDetailEl = document.querySelector(".userDetail"); // 用户详情页DOM元素获取
  articleDetailEl = document.querySelector(".articleDetail"); // 文章详情页DOM元素获取
  chatDetailEl = document.querySelector(".chatDetail");

  if (childRef) {
    childRef.value.focus(); // 挂载完成后输入框聚焦
  }
});

// 搜索
const onSearch = (val) => {
  // 搜索前把上一次搜索的数据清空
  users.length = 0;
  articles.length = 0;

  history.value.push(val);

  // 模糊查询用户
  request
    .get("/userInfo/queryUser", {
      params: {
        username: search.value,
      },
    })
    .then((res) => {
      Object.assign(users, res.data);
    })
    .catch((err) => {
      console.log(err);
    });

  // 模糊查询动态
  request
    .get("/article/queryArticle", {
      params: {
        content: search.value,
      },
    })
    .then((res) => {
      Object.assign(articles, res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

// 返回
const onCancel = () => {
  router.back();
};

// 清空历史记录
const clean = () => {
  history.value.length = 0;
};

// 清空搜索的结果
const onClear = () => {
  users.length = 0;
  articles.length = 0;
};

// 点击查看用户详情
const checkDetail = (id) => {
  userId.value = id;
  userDetailEl.style.transform = "translate(0, -100vh)";
};

// 查看用户详情页返回搜索页面
const userDetailBack = () => {
  userDetailEl.style.transform = "translate(100vw, -100vh)";
  setTimeout(() => {
    userId.value = null;
  }, 200);
};

// 点击查看文章详情
const checkArticle = (id) => {
  articleId.value = id;
  articleDetailEl.style.transform = "translate(0, -200vh)";
};

// 查看文章详情页返回搜索页面
const articleDetailBack = () => {
  articleDetailEl.style.transform = "translate(100vw, -200vh)";
  setTimeout(() => {
    articleId.value = null;
  }, 200);
};

// 去到聊天页面
const toChat = () => {
  console.log("点击成功");
  chatDetailEl.style.transform = 'translate(0, -300vh)';
};

// 从聊天页面返回
const chatBack = () => {
  chatDetailEl.style.transform = 'translate(100vw, -300vh)';
}
</script>

<style src="./css/search.css" scoped></style>
