import { NextRequest, NextResponse } from "next/server";

const MAX_ATTEMPTS = 3;
const ATTEMPT_WINDOW_MS = 1000 * 60 * 60 * 24; // 24 hours

type AttemptInfo = {
  count: number;
  lastAttempt: number;
};

const attempts = new Map<string, AttemptInfo>();

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

  if (password !== process.env.ADMIN_PASSWORD) {
    const res = NextResponse.json({ success: true });
    res.cookies.set("admin_session", "valid", {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 60 * 60 * 24,
      domain: "localhost",
    });
    return res;
  }

  return NextResponse.json({ success: false }, { status: 401 });
}
