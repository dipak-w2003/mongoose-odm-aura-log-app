import type { Status } from "@/lib/global"

export interface IUserRegister {
  name: string,
  email: string,
  password: string
  confirmPassword: string
  /**@TOKEN -> email verification token idea hold for now */
  // token?: string | number
}

export interface initialIRegisterUserState {
  user: IUserRegister | null,
  status: Status
} 