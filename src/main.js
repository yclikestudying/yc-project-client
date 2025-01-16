import "/node_modules/normalize.css";
// 全局样式
import './assets/css/global-style.css'
import { createApp } from "vue";
import App from "./App.vue";
const app = createApp(App);

// 引入全局路由
import router from "./router";
app.use(router);

// 引入 vant 样式
import "/node_modules/vant/lib/index.css";
// 引入 vant 相关组件
import {
  Tab,
  Tabs,
  Search,
  NavBar,
  Form,
  Field,
  CellGroup,
  Tag,
  Button,
  RadioGroup,
  Radio,
  DatePicker,
  Cascader,
  Sidebar,
  SidebarItem,
  Toast,
  FloatingBubble,
  ActionSheet,
  Icon,
  PullRefresh,
  Uploader,
  NumberKeyboard,
  Dialog,
} from "vant";
app.use(Tab);
app.use(Tabs);
app.use(Search);
app.use(NavBar);
app.use(Form);
app.use(Field);
app.use(CellGroup);
app.use(Tag);
app.use(Button);
app.use(RadioGroup);
app.use(Radio);
app.use(DatePicker);
app.use(Cascader);
app.use(Sidebar);
app.use(SidebarItem);
app.use(Toast);
app.use(FloatingBubble);
app.use(ActionSheet);
app.use(Icon);
app.use(PullRefresh)
app.use(Uploader)
app.use(NumberKeyboard)
app.use(Dialog)

// 引入持久化插件
import { createPinia } from "pinia";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)

app.mount("#app");
