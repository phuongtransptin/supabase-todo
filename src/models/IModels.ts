export interface ICredentials {
    email: string;
    password: string;
}

export interface ISessionUser {
    providerToken?: string | null;
    providerRefreshToken?: string | null;

    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    expiresAt?: number;
    tokenType: string;
}

export interface IUser {
    id: string;

    role?: string;
    email?: string;
    phone?: string;
}
