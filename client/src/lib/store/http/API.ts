import axios from "axios"
export const API = axios.create({
  baseURL: "http://localhost:4406/api",
  headers: {
    Authorization: "",
    "Content-Type": "application/json"
  }
})

export const APIWITHTOKEN = axios.create({
  baseURL: "http://localhost:4406/api",
  headers: {
    Authorization: typeof window !== "undefined" ? localStorage.getItem("token") : "",
    "Content-Type": "application/json"
  }
})