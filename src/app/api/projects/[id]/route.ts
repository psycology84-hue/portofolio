import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const projectId = parseInt(id);
    const body = await request.json();
    const { title, description, image, githubUrl, techStack } = body;

    // Hapus semua relasi technology lama
    await prisma.projectTechnology.deleteMany({ where: { projectId } });

    const updated = await prisma.project.update({
      where: { id: projectId },
      data: {
        title,
        description,
        image,
        githubUrl,
        technologies: {
          create: techStack.map((techName: string) => ({
            technology: {
              connectOrCreate: {
                where: { name: techName },
                create: { name: techName },
              },
            },
          })),
        },
      },
      include: {
        technologies: {
          include: { technology: true },
        },
      },
    });

    return NextResponse.json({
      ...updated,
      techStack: updated.technologies.map((t) => t.technology.name),
      technologies: undefined,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Project not found or update failed" },
      { status: 400 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const projectId = parseInt(id);
    await prisma.project.delete({ where: { id: projectId } });
    return NextResponse.json({ message: "Project deleted" });
  } catch (error) {
    return NextResponse.json(
      { error: "Project not found or delete failed" },
      { status: 400 }
    );
  }
}