import { cookies } from "next/headers";

export const LANGUAGE_COOKIE = "lumora_lang";

export async function getServerLanguage() {
  const cookieStore = await cookies();
  const lang = cookieStore.get(LANGUAGE_COOKIE)?.value;
  return lang === "en" ? "en" : "ko";
}
