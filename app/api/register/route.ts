import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

import db from "@/libs/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, name, password } = body;

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await db.user.create({
      data: {
        name,
        email,
        hashedPassword,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log("[ERROR_REGISTER_POST]: internal error");
    return new NextResponse("[ERROR_REGISTER_POST]: internal error", {
      status: 500,
    });
  }
}
