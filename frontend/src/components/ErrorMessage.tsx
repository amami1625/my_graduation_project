interface ErrorMessageProps {
  val: { error: string };
}

export default function ErrorMessage({ val }: ErrorMessageProps) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-red-600">{val.error}</p>
    </div>
  );
}
