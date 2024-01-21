class AccountModel {
  id: number;
  userEmail: string;
  balance: number;
  accountName: string;

  constructor(
    id: number,
    userEmail: string,
    balance: number,
    accountName: string
  ) {
    this.id = id;
    this.userEmail = userEmail;
    this.balance = balance;
    this.accountName = accountName;
  }
}
export default AccountModel;
