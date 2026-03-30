import type { MetadataRoute } from "next";

const BASE_URL = "https://lumoracode.kr";

const routes: ReadonlyArray<{
  path: string;
  changeFrequency: NonNullable<
    MetadataRoute.Sitemap[number]["changeFrequency"]
  >;
  priority: number;
}> = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.8 },
  { path: "/tarot", changeFrequency: "monthly", priority: 0.8 },
  {
    path: "/attachment-code",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/relationship-pattern",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  { path: "/reunion-test", changeFrequency: "monthly", priority: 0.8 },
  { path: "/attraction-code", changeFrequency: "monthly", priority: 0.8 },
  {
    path: "/dream-interpretation",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  { path: "/emotion-code", changeFrequency: "monthly", priority: 0.8 },
  { path: "/birth-code", changeFrequency: "monthly", priority: 0.8 },
  { path: "/name-design", changeFrequency: "monthly", priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map(({ path, changeFrequency, priority }) => ({
    url: new URL(path, BASE_URL).toString(),
    lastModified,
    changeFrequency,
    priority,
  }));
}
