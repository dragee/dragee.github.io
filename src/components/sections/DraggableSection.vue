<script setup>
import { onMounted } from 'vue'
import { Draggable, BubblingList, Point, BoundToCircle, BoundToElement } from 'dragee'

onMounted(() => {
  // Initialize basic draggable demo
  const draggableItem = document.querySelector('.draggable-demo-container .draggable-demo-item');
  const container = document.querySelector('.draggable-demo-container');

  if (draggableItem && container) {
    const initialPosition = new Point(20, 20);
    new Draggable(draggableItem, {
      container: container,
      bounding: new BoundToElement(container, container),
      handler: '.handle',
      position: initialPosition // Set initial position
    });
  }

  // Initialize scroll demo
  const scrollContainer = document.querySelector('.scroll-demo-container');
  const scrollDraggable = document.querySelector('.scroll-demo-draggable');

  if (scrollContainer && scrollDraggable) {
    new Draggable(scrollDraggable, {
      container: scrollContainer,
      scrollRootContainer: scrollContainer,
      bound: (point) => point
    });
  }

  // Initialize native drag and drop demo
  const nativeDragItems = document.querySelectorAll('.native-drag-item');
  const nativeDragList = document.querySelector('.native-drag-list');
  
  if (nativeDragItems.length && nativeDragList) {
    const draggables = Array.from(nativeDragItems).map(item => 
      new Draggable(item, {
        container: nativeDragList,
        nativeDragAndDrop: true,
        emulateNativeDragAndDropOnTouch: true
      })
    );
    
    new BubblingList(draggables);
  }
});
</script>

<template>
  <div class="section" v-highlight>
    <h2>Draggable</h2>
    <p>The core class for creating draggable elements with extensive customization options.</p>

    <h3>Basic Usage</h3>
    <pre><code class="language-javascript">
import { Draggable } from 'dragee'

// Create a draggable element
new Draggable(element, {
  container: containerElement
})
    </code></pre>

    <h3>Features</h3>
    <ul>
      <li>Custom drag handlers</li>
      <li>Boundary constraints</li>
      <li>Touch device support with multi-touch</li>
      <li>Scroll container support</li>
    </ul>

    <h3>Options</h3>
    <h4>Handler</h4>
    <p>Specify a handler element that initiates dragging:</p>
    <pre><code class="language-javascript">
new Draggable(element, {
  handler: '.icon-move'
})
    </code></pre>

    <h4>CSS Classes</h4>
    <p>Dragee provides special CSS classes that are automatically applied during drag operations:</p>
    <ul>
      <li><code>.dragee-active</code> - Applied to elements while they are being dragged. Use this class to modify the appearance of elements during drag operations (e.g., changing opacity, adding a shadow).</li>
      <li><code>.dragee-placeholder</code> - Applied to placeholder elements that show where a dragged item will be dropped. Use this class to style the visual indicator of the drop position.</li>
    </ul>

    <pre><code class="language-css">
