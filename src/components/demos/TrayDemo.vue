<script setup>
import { onMounted, onUnmounted } from 'vue';
import { Tray, Draggable, BoundToElement, FloatLeftStrategy, FloatRightStrategy, NotCrossingStrategy, transformedSpaceDistanceFactory, Point } from 'dragee';

let trays = [];
let draggables = [];

const initializeDemo = () => {
  const container = document.querySelector('#DemoTrayA .area-a');
  draggables = Array.from(container.querySelectorAll('.draggable')).map(el =>
    new Draggable(el, { container, bounding: new BoundToElement(container, container) })
  );

  const options = {
    radius: 120,
    getDistance: transformedSpaceDistanceFactory({ x: 1, y: 4 }),
    removable: true,
    paddingTopLeft: new Point(5, 5),
    yGapBetweenDraggables: 5
  }

  // Create trays with specific strategies and shared draggables
  trays.push(new Tray(
    container.querySelector('.tray-a'),
    draggables,
    {
      strategy: new FloatLeftStrategy(
        () => trays[0].getRectangle(),
        options
      )
    }
  ));

  trays.push(new Tray(
    container.querySelector('.tray-b'),
    draggables,
    {
      strategy: new FloatLeftStrategy(
        () => trays[1].getRectangle(),
        options
      )
    }
  ));

  trays.push(new Tray(
    container.querySelector('.tray-c'),
    draggables,
    {
      strategy: new FloatRightStrategy(
        () => trays[2].getRectangle(),
        options
      )
    }
  ));

  trays.push(new Tray(
    container.querySelector('.tray-d'),
    draggables,
    {
      strategy: new NotCrossingStrategy(
        () => trays[3].getRectangle()
      )
    }
  ));
};

// Trays re-lay out their draggables on resize themselves, so no ResizeObserver here
onMounted(initializeDemo);

onUnmounted(() => {
  trays.forEach(tray => tray.destroy());
  draggables.forEach(draggable => draggable.destroy());
  trays = [];
  draggables = [];
});
</script>

<template>
  <div class="demo">
    <div id="DemoTrayA" class="demo-html">
      <div class="area area-a">
        <div class="tray tray-a">A</div>
        <div class="tray tray-b">B</div>
        <div class="tray tray-c">C</div>
        <ul class="draggable-holder">
          <li class="draggable draggable-a">✈ A<small>(origin)</small></li>
          <li class="draggable draggable-b">✈ B<small>(clone)</small></li>
          <li class="draggable draggable-b">✈ B<small>(clone)</small></li>
          <li class="draggable draggable-b">✈ B<small>(clone)</small></li>
          <li class="draggable draggable-b">✈ B<small>(clone)</small></li>
          <li class="draggable draggable-c">✈ C<small>(origin)</small></li>
          <li class="draggable draggable-d">✈ D<small>(origin)</small></li>
          <li class="draggable draggable-e">✈ E<small>(origin)</small></li>
          <li class="draggable draggable-e">✈ F<small>(origin)</small></li>
        </ul>
        <div class="tray tray-full tray-d">
          <h3>NotCrossingStrategy Tray</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.demo {
  margin: 20px auto;
  padding: 0;
  border-radius: 8px;
  background-color: #f5f5f5;
  max-width: 100%;
  position: relative;
}

.area {
  position: relative;
  overflow: hidden;
  padding: 20px;
  margin: 0;
  width: 100%;
  border-radius: 8px;
  float: left;
}

.tray {
  width: 32%;
  margin-right: 2%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  float: left;
  border: 1px dashed #ddd;
  border-radius: 8px;
  background-color: #fff;
  text-align: center;
  color: #666;
  font-weight: 500;
}

.tray-b {
  height: 150px;
}

.tray-c {
  margin-right: 0;
  height: 200px;
}

.tray::before {
  content: "Tray";
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.9em;
  color: #999;
}

.draggable-holder {
  list-style: none;
  clear: both;
  margin: 20px 0 0;
  padding: 20px;
  border: 1px dashed #ddd;
  border-radius: 8px;
  background-color: #fff;
  float: left;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}

.draggable {
  width: 24%;
  margin: 1% 4%;
  padding: 9px 0;
  font-size: 15px;
  color: #666;
  cursor: move;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 5px;
  background: #f8f8f8;
  position: relative;
  float: left;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  z-index: 1;
}

.draggable.dragee-active {
  z-index: 2;
  background: #ffc40d;
  color: #444;
}

.draggable.draggable-b {
  position: relative;
}

.draggable.draggable-b + .draggable-b {
  margin-left: -28%;
  left: 5px;
}

.draggable.draggable-b + .draggable-b + .draggable-b {
  left: 10px;
}

.draggable.draggable-b + .draggable-b + .draggable-b + .draggable-b {
  left: 15px;
}

.draggable.draggable-c {
  margin-left: 3%;
}

.draggable small {
  color: #aaa;
  font-size: 11px;
  line-height: 11px;
  display: block;
}

.draggable-a { background: #2e844a; color: white; }
.draggable-b { background: #d63031; color: white; }
.draggable-c { background: #0277bd; color: white; }
.draggable-d { background: #5f3dc4; color: white; }
.draggable-e { background: #d9480f; color: white; }

.tray-full {
  width: 100% !important;
  margin: 20px auto !important;
  min-height: 200px;
  clear: both;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  padding: 20px !important;
}

.tray-full h3 {
  grid-column: 1 / -1;
  margin: 0 0 15px 0;
  color: #666;
}
</style>