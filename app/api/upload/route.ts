import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  const data = await request.formData();
  const file: File | null = data.get("file") as unknown as File;
  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const timestamp = Date.now();
  const ext = path.extname(file.name);
  const filename = `${timestamp}${ext}`;
  const filePath = path.join(process.cwd(), "public", "uploads", filename);
  try {
    await writeFile(filePath, buffer);
    return NextResponse.json({ filePath: `/uploads/${filename}` });
  } catch (error) {
    return NextResponse.json({ error: "Error saving file" }, { status: 500 });
  }
}
