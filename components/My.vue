<template>
  <div class="my-container">
    <!-- 顶部背景和用户信息 -->
    <div class="header-bg">
      <!-- 状态栏 -->
      <div class="status-bar">
        <span class="time">08:15</span>
        <div class="right-icons">
          <van-icon name="moon" />
          <span class="network">53.0 KB/S</span>
          <span class="signal">HD 5G</span>
          <span class="battery">38%</span>
        </div>
      </div>
      
      <div class="user-info">
        <div class="user-header">
          <van-image
            round
            width="60"
            height="60"
            :src="userInfo.avatar"
          />
          <div class="username">
            <span>{{ userInfo.username }}</span>
            <van-tag plain type="primary" size="small" class="gender-tag">♂</van-tag>
          </div>
        </div>
        
        <!-- 用户数据统计 -->
        <div class="user-stats">
          <div class="stat-item" v-for="(item, index) in stats" :key="index">
            <div class="stat-num">{{ item.number }}</div>
            <div class="stat-label">{{ item.label }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 功能菜单列表 -->
    <van-cell-group class="menu-group" :border="false">
      <van-cell title="隐私" is-link>
        <template #icon>
          <van-icon name="lock" class="menu-icon" />
        </template>
      </van-cell>
      
      <van-cell title="访客" is-link>
        <template #icon>
          <van-icon name="eye-o" class="menu-icon" />
        </template>
        <template #right-icon>
          <div class="right-content">
            <span class="badge">+1</span>
            <van-icon name="arrow" />
          </div>
        </template>
      </van-cell>
      
      <van-cell title="邀请" is-link>
        <template #icon>
          <van-icon name="friends-o" class="menu-icon" />
        </template>
        <template #right-icon>
          <div class="right-content">
            <span class="sub-text">叫人来狐友玩</span>
            <van-icon name="arrow" />
          </div>
        </template>
      </van-cell>
      
      <van-cell title="活动" is-link>
        <template #icon>
          <van-icon name="gift-o" class="menu-icon" />
        </template>
      </van-cell>
      
      <van-cell title="扫一扫" is-link>
        <template #icon>
          <van-icon name="scan" class="menu-icon" />
        </template>
      </van-cell>
      
      <van-cell title="帮助与客服" is-link>
        <template #icon>
          <van-icon name="service-o" class="menu-icon" />
        </template>
      </van-cell>
      
      <van-cell title="设置" is-link>
        <template #icon>
          <van-icon name="setting-o" class="menu-icon" />
        </template>
      </van-cell>
    </van-cell-group>

    <!-- 底部导航栏 -->
    <van-tabbar v-model="active" :border="false">
      <van-tabbar-item icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item icon="notes-o">动态</van-tabbar-item>
      <van-tabbar-item icon="chat-o">私信</van-tabbar-item>
      <van-tabbar-item icon="manager-o">我</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'

export default {
  name: 'My',
  setup() {
    const active = ref(3)
    const userInfo = reactive({
      username: 'cccyyyer',
      avatar: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg'
    })

    const stats = reactive([
      { number: 1, label: '动态' },
      { number: 0, label: '互关' },
      { number: 2, label: '关注' },
      { number: 0, label: '圈子' },
      { number: 2, label: '粉丝' }
    ])

    return {
      active,
      userInfo,
      stats
    }
  }
}
</script>

<style scoped>
.my-container {
  min-height: 100vh;
  background: #f7f8fa;
}

.header-bg {
  background: linear-gradient(120deg, #c8e6c9 30%, #fff9c4 70%);
  padding: 0 16px;
  position: relative;
  height: 220px;
}

.status-bar {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  color: #000;
  font-size: 14px;
}

.right-icons {
  display: flex;
  align-items: center;
  gap: 8px;
}

.user-info {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  margin-top: 30px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}

.user-header {
  display: flex;
  align-items: center;
  margin-bottom: 24px;
}

.username {
  margin-left: 12px;
  font-size: 18px;
  font-weight: 500;
  display: flex;
  align-items: center;
}

.gender-tag {
  margin-left: 8px;
  padding: 0 4px;
  border-color: #1989fa;
}

.user-stats {
  display: flex;
  justify-content: space-around;
  text-align: center;
}

.stat-item {
  flex: 1;
}

.stat-num {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.stat-label {
  font-size: 12px;
  color: #999;
  margin-top: 4px;
}

.menu-group {
  margin-top: 8px;
  background: #fff;
}

.menu-icon {
  font-size: 22px;
  margin-right: 8px;
  color: #666;
}

.right-content {
  display: flex;
  align-items: center;
  gap: 4px;
}

.badge {
  color: #ff6b6b;
  font-size: 13px;
}

.sub-text {
  color: #999;
  font-size: 13px;
}

:deep(.van-cell) {
  align-items: center;
  padding: 16px;
  font-size: 16px;
}

:deep(.van-cell::after) {
  border-bottom: 0.5px solid #f5f5f5;
}

:deep(.van-cell__right-icon) {
  color: #ccc;
}

:deep(.van-tabbar) {
  height: 60px;
}

:deep(.van-tabbar-item) {
  color: #666;
  font-size: 12px;
}

:deep(.van-tabbar-item--active) {
  color: #1989fa;
}

:deep(.van-tabbar-item__icon) {
  font-size: 22px;
  margin-bottom: 4px;
}
</style> 