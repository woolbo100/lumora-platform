# Lumora blog markdown guide

Create one `.md` file per post inside the matching category folder:

- `content/blog/romance-reunion`
- `content/blog/psychology-code`
- `content/blog/attraction-self-esteem`
- `content/blog/level-up-self-development`
- `content/blog/mind-study`

Use this format:

```md
---
title: 글 제목
slug: post-slug
category: romance-reunion
summary: 목록 카드에 보일 짧은 소개
metaDescription: SEO 설명
publishedAt: 2026-04-13
imageUrl: /images/blog/sample.jpg
imageAltText: 이미지 설명
status: published
---

첫 번째 문단입니다.

두 번째 문단입니다.
```

Only the blog pages read these files. The old Supabase blog editor is no longer the publishing source for `/blog`.
