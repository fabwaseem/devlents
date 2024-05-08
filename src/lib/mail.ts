import { env } from "@/env.js";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: Number(env.SMTP_PORT),
  secure: true,
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
  },
});

export const sendVerificationEmail = async ({
  email,
  token,
}: {
  email: string;
  token: string;
}) => {
  const confirmationUrl = `${env.BASE_URL}/verify-email?token=${token}`;
  const html = `
    <h1>Verify your email address</h1>
    <p>Click the button below to verify your email address:</p>
    <a href="${confirmationUrl}" style="display: inline-block; padding: 10px 20px; background-color: #333; color: white; text-decoration: none;">Verify Email</a>
    <p>Or copy this link and paste it into your browser:</p>
    <a href="${confirmationUrl}">${confirmationUrl}</a>`;

  const options = {
    from: env.SMTP_USER,
    to: email,
    subject: "Verify your email address",
    html,
  };

  return await transporter.sendMail(options);
};

export const sendPasswordResetEmail = async ({
  email,
  token,
}: {
  email: string;
  token: string;
}) => {
  const resetUrl = `${env.BASE_URL}/reset-password?token=${token}`;
  const html = `
    <h1>Reset your password</h1>
    <p>Click the button below to reset your password:</p>
    <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; background-color: #333; color: white; text-decoration: none;">Reset Password</a>
    <p>Or copy this link and paste it into your browser:</p>
    <a href="${resetUrl}">${resetUrl}</a>`;

  const options = {
    from: env.SMTP_USER,
    to: email,
    subject: "Reset your password",
    html,
  };

  return await transporter.sendMail(options);
};

export const sendPasswordUpdatedEmail = async ({
  email,
}: {
  email: string;
}) => {
  const html = `
    <h1>Your password has been updated</h1>
    <p>Your password has been updated successfully. If you did not make this change, please contact support immediately.</p>`;

  const options = {
    from: env.SMTP_USER,
    to: email,
    subject: "Password updated",
    html,
  };

  return await transporter.sendMail(options);
};
