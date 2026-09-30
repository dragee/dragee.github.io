
<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { Spider } from 'dragee-widgets';

let spider = null;

onMounted(() => {
  const container = document.querySelector('.spider');
  const elements = Array.from(container.querySelectorAll('li'));
  const canvas = document.createElement('canvas');
  canvas.width = container.clientWidth;
  canvas.height = container.clientHeight;
  canvas.style.position = 'absolute';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.pointerEvents = 'none';
  container.appendChild(canvas);
  
  const ctx = canvas.getContext('2d');
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  
  // Draw rays
  ctx.strokeStyle = '#42b883';
  ctx.lineWidth = 1;
  
  const numRays = 6;
  const radius = 1250;
  
  for (let i = 0; i < numRays; i++) {
    const angle = (i * 2 * Math.PI) / numRays;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(
      centerX + radius * Math.cos(angle),
      centerY + radius * Math.sin(angle)
    );
    ctx.stroke();
  }
  
  spider = new Spider(container, elements, {
    startRadius: 100,
    endRadius: 150,
    lineWidth: 2,
    strokeStyle: "#42b883",
    fillStyle: "rgba(66,184,131,0.2)"
  });
});

onUnmounted(() => {
  if (spider) {
    spider.destroy();
  }
});
</script>

<template>
  <div class="demo">
    <div class="spider-demo">
      <ul class="spider">
        <li v-for="letter in ['A', 'B', 'C', 'D', 'E', 'F']" :key="letter">
          {{ letter }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.demo {
  margin: 20px auto;
  padding: 0;
  border: 2px dashed #ccc;
  border-radius: 8px;
  background-color: #f8f8f8;
}

.spider-demo {
  border-radius: 8px;
  overflow: hidden;
  position: relative;
}

.spider {
  height: 280px;
  border-radius: 8px;
  overflow: hidden;
  list-style: none;
  padding: 0;
}

.spider li {
  z-index: 1;
  margin: 20px;
  display: block;
  float: left;
  padding: 7px 14px;
  font-size: 15px;
  color: #333;
  cursor: move;
  border: 1px solid #fff;
  border-radius: 25px;
  background: #f5f5f5;
  position: relative;
  user-select: none;
}

.spider li.dragee-active {
  z-index: 2;
  background: #ffc40d;
}
</style>
