<script setup>
import Header from './components/Header.vue';

const menuItems = [
  { id: 'home', label: '首页', to: '/' },
  { id: 'about', label: '关于', to: '/about' },
  // { id: 'contact', label: '联系', hash: '#contact' },
  { id: 'portfolio', label: '作品', to: '/portfolio' }
]
</script>

<template>
  <Header class="resume-header" :items="menuItems" />
  <router-view></router-view>
</template>

<style lang="scss">
.resume-header {
  position: fixed; // 固定定位 
  left: 50%;
  transform: translateX(-50%);
}

body {
  height: 120vh;
}
</style>