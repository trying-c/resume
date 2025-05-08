<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import gsap from 'gsap'
import { throttle } from 'lodash'

const props = defineProps({
    items: {
        type: Array,
        required: true,
        default: () => []
    }
})

const menuItems = ref(props.items)
const headerRef = ref(null)
const indicator = ref(null)
const currentIndex = ref(0)
const router = useRouter()
const route = useRoute()

const showBg = ref(false)
const isScroll = ref(false)

// 监听滚动事件
const handleScroll = throttle(() => {
    if (isScroll.value) return
    showBg.value = (window.scrollY > 100) // 滚动超过100px触发

    setTimeout(() => {
        isScroll.value = false;
    }, 300)
}, 300)

// 计算当前激活的菜单项
const updateActiveIndex = () => {
    const currentPath = route.path
    const currentHash = route.hash

    const index = menuItems.value.findIndex(item => {
        if (item.to) {
            return item.to === currentPath
        }
        if (item.hash) {
            return item.hash === currentHash
        }
        return false
    })

    currentIndex.value = index !== -1 ? index : 0
}

// 动画更新指示器位置
const updateIndicator = () => {
    const activeItem = headerRef.value.children[currentIndex.value]
    if (activeItem && indicator.value) {
        const { offsetLeft, offsetWidth } = activeItem
        gsap.to(indicator.value, {
            left: offsetLeft,
            width: offsetWidth,
            duration: 0.3,
            ease: 'power2.out'
        })
    }
}

// 处理菜单点击
const handleMenuClick = (item, index) => {
    currentIndex.value = index

    if (item.to) {
        // 路由跳转
        router.push(item.to)
    } else if (item.hash) {
        // hash 导航平滑滚动
        const element = document.querySelector(item.hash)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
    }
}

// 监听路由变化
watch(() => route.fullPath, () => {
    updateActiveIndex()
    updateIndicator()
})

// 组件挂载时初始化
onMounted(() => {
    updateActiveIndex()
    updateIndicator()

    // 监听窗口大小变化
    window.addEventListener('resize', updateIndicator)
    window.addEventListener('scroll', handleScroll)
})

// 组件卸载时清理
onUnmounted(() => {
    window.removeEventListener('resize', updateIndicator)
    window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
    <nav class="header-container" :class="{ 'show': showBg }">
        <ul class="header-list" ref="headerRef">
            <li v-for="(item, index) in menuItems" :key="item.id" class="header-item"
                :class="{ 'active': currentIndex === index }" @click="handleMenuClick(item, index)">
                <router-link v-if="item.to" :to="item.to" class="header-link" @click.prevent>
                    {{ item.label }}
                </router-link>
                <a v-else-if="item.hash" :href="item.hash" class="header-link" @click.prevent>
                    {{ item.label }}
                </a>
                <span v-else class="header-link">{{ item.label }}</span>
            </li>
            <div class="active-indicator" ref="indicator"></div>
        </ul>
    </nav>
</template>

<style lang="scss" scoped>
$active-text-color: #FFFFFF; // 选中文字白色
$shadow-color: rgba($primary-color, 0.3); // 香芋紫阴影
$indicator-color: #C4A7E7; // 更饱和的紫色指示器

.header {

    &-container {
        margin: 20px;
        padding: 8px;
        border-radius: 999px; // 两边半圆形状
        display: inline-flex;
        z-index: 10;
        background: transparent; // 默认透明背景 
        border: 1px solid rgba($primary-color, 0); // 默认微弱边框
        transition: background 0.3s ease, backdrop-filter 0.3s ease, box-shadow 0.3s ease, border 0.3s ease; // 包含边框过渡

        &.show {
            background: rgba($primary-color, 0.2); // 稍增加透明度
            backdrop-filter: blur(8px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); // 稍强阴影
            border: 1px solid rgba($primary-color, 0.4); // 增强边框
        }
    }

    &-list {
        display: flex;
        gap: 8px;
        list-style: none;
        padding: 0;
        margin: 0;
        position: relative;
    }

    &-item {
        padding: 8px 24px;
        cursor: pointer;
        position: relative;
        z-index: 1;

        &.active>.header-link {
            color: $active-text-color; // 选中时白色文字
        }

    }

    &-link {
        text-decoration: none;
        color: $text-color; // 深紫色文字
        font-size: 16px;
        font-weight: 500;
        transition: color 0.3s;
    }

    @media (max-width: 768px) {
        &-container {
            padding: 8px 15px;
        }

        &-item {
            padding: 8px 15px;
        }

        &-link {
            font-size: 14px;
        }
    }
}

.active-indicator {
    position: absolute;
    min-width: 44px;
    height: 100%;
    border-radius: 56px; // 指示器两边半圆
    z-index: 0;
    transition: none; // GSAP 控制动画 
    background: linear-gradient(to right,
            $indicator-color,
            rgba($indicator-color, 0.8)); // 渐变指示器
    box-shadow: 0 2px 8px $shadow-color; // 增强阴影
}
</style>