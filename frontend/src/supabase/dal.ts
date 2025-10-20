import 'server-only';
import { cache } from 'react';
import { notFound, redirect } from 'next/navigation';
import { createServerSupabaseClient } from './clients/server';

export const verifySession = cache(async () => {
  const supabase = await createServerSupabaseClient();

  // getUser()でSupabaseサーバー側認証検証
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  // 認証エラーまたは未認証の場合はログインページへリダイレクト
  if (error || !user) {
    redirect('/login');
  }

  // 検証済みと確認できたのでセッション取得（access_token用）
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return { user, session };
});

export async function authenticatedRequest(
  endpoint: string,
  options: RequestInit = {},
): Promise<unknown> {
  const { session } = await verifySession();

  if (!session?.access_token) {
    throw new Error('ログインが必要です');
  }

  // APIエンドポイントURLを構築
  const baseUrl = process.env.API_BASE_URL;
  const url = endpoint.startsWith('http') ? endpoint : `${baseUrl}${endpoint}`;

  // ヘッダーに認証トークンを追加
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${session.access_token}`,
    ...(options.headers as Record<string, string>),
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      cache: 'no-store', // 常に最新データを取得
    });

    // 404エラー時はnotFound()を呼び出してNext.jsの404ページを表示
    if (response.status === 404) {
      notFound();
    }

    // その他のエラーは例外をスロー
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData.error || 'リクエストに失敗しました');
    }

    // JSONレスポンスを返す（Content-Typeがapplication/jsonの場合のみ）
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }

    return undefined;
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error(`Network error: ${error.message}`);
    }
    throw error;
  }
}
