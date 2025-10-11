import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <h1 className="text-lg font-semibold tracking-tight text-gray-900">
          <Link href="/">ぽんダナ</Link>
        </h1>
        <nav>
          <ul className="flex items-center gap-4 text-sm font-medium text-gray-600">
            <li className="transition-colors hover:text-gray-900">
              <Link href="#">新規登録</Link>
            </li>
            <li className="transition-colors hover:text-gray-900">
              <Link href="#">ログイン</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
