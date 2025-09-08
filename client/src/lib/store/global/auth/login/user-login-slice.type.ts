import type { Status } from "@/lib/global"

export interface IUserLogin {
  email: string,
  password: string
}
export interface IUserLog {
  username: string,
  token: string,
  id?: string
}


export interface IUserLogInititalState {
  user: IUserLog | null,
  status: Status
}


