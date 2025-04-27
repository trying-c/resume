<script setup>

</script>

<template>
    <section>
        <div class="card">
            <h2>技术能力</h2>
            <div style="margin-top: 2rem;">
                <span class="skill-tag">React</span>
                <span class="skill-tag">Node.js</span>
                <span class="skill-tag">TypeScript</span>
                <span class="skill-tag">AWS</span>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
/* 技能标签动画 */
.skill-tag {
    // display: inline-block;
    padding: 0.8rem 1.5rem;
    margin: 0.5rem;
    border-radius: 25px;
    background: $taro-purple;
    color: white;
    transform: translateY(20px);
    opacity: 0;
    transition: all 0.5s ease;
}
</style>