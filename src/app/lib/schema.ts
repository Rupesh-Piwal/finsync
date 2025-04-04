import { z } from "zod";

export const amountValidation = z.number().positive("Amount must be positive");
export const dateValidation = z
  .date()
  .max(new Date(), "Date cannot be in the future");
export const uuidValidation = z.string().uuid("Invalid ID format");


export const budgetFormSchema = z.object({
  name: z
    .string()
    .min(2, "Budget name must be at least 2 characters")
    .max(50, "Budget name cannot exceed 50 characters"),
  amount: amountValidation,
  categoryId: z.string().uuid("Please select a valid category"),
});

export type BudgetFormValues = z.infer<typeof budgetFormSchema>;


export const expenseFormSchema = z.object({
  title: z
    .string()
    .min(2, "Title must be at least 2 characters")
    .max(100, "Title cannot exceed 100 characters"),
  amount: amountValidation,
  date: dateValidation,
  categoryId: z.string().uuid("Please select a valid category"),
  budgetId: z.string().uuid("Please select a valid budget").optional(),
});

export type ExpenseFormValues = z.infer<typeof expenseFormSchema>;


export const categoryFormSchema = z.object({
  name: z
    .string()
    .min(2, "Category name must be at least 2 characters")
    .max(30, "Category name cannot exceed 30 characters")
    .regex(/^[a-zA-Z0-9 ]+$/, "Only letters, numbers and spaces allowed"),
});

export type CategoryFormValues = z.infer<typeof categoryFormSchema>;
