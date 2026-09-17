<template>
  <div class="outcome-metrics">
    <div v-for="metric in metrics" :key="metric.name" v-click class="metric">
      <div class="metric-number">{{ metric.n }}</div>
      <h3>{{ metric.name }}</h3>
      <p>{{ metric.description }}</p>
    </div>
    <div v-click class="metric-note">SON MÉTRICAS DE ÉXITO DEL ENGAGEMENT, NO RESULTADOS PROMETIDOS.</div>
  </div>
</template>

<script setup lang="ts">
const metrics = [
  { n: '01', name: 'Resolución sin intervención', description: 'Casos resueltos por autoservicio o automatización aprobada.' },
  { n: '02', name: 'Tiempo a recuperación', description: 'Tiempo desde la detección hasta restaurar el servicio.' },
  { n: '03', name: 'Trabajo de investigación', description: 'Re-triage, evidencia recuperada y escalaciones evitables.' },
  { n: '04', name: 'Prevención de recurrencia', description: 'Incidentes repetidos y runbooks activados con éxito.' },
]
</script>

<style scoped>
.outcome-metrics { display:grid; grid-template-columns:repeat(4,1fr); grid-template-rows:1fr 62px; gap:16px; height:100%; }
.metric { padding:22px 23px; border:1px solid var(--line); background:var(--panel); display:flex; flex-direction:column; }
.metric:nth-child(2) { border-color:#2c4a52; }.metric:nth-child(3) { border-color:#3a2f6b; }
.metric-number { color:var(--faint); font-family:var(--mono); font-size:11px; letter-spacing:.12em; }
.metric h3 { margin-top:26px; color:var(--white); font-size:20px; font-weight:400; line-height:1.14; }
.metric p { margin-top:auto; color:var(--grey); font-size:13px; line-height:1.45; }
.metric-note { grid-column:1/-1; display:grid; place-items:center; border-left:2px solid var(--amber); background:var(--panel2); color:var(--amber); font-family:var(--mono); font-size:10.5px; letter-spacing:.12em; }
</style>
