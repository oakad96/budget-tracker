"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DEFAULT_CATEGORIES } from "@/lib/types";
import { toast } from "sonner";

export function BudgetSettings() {
  const { state, dispatch } = useStore();
  const [category, setCategory] = useState<string>(DEFAULT_CATEGORIES[0]);
  const [limit, setLimit] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!limit) {
      toast.error("Please enter a budget limit");
      return;
    }

    dispatch({
      type: "SET_BUDGET",
      payload: {
        category,
        limit: parseFloat(limit),
      },
    });

    toast.success("Budget limit updated successfully");
    setLimit("");
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Set Budget Limits</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Select
                value={category}
                onValueChange={(value) => setCategory(value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {DEFAULT_CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Monthly Limit</label>
              <Input
                type="number"
                step="0.01"
                value={limit}
                onChange={(e) => setLimit(e.target.value)}
                placeholder="Enter monthly limit"
              />
            </div>

            <Button type="submit" className="w-full">
              Set Budget Limit
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Current Budget Limits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {state.budgets.map((budget) => (
              <div
                key={budget.category}
                className="flex items-center justify-between p-2 rounded bg-secondary"
              >
                <span>{budget.category}</span>
                <span className="font-medium">${budget.limit.toFixed(2)}</span>
              </div>
            ))}
            {state.budgets.length === 0 && (
              <p className="text-muted-foreground text-center py-4">
                No budget limits set
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
