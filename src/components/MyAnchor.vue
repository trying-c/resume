<template>
    <div class="anchor">
        <div class="anchor-links">
            <a
                v-for="item in items"
                :key="item.id"
                :href="'#' + item.id"
                :class="{ active: activeId === item.id }"
                @click.prevent="scrollTo(item.id)"
            >
                {{ item.label }}
            </a>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const items = [
    { id: 'section1', label: 'Section 1' },
    { id: 'section2', label: 'Section 2' },
    { id: 'section3', label: 'Section 3' },
];

const activeId = ref('');

const handleScroll = () => {
    let currentId = '';
    items.forEach((item) => {
        const element = document.getElementById(item.id);
        if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 0) {
                currentId = item.id;
            }
        }
    });
    activeId.value = currentId;
};

const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
};

onMounted(() => {
    window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.anchor {
    position: fixed;
    top: 20px;
    left: 20px;
}

.anchor-links a {
    display: block;
    margin-bottom: 10px;
    text-decoration: none;
    color: black;
}

.anchor-links a.active {
    font-weight: bold;
    color: blue;
}
</style>