import { createClient } from '@supabase/supabase-js';

export function useSupabase() {
    const connection = () => {
        return createClient('https://xxxlxrtxsdclcbujdxcq.supabase.co', import.meta.env.VITE_SUPAPAGE_API_KEY);
    };

    return {
        connection,
    };
}
