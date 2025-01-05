<template>
  <div class="editInfo">
    <div class="nav">
      <van-nav-bar
        fixed
        placeholder
        class="navBar"
        title="编辑资料"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>

    <div class="data">
      <template v-for="(item, index) in data_array" :key="index">
        <div class="part">
          <span>{{ item.title }}</span>
        </div>
        <template v-for="(content, index) in item.content" :key="index">
          <div class="content" @click="goToEditInfoItem(content.name)">
            <div class="item">
              <div class="left">
                <span>{{ content.name }}</span>
              </div>
              <div class="right">
                <span>{{ content.data }}</span>
                <img src="/mine/方向-向右.svg" alt="" />
              </div>
            </div>
          </div>
        </template>
      </template>
    </div>

    <div class="tag">
      <template v-for="index in 20">
        <div class="tag-item">
          <van-tag class="van-tag" type="primary" size="large">标签{{ index }}</van-tag>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import router from "@/router";

// 返回上一页
const onClickLeft = () => {
  router.back();
};

// 资料信息
const data = ref({
  username: "杨闯",
});

// 编写资料内容数组
const data_array = ref([
  {
    title: "基本资料",
    content: [
      {
        name: "用户名",
        data: "coderyc",
      },
      {
        name: "性别",
        data: "男",
      },
      {
        name: "生日",
        data: "",
      },
      {
        name: "简介",
        data: "",
      },
    ],
  },
  {
    title: "地区",
    content: [
      {
        name: "所在地",
        data: "",
      },
      {
        name: "家乡",
        data: "",
      },
    ],
  },
  {
    title: "行业-职业",
    content: [
      {
        name: "专业",
        data: "",
      },
    ],
  },
  {
    title: "个性标签",
    content: [
      {
        name: "标签编辑",
        data: "",
      },
    ],
  },
]);

// 去到具体的编辑资料页面
const goToEditInfoItem = (name) => {
  router.push({
    path: '/editInfoItem',
    query: {
      title: name
    }
  })
}

</script>

<style scoped>
.editInfo {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
}

/* 导航栏设置 */
.editInfo > .nav > .navBar {
  --van-nav-bar-icon-color: black;
  --van-nav-bar-text-color: black;
}

/* 编写资料设置 */
.editInfo > .data > .part {
  box-sizing: border-box;
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
  background-color: #F2F3F8;
}

.editInfo > .data > .part > span {
  padding-left: 20px;
  font-size: 14px;
}

.editInfo > .data > .content {
  box-sizing: border-box;
  width: 100%;
}

.editInfo > .data > .content > .item {
  box-sizing: border-box;
  width: 90%;
  height: 40px;
  margin: 0 auto;
  padding: 25px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgb(240, 238, 238);
}

.editInfo > .data > .content > .item > .left {
  display: flex;
  align-items: center;
}

.editInfo > .data > .content > .item > .right {
  display: flex;
  align-items: center;
}

.editInfo > .data > .content > .item > .right > img {
  width: 20px;
  height: 20px;
}

/* 标签设置 */
.editInfo > .tag {
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
}

.editInfo > .tag > .tag-item {
  margin: 5px;
}

.editInfo > .tag > .tag-item > .van-tag {
  background: var(--main-color);
}
</style>
