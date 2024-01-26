export const menu = [
  {
    id: 1,
    title: "main",
    listItems: [
      {
        id: 1,
        title: "Homepage",
        url: "/",
        icon: "home.svg",
      },
      {
        id: 2,
        title: "Profile",
        url: "/users/1",
        icon: "user.svg",
      },
    ],
  },
  {
    id: 2,
    title: "lists",
    listItems: [
      {
        id: 1,
        title: "Users",
        url: "/users",
        icon: "user.svg",
      },
      {
        id: 2,
        title: "Installments",
        url: "/installments",
        icon: "product.svg",
      },
      {
        id: 3,
        title: "Saving goals",
        url: "/savingGoals",
        icon: "order.svg",
      },
      {
        id: 4,
        title: "Transactions",
        url: "/transactions",
        icon: "post2.svg",
      },
    ],
  },
  {
    id: 3,
    title: "general",
    listItems: [
      {
        id: 1,
        title: "Elements",
        url: "/",
        icon: "element.svg",
      },
      {
        id: 2,
        title: "Notes",
        url: "/",
        icon: "note.svg",
      },
      {
        id: 3,
        title: "Forms",
        url: "/",
        icon: "form.svg",
      },
      {
        id: 4,
        title: "Calendar",
        url: "/",
        icon: "calendar.svg",
      },
    ],
  },
  {
    id: 4,
    title: "Maintenance",
    listItems: [
      {
        id: 1,
        title: "Settings",
        url: "/",
        icon: "setting.svg",
      },
      {
        id: 2,
        title: "Backups",
        url: "/",
        icon: "backup.svg",
      },
    ],
  },
  {
    id: 5,
    title: "analytics",
    listItems: [
      {
        id: 1,
        title: "Charts",
        url: "/",
        icon: "chart.svg",
      },
      {
        id: 2,
        title: "Logs",
        url: "/",
        icon: "log.svg",
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
    amount: 60,
    transactionType: "expense",
    category: "groceries",
    date: "2022-01-02",
  },
  {
    id: 3,
    amount: 2000,
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
    amount: 200,
    transactionType: "expense",
    category: "utilities",
    date: "2022-01-05",
  },
  {
    id: 6,
    amount: 500,
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
];

export const chartBoxSavings = {
  color: "#8884d8",
  icon: "/savings.svg",
  title: "Saved money",
  number: "5000.238",
  dataKey: "savings",
  percentage: 45,
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