
<script setup>
import { onMounted, onUnmounted } from 'vue';
import { Chart } from 'dragee-widgets';

let chart = null;

onMounted(() => {
  const container = document.querySelector('.chart');
  const elements = Array.from(container.querySelectorAll('li'));
  
  chart = new Chart(container, elements, {
    boundAngle: 0,
    radius: 120,
    touchRadius: 120
  });
});

onUnmounted(() => {
  if (chart) {
    chart.destroy();
  }
});
</script>

<template>
  <div class="demo">
    <div class="chart-wrapper">
      <ul class="chart">
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

.chart-wrapper {
  border-radius: 8px;
  overflow: visible;
  padding: 20px;
}

.chart {
  height: 300px;
  list-style: none;
  padding: 0;
  margin: 0;
}

.chart li {
  margin: 20px;
  display: block;
  float: left;
  padding: 7px 14px;
  font-size: 15px;
  color: #333;
  cursor: move;
  border: 1px dashed #fff;
  border-radius: 25px;
  background: var(--color-background);
  position: absolute;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: box-shadow 0.3s;
}

.chart li:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

.chart li.dragee-active {
  z-index: 2;
  background: #42b883;
  color: white;
  border-color: #42b883;
}
</style>
