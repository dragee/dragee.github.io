<script setup>
import BoundingDemo from '../demos/BoundingDemo.vue'
</script>

<template>
  <div class="section" v-highlight>
    <h2>Bounding</h2>
    <p>Control the movement boundaries of draggable elements using bounding functions.</p>

    <h3>Basic Usage</h3>
    <pre><code class="language-javascript">
import { Draggable, BoundToCircle, Point } from 'dragee'

// Create a draggable element with circular boundary
new Draggable(element, {
  bounding: new BoundToCircle(new Point(100, 100), 80)
})

// Create a draggable element with custom boundary
new Draggable(element, {
  bound: (point) => {
    // Custom logic to determine boundaries
    return point;
  }
})
    </code></pre>

    <h3>Bound Demo</h3>
    <BoundingDemo />
  </div>
</template>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

ul li {
  margin: 8px 0;
  padding-left: 20px;
  position: relative;
}

ul li:before {
  content: "•";
  color: #42b883;
  position: absolute;
  left: 0;
}
</style>