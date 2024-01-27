<template>
    <div class="non-auth-layout">
        <div class="non-auth-layout-container">
            <h2 class="my-4 text-center">Login</h2>

            <p class="text-center">
                Need an account?

                <RouterLink :to="{ name: 'signIn' }">SignIn</RouterLink>
            </p>

            <div
                v-if="stateLogin.status !== null"
                :class="stateLogin.status ? 'alert-success' : 'alert-danger'"
                class="alert"
                role="alert"
            >
                {{ stateLogin.message }}
            </div>

            <nav>
                <div class="nav nav-tabs" id="nav-tab" role="tablist">
                    <button
                        class="nav-link active"
                        id="nav-home-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-home"
                        type="button"
                        role="tab"
                        aria-controls="nav-home"
                        aria-selected="true"
                    >
                        Basic
                    </button>
                    <button
                        class="nav-link"
                        id="nav-profile-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-profile"
                        type="button"
                        role="tab"
                        aria-controls="nav-profile"
                        aria-selected="false"
                    >
                        Magic Link
                    </button>
                    <button
                        class="nav-link"
                        id="nav-contact-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-contact"
                        type="button"
                        role="tab"
                        aria-controls="nav-contact"
                        aria-selected="false"
                    >
                        Social
                    </button>
                </div>
            </nav>
            <div class="tab-content py-4" id="nav-tabContent">
                <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                    <form @submit.prevent="onLogin()">
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Email address</label>
                            <input
                                v-model="loginModel.email"
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
                                v-model="loginModel.password"
                                :disabled="isLoading"
                                type="password"
                                class="form-control"
                                id="exampleInputPassword1"
                            />
                        </div>

                        <button :disabled="isLoading" type="submit" class="btn btn-primary">Login</button>
                    </form>
                </div>
                <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                    <form @submit.prevent="onLoginWithMagicLink()">
                        <div v-if="isProcessVerify" class="mb-3">
                            <label for="exampleInputOTP" class="form-label">OTP</label>
                            <input
                                v-model="otp"
                                :disabled="isLoading"
                                type="text"
                                class="form-control"
                                id="exampleInputOTP"
                            />
                        </div>

                        <div v-else class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Email address</label>
                            <input
                                v-model="loginModel.email"
                                :disabled="isLoading"
                                type="email"
                                class="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                            />
                        </div>

                        <button :disabled="isLoading" type="submit" class="btn btn-primary">
                            {{ isProcessVerify ? 'Verify' : 'Login With Magic Link Email' }}
                        </button>
                    </form>
                </div>
                <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                    <button class="btn btn-primary" @click="onSignInWithGG()">Login with google</button>
                </div>
            </div>

            <!-- <div class="text-center">
                <p>or sign in with:</p>
                <i class="fas fa-clock"></i>
                <button type="button" class="btn btn-link btn-floating mx-1">
                    <i class="fab fa-facebook-f"></i>
                </button>

                <button type="button" class="btn btn-link btn-floating mx-1">
                    <i class="bx bxl-google"></i>
                </button>

                <button type="button" class="btn btn-link btn-floating mx-1">
                    <i class="fab fa-twitter"></i>
                </button>

                <button type="button" class="btn btn-link btn-floating mx-1">
                    <i class="fab fa-github"></i>
                </button>
            </div> -->
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, toRaw } from 'vue';

import { useAuthenticationStore } from '../store/authentication.module';

const authenticationStore = useAuthenticationStore();

const loginModel = ref<{
    email: string;
    password: string;
}>({
    email: '',
    password: '',
});

const otp = ref<string>('');

const stateLogin = ref<{
    status: null | boolean;
    message: string;
}>({
    status: null,
    message: '',
});

// const stateVerify = ref<{
//     status: boolean;
//     message: string;
// }>({
//     status: false,
//     message: '',
// });

const isProcessVerify = ref<boolean>(false);

const isLoading = computed<boolean>(() => authenticationStore.isLoading);

onMounted(() => {});

onUnmounted(() => {});

const onLogin = async () => {
    resetStateLogin();

    const { error } = await authenticationStore.signInWithPasswordAction(toRaw(loginModel.value));

    stateLogin.value = {
        status: error ? false : true,
        message: error ? error.message : 'Successfully!',
    };
};

const onLoginWithMagicLink = async () => {
    resetStateLogin();

    if (isProcessVerify.value) {
        const { error } = await authenticationStore.verifyOTPEmailAction({
            email: toRaw(loginModel.value.email),
            otp: toRaw(otp.value),
        });

        stateLogin.value = {
            status: error ? false : true,
            message: error ? error.message : 'Successfully!',
        };

        if (!error) {
            isProcessVerify.value = false;
        }

        return;
    }

    const { error } = await authenticationStore.signInWithMagicLinkAction(toRaw(loginModel.value.email));

    stateLogin.value = {
        status: error ? false : true,
        message: error ? error.message : 'Successfully!',
    };

    isProcessVerify.value = error ? false : true;
};

const onSignInWithGG = async () => {
    const signInWithGGAction = await authenticationStore.signInWithGGAction();

    console.log('signInWithGGAction', signInWithGGAction);
};

const resetStateLogin = (): void => {
    stateLogin.value = {
        status: null,
        message: '',
    };
};
</script>

<style>
.non-auth-layout {
    display: flex;
    justify-content: center;
}

.non-auth-layout-container {
    width: 400px;
}
</style>
