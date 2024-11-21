export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string;
  date: string;
}

export interface Budget {
  category: string;
  limit: number;
}

export interface CategoryTotal {
  category: string;
  total: number;
}

export const DEFAULT_CATEGORIES = [
  'Housing',
  'Transportation',
  'Food',
  'Utilities',
  'Healthcare',
  'Entertainment',
  'Shopping',
  'Education',
  'Savings',
  'Other'
] as const;

export type Category = typeof DEFAULT_CATEGORIES[number];