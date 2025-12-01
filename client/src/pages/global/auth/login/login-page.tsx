import type { IUserLogin } from "@/lib/store/global/auth/login/user-login-slice.type";
import { userLogin } from "../../../../../src/lib/store/global/auth/login/user-login-slice";
import type { AppDispatch, RootState } from "@/lib/store/store";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Status } from "@/lib/global";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { status } = useSelector((state: RootState) => state.userLogin);
  const [userFormData, setUserFormData] = useState<IUserLogin>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const handleUserInputForm = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserFormData({
      ...userFormData,
      [name]: value,
    });
  };
  const handleFormSubmission = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(userFormData);
    dispatch(userLogin(userFormData));
    console.log(status);
    if (status === Status.SUCCESS) return navigate("/profile");
    setUserFormData({
      email: "",
      password: "",
    });
  };
  return (
    <main className="flex flex-col justify-center items-center">
      <header className="text-3xl font-[400] w-3/4 text-right mt-6">
        Welcome back,
      </header>
      <form
        onSubmit={handleFormSubmission}
        className="w-[90%] mt-8 flex flex-col gap-4"
      >
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
            className="bg-[#034A37] w-full px-3 py-3 outline-[#BCCBCE] focus:outline-2 border-0  rounded  placeholder:text-sm text-sm"
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
            className="bg-[#034A37] w-full px-3 py-3 outline-[#BCCBCE] focus:outline-2 border-0  rounded  placeholder:text-sm text-sm"
            placeholder="password"
            autoComplete="off"
            value={userFormData.password}
          />
        </div>

        <section className="h-fit  w-[350px] some-actionsx  flex flex-col gap-4 justify-center items-center ">
          <button className="cursor-pointer self-baseline text-left text-sm   py-2 w-[200px] rounded">
            forgot-password?
          </button>
          <button className="cursor-pointer  px-4 py-2 w-[250px] rounded-3xl text-black bg-[#FE802C]">
            Login
          </button>

          <Link
            to={"/register"}
            className="cursor-pointer mt-48  px-3 py-2 w-full rounded text-center text-sm "
          >
            Don't have an account?
          </Link>
        </section>
      </form>
    </main>
  );
};

export default LoginPage;
