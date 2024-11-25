"use client";

import { useStore } from "@/lib/store";
import { DEFAULT_CATEGORIES } from "@/lib/types";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#96CEB4",
  "#FFEEAD",
  "#D4A5A5",
  "#9B5DE5",
  "#F15BB5",
  "#00BBF9",
  "#00F5D4",
];

export function CategoryChart({ dateOption }: { dateOption: string }) {
  const { state } = useStore();

  const categoryTotals = DEFAULT_CATEGORIES.map((category) => {
    const now = new Date();
    const monthsAgo = new Date();
    monthsAgo.setMonth(now.getMonth() - parseInt(dateOption));

    return {
      category,
      total: state.transactions
        .filter((t) => {
          return (
            t.type === "expense" &&
            t.category === category &&
            new Date(t.date) >= monthsAgo &&
            new Date(t.date) <= now
          );
        })
        .reduce((sum, t) => sum + t.amount, 0),
    };
  }).filter((ct) => ct.total > 0);

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={categoryTotals}
            dataKey="total"
            nameKey="category"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label={({ category, percent }) =>
              `${category} ${(percent * 100).toFixed(0)}%`
            }
          >
            {categoryTotals.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
