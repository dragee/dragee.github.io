<template>
  <div class="documentation" role="main">
    <h1 class="visually-hidden">Dragee Documentation</h1>
    <aside class="sidebar">
      <h1>Dragee Documentation</h1>
      <nav>
        <a
          v-for="section in sections"
          :key="section.id"
          :href="`#${section.id}`"
          @click.prevent="scrollToSection(section.id)"
          :class="{ active: activeSection === section.id }"
        >{{ section.title }}</a>
      </nav>
    </aside>

    <main>
      <header class="main-header">
        <div class="header-content">
          <div class="header-left">
            <div class="draggable-wrapper" ref="draggableLogo">
              <img 
                src="https://avatars.githubusercontent.com/u/23475138?s=400&u=e3b558c178a1f47c13cf97244d75b3673953b5b4&v=4" 
                alt="Dragee.js Logo" 
                class="dragee-logo"
              />
            </div>
            <div class="header-text">
              <h1>Dragee</h1>
              <p>A lightweight and flexible drag-and-drop library.</p>
              <a 
                href="https://github.com/dragee/dragee" 
                target="_blank" 
                class="header-link"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </header>
      <section id="intro">
        <IntroSection />
      </section>

      <section id="draggable">
        <DraggableSection />
      </section>

      <section id="bounding">
        <BoundingSection />
      </section>

      <section id="sortable">
        <SortableSection />
      </section>

      <section id="tray">
        <TraySection />
      </section>

      <section id="widgets">
        <WidgetsSection />
      </section>

      <section id="authors">
        <AuthorsSection />
      </section>
    </main>

  </div>
</template>

<script setup>
import IntroSection from './sections/IntroSection.vue'
import DraggableSection from './sections/DraggableSection.vue'
import SortableSection from './sections/SortableSection.vue'
import TraySection from './sections/TraySection.vue'
import WidgetsSection from './sections/WidgetsSection.vue'
import BoundingSection from './sections/BoundingSection.vue'
import AuthorsSection from './sections/AuthorsSection.vue'
import { Draggable } from 'dragee'

import { onMounted, onBeforeUnmount, ref } from 'vue'

const sections = [
  { id: 'intro', title: 'Introduction' },
  { id: 'draggable', title: 'Draggable' },
  { id: 'bounding', title: 'Bounding' },
  { id: 'sortable', title: 'Sortable' },
  { id: 'tray', title: 'Tray' },
  { id: 'widgets', title: 'Widgets' },
  { id: 'authors', title: 'Authors' }
]

const draggableLogo = ref(null)

const activeSection = ref('intro')

const scrollToSection = (id) => {
  const element = document.getElementById(id)
  if (element) {
    const isMobile = window.innerWidth < 768
    let scrollOffset = 0
    
    if (isMobile) {
      const sidebar = document.querySelector('.sidebar')
      if (sidebar) {
        scrollOffset = sidebar.offsetHeight
      }
    }
    
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset - scrollOffset
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    })
  }
}

onMounted(() => {
  // Initialize draggable logo
  if (draggableLogo.value) {
    new Draggable(draggableLogo.value, {
      container: document.body,
      bound: point => point
    });
  }

  const updateSidebarHeight = () => {
    const sidebar = document.querySelector('.sidebar');
    const main = document.querySelector('main');
    if (sidebar && main && window.innerWidth < 768) {
      const sidebarHeight = sidebar.offsetHeight;
      main.style.marginTop = `${sidebarHeight}px`;
    } else if (main) {
      main.style.marginTop = '0';
    }
  };

  // Initial height update
  updateSidebarHeight();

  // Create resize observer for sidebar
  const resizeObserver = new ResizeObserver(updateSidebarHeight);
  const sidebar = document.querySelector('.sidebar');
  if (sidebar) {
    resizeObserver.observe(sidebar);
  }

  // Handle window resize
  window.addEventListener('resize', updateSidebarHeight);

  // Cleanup
  onBeforeUnmount(() => {
    window.removeEventListener('resize', updateSidebarHeight);
    resizeObserver.disconnect();
  });

  const updateActiveSection = () => {
    const sections = document.querySelectorAll('main section');
    const isMobile = window.innerWidth < 768;
    const sidebar = document.querySelector('.sidebar');
    const sidebarHeight = isMobile && sidebar ? sidebar.offsetHeight : 0;
    const viewportHeight = window.innerHeight;
    const viewportCenter = (viewportHeight / 3) + sidebarHeight;

    let closestSection = null;
    let minDistance = Infinity;

    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const distance = Math.min(
        Math.abs(rect.top - viewportCenter), 
        Math.abs(rect.top + rect.height - viewportCenter - 1)
      );
      
      if (distance < minDistance) {
        minDistance = distance;
        closestSection = section;
      }
    });

    if (closestSection && closestSection.id) {
      activeSection.value = closestSection.id;
    }
  }

  // Initial check
  updateActiveSection();

  // Add scroll listener
  window.addEventListener('scroll', updateActiveSection, { passive: true });

  // Clean up on unmount
  onBeforeUnmount(() => {
    window.removeEventListener('scroll', updateActiveSection);
  });
})
</script>

