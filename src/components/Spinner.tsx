export default function Spinner({
  size = "md",
  label,
}: {
  size?: "sm" | "md" | "lg";
  label?: string;
}) {
  const sizeClasses = {
    sm: "h-3 w-3 border-2",
    md: "h-8 w-8 border-2",
    lg: "h-10 w-10 border-[3px]",
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <span
        className={`animate-spin rounded-full border-ink/20 border-t-ink ${sizeClasses[size]}`}
      />
      {label && <p className="text-sm text-ink/40">{label}</p>}
    </div>
  );
}
