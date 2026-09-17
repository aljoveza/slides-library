<template>
  <div class="operating-model">
    <div class="tiers">
      <div v-for="tier in tiers" :key="tier.name" v-click class="tier">
        <div class="tier-name">{{ tier.name }}</div>
        <div class="tier-owner">{{ tier.owner }}</div>
        <div class="tier-role">{{ tier.role }}</div>
      </div>
    </div>

    <div v-click class="risk-principle">LA AUTOMATIZACIÓN ES DETERMINÍSTICA; LA IA ASISTE O ACTÚA SÓLO DENTRO DEL RIESGO AUTORIZADO</div>
  </div>
</template>

<script setup lang="ts">
const tiers = [
  { name: 'T0 · AUTOMATIZACIÓN + IA', owner: 'Resolver escenarios conocidos con autoservicio y runbooks', role: 'Automatización determinística' },
  { name: 'T1 · HUMANO + IA', owner: 'Investigar, recomendar y ejecutar acciones gobernadas', role: 'Acciones autorizadas' },
  { name: 'T2 · ESPECIALISTA + IA', owner: 'Profundizar el diagnóstico y construir hipótesis', role: 'Especialista lidera' },
  { name: 'T3 · INGENIERÍA + IA', owner: 'Correlacionar contexto y preparar propuestas de remediación', role: 'Ingeniería lidera' },
]
</script>

<style scoped>
.operating-model {
  display: grid;
  grid-template-rows: 1fr 68px;
  gap: 30px;
  height: 100%;
}

.tiers {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.tier {
  display: flex;
  flex-direction: column;
  padding: 24px;
  background: var(--panel);
  border: 1px solid var(--line);
}

.tier-name {
  color: var(--cyan);
  font-family: var(--mono);
  font-size: 12px;
  letter-spacing: .14em;
}

.tier-owner {
  margin-top: 28px;
  color: var(--white);
  font-size: 21px;
  font-weight: 300;
}

.tier-role {
  margin-top: auto;
  color: var(--grey);
  font-size: 15px;
}

.risk-principle { display: grid; place-items: center; border-left: 2px solid var(--amber); color: var(--bone); background: var(--panel2); font-family: var(--mono); font-size: 11px; letter-spacing: .11em; text-align: center; }
</style>
