<template>
    <div class="share">
      <div class="header">
        <template v-for="(item, index) in tab_array">
          <div class="item" @click="setCurrentIndex(index)">
            <span :class="{ 'active-span': currentIndex === index }">{{
              item.name
            }}</span>
            <span :class="{ 'active-bottom': currentIndex === index }"></span>
          </div>
        </template>
      </div>
      <div class="search">
        <van-search v-model="searchContent" placeholder="请输入搜索关键词" />
      </div>
    </div>
  
    <div class="main">
      <div
        :class="{
          left: currentIndex === 1,
        }"
      >
        关注内容
      </div>
      <div
        :class="{
          originalPosition: true,
          right: currentIndex === 1,
        }"
      >
        推荐内容
      </div>
    </div>
  
    <!-- 浮动气泡 -->
    <van-floating-bubble
      class="van-floating-bubble"
      icon="plus"
      @click="onClick"
      v-model:offset="offset"
      axis="lock"
      style="--van-floating-bubble-background: var(--main-color)"
    />
  </template>
  
  <script setup>
  import { ref } from "vue";
  
  // 当前导航栏位置
  const currentIndex = ref(0);
  
  // 导航栏数组
  const tab_array = ref([
    {
      name: "关注",
    },
    {
      name: "推荐",
    },
  ]);
  
  // 获取当前导航栏位置
  const setCurrentIndex = (index) => {
    currentIndex.value = index;
  };
  
  // 搜索内容
  const searchContent = ref("");
  
  // 浮动气泡
  const onClick = () => {
    show.value = true;
  };
  // 浮动气泡初始位置
  const offset = ref({ x: -10, y: 550 });
  </script>
  
  <style src="./css/share.css" scoped />
  