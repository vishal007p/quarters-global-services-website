"use client";

import { setCookie, getCookie, deleteCookie } from "cookies-next";

export function saveSession({ id, token }: { id: string; token: string }) {
  // Store both token and userId
  setCookie("auth_token", token, {
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  setCookie("user_id", id, {
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
}

export function getSessionToken() {
  return getCookie("auth_token");
}

export function clearSession() {
  deleteCookie("auth_token");
  deleteCookie("user_id");
}
