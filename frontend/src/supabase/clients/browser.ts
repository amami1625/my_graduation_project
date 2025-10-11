import { createBrowserClient } from "@supabase/ssr";

// Client-Side Supabaseクライアント
// ※環境変数は.envに設定
export function createBrowserSupabaseClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
