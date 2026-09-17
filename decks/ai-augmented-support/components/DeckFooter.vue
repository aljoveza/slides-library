<script setup lang="ts">
import epamLogo from '../assets/brand/EPAM_logo_white.svg?inline'

defineProps<{
  page: string
  source?: string
  annex?: boolean
}>()
</script>

<template>
  <div class="deck-foot">
    <img class="deck-brand" :src="epamLogo" alt="EPAM Systems" decoding="sync" loading="eager">
    <span class="deck-source">{{ source || '' }}</span>
    <span class="deck-conf">Confidential.<b :class="{ annex }">{{ page }}</b></span>
  </div>
</template>
