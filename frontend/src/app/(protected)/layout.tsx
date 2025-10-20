import { verifySession } from '@/supabase/dal';

// このレイアウト配下のページは認証が必要
// (未認証の場合は自動的にサインインページにリダイレクトされる)
export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  await verifySession();

  return <>{children}</>;
}
