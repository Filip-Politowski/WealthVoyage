export const menu = [
  {
    id: 1,
    title: "main",
    listItems: [
      {
        id: 1,
        title: "Dashboard",
        url: "/dashboard",
        icon: "/dashboard.svg",
      },
      {
        id: 2,
        title: "Profile",
        url: "/dashboard/profile",
        icon: "/profile.svg",
      },
    ],
  },
  {
    id: 2,
    title: "lists",
    listItems: [
      {
        id: 1,
        title: "Saving goals",
        url: "/dashboard/savingGoals",
        icon: "/savingGoals.svg",
      },
      {
        id: 2,
        title: "Loans",
        url: "/dashboard/loans",
        icon: "/loan-menu.svg",
      },
      {
        id: 3,
        title: "Transactions",
        url: "/dashboard/transactions",
        icon: "/transaction.svg",
      },
      {
        id: 4,
        title: "Incomes",
        url: "/dashboard/incomes",
        icon: "/income.svg",
      },
      {
        id: 5,
        title: "Expenses",
        url: "/dashboard/expenses",
        icon: "/expense.svg",
      },
    ],
  },
];




export const chartBoxSavings = {
  color: "#8884d8",
  icon: "/savings.svg",
  title: "Saved money",
  number: "5000.238",
  dataKey: "savings",
  percentage: 50,
  chartData: [
    { name: "1", savings: 400 },
    { name: "2", savings: 600 },
    { name: "3", savings: 500 },
    { name: "4", savings: 700 },
    { name: "5", savings: 400 },
    { name: "6", savings: 500 },
    { name: "7", savings: 450 },
  ],
};


export const barChartBox2 = {
  title: "Template2",
  color: "#BC8F8F",
  dataKey: "savings",
  chartData: [
    {
      name: "Sun",
      savings: 400,
    },
    {
      name: "Mon",
      savings: 3000,
    },
    {
      name: "Tue",
      savings: 500,
    },
    {
      name: "Wed",
      savings: 4087,
    },
    {
      name: "Thu",
      savings: 5312,
    },
    {
      name: "Fri",
      savings: 2390,
    },
    {
      name: "Sat",
      savings: 1878,
    },
  ],
};


export const savingGoalImages = [
  "/money.svg",
  "/car.svg",
  "/homeImg.svg",
  "/bike.svg",
  "/gift.svg",
  "/games.svg",
  "/airplane.svg",
];

export interface MonthsOptions {
  readonly value: string;
  readonly label: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
}

export interface YearsOptions {
  value: string;
  label: string;
}

export interface ExpenseOptions {
  value: string;
  label: string;
}
export interface ExpenseOptions {
  value: string;
  label: string;
}

export interface SingleExpenseCategory {
  value: string;
  label: string;
}

export const singleExpenseCategory: SingleExpenseCategory[] = [
  { value: "All", label: "All" },
  { value: "ACCOMMODATION", label: "Accommodation" },
  { value: "FOOD", label: "Food" },
  { value: "TRANSPORTATION", label: "Transportation" },
  { value: "HEALTHCARE", label: "Healthcare" },
  { value: "PERSONAL_CARE", label: "Personal care" },
  { value: "CLOTHING_AND_FOOTWEAR", label: "Clothing and footwear" },
  { value: "ENTERTAINMENT", label: "Entertainment" },
  { value: "EDUCATION", label: "Education" },
  { value: "SAVINGS", label: "Savings" },
  { value: "DEBT", label: "Debt" },
  { value: "OTHER", label: "Other" },
];

export const expenseOptions: ExpenseOptions[] = [
  { value: "singleExpenses", label: "Single Expenses" },
  { value: "recurringExpenses", label: "Recurring Expenses" },
  { value: "plannedExpenses", label: "Planned Expenses" },
];

export interface SortOptionsSingleExpense {
  value: string;
  label: string;
}

export interface OrderOptionsSingleExpense {
  value: string;
  label: string;
}

export const sortOptions: SortOptionsSingleExpense[] = [
  { value: "date", label: "Date" },
  { value: "amount", label: "Amount" },
  { value: "expenseCategory", label: "Category" },
];

export const orderOptions: OrderOptionsSingleExpense[] = [
  { value: "asc", label: "Ascending" },
  { value: "desc", label: "Descending" },
];
export const monthsOptions: readonly MonthsOptions[] = [
  { value: "01", label: "January" },
  { value: "02", label: "February" },
  { value: "03", label: "March" },
  { value: "04", label: "April" },
  { value: "05", label: "May" },
  { value: "06", label: "June" },
  { value: "07", label: "July" },
  { value: "08", label: "August" },
  { value: "09", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];

export const yearsOptions: readonly YearsOptions[] = (() => {
  const currentYear = new Date().getFullYear();
  const years: YearsOptions[] = [];

  for (let year = currentYear; year >= currentYear - 50; year--) {
    years.push({ value: year.toString(), label: year.toString() });
  }

  return years;
})();
