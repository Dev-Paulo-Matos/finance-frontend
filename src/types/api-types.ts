/* tslint:disable */
/* eslint-disable */
// Generated using typescript-generator version 3.2.1263 on 2026-03-19 21:50:05.

export interface AccountFilter {
    name: string;
    minBalance: number;
    maxBalance: number;
}

export interface AccountRequest {
    id: number;
    name: string;
    desc: string;
    balance: number;
}

export interface AccountResponse {
    id: number;
    name: string;
    desc: string;
    balance: number;
}

export interface AuthResponse {
    token: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    userName: string;
    name: string;
    email: string;
    phone: string;
    password: string;
    passCode: string;
}

export interface CategoriesFilter {
    name: string;
    transactionType: TransactionType;
    minLimitValue: number;
    maxLimitValue: number;
}

export interface CategoryRequest {
    id: number;
    name: string;
    desc: string;
    type: TransactionType;
    color: string;
    icon: string;
    limitValue: number;
}

export interface CategoryResponse {
    id: number;
    name: string;
    desc: string;
    type: TransactionType;
    icon: string;
    color: string;
    limitValue: number;
    spendValue: number;
}

export interface CategorySumDTO {
    categoryName: string;
    totalAmount: number;
}

export interface DashboardChartsResponse {
    incomesByDate: DateSumDTO[];
    expensesByDate: DateSumDTO[];
    incomesByCategory: CategorySumDTO[];
    expensesByCategory: CategorySumDTO[];
}

export interface DashboardSummaryResponse {
    totalIncome: number;
    totalExpense: number;
    totalBalance: number;
}

export interface DateSumDTO {
    date: DateAsString;
    totalAmount: number;
}

export interface TransactionFilter {
    description: string;
    type: TransactionType;
    accountId: number;
    categoryId: number;
    startDate: DateAsString;
    endDate: DateAsString;
    minAmount: number;
    maxAmount: number;
}

export interface TransactionRequest {
    description: string;
    amount: number;
    type: TransactionType;
    date: DateAsString;
    account: AccountRequest;
    category: CategoryRequest;
}

export interface TransactionResponse {
    id: number;
    description: string;
    amount: number;
    type: TransactionType;
    date: DateAsString;
    account: AccountResponse;
    category: CategoryResponse;
}

export interface UserResponse {
    id: number;
    name: string;
    email: string;
    password: string;
    phone: string;
    role: string;
}

export interface UserResponseBuilder {
}

export interface UserUpdateRequest {
    name: string;
    phone: string;
    password: string;
}

export interface PageResponse<T> {
    data: T[];
    total: number;
    page: number;
    size: number;
    totalPages: number;
}

export type DateAsString = string;

export enum TransactionType {
    INCOME = "INCOME",
    EXPENSE = "EXPENSE",
}
