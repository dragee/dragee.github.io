<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import PuzzleDemo from '../demos/PuzzleDemo.vue'

const flippedPuzzleDemo = ref(false);
const puzzleCardMinHeight = ref(0);
const togglePuzzleDemo = () => {
  flippedPuzzleDemo.value ^= true;
}

onMounted(() => {
  const updateCardHeight = () => {
    const flipCard = document.querySelector('.flip-card-inner');
    puzzleCardMinHeight.value = parseInt(getComputedStyle(flipCard)['width']) + 40 + 'px';
  };

  updateCardHeight();

  window.addEventListener('resize', updateCardHeight);

  onBeforeUnmount(() => {
    window.removeEventListener('resize', updateCardHeight);
  });
});

</script>

<template>
  <div class="section">
    <h2>Authors</h2>
    <div class="authors-grid">
      <div class="author-card">
        <img src="https://avatars.githubusercontent.com/u/244409?v=4" alt="Volodymyr Myskov" class="author-avatar"/>
        <h3>Volodymyr Myskov</h3>
        <p>Developer</p>
        <a href="https://github.com/Jaromudr" target="_blank" class="github-link">GitHub</a>
        <a href="mailto:jaromudr@gmail.com" class="github-link" style="margin-left: 8px">Email</a>
        <a href="https://t.me/jaromudr" target="_blank" class="github-link" style="margin-left: 8px">Telegram</a>
      </div>
      <div class="author-card flip-card"
          :class="{ flipped: flippedPuzzleDemo }">
        <div class="flip-card-inner" :style="{minHeight: flippedPuzzleDemo && puzzleCardMinHeight }">
          <div class="flip-card-front">
            <img src="https://avatars.githubusercontent.com/u/869612?v=4" alt="Vitaliy Yaroviy" class="author-avatar" />
            <h3>Vitaliy Yaroviy</h3>
            <p>Developer</p>
            <a href="https://github.com/Vitaliy-Yarovuy" target="_blank" class="github-link">GitHub</a>
            <a href="mailto:vitaliy.yxz@gmail.com" class="github-link" style="margin-left: 8px">Email</a>
            <a href="javascript: void 0;" @click.prevent="togglePuzzleDemo()" class="github-link" style="margin-left: 8px">Demo</a>
          </div>
          <div class="flip-card-back">
            <PuzzleDemo />
             <a href="javascript: void 0;" @click.prevent="togglePuzzleDemo()" class="github-link" style="margin-left: 8px">back</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.authors-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.flip-card {
  perspective: 1000px;
}

.flip-card-inner {
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s;
}

.flip-card.flipped .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.flip-card-front, .flip-card-back {
  backface-visibility: hidden;
}

.flip-card-back {
  transform: rotateY(180deg);
  padding: 0px;
  transition: padding 1s;
}

.flip-card.flipped .flip-card-back{
  padding: 1px;
}

.author-card {
  background: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}

.author-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 10px;
}

h3 {
  margin: 10px 0 5px;
  color: #2c3e50;
}

p {
  color: #666;
  margin: 0;
}

.github-link {
  display: inline-block;
  margin-top: 8px;
  padding: 4px 12px;
  background: #42b883;
  color: white;
  border-radius: 4px;
  text-decoration: none;
}

.github-link:hover {
  background: #3aa876;
}

@media (max-width: 768px) {
  .authors-grid {
    grid-template-columns: 1fr;
  }
}
</style>