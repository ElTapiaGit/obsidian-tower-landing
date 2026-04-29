<!-- Section 4 — AmenitiesSection: "Descubrimiento Horizontal"
  Bloquea el desplazamiento vertical → paneo horizontal con efecto parallax
  Presenta: Gimnasio, Piscina, Salón -->
<template>
  <section
    id="amenidades"
    ref="sectionRef"
    class="relative bg-obsidian-950"
    aria-label="Amenidades"
  >
    <!-- Section Header (visible before horizontal scroll) -->
    <div class="h-screen flex items-center justify-center relative">
      <div class="text-center space-y-6">
        <p ref="sectionLabel" class="font-body text-xs uppercase tracking-[0.3em] text-gold-500 opacity-0">
          Experiencias Exclusivas
        </p>
        <h2 ref="sectionTitle" class="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white glow-gold-soft opacity-0">
          Amenidades <span class="text-gold-gradient">de Élite</span>
        </h2>
        <div ref="sectionDivider" class="divider-gold mx-auto opacity-0"></div>
      </div>
    </div>

    <!-- Horizontal scroll wrapper -->
    <div ref="horizontalWrapper" class="relative">
      <div ref="horizontalPin" class="h-screen flex items-center overflow-hidden">
        <div ref="horizontalTrack" class="flex gap-0 will-change-transform" style="width: max-content;">
          <!-- Amenity Card -->
          <div
            v-for="(amenity, index) in amenities"
            :key="amenity.id"
            class="relative w-screen h-screen flex-shrink-0 flex items-center justify-center overflow-hidden"
          >
            <!-- Background with parallax offset -->
            <div
              class="absolute inset-0 bg-obsidian-800 bg-cover bg-center scale-110"
              :data-parallax-bg="index"
              :style="{ backgroundImage: `url(${amenity.bgImage})` }"
              :aria-hidden="true"
            ></div>

            <!-- Dark overlay -->
            <div class="absolute inset-0 bg-obsidian-900/60"></div>

            <!-- Content -->
            <div class="relative z-10 section-container flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              <!-- Number -->
              <div class="flex-shrink-0">
                <span class="font-display text-[120px] md:text-[180px] font-black text-gold-500/10 leading-none select-none">
                  {{ String(index + 1).padStart(2, '0') }}
                </span>
              </div>

              <!-- Text -->
              <div class="max-w-lg space-y-6">
                <p class="font-body text-xs uppercase tracking-[0.3em] text-gold-400">
                  {{ amenity.tag }}
                </p>
                <h3 class="font-display text-4xl md:text-5xl font-bold text-white leading-tight glow-gold-soft">
                  {{ amenity.title }}
                </h3>
                <p class="font-body text-base text-white/50 leading-relaxed">
                  {{ amenity.description }}
                </p>
                <div class="flex flex-wrap gap-4 pt-2">
                  <span
                    v-for="feature in amenity.features"
                    :key="feature"
                    class="px-4 py-2 rounded-full border border-gold-500/20 text-gold-400/80
                           font-body text-xs uppercase tracking-wider"
                  >
                    {{ feature }}
                  </span>
                </div>
              </div>
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
const sectionLabel = ref(null);
const sectionTitle = ref(null);
const sectionDivider = ref(null);
const horizontalWrapper = ref(null);
const horizontalPin = ref(null);
const horizontalTrack = ref(null);

