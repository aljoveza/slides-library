.DEFAULT_GOAL := help

PNPM ?= npx --yes pnpm@12.4.2
DECK ?= ai-augmented-support
BASE_PREFIX ?= slides

DECKS := $(sort $(patsubst decks/%/slides.md,%,$(wildcard decks/*/slides.md)))
DECK_BUILD_TARGETS := $(addprefix build-,$(DECKS))
DECK_WEB_TARGETS := $(addprefix web-,$(DECKS))
DECK_EXPORT_TARGETS := $(addprefix export-,$(DECKS))

.PHONY: help install list dev build build-deck web web-deck export export-deck clean
.PHONY: $(DECKS) $(DECK_BUILD_TARGETS) $(DECK_WEB_TARGETS) $(DECK_EXPORT_TARGETS)

help: ## Show the available commands
	@printf '%s\n' \
		'Slides library' \
		'' \
		'  make install                         Install the pinned dependencies' \
		'  make list                            List available decks' \
		'  make dev                             Run DECK in development mode' \
		'  make <deck-folder>                   Run that deck in development mode' \
		'  make build-<deck-folder>             Build web, PDF, and PPTX for that deck' \
		'  make web-<deck-folder>               Build only the website for that deck' \
		'  make export-<deck-folder>            Export PDF and PPTX for that deck' \
		'  make build                           Build web, PDF, and PPTX for every deck' \
		'  make build-deck                      Build web, PDF, and PPTX for DECK' \
		'  make web                             Build only the websites for every deck' \
		'  make web-deck                        Build only the website for DECK' \
		'  make export                          Export PDF and PPTX for every deck' \
		'  make export-deck                     Export PDF and PPTX for DECK' \
		'  make clean                           Remove generated artifacts' \
		'' \
		'Available deck folders:' \
		'  $(DECKS)' \
		'' \
		'Variables:' \
		'  DECK=ai-augmented-support            Deck selected by dev/*-deck targets' \
		'  BASE_PREFIX=slides                   URL prefix used by web builds' \
		'  PNPM="npx --yes pnpm@12.4.2"         pnpm command'

install: ## Install dependencies from the lockfile
	$(PNPM) install --frozen-lockfile

list: ## List available deck folders
	@ls -1 decks

dev: ## Start the selected deck in development mode
	@test -f "decks/$(DECK)/slides.md" || { printf 'Deck not found: %s\n' "$(DECK)" >&2; exit 1; }
	$(PNPM) --dir "decks/$(DECK)" dev

$(DECKS): ## Start a deck by using its folder name as the target
	$(MAKE) dev DECK=$@

$(DECK_BUILD_TARGETS): ## Build all artifacts for a deck-folder target
	$(MAKE) build-deck DECK=$(patsubst build-%,%,$@)

$(DECK_WEB_TARGETS): ## Build the website for a deck-folder target
	$(MAKE) web-deck DECK=$(patsubst web-%,%,$@)

$(DECK_EXPORT_TARGETS): ## Export PDF and PPTX for a deck-folder target
	$(MAKE) export-deck DECK=$(patsubst export-%,%,$@)

build: ## Build all artifacts for every deck
	$(PNPM) build -- --base-prefix "$(BASE_PREFIX)"

build-deck: ## Build all artifacts for the selected deck
	$(PNPM) build -- --deck "$(DECK)" --base-prefix "$(BASE_PREFIX)"

web: ## Build websites for every deck
	$(PNPM) build:web -- --base-prefix "$(BASE_PREFIX)"

web-deck: ## Build the website for the selected deck
	$(PNPM) build:web -- --deck "$(DECK)" --base-prefix "$(BASE_PREFIX)"

export: ## Export PDF and PPTX for every deck
	$(PNPM) export

export-deck: ## Export PDF and PPTX for the selected deck
	$(PNPM) export -- --deck "$(DECK)"

clean: ## Remove generated artifacts
	node -e "require('node:fs').rmSync('dist', { recursive: true, force: true })"
