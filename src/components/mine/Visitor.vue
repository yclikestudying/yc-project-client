<template>
  <div class="visitor">
    <div class="header">
      <van-nav-bar
        fixed
        placeholder
        class="navBar"
        :title="title"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import router from '@/router';
import { useRoute } from 'vue-router';

// 获取 title
const route = useRoute()
const title = ref("最近" + route.query.title)

// 返回上一页
const onClickLeft = () => {
    router.back()
}
</script>