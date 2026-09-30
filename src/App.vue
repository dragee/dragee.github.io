<script setup>
import Documentation from './components/Documentation.vue'
</script>

<template>
  <div itemscope itemtype="http://schema.org/SoftwareApplication">
    <meta itemprop="name" content="Dragee" />
    <meta itemprop="applicationCategory" content="DevelopmentTool" />
    <meta itemprop="operatingSystem" content="Any" />
    <Documentation />
  </div>
</template>

<style scoped>
.dragee-logo {
  display: block;
  width: 100px;
  height: 100px;
  margin: 20px auto;
  border-radius: 8px;
}
</style>

<style>
.documentation {
  width: 100%;
  margin: 0 auto;
}

.content {
  display: flex;
  gap: 40px;
}

header {
  text-align: center;
}

main {
  flex: 1;
}

@media (max-width: 768px) {
  .content {
    flex-direction: column;
    gap: 20px;
    display: flex;
  }

  .documentation {
    padding: 10px;
    display: flex;
    flex-direction: column;
  }

  header {
    order: 2;
    margin: 10px 0;
  }

  nav {
    order: 1;
  }

  main {
    order: 3;
  }
}
</style>