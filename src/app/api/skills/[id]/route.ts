import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const skillId = parseInt(id);
    await prisma.skill.delete({ where: { id: skillId } });
    return NextResponse.json({ message: "Skill deleted" });
  } catch (error) {
    return NextResponse.json(
      { error: "Skill not found or internal error" },
      { status: 404 }
    );
  }
}