<!-- App.vue — OBSIDIAN TOWER Landing Page
  Componente raíz que coordina Lenis + GSAP + todas las secciones-->
<template>
  <div id="obsidian-app" class="bg-obsidian-900 min-h-screen">
    <!-- Preloader -->
    <transition
      leave-active-class="transition-opacity duration-700 ease-out"
      leave-to-class="opacity-0"
    >
      <div
        v-if="loading"
        class="fixed inset-0 z-[100] bg-obsidian-950 flex flex-col items-center justify-center gap-6"
      >
        <svg class="w-12 h-12 text-gold-500 animate-pulse" viewBox="0 0 32 32" fill="none">
          <path d="M16 2L28 10V22L16 30L4 22V10L16 2Z" stroke="currentColor" stroke-width="1.5"/>
          <path d="M16 8L22 12V20L16 24L10 20V12L16 8Z" stroke="currentColor" stroke-width="1" opacity="0.6"/>
          <line x1="16" y1="2" x2="16" y2="30" stroke="currentColor" stroke-width="0.5" opacity="0.3"/>
        </svg>
        <div class="flex flex-col items-center gap-2">
          <span class="font-display text-lg tracking-[0.3em] text-white/80">OBSIDIAN TOWER</span>
          <div class="w-32 h-px bg-obsidian-700 overflow-hidden rounded-full">
            <div
              class="h-full bg-gold-500 transition-all duration-300 ease-out rounded-full"
              :style="{ width: loadProgress + '%' }"
            ></div>
          </div>
        </div>
      </div>
    </transition>

    <!-- Main Content -->
    <TheNavbar />
    <main>
      <HeroCanvas @frames-loaded="onFramesLoaded" />
      <ArchitectureSection />
      <AmenitiesSection />
      <BlueprintSection />
    </main>
    <TheFooter />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// ── Components ──
import TheNavbar from './components/TheNavbar.vue';
import HeroCanvas from './components/HeroCanvas.vue';
import ArchitectureSection from './components/ArchitectureSection.vue';
import AmenitiesSection from './components/AmenitiesSection.vue';
import BlueprintSection from './components/BlueprintSection.vue';
import TheFooter from './components/TheFooter.vue';

gsap.registerPlugin(ScrollTrigger);

// ─── Preloader state ───
const loading = ref(true);
const loadProgress = ref(0);

let lenis = null;
let progressInterval = null;

/** * Lógica del Preloader: Simula el progreso de carga inicial. 
 * Se mantiene activo hasta que el componente HeroCanvas confirma la descarga de fotogramas.
 **/
const startLoadProgress = () => {
  progressInterval = setInterval(() => {
    if (loadProgress.value < 90) {
      loadProgress.value += Math.random() * 8;
    }
  }, 200);
};

/** * Finaliza la secuencia de carga una vez que las imágenes del Hero están listas. 
 * Dispara la transición de salida del preloader.
 **/
const onFramesLoaded = () => {
  if (progressInterval) clearInterval(progressInterval);
  loadProgress.value = 100;
  setTimeout(() => {
    loading.value = false;
  }, 600);
};

const fallbackTimeout = setTimeout(() => {
  if (loading.value) {
    loadProgress.value = 100;
    setTimeout(() => { loading.value = false; }, 400);
  }
}, 8000);

onMounted(() => {
  startLoadProgress();

  /** * Inicialización de Lenis: Motor de desplazamiento suave (Smooth Scroll). 
   * Configura la duración y la inercia para una navegación inmersiva.
   **/
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  });

  /** * Sincronización crítica entre el Scroll Suave y GSAP. 
   * Asegura que los gatillos de ScrollTrigger se disparen en la posición exacta.
   **/
  lenis.on('scroll', ScrollTrigger.update);

  /** * Vincula el refresco de Lenis con el Ticker de GSAP. 
   * Garantiza que las animaciones se ejecuten en cada fotograma del navegador.
   **/
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);
});

onUnmounted(() => {
  if (lenis) lenis.destroy();
  if (progressInterval) clearInterval(progressInterval);
  clearTimeout(fallbackTimeout);
});
</script>
