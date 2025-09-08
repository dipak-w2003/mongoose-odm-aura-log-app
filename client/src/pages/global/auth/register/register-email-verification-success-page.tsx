import type React from "react";
import type { IRegisterPageChildProps } from "./register-page";
import { NavLink } from "react-router-dom";

const RegisterEmailVerificationSuccessPage: React.FC<
  IRegisterPageChildProps
> = ({ setNextPage }) => {
  return (
    <div>
      <NavLink to={"/login"}>Back Login</NavLink>
    </div>
  );
};

export default RegisterEmailVerificationSuccessPage;
