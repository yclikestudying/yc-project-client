<template>
  <div class="index">
    <div class="content">
        <router-view/>
    </div>

    <div class="footer">
      <template v-for="(item, index) in tabbar" :key="index">
        <div class="item" @click="setCurrentIndex(index, item.path)">
          <img :class="{'active-img': currentIndex === index}" :src="currentIndex === index ? item.img2 : item.img" alt="图标" />
          <span :class="{'active-name': currentIndex === index}">{{ item.name }}</span>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import router from "@/router";

// 底部栏数组
const tabbar = ref([
  {
    img: "/index/六边形.svg",
    img2: "/index/六边形-黄色.svg",
    name: "首页",
    path: '/index/home'
  },
  {
    img: "/index/正方形.svg",
    img2: "/index/正方形-黄色.svg",
    name: "动态",
    path: '/index/share'
  },
  {
    img: "/index/三角形.svg",
    img2: "/index/三角形-黄色.svg",
    name: "私信",
    path: '/index/message'
  },
  {
    img: "/index/圆形.svg",
    img2: "/index/圆形-黄色.svg",
    name: "我",
    path: '/index/my'
  },
]);

// 当前底部栏的位置
const currentIndex = ref(Number(localStorage.getItem('index')) ?? 0)
// 设置当前底部栏的位置以及路由跳转
const setCurrentIndex = (index, path) => {
    currentIndex.value = index
    localStorage.setItem('index', index)
    router.push(path)
}
</script>

<style scoped>
.content {
  width: 100%;
  height: 616px;
  overflow-x: hidden;
  overflow-y: scroll;
}

/* 底部导航栏 */
.footer {
  box-sizing: border-box;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-around;
  padding-top: 10px;
  border-top: 1px solid rgb(198, 198, 198);
}

.footer > .item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  flex-grow: 1;
}

.footer > .item > img {
  width: 20px;
  height: 20px;
  transition: .2s;
}

.footer > .item > span {
  font-size: 13px;
  color: rgba(97, 97, 97, 0.951);
}

/* 导航栏被选中的状态 */
.active-name {
    color: var(--main-color) !important;
}

.active-img {
    transform: translateY(-5px);
    height: 100%;
}

/* 隐藏滚动轴 */
::-webkit-scrollbar {
  display: none;
}
</style>
