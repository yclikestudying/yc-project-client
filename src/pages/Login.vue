<template>
  <div class="login-container">
    <!-- 背景动画 -->
    <div class="background">
      <div class="circle circle1"></div>
      <div class="circle circle2"></div>
    </div>

    <!-- 添加一个滚动容器 -->
    <div class="scroll-container">
      <div class="content">
        <!-- Logo 和标题 -->
        <div class="header">
          <div class="logo">
            <van-icon name="shop" size="48" color="var(--main-color)" />
          </div>
          <h1 class="title">校园集市</h1>
          <p class="subtitle">你的校园二手交易平台</p>
        </div>

        <!-- 切换标签 -->
        <div class="tabs">
          <div
            class="tab"
            :class="{ active: isLoginMode }"
            @click="isLoginMode = true"
          >
            学生登录
          </div>
          <div
            class="tab"
            :class="{ active: !isLoginMode }"
            @click="isLoginMode = false"
          >
            新生注册
          </div>
          <div
            class="tab-slider"
            :style="{ left: isLoginMode ? '0' : '50%' }"
          ></div>
        </div>

        <!-- 表单区域 -->
        <div class="form-container">
          <form @submit.prevent="handleSubmit">
            <!-- 手机号输入 -->
            <div class="input-group">
              <label>手机号码</label>
              <div class="input-wrapper">
                <van-icon name="phone-o" class="input-icon" />
                <input
                  type="tel"
                  v-model="formData.phone"
                  placeholder="请输入手机号码"
                  maxlength="11"
                  @input="validatePhone"
                />
              </div>
              <span class="error-message" v-if="errors.phone">{{
                errors.phone
              }}</span>
            </div>

            <!-- 密码输入 -->
            <div class="input-group">
              <label>密码</label>
              <div class="input-wrapper">
                <van-icon name="lock" class="input-icon" />
                <input
                  :type="showPassword ? 'text' : 'password'"
                  v-model="formData.password"
                  placeholder="请输入密码"
                  @input="validatePassword"
                />
                <van-icon
                  :name="showPassword ? 'eye-o' : 'closed-eye'"
                  class="toggle-password"
                  @click="showPassword = !showPassword"
                />
              </div>
              <span class="error-message" v-if="errors.password">{{
                errors.password
              }}</span>
            </div>

            <!-- 确认密码（仅注册时显示） -->
            <div class="input-group" v-if="!isLoginMode">
              <label>确认密码</label>
              <div class="input-wrapper">
                <van-icon name="lock" class="input-icon" />
                <input
                  :type="showPassword ? 'text' : 'password'"
                  v-model="formData.confirmPassword"
                  placeholder="请再次输入密码"
                  @input="validateConfirmPassword"
                />
              </div>
              <span class="error-message" v-if="errors.confirmPassword">{{
                errors.confirmPassword
              }}</span>
            </div>

            <!-- 提交按钮 -->
            <van-button
              block
              :loading="loading"
              native-type="submit"
              class="submit-btn"
            >
              {{ isLoginMode ? "进入校园集市" : "开启校园生活" }}
            </van-button>
          </form>

          <!-- 其他登录方式 -->
          <div class="other-login">
            <div class="divider">
              <span>快捷登录</span>
            </div>
            <div class="social-icons">
              <div
                class="social-icon wechat"
                @click="handleSocialLogin('wechat')"
              >
                <van-icon name="wechat" size="28" color="#07c160" />
                <span>微信</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import router from "@/router";
import { showToast } from "vant";
import request from "@/axios";
import useGlobalStore from "@/store";
import useMyStore from "@/store/useMyStore";

// 状态管理
const isLoginMode = ref(true);
const loading = ref(false);
const showPassword = ref(false);
const globalStore = useGlobalStore();
const myStore = useMyStore();

// 表单数据
const formData = reactive({
  phone: "17823257046",
  password: "111111",
  confirmPassword: "111111",
});

// 错误信息
const errors = reactive({
  phone: "",
  password: "",
  confirmPassword: "",
});

// 表单验证
const validatePhone = () => {
  const phoneRegex = /^1[3-9]\d{9}$/;
  if (!formData.phone) {
    errors.phone = "请输入手机号码";
  } else if (!phoneRegex.test(formData.phone)) {
    errors.phone = "请输入正确的手机号码";
  } else {
    errors.phone = "";
  }
};

const validatePassword = () => {
  if (!formData.password) {
    errors.password = "请输入密码";
  } else if (formData.password.length < 6) {
    errors.password = "密码长度不能少于6位";
  } else {
    errors.password = "";
  }
};

const validateConfirmPassword = () => {
  if (!formData.confirmPassword) {
    errors.confirmPassword = "请确认密码";
  } else if (formData.confirmPassword !== formData.password) {
    errors.confirmPassword = "两次输入的密码不一致";
  } else {
    errors.confirmPassword = "";
  }
};

// 表单提交
const handleSubmit = async () => {
  // 验证所有字段
  validatePhone();
  validatePassword();
  if (!isLoginMode.value) {
    validateConfirmPassword();
  }

  // 检查是否有错误
  if (
    errors.phone ||
    errors.password ||
    (!isLoginMode.value && errors.confirmPassword)
  ) {
    return;
  }

  loading.value = true;

  try {
    if (!isLoginMode.value) {
      await request
        .post("/user/phoneRegister", formData)
        .then((res) => {
          if (res.code === 200) {
            isLoginMode.value = true;
            showToast("注册成功");
          } else {
            console.log(res);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      await request
        .post("/user/phoneLogin", formData)
        .then(async (res) => {
          if (res.code === 200) {
            globalStore.token = res.data; // 存储token
            await request
              .get("/userInfo/getUserInfo")
              .then((res) => {
                myStore.userInfo = res.data;
                router.push("/index");
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            console.log(res);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  } catch (error) {
    showToast("操作失败，请重试", "error");
  } finally {
    loading.value = false;
  }
};

// 其他登录处理
const handleSocialLogin = (platform) => {
  if (platform === "wechat") {
    showToast("正在使用微信登录...");
  } else {
    showToast("正在使用校园卡登录...");
  }
};
</script>

<style src="./css/login.css" scoped>
.login-container {
  min-height: 100vh;
  width: 100%;
  background: #f8f9fa;
  position: relative;
  display: flex;
  flex-direction: column;
}

/* 背景样式 */
.background {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}

/* 滚动容器样式 */
.scroll-container {
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch; /* 增加 iOS 滚动流畅度 */
  padding: 20px 0;
}

.content {
  position: relative;
  z-index: 1;
  padding: 0 20px;
  max-width: 420px;
  margin: 0 auto;
}

/* 其他样式保持不变... */
</style>
