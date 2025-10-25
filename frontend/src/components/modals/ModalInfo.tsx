interface ModalInfoProps {
  label: string;
  value: string;
}

export default function ModalInfo({ label, value }: ModalInfoProps) {
  return (
    <div className="mb-4 rounded-lg bg-gray-50 p-3">
      <p className="text-sm text-gray-600">{label}</p>
      <p className="font-semibold text-gray-900">{value}</p>
    </div>
  );
}
