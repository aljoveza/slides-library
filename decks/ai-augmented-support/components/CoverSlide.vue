<script setup lang="ts">
defineProps<{
  eyebrow: string
  lineOne: string
  lineTwo: string
  subtitle: string
  page: string
}>()
</script>

<template>
  <div class="deck-shell cover-shell">
    <ParticleWave />
    <div class="cover-mark">
      <div class="cover-eyebrow enter enter-1">{{ eyebrow }}</div>
      <div class="cover-name enter enter-2">{{ lineOne }}<br><b>{{ lineTwo }}</b></div>
      <div class="cover-subtitle enter enter-3">{{ subtitle }}</div>
      <slot />
    </div>
    <DeckFooter :page="page" />
  </div>
</template>
