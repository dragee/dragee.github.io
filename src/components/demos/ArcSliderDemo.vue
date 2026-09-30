
<template>
  <div class="demo">
    <div class="arc-area">
      <span class="arc-slider"></span>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';
import { ArcSlider } from 'dragee-widgets';

let arcSlider = null;

onMounted(() => {
  const areaElement = document.querySelector('.arc-area');
  const slider = document.querySelector('.arc-slider');

  arcSlider = new ArcSlider(areaElement, slider, {
    radius: 100
  });
});

onUnmounted(() => {
  if (arcSlider) {
    arcSlider.destroy();
  }
});
</script>

<style scoped>
.demo {
  padding: 20px;
  border: 2px dashed #ccc;
  border-radius: 8px;
  background-color: var(--color-background-soft);
  overflow: hidden;
  position: relative;
}

.arc-area {
  margin: 0 auto;
  height: 200px;
  width: 200px;
  border-top: 5px solid var(--color-text);
  border-radius: 800px;
  border-bottom: 0;
  background-color: var(--color-background-soft);
  overflow: visible;
  list-style: none;
}

.arc-slider {
  position: relative;
  width: 1px;
  height: 1px;
  display: inline-block;
}

.arc-slider:after {
  position: absolute;
  left: -18px;
  top: -18px;
  content: "A";
  padding: 7px 14px;
  font-size: 15px;
  color: var(--color-text);
  cursor: move;
  border: 2px solid #fff;
  border-radius: 25px;
  background: var(--color-background);
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: box-shadow 0.3s;
}

.arc-slider.dragee-active:after {
  background: #42b883;
  color: white;
  border-color: #42b883;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}
</style>
