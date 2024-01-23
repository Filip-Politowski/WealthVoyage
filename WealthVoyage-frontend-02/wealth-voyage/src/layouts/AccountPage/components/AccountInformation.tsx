import { useEffect, useState } from "react";
import AccountModel from "../../../models/AccountModel";

export const AccountInformation = () => {
  const [account, setAccount] = useState<AccountModel>();
  useEffect(() => {
    const fetchAccount = async () => {
      const baseUrl: string = "http://localhost:8080/api/accounts/1";
      const response = await fetch(baseUrl);

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const responseJson = await response.json();

      const loadedAccount: AccountModel = {
        id: responseJson.id,
        userEmail: responseJson.userEmail,
        balance: responseJson.balance,
        accountName: responseJson.accountName,
      };
      setAccount(loadedAccount);
    };
    fetchAccount();
  }, []);
  return (
    <div className="container-flex">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Account name</th>
            <th scope="col">Savings Balance</th>
            <th scope="col">Email</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{account?.accountName}</td>
            <td>{account?.balance} zł</td>
            <td>{account?.userEmail}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
