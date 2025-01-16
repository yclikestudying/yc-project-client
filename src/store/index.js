import { defineStore } from "pinia";

const useGlobalStore = defineStore('globalStore', {
    state: () => ({
        token: null
    }),
    persist: true
})

export default useGlobalStore