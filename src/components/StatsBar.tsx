interface StatsBarProps {
  completionPct: number;
  currentStreak: number;
}

export default function StatsBar({
  completionPct,
  currentStreak,
}: StatsBarProps) {
  return (
    <div className="flex gap-8 border-b border-undone pb-4">
      <Stat label="This month" value={`${completionPct}%`} />
      <Stat label="Current streak" value={`${currentStreak}d`} />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-mono text-2xl text-ink">{value}</p>
      <p className="text-xs text-ink/40">{label}</p>
    </div>
  );
}
