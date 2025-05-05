<script setup>
import { useStore } from "@/stores/index.js";
const store = useStore()

function goSite() {
    window.open(store.Site, "_blank")
}
</script>

<template>
    <section>
        <div class="card">
            <h1 class="title" style="font-size: 3rem; margin-bottom: 1rem;">QIAOYING ZHONG</h1>
            <p style="font-size: 1.5rem;">前端开发工程师</p>
            <div style="margin-top: 3rem;">
                <Button class="cta-btn" shape="circle" size="large" @click="goSite">个人主页</Button>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.card{
    justify-content: center !important;
    align-items: center !important;
}
/* 按钮样式 */
.cta-btn {
    border: none;
    background: $golden-yellow;
    color: $slate-gray;
    font-weight: bold;
    transition: transform 0.3s;
}

.cta-btn:hover {
    box-shadow: none !important;
    transform: scale(1.05);
    background: $golden-yellow;
    color: $slate-gray;
}
</style>