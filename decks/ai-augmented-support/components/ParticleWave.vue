<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const canvas = ref<HTMLCanvasElement | null>(null)
let frame = 0
let time = 0

function draw() {
  const element = canvas.value
  if (!element) return
  const context = element.getContext('2d')
  if (!context) return

  const width = 1600
  const height = 900
  context.clearRect(0, 0, width, height)

  for (let row = 0; row < 46; row += 1) {
    for (let column = 0; column < 112; column += 1) {
      const u = column / 112
      const v = row / 46
      const wave = Math.sin(u * 7 + time * 0.7 + v * 2.4) * 46
        + Math.sin(u * 3.1 - time * 0.45 + v * 1.2) * 30
      const x = width * 0.3 + u * width * 0.86 - v * 90
      const y = height * 0.3 + v * height * 0.62 + wave * (0.5 + v * 0.9)
      if (x < width * 0.26) continue

      const fade = Math.min(1, (x - width * 0.26) / 240)
      const alpha = (0.1 + v * 0.55) * fade
      const size = 0.7 + v * 1.9
      const mix = u * 0.6 + v * 0.4
      context.fillStyle = `rgba(${Math.round(120 + mix * 120 + Math.sin(time + u * 4) * 22)},${Math.round(90 + (1 - mix) * 70)},${Math.round(230 - mix * 40)},${alpha.toFixed(3)})`
      context.beginPath()
      context.arc(x, y, size, 0, Math.PI * 2)
      context.fill()
    }
  }

  time += 0.006
  frame = requestAnimationFrame(draw)
}

onMounted(() => {
  const element = canvas.value
  if (!element) return
  element.width = 1600
  element.height = 900
  draw()
})

onUnmounted(() => cancelAnimationFrame(frame))
</script>

<template>
  <canvas ref="canvas" class="particle-wave" aria-hidden="true" />
</template>
