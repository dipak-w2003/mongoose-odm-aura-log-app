import { Request, Response } from "express";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { IUser, UserModel } from "../../../models/user.model";
import { envConfigs } from "../../../config/env-configs";
import { IExtendedRequest } from "../../../middlware/index.type";
import { nodeMailer } from "../../../services/nodemailer.service";
import { OTP_Genarator } from "../../../services/otp-generator";
import { OTP_Model } from "../../../models/user-otp.model";

//  CREATE : insert a user
export const createUser = async (req: Request, res: Response) => {
  const { name, email, password }: IUser = req.body
  const existingUser = await UserModel.findOne({ name: name, email: email })
  if (existingUser) return res.json({
    message: "User already registered !"
  })
  if (!name && !email && !password) res.status(400).json({ message: "Provide name,email,password !!" })
  // Hash password with bcrypt
  const hashedPassword: string = bcrypt.hashSync(password, 12)

  const newUser = await UserModel.create({
    name, email, password: hashedPassword
  })
  await newUser.save()
  res.status(200).json({
    message: "user created !",
  })
}

/**@verificationOTP for otp request for specific user */
export const verificationOTP = async (req: IExtendedRequest, res: Response) => {
  const userId = req.user?.id;

  // Check if userId exists in request context
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized: User not found in request" });
  }

  // Fetch user and existing OTPs
  const checkUser = await UserModel.findById(userId);
  const existingOtps = await OTP_Model.find({ user: userId });

  // Generate a new OTP
  const OTP = OTP_Genarator().genaratedOTP;

  // If user exists, proceed
  if (checkUser) {
    const OTP_REQUEST_LIMIT = 9;

    // Check if user has exceeded OTP request limit
    if (existingOtps.length < OTP_REQUEST_LIMIT) {
      const count = existingOtps.length + 1;

      // Create a new OTP entry (5-minute expiry)
      await OTP_Model.create({
        user: userId,
        otp: OTP,
        expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes
        requestCount: count,
        requestedAt: new Date(),
      });

      // Send OTP via email using NodeMailer
      await nodeMailer({
        subject: "AuraLog Email Verification - Your One-Time Password (OTP)",
        text: `Hello ${checkUser.name || ''},
Your one-time password (OTP) for verifying your AuraLog email is: ${OTP}
Please enter this code within the next 5 minutes to complete your verification.
If you did not request this, please ignore this email.
Thank you,
The AuraLog Team`,
        html: `
            <div style="font-family: Arial, sans-serif; color: #333;">
              <h2>Hello ${checkUser.name || ''},</h2>
              <p>Your one-time password (OTP) for verifying your AuraLog email is:</p>
              <div style="font-size: 24px; font-weight: bold; margin: 20px 0; color: #007bff;">${OTP}</div>
              <p>Please enter this code within the next <strong>5 minutes</strong> to complete your verification.</p>
              <p>If you did not request this, you can safely ignore this email.</p>
              <br>
              <p>Thank you,<br>The AuraLog Team</p>
            </div>
          `,
        to: checkUser.email,
      });

      return res.status(201).json({
        message: "OTP has been sent successfully.",
      });
    }

    // OTP request limit exceeded
    return res.status(429).json({
      message: "Too many OTP requests. Please try again later.",
    });
  }

  // If user not found in DB
  return res.status(404).json({
    message: "User not found.",
  });
};
// export const VerifyUser = (req: IExtendedRequest, res: Response) => {
// }

// verify User : DROP IDEA
/**
 * @VerifyOTP
 * so, its regarding we do not verfies during user creation so for the afterward we decided to make a controller which will be used to verify user(email)
 * Process:
 * route: /verify-otp
 * otp model with userId type to show relation
 * fn > verifyUser():
 * grab user Id and validate if exists
 * exists -> call OTP_Model
 * !exists -> create OTP_Model
 * nodeMailer transfer OTP with 5 Mins limitation and make sure requestCount>=3
 * 
 * @VerifyUser
 * we now have tokenModel & userModel
 * route : /verify-user
 * check exists of not user / otp of specific via req.user.id : userId
 * if exist > fn():
 * {password,otp} = req.body
 * lastestOTP = await OTP_Model.find({userId}).otp : make sure to grab latest
 * one
 * compare now : token === latestOTP > fn():
 * compared -> UserModel.updateOne({ id:"", is_verfied:true })
 *  */
