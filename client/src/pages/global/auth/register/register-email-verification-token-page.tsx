import React from "react";
import type { IRegisterPageChildProps } from "./register-page";

const RegisterEmailVerficationTokenPage: React.FC<IRegisterPageChildProps> = ({
  setNextPage,
}) => {
  const confirmationHandler = () => {
    return setNextPage("register-email-verification-success-page");
  };
  return (
    <div>
      <button onClick={confirmationHandler}>Confirm Token</button>
    </div>
  );
};

export default RegisterEmailVerficationTokenPage;
