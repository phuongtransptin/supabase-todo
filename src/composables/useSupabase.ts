import { createClient } from '@supabase/supabase-js';

export function useSupabase() {
    const connection = () => {
        return createClient('https://xxxlxrtxsdclcbujdxcq.supabase.co', import.meta.env.VITE_SUPAPAGE_API_KEY);
    };

    const getUrl = (): string => {
        return import.meta.env.VITE_PUBLIC_SITE_URL;
    };

    return {
        connection,
        getUrl,
    };
}
