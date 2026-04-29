<!-- Section 5 — Plano interactivo: Al pasar el ratón por encima, se iluminan las zonas y se actualizan los datos técnicos a la izquierda. -->
<template>
  <section
    id="planos"
    ref="sectionRef"
    class="relative bg-obsidian-950 py-24 md:py-32 lg:py-40 overflow-hidden"
    aria-label="Planos interactivos"
  >
    <!-- Grain texture -->
    <div class="absolute inset-0 grain-overlay pointer-events-none"></div>

    <!-- Section Header -->
    <div class="section-container text-center mb-16 md:mb-24">
      <p ref="labelRef" class="font-body text-xs uppercase tracking-[0.3em] text-gold-500 mb-4 opacity-0">
        Planos & Distribución
      </p>
      <h2 ref="titleRef" class="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white opacity-0">
        Blueprint <span class="text-gold-gradient">Interactivo</span>
      </h2>
    </div>

    <!-- Blueprint Content -->
    <div class="section-container">
      <div class="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
        <!-- LEFT: Data panel (updates on hover) -->
        <div class="w-full lg:w-5/12 lg:sticky lg:top-32 space-y-8">
          <!-- Active zone info -->
          <div class="glass-panel rounded-lg p-8 transition-all duration-500">
            <div class="flex items-center gap-4 mb-6">
              <div class="w-3 h-3 rounded-full bg-gold-500 animate-pulse-gold"></div>
              <p class="font-body text-xs uppercase tracking-[0.2em] text-gold-400">
                {{ activeZone.tag }}
              </p>
            </div>

            <h3 class="font-display text-3xl md:text-4xl font-bold text-white mb-4 transition-all duration-300">
              {{ activeZone.name }}
            </h3>

            <p class="font-body text-sm text-white/50 leading-relaxed mb-8">
              {{ activeZone.description }}
            </p>

            <!-- Tech specs grid -->
            <div class="grid grid-cols-2 gap-6">
              <div v-for="spec in activeZone.specs" :key="spec.label" class="space-y-1">
                <span class="font-display text-2xl font-bold text-gold-400">{{ spec.value }}</span>
                <p class="font-body text-[11px] uppercase tracking-wider text-white/30">{{ spec.label }}</p>
              </div>
            </div>
          </div>

          <!-- Floor selector -->
          <div class="flex gap-2 flex-wrap">
            <button
              v-for="floor in floors"
              :key="floor.id"
              :class="[
                'px-4 py-2 rounded font-body text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer',
                activeFloor === floor.id
                  ? 'bg-gold-500 text-obsidian-900 shadow-lg shadow-gold-500/20'
                  : 'border border-white/10 text-white/40 hover:border-gold-500/30 hover:text-gold-400'
              ]"
              @click="activeFloor = floor.id"
              :aria-pressed="activeFloor === floor.id"
            >
              {{ floor.label }}
            </button>
          </div>
        </div>

        <!-- RIGHT: SVG Blueprint -->
        <div class="w-full lg:w-7/12">
          <div
            ref="blueprintRef"
            class="relative w-full aspect-[4/3] rounded-lg overflow-hidden glass-panel p-6 md:p-10 opacity-0"
          >
            <!-- Blueprint SVG (simplified floor plan in golden lines) -->
            <svg
              viewBox="0 0 800 600"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="w-full h-full"
              role="img"
              aria-label="Plano interactivo del piso tipo"
            >
              <!-- Grid lines (subtle) -->
              <g opacity="0.05" stroke="#C5A059">
                <line v-for="i in 16" :key="'v'+i" :x1="i*50" y1="0" :x2="i*50" y2="600" stroke-width="0.5"/>
                <line v-for="i in 12" :key="'h'+i" x1="0" :y1="i*50" x2="800" :y2="i*50" stroke-width="0.5"/>
              </g>

              <!-- Outer walls -->
              <rect x="50" y="50" width="700" height="500" stroke="#C5A059" stroke-width="1.5" opacity="0.6" rx="2"/>

              <!-- Living Room zone -->
              <g
                class="cursor-pointer transition-all duration-300"
                @mouseenter="setActiveZone('living')"
                @mouseleave="resetZone"
              >
                <rect
                  x="50" y="50" width="380" height="300"
                  :fill="hoveredZone === 'living' ? 'rgba(197,160,89,0.08)' : 'transparent'"
                  stroke="#C5A059"
                  :stroke-width="hoveredZone === 'living' ? '2' : '0.8'"
                  :opacity="hoveredZone === 'living' ? '1' : '0.4'"
                  class="transition-all duration-300"
                />
                <text x="240" y="200" text-anchor="middle" fill="#C5A059"
                  :opacity="hoveredZone === 'living' ? '0.9' : '0.3'"
                  class="font-body text-xs uppercase tracking-widest transition-all duration-300"
                  font-size="11"
                >
                  Living Room
                </text>
                <!-- Furniture hints -->
                <rect x="120" y="140" width="80" height="50" rx="4" stroke="#C5A059" stroke-width="0.5"
                  :opacity="hoveredZone === 'living' ? '0.5' : '0.15'" class="transition-all duration-300"/>
                <rect x="260" y="100" width="60" height="40" rx="2" stroke="#C5A059" stroke-width="0.5"
                  :opacity="hoveredZone === 'living' ? '0.5' : '0.15'" class="transition-all duration-300"/>
              </g>

              <!-- Kitchen zone -->
              <g
                class="cursor-pointer transition-all duration-300"
                @mouseenter="setActiveZone('kitchen')"
                @mouseleave="resetZone"
              >
                <rect
                  x="430" y="50" width="320" height="200"
                  :fill="hoveredZone === 'kitchen' ? 'rgba(197,160,89,0.08)' : 'transparent'"
                  stroke="#C5A059"
                  :stroke-width="hoveredZone === 'kitchen' ? '2' : '0.8'"
                  :opacity="hoveredZone === 'kitchen' ? '1' : '0.4'"
                  class="transition-all duration-300"
                />
                <text x="590" y="155" text-anchor="middle" fill="#C5A059"
                  :opacity="hoveredZone === 'kitchen' ? '0.9' : '0.3'"
                  class="font-body text-xs uppercase tracking-widest transition-all duration-300"
                  font-size="11"
                >
                  Kitchen
                </text>
                <!-- Counter -->
                <line x1="450" y1="180" x2="730" y2="180" stroke="#C5A059" stroke-width="0.5"
                  :opacity="hoveredZone === 'kitchen' ? '0.5' : '0.15'" class="transition-all duration-300"/>
              </g>

              <!-- Master Bedroom zone -->
              <g
                class="cursor-pointer transition-all duration-300"
                @mouseenter="setActiveZone('master')"
                @mouseleave="resetZone"
              >
                <rect
                  x="50" y="350" width="350" height="200"
                  :fill="hoveredZone === 'master' ? 'rgba(197,160,89,0.08)' : 'transparent'"
                  stroke="#C5A059"
                  :stroke-width="hoveredZone === 'master' ? '2' : '0.8'"
                  :opacity="hoveredZone === 'master' ? '1' : '0.4'"
                  class="transition-all duration-300"
                />
                <text x="225" y="455" text-anchor="middle" fill="#C5A059"
                  :opacity="hoveredZone === 'master' ? '0.9' : '0.3'"
                  class="font-body text-xs uppercase tracking-widest transition-all duration-300"
                  font-size="11"
                >
                  Master Bedroom
                </text>
                <!-- Bed -->
                <rect x="100" y="400" width="100" height="80" rx="4" stroke="#C5A059" stroke-width="0.5"
                  :opacity="hoveredZone === 'master' ? '0.5' : '0.15'" class="transition-all duration-300"/>
              </g>

              <!-- Bathroom zone -->
              <g
                class="cursor-pointer transition-all duration-300"
                @mouseenter="setActiveZone('bathroom')"
                @mouseleave="resetZone"
              >
                <rect
                  x="430" y="250" width="320" height="300"
                  :fill="hoveredZone === 'bathroom' ? 'rgba(197,160,89,0.08)' : 'transparent'"
                  stroke="#C5A059"
                  :stroke-width="hoveredZone === 'bathroom' ? '2' : '0.8'"
                  :opacity="hoveredZone === 'bathroom' ? '1' : '0.4'"
                  class="transition-all duration-300"
                />
                <text x="590" y="405" text-anchor="middle" fill="#C5A059"
                  :opacity="hoveredZone === 'bathroom' ? '0.9' : '0.3'"
                  class="font-body text-xs uppercase tracking-widest transition-all duration-300"
                  font-size="11"
                >
                  Terrace + Bath
                </text>
                <!-- Tub -->
                <ellipse cx="560" cy="350" rx="40" ry="25" stroke="#C5A059" stroke-width="0.5"
                  :opacity="hoveredZone === 'bathroom' ? '0.5' : '0.15'" class="transition-all duration-300"/>
              </g>

              <!-- Dimensions annotations -->
              <g opacity="0.2" stroke="#C5A059" stroke-width="0.5" stroke-dasharray="4 4">
                <line x1="50" y1="30" x2="750" y2="30"/>
                <text x="400" y="25" text-anchor="middle" fill="#C5A059" font-size="9" class="font-body">18.5m</text>
                <line x1="30" y1="50" x2="30" y2="550"/>
                <text x="20" y="300" text-anchor="middle" fill="#C5A059" font-size="9" class="font-body" transform="rotate(-90, 20, 300)">14.2m</text>
              </g>
            </svg>

            <!-- Glow effect on active zone -->
            <div
              v-if="hoveredZone"
              class="absolute top-0 left-0 w-full h-full pointer-events-none"
              :style="glowStyle"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref(null);
