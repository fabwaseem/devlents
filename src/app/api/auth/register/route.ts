import { db } from "@/server/db";
import bcrypt from "bcryptjs";
import { type NextRequest, NextResponse } from "next/server";

interface Body {
  name: string;
  email: string;
  username: string;
  password: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: Body = await request.json() as Body;
    const { name, email,username, password } = body;

    if (!name || !email || !password || !username) {
      return NextResponse.json(
        {
          msg: `Missing fields.`,
        },
        {
          status: 400,
        },
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
          },
        );
      } else {
        return NextResponse.json(
          {
            msg: `Email already registered.`,
          },
          {
            status: 409,
          },
        );
      }
    }

    const usernameTaken = await db.user.findUnique({
      where: {
        username,
      },
    });

    if (usernameTaken) {
      return NextResponse.json(
        {
          msg: `Username bust be unique.`,
        },
        {
          status: 409,
        },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

     await db.user.create({
      data: {
        name,
         email,
        username,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      {
        msg: `Registration successful.`,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    return NextResponse.json(
      {
        msg: `Something went wrong, please try again.`,
      },
      {
        status: 500,
      },
    );
  }
}
