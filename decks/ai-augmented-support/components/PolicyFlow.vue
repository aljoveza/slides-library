<template>
  <div class="policy-layout">
    <div class="flow enter enter-3">
      <div class="flow-node">Agente o runbook</div>
      <div class="flow-link">Solicitud de acción</div>
      <div class="flow-node policy">Política + IAM</div>
      <div class="flow-link">Capacidad permitida</div>
      <div class="flow-node">Decisión de riesgo</div>
      <div class="outcomes"><span>Ejecutar</span><span>Aprobar</span><span>Rechazar</span></div>
    </div>

    <table class="deck-table enter enter-4">
      <thead><tr><th>Riesgo</th><th>Ejemplo</th><th class="right">Autoridad de la IA</th></tr></thead>
      <tbody>
        <tr><td class="tag-cell">R0</td><td class="value-cell">Consultar logs o salud</td><td class="tag-cell right">Autónoma</td></tr>
        <tr><td class="tag-cell">R1</td><td class="value-cell">Ejecutar runbook validado</td><td class="tag-cell right">Automática si está permitida</td></tr>
        <tr class="highlight"><td class="tag-cell">R2</td><td class="value-cell white">Cambio operativo en producción</td><td class="tag-cell right violet">Aprobación humana</td></tr>
        <tr class="highlight"><td class="tag-cell">R3</td><td class="value-cell white">Código o datos críticos</td><td class="tag-cell right violet">Ejecución humana</td></tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.policy-layout {
  display: grid;
  grid-template-columns: 340px 1fr;
  gap: 52px;
  height: 100%;
}

.policy-layout::after { content: 'POLÍTICA, IAM Y APROBACIÓN DEFINEN QUÉ PUEDE EJECUTAR CADA CAPACIDAD'; grid-column: 2; margin-top: -22px; color: var(--amber); font-family: var(--mono); font-size: 10px; letter-spacing: .12em; }

.flow {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.flow-node {
  padding: 15px 18px;
  color: var(--white);
  background: var(--panel);
  border: 1px solid var(--line);
  font-size: 15px;
  font-weight: 600;
  text-align: center;
}

.flow-node.policy {
  color: var(--violet);
  border-color: #3a2f6b;
}

.flow-link {
  position: relative;
  height: 42px;
  padding-top: 14px;
  color: var(--cyan);
  font-family: var(--mono);
  font-size: 9.5px;
  text-align: right;
}

.flow-link::before {
  position: absolute;
  top: 0;
  left: 50%;
  width: 1px;
  height: 42px;
  background: var(--cyan);
  content: '';
}

.outcomes {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-top: 18px;
}

.outcomes span {
  padding: 10px 4px;
  color: var(--grey);
  background: var(--panel2);
  border: 1px solid var(--line);
  font-family: var(--mono);
  font-size: 9.5px;
  text-align: center;
}
</style>
