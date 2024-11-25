"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ExpenseBarChart } from "./expense-bar-chart";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachMonthOfInterval,
  subMonths,
} from "date-fns";
import { CategoryChart } from "./category-chart";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export function Reports() {
  const { state } = useStore();
  const [period, setPeriod] = useState("6");
  const [categoryPeriod, setCategoryPeriod] = useState("6");

  const months = eachMonthOfInterval({
    start: subMonths(new Date(), parseInt(period) - 1),
    end: new Date(),
  });

  const data = months.map((month) => {
    const monthStart = startOfMonth(month);
    const monthEnd = endOfMonth(month);

    const monthTransactions = state.transactions.filter((t) => {
      const date = new Date(t.date);
      return date >= monthStart && date <= monthEnd;
    });

    const income = monthTransactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const expenses = monthTransactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      month: format(month, "MMM yyyy"),
      income,
      expenses,
    };
  });

  const exportToPDF = async () => {
    const pdf = new jsPDF("p", "mm", "a4");
    const elements = Array.from(document.querySelectorAll(".pdf-section"));
    let yOffset = 10;

    pdf.setFontSize(20);
    pdf.text("Financial Report", 20, yOffset);
    yOffset += 20;

    for (const element of elements) {
      const canvas = await html2canvas(element as HTMLElement);
      const imgData = canvas.toDataURL("image/png");
      if (yOffset + 100 > pdf.internal.pageSize.height) {
        pdf.addPage();
        yOffset = 10;
      }
      pdf.addImage(imgData, "PNG", 10, yOffset, 190, 80);
      yOffset += 90;
    }

    // Add transaction summary
    pdf.addPage();
    pdf.setFontSize(16);
    pdf.text("Transaction Summary", 20, 20);

    let summaryYOffset = 40;
    const transactions = state.transactions;

    // Calculate totals
    const totalIncome = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    pdf.setFontSize(12);
    pdf.text(`Total Income: $${totalIncome.toFixed(2)}`, 20, summaryYOffset);
    pdf.text(
      `Total Expenses: $${totalExpenses.toFixed(2)}`,
      20,
      summaryYOffset + 10
    );
    pdf.text(
      `Net Balance: $${(totalIncome - totalExpenses).toFixed(2)}`,
      20,
      summaryYOffset + 20
    );

    // Save the PDF
    pdf.save("financial-report.pdf");
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end mb-4">
        <Button onClick={exportToPDF} className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export PDF
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Monthly Income vs Expenses</CardTitle>
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3">Last 3 months</SelectItem>
              <SelectItem value="6">Last 6 months</SelectItem>
              <SelectItem value="12">Last 12 months</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent className="pdf-section">
          <ExpenseBarChart data={data} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Expenses by Category</CardTitle>
          <Select value={categoryPeriod} onValueChange={setCategoryPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3">Last 3 months</SelectItem>
              <SelectItem value="6">Last 6 months</SelectItem>
              <SelectItem value="12">Last 12 months</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent className="pdf-section">
          <div className="h-[400px]">
            <CategoryChart dateOption={categoryPeriod} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
