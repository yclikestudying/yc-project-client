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
        <div class="left" @click="checkAvatar" v-if="userInfo.userAvatar">
          <img :src="userInfo.userAvatar" alt="头像" />
        </div>
        <div class="left" @click="checkAvatar" v-else>
          <img src="/public/mine/默认头像.jpg" alt="头像" />
        </div>
        <div class="other-right">
          <div @click="goToChat">
            <van-icon name="chat-o" size="22" />
          </div>
          <div class="follow" @click="follow">
            <span>{{ followText }}</span>
          </div>
        </div>
      </div>
      <div class="bottom">
        <div>
          <span>{{ userInfo.userName || "" }}</span>
          <div v-if="userInfo.userGender">
            <img
              :src="
                userInfo.userGender === 1
                  ? '/public/mine/性别男.svg'
                  : '/public/mine/性别女.svg'
              "
              alt="性别图标"
            />
          </div>
        </div>
        <div>
          <span>5</span><span>关注 </span> <span>16</span><span>粉丝</span>
        </div>
        <div v-if="userInfo.userProfile">
          <span>简介：{{ userInfo.userProfile }}</span>
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
                      <img :src="userInfo.userAvatar" alt="头像" />
                    </div>
                  </div>
                  <div class="right">
                    <div class="top">
                      <span>{{ myStore.userInfo.userName }}</span>
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
        <img src="/public/mine/默认头像.jpg" alt="头像" />
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
import useMyStore from "@/store/useMyStore";
import { formatDate } from "@/utils/common";
import { defineEmits, defineProps } from "vue";
import request from "@/axios";
import { showSuccessToast } from "vant";

// 数据
const emit = defineEmits(["userDetailBack", "toChat"]);
const props = defineProps({
  userId: {
    type: Number,
  },
});
const myStore = useMyStore(); // 状态管理
let tabs = ref(["主页", "动态"]);
let currentTabIndex = ref(0);
let itemEl = null; // tab的dom节点
let itemWidth = null; // tab的宽度
let underlineEl = null; // 滑块dom节点
let articleEl = null; // 文章dom节点
let pageWidth = null; // page宽度
let pageEls = null; // 内容的dom元素
let myIndexEl = null;
let checkAvatarEl = null; // DOM元素
let userId = ref(props.userId); // 当前展示的用户的id
let userInfo = reactive({}); // 当前展示的用户的信息
let articles = reactive([]); // 当前展示的用户的动态信息
let followText = ref(''); // 关注
let followEl = null; // 关注DOM元素

onMounted(() => {
  // 获取dom节点
  itemEl = document.querySelector(".item");
  myIndexEl = document.querySelector(".myIndex");
  checkAvatarEl = document.querySelector(".checkAvatar");
  followEl = document.querySelector(".follow");
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
  // 根据userId获取用户信息
  request
    .get(`/userInfo/getUserInfoByUserId/${userId.value}`)
    .then((res) => {
      Object.assign(userInfo, res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  // 根据userId查询用户动态
  request
    .get(`/article/queryArticleByUserId/${userId.value}`)
    .then((res) => {
      Object.assign(articles, res.data);
    })
    .catch((err) => {
      console.log(err);
    });
    // 查看当前用户是否被关注
    request.get(`/follow/queryUserFollow/${userId.value}`).then(res => {
      if (res.code === 200) {
        res.data ? addFollow() : deleteFollow()
      }
    }).catch(err => {
      console.log(err)
    })

    request.get("/follow/queryUserFollowData")
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

// 点击查看头像
const checkAvatar = () => {
  checkAvatarEl.style.display = "block";
};
// 回到原状态
const checkOriginalImg = () => {
  checkAvatarEl.style.display = "none";
};

// 返回搜索页
const goToBack = () => {
  emit("userDetailBack");
};

// 关注
const follow = () => {
  console.log("点击");
  if (followText.value === "关注") {
    request
      .get(`/follow/addUser/${userId.value}`)
      .then((res) => {
        if (res.code === 200) {
          addFollow()
          showSuccessToast("关注成功");
        }
      })
      .catch((err) => {
        console.log(err);
      });

    return;
  }
  if (followText.value === "已关注") {
    request
      .delete(`/follow/deleteUser/${userId.value}`)
      .then((res) => {
        if (res.code === 200) {
          deleteFollow()
          showSuccessToast("取消关注成功");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

// 关注时触发
const addFollow = () => {
  followText.value = "已关注";
  followEl.style.backgroundColor = "gray";
  followEl.style.color = "white";
}

// 取消关注时触发
const deleteFollow = () => {
  followText.value = "关注";
  followEl.style.backgroundColor = "var(--main-color)";
  followEl.style.color = "black";
}

// 去到聊天页面
const goToChat = () => {
  emit("toChat")
}
</script>

<style src="./css/userIndex.css" scoped></style>
