"use client";

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Overview } from '@/components/overview';
import { TransactionForm } from '@/components/transaction-form';
import { BudgetSettings } from '@/components/budget-settings';
import { Reports } from '@/components/reports';

export function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="transaction">Add Transaction</TabsTrigger>
        <TabsTrigger value="budget">Budget Settings</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="space-y-4">
        <Overview />
      </TabsContent>
      <TabsContent value="transaction">
        <TransactionForm />
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