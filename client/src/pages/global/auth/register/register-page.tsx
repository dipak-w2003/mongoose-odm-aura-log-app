// import React, { useState, type FC } from "react";
// import RegisterFormPage from "./register-form-page";
// import RegisterEmailVerficationTokenPage from "./register-email-verification-token-page";
// import RegisterEmailVerificationSuccessPage from "./register-email-verification-success-page";
// import RegisterEmailVerificationErrorPage from "./register-email-verification-error-page copy";

// export type ListsPagesKey =
//   | "register-form-page"
//   | "register-email-verification-token-page"
//   | "register-email-verification-success-page"
//   | "register-email-verification-error-page";

// // Props passed to all children
// export interface IRegisterPageChildProps {
//   setNextPage: (next: ListsPagesKey) => void;
// }

// // Collection of pages
// interface IRegisterPageCollectionNode {
//   name: ListsPagesKey;
//   element: FC<IRegisterPageChildProps>;
// }

// export const collectionRegisterPageCollectionPages: IRegisterPageCollectionNode[] =
//   [
//     { name: "register-form-page", element: RegisterFormPage },
//     {
//       name: "register-email-verification-token-page",
//       element: RegisterEmailVerficationTokenPage,
//     },
//     {
//       name: "register-email-verification-success-page",
//       element: RegisterEmailVerificationSuccessPage,
//     },
//     {
//       name: "register-email-verification-error-page",
//       element: RegisterEmailVerificationErrorPage,
//     },
//   ] as const;

// const RegisterPage: FC = () => {
//   const [nextPage, setNextPage] = useState<ListsPagesKey>("register-form-page");

//   // Find the page component from the collection
//   const PageToRender = collectionRegisterPageCollectionPages.find(
//     (p) => p.name === nextPage
//   )?.element;

//   if (!PageToRender) return <p>Page not found</p>;

//   return <PageToRender setNextPage={setNextPage} />;
// };

// export default RegisterPage;

const RegisterPage = () => {
  return (
    <main>
      <RegisterPage />
    </main>
  );
};

export default RegisterPage;
