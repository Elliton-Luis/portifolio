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
    { icon: 'bi-github', url: 'https://github.com/Elliton-Luis', hover: 'hover:bg-[#111111] hover:text-white' },
    { icon: 'bi-linkedin', url: 'https://www.linkedin.com/in/elliton-luis-correia-da-silva-junior-9779452b3', hover: 'hover:bg-[#0A66C2] hover:text-white' },
    { icon: 'bi-whatsapp', url: 'https://wa.me/7599995', hover: 'hover:bg-[#25D366] hover:text-white' }
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
        <div class="container mx-auto px-6 py-3 flex justify-between items-center">
            
            <a href="#inicio" class="flex items-center gap-4 z-50 group cursor-pointer">
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
                                ? 'border-[#111111] dark:border-[#FFD60A] bg-[#FFD60A] text-[#111111] shadow-[3px_3px_0px_0px_#111111] dark:shadow-[3px_3px_0px_0px_#FFD60A]'
                                : 'border-transparent text-[#111111] dark:text-[#f3f3f3] hover:border-[#111111] dark:hover:border-[#FFD60A] hover:bg-[#FFD60A] hover:text-[#111111] hover:shadow-[3px_3px_0px_0px_#111111] dark:hover:shadow-[3px_3px_0px_0px_#FFD60A]'
                        ]">
                            <span class="mr-2 font-mono opacity-100">$</span>
                            {{ item.label }}
                        </a>
                    </li>
                </ul>
                
                <!-- Contatos Desktop - Bolhas Sutis -->
                <div class="flex gap-2 border-l-2 border-[#2a2a2a] pl-6">
                    <a v-for="c in contatos" :key="c.icon" :href="c.url" target="_blank" 
                       :class="['w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300', c.hover]">
                        <i :class="['bi text-lg', c.icon]"></i>
                    </a>
                </div>
            </div>

            <button @click="toggleMenu" class="md:hidden text-3xl text-[#111111] dark:text-[#ffffff] focus:outline-none hover:text-[#FFD60A] transition-colors z-50">
                <i :class="isMenuOpen ? 'bi bi-x-lg' : 'bi bi-list'"></i>
            </button>
        </div>
    </nav>
</template>