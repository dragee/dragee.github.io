<script setup>
import SortableDemo from '../demos/SortableDemo.vue'
</script>

<template>
  <div class="section" v-highlight>
    <h2>Sortable</h2>
    <p>Create sortable lists with drag and drop functionality using either List or BubblingList implementations.</p>

    <h3>List vs BubblingList</h3>
    <p>The library provides two implementations for sortable functionality:</p>
    <ul>
      <li><strong>List:</strong> A general-purpose implementation suitable for any sorting direction (vertical, horizontal, or grid layouts)</li>
      <li><strong>BubblingList:</strong> Optimized for lists along one axis &mdash; vertical by default, or horizontal with <code>axis: 'x'</code> &mdash; including items of different sizes</li>
    </ul>

    <h3>Configuration Options</h3>
    <pre><code class="language-javascript">
import { Draggable, List, BubblingList } from 'dragee'
new List(draggables, {
  getDistance: (p1, p2) => Math.abs(p1.y - p2.y), // Custom distance calculation
  sorting: (draggableA, draggableB) => draggableA.pinnedPosition.y - draggableB.pinnedPosition.y, // Custom sorting function
  radius: 30, // Detection radius for item interaction
  timeEnd: 400, // Animation duration after drop (ms)
  timeExchange: 100 // Animation duration during exchange (ms)
})

new BubblingList(draggables)

// Horizontal bubbling list
new BubblingList(draggables, { axis: 'x' })</code></pre>

    <h4>Options Explained:</h4>
    <ul>
      <li><code>getDistance</code>: Function to calculate distance between draggable elements. For BubblingList, defaults to measuring the distance along its axis. For List, defaults to measuring both vertical and horizontal distances.</li>
      <li><code>sorting</code>: Custom sorting function for items. By default, items are sorted by vertical position (y), then horizontal position (x). Example:
        <pre><code class="language-javascript">
new List(draggables, {
  sorting: (draggableA, draggableB) => {
    // Custom sorting logic
    return draggableA.pinnedPosition.y - draggableB.pinnedPosition.y;
  }
})</code></pre>
      </li>
      <li><code>radius</code>: The proximity threshold (in pixels) that determines when two draggable elements are close enough to trigger a swap. A larger radius makes swapping more generous but potentially less precise, while a smaller radius requires more precise positioning but offers better control. Example:
        <pre><code class="language-javascript">
new List(draggables, {
  radius: 20, // Requires more precise positioning
  // vs
  radius: 50  // More forgiving, swaps happen from further away
})</code></pre>
      </li>
      <li><code>timeEnd</code>: Duration of the animation when item is dropped</li>
      <li><code>timeExchange</code>: Duration of the animation when items are exchanged during drag</li>
    </ul>

    <h3>Properties</h3>
    <p>The List and BubblingList components have the following settable properties:</p>
    <ul>
      <li><code>swappingDisabled</code>: A boolean property that when set to true, disables the swapping behavior between items during drag. This is particularly useful when changing the size of draggable elements on dragstart, as the BubblingList algorithm may work incorrectly with dynamic sizes. The recommended pattern is to enable swapping after new sizes and positions are set. Example:
        <pre><code class="language-javascript">
const list = new List(draggables);
list.swappingDisabled = true;</code></pre>
      </li>
    </ul>

    <h3>Events</h3>
    <p>The List and BubblingList components emit events that you can listen to:</p>
    <pre><code class="language-javascript">
const list = new List(draggables);
list.on('list:change', () => {
  // getSortedDraggables() returns the draggables in their new order
  console.log('List order changed:', list.getSortedDraggables());
});</code></pre>

    <SortableDemo />
  </div>
</template>