import { z } from "zod";

// Schema cho trường name
export const usernameSchema = z
  .string()
  .min(1, { message: "Username is required" });

// Schema cho trường email
export const emailSchema = z
  .string()
  .email({ message: "Invalid email address" });

// Schema cho trường password
export const passwordSchema = z
  .string()
  .min(6, { message: "Password must be at least 6 characters" });
