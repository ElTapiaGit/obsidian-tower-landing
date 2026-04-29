<!-- Section 2 — HeroCanvas: "The Vertical Growth"
  El edificio crece a medida que el usuario se desplaza; el texto lateral se desvanece-->
<template>
  <section
    id="hero"
    ref="sectionRef"
    class="relative w-full"
    :style="{ height: sectionHeight + 'px' }"
    aria-label="Hero — Experiencia inmersiva del edificio"
  >
    <!-- Sticky viewport container -->
    <div class="sticky top-0 w-full h-screen overflow-hidden">
      <!-- Canvas for frame rendering -->
      <canvas
        ref="canvasRef"
        class="absolute inset-0 w-full h-full object-cover"
        aria-hidden="true"
      ></canvas>

      <!-- Dark gradient overlays for text readability -->
      <div class="absolute inset-0 bg-gradient-to-b from-obsidian-900/60 via-transparent to-obsidian-900/80 pointer-events-none"></div>
      <div class="absolute inset-0 bg-gradient-to-r from-obsidian-900/50 via-transparent to-transparent pointer-events-none"></div>

      <!-- Hero text content — fades out on scroll -->
      <div ref="textRef" class="absolute inset-0 flex items-center pointer-events-none z-10">
        <div class="section-container">
          <div class="max-w-xl space-y-6">
            <p ref="taglineRef" class="font-body text-xs uppercase tracking-[0.3em] text-gold-400 opacity-0">
              Luxury Residences
            </p>
            <h1 ref="titleRef" class="font-display text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-[0.9] text-white opacity-0">
              Obsidian<br/>
              <span class="text-gold-gradient">Tower</span>
            </h1>
            <p ref="subtitleRef" class="font-body text-base md:text-lg text-white/60 max-w-md leading-relaxed opacity-0">
              Una experiencia residencial que redefine la vida urbana de lujo. 
              52 pisos de arquitectura visionaria.
            </p>
            <div ref="ctaRef" class="opacity-0 pointer-events-auto">
              <a href="#arquitectura" class="btn-gold-outline rounded cursor-pointer">
                Descubrir más
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div ref="scrollIndicatorRef" class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-0 z-10">
        <span class="font-body text-[10px] uppercase tracking-[0.3em] text-gold-500/60">Scroll</span>
        <div class="w-px h-10 bg-gradient-to-b from-gold-500/60 to-transparent animate-pulse"></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const emit = defineEmits(['frames-loaded']);

// ─── Refs ───
const sectionRef = ref(null);
const canvasRef = ref(null);
const textRef = ref(null);
const taglineRef = ref(null);
const titleRef = ref(null);
const subtitleRef = ref(null);
const ctaRef = ref(null);
const scrollIndicatorRef = ref(null);

// ─── Config ───
const FRAME_COUNT = 77;
const sectionHeight = computed(() => window.innerHeight * 5); // 500vh of scroll space

// ─── State ───
const images = [];
const frameObj = { current: 0 };
let ctx = null;
let canvasWidth = 0;
let canvasHeight = 0;

/** ruta estatica para cada fotograma individual basandose en su indice **/
const framePath = (index) => `/assets/frames/${index}.webp`;

/** 
 * Carga de forma asíncrona todos los fotogramas en memoria 
 * para asegurar que el "scrubbing" sea fluido y no presente 
 * parpadeos durante el scroll. 
**/
const preloadFrames = () => {
  return new Promise((resolve) => {
    let loaded = 0;
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = framePath(i);
      img.onload = () => {
        loaded++;
        if (loaded === FRAME_COUNT) resolve();
      };
      img.onerror = () => {
        loaded++;
        if (loaded === FRAME_COUNT) resolve();
      };
      images[i - 1] = img;
    }
  });
};

