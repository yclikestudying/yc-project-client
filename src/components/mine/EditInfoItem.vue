<template>
  <div class="editInfoItem">
    <div class="header">
      <van-nav-bar
        fixed
        placeholder
        class="navBar"
        :title="title"
        left-text="取消"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>

    <!-- 用户名 -->
    <div class="content" v-if="title === '用户名'">
      <div class="text">
        <input
          class="input"
          type="text"
          placeholder="请输入新的用户名"
          v-model="userInfo.userName"
        />
      </div>
      <div class="prompt">
        <span>2-15个字符，支持中英文、数字、-或_，1天内修改1次</span>
      </div>
      <!-- 保存 -->
      <div class="submit" @click="submit('userName')">
        <van-button class="button" type="primary">保存</van-button>
      </div>
    </div>

    <!-- 性别 -->
    <div class="content" v-if="title === '性别'">
      <div class="gender">
        <van-radio-group v-model="userInfo.userGender">
          <div class="gender-item"><van-radio name="1">男</van-radio></div>
          <div class="gender-item"><van-radio name="0">女</van-radio></div>
        </van-radio-group>
      </div>
      <!-- 保存 -->
      <div class="submit" @click="submit('userGender')">
        <van-button class="button" type="primary">保存</van-button>
      </div>
    </div>

    <!-- 生日 -->
    <div class="content" v-if="title === '生日'">
      <div class="show">日期: {{ userInfo.userBirthday || "暂无" }}</div>
      <div class="birthday">
        <van-date-picker
          v-model="currentDate"
          title="选择日期"
          :min-date="minDate"
          :max-date="maxDate"
          :show-toolbar="showToolbar"
        />
      </div>
      <!-- 保存 -->
      <div class="submit" @click="submit('userBirthday')">
        <van-button class="button" type="primary">保存</van-button>
      </div>
    </div>

    <!-- 简介 -->
    <div class="content" v-if="title === '简介'">
      <div class="profile">
        <textarea
          v-model="userInfo.userProfile"
          class="textarea"
          cols="38"
          rows="10"
          placeholder="把你的职业、爱好、座右铭写上"
        ></textarea>
      </div>
      <!-- 保存 -->
      <div class="submit" @click="submit('userProfile')">
        <van-button class="button" type="primary">保存</van-button>
      </div>
    </div>

    <!-- 所在地 -->
    <div class="content" v-if="title === '所在地'">
      <div>
        <van-field
          v-model="fieldValue"
          readonly
          label="地区"
          placeholder="请选择所在地区"
        />
        <van-cascader
          v-model="cascaderValue"
          title="请选择所在地区"
          :options="options"
          active-color="var(--main-color)"
          @finish="onFinish"
        />
      </div>
      <!-- 保存 -->
      <div class="submit" @click="submit('userLocation')">
        <van-button class="button" type="primary">保存</van-button>
      </div>
    </div>

    <!-- 家乡 -->
    <div class="content" v-if="title === '家乡'">
      <div>
        <van-field
          v-model="fieldValue1"
          readonly
          label="地区"
          placeholder="请选择你的家乡"
        />
        <van-cascader
          v-model="cascaderValue1"
          title="请选择你的家乡"
          :options="options"
          active-color="var(--main-color)"
          @finish="onFinish1"
        />
      </div>
      <!-- 保存 -->
      <div class="submit" @click="submit('userHomeTown')">
        <van-button class="button" type="primary">保存</van-button>
      </div>
    </div>

    <!-- 专业 -->
    <div class="content" v-if="title === '专业'">
      <div>
        <van-field
          v-model="userInfo.userProfession"
          readonly
          label="专业"
          placeholder="请选择你的专业"
        />
      </div>
      <div class="item">
        <div class="professional">
          <van-sidebar v-model="activeIndex" class="van-sidebar">
            <template
              v-for="(item, itemIndex) in professionalItem"
              :key="itemIndex"
            >
              <van-sidebar-item :title="item.name" />
              <div class="professional-item">
                <template
                  v-for="(name, nameIndex) in professionalItem[activeIndex]
                    .data"
                  :key="nameIndex"
                >
                  <van-tag
                    :class="{
                      'van-tag': true,
                      active: currentProfessionalName === name,
                    }"
                    type="primary"
                    size="large"
                    @click="setCurrentIndex(name)"
                    >{{ name }}</van-tag
                  >
                </template>
              </div>
            </template>
          </van-sidebar>
        </div>
      </div>
      <!-- 保存 -->
      <div class="submit" @click="submit('userProfession')">
        <van-button class="button" type="primary">保存</van-button>
      </div>
    </div>

    <!-- 个性标签 -->
    <div class="content" v-if="title === '标签编辑'">
      <div class="header">
        <div class="top">
          <span>已选</span>
          <span>{{ tag_array.length }}/{{ max_tag_numbers }}</span>
        </div>
        <div class="bottom">
          <template v-for="(tag, index) in tag_array" :key="index">
            <van-tag
              class="van-tag"
              type="primary"
              size="large"
              @click="deleteTag(tag)"
              >{{ tag }}</van-tag
            >
          </template>
        </div>
      </div>
      <div class="main">
        <div class="professional">
          <van-sidebar v-model="activeIndex" class="van-sidebar">
            <template v-for="(item, itemIndex) in tags" :key="itemIndex">
              <van-sidebar-item :title="item.name" />
              <div class="professional-item">
                <template
                  v-for="(name, nameIndex) in tags[activeIndex].data"
                  :key="nameIndex"
                >
                  <van-tag
                    :class="{
                      'van-tag': true,
                      active: tag_array.includes(name),
                    }"
                    type="primary"
                    size="large"
                    @click="saveName(name)"
                    >{{ name }}</van-tag
                  >
                </template>
              </div>
            </template>
          </van-sidebar>
        </div>
      </div>
      <!-- 保存 -->
      <div class="submit" @click="submit('userTags')">
        <van-button class="button" type="primary">保存</van-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRoute } from "vue-router";
