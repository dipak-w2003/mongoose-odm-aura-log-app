import mongoose, { Document, Schema } from "mongoose";

// ODM interface (TS type)
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin" | "seller";
  mobile_no?: string; // optional, not everyone adds mobile
  // is_logged: true | false,
  is_blocked: true | false,
  is_verified: true | false,
  createdAt: Date;
  updatedAt: Date;
}

// ODM schema
const userSchema: Schema<IUser> = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"]
    },

    password: {
      type: String,
      required: true,
      minlength: 6
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },


    mobile_no: {
      type: String,
      match: [/^\d{10,15}$/, "Invalid mobile number"],
      default: null
    }

    , is_blocked: {
      type: Boolean,
      default: false,
    },
    is_verified: {
      type: Boolean,
      default: false,
    },

  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete (ret as any).password; // never expose password
        return ret;
      }
    }
  }
);

// ODM model
export const UserModel = mongoose.model<IUser>("User", userSchema);
