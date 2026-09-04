import config from "./config.js";
import { CookieOptions } from "express";
// Cookie max age: 7 days in milliseconds
// This is a deployment constant — not an environment variable
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

const cookieOptions: CookieOptions = {
    httpOnly: true,
    secure: config.NODE_ENV === "production",
    sameSite: config.NODE_ENV === "production" ? "none" : "lax",
    maxAge: SEVEN_DAYS_MS,
};

export default cookieOptions;
