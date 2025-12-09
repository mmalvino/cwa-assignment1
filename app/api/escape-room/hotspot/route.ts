import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Get all hotspots for a room
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const roomId = url.searchParams.get("roomId");

    if (!roomId) {
      return NextResponse.json({ error: "Missing roomId" }, { status: 400 });
    }

    const hotspots = await prisma.hotspot.findMany({
      where: { roomId },
      orderBy: { id: "asc" },
    });

    return NextResponse.json(hotspots, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch hotspots" }, { status: 500 });
  }
}


// CREATE a new hotspot
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { question, answer, x, y, roomId } = body;

    if (!question || !answer || !roomId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newHotspot = await prisma.hotspot.create({
      data: { question, answer, x, y, roomId },
    });

    return NextResponse.json(newHotspot, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to create hotspot" }, { status: 500 });
  }
}