const labelRef = ref(null);
const titleRef = ref(null);
const blueprintRef = ref(null);

const activeFloor = ref('tipo-a');
const hoveredZone = ref(null);

const floors = [
  { id: 'tipo-a', label: 'Tipo A — 185m²' },
  { id: 'tipo-b', label: 'Tipo B — 240m²' },
  { id: 'penthouse', label: 'Penthouse — 420m²' },
];

const zoneData = {
  living: {
    tag: 'Espacio Social',
    name: 'Living Room',
    description: 'Sala principal de concepto abierto con ventanales de piso a techo. Acabados en mármol Nero Marquina y detalles en latón cepillado.',
    specs: [
      { value: '68m²', label: 'Superficie' },
      { value: '3.2m', label: 'Altura' },
      { value: '270°', label: 'Vista' },
      { value: 'Triple', label: 'Acristalamiento' },
    ],
  },
  kitchen: {
    tag: 'Espacio Gourmet',
    name: 'Kitchen',
    description: 'Cocina italiana Boffi con isla central en cuarzo Calacatta. Electrodomésticos Gaggenau completamente integrados.',
    specs: [
      { value: '32m²', label: 'Superficie' },
      { value: 'Boffi', label: 'Cocina' },
      { value: 'Gaggenau', label: 'Equipamiento' },
      { value: 'Cuarzo', label: 'Acabado' },
    ],
  },
  master: {
    tag: 'Suite Principal',
    name: 'Master Bedroom',
    description: 'Habitación principal con walking closet de doble acceso y baño integrado. Sistema de iluminación circadiana automatizada.',
    specs: [
      { value: '45m²', label: 'Superficie' },
      { value: 'Walk-in', label: 'Closet' },
      { value: 'Ensuite', label: 'Baño' },
      { value: 'Smart', label: 'Iluminación' },
    ],
  },
  bathroom: {
    tag: 'Terraza & Baño',
    name: 'Terrace + Bath',
    description: 'Terraza privada con jacuzzi exterior y baño spa con lluvia tropical doble. Piedra natural y griferías Dornbracht.',
    specs: [
      { value: '38m²', label: 'Terraza' },
      { value: 'Jacuzzi', label: 'Exterior' },
      { value: 'Rain', label: 'Ducha' },
      { value: 'Dornbracht', label: 'Grifería' },
    ],
  },
};

