import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const MAX_ATTEMPTS = 3;
const ATTEMPT_WINDOW_MS = 1000 * 60 * 60 * 24;

type AttemptInfo = {
  count: number;
  lastAttempt: number;
};

const attempts = new Map<string, AttemptInfo>();

const JWT_SECRET = process.env.JWT_SECRET;
const PASSWORD_HASH = process.env.ADMIN_PASSWORD_CACHE;

export async function POST(req: NextRequest) {
  if (!JWT_SECRET || !PASSWORD_HASH) {
    console.error("Missing environment variables");
    return NextResponse.json(
      { success: false, error: "Сервер не настроен должным образом" },
      { status: 500 }
    );
  }

  const { password } = await req.json();
  const ip = req.headers.get("x-forwarded-for") || "unknown";

  const now = Date.now();
  const attempt = attempts.get(ip);

  if (attempt) {
    const sinceLast = now - attempt.lastAttempt;
    if (sinceLast > ATTEMPT_WINDOW_MS) {
      attempts.set(ip, { count: 1, lastAttempt: now });
    } else if (attempt.count >= MAX_ATTEMPTS) {
      return NextResponse.json(
        {
          success: false,
          error: "Превышено количество попыток.",
        },
        { status: 429 }
      );
    } else {
      attempts.set(ip, { count: attempt.count + 1, lastAttempt: now });
    }
  } else {
    attempts.set(ip, { count: 1, lastAttempt: now });
  }

  try {
    const isValid = await bcrypt.compare(password, PASSWORD_HASH);

    if (!isValid) {
      return NextResponse.json({ success: false }, { status: 401 });
    }

    const token = jwt.sign({ role: "admin" }, JWT_SECRET, {
      expiresIn: "1d",
    });

    const res = NextResponse.json({ success: true });

    res.cookies.set("admin_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // true только в проде
      sameSite: "strict",
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    return res;
  } catch (error) {
    console.error("Ошибка при проверке пароля:", error);
    return NextResponse.json(
      { success: false, error: "Ошибка сервера" },
      { status: 500 }
    );
  }
}
