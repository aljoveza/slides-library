import { spawn } from 'node:child_process'
import { readdir, readFile, rm, mkdir, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const decksRoot = path.join(repositoryRoot, 'decks')
const outputRoot = path.join(repositoryRoot, 'dist')

const options = parseArguments(process.argv.slice(2))
const basePrefix = normalizePrefix(options.basePrefix ?? process.env.S3_PREFIX ?? 'slides')
const decks = await discoverDecks(options.deck)

if (decks.length === 0) {
  throw new Error('No Slidev decks found under decks/.')
}

if (!options.exportsOnly) {
  await rm(outputRoot, { recursive: true, force: true })
}
await mkdir(outputRoot, { recursive: true })

for (const deck of decks) {
  const deckOutput = path.join(outputRoot, deck.slug)
  await mkdir(deckOutput, { recursive: true })

  if (!options.exportsOnly) {
    const base = `/${[basePrefix, deck.slug].filter(Boolean).join('/')}/`
    console.log(`\nBuilding ${deck.slug} for ${base}`)
    await runSlidev(deck.directory, [
      'build',
      'slides.md',
      '--out', deckOutput,
      '--base', base,
    ])
  }

  if (!options.webOnly) {
    console.log(`\nExporting ${deck.slug} as PDF`)
    await runSlidev(deck.directory, [
      'export',
      'slides.md',
      '--format', 'pdf',
      '--output', path.join(deckOutput, `${deck.slug}.pdf`),
      '--with-clicks', 'false',
    ])

    console.log(`\nExporting ${deck.slug} as PPTX`)
    await runSlidev(deck.directory, [
      'export',
      'slides.md',
      '--format', 'pptx',
      '--output', path.join(deckOutput, `${deck.slug}.pptx`),
      '--with-clicks', 'false',
    ])
  }
}

await writeManifest(decks, basePrefix)
if (!options.exportsOnly) {
  await writeLibraryIndex(decks, basePrefix)
}

console.log(`\nArtifacts written to ${path.relative(repositoryRoot, outputRoot)}/`)

function parseArguments(args) {
  const parsed = {
    basePrefix: undefined,
    deck: undefined,
    exportsOnly: false,
    webOnly: false,
  }

  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index]

    if (argument === '--') {
      continue
    } else if (argument === '--web-only') {
      parsed.webOnly = true
    } else if (argument === '--exports-only') {
      parsed.exportsOnly = true
    } else if (argument === '--deck' || argument === '--base-prefix') {
      const value = args[index + 1]
      if (!value || value.startsWith('--')) {
        throw new Error(`${argument} requires a value.`)
      }
      parsed[argument === '--deck' ? 'deck' : 'basePrefix'] = value
      index += 1
    } else {
      throw new Error(`Unknown argument: ${argument}`)
    }
  }

  if (parsed.webOnly && parsed.exportsOnly) {
    throw new Error('--web-only and --exports-only cannot be used together.')
  }

  return parsed
}

function normalizePrefix(value) {
  const prefix = value.trim().replace(/^\/+|\/+$/g, '')
  if (prefix && !prefix.split('/').every(isSafePathSegment)) {
    throw new Error(`Invalid base prefix: ${value}`)
  }
  return prefix
}

function isSafePathSegment(value) {
  return /^[a-zA-Z0-9._~-]+$/.test(value) && value !== '.' && value !== '..'
}

async function discoverDecks(selectedDeck) {
  const entries = await readdir(decksRoot, { withFileTypes: true })
  const discovered = []

  for (const entry of entries) {
    if (!entry.isDirectory() || !isSafePathSegment(entry.name)) continue
    if (selectedDeck && entry.name !== selectedDeck) continue

    const directory = path.join(decksRoot, entry.name)
    const packagePath = path.join(directory, 'package.json')
    const slidesPath = path.join(directory, 'slides.md')
    if (!existsSync(packagePath) || !existsSync(slidesPath)) continue

    const packageJson = JSON.parse(await readFile(packagePath, 'utf8'))
    discovered.push({
      directory,
      packageName: packageJson.name,
      slug: entry.name,
    })
  }

  if (selectedDeck && discovered.length === 0) {
    throw new Error(`Deck not found: ${selectedDeck}`)
  }

  return discovered.sort((left, right) => left.slug.localeCompare(right.slug))
}

function runSlidev(directory, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(
      'pnpm',
      ['--dir', directory, 'exec', 'slidev', ...args],
      { cwd: repositoryRoot, stdio: 'inherit' },
    )

    child.on('error', reject)
    child.on('exit', (code, signal) => {
      if (code === 0) {
        resolve()
      } else {
        reject(new Error(`Slidev exited with ${signal ? `signal ${signal}` : `code ${code}`}.`))
      }
    })
  })
}

async function writeManifest(deckList, prefix) {
  const manifest = {
    generatedAt: new Date().toISOString(),
    prefix,
    decks: deckList.map((deck) => ({
      name: deck.packageName,
      slug: deck.slug,
      webpage: `${deck.slug}/`,
      pdf: `${deck.slug}/${deck.slug}.pdf`,
      pptx: `${deck.slug}/${deck.slug}.pptx`,
    })),
  }

  await writeFile(
    path.join(outputRoot, 'manifest.json'),
    `${JSON.stringify(manifest, null, 2)}\n`,
  )
}

async function writeLibraryIndex(deckList, prefix) {
  const links = deckList.map((deck) => `
        <li>
          <a class="deck" href="./${escapeHtml(deck.slug)}/">${escapeHtml(deck.slug)}</a>
          <span>
            <a href="./${escapeHtml(deck.slug)}/${escapeHtml(deck.slug)}.pdf">PDF</a>
            <a href="./${escapeHtml(deck.slug)}/${escapeHtml(deck.slug)}.pptx">PPTX</a>
          </span>
        </li>`).join('')

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Slides library</title>
    <style>
      :root { color-scheme: light dark; font-family: Inter, ui-sans-serif, system-ui, sans-serif; }
      body { max-width: 48rem; margin: 0 auto; padding: 4rem 1.5rem; line-height: 1.5; }
      h1 { font-size: clamp(2rem, 7vw, 4rem); margin-bottom: .5rem; }
      p { color: #718096; margin-bottom: 3rem; }
      ul { list-style: none; padding: 0; border-top: 1px solid #a0aec0; }
      li { display: flex; justify-content: space-between; gap: 2rem; padding: 1.25rem 0; border-bottom: 1px solid #a0aec0; }
      a { color: #6366f1; text-underline-offset: .2em; }
      .deck { color: inherit; font-size: 1.2rem; font-weight: 700; }
      span { display: flex; gap: 1rem; }
    </style>
  </head>
  <body>
    <h1>Slides library</h1>
    <p>Web presentations and downloadable exports under /${escapeHtml(prefix)}/.</p>
    <ul>${links}
    </ul>
  </body>
</html>
`

  await writeFile(path.join(outputRoot, 'index.html'), html)
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}
