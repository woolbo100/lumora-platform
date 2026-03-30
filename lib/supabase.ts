type SupabaseConfig = {
  url: string;
  apiKey: string;
};

type SupabasePublicConfig = {
  url: string;
  publishableKey: string;
};

function readSupabaseConfig(): SupabaseConfig | null {
  const url = process.env.SUPABASE_URL;
  const apiKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.SUPABASE_PUBLISHABLE_KEY;

  if (!url || !apiKey) {
    return null;
  }

  return { url, apiKey };
}

export function readSupabasePublicConfig(): SupabasePublicConfig | null {
  const url = process.env.SUPABASE_URL;
  const publishableKey = process.env.SUPABASE_PUBLISHABLE_KEY;

  if (!url || !publishableKey) {
    return null;
  }

  return { url, publishableKey };
}

export function hasSupabaseConfig() {
  return readSupabaseConfig() !== null;
}

export async function supabaseRestRequest(
  path: string,
  init: RequestInit = {},
  authToken?: string,
) {
  const config = readSupabaseConfig();

  if (!config) {
    throw new Error(
      "Supabase 환경변수가 설정되지 않았습니다. SUPABASE_URL과 SUPABASE_SERVICE_ROLE_KEY 또는 SUPABASE_PUBLISHABLE_KEY를 확인해주세요.",
    );
  }

  const response = await fetch(`${config.url}/rest/v1/${path}`, {
    ...init,
    cache: "no-store",
    headers: {
      apikey: config.apiKey,
      Authorization: `Bearer ${authToken ?? config.apiKey}`,
      "Content-Type": "application/json",
      ...init.headers,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(
      `Supabase 요청 실패 (${response.status}): ${errorText || response.statusText}`,
    );
  }

  return response;
}
