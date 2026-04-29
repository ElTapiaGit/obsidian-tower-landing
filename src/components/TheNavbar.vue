<!-- Section 1 — TheNavbar: "The Floating Guardian"-->
<template>
  <nav
    ref="navRef"
    :class="[
      'fixed top-4 left-4 right-4 z-navbar rounded-lg transition-all duration-500 ease-out',
      scrolled
        ? 'bg-obsidian-900/80 backdrop-blur-xl border border-white/5 shadow-lg shadow-black/30'
        : 'bg-transparent border border-transparent'
    ]"
    role="navigation"
    aria-label="Navegación principal"
  >
    <div class="flex items-center justify-between px-6 lg:px-10 py-4">
      <!-- Logo -->
      <a href="#" class="flex items-center gap-3 cursor-pointer group" aria-label="Obsidian Tower - Inicio">
        <svg class="w-8 h-8 text-gold-500 transition-transform duration-300 group-hover:scale-105" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 2L28 10V22L16 30L4 22V10L16 2Z" stroke="currentColor" stroke-width="1.5" fill="none"/>
          <path d="M16 8L22 12V20L16 24L10 20V12L16 8Z" stroke="currentColor" stroke-width="1" fill="none" opacity="0.6"/>
          <line x1="16" y1="2" x2="16" y2="30" stroke="currentColor" stroke-width="0.5" opacity="0.3"/>
        </svg>
        <span class="font-display text-lg tracking-wider text-white/90">OBSIDIAN</span>
      </a>

      <!-- Desktop Navigation -->
      <ul class="hidden md:flex items-center gap-8">
        <li v-for="link in navLinks" :key="link.id">
          <a
            :href="link.href"
            class="font-body text-xs uppercase tracking-[0.2em] text-white/60
                   hover:text-gold-400 transition-colors duration-300 cursor-pointer"
          >
            {{ link.label }}
          </a>
        </li>
      </ul>

      <!-- CTA Button -->
      <a
        href="#contacto"
        class="hidden md:inline-flex btn-gold text-xs rounded cursor-pointer"
      >
        Agendar Visita
      </a>

      <!-- Mobile Menu Toggle -->
      <button
        class="md:hidden p-2 cursor-pointer"
        @click="mobileOpen = !mobileOpen"
        :aria-expanded="mobileOpen"
        aria-label="Abrir menú de navegación"
      >
        <svg class="w-6 h-6 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path v-if="!mobileOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16M4 18h16"/>
          <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>

    <!-- Mobile Menu Dropdown -->
    <transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div v-if="mobileOpen" class="md:hidden px-6 pb-6 border-t border-white/5 mt-2">
        <ul class="flex flex-col gap-4 pt-4">
          <li v-for="link in navLinks" :key="link.id">
            <a
              :href="link.href"
              class="block font-body text-sm uppercase tracking-widest text-white/60
                     hover:text-gold-400 transition-colors duration-300 cursor-pointer py-2"
              @click="mobileOpen = false"
            >
              {{ link.label }}
            </a>
          </li>
          <li class="pt-2">
            <a href="#contacto" class="btn-gold text-xs rounded text-center w-full cursor-pointer" @click="mobileOpen = false">
              Agendar Visita
            </a>
          </li>
        </ul>
      </div>
    </transition>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const scrolled = ref(false);
const mobileOpen = ref(false);
const navRef = ref(null);

const navLinks = [
  { id: 'arch',      label: 'Arquitectura', href: '#arquitectura' },
  { id: 'amenities', label: 'Amenidades',   href: '#amenidades' },
  { id: 'plans',     label: 'Planos',       href: '#planos' },
  { id: 'contact',   label: 'Contacto',     href: '#contacto' },
];

/** * Evalúa la posición del scroll vertical para determinar 
 * si el Navbar debe pasar de transparente a un estado sólido con desenfoque.
 **/
const handleScroll = () => {
  scrolled.value = window.scrollY > 80;
};

/** * Al montar el componente, registra el evento de scroll de forma pasiva 
 * para optimizar el rendimiento y permitir una navegación fluida.
 **/
onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true });
});

/** * Limpia el escucha de eventos al destruir el componente 
 * para prevenir fugas de memoria y procesos innecesarios en segundo plano.
 **/
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>
