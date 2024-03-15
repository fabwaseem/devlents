import { db } from "@/server/db";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        {
          msg: `Missing fields.`,
        },
        {
          status: 400,
        }
      );
    }

    const exist = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (exist) {
      const account = await db.account.findFirst({
        where: {
          userId: exist.id,
        },
      });

      if (account) {
        return NextResponse.json(
          {
            msg: `Email already linked to ${account.provider} account. Please login using ${account.provider}.`,
          },
          {
            status: 409,
          }
        );
      } else {
        return NextResponse.json(
          {
            msg: `Email already registered.`,
          },
          {
            status: 409,
          }
        );
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      {
        msg: `Registration successful.`,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        msg: `Something went wrong, please try again.`,
      },
      {
        status: 500,
      }
    );
  }
}
