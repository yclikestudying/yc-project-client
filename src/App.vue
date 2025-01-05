<template>
    <div class="app">
        <router-view/>
    </div>
</template>

<script setup>
    
</script>

<style scoped>
.app {
    width: 100vw;
    height: 100vh;
    overflow: hidden
}

/* 隐藏滚动轴 */
::-webkit-scrollbar {
  display: none;
}

</style>