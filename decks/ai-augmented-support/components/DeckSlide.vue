<script setup lang="ts">
withDefaults(defineProps<{
  eyebrow: string
  title: string
  emphasis?: string
  kicker?: string
  page: string
  source?: string
  annex?: boolean
  bodyTop?: number
  bodyBottom?: number
}>(), {
  emphasis: '',
  kicker: '',
  source: '',
  annex: false,
  bodyTop: 322,
  bodyBottom: 130,
})
</script>

<template>
  <div class="deck-shell" :class="{ 'annex-shell': annex }">
    <div v-if="annex" class="annex-badge"><span>ANNEX</span><s>M · RETURN</s></div>
    <div class="deck-eyebrow enter enter-1">{{ eyebrow }}</div>
    <div class="deck-title enter enter-2">{{ title }} <b v-if="emphasis">{{ emphasis }}</b></div>
    <div class="deck-body" :style="{ top: `${bodyTop}px`, bottom: `${bodyBottom}px` }">
      <slot />
    </div>
    <div v-if="kicker" class="deck-kicker enter enter-7" v-html="kicker" />
    <DeckFooter :page="page" :source="source" :annex="annex" />
  </div>
</template>
