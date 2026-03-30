import { readSupabasePublicConfig } from "@/lib/supabase";

function getBucketName() {
  return process.env.BLOG_IMAGES_BUCKET?.trim() || "blog-images";
}

function encodeStoragePath(path: string) {
  return path
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
}

function sanitizeFileName(fileName: string) {
  return fileName
    .toLowerCase()
    .replace(/[^a-z0-9.\-_]/g, "-")
    .replace(/-+/g, "-");
}

function buildPublicUrl(path: string) {
  const config = readSupabasePublicConfig();

  if (!config) {
    throw new Error("Missing Supabase public config.");
  }

  return `${config.url}/storage/v1/object/public/${getBucketName()}/${encodeStoragePath(path)}`;
}

function getStorageBaseUrl() {
  const config = readSupabasePublicConfig();

  if (!config) {
    throw new Error("Missing Supabase public config.");
  }

  return config;
}

export async function uploadBlogImage(file: File, authToken: string) {
  if (!file || file.size === 0) {
    return null;
  }

  if (!file.type.startsWith("image/")) {
    throw new Error("Only image files can be uploaded.");
  }

  const { url, publishableKey } = getStorageBaseUrl();
  const safeName = sanitizeFileName(file.name || "upload");
  const path = `posts/${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}-${safeName}`;

  const response = await fetch(
    `${url}/storage/v1/object/${getBucketName()}/${encodeStoragePath(path)}`,
    {
      method: "POST",
      cache: "no-store",
      headers: {
        apikey: publishableKey,
        Authorization: `Bearer ${authToken}`,
        "x-upsert": "false",
        "Content-Type": file.type || "application/octet-stream",
      },
      body: file,
    },
  );

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(
      `Storage upload failed (${response.status}): ${errorText || response.statusText}`,
    );
  }

  return buildPublicUrl(path);
}

export async function deleteBlogImageByUrl(
  imageUrl: string | null | undefined,
  authToken: string,
) {
  if (!imageUrl) {
    return;
  }

  const { url, publishableKey } = getStorageBaseUrl();
  const prefix = `${url}/storage/v1/object/public/${getBucketName()}/`;

  if (!imageUrl.startsWith(prefix)) {
    return;
  }

  const storagePath = imageUrl.slice(prefix.length);

  const response = await fetch(
    `${url}/storage/v1/object/${getBucketName()}/${storagePath}`,
    {
      method: "DELETE",
      cache: "no-store",
      headers: {
        apikey: publishableKey,
        Authorization: `Bearer ${authToken}`,
      },
    },
  );

  if (!response.ok && response.status !== 404) {
    const errorText = await response.text();

    throw new Error(
      `Storage delete failed (${response.status}): ${errorText || response.statusText}`,
    );
  }
}
