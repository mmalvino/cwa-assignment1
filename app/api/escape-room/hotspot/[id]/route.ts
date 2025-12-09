import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";


// UPDATE a hotspot
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { question, answer, x, y } = body;

    const updated = await prisma.hotspot.update({
      where: { id },
      data: { question, answer, x, y },
    });

    return NextResponse.json(updated, { status: 200 });
  } catch (err: unknown) {
    console.error(err);

    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2025") {
      return NextResponse.json({ error: "Hotspot not found" }, { status: 404 });
    }

    return NextResponse.json({ error: "Failed to update hotspot" }, { status: 500 });
  }
}


// DELETE a hotspot
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.hotspot.delete({
      where: { id },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err: unknown) {
    console.error(err);

    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2025") {
      return NextResponse.json({ error: "Hotspot not found" }, { status: 404 });
    }

    return NextResponse.json({ error: "Failed to delete hotspot" }, { status: 500 });
  }
}
