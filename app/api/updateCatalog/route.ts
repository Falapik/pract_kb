import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const filePath = path.join(process.cwd(), "app/catalog/catalogData.json");

    console.log("Получены данные:", data);
    console.log("Путь к файлу:", filePath);

    if (!fs.existsSync(filePath)) {
      console.error("Файл не найден по указанному пути");
      return new Response(JSON.stringify({ error: "Файл не найден" }), {
        status: 404,
      });
    }
    try {
      fs.accessSync(filePath, fs.constants.W_OK);
    } catch (err) {
      console.error("Нет прав на запись в файл:", err);
      return new Response(JSON.stringify({ error: "Нет прав на запись" }), {
        status: 403,
      });
    }
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
    console.log("Файл успешно записан");
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Ошибка при записи файла:", error);
    return new Response(
      JSON.stringify({
        error: "Ошибка сервера",
        details: error instanceof Error ? error.message : String(error),
      }),
      { status: 500 }
    );
  }
}
