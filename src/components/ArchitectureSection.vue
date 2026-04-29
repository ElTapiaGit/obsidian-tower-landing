<!-- ═══════════════════════════════════════════════════
     Section 3 — ArchitectureSection: Split Layout 50/50
     Left side sticky with subtle scroll inertia,
     Right side scrolling images with GSAP "curtain reveal"
     ═══════════════════════════════════════════════════ -->
<template>
  <section
    id="arquitectura"
    ref="sectionRef"
    class="relative bg-obsidian-900 py-0"
    aria-label="Arquitectura"
  >
    <!-- Seamless transition gradient from Hero -->
    <div class="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-obsidian-900 to-transparent z-10 pointer-events-none"></div>

    <div class="flex flex-col lg:flex-row min-h-screen">
      <!-- LEFT: Sticky text panel with subtle inertia -->
      <div class="w-full lg:w-1/2 lg:h-screen lg:sticky lg:top-0 flex items-center">
        <div ref="leftPanel" class="px-8 md:px-12 lg:px-16 xl:px-20 py-20 lg:py-0 max-w-xl mx-auto lg:mx-0 lg:ml-auto">
          <p ref="labelRef" class="font-body text-xs uppercase tracking-[0.3em] text-gold-500 mb-6 opacity-0">
            Diseño Arquitectónico
          </p>
          <h2 ref="headingRef" class="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.05] mb-8 opacity-0 glow-gold-soft">
            Donde el arte<br/>
            <span class="text-gold-gradient">encuentra estructura</span>
          </h2>
          <div ref="dividerRef" class="divider-gold mb-8 opacity-0"></div>
          <p ref="descRef" class="font-body text-base text-white/50 leading-relaxed mb-6 opacity-0">
            Cada línea, cada ángulo y cada material ha sido seleccionado para crear 
            una armonía visual que trasciende lo convencional. Obsidian Tower es el 
            resultado de una visión arquitectónica sin compromisos.
          </p>
          <ul ref="statsRef" class="grid grid-cols-2 gap-6 mt-10 opacity-0">
            <li v-for="stat in stats" :key="stat.label" class="space-y-1">
              <span class="font-display text-3xl md:text-4xl font-bold text-gold-400">{{ stat.value }}</span>
              <p class="font-body text-xs uppercase tracking-wider text-white/40">{{ stat.label }}</p>
            </li>
          </ul>
        </div>
      </div>

      <!-- RIGHT: Scrolling images with curtain reveal -->
      <div ref="rightColumn" class="w-full lg:w-1/2">
        <div class="flex flex-col gap-0">
          <div
            v-for="(image, index) in archImages"
            :key="index"
            ref="imageRefs"
            class="relative w-full h-[70vh] lg:h-screen overflow-hidden"
          >
            <!-- Image with clip-path for curtain reveal -->
            <div
              class="absolute inset-0 clip-reveal-left"
              :data-reveal="index"
            >
              <div
                class="w-full h-full bg-obsidian-700 bg-cover bg-center"
                :style="{ backgroundImage: `url(${image.src})` }"
                role="img"
                :aria-label="image.alt"
              ></div>
              <!-- Image overlay gradient -->
              <div class="absolute inset-0 bg-gradient-to-t from-obsidian-900/60 via-transparent to-transparent"></div>
            </div>

            <!-- Image caption -->
            <div class="absolute bottom-8 left-8 right-8 z-10 opacity-0" :data-caption="index">
              <p class="font-body text-xs uppercase tracking-[0.2em] text-gold-400 mb-2">{{ image.tag }}</p>
              <h3 class="font-display text-2xl md:text-3xl text-white font-semibold">{{ image.title }}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref(null);
const leftPanel = ref(null);
const rightColumn = ref(null);
const labelRef = ref(null);
const headingRef = ref(null);
const dividerRef = ref(null);
const descRef = ref(null);
const statsRef = ref(null);
const imageRefs = ref([]);

