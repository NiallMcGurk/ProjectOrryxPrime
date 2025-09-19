import { useNavigate } from "react-router-dom";
import { useState } from "react";

export interface AccountDetails {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
}

export function CreateAccountHandler() {
  const [accountDetails, setloginDetails] = useState<AccountDetails>({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const createAccount = async (event: React.FormEvent) => {
    event.preventDefault();

    if (accountDetails.password !== accountDetails.repeatPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      accountRoute(accountDetails, "POST");
    } catch (error) {
      alert(
        "An error occurred during account creation. Please try again later."
      );
    }
  };
  return { accountDetails, setloginDetails, createAccount };
}

export function UpdateAccountHandler(initialData: AccountDetails) {
  const [accountDetails, setAccountDetails] =
    useState<AccountDetails>(initialData);

  try {
    accountRoute(accountDetails, "PUT");
  } catch (error) {
    alert("An error occurred during account creation. Please try again later.");
  }

  return { accountDetails, setAccountDetails };
}

function accountRoute(accountData: AccountDetails, postOption: string) {
  const accountHandler = async () => {
    try {
      const response = await fetch(
        "http://localhost:51003/accountController/account",
        {
          method: postOption,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(accountData),
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Error");
    } catch {
      alert(
        "An error occurred while handling account. Please try again later."
      );
    }
  };

  return accountHandler();
}
