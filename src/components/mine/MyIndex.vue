<template>
  <div class="myIndex">
    <div class="header">
      <!-- 背景图 -->
      <img src="/public/mine/背景图.jpg" alt="背景图片" />
      <div class="back" @click="goToBack">
        <van-icon name="arrow-left" size="28" />
      </div>
      <div class="more">
        <img src="/public/mine/省略号.svg" alt="" />
      </div>
    </div>
    <div class="footer">
      <div class="info">
        <!-- 头像 -->
        <div class="left" @click="checkAvatar">
          <img
            :src="myStore.userInfo.userAvatar || '/public/mine/默认头像.jpg'"
            alt="头像"
          />
        </div>
        <div class="right" @click="goToEditInfo" v-if="currentPage === 'self'">
          <van-icon name="edit" />
          <span
            >资料待完善<span>{{ userInfoProgress() }}</span></span
          >
        </div>
        <div class="other-right" v-else>
          <div>
            <van-icon name="chat-o" size="22" />
          </div>
          <div>
            <span>关注</span>
          </div>
        </div>
      </div>
      <div class="bottom">
        <div>
          <span>{{ myStore.userInfo.userName ?? '名称' }}</span>
          <div v-if="gender">
            <img :src="gender === 1 ? '/public/mine/性别男.svg' : '/public/mine/性别女.svg'" alt="性别" />
          </div>
        </div>
        <div>
          <span>5</span><span>关注 </span> <span>16</span><span>粉丝</span>
        </div>
        <div>
          <span>简介：{{ myStore.userInfo.userProfile }}</span>
        </div>
      </div>
      <div class="content">
        <div class="tab">
          <template v-for="(tab, index) in tabs" :key="index">
            <div class="item" @click="setCurrentTabIndex(index)">
              <span :class="{ active: index === currentTabIndex }">{{
                tab
              }}</span>
              <div :class="{ underline: true, isDisplay: index === 0 }"></div>
            </div>
          </template>
        </div>
        <div class="article">
          <div class="page">主页</div>
          <div class="page">
            <template v-for="(article, index) in articles" :key="index">
              <div class="box">
                <div class="message-box" @click="goToChat">
                  <div class="left">
                    <div class="img">
                      <img :src="myStore.userInfo.userAvatar" alt="头像" />
                    </div>
                  </div>
                  <div class="right">
                    <div class="top">
                      <span>{{ myStore.userInfo.userName }}</span>
                      <div
                        class="delete"
                        @click="deleteArticle(article.articleId)"
                      >
                        <img src="/public/mine/垃圾桶.svg" alt="删除" />
                      </div>
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
                      v-for="(img, imgIndex) in JSON.parse(
                        article.articlePhotos
                      )"
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
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="checkAvatar" @click="checkOriginalImg">
    <div>
      <div class="img">
        <img
          :src="myStore.userInfo.userAvatar || '/public/mine/默认头像.jpg'"
          alt="头像"
        />
      </div>
      <div class="upload">
        <van-uploader :before-read="beforeRead" :after-read="afterRead">
          <van-button icon="plus" type="primary">上传头像</van-button>
        </van-uploader>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, watch } from "vue";
import {
  dataInit,
  touchstart,
  touchmove,
  touchend,
  pageIndex,
} from "@/utils/sliding";
import router from "@/router";
import { userInfoProgress } from "@/utils/common";
import useMyStore from "@/store/useMyStore";
import { showFailToast, showSuccessToast, showToast } from "vant";
import request from "@/axios";
import { formatDate } from "@/utils/common";
import { showDialog } from "vant";

// 状态管理
const myStore = useMyStore();

// 当前页面
let currentPage = ref("self");

let gender = ref(myStore.userInfo.userGender)

// 动态数据
let articles = reactive(myStore.articles ?? []);

// 默认列表
let tabs = ref(["主页", "动态"]);
// 当前tab索引
let currentTabIndex = ref(0);
// tab的dom节点
let itemEl = null;
// tab的宽度
let itemWidth = null;
// 滑块dom节点
let underlineEl = null;
// 文章dom节点
let articleEl = null;
// page宽度
let pageWidth = null;
// 内容的dom元素
let pageEls = null;
let myIndexEl = null;
// DOM元素
let checkAvatarEl = null;

onMounted(() => {
  // 获取dom节点
  itemEl = document.querySelector(".item");
  myIndexEl = document.querySelector(".myIndex");
  checkAvatarEl = document.querySelector(".checkAvatar");
  // 监听滚动
  myIndexEl.addEventListener("scroll", scroll);
  itemWidth = itemEl.offsetWidth;
  underlineEl = document.querySelector(".underline");
  pageWidth = document.querySelector(".page").offsetWidth;
  articleEl = document.querySelector(".article");
  pageEls = document.querySelectorAll(".page");
  // 触摸事件数据初始化
  dataInit(currentTabIndex.value, pageWidth, articleEl, tabs.value.length - 1);
  // 监听触摸事件
  articleEl.addEventListener("touchstart", touchstart);
  articleEl.addEventListener("touchmove", touchmove);
  articleEl.addEventListener("touchend", touchend);
});

const scroll = () => {
  if (myIndexEl.scrollTop > 204) {
    pageEls.forEach((item) => {
      item.style.overflow = "scroll";
    });
  } else {
    pageEls.forEach((item) => {
      item.style.overflow = "hidden";
    });
  }
};

// 设置新的索引
const setCurrentTabIndex = (index) => {
  currentTabIndex.value = index;
};
// 对currentTabIndex进行监听
watch(currentTabIndex, (value) => {
  underlineEl.style.transform = `translateX(${value * itemWidth}px)`;
  articleEl.style.transform = `translateX(${-value * pageWidth}px)`;
});
// 对pageIndex进行监听
watch(pageIndex, (value) => {
  currentTabIndex.value = value;
});

// 跳转到编辑页
const goToEditInfo = () => {
  router.push({
    path: "/editInfo",
  });
};

// 返回上一页
const goToBack = () => {
  router.back();
};

// 点击查看头像
const checkAvatar = () => {
  checkAvatarEl.style.display = "block";
};
// 回到原状态
const checkOriginalImg = () => {
  checkAvatarEl.style.display = "none";
};
// 上传照片前置处理
const beforeRead = (file) => {
  if (file.type === "image/jpeg" || file.type === "image/png") {
    return true;
  } else {
    showToast("请上传jpg或png格式的照片");
    return false;
  }
};
const afterRead = (file) => {
  const formData = new FormData();
  formData.append("file", file.file);
  request
    .put("/userInfo/updateAvatar", formData)
    .then((res) => {
      if (res.code === 200) {
        myStore.userInfo.userAvatar = res.data;
        return;
      }
      showToast("上传失败");
    })
    .catch((err) => {
      console.log(err);
    });
};

// 删除动态
const deleteArticle = (articleId) => {
  showDialog({
    title: "删除该动态",
    showCancelButton: true,
  })
    .then(() => {
      request
        .delete("/article/delete", {
          params: {
            articleId: articleId,
          },
        })
        .then((res) => {
          if (res.code === 200) {
            myStore.articles = myStore.articles.filter((element) => {
              if (element.articleId === articleId) {
                return false;
              }
              return true;
            });
            articles.length = 0;
            Object.assign(articles, myStore.articles);
            showSuccessToast("删除成功");
          } else {
            showFailToast("删除失败");
          }
        });
    })
    .catch(() => {});
};

const cancel = () => {
  console.log("取消");
};
</script>

<style src="./css/myIndex.css" scoped></style>
