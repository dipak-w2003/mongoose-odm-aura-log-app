import { Status } from "@/lib/global";
import { registerUser } from "@/lib/store/global/auth/register/user-register-slice";
import type { IUserRegister } from "@/lib/store/global/auth/register/user-register-slice.type";
import type { AppDispatch, RootState } from "@/lib/store/store";
import { useState, type ChangeEvent, type FormEvent, type FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const RegisterFormPage: FC = () => {
  const { status: registerStatus } = useSelector(
    (state: RootState) => state.userRegister
  );
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const ADMIN_PRIVATE_KEY = "secretkey";

  const [userFormData, setUserFormData] = useState<IUserRegister>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [role, setRole] = useState<"user" | "admin">("user");
  const [adminKey, setAdminKey] = useState("");

  const handleUserInputForm = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdminKeyChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAdminKey(e.target.value);
  };

  const handleFormSubmission = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (userFormData.password !== userFormData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (role === "admin" && adminKey !== ADMIN_PRIVATE_KEY) {
      alert("Invalid Admin Private Key!");
      return;
    }

    await dispatch(registerUser({ ...userFormData, role }));

    if (registerStatus === Status.SUCCESS) {
      console.log("Form submitted:", { ...userFormData, role });
      setUserFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setRole("user");
      setAdminKey("");
      setTimeout(() => navigate("/login"), 200);
    }
  };

  const formFields = [
    { label: "Username", name: "name", type: "text", placeholder: "joe@123" },
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "email or phone",
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "password",
    },
    {
      label: "Confirm Password",
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
    },
  ];

  const isRegisterDisabled = role === "admin" && adminKey !== ADMIN_PRIVATE_KEY;

  return (
    <main className="flex flex-col justify-center items-center">
      <header className="text-3xl font-[400] w-3/4 text-right mt-6">
        Create Account,
      </header>

      <form
        onSubmit={handleFormSubmission}
        className="w-[90%] mt-8 flex flex-col gap-4"
      >
        {formFields.map(({ label, name, type, placeholder }) => (
          <div key={name} className="flex flex-col w-[350px] gap-1">
            <label className="text-md" htmlFor={name}>
              {label}
            </label>
            <input
              required
              id={name}
              name={name}
              type={type}
              placeholder={placeholder}
              autoComplete="off"
              value={(userFormData as any)[name]}
              onChange={handleUserInputForm}
              className="bg-[#034A37] w-full px-3 py-3 outline-[#BCCBCE] focus:outline-2 border-0 rounded placeholder:text-sm text-sm"
            />
          </div>
        ))}

        {/* Role Tabs below Confirm Password */}
        <div className="flex gap-4 mt-2">
          <button
            type="button"
            onClick={() => setRole("user")}
            className={`px-4 py-2 rounded ${
              role === "user"
                ? "bg-[#FE802C] text-black"
                : "bg-[#034A37] text-white"
            }`}
          >
            User
          </button>
          <button
            type="button"
            onClick={() => setRole("admin")}
            className={`px-4 py-2 rounded ${
              role === "admin"
                ? "bg-[#FE802C] text-black"
                : "bg-[#034A37] text-white"
            }`}
          >
            Admin
          </button>
        </div>

        {/* Admin Private Key Input */}
        {role === "admin" && (
          <div className="flex flex-col w-[350px] gap-1 mt-2">
            <label className="text-md" htmlFor="adminKey">
              Admin Private Key
            </label>
            <input
              required
              id="adminKey"
              name="adminKey"
              type="password"
              placeholder="Enter secret key"
              autoComplete="off"
              value={adminKey}
              onChange={handleAdminKeyChange}
              className="bg-[#034A37] w-full px-3 py-3 outline-[#BCCBCE] focus:outline-2 border-0 rounded placeholder:text-sm text-sm"
            />
          </div>
        )}

        <section className="h-fit w-[350px] flex flex-col gap-4 justify-center items-center mt-4">
          <button
            type="submit"
            className={`cursor-pointer px-4 py-2 w-[250px] rounded-3xl text-black bg-[#FE802C] ${
              isRegisterDisabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isRegisterDisabled}
          >
            Create Account
          </button>
        </section>
      </form>
    </main>
  );
};

export default RegisterFormPage;
