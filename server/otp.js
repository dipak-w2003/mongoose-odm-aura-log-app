let otp = "";

for (let i = 0; i < 6; i++) {
  const digit = Math.floor(Math.random() * 10); // generates 0–9
  otp += digit;
}

console.log("OTP:", otp);
