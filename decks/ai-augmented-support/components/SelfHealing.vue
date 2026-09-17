<template>
  <div class="self-healing">
    <div class="track">
      <div v-click class="step signal"><b>01</b><strong>Señal operativa</strong><span>Alarma, evento o patrón conocido</span></div>
      <i></i>
      <div v-click class="step trigger"><b>02</b><strong>Evento y regla</strong><span>EventBridge evalúa el disparador</span></div>
      <i></i>
      <div v-click class="step runbook"><b>03</b><strong>Runbook validado</strong><span>SSM Automation, Lambda o Step Functions</span></div>
      <i></i>
      <div v-click class="step validate"><b>04</b><strong>Validar y registrar</strong><span>Salud, rollback y actualización del caso ITSM</span></div>
    </div>
    <div v-click class="healing-rule"><span>SELF-HEALING DETERMINÍSTICO</span><p>La automatización ejecuta procedimientos aprobados; la IA puede ayudar a detectar, explicar o recomendar, pero no reemplaza el runbook.</p></div>
  </div>
</template>

<style scoped>
.self-healing { display:grid; grid-template-rows: 1fr 92px; gap:34px; height:100%; }
.track { display:grid; grid-template-columns: 1fr 48px 1fr 48px 1fr 48px 1fr; align-items:center; }
.step { min-height:224px; padding:24px 20px; border:1px solid var(--line); background:var(--panel); display:flex; flex-direction:column; }
.step b { color:var(--faint); font-family:var(--mono); font-size:11px; letter-spacing:.12em; font-weight:400; }
.step strong { margin-top:24px; color:var(--white); font-size:21px; font-weight:400; line-height:1.15; }
.step span { margin-top:auto; color:var(--grey); font-size:13px; line-height:1.42; }
.signal { border-color:#2c4a52; }.trigger { border-color:#3a2f6b; }.runbook { border-color:#7a5415; }.validate { border-color:#2c4a52; }
.track > i { height:1px; background:linear-gradient(90deg,var(--cyan),var(--violet)); position:relative; }
.track > i::after { position:absolute; right:0; top:-4px; width:8px; height:8px; border-top:1px solid var(--violet); border-right:1px solid var(--violet); transform:rotate(45deg); content:''; }
.healing-rule { display:flex; gap:30px; align-items:center; padding:15px 22px; border-left:2px solid var(--amber); background:var(--panel2); }
.healing-rule span { color:var(--amber); font-family:var(--mono); font-size:10px; letter-spacing:.13em; white-space:nowrap; }
.healing-rule p { color:var(--bone); font-size:15px; font-weight:300; line-height:1.42; }
</style>
