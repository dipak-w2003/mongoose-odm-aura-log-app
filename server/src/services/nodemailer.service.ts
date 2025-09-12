// nodemailer
import nodemailer from "nodemailer";
import { envConfigs } from "../config/env-configs";

// Create a test account or replace with real credentials.
export interface IOTPSender {
  reciverGmail: string,
  receiverOTP: number | string
}
export interface IMail {
  to: string,
  subject: string,
  text: string,
  html?: string,
}

type nodeMailerStatus = "success" | "error"

export const nodeMailer = async (mailInformation: IMail): Promise<{ status: nodeMailerStatus }> => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.ethereal.email",
    port: Number(envConfigs?.port),
    secure: false,
    // true for 465, false for other ports
    // sender Authentications
    // provide app-password provided by gmail itself & don't use real email,password
    auth: {
      user: envConfigs.nodeMailer.gmail,
      pass: envConfigs.nodeMailer.appPassword,
    },
  });

  // Wrap in an async IIFE so we can use await.
  const mailFormatObject: IMail = {
    to: mailInformation.to,
    subject: mailInformation.subject,
    text: mailInformation.text,
    html: mailInformation.html
  }

  // try/catch mail sending
  try {
    console.log("receivedMailFormatData : ", mailFormatObject);
    await transporter.sendMail(mailFormatObject)
    return { status: "success" }
  } catch (error) {
    console.log("Mail Sending :: " + error);
    return { status: "error" }
  }

}