/** Dibuja el fotograma correspondiente en el canvas, 
 * calculando el redimensionamiento tipo "cover" para que la imagen 
 * siempre ocupe toda la pantalla sin deformarse. 
**/
const renderFrame = () => {
  if (!ctx || !canvasRef.value) return;

  const frameIndex = Math.min(
    Math.max(Math.round(frameObj.current), 0),
    FRAME_COUNT - 1
  );
  const img = images[frameIndex];

  if (!img || !img.complete || !img.naturalWidth) return;

  // Cover-fit calculation
  const scale = Math.max(
    canvasWidth / img.naturalWidth,
    canvasHeight / img.naturalHeight
  );
  const w = img.naturalWidth * scale;
  const h = img.naturalHeight * scale;
  const x = (canvasWidth - w) / 2;
  const y = (canvasHeight - h) / 2;

  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.drawImage(img, x, y, w, h);
};

/** 
 * Ajusta las dimensiones del canvas al tamaño actual de la ventana y calibra 
 * la escala según la densidad de píxeles (DPR) del monitor para máxima nitidez. 
**/
const handleResize = () => {
  if (!canvasRef.value) return;
  const dpr = window.devicePixelRatio || 1;
  canvasWidth = window.innerWidth;
  canvasHeight = window.innerHeight;
  canvasRef.value.width = canvasWidth * dpr;
  canvasRef.value.height = canvasHeight * dpr;
  ctx.scale(dpr, dpr);
  canvasRef.value.style.width = canvasWidth + 'px';
  canvasRef.value.style.height = canvasHeight + 'px';
  renderFrame();
};

/** 
 * Inicializa la sección: espera a que la precarga de imágenes termine 
 * antes de emitir el evento de carga, permitiendo que el Preloader 
 * de App.vue se retire y comience la intro. 
**/
onMounted(async () => {
  ctx = canvasRef.value.getContext('2d');
  handleResize();

  // Preload frames, then render first
  await preloadFrames();
  renderFrame();
  emit('frames-loaded');

  // Set initial y offset for stagger (before timeline plays)
  gsap.set([taglineRef.value, titleRef.value, subtitleRef.value, ctaRef.value], { y: 30 });

  /** 
   * Secuencia de entrada: anima la aparición de los textos principales 
   * con un ligero retraso para que el usuario se ubique tras el fin del preloader. 
  **/
  const introTl = gsap.timeline({ delay: 0.3 });
  introTl
    .to(taglineRef.value,        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
    .to(titleRef.value,          { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' }, '-=0.5')
    .to(subtitleRef.value,       { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
    .to(ctaRef.value,            { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
    .to(scrollIndicatorRef.value,{ opacity: 1, duration: 0.6 }, '-=0.3');

  /** 
   * Control de fotogramas: vincula el progreso del scroll con el índice de la imagen 
   * en el canvas, permitiendo que el edificio "crezca" según el usuario baja. 
  **/
  ScrollTrigger.create({
    trigger: sectionRef.value,
    start: 'top top',
    end: 'bottom bottom',
    scrub: 0.6,
    animation: gsap.to(frameObj, {
      current: FRAME_COUNT - 1,
      ease: 'none',
      onUpdate: renderFrame,
    }),
  });

  /** 
   * Desvanecimiento de salida: coordina la desaparición del contenido del Hero 
   * mientras el usuario empieza a avanzar hacia la sección de Arquitectura. 
  **/
  ScrollTrigger.create({
    trigger: sectionRef.value,
    start: 'top top',
    end: '20% top',
    scrub: true,
    animation: gsap.to(textRef.value, {
      opacity: 0,
      y: -60,
      ease: 'none',
    }),
  });

  /** 
   * Desvanecimiento de indicador de scroll: coordina la desaparición del indicador de scroll mientras el usuario avanza hacia la sección de Arquitectura. 
  **/
  ScrollTrigger.create({
    trigger: sectionRef.value,
    start: '5% top',
    end: '10% top',
    scrub: true,
    animation: gsap.to(scrollIndicatorRef.value, {
      opacity: 0,
      ease: 'none',
    }),
  });

  window.addEventListener('resize', handleResize);
});

/** 
 * Destruye los eventos y los gatillos de ScrollTrigger 
 * para liberar recursos de la GPU y evitar conflictos de memoria al navegar a otras rutas. 
**/
onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  ScrollTrigger.getAll().forEach(st => st.kill());
});
</script>
