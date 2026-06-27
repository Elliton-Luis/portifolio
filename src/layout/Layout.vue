<script setup>
import { onMounted } from 'vue';
import Navbar from '../components/layout/Navbar.vue';
import Footer from '../components/layout/Footer.vue';
import { useTheme } from '../composables/useTheme';

const { isDark, toggleTheme, initTheme } = useTheme();

onMounted(() => {
    initTheme();
});
</script>

<template>
    <div :class="{ 'dark': isDark }">
        <div class="min-h-screen flex flex-col bg-[#f3f3f3] dark:bg-[#050505] text-[#111111] dark:text-[#f3f3f3] font-sans selection:bg-[#FFD60A] selection:text-[#111111] transition-colors duration-300">
            
            <Navbar />

            <main class="flex-grow container mx-auto px-4 sm:px-6 relative py-12 md:py-16">
                <slot></slot>

                <div class="fixed bottom-6 right-6 md:top-28 md:right-10 z-40">
                    <button @click="toggleTheme" 
                        class="bg-[#ffffff] dark:bg-[#111111] border-2 border-[#111111] dark:border-[#2a2a2a] p-3 text-xl shadow-[4px_4px_0px_0px_#111111] dark:shadow-[4px_4px_0px_0px_#FFD60A] hover:bg-[#FFD60A] dark:hover:bg-[#FFD60A] dark:hover:text-[#111111] hover:text-[#111111] transition-all active:shadow-none active:translate-x-[4px] active:translate-y-[4px]">
                        <i class="bi" :class="isDark ? 'bi-sun-fill' : 'bi-moon-stars-fill'"></i>
                    </button>
                </div>
            </main>

            <Footer />
        </div>
    </div>
</template>