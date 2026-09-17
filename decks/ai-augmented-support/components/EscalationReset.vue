<template>
  <div class="reset-scene">
    <div class="reset-word enter enter-3">RESET</div>
    <div class="journey enter enter-4">
      <div class="node customer">Customer</div>
      <div class="connector"><span v-click>Explain again</span></div>
      <div class="node">T0</div>
      <div class="connector"><span v-click>Collect evidence again</span></div>
      <div class="node">T1</div>
      <div class="connector"><span v-click>Check logs again</span></div>
      <div class="node">T2</div>
      <div class="connector"><span v-click>Reproduce again</span></div>
      <div class="node">T3</div>
    </div>
  </div>
</template>

<style scoped>
.reset-scene {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}

.reset-word {
  color: var(--amber);
  font-size: 112px;
  font-weight: 200;
  letter-spacing: -.05em;
  line-height: .9;
}

.journey {
  display: grid;
  grid-template-columns: 140px 1fr 88px 1fr 88px 1fr 88px 1fr 88px;
  align-items: center;
  margin-top: 62px;
}

.node {
  display: grid;
  place-items: center;
  height: 66px;
  color: var(--white);
  background: var(--panel);
  border: 1px solid var(--line);
  font-family: var(--mono);
  font-size: 14px;
  letter-spacing: .08em;
}

.node.customer {
  border-color: #2c4a52;
  color: var(--cyan);
}

.connector {
  position: relative;
  height: 66px;
}

.connector::before {
  position: absolute;
  top: 32px;
  left: 10px;
  right: 10px;
  height: 1px;
  background: var(--faint);
  content: '';
}

.connector::after {
  position: absolute;
  top: 28px;
  right: 8px;
  width: 7px;
  height: 7px;
  border-top: 1px solid var(--faint);
  border-right: 1px solid var(--faint);
  transform: rotate(45deg);
  content: '';
}

.connector span {
  position: absolute;
  top: 48px;
  left: 0;
  right: 0;
  color: var(--amber);
  font-family: var(--mono);
  font-size: 10px;
  line-height: 1.3;
  text-align: center;
}
</style>
