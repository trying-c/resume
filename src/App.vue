<script setup>
import Home from '@/components/Home.vue'
import Skills from '@/components/Skills.vue'
import Contact from '@/components/Contact.vue'
import Projects from '@/components/Projects.vue'
import { useStore } from '@/stores'
import { computed, onMounted, onUnmounted, ref, shallowRef } from 'vue'
import { throttle } from 'lodash'

const store = useStore()
const content = ref(null)
const contentRef = computed(() => content.value.$el)
const pages = ref([
    { name: 'home', component: shallowRef(Home), offsetTop: 0 },
    { name: 'skills', component: shallowRef(Skills), offsetTop: 0 },
    { name: 'projects', component: shallowRef(Projects), offsetTop: 0 },
    { name: 'contact', component: shallowRef(Contact), offsetTop: 0 }
])
const pageIndex = ref(0)
const isScrolling = ref(false)
const isScrollUp = ref(false)

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

    contentRef.value.scrollTo({
        top: pages.value[pageIndex.value].offsetTop,
        behavior: 'smooth'
    })

    setTimeout(() => {
        isScrolling.value = false
    }, 500)
}, 200)



onMounted(() => {
    document.querySelectorAll('.page').forEach((el, index) => {
        pages.value[index].offsetTop = el.offsetTop;
    })
    window.addEventListener('wheel', handleWheel, { passive: true })
})

onUnmounted(() => {
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

        <Content ref="content" class="resume-content">
            <component v-for="(page, index) in pages" :key="`pages_${page.name}`" :id="page.name" :is="page.component"
                class="page" :class="{ 'active': pageIndex === index }" />
        </Content>
    </Layout>
</template>

<style lang="scss" scoped>
/* 背景灰 */
.resume {
    &-layout {
        background-color: #f0f2f5;
        width: 100%;
        height: 100vh;
    }

    &-header {
        background-color: rgba(255, 255, 255, 0.557);
        border-bottom: 1px solid #e8e8e8;
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
            // position: absolute;
            // bottom: 0;
            width: 100%;
            height: 100%;
            box-shadow: 2px 2px 4px #e8e8e8;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: all 1s ease;
            z-index: 1;

            &.active {
                opacity: 1;
                z-index: 2;
                transition: all 1s ease;
            }


            /* 颜色应用 */
            &#home {
                background: $taro-purple;
                color: white;
            }

            &#skills {
                background: $light-gray;
                color: $slate-gray;
            }

            &#projects {
                background: $slate-gray;
                color: white;
            }

            &#contact {
                background: $golden-yellow;
                color: $slate-gray;
            }

            :deep(.card) {
                width: 100%;
                height: 50%;
                padding: 3rem;
                border-radius: 15px;

                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
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
