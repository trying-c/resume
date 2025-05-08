<script setup>
defineOptions({
    name: 'Section'
})
defineProps({
    title: {
        type: String,
        default: ''
    }
})
</script>

<template>
    <section class="s-contianer">
        <div class="s-title">
            <slot name="title">
                <h2 v-if="title !== false">{{ title }}</h2>
            </slot>
        </div>
        <div class="s-content">
            <slot></slot>
        </div>
    </section>
</template>

<style lang="scss" scoped></style>