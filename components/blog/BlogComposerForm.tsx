import { blogCategories } from "@/data/blogCategories";

type BlogComposerFormProps = {
  action: (formData: FormData) => Promise<void>;
  error?: string;
  message?: string;
  submitLabel?: string;
  initialValues?: {
    title?: string;
    slug?: string;
    category?: string;
    imageUrl?: string | null;
    content?: string;
    originalSlug?: string;
  };
};

const errorMessageMap: Record<string, string> = {
  "missing-fields": "Title and content are required.",
  "invalid-category": "Please choose a valid category.",
  "invalid-slug": "Please review the slug value.",
  "save-failed": "Saving failed. Check your permissions or duplicate slug.",
};

export function BlogComposerForm({
  action,
  error,
  message,
  submitLabel = "Save Post",
  initialValues,
}: BlogComposerFormProps) {
  return (
    <form action={action} className="space-y-6">
      {initialValues?.originalSlug ? (
        <input
          type="hidden"
          name="originalSlug"
          value={initialValues.originalSlug}
        />
      ) : null}
      <input
        type="hidden"
        name="currentImageUrl"
        value={initialValues?.imageUrl ?? ""}
      />

      <div className="grid gap-6 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm text-[var(--foreground-soft)]">Title</span>
          <input
            name="title"
            type="text"
            required
            defaultValue={initialValues?.title}
            className="w-full rounded-2xl border border-white/12 bg-white/6 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-[var(--color-primary-strong)]"
            placeholder="Enter the post title"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm text-[var(--foreground-soft)]">Slug</span>
          <input
            name="slug"
            type="text"
            defaultValue={initialValues?.slug}
            className="w-full rounded-2xl border border-white/12 bg-white/6 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-[var(--color-primary-strong)]"
            placeholder="e.g. healing-routine"
          />
        </label>
      </div>

      <label className="space-y-2">
        <span className="text-sm text-[var(--foreground-soft)]">Category</span>
        <select
          name="category"
          required
          defaultValue={initialValues?.category ?? blogCategories[0]?.slug}
          className="w-full rounded-2xl border border-white/12 bg-[#161626] px-4 py-3 text-sm text-white outline-none transition focus:border-[var(--color-primary-strong)]"
        >
          {blogCategories.map((category) => (
            <option key={category.slug} value={category.slug}>
              {category.label}
            </option>
          ))}
        </select>
      </label>

      {initialValues?.imageUrl ? (
        <div className="space-y-2">
          <span className="text-sm text-[var(--foreground-soft)]">
            Current image
          </span>
          <div className="overflow-hidden rounded-[24px] border border-white/10">
            <img
              src={initialValues.imageUrl}
              alt="Current post image"
              className="h-56 w-full object-cover"
            />
          </div>
        </div>
      ) : null}

      <label className="space-y-2">
        <span className="text-sm text-[var(--foreground-soft)]">
          Upload image
        </span>
        <input
          name="imageFile"
          type="file"
          accept="image/*"
          className="w-full rounded-2xl border border-white/12 bg-white/6 px-4 py-3 text-sm text-white file:mr-4 file:rounded-full file:border-0 file:bg-white/10 file:px-4 file:py-2 file:text-xs file:font-semibold file:uppercase file:tracking-[0.14em] file:text-[var(--foreground-soft)]"
        />
        <p className="text-xs leading-6 text-[var(--foreground-muted)]">
          Leave this empty to keep the current image.
        </p>
      </label>

      <label className="space-y-2">
        <span className="text-sm text-[var(--foreground-soft)]">Content</span>
        <textarea
          name="content"
          required
          rows={14}
          defaultValue={initialValues?.content}
          className="w-full rounded-[28px] border border-white/12 bg-white/6 px-4 py-4 text-sm leading-7 text-white outline-none transition placeholder:text-white/35 focus:border-[var(--color-primary-strong)]"
          placeholder="Use a blank line between paragraphs."
        />
      </label>

      {error ? (
        <div className="rounded-2xl border border-rose-300/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-100">
          {errorMessageMap[error] ?? "An unexpected error occurred."}
          {message ? (
            <p className="mt-2 break-words text-rose-50/90">{message}</p>
          ) : null}
        </div>
      ) : null}

      <button
        type="submit"
        className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/12 bg-[linear-gradient(135deg,rgba(147,131,235,0.92),rgba(112,96,204,0.9)_52%,rgba(77,62,152,0.92))] px-6 py-3 text-sm font-semibold tracking-[0.18em] text-[#fbf6f0] uppercase shadow-[0_20px_60px_rgba(88,69,173,0.36),inset_0_1px_0_rgba(255,255,255,0.18)] transition duration-300 hover:-translate-y-0.5"
      >
        {submitLabel}
      </button>
    </form>
  );
}
