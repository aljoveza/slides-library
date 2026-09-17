<template>
  <div class="deck-shell opening-shell">
    <ParticleWave />
    <div class="opening-prompt enter enter-1">PREGUNTA INICIAL</div>
    <div class="opening-question enter enter-2">“¿Cuánto tiempo usamos resolviendo incidentes y cuánto reconstruyendo lo que ya se sabía?”</div>
    <div class="opening-pause enter enter-3">PAUSA</div>
    <DeckFooter page="" />
  </div>
</template>

<style scoped>
.opening-prompt { position: absolute; top: 250px; left: 96px; z-index: 2; color: var(--cyan); font-family: var(--mono); font-size: 13px; font-weight: 700; letter-spacing: .28em; }
.opening-question { position: absolute; top: 306px; left: 96px; z-index: 2; max-width: 1080px; color: var(--white); font-size: 52px; font-weight: 300; letter-spacing: -.035em; line-height: 1.12; }
.opening-pause { position: absolute; left: 96px; bottom: 108px; z-index: 2; color: var(--faint); font-family: var(--mono); font-size: 11px; letter-spacing: .18em; }
</style>
