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
        url: "/profile",
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
        url: "/savingGoals",
        icon: "/savingGoals.svg",
      },
      {
        id: 2,
        title: "Installments",
        url: "/installments",
        icon: "/loan-menu.svg",
      },
      {
        id: 3,
        title: "Transactions",
        url: "/transactions",
        icon: "/transaction.svg",
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

export const installmentsRow = [
  {
    id: 1,
    loanName: "Computer",
    numberOfInstallments: 30,
    installmentAmount: 9000,
    endDateOfInstallment: "2024-01-01",
    priceOfSingleInstallment: 9000 / 30,
    paymentDate: "2023-01-01",
  },
  {
    id: 2,
    loanName: "Phone",
    numberOfInstallments: 20,
    installmentAmount: 3000,
    endDateOfInstallment: "2024-01-01",
    priceOfSingleInstallment: 9000 / 30,
    paymentDate: "2023-01-01",
  },
  {
    id: 3,
    loanName: "Keyboard",
    numberOfInstallments: 3,
    installmentAmount: 500,
    endDateOfInstallment: "2024-01-01",
    priceOfSingleInstallment: 9000 / 30,
    paymentDate: "2023-01-01",
  },
  {
    id: 4,
    loanName: "Mouse",
    numberOfInstallments: 2,
    installmentAmount: 500,
    endDateOfInstallment: "2024-01-01",
    priceOfSingleInstallment: 9000 / 30,
    paymentDate: "2023-01-01",
  },
  {
    id: 5,
    loanName: "Speakers",
    numberOfInstallments: 5,
    installmentAmount: 1500,
    endDateOfInstallment: "2024-01-01",
    priceOfSingleInstallment: 9000 / 30,
    paymentDate: "2023-01-01",
  },
  {
    id: 6,
    loanName: "Display",
    numberOfInstallments: 15,
    installmentAmount: 3000,
    endDateOfInstallment: "2024-01-01",
    priceOfSingleInstallment: 9000 / 30,
    paymentDate: "2023-01-01",
  },
  {
    id: 7,
    loanName: "Pad",
    numberOfInstallments: 1,
    installmentAmount: 200,
    endDateOfInstallment: "2024-01-01",
    priceOfSingleInstallment: 9000 / 30,
    paymentDate: "2023-01-01",
  },
  {
    id: 8,
    loanName: "Microphone",
    numberOfInstallments: 3,
    installmentAmount: 500,
    endDateOfInstallment: "2024-01-01",
    priceOfSingleInstallment: 9000 / 30,
    paymentDate: "2023-01-01",
  },
  {
    id: 9,
    loanName: "Bum arm",
    numberOfInstallments: 4,
    installmentAmount: 900,
    endDateOfInstallment: "2024-01-01",
    priceOfSingleInstallment: 9000 / 30,
    paymentDate: "2023-01-01",
  },
  {
    id: 10,
    loanName: "Bum arm",
    numberOfInstallments: 4,
    installmentAmount: 900,
    endDateOfInstallment: "2024-01-01",
    priceOfSingleInstallment: 9000 / 30,
    paymentDate: "2023-01-01",
  },
  {
    id: 11,
    loanName: "Bum arm",
    numberOfInstallments: 4,
    installmentAmount: 900,
    endDateOfInstallment: "2024-01-01",
    priceOfSingleInstallment: 9000 / 30,
    paymentDate: "2023-01-01",
  },
  {
    id: 12,
    loanName: "Bum arm",
    numberOfInstallments: 4,
    installmentAmount: 900,
    endDateOfInstallment: "2024-01-01",
    priceOfSingleInstallment: 9000 / 30,
    paymentDate: "2023-01-01",
  },
  {
    id: 13,
    loanName: "Bum arm",
    numberOfInstallments: 4,
    installmentAmount: 900,
    endDateOfInstallment: "2024-01-01",
    priceOfSingleInstallment: 9000 / 30,
    paymentDate: "2023-01-01",
  },
];

export const singleInstallment = {
  id: 1,
  img: "/loan.svg",
  title: "Computer",
  info: {
    loanId: 1,
    loanName: "Computer",
    totalAmountOfLoan: 9000,
    numberOfInstallments: 30,
    startDateOfInstallment: "2023-01-01",
    endDateOfInstallment: "2024-01-01",
    numberOfPaidInstallments: 10,
  },
  percentageOfPaidInstallments: 50,
  activities: [
    {
      dueDate: "2024-03-01",
      loanName: "Computer",
    },
    {
      dueDate: "2024-04-01",
      loanName: "Computer",
    },
    {
      dueDate: "2024-05-01",
      loanName: "Computer",
    },
    {
      dueDate: "2024-05-01",
      loanName: "Computer",
    },
    {
      dueDate: "2024-05-01",
      loanName: "Computer",
    },
    {
      dueDate: "2024-05-01",
      loanName: "Computer",
    },
  ],
};

export const singleGoalDetails = {
  id: 1,
  savingGoalName: "Car",
  savingGoalAmount: 5000,
  amountSaved: 2000,
  savingsProgression: 40,

}