<style>
.main-header {
  padding: 2rem;
  background: rgba(66, 184, 131, 0.1);
  border-radius: 8px;
}

.header-content {
  display: flex;
  justify-content: center;
}

.header-left {
  display: flex;
  align-items: start;
  gap: 2rem;
}

.header-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  text-align: left;
}

.header-text h1 {
  font-size: 2rem;
  line-height: 1em;
  color: #42b883;
}

.header-text p {
  font-size: 1.2rem;
  color: #666;
}

.header-link {
  padding: 8px 16px;
  border-radius: 4px;
  background: #42b883;
  color: white;
  transition: all 0.3s ease;
  display: inline-block;
  margin-top: 0.2rem;
}

.header-link:hover {
  background: #3aa876;
}

.dragee-logo {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  pointer-events: none;
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 1rem;
  }

  .header-left {
    flex-direction: column;
    gap: 1rem;
  }
}

.documentation {
  margin: 0 auto;
  max-width: 1200px;
  display: block;
  min-height: 100vh;
  flex-direction: column;
}

@media (min-width: 768px) {
  .documentation {
    flex-direction: row;
  }
}

.sidebar {
  width: 100%;
  background: #f8f8f8;
  padding: 20px;
  border-bottom: 1px solid #eee;
  z-index: 1001;
  overflow-x: auto;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
}

@media (min-width: 768px) {
  .sidebar {
    width: 250px;
    position: fixed;
    height: 100vh;
    border-right: 1px solid #eee;
    border-bottom: none;
    display: block;
  }
}

.sidebar h1 {
  font-size: 1.5em;
  margin-bottom: 20px;
  color: #42b883;
}

nav {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding-bottom: 10px;
}

@media (min-width: 768px) {
  nav {
    flex-direction: column;
    flex-wrap: nowrap;
    padding-bottom: 0;
  }
}

nav a {
  color: #666;
  text-decoration: none;
  padding: 8px 12px;
  border-radius: 4px;
  transition: all 0.3s ease;
}

nav a:hover,
nav a.active {
  color: #42b883;
  background: rgba(66, 184, 131, 0.1);
}

main {
  flex: 1;
  padding: 20px;
  margin-top: 120px; /* Account for fixed sidebar height on mobile */
}

@media (min-width: 768px) {
  main {
    margin-left: 250px;
    padding: 20px 40px;
    margin-top: 0;
    max-width: calc(100vw - 250px);
  }
}

main section {
  min-height: 100vh;
  padding: 40px 0;
  width: 100%;
}

.demo {
  max-width: 100%;
  overflow-x: hidden;
  padding: 10px;
}

@media (max-width: 768px) {
  .demo {
    padding: 5px;
  }
}

/* Common heading styles for all sections */
h2 {
  font-size: 2em;
  margin: 1em 0;
}

h3 {
  font-size: 1.5em;
  margin: 40px 0 20px;
}

h4 {
  margin: 20px 0 10px;
  color: #42b883;
  font-size: 1.2em;
}

pre {
  background: #f6f8fa;
  border-radius: 6px;
  padding: 16px;
  margin: 16px 0;
  overflow-x: auto;
}

pre > code {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', monospace;
  font-size: 14px;
  line-height: 1.5;
}
.links-sidebar {
  width: 200px;
  position: fixed;
  right: 0;
  top: 0;
  height: 100vh;
  background: #f8f8f8;
  padding: 20px;
  border-left: 1px solid #eee;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.draggable-wrapper {
  cursor: move;
  user-select: none;
  position: relative;
  z-index: 1000;
}

.dragee-logo {
  width: 100px;
  height: 100px;
  border-radius: 8px;
  pointer-events: none;
}

.links-container {
  width: 100%;
}

.links-container h3 {
  color: #42b883;
  margin-bottom: 15px;
  text-align: center;
}

.external-link {
  display: block;
  padding: 8px 12px;
  border-radius: 4px;
  text-align: center;
  transition: all 0.3s ease;
}

.external-link:hover {
  background: rgba(66, 184, 131, 0.1);
}

@media (max-width: 1200px) {
  .links-sidebar {
    display: none;
  }
}
</style>