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

export const lastTransactions = [
  {
    id: 1,
    amount: 6000,
    transactionType: "income",
    category: "salary",
    date: "2022-01-01",
  },
  {
    id: 2,
    amount: -60,
    transactionType: "expense",
    category: "groceries",
    date: "2022-01-02",
  },
  {
    id: 3,
    amount: -2000,
    transactionType: "expense",
    category: "rent",
    date: "2022-01-03",
  },
  {
    id: 4,
    amount: 750,
    transactionType: "income",
    category: "freelance",
    date: "2022-01-04",
  },
  {
    id: 5,
    amount: -200,
    transactionType: "expense",
    category: "utilities",
    date: "2022-01-05",
  },
  {
    id: 6,
    amount: -500,
    transactionType: "expense",
    category: "entertainment",
    date: "2022-01-06",
  },
  {
    id: 7,
    amount: 3000,
    transactionType: "income",
    category: "bonus",
    date: "2022-01-07",
  },
  {
    id: 8,
    amount: 3000,
    transactionType: "income",
    category: "bonus",
    date: "2022-01-07",
  },
];
export const singleTransaction = {
  id: 1,
  amount: 6000,
  transactionType: "income",
  category: "salary",
  date: "2022-01-01",
};

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

export const barChartBox1 = {
  title: "Template1",
  color: "#32CD32",
  dataKey: "savings",
  chartData: [
    {
      name: "Sun",
      savings: 4000,
    },
    {
      name: "Mon",
      savings: 3000,
    },
    {
      name: "Tue",
      savings: 2000,
    },
    {
      name: "Wed",
      savings: 2780,
    },
    {
      name: "Thu",
      savings: 1890,
    },
    {
      name: "Fri",
      savings: 2390,
    },
    {
      name: "Sat",
      savings: 3490,
    },
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
export const bigChartData = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export const savingGoalImages = [
  "/money.svg",
  "/car.svg",
  "/homeImg.svg",
  "/bike.svg",
  "/gift.svg",
  "/games.svg",
];

export interface MonthsOptions {
  readonly value: string | null;
  readonly label: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
}

export const monthsOptions: readonly MonthsOptions[] = [
  { value: null, label: "All Months" },
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
