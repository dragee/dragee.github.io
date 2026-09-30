<script setup>
import { onMounted, onUnmounted } from "vue";
import {
  Draggable, Point, BoundToLineX,
  BoundToLineY, indexOfNearestPoint
} from "dragee";

const BOUND_NONE = 0;
const BOUND_TOP = -4;
const BOUND_RIGHT = 1;
const BOUND_BOTTOM = 4;
const BOUND_LEFT = -1;

const initItems = [
  1, 2, 3, 4,
  5, 7, 6, 8,
  9, 10, 11, 12,
  13, 15, 14, 0
];

let items = initItems.slice();
let bounds;
let container
let draggables;
let resizeObserver;
let cellSize = 10;

function debounce(f, delay) {
  let timer = 0;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => f.apply(this, args), delay);
  }
}

const refreshDraggables = debounce(() => {
  draggables.forEach(draggable => {
    draggable.resetPositionToInitial();
  });

  setTimeout(() => {
    updateSizes();
    updateItems();
    updateBounds();

    draggables.forEach((draggable, index) => {
      draggable.startPositioning();
    });
  });

}, 50);

const updateSizes = () => {
  cellSize = (Point.elementSize(container).x - 2 - 5) / 4;
};

const getPointByIndex = index => {
  const x = (index % 4);
  const y = parseInt(index / 4);
  return new Point(2 + x * (cellSize + 1), 2 + y * (cellSize + 1));
}

const getPoints = () => {
  return initItems.map((_, index) => getPointByIndex(index));
}

const updateBounds = () => {
  const zeroIndex = items.indexOf(0);
  const boundKeys = Array(16).fill(BOUND_NONE);

  if (zeroIndex % 4 !== 3) {
    boundKeys[zeroIndex - BOUND_LEFT] = BOUND_LEFT;
  }

  if (zeroIndex % 4 !== 0) {
    boundKeys[zeroIndex - BOUND_RIGHT] = BOUND_RIGHT;
  }

  if (zeroIndex / 4 >= 1) {
    boundKeys[zeroIndex - BOUND_BOTTOM] = BOUND_BOTTOM;
  }

  if (zeroIndex / 4 < 3) {
    boundKeys[zeroIndex - BOUND_TOP] = BOUND_TOP;
  }

  const points = getPoints();
  bounds = boundKeys.map((boundValue, index) => {
    const boundPoints = [points[index], points[index + boundValue]];
    const xAxis = Math.abs(boundValue) == 1;

    if (boundValue < 0) {
      boundPoints.reverse();
    }

    const result = (xAxis ?
      BoundToLineY.bounding(boundPoints[0].y, boundPoints[0].x, boundPoints[1].x) :
      BoundToLineX.bounding(boundPoints[0].x, boundPoints[0].y, boundPoints[1].y)
    );
    return result;
  });
}

const updateItems = () => {
  items = Array(16).fill(0);
  const points = getPoints();

  draggables.forEach((draggable) => {
    const index = indexOfNearestPoint(points, draggable.position, cellSize * 2);
    items[index] = draggable.options.data;
  });
}

const boundFactory = value => (point, size) => {
  const index = items.indexOf(value);
  return bounds[index](point, new Point(0, 0));
}


onMounted(() => {
  container = document.querySelector(".puzzle-demo-area");
  cellSize = (Point.elementSize(container).x - 2 - 5) / 4;

  draggables = Array.from(
    container.querySelectorAll(".puzzle-demo-draggable:not([data-value='0'])")
  ).map((el) => {
    const value = parseInt(el.getAttribute('data-value'));
    const bound = boundFactory(value);
    return new Draggable(el, { container, bound, data: value });
  });

  draggables.map((draggable) => {
    draggable.on('drag:end', () => {
      const points = getPoints();
      const index = indexOfNearestPoint(points, draggable.position, cellSize * 2);
      draggable.pinPosition(points[index], { duration: 300 });

      setTimeout(() => {
        updateItems();
        updateBounds();
      }, 400);
    });
  });

  updateBounds();

  resizeObserver = new ResizeObserver(refreshDraggables);
  if (container) {
    resizeObserver.observe(container);
  }
});

onUnmounted(() => {
  if (resizeObserver) {
    resizeObserver.disconnect();
  }
});


function getStyle(value) {
  const i = value - 1;

  if (i === -1) {
    return { "background": `none`, "z-index": -1 };
  }

  const left = (100 / 4) * (i % 4);
  const top = (100 / 4) * parseInt(i / 4);
  return { "background-position": `left ${left}% top ${top}%` };
}
</script>

<template>
  <div class="puzzle-demo-area">
    <div v-for="value of initItems" :data-value="value" class="puzzle-demo-draggable" :style="getStyle(value)"></div>
  </div>
</template>

<style scoped>
.demo {
  margin: 30px 0;
  position: relative;
}

.puzzle-demo-area {
  width: 100%;
  aspect-ratio: 1 / 1;
  position: relative;
  overflow: hidden;
  padding: 0;
  border: 2px dashed #ccc;
  border-radius: 8px;
  background: #f5f5f5;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 1px;
}

.puzzle-demo-draggable {
  background: url("@/assets/city.png");
  background-size: 500%;
  display: flex;
}

.puzzle-demo-draggable.dragee-active {
  z-index: 100;
  opacity: 0.9;
}
</style>
