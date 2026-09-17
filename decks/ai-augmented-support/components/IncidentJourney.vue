<template>
  <div class="incident">
    <div class="incident-labels enter enter-3"><span>SOPORTE ACTUAL</span><span>SOPORTE AUMENTADO CON IA</span></div>
    <div v-for="(stage, index) in stages" :key="stage.name" v-click class="incident-stage">
      <div class="stage-name">{{ stage.name }}</div>
      <div class="lane traditional-lane"><b>{{ stage.traditional.title }}</b><small>{{ stage.traditional.copy }}</small></div>
      <div class="lane augmented-lane"><b>{{ stage.augmented.title }}</b><small>{{ stage.augmented.copy }}</small></div>
      <div v-if="stage.context" class="context-growth"><span>CONTEXTO DE INVESTIGACIÓN</span><b>{{ stage.context }}</b></div>
    </div>
  </div>
</template>

<script setup lang="ts">
const stages = [
  { name: 'Contacto', traditional: { title: 'Cliente', copy: 'reporta el incidente' }, augmented: { title: 'Cliente', copy: 'reporta el incidente' }, context: '' },
  { name: 'T0', traditional: { title: 'T0', copy: 'clasifica el caso' }, augmented: { title: 'T0', copy: 'captura el contexto inicial' }, context: 'Intención · cliente · producto' },
  { name: 'T1', traditional: { title: 'T1', copy: 'vuelve a investigar' }, augmented: { title: 'T1', copy: 'amplía la investigación' }, context: 'Evidencia · acciones · resultados' },
  { name: 'T2', traditional: { title: 'T2', copy: 'busca evidencia' }, augmented: { title: 'T2', copy: 'correlaciona señales' }, context: 'Logs · métricas · despliegues' },
  { name: 'T3', traditional: { title: 'T3', copy: 'recibe un caso escalado' }, augmented: { title: 'T3', copy: 'recibe una investigación' }, context: 'Hipótesis · descartes · recomendación' },
  { name: 'Resolución', traditional: { title: 'Resolución', copy: 'cierre del caso' }, augmented: { title: 'Resolución', copy: 'cierre del caso' }, context: '' },
]
</script>

<style scoped>
.incident { display: grid; grid-template-rows: 30px repeat(6, 1fr); gap: 10px; height: 100%; }
.incident-labels { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; color: var(--faint); font-family: var(--mono); font-size: 11px; letter-spacing: .14em; }
.incident-labels span:last-child { color: var(--cyan); }
.incident-stage { display: grid; grid-template-columns: 120px 1fr 1fr 1.15fr; gap: 16px; align-items: center; }
.stage-name { color: var(--grey); font-family: var(--mono); font-size: 11px; letter-spacing: .08em; }
.lane { min-height: 50px; padding: 9px 14px; background: var(--panel); border: 1px solid var(--line); }
.lane b { display: inline; color: var(--white); font-size: 14px; font-weight: 600; }
.lane small { margin-left: 8px; color: var(--grey); font-size: 11px; }
.augmented-lane { border-color: #2c4a52; }
.augmented-lane small { color: var(--cyan); }
.context-growth { display: grid; grid-template-columns: 150px 1fr; align-items: center; min-height: 50px; padding: 9px 14px; border-left: 2px solid var(--cyan); background: #0a1417; }
.context-growth span { color: var(--cyan); font-family: var(--mono); font-size: 9px; letter-spacing: .08em; }
.context-growth b { color: var(--bone); font-size: 11px; font-weight: 400; }
</style>
