import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET /api/skills — mengambil semua skill
export async function GET() {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: { category: "asc" },
    });
    return NextResponse.json(skills);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// POST /api/skills — menambah skill baru (admin)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, category, level } = body;

    if (!name || !category || level === undefined) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const skill = await prisma.skill.create({
      data: {
        name,
        category,
        level: Number(level),
      },
    });

    return NextResponse.json(skill, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}