import router from "@/router";
import { useCascaderAreaData } from "@vant/area-data";
import { showToast } from "vant";
import request from "@/axios";
import useMyStore from "@/store/useMyStore";
import { ConsoleSqlOutlined } from "@ant-design/icons-vue";

// 状态管理
const myStore = useMyStore();

// 用户信息
let userInfo = reactive({
  userName: myStore.userInfo.userName,
  userGender: String(myStore.userInfo.userGender),
  userBirthday: myStore.userInfo.userBirthday,
  userProfile: myStore.userInfo.userProfile,
  userLocation: myStore.userInfo.userLocation,
  userHomeTown: myStore.userInfo.userHometown,
  userProfession: myStore.userInfo.userProfession,
  userTags: myStore.userInfo.userTags,
});

// 获取上一页面传递的标题名
const route = useRoute();
const title = ref(route.query.title);

// 返回上一页
const onClickLeft = () => {
  router.back();
};

// 日期选择是否显示顶部栏
const showToolbar = ref(false);

// 当前时间
const currentDate = ref(["2024", "01", "01"]);
// 时间范围
const minDate = new Date(1949, 10, 1);
const maxDate = new Date(2024, 11, 31);

// 所在地
const fieldValue = ref(userInfo.userLocation);
const cascaderValue = ref("");
// 家乡
const fieldValue1 = ref(userInfo.userHomeTown);
const cascaderValue1 = ref("");
// 选项列表，children 代表子选项，支持多级嵌套
const options = useCascaderAreaData();
// 全部选项选择完毕后，会触发 finish 事件
const onFinish = ({ selectedOptions }) => {
  fieldValue.value = selectedOptions.map((option) => option.text).join("-");
};
const onFinish1 = ({ selectedOptions }) => {
  fieldValue1.value = selectedOptions.map((option) => option.text).join("-");
};

// 专业
const activeIndex = ref(0);
const currentProfessionalName = ref("");
// 专业
const professionalItem = ref([
  {
    name: "工科",
    data: ["专业1", "专业2"],
  },
  {
    name: "非工科",
    data: ["专业3", "专业4"],
  },
]);
// 标签
const tags = ref([
  {
    name: "运动",
    data: ["跑步", "游泳"],
  },
  {
    name: "学习",
    data: ["阅读名著", "古诗宋词"],
  },
]);
// 设置 currentIndex
const setCurrentIndex = (name) => {
  currentProfessionalName.value = name;
  userInfo.userProfession =
    professionalItem.value[activeIndex.value].name +
    "-" +
    currentProfessionalName.value;
};

// 个性标签
let tag_array = ref(JSON.parse(myStore.userInfo.userTags) || []);
const max_tag_numbers = ref(3);
const saveName = (name) => {
  // 数组中存在就删除
  let index = tag_array.value.indexOf(name);
  if (index !== -1) {
    tag_array.value.splice(index, 1);
    return;
  }

  // 标签达到上限进行限制
  if (tag_array.value.length >= max_tag_numbers.value) {
    showToast("标签数量已达上限");
    return;
  }

  // 数组中不存在就添加
  if (!tag_array.value.includes(name)) {
    tag_array.value.push(name);
  }
};

// 已选标签中点击时删除标签
const deleteTag = (name) => {
  let index = tag_array.value.indexOf(name);
  if (index !== -1) {
    tag_array.value.splice(index, 1);
    return;
  }
};

// 修改信息
const submit = async (name) => {
  if (name === "userBirthday") {
    userInfo.userBirthday =
      currentDate.value[0] +
      "-" +
      currentDate.value[1] +
      "-" +
      currentDate.value[2];
  }
  if (name === "userLocation") {
    userInfo.userLocation = fieldValue.value;
  }
  if (name === "userHomeTown") {
    userInfo.userHomeTown = fieldValue1.value;
  }
  if (name === "userTags") {
    userInfo.userTags = JSON.stringify(tag_array.value);
  }
  let nameValue = userInfo[`${name}`];
  if (name === "userGender") {
    nameValue = Number(nameValue)
  }
  await request
    .put("/userInfo/updateUserInfo", {
      key: name,
      value: nameValue,
    })
    .then((res) => {
      if (res.code === 200) {
        myStore.userInfo[`${name}`] = nameValue;
        showToast("修改成功");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
</script>

<style src="./css/editInfoItem.css" scoped />
