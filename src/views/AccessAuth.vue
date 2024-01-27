<template>
    <div></div>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';

import { useRoute } from 'vue-router';

const route = useRoute();

onMounted(() => {
    console.log('params', route);
});

onUnmounted(() => {});
</script>
