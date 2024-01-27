import { defineStore } from 'pinia';

import { useUserDataStore } from './userData.module';
import { useSupabase } from '../composables/useSupabase';
import { AuthOtpResponse, AuthResponse, AuthTokenResponsePassword } from '@supabase/supabase-js';
import { ISessionUser } from '../models/IModels';

export const useAuthenticationStore = defineStore({
    id: 'AuthenticationStore',

    state: () => ({
        _state: {
            authenticated: false,

            isLoading: false,
            isLoaded: false,

            session: {
                accessToken: '',
                expiresIn: 0,
                refreshToken: '',
                tokenType: '',
            } as ISessionUser,
        },
    }),

    getters: {
        authenticated: (state) => state._state.authenticated,

        isLoading: (state) => state._state.isLoading,

        isLoaded: (state) => state._state.isLoaded,
    },

    actions: {
        isLoadingAction(): void {
            this._state.isLoading = true;
            this._state.isLoaded = false;
        },

        isLoadedAction(): void {
            this._state.isLoading = false;
            this._state.isLoaded = true;
        },

        authenticatedAction(): void {
            this._state.authenticated = true;
        },

        async signInWithPasswordAction(credentials: {
            email: string;
            password: string;
        }): Promise<AuthTokenResponsePassword> {
            this.isLoadingAction();
            this._state.authenticated = false;

            const _supabase = useSupabase().connection();

            const signInRes = await _supabase.auth.signInWithPassword(credentials);

            const { data } = signInRes;

            this.isLoadedAction();

            const { session, user } = data;

            if (data && session && user) {
                this._state.authenticated = true;

                this.setDataSessionAuthAction({
                    accessToken: session.access_token,
                    expiresIn: session.expires_in,
                    refreshToken: session.refresh_token,
                    tokenType: session.token_type,
                    expiresAt: session.expires_at,
                    providerRefreshToken: session.provider_refresh_token,
                    providerToken: session.provider_token,
                });

                useUserDataStore().setDataUserAction({
                    id: user.id,
                    email: user.email,
                    phone: user.phone,
                    role: user.role,
                });
            }

            return signInRes;
        },

        async signInWithGGAction() {
            this.isLoadingAction();

            const _supabase = useSupabase().connection();

            const signInWithGG = await _supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: useSupabase().getUrl(),
                },
            });

            this.isLoadedAction();

            return signInWithGG;
        },

        async signInWithMagicLinkAction(email: string): Promise<AuthOtpResponse> {
            this.isLoadingAction();

            const _supabase = useSupabase().connection();

            const signInWithMagicLink = await _supabase.auth.signInWithOtp({
                email: email,
                options: {
                    shouldCreateUser: false,
                },
            });

            this.isLoadedAction();

            return signInWithMagicLink;
        },

        async signUpUserAction(credentials: { email: string; password: string }): Promise<AuthResponse> {
            this.isLoadingAction();

            const _supabase = useSupabase().connection();

            const authRes = await _supabase.auth.signUp({
                ...credentials,
                options: {
                    emailRedirectTo: useSupabase().getUrl(),
                },
            });

            this.isLoadedAction();

            return authRes;
        },

        async signOutAction() {
            this.isLoadingAction();

            const _supabase = useSupabase().connection();

            const { error } = await _supabase.auth.signOut();

            this.isLoadedAction();

            if (!error) {
                useUserDataStore().resetDataAction();
                this.resetDataAction();
            }
        },

        async verifyOTPEmailAction(payload: { email: string; otp: string }): Promise<AuthResponse> {
            this.isLoadingAction();

            const _supabase = useSupabase().connection();

            const verifyOtp = await _supabase.auth.verifyOtp({
                email: payload.email,
                token: payload.otp,
                type: 'email',
            });

            this.isLoadedAction();

            const {
                data: { session, user },
            } = verifyOtp;

            if (session && user) {
                this._state.authenticated = true;

                this.setDataSessionAuthAction({
                    accessToken: session.access_token,
                    expiresIn: session.expires_in,
                    refreshToken: session.refresh_token,
                    tokenType: session.token_type,
                    expiresAt: session.expires_at,
                    providerRefreshToken: session.provider_refresh_token,
                    providerToken: session.provider_token,
                });

                useUserDataStore().setDataUserAction({
                    id: user.id,
                    email: user.email,
                    phone: user.phone,
                    role: user.role,
                });
            }

            return verifyOtp;
        },

        setDataSessionAuthAction(payload: ISessionUser): void {
            this._state.session = {
                accessToken: payload.accessToken,
                expiresIn: payload.expiresIn,
                refreshToken: payload.refreshToken,
                tokenType: payload.tokenType,
                expiresAt: payload.expiresAt,
                providerRefreshToken: payload.providerRefreshToken,
                providerToken: payload.providerToken,
            };
        },

        resetDataAction() {
            this._state.session = {
                accessToken: '',
                expiresIn: 0,
                refreshToken: '',
                tokenType: '',
                expiresAt: 0,
                providerRefreshToken: '',
                providerToken: '',
            };

            this._state.authenticated = false;
            this._state.isLoaded = false;
            this._state.isLoaded = false;
        },
    },
});
