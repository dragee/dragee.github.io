<script setup>
import { onMounted } from 'vue'
import { Draggable, BubblingList, List } from 'dragee'

onMounted(() => {
  const listContainer = document.querySelector('.sortable-demo-list');
  const listItems = listContainer.querySelectorAll('.sortable-demo-item');

  const draggableItems = Array.from(listItems).map(item => 
    new Draggable(item, {
      container: listContainer,
      nativeDragAndDrop: true,
      emulateNativeDragAndDropOnTouch: true
    })
  );

  new BubblingList(draggableItems);

  // Initialize horizontal list demo
  const rowContainer = document.querySelector('.sortable-demo-row');
  const rowItems = rowContainer.querySelectorAll('.sortable-demo-chip');

  const rowDraggables = Array.from(rowItems).map(item =>
    new Draggable(item, {
      container: rowContainer,
      nativeDragAndDrop: true,
      emulateNativeDragAndDropOnTouch: true
    })
  );

  new BubblingList(rowDraggables, { axis: 'x' });

  // Initialize grid demo
  const gridContainer = document.querySelector('.grid-container');
  const gridItems = gridContainer.querySelectorAll('.grid-item');

  const gridDraggables = Array.from(gridItems).map(item => 
    new Draggable(item, {
      container: gridContainer,
      nativeDragAndDrop: true
    })
  );

  new List(gridDraggables);
});
</script>

<template>
  <div class="demo">
    <h3>Vertical Sorting Demo (using BubblingList)</h3>
    <div class="sortable-demo-list">
      <div class="sortable-demo-item">Item 1</div>
      <div class="sortable-demo-item">Item 2</div>
      <div class="sortable-demo-item">Item 3</div>
      <div class="sortable-demo-item">Item 4</div>
      <div class="sortable-demo-item">Item 5</div>
    </div>
  </div>

  <div class="demo">
    <h3>Horizontal Sorting Demo (using BubblingList)</h3>
    <div class="sortable-demo-row">
      <div class="sortable-demo-chip">Drag</div>
      <div class="sortable-demo-chip">and drop</div>
      <div class="sortable-demo-chip">items of</div>
      <div class="sortable-demo-chip">any</div>
      <div class="sortable-demo-chip">width</div>
    </div>
  </div>

  <h3>Grid Sorting Demo</h3>
  <div class="demo">
    <div class="grid-demo">
      <div class="grid-container">
        <div class="grid-item">1</div>
        <div class="grid-item">2</div>
        <div class="grid-item">3</div>
        <div class="grid-item">4</div>
        <div class="grid-item">5</div>
        <div class="grid-item">6</div>
        <div class="grid-item">7</div>
        <div class="grid-item">8</div>
        <div class="grid-item">9</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.demo {
  margin-top: 30px;
}

.sortable-demo-list {
  border: 2px dashed #ccc;
  padding: 20px;
  border-radius: 8px;
  max-width: 100%;
}

.sortable-demo-item {
  color: white;
  margin: 10px 0;
  padding: 15px;
  border-radius: 4px;
  cursor: move;
  word-break: break-word;
  transition: box-shadow 0.2s;
}

.sortable-demo-item:nth-child(1) { background: #ff6b6b; }
.sortable-demo-item:nth-child(2) { background: #4dabf7; }
.sortable-demo-item:nth-child(3) { background: #42b883; }
.sortable-demo-item:nth-child(4) { background: #845ef7; }
.sortable-demo-item:nth-child(5) { background: #ff922b; }

.sortable-demo-item.dragee-active {
  transform: translateY(2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  opacity: 0.9;
}

@media (max-width: 768px) {
  .sortable-demo-list {
    padding: 10px;
  }

  .sortable-demo-item {
    padding: 10px;
    font-size: 14px;
  }
}

.dragee-placeholder {
  opacity: 0.5;
}

.sortable-demo-row {
  display: flex;
  gap: 10px;
  border: 2px dashed #ccc;
  padding: 20px;
  border-radius: 8px;
  overflow-x: auto;
}

.sortable-demo-chip {
  color: white;
  padding: 15px;
  border-radius: 4px;
  cursor: move;
  white-space: nowrap;
  user-select: none;
  transition: box-shadow 0.2s;
}

.sortable-demo-chip:nth-child(1) { background: #ff6b6b; }
.sortable-demo-chip:nth-child(2) { background: #4dabf7; }
.sortable-demo-chip:nth-child(3) { background: #42b883; }
.sortable-demo-chip:nth-child(4) { background: #845ef7; }
.sortable-demo-chip:nth-child(5) { background: #ff922b; }

.sortable-demo-chip.dragee-active {
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  opacity: 0.9;
}

@media (max-width: 768px) {
  .sortable-demo-row {
    padding: 10px;
  }

  .sortable-demo-chip {
    padding: 10px;
    font-size: 14px;
  }
}

.grid-demo {
  padding: 20px;
  background: #f5f5f5;
  border-radius: 8px;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  max-width: 400px;
  margin: 0 auto;
}

.grid-item {
  color: white;
  padding: 20px;
  border-radius: 4px;
  text-align: center;
  cursor: move;
  user-select: none;
  font-weight: bold;
  transition: box-shadow 0.2s;
}

.grid-item:nth-child(1) { background: #ff6b6b; }
.grid-item:nth-child(2) { background: #4dabf7; }
.grid-item:nth-child(3) { background: #42b883; }
.grid-item:nth-child(4) { background: #845ef7; }
.grid-item:nth-child(5) { background: #ff922b; }
.grid-item:nth-child(6) { background: #20c997; }
.grid-item:nth-child(7) { background: #f06595; }
.grid-item:nth-child(8) { background: #51cf66; }
.grid-item:nth-child(9) { background: #ffd43b; }

.grid-item.dragee-active {
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  opacity: 0.8;
  z-index: 100;
}

.grid-container .dragee-placeholder {
  opacity: 0.3;
}

@media (max-width: 768px) {
  .grid-container {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>