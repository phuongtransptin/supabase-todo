import { defineStore } from 'pinia';

import { useUserDataStore } from './userData.module';
import { useSupabase } from '../composables/useSupabase';
import { AuthResponse, AuthTokenResponsePassword } from '@supabase/supabase-js';
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

        async signInWithMagicLinkAction(email: string): Promise<void> {
            this.isLoadingAction();

            const _supabase = useSupabase().connection();

            console.log('test', import.meta.env.BASE_URL + '/access-auth');

            const signInWithMagicLink = await _supabase.auth.signInWithOtp({
                email: email,
                options: {
                    shouldCreateUser: false,
                    emailRedirectTo: 'https://supabase-todo.pages.dev/access-auth',
                },
            });

            console.log('signInWithMagicLink', signInWithMagicLink);

            this.isLoadedAction();
        },

        async signUpUserAction(credentials: { email: string; password: string }): Promise<AuthResponse> {
            this.isLoadingAction();

            const _supabase = useSupabase().connection();

            const authRes = await _supabase.auth.signUp(credentials);

            this.isLoadedAction();

            return authRes;
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
    },
});
