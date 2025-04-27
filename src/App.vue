<script setup>
import Home from '@/components/Home.vue'
import Skills from '@/components/Skills.vue'
import Contact from '@/components/Contact.vue'
import Projects from '@/components/Projects.vue'
import { useStore } from '@/stores';
import { computed, onMounted, ref } from 'vue';
import { throttle } from 'lodash'

const store = useStore()
const content = ref(null)
const pages = ref(null)
const pageIndex = ref(0)
const isScroll = ref(false)

const handleWheel = (e) => {
    if (isScroll.value) return

    isScroll.value = true

    if (e.deltaY > 0) {
        // 滑动到下一页
        if (pageIndex.value < pages.value.length - 1) {
            pageIndex.value++
        } else {
            pageIndex.value = pages.value.length - 1
        }
    } else {
        // 滑动到上一页
        if (pageIndex.value > 0) {
            pageIndex.value--
        } else {
            pageIndex.value = 0
        }
    }
    // 为指定页添加active类
    pages.value.forEach((page, index) => {
        if (index === pageIndex.value) {
            page.classList.add('active')
        } else {
            page.classList.remove('active')
        }
    })
    // 滚动到指定页
    scrollToPage(pageIndex.value)

    setTimeout(() => {
        isScroll.value = false
    }, 500)
}
const scrollToPage = (index) => {
    const page = pages.value[index]
    if (page) {
        // page.scrollIntoView({
        //     behavior: 'smooth',
        //     block: 'start',
        //     inline: 'nearest'
        // })
    }
}

onMounted(() => {
    pages.value = document.querySelectorAll('.page');
    window.addEventListener('wheel', throttle(handleWheel, 200), { passive: true })
})


</script>

<template>
    <!-- <HelloWorld :msg="store.title" /> -->
    <Layout class="resume-layout">

        <Header class="resume-header">
            <h2 class="resume-header-title">{{ store.title }}</h2>
            <div class="resume-header-content">

            </div>
            <div class="resume-header-btns">
            </div>
        </Header>

        <Content ref="content" class="resume-content">

            <!-- 首页 -->
            <Home class="page active" id="home" />

            <!-- 技能页 -->
            <Skills class="page" id="skills" />

            <!-- 项目页 -->
            <Projects class="page" id="projects" />

            <!-- 联系页 -->
            <Contact class="page" id="contact" />
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
            position: absolute;
            bottom: 0;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;

            &.active {
                opacity: 1;
                transform: translateY(0);
                z-index: 1;
                transition: all .7s ease;
            }

            &:not(.active) {
                opacity: 0;
                transform: translateY(-100%);
                transition: all .7s ease .8s;
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
