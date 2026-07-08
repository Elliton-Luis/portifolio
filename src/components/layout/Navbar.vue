<script setup>
import { ref, onMounted } from 'vue';
import { useTheme } from '../../composables/useTheme';

const { isDark, toggleTheme } = useTheme();
const isMenuOpen = ref(false);
const activeSection = ref('inicio');

const navItems = [
    { id: '#inicio', label: 'Início' },
    { id: '#habilidades', label: 'Habilidades' },
    { id: '#experiencia', label: 'Experiência' },
    { id: '#projetos', label: 'Projetos' },
    { id: '#sobre', label: 'Sobre' }
];

const contatos = [
    { icon: 'bi-github', url: 'https://github.com/Elliton-Luis', hover: 'hover:bg-[#111111] dark:hover:bg-[#ffffff] dark:hover:text-[#111111]' },
    { icon: 'bi-linkedin', url: 'https://www.linkedin.com/in/elliton-luis-correia-da-silva-junior-9779452b3', hover: 'hover:bg-[#0A66C2]' },
    { icon: 'bi-whatsapp', url: 'https://wa.me/75999488795', hover: 'hover:bg-[#25D366]' }
];

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
};

onMounted(() => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) activeSection.value = entry.target.id;
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('section[id]').forEach((section) => observer.observe(section));
});
</script>

<template>
    <nav class="border-b-4 border-[#111111] dark:border-[#1a1a1a] sticky top-0 z-40 bg-[#f3f3f3] dark:bg-[#050505] w-full transition-colors duration-300">
        <div class="container mx-auto px-6 py-3 flex justify-between items-center relative z-50 bg-[#f3f3f3] dark:bg-[#050505]">
            
            <!-- Logo Original (Terminal) -->
            <a href="#inicio" class="flex items-center gap-4 group cursor-pointer">
                <div class="relative w-12 h-10 flex items-center justify-center">
                    <div class="absolute inset-0 bg-[#111111] dark:bg-[#FFD60A] translate-x-[4px] translate-y-[4px] transition-transform group-hover:translate-x-[2px] group-hover:translate-y-[2px]"></div>
                    <span class="relative z-10 bg-[#FFD60A] dark:bg-[#111111] border-2 border-[#111111] dark:border-[#FFD60A] text-[#111111] dark:text-[#FFD60A] px-3 py-1 font-mono font-bold text-xl flex items-center justify-center w-full h-full transition-transform group-hover:translate-x-[2px] group-hover:translate-y-[2px]">
                        >_
                    </span>
                </div>
                <span class="text-2xl font-black tracking-tight font-sans text-[#111111] dark:text-[#ffffff]">Elliton Luís</span>
            </a>

            <!-- Desktop Nav -->
            <div class="hidden md:flex items-center gap-8">
                <ul class="flex gap-4 text-sm font-bold uppercase tracking-wider font-sans items-center">
                    <li v-for="(item, index) in navItems" :key="index">
                        <a :href="item.id" :class="[
                            'group flex items-center px-4 py-2 border-2 transition-all duration-200',
                            activeSection === item.id.substring(1)
                                ? 'border-[#111111] dark:border-[#FFD60A] bg-[#FFD60A] dark:bg-[#111111] text-[#111111] dark:text-[#FFD60A] shadow-[3px_3px_0px_0px_#111111] dark:shadow-[3px_3px_0px_0px_#FFD60A]'
                                : 'border-transparent text-[#111111] dark:text-[#f3f3f3] hover:border-[#111111] dark:hover:border-[#FFD60A] hover:bg-[#FFD60A] hover:text-[#111111] hover:shadow-[3px_3px_0px_0px_#111111] dark:hover:shadow-[3px_3px_0px_0px_#FFD60A]'
                        ]">
                            <span class="mr-2 font-mono opacity-100">$</span>
                            {{ item.label }}
                        </a>
                    </li>
                </ul>
                
                <!-- Contatos Desktop -->
                <div class="flex gap-2 border-l-2 border-[#111111] dark:border-[#2a2a2a] pl-6">
                    <a v-for="c in contatos" :key="c.icon" :href="c.url" target="_blank" 
                       :class="['group w-10 h-10 flex items-center justify-center rounded-full text-[#111111] dark:text-[#ffffff] hover:text-[#ffffff] transition-all duration-300', c.hover]">
                        <i :class="['bi text-lg', c.icon]"></i>
                    </a>
                </div>
            </div>

            <!-- Botão Mobile -->
            <button @click="toggleMenu" class="md:hidden text-3xl text-[#111111] dark:text-[#ffffff] focus:outline-none hover:text-[#FFD60A] transition-transform duration-200" :class="isMenuOpen ? 'rotate-90' : 'rotate-0'">
                <i :class="isMenuOpen ? 'bi bi-x-lg' : 'bi bi-list'"></i>
            </button>
        </div>

        <!-- Mobile Nav Menu com Animação -->
        <transition name="terminal-slide">
            <div v-show="isMenuOpen" class="md:hidden absolute top-full left-0 w-full bg-[#f3f3f3] dark:bg-[#050505] border-b-4 border-[#111111] dark:border-[#1a1a1a] shadow-[0px_15px_20px_-10px_rgba(0,0,0,0.3)] flex flex-col p-6 gap-6 z-40">
                <ul class="flex flex-col gap-4 text-base font-bold uppercase tracking-wider font-sans">
                    <li v-for="(item, index) in navItems" :key="index">
                        <a :href="item.id" 
                           @click="isMenuOpen = false" 
                           :class="[
                            'flex items-center w-full px-6 py-4 border-2 transition-all duration-200',
                            activeSection === item.id.substring(1)
                                ? 'border-[#111111] dark:border-[#FFD60A] bg-[#FFD60A] dark:bg-[#111111] text-[#111111] dark:text-[#FFD60A] shadow-[4px_4px_0px_0px_#111111] dark:shadow-[4px_4px_0px_0px_#FFD60A] translate-x-[-2px] translate-y-[-2px]'
                                : 'border-transparent text-[#111111] dark:text-[#f3f3f3] hover:border-[#111111] dark:hover:border-[#FFD60A] hover:bg-[#FFD60A] hover:text-[#111111] hover:shadow-[4px_4px_0px_0px_#111111] dark:hover:shadow-[4px_4px_0px_0px_#FFD60A] hover:translate-x-[-2px] hover:translate-y-[-2px]'
                        ]">
                            <span class="mr-4 font-mono text-xl opacity-100">$</span>
                            {{ item.label }}
                        </a>
                    </li>
                </ul>
                
                <!-- Contatos Mobile -->
                <div class="flex justify-center gap-12 mt-4 pt-6 border-t-2 border-[#111111] dark:border-[#2a2a2a]">
                    <a v-for="c in contatos" :key="c.icon" :href="c.url" target="_blank" 
                       :class="['group w-20 h-20 flex items-center justify-center rounded-full text-[#111111] dark:text-[#ffffff] hover:text-[#ffffff] transition-all duration-300 border-2 border-transparent hover:border-[#111111] dark:hover:border-[#FFD60A]', c.hover]">
                        <i :class="['bi text-5xl', c.icon]"></i>
                    </a>
                </div>
            </div>
        </transition>
    </nav>
</template>

<style scoped>
/* Animação suave para o menu abrir parecendo um terminal descendo */
.terminal-slide-enter-active,
.terminal-slide-leave-active {
  transition: all 0.3s ease-out;
  transform-origin: top;
}

.terminal-slide-enter-from,
.terminal-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>