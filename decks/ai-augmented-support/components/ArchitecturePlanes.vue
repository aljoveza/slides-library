<template>
  <div class="architecture">
    <div class="planes">
      <div class="plane support enter enter-3">
        <div class="plane-label">01 · EXPERIENCIA DE SOPORTE</div>
        <h3>Amazon Connect</h3>
        <div class="services">
          <span>Interacción</span><span>AI Agents</span><span>Enrutamiento</span>
          <span>Connect Cases</span><span>Tareas</span><span>Workspace</span>
        </div>
        <p>Interacción con el cliente, autoservicio y continuidad del journey.</p>
      </div>

      <div class="bridge enter enter-4">
        <span>Casos</span><span>Eventos</span><span>Contexto</span>
      </div>

      <div class="plane agentic enter enter-5">
        <div class="plane-label">02 · INVESTIGACIÓN GOBERNADA</div>
        <h3>Amazon Bedrock AgentCore</h3>
        <div class="services">
          <span>Investigación</span><span>Remediación</span><span>Ingeniería</span><span>Gateway</span>
          <span>Política</span><span>Identidad</span><span>Observabilidad</span>
        </div>
        <p>Agentes especializados, acceso gobernado y trazabilidad técnica.</p>
      </div>
    </div>

    <div class="tooling enter enter-6">
      <div><b>OBSERVABILIDAD</b><span>Logs · métricas · trazas</span></div>
      <div><b>SELF-HEALING</b><span>Eventos · runbooks · validación</span></div>
      <div><b>ITSM / EMPRESA</b><span>Sistema de registro · CMDB · cambios</span></div>
      <div><b>INGENIERÍA</b><span>Git · CI/CD · despliegues</span></div>
    </div>
  </div>
</template>

<style scoped>
.architecture {
  display: grid;
  grid-template-rows: 280px 100px;
  gap: 24px;
  height: 100%;
}

.planes {
  display: grid;
  grid-template-columns: 1fr 138px 1fr;
  gap: 22px;
}

.plane {
  padding: 24px 26px;
  background: var(--panel);
  border: 1px solid var(--line);
}

.plane.support { border-color: #2c4a52; }
.plane.agentic { border-color: #3a2f6b; }

.plane-label {
  color: var(--cyan);
  font-family: var(--mono);
  font-size: 10.5px;
  letter-spacing: .13em;
}

.agentic .plane-label { color: var(--violet); }

.plane h3 {
  margin: 18px 0 20px;
  color: var(--white);
  font-size: 28px;
  font-weight: 400;
}

.services {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
}

.services span {
  padding: 6px 9px;
  color: var(--grey);
  background: var(--panel2);
  border: 1px solid var(--line);
  font-family: var(--mono);
  font-size: 10px;
}

.plane p {
  margin-top: 24px;
  color: var(--grey);
  font-size: 14px;
}

.bridge {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
}

.bridge::before,
.bridge::after {
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, var(--cyan), var(--violet));
  content: '';
}

.bridge span {
  color: var(--bone);
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: .08em;
}

.tooling {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}

.tooling div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 20px;
  border-right: 1px solid var(--line);
}

.tooling div:last-child { border-right: 0; }

.tooling b {
  color: var(--faint);
  font-family: var(--mono);
  font-size: 10px;
  font-weight: 400;
  letter-spacing: .12em;
}

.tooling span {
  margin-top: 10px;
  color: var(--grey);
  font-size: 13px;
}
</style>
