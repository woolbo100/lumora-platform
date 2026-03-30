"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { isBlogCategory } from "@/data/blogCategories";
import { getAdminSession } from "@/lib/admin-auth";
import {
  createBlogPost,
  deleteBlogPost,
  getBlogPostBySlug,
  updateBlogPost,
} from "@/lib/blog-posts";
import { deleteBlogImageByUrl, uploadBlogImage } from "@/lib/blog-storage";

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^\p{Letter}\p{Number}\s-]/gu, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function readImageFile(formData: FormData) {
  const value = formData.get("imageFile");

  if (!(value instanceof File) || value.size === 0) {
    return null;
  }

  return value;
}

export async function createBlogPostAction(formData: FormData) {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login?error=login-required");
  }

  const title = String(formData.get("title") ?? "").trim();
  const rawSlug = String(formData.get("slug") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const imageFile = readImageFile(formData);

  if (!title || !content) {
    redirect("/blog/write?error=missing-fields");
  }

  if (!isBlogCategory(category)) {
    redirect("/blog/write?error=invalid-category");
  }

  const slug = slugify(rawSlug || title);

  if (!slug) {
    redirect("/blog/write?error=invalid-slug");
  }

  let postSlug: string;

  try {
    const uploadedImageUrl = imageFile
      ? await uploadBlogImage(imageFile, session.accessToken)
      : null;

    const post = await createBlogPost(
      {
        title,
        slug,
        category,
        content,
        imageUrl: uploadedImageUrl ?? undefined,
      },
      session.accessToken,
    );
    postSlug = post.slug;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown save error";

    redirect(
      `/blog/write?error=save-failed&message=${encodeURIComponent(message.slice(0, 500))}`,
    );
  }

  revalidatePath("/blog");
  revalidatePath(`/blog/${postSlug}`);
  redirect(`/blog/${postSlug}?created=1`);
}

export async function updateBlogPostAction(formData: FormData) {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login?error=login-required");
  }

  const originalSlug = String(formData.get("originalSlug") ?? "").trim();
  const currentImageUrl = String(formData.get("currentImageUrl") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const rawSlug = String(formData.get("slug") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const imageFile = readImageFile(formData);

  if (!originalSlug) {
    redirect("/blog?error=missing-slug");
  }

  if (!title || !content) {
    redirect(`/blog/${originalSlug}/edit?error=missing-fields`);
  }

  if (!isBlogCategory(category)) {
    redirect(`/blog/${originalSlug}/edit?error=invalid-category`);
  }

  const slug = slugify(rawSlug || title);

  if (!slug) {
    redirect(`/blog/${originalSlug}/edit?error=invalid-slug`);
  }

  let updatedSlug: string;

  try {
    const uploadedImageUrl = imageFile
      ? await uploadBlogImage(imageFile, session.accessToken)
      : currentImageUrl || null;

    const post = await updateBlogPost(
      originalSlug,
      {
        title,
        slug,
        category,
        content,
        imageUrl: uploadedImageUrl ?? undefined,
      },
      session.accessToken,
    );
    updatedSlug = post.slug;

    if (imageFile && currentImageUrl && currentImageUrl !== uploadedImageUrl) {
      await deleteBlogImageByUrl(currentImageUrl, session.accessToken);
    }
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown update error";

    redirect(
      `/blog/${originalSlug}/edit?error=save-failed&message=${encodeURIComponent(message.slice(0, 500))}`,
    );
  }

  revalidatePath("/blog");
  revalidatePath(`/blog/${originalSlug}`);
  revalidatePath(`/blog/${updatedSlug}`);
  redirect(`/blog/${updatedSlug}?updated=1`);
}

export async function deleteBlogPostAction(formData: FormData) {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login?error=login-required");
  }

  const slug = String(formData.get("slug") ?? "").trim();

  if (!slug) {
    redirect("/blog?error=missing-slug");
  }

  try {
    const post = await getBlogPostBySlug(slug);

    await deleteBlogPost(slug, session.accessToken);

    if (post?.imageUrl) {
      await deleteBlogImageByUrl(post.imageUrl, session.accessToken);
    }
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown delete error";

    redirect(
      `/blog/${slug}?error=delete-failed&message=${encodeURIComponent(message.slice(0, 500))}`,
    );
  }

  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  redirect("/blog?deleted=1");
}
