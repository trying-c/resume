<script setup>
  import { useStore } from "@/stores/";
  const store = useStore()
</script>

<template>
    <h1>{{ store.title }}</h1>
</template>

<style lang="scss" scoped>
  
</style>