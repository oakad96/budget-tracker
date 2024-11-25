import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ExpenseBarChartProps {
  data: Array<{
    month: string;
    income: number;
    expenses: number;
  }>;
}

export function ExpenseBarChart({ data }: ExpenseBarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" tick={{ fontSize: 12 }} tickLine={true} />
        <YAxis />
        <Tooltip />
        <Bar dataKey="income" name="Income" fill="#4ade80" />
        <Bar dataKey="expenses" name="Expenses" fill="#f87171" />
      </BarChart>
    </ResponsiveContainer>
  );
}
