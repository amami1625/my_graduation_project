import Image from "next/image";
import { User } from "lucide-react";

export default function ProfileSidebar() {
  // TODO: 後でユーザー情報取得処理に置き換える
  const user = {
    name: "山田太郎",
    avatar_url: null,
  };

  return (
    <div className="sticky top-6">
      {/* ユーザー情報 */}
      <div className="flex flex-col items-center gap-4">
        {/* アバター */}
        <div className="relative h-24 w-24 overflow-hidden rounded-full bg-gray-200">
          {user.avatar_url ? (
            <Image
              src={user.avatar_url}
              alt={user.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <User className="h-12 w-12 text-gray-400" />
            </div>
          )}
        </div>

        {/* ユーザー名 */}
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-900">{user.name}</p>
        </div>
      </div>
    </div>
  );
}
