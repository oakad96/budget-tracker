import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EditTransactionDialog } from "@/components/edit-transaction-dialog";
import { useStore } from "@/lib/store";
import { Trash2 } from "lucide-react";
import { Pencil } from "lucide-react";

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: "income" | "expense";
  category: string;
}

export function Transactions() {
  const { state, dispatch } = useStore();

  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null);

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this transaction?")) {
      dispatch({ type: "DELETE_TRANSACTION", payload: id });
    }
  };

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
  };

  const handleEditComplete = (updatedTransaction: Transaction) => {
    dispatch({
      type: "EDIT_TRANSACTION",
      payload: {
        id: updatedTransaction.id,
        updates: updatedTransaction,
      },
    });
    setEditingTransaction(null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transactions History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {state.transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>
                  {new Date(transaction.date).toLocaleDateString()}
                </TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>{transaction.category}</TableCell>
                <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                <TableCell>{transaction.type}</TableCell>
                <TableCell className="space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(transaction)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(transaction.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {editingTransaction && (
          <EditTransactionDialog
            transaction={editingTransaction}
            onClose={() => setEditingTransaction(null)}
            onSave={handleEditComplete}
          />
        )}
      </CardContent>
    </Card>
  );
}
