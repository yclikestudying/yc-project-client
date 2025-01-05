/**
 * 支持主动下拉页面刷新
 */
import { ref } from "vue";


const loading = ref(false);
const onRefresh = () => {
  setTimeout(() => {
    showToast("刷新成功");
    loading.value = false;
  }, 1000);
  loading.value = false;
};

export {loading, onRefresh}