# 🏛️ Obsidian Tower — Luxury Real Estate Landing Page

**Obsidian Tower** es una experiencia digital inmersiva diseñada para el lanzamiento de un complejo residencial de ultra-lujo. Este proyecto utiliza técnicas avanzadas de **Scrollytelling** para transformar una navegación web estándar en un recorrido cinemático de alta gama.

---

## 🚀 Ingeniería del Proyecto

El desarrollo se centra en la fluidez visual y el rendimiento técnico, utilizando un stack moderno para garantizar 60fps en animaciones complejas.

### **Stack Tecnológico**
* **Framework:** [Vue 3.5](https://vuejs.org/) (Composition API)
* **Animaciones:** [GSAP 3.15](https://gsap.com/) (ScrollTrigger)
* **Scroll Suave:** [Lenis](https://github.com/studio-freight/lenis)
* **Estilos:** [Tailwind CSS](https://tailwindcss.com/)
* **Bundler:** [Vite](https://vitejs.dev/)

---

## ✨ Características Destacadas

* **Cinematic Hero Canvas:** Sistema de *video scrubbing* mediante fotogramas renderizados en Canvas 2D para un control total del crecimiento del edificio según el scroll.
* **Horizontal Discovery:** Transición de eje vertical a horizontal para la exhibición de amenidades, rompiendo la monotonía del scroll tradicional.
* **Interactive Blueprint:** Plano técnico interactivo desarrollado en SVG con sistema de detección de zonas y actualización de datos técnicos en tiempo real.
* **Architecture Reveal:** Efectos de "revelado de cortina" (Curtain Reveal) mediante máscaras de recorte dinámicas (clip-path).
* **Particle Engine:** Sistema de partículas nativo en el footer para feedback visual en el CTA de contacto.

---

## 🛠️ Instalación y Uso

1. **Clonar el repositorio:**
   ```bash
   git clone [https://github.com/tu-usuario/obsidian-tower-landing.git](https://github.com/tu-usuario/obsidian-tower-landing.git)

2. **Instalar dependencias:**
    ```bash
    npm install

3. **Ejecutar en desarrollo:**
    ```bash
    npm run dev

4. **Construir para producción:**
    ```bash
    npm run build

--- 

## 📐 Notas de Arquitectura

El proyecto está construido bajo una arquitectura de **componentes altamente cohesionados**. La lógica de animación GSAP y los gatillos de ScrollTrigger se encuentran encapsulados dentro del bloque `<script setup>` de cada sección en `src/components/`. 

Esta estructura garantiza que cada módulo (Hero, Arquitectura, Amenidades, etc.) sea autónomo, manejando su propio ciclo de vida y limpieza de memoria (`onUnmounted`), asegurando una sincronización perfecta con el motor de scroll suave **Lenis**.
