"use client";

import { usePathname, useRouter } from "next/navigation";

export default function MonthNav({
  year,
  month,
}: {
  year: number;
  month: number;
}) {
  const router = useRouter();
  const pathname = usePathname();

  function go(offset: number) {
    const d = new Date(year, month + offset, 1);
    const param = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    router.push(`${pathname}?month=${param}`);
  }

  const label = new Date(year, month).toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="mb-8 flex items-center gap-3 text-ink/50">
      <button
        onClick={() => go(-1)}
        className="hover:text-ink cursor-pointer"
        aria-label="Previous month"
      >
        &larr;
      </button>
      <span>{label}</span>
      <button
        onClick={() => go(1)}
        className="hover:text-ink cursor-pointer"
        aria-label="Next month"
      >
        &rarr;
      </button>
    </div>
  );
}
