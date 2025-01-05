import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/Login.vue'),
      meta: {
        title: '登录'
      }
    },
    {
      path: "/index",
      name: "index",
      component: () => import("../pages/Index.vue"),
      meta: {
        title: "首页",
      },
      redirect: "/index/home",
      children: [
        {
          path: "my",
          name: "my",
          component: () => import("../components/mine/My.vue"),
          meta: {
            title: "我的",
          },
        },
        {
          path: "message",
          name: "message",
          component: () => import("../components/message/Message.vue"),
          meta: {
            title: "消息",
          },
        },
        {
          path: "share",
          name: "share",
          component: () => import("../components/share/Share.vue"),
          meta: {
            title: "动态",
          },
        },
        {
          path: "home",
          name: "home",
          component: () => import("../components/home/Home.vue"),
          meta: {
            title: "首页",
          },
        },
      ],
    },
    {
      path: "/myIndex",
      name: "myIndex",
      component: () => import("@/components/mine/MyIndex.vue"),
      meta: {
        title: "我的主页",
      },
    },
    {
      path: "/editInfo",
      name: "editInfo",
      component: () => import("@/components/mine/EditInfo.vue"),
      meta: {
        title: "编辑资料",
      },
    },
    {
      path: "/editInfoItem",
      name: "editInfoItem",
      component: () => import("@/components/mine/EditInfoItem.vue"),
      meta: {
        title: "编辑资料-具体",
      },
    },
    {
      path: "/privacy",
      name: "privacy",
      component: () => import("@/components/mine/Privacy.vue"),
      meta: {
        title: "隐私",
      },
    },
    {
      path: "/visitor",
      name: "visitor",
      component: () => import("@/components/mine/Visitor.vue"),
      meta: {
        title: "最近访客",
      },
    },
    {
      path: "/activity",
      name: "activity",
      component: () => import("@/components/mine/Activity.vue"),
      meta: {
        title: "活动中心",
      },
    },
    {
      path: "/customerService",
      name: "customerService",
      component: () => import("@/components/mine/CustomerService.vue"),
      meta: {
        title: "帮助与客服",
      },
    },
    {
      path: "/setting",
      name: "setting",
      component: () => import("@/components/mine/Setting.vue"),
      meta: {
        title: "设置",
      },
    },
    {
      path: "/chat",
      name: "chat",
      component: () => import("@/components/message/Chat.vue"),
      meta: {
        title: "聊天",
      },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/pages/Login.vue"),
      meta: {
        title: "登录",
      },
    },
  ],
});

export default router;
