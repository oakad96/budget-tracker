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
  const [editingBudget, setEditingBudget] = useState<Budget | null>(null);

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

  const handleEdit = (budget: Budget) => {
    setEditingBudget(budget);
    setCategory(budget.category);
    setLimit(budget.limit.toString());
  };

  const handleDelete = (category: string) => {
    if (confirm("Are you sure you want to delete this budget limit?")) {
      dispatch({
        type: "DELETE_BUDGET",
        payload: category,
      });
      toast.success("Budget limit deleted successfully");
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>
            {editingBudget ? "Edit Budget Limit" : "Set Budget Limits"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Select
                value={category}
                onValueChange={(value) => setCategory(value)}
                disabled={!!editingBudget}
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

            <div className="flex space-x-2">
              <Button type="submit" className="flex-1">
                {editingBudget ? "Update Budget" : "Set Budget Limit"}
              </Button>
              {editingBudget && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setEditingBudget(null);
                    setCategory(DEFAULT_CATEGORIES[0]);
                    setLimit("");
                  }}
                >
                  Cancel
                </Button>
              )}
            </div>
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
                <div className="flex items-center space-x-2">
                  <span className="font-medium">
                    ${budget.limit.toFixed(2)}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(budget)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(budget.category)}
                  >
                    Delete
                  </Button>
                </div>
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