.dragee-active {
  opacity: 0.8;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

.dragee-placeholder {
  opacity: 0.5;
}
    </code></pre>

    <div class="demo">
      <div class="draggable-demo-container">
        <div class="draggable-demo-item">
          <div class="draggable-demo-handle handle">✈</div>
          <span>Drag using handle</span>
        </div>
      </div>
    </div>

    <h4>Using native HTML Drag&Drop API</h4>
    <p>Dragee supports two dragging modes:</p>

    <p>1. Default mode - directly moves the HTML element of the draggable instance.</p>
    <p>2. Native mode - uses browser's HTML Drag and Drop API, where you drag a browser-generated image while the original element serves as a placeholder.</p>

    <p>Native mode is particularly useful for table row sorting, as it bypasses z-index limitations with table rows:</p>

    <pre><code class="language-javascript">
// Example: Making table rows sortable
const rows = document.querySelectorAll('tr');
const draggableRows = Array.from(rows).map(row => 
  new Draggable(row, {
    nativeDragAndDrop: true,
    emulateNativeDragAndDropOnTouch: true, // emulate same behaviour on touch devices
    touchDraggingThreshold: 100, // Touch move threshold in ms
    dragOverThrottleDuration: 16 // Throttle drag over events
  })
);
    </code></pre>
    <div class="demo">
      <div class="native-drag-demo">
        <div class="native-drag-list">
          <div class="native-drag-item red">Red Item</div>
          <div class="native-drag-item blue">Blue Item</div>
          <div class="native-drag-item green">Green Item</div>
          <div class="native-drag-item purple">Purple Item</div>
          <div class="native-drag-item orange">Orange Item</div>
        </div>
      </div>
    </div>

    <h4>Container & scrollRootContainer</h4>
    <p>Define the coordinate system for dragging. By default, it's the first non-static positioned parent.</p>
    <p><b>scrollRootContainer</b> defines all draggable parents scrolling, which we should consider.</p>
    <pre><code class="language-javascript">
new Draggable(element, {
  container: document.querySelector('.container'),
  scrollRootContainer: document.querySelector('.scroll-container')
})
    </code></pre>

    <div class="scroll-demo-wrapper">
      <div class="scroll-demo-container">
        <div class="scroll-demo-draggable">Drag Me & Scroll</div>
        <div class="scroll-demo-content">
        </div>
      </div>
    </div>

    <h3>Event Handling</h3>
    <p>Event handling is set up using the <code>on</code> property with four main events. Each listener gets an event with the draggable on it:</p>
    <pre><code class="language-javascript">
new Draggable(element, {
  on: {
    'drag:start': ({ draggable }) => {
      // Called when dragging starts
      console.log('Started dragging', draggable.element)
    },
    'drag:move': ({ draggable }) => {
      // Called continuously during dragging
      console.log('Dragging in progress', draggable.position)
    },
    'drag:release': ({ draggable }) => {
      // Called on release, before the draggable is placed
      console.log('Released at', draggable.position)
    },
    'drag:end': ({ draggable }) => {
      // Called when dragging ends
      console.log('Finished dragging')
    }
  }
})
    </code></pre>

    <p>Listeners can also be added with <code>on()</code>, which returns a function that removes the listener. <code>drag:start</code> and <code>drag:release</code> can be canceled with <code>event.cancel()</code>:</p>
    <pre><code class="language-javascript">
const off = draggable.on('drag:start', (event) => {
  if (isLocked) event.cancel() // the drag doesn't start
})

off() // remove the listener
    </code></pre>

    <h3>Advanced Options</h3>
    <pre><code class="language-javascript">
new Draggable(element, {
  // Enable native drag and drop API
  nativeDragAndDrop: true,

  // Touch device support
  emulateNativeDragAndDropOnTouch: true,
  touchDraggingThreshold: 100,

  // Performance optimization
  dragOverThrottleDuration: 16,

  // Custom scroll container
  scrollRootContainer: document.querySelector('.scroll-container')
})
    </code></pre>
  </div>
</template>

<style scoped>
.demo {
  margin: 30px 0;
}


.draggable-area {
  height: 230px;
  position: relative;
  overflow: hidden;
  padding: 0;
  border: 2px dashed #ccc;
  border-radius: 8px;
  background: #f5f5f5;
}

.draggable-area .bound-draggable-a,
.draggable-area .bound-draggable-b {
  border-radius: 8px;
  padding: 0;
  width: 50px;
  height: 50px;
  background: #42b883;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: box-shadow 0.3s;
  z-index: 2;
}

.draggable-area .bound-draggable-b {
  background: hsla(160, 100%, 37%, 1);
}

.draggable-area .bound-draggable-a:hover,
.draggable-area .bound-draggable-b:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}
canvas {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}



.draggable-demo-container {
  height: 200px;
  border: 2px dashed #ccc;
  position: relative;
  border-radius: 8px;
  padding: 20px;
}

.draggable-demo-item {
  width: min(200px, 80%);
  background: #42b883;
  color: white;
  padding: 15px;
  border-radius: 8px;
  position: absolute;
  cursor: grab;
  display: flex;
  align-items: center;
  gap: 10px;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  z-index: 1000;
}

@media (max-width: 768px) {
  .draggable-demo-container {
    height: 200px;
  }
  
  .draggable-demo-item {
    padding: 10px;
    font-size: 14px;
  }
  
  .scroll-demo-container {
    height: 150px;
  }
  
  .scroll-demo-draggable {
    width: min(150px, 70%);
    height: 50px;
    font-size: 14px;
  }
}

.draggable-demo-handle {
  cursor: move;
  padding: 5px 10px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
}

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

.dragee-active {
  opacity: 0.8;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

.scroll-demo-wrapper {
  border: 2px dashed #ccc;
  border-radius: 8px;
  background: #f5f5f5;
  margin-top: 20px; /* Added margin for better spacing */
}

.scroll-demo-container {
  height: 200px;
  overflow-y: auto;
  position: relative;
  padding: 20px;
}

.scroll-demo-draggable {
  width: 150px;
  height: 60px;
  background: #42b883;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: move;
  border-radius: 8px;
  position: absolute;
  z-index: 1000;
  user-select: none;
  transition: box-shadow 0.2s;
}

.scroll-demo-draggable.dragee-active {
  transform: scale(1.05);
  box-shadow: 0 8px 20px rgba(0,0,0,0.2);
  opacity: 0.9;
}

.scroll-demo-content {
  height: 600px;
  padding: 20px;
  color: #666;
}

.native-drag-demo {
  padding: 20px;
  background: #f5f5f5;
  border-radius: 8px;
  margin: 20px 0;
}

.native-drag-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.native-drag-item {
  padding: 15px;
  border-radius: 6px;
  color: white;
  cursor: move;
  user-select: none;
  font-weight: 500;
  transition: box-shadow 0.2s;
}

.native-drag-item.red { background-color: #ff6b6b; }
.native-drag-item.blue { background-color: #4dabf7; }
.native-drag-item.green { background-color: #42b883; }
.native-drag-item.purple { background-color: #845ef7; }
.native-drag-item.orange { background-color: #ff922b; }

.native-drag-item.dragee-active {
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  opacity: 0.8;
}

.native-drag-list .dragee-placeholder {
  opacity: 0.3;
}
</style>