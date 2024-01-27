<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <RouterLink :to="{ name: 'home' }">
                <img
                    src="https://avatars.githubusercontent.com/u/54469796?s=280&v=4"
                    alt=""
                    width="30"
                    height="24"
                    class="d-inline-block align-text-top"
                />
                Supabase Testing
            </RouterLink>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav navbar-custom">
                    <template v-if="isAuthenticated && user">
                        <li class="nav-item">
                            <RouterLink :to="{ name: 'list' }">List</RouterLink>
                        </li>

                        <li class="nav-item dropdown">
                            <a
                                class="nav-link dropdown-toggle"
                                href="#"
                                id="navbarDropdown"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                {{ user.email || 'User' }}
                            </a>

                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><span class="dropdown-item cursor-pointer text-danger">Logout</span></li>
                            </ul>
                        </li>
                    </template>

                    <template v-else>
                        <li class="nav-item">
                            <RouterLink :to="{ name: 'signIn' }">Sign In</RouterLink>
                        </li>

                        <li class="nav-item">
                            <RouterLink :to="{ name: 'login' }">Login</RouterLink>
                        </li>
                    </template>
                </ul>
            </div>
        </div>
    </nav>
</template>
<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue';

import { useAuthenticationStore } from '../store/authentication.module';
import { useUserDataStore } from '../store/userData.module';
import { IUser } from '../models/IModels';

const authenticationStore = useAuthenticationStore();
const userDataStore = useUserDataStore();

const isAuthenticated = computed<boolean>(() => authenticationStore.authenticated);

const user = computed<IUser | null>(() => (isAuthenticated.value ? userDataStore.user : null));

onMounted(() => {});

onUnmounted(() => {});
</script>

<style>
.navbar-custom {
    gap: 20px;
    margin: 0 20px;

    align-items: center;
}
</style>
