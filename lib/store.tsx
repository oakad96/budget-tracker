"use client";

import { createContext, useContext, useEffect, useReducer } from "react";
import { Transaction, Budget } from "@/lib/types";
import { toast } from "sonner";

interface State {
  transactions: Transaction[];
  budgets: Budget[];
}

type Action =
  | { type: "ADD_TRANSACTION"; payload: Transaction }
  | {
      type: "EDIT_TRANSACTION";
      payload: { id: string; updates: Partial<Transaction> };
    }
  | { type: "DELETE_TRANSACTION"; payload: string }
  | { type: "SET_BUDGET"; payload: Budget }
  | { type: "DELETE_BUDGET"; payload: string }
  | { type: "LOAD_DATA"; payload: State };

const initialState: State = {
  transactions: [],
  budgets: [],
};

const StoreContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
} | null>(null);

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_TRANSACTION":
      const newState = {
        ...state,
        transactions: [...state.transactions, action.payload],
      };

      if (action.payload.type === "expense") {
        const budget = state.budgets.find(
          (b) => b.category === action.payload.category
        );
        if (budget) {
          const totalExpenses = newState.transactions
            .filter(
              (t) =>
                t.type === "expense" && t.category === action.payload.category
            )
            .reduce((sum, t) => sum + t.amount, 0);

          if (totalExpenses >= budget.limit * 0.8) {
            toast.warning(
              `You've reached 80% of your budget for ${action.payload.category}!`
            );
          }
        }
      }

      return newState;

    case "EDIT_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.map((t) =>
          t.id === action.payload.id ? { ...t, ...action.payload.updates } : t
        ),
      };

    case "DELETE_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.filter((t) => t.id !== action.payload),
      };

    case "SET_BUDGET":
      const existingBudgetIndex = state.budgets.findIndex(
        (b) => b.category === action.payload.category
      );

      const newBudgets =
        existingBudgetIndex >= 0
          ? state.budgets.map((b, i) =>
              i === existingBudgetIndex ? action.payload : b
            )
          : [...state.budgets, action.payload];

      return {
        ...state,
        budgets: newBudgets,
      };

    case "DELETE_BUDGET":
      return {
        ...state,
        budgets: state.budgets.filter((b) => b.category !== action.payload),
      };

    case "LOAD_DATA":
      return action.payload;

    default:
      return state;
  }
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const initialData = (() => {
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem("budgetData");
      return savedData ? JSON.parse(savedData) : initialState;
    }
    return initialState;
  })();

  const [state, dispatch] = useReducer(reducer, initialData);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      (state.transactions.length > 0 || state.budgets.length > 0)
    ) {
      console.log("Saving to localStorage:", state);
      localStorage.setItem("budgetData", JSON.stringify(state));
    }
  }, [state]);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}
