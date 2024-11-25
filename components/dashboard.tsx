"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import { Overview } from "@/components/overview";
import { TransactionForm } from "@/components/transaction-form";
import { BudgetSettings } from "@/components/budget-settings";
import { Reports } from "@/components/reports";
import { Transactions } from "@/components/transactions";

export function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
      <div className="md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger className="p-2">
            <Menu className="h-6 w-6" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onSelect={() => setActiveTab("overview")}>
              Overview
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setActiveTab("transaction")}>
              Add Transaction
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setActiveTab("transactions")}>
              Transactions
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setActiveTab("budget")}>
              Budget Settings
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setActiveTab("reports")}>
              Reports
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <TabsList className="hidden md:grid md:w-full md:grid-cols-5">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="transaction">Add Transaction</TabsTrigger>
        <TabsTrigger value="transactions">Transactions</TabsTrigger>
        <TabsTrigger value="budget">Budget Settings</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="space-y-4">
        <Overview />
      </TabsContent>
      <TabsContent value="transaction">
        <TransactionForm />
      </TabsContent>
      <TabsContent value="transactions">
        <Transactions />
      </TabsContent>
      <TabsContent value="budget">
        <BudgetSettings />
      </TabsContent>
      <TabsContent value="reports">
        <Reports />
      </TabsContent>
    </Tabs>
  );
}
