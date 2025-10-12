import Link from "next/link";
import CreateForm from "../_components/forms/CreateForm";

export default function NewBookPage() {
  return (
    <>
      <Link
        href="/books"
        className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
      >
        ← 本一覧へ戻る
      </Link>
      <CreateForm />
    </>
  );
}