const defaultZone = {
  tag: 'Selecciona un área',
  name: 'Explora el Plano',
  description: 'Pasa el mouse sobre las diferentes zonas del plano para ver los detalles técnicos, materiales y dimensiones de cada espacio.',
  specs: [
    { value: '185m²', label: 'Total' },
    { value: '4', label: 'Ambientes' },
    { value: '2', label: 'Baños' },
    { value: '1', label: 'Terraza' },
  ],
};

/** * Propiedad computada que gestiona el cambio de datos en tiempo real. 
 * Si el usuario no está sobre ninguna zona, devuelve la información 
 * general del departamento (estado por defecto).
 **/
const activeZone = computed(() => {
  if (hoveredZone.value && zoneData[hoveredZone.value]) {
    return zoneData[hoveredZone.value];
  }
  return defaultZone;
});

/** * Define el estilo visual del resplandor radial que sigue al cursor.
 * Utiliza una transición suave para que el cambio de iluminación 
 * entre habitaciones no sea brusco.
 **/
const glowStyle = computed(() => {
  return {
    background: 'radial-gradient(circle at 50% 50%, rgba(197,160,89,0.04) 0%, transparent 70%)',
    transition: 'all 0.5s ease',
  };
});

/** * Actualiza la zona activa cuando el puntero del ratón entra en un área 
 * específica del SVG, disparando la actualización de los textos laterales.
 **/
