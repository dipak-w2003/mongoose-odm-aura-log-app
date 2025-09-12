import mongoose, { Document, Schema } from "mongoose";

export interface IUserOTP extends Document {
  user: mongoose.Types.ObjectId,
  otp: string,
  expiresAt: Date,
  requestedAt: Date,
  requestCount: number
}

const otpSchema = new Schema<IUserOTP>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
  otp: { type: String, required: true },
  expiresAt: { type: Date, required: true },
  requestedAt: { type: Date, required: true },
  requestCount: { type: Number, default: 1 }
}, {
  timestamps: true
})


export const OTP_Model = mongoose.model<IUserOTP>(
  "Verification-OTP",
  otpSchema
)