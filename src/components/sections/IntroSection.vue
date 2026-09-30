<script setup>
import { onMounted } from 'vue'
import { Draggable, BoundToElement } from 'dragee'

onMounted(() => {
  const demoElement = document.querySelector('.intro-demo-draggable');
  const container = document.querySelector('.intro-demo-container');

  new Draggable(demoElement, {
    container: container,
    bounding: new BoundToElement(container, container)
  });
});
</script>

<template>
  <div class="section" v-highlight>
    <h2>Installation</h2>
    <pre><code class="language-bash">npm install dragee</code></pre>

    <h2>Basic Usage</h2>
    <pre><code class="language-javascript">
import { Draggable, BubblingList } from 'dragee'

// Create draggable element
new Draggable(element, {
  container: containerElement
})

// Create vertical bubbling list
new BubblingList(draggables)
    </code></pre>

    <div class="demo">
      <h3>Draggable Demo</h3>
      <div class="intro-demo-container">
        <div class="intro-demo-draggable">
          Drag me!
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.demo {
  margin-top: 30px;
}

.intro-demo-container {
  height: 200px;
  border: 2px dashed #ccc;
  position: relative;
  margin-top: 20px;
  margin-bottom: 40px;
  border-radius: 8px;
}

.intro-demo-draggable {
  width: 100px;
  height: 100px;
  background: #42b883;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: move;
  border-radius: 8px;
  position: absolute;
  top: 20px;
  left: 20px;
}
</style>