// export const verifyUser = async (req: IExtendedRequest, res: Response) => {
//   const userId = req.user?.id
//   const existingUser = await UserModel.findOne({ userId })
//   const existingOtp = await OTP_Model.findOne({ userId })
//   const genaratedOTP = OTP_Genarator().genaratedOTP
//   if (existingOtp && existingUser) {
//     if (existingOtp.requestCount >= 3) {
//       return res.status(429).json({
//         message: "Too many OTP request !"
//       })
//     }
//     // updated OTP & increment counts
//     existingOtp.otp = OTP_Genarator().genaratedOTP
//     // 5 Mins
//     existingOtp.expiresAt = new Date(Date.now() + 5 + 60 + 1000)
//     existingOtp.requestCount += 1
//     existingOtp.requestedAt = new Date()
//     await existingOtp.save()

//     // OTP's & Mails
//     const nodeMail = await nodeMailer({
//       subject: "Email Verification For AuraLog",
//       text: "We have sent you 6 digit OTP please fill OTP form input for account creation",
//       to: existingUser.email,
//       html: `<h1>Your OTP : ${genaratedOTP}</h1>`
//     })
//   }

//   res.status(201).json({
//     message: "OTP Sent Successfully"
//   })
// }

// verifyUser
export const verifyUser = async (req: IExtendedRequest, res: Response) => {
  const userId = req.user?.id;
  const { otp } = req.body
  const existingUser = await UserModel.findOne({ _id: userId })
  console.log(existingUser);
  console.log(otp);

  // Validate that userId is present
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized: No user ID provided." });
  }

  // Get all OTPs for the user
  const existingOtps = await OTP_Model.find({ user: userId, }).sort();

  // Check if there are any OTPs
  if (!existingOtps.length) {
    return res.status(404).json({ message: "No OTP records found for this user." });
  }
  // Grab latest otp detail

  const latestOtp = existingOtps[existingOtps.length - 1];
  // if new date is less than latestOtp.expiresAt then it will be valid otherwise expired
  if (new Date() < new Date(latestOtp.expiresAt) && otp === latestOtp.otp) {
    console.log("OTP matched !");
    await UserModel.findOneAndUpdate(
      { _id: userId },
      { $set: { is_verified: true } },
      {
        new: true,
        timestamps: true
      },
      // return updated document
    );
    return res.status(201).json({
      message: "OTP matched and user successfully verified",
    });

  }
  return res.status(401).json({
    message: "OTP incorrect error !",
  });

};

// Login user
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password }: IUser = req.body
    if (!email && !password) res.status(400).json({ message: "Provide name,email,password !!" })
    const isUserData = await UserModel.findOne({ email: email })
    if (isUserData) {
      // Generate authorization token
      const token = jwt.sign({ id: isUserData.id }, envConfigs._jwt.secretKey as string, {
        // expiration period : 7day 
        expiresIn: "7d"
      })
      return res.status(200).json({
        message: "user login successful !",
        data: {
          username: isUserData.name,
          token: token
        }
      })
    }
    return res.status(400).json({
      message: "User login invalid !"
    })


  } catch (error) {
    return res.status(500).json({
      message: 'Internal server login issue !'
    })
  }
}
// READ : All user
export const getAllUsers = async (req: Request, res: Response) => {
  const data = await UserModel.find()
  res.status(200).json({
    message: "All users fetched !",
    data
  })
}

// READ : Single user
export const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    console.log(id);

    const foundUser = await UserModel.findById(id)
    res.status(200).json({
      message: "User fetched !",
      foundUser
    })
  } catch {
    console.log("Single User Fetching Error");
    res.status(400).json({
      message: "Single User Fetching Error"
    })
  }
}


// Update user by ID
export const updateUser = async (req: IExtendedRequest, res: Response) => {
  try {
    const id = req.user?.id
    // Pick only allowed fields to update
    const { name, email, mobile_no, role } = req.body as Partial<IUser>;

    const updateData: Partial<IUser> = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (mobile_no) updateData.mobile_no = mobile_no;
    if (role) updateData.role = role;

    // Update user
    const updatedUser = await UserModel.findByIdAndUpdate(id, updateData, {
      new: true,        // return the updated document
      runValidators: true, // validate against schema
      timestamps: true
    });

    if (!updatedUser) {
      res.status(404).json({ message: "User not found" });
    } else {
      // Exclude password from response
      const { password, ...userData } = updatedUser.toObject();
      res.status(200).json({
        message: "User updated successfully!",
        user: userData
      });
    }
  } catch (err) {
    console.error("User Update Error:", err);
    res.status(400).json({
      message: "Error updating user",
      error: err
    });
  }
};



// DELETE : Delete user
export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    await UserModel.findByIdAndDelete(id)
    res.status(200).json({
      message: "User deleted !",
    })
  } catch {
    console.log("Single User Fetching Error");
    res.status(400).json({
      message: "User deleted unsuccessful !",
    })
  }
}




