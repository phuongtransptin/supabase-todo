<template>
    <Navbar />
    <div class="container">
        <router-view></router-view>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

import Navbar from './components/Navbar.vue';

onMounted(() => {});
</script>
