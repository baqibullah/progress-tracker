export default function HeatmapLegend() {
  return (
    <div className="flex items-center gap-4 text-xs text-ink/80">
      <div className="flex items-center gap-1.5">
        <span className="h-3 w-3 rounded-sm bg-undone/40" />
        <span>None done</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="h-3 w-3 rounded-sm bg-streak/50" />
        <span>Partially done</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="h-3 w-3 rounded-sm bg-done" />
        <span>All done</span>
      </div>
    </div>
  );
}
