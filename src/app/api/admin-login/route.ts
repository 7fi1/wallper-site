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

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: NextRequest) {
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
          error: "Превышено количество попыток. Попробуйте завтра.",
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
    const PASSWORD_HASH = process.env.ADMIN_PASSWORD_CACHE!;

    const HASH_FUNC = (hash: string) => {
      bcrypt.hash(hash, 10).then((hash) => {
        console.log(hash);
      });
    };

    if (!PASSWORD_HASH) {
      return NextResponse.json(
        { success: false, error: "Пароль не настроен" },
        { status: 500 }
      );
    }
    HASH_FUNC(
      "v}bF7q2hjbp2T488xtGK8Uh2TDthrHUl8qqyYmdlvp1WRFuFL5I~$0qGnXKb7Z6xBHdqaEppvpGWd?060D7*tdQMun#@5muFdEt"
    );
    const isValid = await bcrypt.compare(password, PASSWORD_HASH);

    if (isValid) {
      const token = jwt.sign({ role: "admin" }, JWT_SECRET, {
        expiresIn: "1d",
      });

      const res = NextResponse.json({ success: true });

      res.cookies.set("admin_session", token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 60 * 60 * 24,
        path: "/",
      });

      return res;
    }
  } catch (error) {
    console.error("Error during password check:", error);
    return NextResponse.json(
      { success: false, error: "Ошибка сервера" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: false }, { status: 401 });
}
