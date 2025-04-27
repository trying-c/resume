import { defineStore } from 'pinia'

export const useStore = defineStore('default', {
    state: () => ({
        title: 'QIAOYING ZHONG',
        count: 0,
    }),
    actions: {
        increment() {
            this.count++;
        },
        decrement() {
            this.count--;
        },
        reset() {
            this.count = 0;
        }
    },
    getters: {

    }
})