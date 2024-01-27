import { defineStore } from 'pinia';

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
