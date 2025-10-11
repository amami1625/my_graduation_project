import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// Server-Side Supabaseクライアント
// ※環境変数は.envに設定
export async function createServerSupabaseClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Server ComponentでのCookie書き込み制限
            // Server Componentが静的レンダリング/キャッシュから提供される場合、Cookieの書き込みができず例外が発生
            // ただし、Cookieの読み取りは成功しているため、認証には影響なし
            // トークンのリフレッシュは次のリクエスト(DAL)で自動的に行われる
          }
        },
      },
    }
  )
}