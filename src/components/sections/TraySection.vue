<script setup>
import TrayDemo from '../demos/TrayDemo.vue';
</script>

<template>
  <div class="section" v-highlight>
    <h2>Tray</h2>
    <p>The Tray class creates drop zones for draggable elements with specific strategies for positioning and behavior.</p>

    <pre><code class="language-javascript">import { Tray, FloatLeftStrategy, transformedSpaceDistanceFactory } from 'dragee'

const tray = new Tray(element, draggables, {
  timeEnd: 200,
  timeExchange: 400,
  parent: parentElement,
  strategy: new FloatLeftStrategy(
    () => tray.getRectangle(),
    {
      radius: 80,
      getDistance: transformedSpaceDistanceFactory({ x: 1, y: 4 }),
      removable: true
    }
  )
});</code></pre>

      <h4>Parameters</h4>
      <ul>
        <li><code>element</code>: DOM element that serves as the drop zone</li>
        <li><code>draggables</code>: Array of draggable elements that can be dropped in this tray</li>
        <li><code>options</code>: Configuration object for the tray</li>
      </ul>

      <h3>Strategies</h3>
      <p>Strategies define how draggable elements are positioned within a tray.</p>

      <h4>FloatLeftStrategy</h4>
      <p>Positions elements from left to right, wrapping to new rows when needed.</p>

      <h4>FloatRightStrategy</h4>
      <p>Positions elements from right to left, wrapping to new rows when needed.</p>

      <h4>NotCrossingStrategy</h4>
      <p>Prevents elements from overlapping, useful for free-form layouts.</p>

      <h4>Strategy Options</h4>
      <ul>
        <li><code>radius</code>: Detection radius for item interaction</li>
        <li><code>paddingTopLeft</code> / <code>paddingBottomRight</code>: Space around each element, as a <code>Point</code> (<code>paddingTopRight</code> / <code>paddingBottomLeft</code> for FloatRightStrategy)</li>
        <li><code>getDistance</code>: Custom distance calculation function</li>
      </ul>

      <h4>Multiple Trays Example</h4>
      <pre><code class="language-javascript">
    import { Tray, Draggable, FloatLeftStrategy, FloatRightStrategy } from 'dragee';

    // Shared draggables between trays
    const draggables = elements.map(el => new Draggable(el));

    // Left-aligned tray
    const trayA = new Tray(
      document.querySelector('.tray-left'),
      draggables,
      {
        strategy: new FloatLeftStrategy(() => trayA.getRectangle())
      }
    );

    // Right-aligned tray
    const trayB = new Tray(
      document.querySelector('.tray-right'),
      draggables,
      {
        strategy: new FloatRightStrategy(() => trayB.getRectangle())
      }
    );
      </code></pre>
    <TrayDemo />
  </div>
</template>