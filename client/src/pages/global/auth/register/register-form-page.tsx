import type { IUserRegister } from "@/lib/store/global/auth/register/user-register-slice.type";
import { useState, type ChangeEvent, type FormEvent, type FC } from "react";
import type { IRegisterPageChildProps } from "./register-page"; // import prop type

const RegisterFormPage: FC<IRegisterPageChildProps> = ({ setNextPage }) => {
  const [userFormData, setUserFormData] = useState<IUserRegister>({
    email: "",
    password: "",
    username: "",
    confirmPassword: "",
  });

  const handleUserInputForm = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserFormData({
      ...userFormData,
      [name]: value,
    });
  };

  const handleFormSubmission = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (userFormData.password !== userFormData.confirmPassword) {
      console.log("Password & confirmation password should be same");
      return;
    }

    console.log("Form submitted:", userFormData);

    // Reset form
    setUserFormData({
      email: "",
      password: "",
      username: "",
      confirmPassword: "",
    });

    // Move to next page in parent
    return setNextPage("register-email-verification-token-page");
  };

  return (
    <main className="flex flex-col justify-center items-center">
      <header className="text-3xl font-[400] w-3/4 text-right mt-6">
        Create Account,
      </header>
      <form
        onSubmit={handleFormSubmission}
        className="w-[90%] mt-8 flex flex-col gap-4"
      >
        <div className="flex flex-col w-[350px] gap-1">
          <label className="text-md" htmlFor="username">
            Username
          </label>
          <input
            required
            id="username"
            onChange={handleUserInputForm}
            name="username"
            type="text"
            className="bg-[#1D271D] w-full px-3 py-3 outline-[#293829] focus:outline-2 border-0 rounded placeholder:text-sm text-sm"
            placeholder="joe@123"
            autoComplete="off"
            value={userFormData.username}
          />
        </div>
        <div className="flex flex-col w-[350px] gap-1">
          <label className="text-md" htmlFor="email">
            Email
          </label>
          <input
            required
            id="email"
            onChange={handleUserInputForm}
            name="email"
            type="email"
            className="bg-[#1D271D] w-full px-3 py-3 outline-[#293829] focus:outline-2 border-0 rounded placeholder:text-sm text-sm"
            placeholder="email or phone number"
            autoComplete="off"
            value={userFormData.email}
          />
        </div>
        <div className="flex flex-col w-[350px] gap-1">
          <label className="text-md" htmlFor="password">
            Password
          </label>
          <input
            required
            onChange={handleUserInputForm}
            id="password"
            name="password"
            type="password"
            className="bg-[#1D271D] w-full px-3 py-3 outline-[#293829] focus:outline-2 border-0 rounded placeholder:text-sm text-sm"
            placeholder="password"
            autoComplete="off"
            value={userFormData.password}
          />
        </div>
        <div className="flex flex-col w-[350px] gap-1">
          <label className="text-md" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            required
            onChange={handleUserInputForm}
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            className="bg-[#1D271D] w-full px-3 py-3 outline-[#293829] focus:outline-2 border-0 rounded placeholder:text-sm text-sm"
            placeholder="Confirm Password"
            autoComplete="off"
            value={userFormData.confirmPassword}
          />
        </div>
        <section className="h-fit w-[350px] some-actionsx flex flex-col gap-4 justify-center items-center">
          <button className="cursor-pointer px-4 py-2 w-[250px] rounded-3xl text-black bg-[rgba(41,224,41,0.59)]">
            Create Account
          </button>
        </section>
      </form>
    </main>
  );
};

export default RegisterFormPage;
