import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { name: string } }
) {
  const { name } = await params

  return new Response(`You requested item ${name}`);
}