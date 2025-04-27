<script setup>

</script>

<template>
    <section>
        <div class="card">
            <h1 style="font-size: 3rem; margin-bottom: 1rem;">QIAOYING ZHONG</h1>
            <p style="font-size: 1.5rem;">全栈开发工程师</p>
            <div style="margin-top: 3rem;">
                <button class="cta-btn">个人主页</button>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
/* 按钮样式 */
.cta-btn {
    padding: 1rem 2.5rem;
    border: none;
    border-radius: 30px;
    background: $golden-yellow;
    color: $slate-gray;
    font-weight: bold;
    cursor: pointer;
    transition: transform 0.3s;
}

.cta-btn:hover {
    transform: scale(1.05);
}
</style>