const setActiveZone = (zone) => {
  hoveredZone.value = zone;
};
/** * Limpia el estado de selección al retirar el mouse del plano, 
 * regresando el panel de datos a la vista general del proyecto.
 **/
const resetZone = () => {
  hoveredZone.value = null;
};

onMounted(() => {
  // ── Header entrance ──
  gsap.set([labelRef.value, titleRef.value], { y: 30 });
  /** * Animación de entrada de la cabecera. 
   * Sincroniza el título y la etiqueta con un movimiento ascendente 
   * una vez que la sección entra en el campo de visión del usuario.
   **/
  const headerTl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionRef.value,
      start: 'top bottom',
      toggleActions: 'play none none none',
    },
  });

  headerTl
    .to(labelRef.value, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
    .to(titleRef.value, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.3');

  /** * Controla la aparición física del contenedor del plano.
   * Aplica un ligero desfase en el eje Y para dar la sensación 
   * de que el cristal del plano "aterriza" en la página.
   **/
  gsap.to(blueprintRef.value, {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: blueprintRef.value,
      start: 'top bottom',
      toggleActions: 'play none none none',
    },
  });
  gsap.set(blueprintRef.value, { y: 40 });

  // ── SVG line draw animation ──
  const allRects = sectionRef.value.querySelectorAll('svg rect, svg line, svg ellipse');
  /** * Efecto de "Dibujo Técnico". 
   * Recorre todos los elementos del SVG y anima el 'strokeDashoffset' 
   * para simular que el plano se está trazando a mano en tiempo real 
   * mientras el usuario observa.
   **/
  allRects.forEach((el) => {
    const length = el.getTotalLength ? el.getTotalLength() : 200;
    if (el.getTotalLength) {
      gsap.set(el, { strokeDasharray: length, strokeDashoffset: length });
      gsap.to(el, {
        strokeDashoffset: 0,
        duration: 2,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: sectionRef.value,
          start: 'top bottom',
          toggleActions: 'play none none none',
        },
      });
    }
  });
});

/** * Finaliza todas las instancias de ScrollTrigger de esta sección.
 * Es crucial para evitar que los cálculos del SVG interfieran 
 * con las animaciones de la siguiente sección (Footer).
 **/
onUnmounted(() => {
  ScrollTrigger.getAll().forEach(st => st.kill());
});
</script>
