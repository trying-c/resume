<script setup>
defineOptions({
    name: 'TitleBox'
})
defineProps({
    title: {
        type: String,
        default: ''
    },
    subtitle: {
        type: String,
        default: ''
    }
})
</script>

<template>
    <div class="title-box">
        <div class="title-box__title">
            <slot name="title">
                <h1 v-if="title !== false">{{ title }}</h1>
            </slot>
        </div>
        <div class="title-box__subtitle">
            <slot name="subtitle">
                <h2 v-if="subtitle !== false">{{ subtitle }}</h2>
            </slot>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.title-box {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    &__title {
        margin-bottom: 1rem;
        font-size: 2.8rem;

    }

    &__subtitle {
        padding: 1rem;
        border-radius: 0.5rem;
    }
}
</style>