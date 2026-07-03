import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET /api/projects
export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      include: {
        technologies: {
          include: {
            technology: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    // Tambahkan tipe eksplisit pada parameter callback
    const formatted = projects.map((project: any) => ({
      ...project,
      techStack: project.technologies.map((t: any) => t.technology.name),
      technologies: undefined,
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// POST /api/projects
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, image, githubUrl, techStack } = body;

    const user = await prisma.user.findFirst();
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    const project = await prisma.project.create({
      data: {
        title,
        description,
        image,
        githubUrl,
        userId: user.id,
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

    return NextResponse.json(
      {
        ...project,
        techStack: project.technologies.map((t: any) => t.technology.name),
        technologies: undefined,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}