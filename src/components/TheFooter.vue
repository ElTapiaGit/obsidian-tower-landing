<!-- Section 6 — TheFooter: Formulario de contacto + Partículas de luz
  Formulario con borde dorado, botón de envío con explosión de partículas
  Efecto de revelación "La página se levanta" mediante recorte de ruta -->
<template>
  <!-- Reveal wrapper: the main content "lifts" to show footer behind -->
  <div ref="revealWrapper" class="relative">
    <!-- Top edge: visual "reveal" shadow -->
    <div class="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-obsidian-900 to-transparent z-20 pointer-events-none"></div>

    <footer
      id="contacto"
      ref="sectionRef"
      class="relative bg-obsidian-950 pt-32 md:pt-40 pb-12 overflow-hidden"
      aria-label="Contacto"
    >
      <!-- Background decorative elements -->
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-gold-500/30 to-transparent"></div>
        <div class="absolute top-1/4 right-[10%] w-48 h-48 bg-gold-500/[0.03] rounded-full blur-3xl"></div>
        <div class="absolute bottom-1/3 left-[5%] w-64 h-64 bg-gold-500/[0.02] rounded-full blur-3xl"></div>
        <!-- Subtle gold glow at top center for reveal -->
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-gold-500/[0.03] rounded-full blur-3xl"></div>
      </div>

      <div class="section-container relative z-10">
        <div class="max-w-4xl mx-auto">
          <!-- Section header -->
          <div class="text-center mb-16 md:mb-20">
            <p ref="labelRef" class="font-body text-xs uppercase tracking-[0.3em] text-gold-500 mb-4 opacity-0">
              Agenda tu visita privada
            </p>
            <h2 ref="titleRef" class="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 opacity-0 glow-gold-title">
              Conecta con <span class="text-gold-gradient">Nosotros</span>
            </h2>
            <p ref="subtitleRef" class="font-body text-base text-white/40 max-w-lg mx-auto opacity-0">
              Un asesor especializado te guiará por cada detalle de tu futura residencia.
            </p>
          </div>

          <!-- Contact Form -->
          <form
            ref="formRef"
            @submit.prevent="handleSubmit"
            class="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-0"
            novalidate
          >
            <!-- Name -->
            <div class="space-y-2">
              <label for="contact-name" class="font-body text-xs uppercase tracking-wider text-white/30">
                Nombre completo
              </label>
              <input
                id="contact-name"
                v-model="form.name"
                type="text"
                required
                autocomplete="name"
                placeholder="Ingresa tu nombre"
                class="w-full bg-obsidian-900/50 border border-gold-500/20 rounded-lg px-5 py-4
                       font-body text-sm text-white placeholder-white/20
                       focus:border-gold-500/60 focus:outline-none focus:ring-1 focus:ring-gold-500/30
                       transition-all duration-300"
              />
            </div>

            <!-- Email -->
            <div class="space-y-2">
              <label for="contact-email" class="font-body text-xs uppercase tracking-wider text-white/30">
                Correo electrónico
              </label>
              <input
                id="contact-email"
                v-model="form.email"
                type="email"
                required
                autocomplete="email"
                placeholder="tu@email.com"
                class="w-full bg-obsidian-900/50 border border-gold-500/20 rounded-lg px-5 py-4
                       font-body text-sm text-white placeholder-white/20
                       focus:border-gold-500/60 focus:outline-none focus:ring-1 focus:ring-gold-500/30
                       transition-all duration-300"
              />
            </div>

            <!-- Phone -->
            <div class="space-y-2">
              <label for="contact-phone" class="font-body text-xs uppercase tracking-wider text-white/30">
                Teléfono
              </label>
              <input
                id="contact-phone"
                v-model="form.phone"
                type="tel"
                autocomplete="tel"
                placeholder="+1 (555) 000-0000"
                class="w-full bg-obsidian-900/50 border border-gold-500/20 rounded-lg px-5 py-4
                       font-body text-sm text-white placeholder-white/20
                       focus:border-gold-500/60 focus:outline-none focus:ring-1 focus:ring-gold-500/30
                       transition-all duration-300"
              />
            </div>

            <!-- Interest -->
            <div class="space-y-2">
              <label for="contact-interest" class="font-body text-xs uppercase tracking-wider text-white/30">
                Tipo de interés
              </label>
              <select
                id="contact-interest"
                v-model="form.interest"
                class="w-full bg-obsidian-900 border border-gold-500/20 rounded-lg px-5 py-4
                       font-body text-sm text-white/60 cursor-pointer
                       focus:border-gold-500/60 focus:outline-none focus:ring-1 focus:ring-gold-500/30
                       transition-all duration-300 appearance-none"
              >
                <option value="" disabled>Selecciona una opción</option>
                <option value="tipo-a">Residencia Tipo A — 185m²</option>
                <option value="tipo-b">Residencia Tipo B — 240m²</option>
                <option value="penthouse">Penthouse — 420m²</option>
                <option value="inversion">Inversión</option>
              </select>
            </div>

            <!-- Message (full width) -->
            <div class="md:col-span-2 space-y-2">
              <label for="contact-message" class="font-body text-xs uppercase tracking-wider text-white/30">
                Mensaje
              </label>
              <textarea
                id="contact-message"
                v-model="form.message"
                rows="4"
                placeholder="Cuéntanos sobre tu interés en Obsidian Tower..."
                class="w-full bg-obsidian-900/50 border border-gold-500/20 rounded-lg px-5 py-4
                       font-body text-sm text-white placeholder-white/20 resize-none
                       focus:border-gold-500/60 focus:outline-none focus:ring-1 focus:ring-gold-500/30
                       transition-all duration-300"
              ></textarea>
            </div>

            <!-- Submit button with particle canvas -->
            <div class="md:col-span-2 flex justify-center pt-4">
              <div class="relative">
                <!-- Particle canvas behind button -->
                <canvas
                  ref="particleCanvas"
                  class="absolute inset-0 w-full h-full pointer-events-none"
                  aria-hidden="true"
                ></canvas>
                <button
                  ref="submitBtn"
                  type="submit"
                  :disabled="submitting"
                  class="btn-gold rounded-lg text-sm px-12 py-4 relative z-10 cursor-pointer
                         disabled:opacity-50 disabled:cursor-not-allowed"
                  @mouseenter="startParticleGlow"
                  @mouseleave="stopParticleGlow"
                >
                  <span v-if="!submitting">Agendar Visita Privada</span>
                  <span v-else class="flex items-center gap-2">
                    <svg class="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" opacity="0.3"/>
                      <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                    Enviando...
                  </span>
                </button>
              </div>
            </div>
          </form>

          <!-- Success message -->
          <transition
            enter-active-class="transition-all duration-500 ease-out"
            enter-from-class="opacity-0 translate-y-4"
            enter-to-class="opacity-100 translate-y-0"
          >
            <div v-if="submitted" class="text-center mt-12 space-y-3">
              <div class="w-12 h-12 rounded-full border border-gold-500/40 flex items-center justify-center mx-auto">
                <svg class="w-6 h-6 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
              </div>
              <p class="font-display text-2xl text-white">Mensaje enviado</p>
              <p class="font-body text-sm text-white/40">Nuestro equipo se pondrá en contacto contigo pronto.</p>
            </div>
          </transition>
        </div>

        <!-- Footer bottom -->
        <div class="mt-24 pt-8 border-t border-white/5">
          <div class="flex flex-col md:flex-row items-center justify-between gap-6">
            <div class="flex items-center gap-3">
              <svg class="w-6 h-6 text-gold-500" viewBox="0 0 32 32" fill="none">
                <path d="M16 2L28 10V22L16 30L4 22V10L16 2Z" stroke="currentColor" stroke-width="1.5"/>
                <path d="M16 8L22 12V20L16 24L10 20V12L16 8Z" stroke="currentColor" stroke-width="1" opacity="0.6"/>
              </svg>
              <span class="font-display text-sm tracking-wider text-white/60">OBSIDIAN TOWER</span>
            </div>

            <p class="font-body text-xs text-white/20">
              &copy; {{ new Date().getFullYear() }} Obsidian Tower. Todos los derechos reservados.
            </p>

            <div class="flex gap-6">
              <a href="#" class="font-body text-xs text-white/30 hover:text-gold-400 transition-colors duration-300 cursor-pointer" aria-label="Política de privacidad">Privacidad</a>
              <a href="#" class="font-body text-xs text-white/30 hover:text-gold-400 transition-colors duration-300 cursor-pointer" aria-label="Términos y condiciones">Términos</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const revealWrapper = ref(null);
