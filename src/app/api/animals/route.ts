import "server-only";
import { NextResponse } from "next/server";
import { getAnimals } from "@/lib/data/animal.service";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);

    const postal = url.searchParams.get("postal") ?? undefined;
    const species = url.searchParams.get("species") ?? undefined;

    const limitRaw = url.searchParams.get("limit");
    const limit = limitRaw ? Number.parseInt(limitRaw, 10) : undefined;

    const fresh = url.searchParams.get("fresh") === "1";
    const result = await getAnimals({ postal, species, limit, fresh });

    return NextResponse.json(
      {
        ok: true,
        count: result.animals.length,
        animals: result.animals,
        source: result.source,
        meta: result.meta,
      },
      { status: 200 },
    );
  } catch (err) {
    console.error("[GET /api/animals] Error:", err);

    const message =
      err instanceof Error ? err.message : "Unknown error calling animals API";

    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
