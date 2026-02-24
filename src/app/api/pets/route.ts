import { NextResponse } from "next/server";
import { mockProvider } from "@/lib/adoption/mock";

export async function GET() {
  const result = await mockProvider.searchPets({});

  return NextResponse.json(result);
}