const stats = [
  { value: '52',    label: 'Pisos' },
  { value: '210m',  label: 'Altura' },
  { value: '148',   label: 'Residencias' },
  { value: '360°',  label: 'Vistas' },
];

// Placeholder images — replace with real architectural photos
const archImages = [
  {
    src: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80&auto=format&fit=crop',
    alt: 'Vista exterior de Obsidian Tower al atardecer',
    tag: '01 — Exterior',
    title: 'Fachada de Obsidiana',
  },
  {
    src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80&auto=format&fit=crop',
    alt: 'Lobby principal con acabados en mármol negro y oro',
    tag: '02 — Lobby',
    title: 'Gran Vestíbulo',
  },
  {
    src: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80&auto=format&fit=crop',
    alt: 'Terraza panorámica con vista a la ciudad',
    tag: '03 — Terraza',
    title: 'Mirador Celeste',
  },
];

onMounted(() => {
  /** * Configura el estado inicial oculto de los textos y estadísticas, 
   * desplazándolos hacia abajo para que la animación de entrada se sienta ascendente.
   **/
  gsap.set([labelRef.value, headingRef.value, descRef.value, statsRef.value], { y: 30 });
  gsap.set(dividerRef.value, { width: 0 });

  /** * Orquesta la aparición secuencial de los textos en el panel izquierdo. 
   * Se dispara automáticamente cuando el usuario llega al 60% de la sección.
   **/
  const leftTl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionRef.value,
      start: 'top 60%',
      end: 'top 20%',
      scrub: false,
      toggleActions: 'play none none none',
    },
  });
  /* Animaciones de opacidad y posicion */
  leftTl
    .to(labelRef.value,   { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
    .to(headingRef.value,  { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.3')
    .to(dividerRef.value,  { opacity: 1, width: 64, duration: 0.6, ease: 'power3.out' }, '-=0.4')
    .to(descRef.value,     { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3')
    .to(statsRef.value,    { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.3');

  /** * Crea un efecto de inercia sedosa (Parallax) en el panel izquierdo. 
   * El texto se mueve ligeramente mientras el usuario navega por las imágenes de la derecha.
   **/
  gsap.to(leftPanel.value, {
    yPercent: -8,
    ease: 'none',
    scrollTrigger: {
      trigger: rightColumn.value,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 2, // Higher scrub = more "lag" = silky inertia feel
    },
  });

  /** * Ejecuta el efecto de "revelado de cortina" para cada imagen de la derecha. 
   * Utiliza clip-path para mostrar la arquitectura de forma elegante según el scroll.
   **/
  const revealEls = sectionRef.value.querySelectorAll('[data-reveal]');
  const captionEls = sectionRef.value.querySelectorAll('[data-caption]');

  revealEls.forEach((el, i) => {
    gsap.to(el, {
      clipPath: 'inset(0 0% 0 0)',
      ease: 'power2.inOut',
      duration: 1.2,
      scrollTrigger: {
        trigger: el.parentElement,
        start: 'top 75%',
        end: 'top 25%',
        scrub: 1,
      },
    });

    /** * Sincroniza la entrada de los títulos de las imágenes (captions) 
     * para que aparezcan justo después de que la imagen se haya revelado por completo.
     **/
    if (captionEls[i]) {
      gsap.set(captionEls[i], { y: 20 });
      gsap.to(captionEls[i], {
        opacity: 1,
        y: 0,
        ease: 'power3.out',
        duration: 0.8,
        scrollTrigger: {
          trigger: el.parentElement,
          start: 'top 40%',
          toggleActions: 'play none none none',
        },
      });
    }
  });
});

/** * Mata todos los procesos de ScrollTrigger activos en esta sección 
 * para garantizar que la transición a la siguiente página sea limpia y sin errores de cálculo.
 **/
onUnmounted(() => {
  ScrollTrigger.getAll().forEach(st => st.kill());
});
</script>
