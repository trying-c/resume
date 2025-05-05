import { defineStore } from 'pinia'

export const useStore = defineStore('default', {
    state: () => ({
        title: 'QIAOYING ZHONG',
        GitHub: 'https://github.com/trying-c',
        Site: 'https://trying-c.github.io',
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