<template>
    <div></div>
</template>
<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue';

import { useRoute, useRouter } from 'vue-router';

import { useUserDataStore } from '../store/userData.module';

const userDataStore = useUserDataStore();

const route = useRoute();
const router = useRouter();

const hashUrl = computed<string>(() => route.hash);

const query = computed<{
    access_token: string;
    expires_at: string;
    expires_in: string;
    refresh_token: string;
    token_type: string;
    type: string;
}>(() => {
    if (!hashUrl.value) {
        return null;
    }

    console.log('route', route);

    const replaceUrl = hashUrl.value[0] === '#' ? hashUrl.value.replace('#', '') : hashUrl.value;

    return JSON.parse(
        '{"' + decodeURI(replaceUrl).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}',
    );
});

onMounted(() => {
    console.log('params', query.value);

    if (!query.value) {
        router.push({
            name: 'home',
        });
        return;
    }

    userDataStore.getUser().then((res) => {
        if (res) {
            router.push({ name: 'home' });
        }
    });
});

onUnmounted(() => {});
</script>
