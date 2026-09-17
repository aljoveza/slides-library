<template>
  <div class="deck-shell closing-shell">
    <ParticleWave />
    <div class="closing-question enter enter-1">“¿Está listo tú esquema de soporte para pasar al siguiente nivel?”</div>
    <div class="closing-answer enter enter-2">
      <span>SIGUIENTE PASO</span>
      <strong>EVOLUCIONA LA EXPERIENCIA DE TUS CLIENTES CON IA EN EL CICLO DE SOPORTE</strong>
    </div>
    <div class="continuum enter enter-3">
      <div class="tiers"><span>T0</span><i></i><span>T1</span><i></i><span>T2</span><i></i><span>T3</span></div>
      <div class="context-line"><span>CONTEXTO · AUTOMATIZACIÓN · APRENDIZAJE OPERATIVO</span></div>
    </div>
    <div class="closing-copy enter enter-4">Discovery · Arquitectura de referencia · MVP demostrable</div>
    <DeckFooter page="10" />
  </div>
</template>

<style scoped>
.closing-question {
  position: absolute;
  top: 112px;
  left: 96px;
  z-index: 2;
  max-width: 1160px;
  color: var(--grey);
  font-size: 22px;
  font-weight: 300;
  line-height: 1.5;
}

.closing-answer {
  position: absolute;
  top: 255px;
  left: 96px;
  z-index: 2;
}

.closing-answer span {
  display: block;
  color: var(--cyan);
  font-family: var(--mono);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: .22em;
}

.closing-answer strong {
  display: block;
  margin-top: 18px;
  color: var(--white);
  max-width: 980px;
  font-size: 56px;
  font-weight: 300;
  letter-spacing: -.04em;
  line-height: .95;
}

.continuum {
  position: absolute;
  top: 490px;
  left: 96px;
  right: 96px;
  z-index: 2;
}

.tiers {
  display: grid;
  grid-template-columns: 70px 1fr 70px 1fr 70px 1fr 70px;
  align-items: center;
  color: var(--bone);
  font-family: var(--mono);
  font-size: 14px;
  text-align: center;
}

.tiers i {
  height: 1px;
  background: var(--line);
}

.context-line {
  position: relative;
  margin-top: 30px;
  height: 40px;
  border-top: 2px solid var(--cyan);
}

.context-line::after {
  position: absolute;
  top: -6px;
  right: 0;
  width: 10px;
  height: 10px;
  border-top: 2px solid var(--cyan);
  border-right: 2px solid var(--cyan);
  transform: rotate(45deg);
  content: '';
}

.context-line span {
  position: absolute;
  top: 12px;
  left: 50%;
  color: var(--cyan);
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: .14em;
  transform: translateX(-50%);
}

.closing-copy {
  position: absolute;
  left: 96px;
  bottom: 92px;
  z-index: 2;
  color: var(--white);
  font-size: 20px;
  font-weight: 400;
}
</style>
