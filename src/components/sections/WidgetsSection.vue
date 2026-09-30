<script setup>
import SpiderDemo from '../demos/SpiderDemo.vue';
import ChartDemo from '../demos/ChartDemo.vue';
import ArcSliderDemo from '../demos/ArcSliderDemo.vue';
</script>

<template>
  <div class="section" v-highlight>
    <h2>Widgets</h2>
    <p>Dragee comes with a companion package <code>dragee-widgets</code> that provides pre-built widgets like Chart, Spider, and Arc Slider.</p>

    <h3>Installation</h3>
    <pre><code class="language-bash">npm install dragee dragee-widgets</code></pre>

    <h3>Spider</h3>
    <p>Create spider-web like interfaces:</p>
    <pre><code class="language-javascript">import { Spider } from 'dragee-widgets';

const spider = new Spider(areaElement, draggableElements, {
  startRadius: 100,
  endRadius: 150,
  lineWidth: 20,
  strokeStyle: "#ff5533",
  fillStyle: "rgba(100,255,220,0.8)"
});</code></pre>

    <SpiderDemo/>

    <h3>Chart Widget</h3>
    <p>Create interactive circular chart layouts with draggable elements:</p>
    <pre><code class="language-javascript">import { Chart } from 'dragee-widgets';

const chart = new Chart(container, elements, {
  boundAngle: 0,    // Starting angle in radians
  radius: 150,      // Radius of the chart circle
  touchRadius: 150  // Area around elements that responds to touch
});</code></pre>

    <ChartDemo />

    <h3>Arc Slider</h3>
    <p>Create circular sliders with customizable arc paths and draggable handles:</p>
    <pre><code class="language-javascript">import { ArcSlider } from 'dragee-widgets';

const arcSlider = new ArcSlider(areaElement, sliderElement, {
  radius: 100,        // Radius of the arc path
});</code></pre>

    <ArcSliderDemo />
  </div>
</template>

<style scoped>
.section {
  margin: 40px 0;
}

code {
  background-color: var(--color-background-mute);
  padding: 2px 4px;
  border-radius: 4px;
  font-family: monospace;
}

pre {
  background-color: var(--color-background-soft);
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
}

h3 {
  margin-top: 2rem;
}
</style>

<script>
export default {
  components: {
    SpiderDemo,
    ChartDemo
  }
}
</script>