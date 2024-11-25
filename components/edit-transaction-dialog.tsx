import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: "income" | "expense";
  category: string;
}

interface EditTransactionDialogProps {
  transaction: Transaction;
  onClose: () => void;
  onSave: (transaction: Transaction) => void;
}

export function EditTransactionDialog({
  transaction,
  onClose,
  onSave,
}: EditTransactionDialogProps) {
  const [editedTransaction, setEditedTransaction] = useState(transaction);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editedTransaction);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Transaction</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={editedTransaction.date}
              onChange={(e) =>
                setEditedTransaction({
                  ...editedTransaction,
                  date: e.target.value,
                })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={editedTransaction.description}
              onChange={(e) =>
                setEditedTransaction({
                  ...editedTransaction,
                  description: e.target.value,
                })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              value={editedTransaction.amount}
              onChange={(e) =>
                setEditedTransaction({
                  ...editedTransaction,
                  amount: parseFloat(e.target.value),
                })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Select
              value={editedTransaction.type}
              onValueChange={(value: "income" | "expense") =>
                setEditedTransaction({ ...editedTransaction, type: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="expense">Expense</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              value={editedTransaction.category}
              onChange={(e) =>
                setEditedTransaction({
                  ...editedTransaction,
                  category: e.target.value,
                })
              }
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
