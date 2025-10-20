'use client';

import { logoutAction } from '@/app/(auth)/_lib';

export function LogoutButton() {
  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!confirm('ログアウトしますか？')) {
      e.preventDefault();
      return;
    }
  };

  return (
    <form action={logoutAction}>
      <button type="submit" onClick={handleClick}>
        ログアウト
      </button>
    </form>
  );
}