const amenities = [
  {
    id: 'gym',
    tag: 'Fitness & Wellness',
    title: 'Gimnasio\nde Alto Rendimiento',
    description: 'Un espacio de 800m² equipado con tecnología de última generación. Entrenadores personales, zona de CrossFit y estudio de yoga con vista panorámica.',
    features: ['800m²', 'Equipos Technogym', 'Vista 360°', 'Trainer 24/7'],
    bgImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&q=80&auto=format&fit=crop',
  },
  {
    id: 'pool',
    tag: 'Aqua & Relax',
    title: 'Piscina\nInfinita',
    description: 'Suspendida en el piso 48, nuestra piscina infinity edge ofrece la sensación de flotar sobre la ciudad. Agua climatizada durante todo el año.',
    features: ['Piso 48', 'Infinity Edge', 'Climatizada', 'Bar Acuático'],
    bgImage: '/assets/amenities/pool.jpeg',
  },
  {
    id: 'lounge',
    tag: 'Social & Gourmet',
    title: 'Sky\nLounge',
    description: 'Un espacio exclusivo en la cima del edificio para eventos privados. Barra de cócteles, terraza abierta y chef privado bajo las estrellas.',
    features: ['Rooftop', 'Chef Privado', 'Cava de Vinos', 'Eventos'],
    bgImage: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=1920&q=80&auto=format&fit=crop',
  },
];

let horizontalST = null;

onMounted(() => {
  /** * Header: Configura el estado inicial de los textos de cabecera.
   * Establece un desplazamiento hacia abajo (30px) para preparar 
   * la animación de entrada por scroll.
   **/
  gsap.set([sectionLabel.value, sectionTitle.value, sectionDivider.value], { y: 30 });

  /** * Ejecuta la entrada secuencial de los títulos de la sección.
   * Se activa cuando el usuario llega al 60% de la sección,
   * utilizando una curva de potencia para un movimiento elegante.
   **/
  const headerTl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionRef.value,
      start: 'top 60%',
      toggleActions: 'play none none none',
    },
  });

  headerTl
    .to(sectionLabel.value,   { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
    .to(sectionTitle.value,   { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.3')
    .to(sectionDivider.value, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.3');

  // Horizontal scroll pinning 
  const totalWidth = horizontalTrack.value.scrollWidth;
  const viewportWidth = window.innerWidth;
  const scrollDistance = totalWidth - viewportWidth;
  const extraDwell = window.innerHeight * 0.5;

  /** * Gestiona el sistema de "Pinning" (bloqueo) de la sección.
   * Convierte el scroll vertical del usuario en un desplazamiento lateral
   * del contenedor de amenidades, calculando el ancho total dinámicamente.
   **/
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: horizontalWrapper.value,
      start: 'top top',
      end: () => `+=${scrollDistance + extraDwell}`, 
      pin: horizontalPin.value,
      pinSpacing: true,
      scrub: 1, // Suavidad de respuesta al movimiento de la rueda del raton
      anticipatePin: 1, 
      invalidateOnRefresh: true, // Recalcula dimensiones si se cambia el tamaño de ventana
    }
  });

  /** * Anima el movimiento del carrusel horizontal.
   * Desplaza el carril de amenidades hacia la izquierda una distancia 
   * equivalente al ancho sobrante fuera del visor de la pantalla.
   **/
  tl.to(horizontalTrack.value, {
    x: -scrollDistance, 
    ease: 'none',
    duration: scrollDistance,
  });

  /** * Aplica un efecto Parallax profundo a las imágenes de fondo.
   * Al mover los fondos un 80px extra en el eje X, se crea una ilusión 
   * de profundidad frente a los textos y números que viajan encima.
   **/
  const parallaxBgs = sectionRef.value.querySelectorAll('[data-parallax-bg]');
  parallaxBgs.forEach((bg) => {
    tl.to(bg, {
      x: -80,
      ease: 'none',
      duration: scrollDistance,
    }, 0);
  });

  /** * Agrega un tiempo de permanencia adicional (dwell time).
   * Mantiene bloqueada la pantalla al final del carrusel para que el usuario
   * pueda leer la última amenidad antes de que la página siga bajando.
   **/
  tl.to({}, { duration: extraDwell });

  horizontalST = tl.scrollTrigger;
});

/** * Limpieza técnica de la memoria del navegador.
 * Mata específicamente el ScrollTrigger horizontal y limpia cualquier 
 * instancia residual para evitar errores de posicionamiento en el resto de la web.
 **/
onUnmounted(() => {
  if (horizontalST) horizontalST.kill();
  ScrollTrigger.getAll().forEach(st => st.kill());
});
</script>