const sectionRef = ref(null);
const labelRef = ref(null);
const titleRef = ref(null);
const subtitleRef = ref(null);
const formRef = ref(null);
const particleCanvas = ref(null);
const submitBtn = ref(null);

const submitting = ref(false);
const submitted = ref(false);

const form = reactive({
  name: '',
  email: '',
  phone: '',
  interest: '',
  message: '',
});

// ─── Particle system for button glow ───
let particleCtx = null;
let particles = [];
let particleAnimFrame = null;
let isGlowing = false;

/** * Define la estructura y el comportamiento físico de cada partícula individual.
 * Controla su posición, velocidad aleatoria y el ciclo de vida (opacidad)
 * para crear un efecto de desvanecimiento orgánico.
 **/
class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = (Math.random() - 0.5) * 2;
    this.vy = (Math.random() - 0.5) * 2;
    this.life = 1;
    this.decay = Math.random() * 0.02 + 0.01;
    this.size = Math.random() * 2 + 0.5;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.life -= this.decay;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(197, 160, 89, ${this.life * 0.6})`;
    ctx.fill();
  }
}

/** * Gestiona el bucle de animación principal del sistema de partículas.
 * Se encarga de limpiar el lienzo, generar nuevas partículas mientras el botón 
 * brilla y actualizar el estado de las existentes en cada fotograma.
 **/
const animateParticles = () => {
  if (!particleCtx || !particleCanvas.value) return;

  const w = particleCanvas.value.width;
  const h = particleCanvas.value.height;
  particleCtx.clearRect(0, 0, w, h);

  // Spawn new particles when glowing
  if (isGlowing) {
    for (let i = 0; i < 2; i++) {
      const edge = Math.random();
      let x, y;
      if (edge < 0.25) { x = Math.random() * w; y = 0; }
      else if (edge < 0.5) { x = w; y = Math.random() * h; }
      else if (edge < 0.75) { x = Math.random() * w; y = h; }
      else { x = 0; y = Math.random() * h; }
      particles.push(new Particle(x, y));
    }
  }

  particles = particles.filter(p => p.life > 0);
  particles.forEach(p => {
    p.update();
    p.draw(particleCtx);
  });

  if (particles.length > 0 || isGlowing) {
    particleAnimFrame = requestAnimationFrame(animateParticles);
  }
};

/** * Inicializa el lienzo de partículas y ajusta su tamaño al del botón de envío.
 * Calcula las coordenadas exactas para que el resplandor dorado (glow) 
 * rodee el botón perfectamente cuando el usuario pasa el cursor.
 **/
const startParticleGlow = () => {
  if (!particleCanvas.value) return;
  isGlowing = true;
  const rect = submitBtn.value.getBoundingClientRect();
  particleCanvas.value.width = rect.width + 40;
  particleCanvas.value.height = rect.height + 40;
  particleCanvas.value.style.width = (rect.width + 40) + 'px';
  particleCanvas.value.style.height = (rect.height + 40) + 'px';
  particleCanvas.value.style.left = '-20px';
  particleCanvas.value.style.top = '-20px';
  particleCtx = particleCanvas.value.getContext('2d');
  animateParticles();
};
/** * Detiene la generación de nuevas partículas de brillo.
 * Permite que las partículas existentes terminen su ciclo de vida de forma natural 
 * en lugar de desaparecer abruptamente, manteniendo la fluidez visual.
 **/
const stopParticleGlow = () => {
  isGlowing = false;
};
/** * Orquesta el proceso de envío del formulario. 
 * Dispara una "explosión" masiva de partículas como respuesta visual al clic
 * y gestiona el estado de carga antes de mostrar el mensaje de éxito.
 **/
const handleSubmit = async () => {
  submitting.value = true;

  // Burst particles on submit
  if (particleCtx && particleCanvas.value) {
    const cx = particleCanvas.value.width / 2;
    const cy = particleCanvas.value.height / 2;
    for (let i = 0; i < 40; i++) {
      const p = new Particle(cx, cy);
      p.vx = (Math.random() - 0.5) * 8;
      p.vy = (Math.random() - 0.5) * 8;
      p.size = Math.random() * 3 + 1;
      particles.push(p);
    }
    isGlowing = true;
    animateParticles();
    setTimeout(() => { isGlowing = false; }, 500);
  }

  // Simulate async submission
  await new Promise(resolve => setTimeout(resolve, 1500));
  submitting.value = false;
  submitted.value = true;
};

onMounted(() => {
  /** * Crea el efecto de "revelación" cinemático del Footer.
   * Utiliza una máscara de recorte (clip-path) que se expande a medida que el usuario 
   * hace scroll, dando la impresión de que la página se levanta para mostrar el final.
   **/
  gsap.fromTo(sectionRef.value,
    {
      clipPath: 'inset(8% 0 0 0)',
      opacity: 0.7,
    },
    {
      clipPath: 'inset(0% 0 0 0)',
      opacity: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: revealWrapper.value,
        start: 'top 80%',
        end: 'top 20%',
        scrub: 1,
      },
    }
  );

  // ── Entrance animations ──
  gsap.set([labelRef.value, titleRef.value, subtitleRef.value], { y: 30 });
  gsap.set(formRef.value, { y: 40 });
  /** * Ejecuta la entrada elegante de los textos y el formulario de contacto.
   * Espera a que la animación de revelado de la sección esté avanzada 
   * para que los campos del formulario aparezcan con un movimiento ascendente.
   **/
  const entranceTl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionRef.value,
      start: 'top 55%',
      toggleActions: 'play none none none',
    },
  });

  entranceTl
    .to(labelRef.value,    { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
    .to(titleRef.value,    { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.3')
    .to(subtitleRef.value, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3')
    .to(formRef.value,     { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' }, '-=0.3');
});

/** * Limpia los procesos activos antes de que el componente sea destruido.
 * Cancela el bucle de animación de partículas y mata los gatillos de ScrollTrigger 
 * para asegurar que no haya colisiones de rendimiento en la siguiente navegación.
 **/
onUnmounted(() => {
  if (particleAnimFrame) cancelAnimationFrame(particleAnimFrame);
  ScrollTrigger.getAll().forEach(st => st.kill());
});
</script>
