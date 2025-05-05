<script setup>
import Home from '@/components/Home.vue'
import Skills from '@/components/Skills.vue'
import Contact from '@/components/Contact.vue'
import Projects from '@/components/Projects.vue'
import { useStore } from '@/stores'
import { computed, onMounted, onUnmounted, ref, shallowRef } from 'vue'
import { throttle, debounce } from 'lodash'

const store = useStore()
const content = ref(null)
const contentRef = computed(() => content.value?.$el)
const pages = ref([
    { name: 'home', component: shallowRef(Home), offsetTop: 0 },
    { name: 'skills', component: shallowRef(Skills), offsetTop: 0 },
    { name: 'projects', component: shallowRef(Projects), offsetTop: 0 },
    { name: 'contact', component: shallowRef(Contact), offsetTop: 0 }
])
const pageIndex = ref(0)
const isScrolling = ref(false)
const isScrollUp = ref(false)

const isMobile = ref(false)
const checkIsMobile = () => {
    const userAgent = navigator.userAgent.toLowerCase()
    const mobileKeywords = /mobile|android|iphone|ipad|ipod|blackberry|opera mini|windows phone/i
    isMobile.value = mobileKeywords.test(userAgent) || window.innerWidth <= 768
}

/**
 * 监听滚动事件
 */
const handleScroll = throttle(() => {
    if (!isMobile.value || isScrolling.value) return

    const scrollTop = contentRef.value.scrollTop
    let index = pages.value.findIndex((page, i) => (
        i === pages.value.length - 1
            ? scrollTop >= page.offsetTop - 200
            : scrollTop >= page.offsetTop - 200 && scrollTop < pages.value[i + 1].offsetTop - 200
    ))
    if (pageIndex.value != index && index !== -1) {
        pageIndex.value = index
    }

    setTimeout(() => {
        isScrolling.value = false
    }, 500)
}, 200)

/**
 * 监听滚轮事件
 */
const handleWheel = throttle((e) => {
    if (isScrolling.value) return

    isScrolling.value = true

    if (e.deltaY > 0) {
        isScrollUp.value = false
        // 向下滚动
        pageIndex.value = Math.min(pageIndex.value + 1, pages.value.length - 1)
    } else {
        isScrollUp.value = true
        // 向上滚动
        pageIndex.value = Math.max(pageIndex.value - 1, 0)
    }

    scrollToIndex()

    setTimeout(() => {
        isScrolling.value = false
    }, 500)
}, 200);

/**
 * 滚动页面到对应页面
 */
const scrollToIndex = () => {
    contentRef.value.scrollTo({
        top: pages.value[pageIndex.value].offsetTop,
        behavior: 'smooth'
    })
}

/**
 * 上一页
 */
const toLast = () => {
    pageIndex.value--;
    scrollToIndex()
}
/**
 * 下一页
 */
const toNext = () => {
    pageIndex.value++;
    scrollToIndex()
}
/**禁用上一页 */
const leftBan = computed(() => pageIndex.value == 0);
/**禁用下一页 */
const rightBan = computed(() => pageIndex.value == pages.value.length - 1);

onMounted(() => {
    document.querySelectorAll('.page').forEach((el, index) => {
        pages.value[index].offsetTop = el.offsetTop;
    })
    checkIsMobile()
    if (!isMobile.value)
        window.addEventListener('wheel', handleWheel, { passive: true })
})

onUnmounted(() => {
    if (!isMobile.value)
        window.removeEventListener('wheel', handleWheel)
})
</script>

<template>
    <Layout class="resume-layout">

        <Header class="resume-header">
            <h2 class="resume-header-title">{{ store.title }}</h2>
            <div class="resume-header-content">

            </div>
            <div class="resume-header-btns">
            </div>
        </Header>
        <Content ref="content" class="resume-content" @scroll="handleScroll">
            <div class="resume-action">
                <Button class="link__color" ghost type="text" icon="ios-arrow-back" :disabled="leftBan"
                    @click="toLast"></Button>
                <Button class="link__color" ghost type="text" icon="ios-arrow-forward" :disabled="rightBan"
                    @click="toNext"></Button>
            </div>
            <component v-for="(page, index) in pages" :key="`pages_${page.name}`" :id="page.name" :is="page.component"
                class="page" :class="[`page_bgImg_${index}`, pageIndex === index ? 'active' : '']" />
        </Content>
    </Layout>
</template>

<style lang="scss" scoped>
@for $i from 0 through 5 {
    .page_bgImg_#{$i} {
        background-image: url(./assets/images/#{4-$i}.png);
        background-attachment: fixed;
        background-size: 100% 100%;
    }
}


/* 背景灰 */
.resume {
    &-action {
        position: fixed;
        width: 120px;
        height: 100px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        z-index: 3;

        // top: 50px;
        // right: 50px;

        // @include responseTo('phone') {
        //     top: calc(100% - 120px);
        //     right: -50px;
        //     transform: rotate(90deg);
        // }

        top: calc(100% - 120px);
        right: -50px;
        transform: rotate(90deg);

        :deep(.ivu-icon::before) {
            font-size: 48px;
        }

        :deep(.ivu-btn) {
            margin: 10px;
            border: none;
            box-shadow: none;

            &:hover {
                border: none;
                box-shadow: none;
            }
        }
    }

    &-layout {
        background-color: #f0f2f5;
        width: 100%;
        height: 100vh;
    }

    &-header {
        position: fixed;
        background-color: transparent;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        width: 100%;
        text-align: center;
        padding: 8px 20px;

        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1;

        &-title {
            color: $taro-purple;
        }

        &-content {
            flex: 1;
        }

    }

    &-content {
        position: relative;
        width: 100%;
        overflow-y: auto;

        &::-webkit-scrollbar {
            //隐藏或取消滚动条
            display: none;
        }


        .page {
            width: 100%;
            height: 100%;
            box-shadow: 2px 2px 4px #e8e8e8;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: all 1s ease;
            z-index: 1;
            color: white;

            &.active {
                opacity: 1;
                z-index: 2;
                transition: all 1s ease;
            }

            :deep(.card) {
                width: 100%;
                height: 50%;
                padding: 3rem 8rem;

                display: flex;
                justify-content: flex-start;
                align-items: flex-start;
                flex-direction: column;

                // background-color: rgba(156, 125, 125, 0.4);


            }

            &.active :deep(.skill-tag) {
                transform: translateY(0);
                opacity: 1;
            }

        }
    }

    &-anchor {
        position: fixed;
        top: 20%;
        right: 20px;
        width: 200px;
        height: 400px;

    }
}
</style>
