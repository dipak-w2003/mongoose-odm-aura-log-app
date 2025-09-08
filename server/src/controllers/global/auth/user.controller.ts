import { Request, Response } from "express";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { IUser, UserModel } from "../../../models/user.model";
import { envConfigs } from "../../../config/env-configs";
import { IExtendedRequest } from "../../../middlware/index.type";

//  CREATE : insert a user
export const createUser = async (req: Request, res: Response) => {
  const { name, email, password }: IUser = req.body
  if (!name && !email && !password) res.status(400).json({ message: "Provide name,email,password !!" })
  try {
    // Hash password with bcrypt
    const hashedPassword: string = bcrypt.hashSync(password, 12)
    const newUser = await UserModel.create({
      name, email, password: hashedPassword
    })
    await newUser.save()
    res.status(200).json({
      message: "user created !",
    })
  } catch {
    res.status(500).json({
      message: "user already exists !"
    })
  }
}

// login User
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
      runValidators: true // validate against schema
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




