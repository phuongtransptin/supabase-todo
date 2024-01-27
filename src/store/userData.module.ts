import { defineStore } from 'pinia';

import { useSupabase } from '../composables/useSupabase';

import { useAuthenticationStore } from './authentication.module';

import { IUser } from '../models/IModels';

export const useUserDataStore = defineStore({
    id: 'UserDataStore',

    state: () => ({
        _state: {
            user: {
                id: '',
            } as IUser,
        },
    }),

    getters: {
        user: (state) => state._state.user,
    },

    actions: {
        async getUser(): Promise<boolean> {
            const _supabase = useSupabase().connection();

            const {
                data: { user },
                error,
            } = await _supabase.auth.getUser();

            if (user) {
                this.setDataUserAction({
                    id: user.id,
                    email: user.email,
                    phone: user.phone,
                    role: user.role,
                });

                useAuthenticationStore().authenticatedAction();
            }

            return error ? false : true;
        },

        setDataUserAction(payload: IUser): void {
            this._state.user = {
                id: payload.id,
                email: payload.email,
                phone: payload.phone,
                role: payload.role,
            };
        },

        resetDataAction(): void {
            this._state.user = {
                id: '',
            };
        },
    },
});
