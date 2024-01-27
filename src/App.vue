<template>
    <Navbar />
    <div class="container">
        <router-view></router-view>
    </div>
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted } from 'vue';

import Navbar from './components/Navbar.vue';

import { useUserDataStore } from '../src/store/userData.module';

const userDataStore = useUserDataStore();

onBeforeMount(() => {
    const authTokenLocal = localStorage.getItem('sb-xxxlxrtxsdclcbujdxcq-auth-token');

    if (authTokenLocal) {
        userDataStore.getUser();
    }
});

onMounted(() => {});
</script>
