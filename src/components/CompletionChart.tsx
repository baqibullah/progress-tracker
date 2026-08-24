"use client";

import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface CompletionChartProps {
  data: { date: string; completion: number }[];
}

export default function CompletionChart({ data }: CompletionChartProps) {
  const chartData = data.map((d) => ({
    day: new Date(d.date).getDate(),
    completion: d.completion,
  }));

  return (
    <div className="h-48 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{ top: 8, right: 8, left: -20, bottom: 0 }}
        >
          <XAxis
            dataKey="day"
            tick={{ fontSize: 11, fill: "#1C1B19", opacity: 0.4 }}
            axisLine={{ stroke: "#D9D6CE" }}
            tickLine={false}
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fontSize: 11, fill: "#1C1B19", opacity: 0.4 }}
            axisLine={false}
            tickLine={false}
            width={32}
          />
          <Tooltip
            contentStyle={{
              background: "#F7F5F0",
              border: "1px solid #D9D6CE",
              borderRadius: 2,
              fontSize: 12,
            }}
          />
          <Line
            type="monotone"
            dataKey="completion"
            stroke="#2D4A3E"
            strokeWidth={2}
            dot={{ r: 2, fill: "#2D4A3E" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
