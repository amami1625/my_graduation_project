interface ErrorMessageProps {
  val: { error: string };
}

export default function ErrorMessage({ val }: ErrorMessageProps) {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
        {val.error}
      </div>
    </div>
  );
}
