import axios from "axios";
import type { IUserLog } from "../global/auth/login/user-login-slice.type";

// const BASE_URL = "http://localhost:4406/api";
const BASE_URL = "https://mongoose-odm-aura-log-app.onrender.com/api";

// Create a base axios instance (no auth)
export const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Retrieve user data safely
const userData = localStorage.getItem("userlogs");
let parsedUser: IUserLog | null = null;

if (userData) {
  try {
    parsedUser = JSON.parse(userData) as IUserLog;
  } catch {
    parsedUser = null;
  }
}

// Extract token either from `parsedUser` or directly from localStorage
const token = parsedUser?.token || localStorage.getItem("token");
console.log(token);

// Create axios instance with token if available
export const APIWITHTOKEN = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: token ? `${token}` : "",
    "Content-Type": "application/json",
  },
});
