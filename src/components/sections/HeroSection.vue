<script setup>
import { ref } from 'vue';

const heroButtons = ref([
    {
        label: 'Baixar_CV.pdf',
        icon: 'bi-file-earmark-arrow-down-fill',
        url: '/curriculo_elliton_luis.pdf',
        download: true,
        external: false
    },
    {
        label: 'GitHub',
        icon: 'bi-github',
        url: 'https://github.com/Elliton-Luis',
        download: false,
        external: true
    },
    {
        label: 'Projetos',
        icon: 'bi-folder-fill',
        url: '#projetos',
        download: false,
        external: false
    }
]);
</script>

<template>
    <section id="inicio" class="min-h-[85vh] flex flex-col justify-center pb-12 scroll-mt-20">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            <!-- Bloco de Texto Principal -->
            <div class="space-y-8 animate-fade-in-up">
                <div class="space-y-4">
                    <!-- INVERSÃO DE COR APLICADA NO BADGE -->
                    <div class="inline-block bg-[#111111] dark:bg-[#FFD60A] text-[#ffffff] dark:text-[#111111] px-3 py-1 font-mono text-sm border border-[#111111] dark:border-[#000000] shadow-[2px_2px_0px_0px_#FFD60A] dark:shadow-[2px_2px_0px_0px_#000000]">
                        #!/bin/bash
                    </div>
                    
                    <h1 class="font-mono text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-[#111111] dark:text-[#ffffff]">
                        <!-- Sombra ajustada para #000000 no dark mode mantendo o 3D limpo -->
                        <span class="bg-[#FFD60A] text-[#111111] px-2 py-1 inline-block transform -rotate-1 shadow-[3px_3px_0px_0px_#111111] dark:shadow-[3px_3px_0px_0px_#000000]">
                            "Elliton Luís"
                        </span>
                    </h1>
                    
                    <h2 class="font-mono text-xl md:text-2xl font-bold text-[#2a2a2a] dark:text-[#f3f3f3] border-l-4 border-[#FFD60A] pl-4">
                        &lt;Desenvolvedor_FullStack /&gt;
                    </h2>
                </div>

                <hr class="border-t-4 border-[#111111] dark:border-[#2a2a2a] w-16" />

                <p class="text-lg font-medium leading-relaxed max-w-lg text-[#111111] dark:text-[#f3f3f3]">
                    Sempre buscando evoluir construindo ferramentas que resolvem problemas reais. Minha base é o ecossistema <strong class="font-bold text-[#111111] dark:text-[#ffffff]">PHP (Laravel) e Vue.js</strong>, com um interesse forte e prático em automações no <strong class="font-bold text-[#111111] dark:text-[#ffffff]">Linux</strong>, segurança e integração de <strong class="font-bold text-[#111111] dark:text-[#ffffff]">IA</strong>.
                </p>

                <!-- Botões Otimizados (Renderizados via v-for) -->
                <div class="flex flex-col xl:flex-row gap-4 pt-2">
                    <a v-for="(btn, index) in heroButtons" :key="index"
                        :href="btn.url"
                        :download="btn.download ? '' : null"
                        :target="btn.external ? '_blank' : '_self'"
                        class="px-8 py-3.5 bg-[#ffffff] dark:bg-[#111111] text-[#111111] dark:text-[#ffffff] font-mono font-bold border-2 border-[#111111] dark:border-[#000000] shadow-[4px_4px_0px_0px_#111111] dark:shadow-[4px_4px_0px_0px_#FFD60A] hover:bg-[#f3f3f3] dark:hover:bg-[#050505] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer">
                        <i :class="['bi', btn.icon, 'text-lg']"></i> {{ btn.label }}
                    </a>
                </div>
            </div>

            <!-- Bloco da Imagem Estilo Terminal -->
            <div class="flex justify-center lg:justify-end group">
                <div class="relative w-full max-w-md transition-transform duration-500 ease-out group-hover:-translate-y-2">
                    
                    <div class="absolute top-4 right-[-16px] w-full h-full bg-[#FFD60A] border-2 border-[#111111] dark:border-[#000000] transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2"></div>
                    
                    <div class="bg-[#ffffff] dark:bg-[#111111] border-2 border-[#111111] dark:border-[#000000] relative z-10 flex flex-col">
                        
                        <!-- INVERSÃO DE COR APLICADA NO HEADER DO TERMINAL DA FOTO -->
                        <div class="bg-[#111111] dark:bg-[#FFD60A] text-[#ffffff] dark:text-[#111111] font-mono text-xs py-2 px-3 flex justify-between items-center border-b-2 border-[#111111] dark:border-[#000000]">
                            <span class="opacity-80 font-bold">root@elliton:~</span>
                            <div class="flex gap-2">
                                <div class="w-2.5 h-2.5 rounded-full bg-[#FFD60A] dark:bg-[#111111]"></div>
                                <div class="w-2.5 h-2.5 rounded-full bg-[#ffffff] dark:bg-[#111111]"></div>
                                <div class="w-2.5 h-2.5 rounded-full bg-[#FFD60A] dark:bg-[#111111]"></div>
                            </div>
                        </div>
                        
                        <div class="bg-[#f3f3f3] dark:bg-[#050505] h-[320px] sm:h-[420px] lg:h-[500px] w-full flex items-center justify-center relative overflow-hidden">
                            <img src="../../assets/images/foto_perfil.png" alt="Elliton Luís" class="object-cover w-full h-full transition-transform duration-500 hover:scale-105" />
                            
                            <!-- INVERSÃO DE COR APLICADA NO BADGE DE STATUS -->
                            <div class="absolute bottom-4 left-4 bg-[#111111] dark:bg-[#FFD60A] text-[#ffffff] dark:text-[#111111] px-3 py-1.5 text-xs font-mono border border-[#FFD60A] dark:border-[#000000] shadow-[2px_2px_0px_0px_#FFD60A] dark:shadow-[2px_2px_0px_0px_#000000] animate-pulse">
                                $ status: online<span class="animate-ping inline-block w-1.5 h-3 bg-[#FFD60A] dark:bg-[#111111] ml-1 align-middle"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    </section>
</template>