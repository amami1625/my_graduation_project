import PageHeader from "./_components/display/PageHeader";
import ProfileSidebar from "@/components/ProfileSidebar";

export default function BooksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen gap-6">
      {/* サイドバー */}
      <aside className="w-64 border-r border-gray-200 bg-white p-6">
        <ProfileSidebar />
      </aside>

      {/* メインコンテンツ */}
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <PageHeader />
          {children}
        </div>
      </main>
    </div>
  );
}
