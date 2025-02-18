import { NextResponse } from "next/server";

export async function POST() {
    return NextResponse.json({ message: "Ping Up - Server Started" });
}
