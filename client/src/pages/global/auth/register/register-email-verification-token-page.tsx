import React, { useState, type ChangeEvent, type FormEvent } from "react";
import type { IRegisterPageChildProps } from "./register-page";

const RegisterEmailVerificationTokenPage: React.FC<IRegisterPageChildProps> = ({
  setNextPage,
}) => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));

  const handleUserInputForm = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;
    setOtp((prevOtp) => {
      const updatedOtp = [...prevOtp];
      updatedOtp[index] = value;
      return updatedOtp;
    });
    // For now: move to success page immediately
  };

  const handleFormSubmission = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const otpCode = otp.join("");
    console.log("Submitted OTP:", otpCode);
    // TODO: send OTP to backend
    if (otp.length == 6)
      return setNextPage("register-email-verification-success-page");
  };

  const requestAnotherOTP = () => {
    setOtp(["", "", "", "", "", ""]);
  };
  return (
    <div>
      <main className="flex flex-col justify-center items-center">
        <header className="text-3xl font-[400] w-3/4 text-right mt-6">
          Enter 6 Digit OTP,
        </header>
        <form
          onSubmit={handleFormSubmission}
          className="w-[90%] mr-10   mt-8 flex flex-col items-center justify-center  gap-4"
        >
          <div className="token-section w-[90%] justify-center  mt-8 flex gap-4">
            {otp.map((digit, index) => (
              <input
                key={index}
                value={digit}
                onChange={(e) => handleUserInputForm(e, index)}
                className="bg-[#1D271D] w-[80px] h-[80px] px-3 py-3 outline-[#293829] focus:outline-2 border-0 rounded text-center text-3xl font-light"
                type="text"
                maxLength={1}
                pattern="[0-9]"
                name={`otp_position_${index + 1}`}
                inputMode="numeric"
                autoComplete="one-time-code"
                required
              />
            ))}
          </div>
          <section className="h-fit w-[100%] flex flex-col gap-4 justify-center items-center">
            <p className="text-[#5F5E5E] text-sm">
              we have sent you 6-digit OTP to your emaill comfirmation
            </p>
            <button
              type="submit"
              className="mt-10  cursor-pointer px-4 py-2 w-[250px] rounded-3xl text-black bg-[rgba(41,224,41,0.59)]"
            >
              Confirm
            </button>
            <button
              onClick={requestAnotherOTP}
              className="text-[#5F5E5E] text-sm underline cursor-pointer"
            >
              Didn't receive resend?
            </button>
          </section>
        </form>
      </main>
    </div>
  );
};

export default RegisterEmailVerificationTokenPage;
