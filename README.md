# Slides library

A pnpm workspace for independent [Slidev](https://sli.dev/) presentations. Each folder in `decks/` is its own project and publishes three artifacts:

- a static web presentation
- a PDF export
- a PowerPoint export

## Requirements

- Node.js 22.12 or newer
- pnpm 12.4.2

Enable pnpm through Corepack, then install the workspace:

```bash
corepack enable
corepack install
pnpm install
```

If Corepack is not available in your Node.js installation, install the pinned pnpm version with `npm install --global pnpm@12.4.2`.

## Repository layout

```text
decks/
  ai-augmented-support/
    components/    # Reusable components for this visual system
    layouts/       # Shared page framing and footer behavior
    setup/         # Deck-specific keyboard shortcuts
    styles/        # Exact palette, grid, and typography rules
    slides.md      # Editable presentation content and notes
  example/
    public/        # Images and other deck-specific static assets
    styles/        # Deck-specific styles and shared-style imports
    package.json   # Independent project scripts and dependencies
    slides.md      # Slidev entry point
shared/
  styles/          # Reusable styles for every deck
scripts/
  build-artifacts.mjs
dist/              # Generated web, PDF, and PPTX artifacts
```

## Work on a deck

Run the example deck from the repository root:

```bash
pnpm dev:example
```

Run the AI-Augmented Support deck:

```bash
pnpm dev:ai-support
```

Its editable content lives in `decks/ai-augmented-support/slides.md`. The
page-level building blocks live in that deck's `components/` folder, while
`speaker-guide.md` and `preflight.md` contain the delivery script and the
claims to confirm before presenting.

You can also run scripts from inside a deck:

```bash
cd decks/example
pnpm dev
```

## Add a deck

Copy `decks/example` to a kebab-case folder name, then update its package name and slide content:

```bash
cp -R decks/example decks/my-talk
```

Use a unique package name such as `@slides/my-talk`. Keep the `styles/index.ts` import if the deck should inherit the shared theme.

The root artifact script discovers every immediate child of `decks/` that contains both `package.json` and `slides.md`; no central deck list needs updating.

## Build and export

The repository includes a `Makefile` for the common workflows:

```bash
# Start the AI-Augmented Support deck
make ai-augmented-support

# Start any deck using its folder name
make example

# Build web, PDF, and PPTX for one deck
make build-ai-augmented-support

# Build only its website, or only its PDF and PPTX exports
make web-ai-augmented-support
make export-ai-augmented-support

# Select another deck or deployment prefix
make build-deck DECK=example BASE_PREFIX=presentations

# Show every available command
make help
```

The equivalent pnpm commands remain available:

```bash
# Build every web presentation and export PDF and PPTX files
pnpm build

# Build only the static websites
pnpm build:web

# Export only PDF and PPTX files
pnpm export

# Build one deck
pnpm build -- --deck example

# Build the AI-Augmented Support deck
pnpm build -- --deck ai-augmented-support
```

Generated files use this structure:

```text
dist/
  index.html
  manifest.json
  example/
    index.html
    example.pdf
    example.pptx
    assets/
```

Set the deployed URL prefix with `--base-prefix` or `S3_PREFIX`. The default prefix is `slides`:

```bash
pnpm build -- --base-prefix presentations
```

Slidev's standard PPTX export renders each slide as an image. This keeps browser styling intact, but the slide text is not editable in PowerPoint.

## Publish to S3

The GitHub Actions workflow at `.github/workflows/publish.yml` runs for pushes to `main` and can also be started manually. It publishes the complete `dist/` directory to:

```text
s3://<S3_BUCKET>/<S3_PREFIX>/
```

Add these GitHub Actions secrets:

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `S3_BUCKET`

Add these optional GitHub Actions repository variables:

- `AWS_REGION`, defaults to `us-east-1`
- `S3_PREFIX`, defaults to `slides`

The AWS identity needs permission to list the bucket and to read, write, and delete objects below the selected prefix. The workflow uses `aws s3 sync --delete`, scoped to that prefix, so reserve it for this repository.

S3 stores the files but does not make them public automatically. Use S3 static website hosting or CloudFront if the presentations should be available on the web. With the default prefix, the example deck is served from `/slides/example/` and the library index from `/slides/`.

## Useful references

- [Slidev documentation](https://sli.dev/)
- [Slidev export guide](https://sli.dev/guide/exporting)
- [Slidev hosting guide](https://sli.dev/guide/hosting)
