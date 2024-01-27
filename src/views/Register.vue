<template>
    <div class="non-auth-layout">
        <div class="non-auth-layout-container">
            <h2 class="my-4 text-center">Sign In</h2>

            <div
                v-if="stateSignUp.status !== null"
                :class="stateSignUp.status ? 'alert-success' : 'alert-danger'"
                class="alert"
                role="alert"
            >
                {{ stateSignUp.message }}
            </div>

            <form @submit.prevent="onRegister()">
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email address</label>
                    <input
                        v-model="registerModel.email"
                        :disabled="isLoading"
                        type="email"
                        class="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                    />
                    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                </div>

                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input
                        v-model="registerModel.password"
                        :disabled="isLoading"
                        type="password"
                        class="form-control"
                        id="exampleInputPassword1"
                    />
                </div>

                <!-- <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Confirm Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" />
                </div> -->

                <button :disabled="isLoading" type="submit" class="btn btn-primary">Register</button>
            </form>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, toRaw } from 'vue';

import { useAuthenticationStore } from '../store/authentication.module';

const authenticationStore = useAuthenticationStore();

const registerModel = ref<{
    email: string;
    password: string;
}>({
    email: '',
    password: '',
});

const stateSignUp = ref<{
    status: null | boolean;
    message: string;
}>({
    status: null,
    message: '',
});

const isLoading = computed<boolean>(() => authenticationStore.isLoading);

onMounted(() => {});

onUnmounted(() => {});

const onRegister = async () => {
    stateSignUp.value = {
        status: null,
        message: '',
    };

    const { error } = await authenticationStore.signUpUserAction(toRaw(registerModel.value));

    stateSignUp.value = {
        status: error ? false : true,
        message: error ? error.message : 'Successfully!',
    };
};
</script>

<style>
.non-auth-layout {
    display: flex;
    justify-content: center;

    margin: 50px;
}

.non-auth-layout-container {
    width: 400px;
}
</style>
