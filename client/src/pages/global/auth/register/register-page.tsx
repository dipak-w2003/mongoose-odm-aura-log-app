import { lazy } from "react";
const RegisterFormPage = lazy(() => import("./register-form-page"));

const RegisterPage = () => {
  return (
    <main>
      <RegisterFormPage />
    </main>
  );
};

export default RegisterPage;
