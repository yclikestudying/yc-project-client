import { defineStore } from "pinia";

const useMyStore = defineStore('myStore', {
    state: () => ({
        userInfo: null, // 用户个人信息
        articles: null,
    }),
    persist: true
})

export default useMyStore