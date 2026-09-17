---
theme: default
title: Slides library starter
info: |
  Example presentation for the slides library.
author: Your Name
---

# Slides library starter

A clean starting point for a new Slidev presentation

---
layout: center
---

## One folder per presentation

Each deck keeps its content, assets, components, and local styles together.

Shared styles live in `shared/styles` and can be imported by any deck.

---

# Local workflow

```bash
pnpm dev:example
pnpm build -- --deck example
```

The build produces a static site, a PDF, and a PowerPoint file.
