
<script setup>
import { onMounted } from 'vue'
import { Draggable, Point, BoundToCircle } from 'dragee'

onMounted(() => {
  const drawBoundingDemo = () => {
    const draggableArea = document.querySelector(".bounding-demo-area");
    const draggableAElement = document.querySelector(".bounding-demo-draggable-a");
    const draggableBElement = document.querySelector(".bounding-demo-draggable-b");
    const centerPoint = new Point(100, 90);
    const startPoint = new Point(100, 10);

    new Draggable(draggableAElement, {
      bound: BoundToCircle.bounding(centerPoint, 80),
      position: startPoint
    });

    const calculusFx = (x) => {
      x = x / 100;
      return (x * Math.sin(x * x) + 1) * 10 + 80;
    };

    new Draggable(draggableBElement, {
      bound: (point, size) => {
        const retPoint = point.clone();
        retPoint.y = calculusFx(point.x);
        return retPoint;
      },
      position: new Point(210, calculusFx(210))
    });

    const canvas = document.getElementById("myCanvas");
    const context = canvas.getContext("2d");

    context.lineWidth = 2;
    context.strokeStyle = '#55bb55';
    context.beginPath();
    context.arc(100 + 25, 90 + 25, 80, 0, 2 * Math.PI);
    context.stroke();
    context.closePath();
    context.moveTo(-1, 0);

    context.strokeStyle = '#ffbb55';
    context.beginPath();
    let x, y;
    for (x = -26; x <= 1000; x += 1) {
      y = calculusFx(x) + 25;
      context.lineTo(x + 25, y);
    }
    context.stroke();
  }
  drawBoundingDemo()
})
</script>

<template>
  <div class="demo">
    <div class="bounding-demo-area">
      <canvas id="myCanvas" width="1000" height="240"></canvas>
      <div class="bounding-demo-draggable-a"></div>
      <div class="bounding-demo-draggable-b"></div>
    </div>
  </div>
</template>

<style scoped>
.demo {
  margin: 30px 0;
  position: relative;
}

.bounding-demo-area {
  height: 240px;
  position: relative;
  overflow: hidden;
  padding: 0;
  border: 2px dashed #ccc;
  border-radius: 8px;
  background: #f5f5f5;
}

@media (max-width: 768px) {
  .bounding-demo-draggable-a,
  .bounding-demo-draggable-b {
    width: 40px;
    height: 40px;
    margin: 10px;
  }
}

.bounding-demo-draggable-a,
.bounding-demo-draggable-b {
  display: inline-block;
  border-radius: 50%;
  padding: 0;
  width: 50px;
  height: 50px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: box-shadow 0.3s;
  z-index: 2;
  margin: 20px;
  border: 1px solid yellow;
}

.bounding-demo-draggable-a {
  background-color: red;
}

.bounding-demo-draggable-b {
  background-color: blue;
}

.bounding-demo-draggable-a:hover,
.bounding-demo-draggable-b:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

canvas {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}
</style>
