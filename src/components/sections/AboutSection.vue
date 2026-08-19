<script setup>
import { ref } from 'vue';
import Terminal from '../ui/Terminal.vue';

const habilidades = ref([
    { 
        nome: 'Integrações IA', 
        icone: 'bi-robot', 
        cor: 'text-[#9333ea]',
        bg: 'bg-[#ffffff] dark:bg-[#111111]',
        texto: 'text-[#111111] dark:text-[#ffffff]'
    },
    { 
        nome: 'Linux / WSL', 
        icone: 'bi-terminal', 
        cor: 'text-[#111111] dark:text-[#ffffff]', 
        bg: 'bg-[#ffffff] dark:bg-[#111111]',
        texto: 'text-[#111111] dark:text-[#ffffff]'
    },
    { 
        nome: 'Gitflow & Commits', 
        icone: 'bi-git', 
        cor: 'text-[#f14e32]',
        bg: 'bg-[#ffffff] dark:bg-[#111111]',
        texto: 'text-[#111111] dark:text-[#ffffff]'
    },
    { 
        nome: 'Inglês Avançado', 
        icone: 'bi-translate', 
        cor: 'text-[#FFD60A]', 
        bg: 'bg-[#ffffff] dark:bg-[#111111]',
        texto: 'text-[#111111] dark:text-[#ffffff]',
        full: true 
    }
]);

const redesSociais = [
    { 
        nome: 'GitHub', 
        icon: 'bi-github', 
        url: 'https://github.com/Elliton-Luis', 
        color: 'text-[#111111] dark:text-[#ffffff]',
        hoverBg: 'hover:bg-[#111111]', 
        hoverText: 'group-hover:text-white' 
    },
    { 
        nome: 'LinkedIn', 
        icon: 'bi-linkedin', 
        url: 'https://www.linkedin.com/in/elliton-luis-correia-da-silva-junior-9779452b3', 
        color: 'text-[#0A66C2]', 
        hoverBg: 'hover:bg-[#0A66C2]', 
        hoverText: 'group-hover:text-white' 
    },
    { 
        nome: 'WhatsApp', 
        icon: 'bi-whatsapp', 
        url: 'https://wa.me/7599988795', 
        color: 'text-[#25D366]', 
        hoverBg: 'hover:bg-[#25D366]', 
        hoverText: 'group-hover:text-white' 
    }
];
</script>

<template>
    <section id="sobre" class="min-h-[90vh] flex flex-col justify-start pt-12 pb-12">
        <div class="space-y-16">
            <!-- Título -->
            <div>
                <h2 class="font-mono text-3xl font-bold mb-4 text-[#111111] dark:text-[#ffffff] flex items-center">
                    <span class="relative inline-flex w-12 h-10 mr-4 items-center justify-center">
                        <span class="absolute inset-0 bg-[#111111] dark:bg-[#FFD60A] translate-x-[4px] translate-y-[4px]"></span>
                        <span class="relative z-10 bg-[#FFD60A] dark:bg-[#111111] border-2 border-[#111111] dark:border-[#FFD60A] text-[#111111] dark:text-[#FFD60A] w-full h-full flex items-center justify-center font-bold text-xl">>_</span>
                    </span>
                    Sobre
                </h2>
                <hr class="border-t-2 border-[#111111] dark:border-[#2a2a2a] w-24" />
            </div>

            <!-- Grid de Habilidades -->
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <div v-for="hab in habilidades" :key="hab.nome"
                    :class="['border-2 border-[#111111] dark:border-[#2a2a2a] p-4 text-center shadow-[3px_3px_0px_0px_#111111] dark:shadow-[3px_3px_0px_0px_#FFD60A] transition-all duration-300 hover:-translate-y-1 hover:shadow-[5px_5px_0px_0px_#111111] dark:hover:shadow-[5px_5px_0px_0px_#FFD60A] cursor-default', hab.full ? 'col-span-2 md:col-span-1' : '', hab.bg]">
                    <i :class="['bi text-2xl mb-2 block transition-transform group-hover:scale-110', hab.icone, hab.cor]"></i>
                    <h4 :class="['font-bold text-sm mb-1', hab.texto]">{{ hab.nome }}</h4>
                </div>
            </div>

            <!-- Container APENAS da Mentalidade -->
            <div class="relative group">
                <div class="absolute inset-0 dark:border-[#2a2a2a] translate-x-2 translate-y-2 transition-transform duration-300 group-hover:translate-x-3 group-hover:translate-y-3"></div>
                
                <div class="relative border-2 border-[#111111] dark:border-[#2a2a2a] bg-[#111111] text-[#ffffff] p-8 md:p-12 shadow-none">
                    <div class="flex items-start gap-6">
                        <div class="hidden md:flex text-[#FFD60A] text-5xl">
                            <i class="bi bi-terminal-fill drop-shadow-[2px_2px_0px_#000000]"></i>
                        </div>
                        <div class="space-y-6 flex-grow">
                            <h2 class="font-mono text-2xl md:text-3xl font-bold flex items-center mb-4">
                                <span class="text-[#FFD60A] mr-3 animate-pulse">_</span> Mentalidade
                            </h2>
                            <p class="text-base md:text-lg leading-relaxed font-sans font-light text-[#f3f3f3]">
                                Eu quero trabalhar, fazer bem o meu trabalho e continuar aprendendo. Gosto de estar em lugares difíceis porque é neles que a evolução acontece. Como desenvolvedor, <span class="bg-[#FFD60A] text-[#111111] px-2 py-0.5 font-bold font-mono text-base shadow-[2px_2px_0px_0px_#ffffff]">meu objetivo</span> é entregar código que funciona. Sem usar termos complexos para parecer superior, sou apenas alguém que estuda bastante, gosta de resolver problemas reais no terminal ou na web, e foca em terminar o dia com o trabalho entregue.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Componente Terminal ISOLADO (Livre da camada invisível) -->
            <div class="relative z-10">
                <Terminal />
            </div>

            <!-- Redes Sociais -->
            <div class="pt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <a v-for="rede in redesSociais" :key="rede.nome"
                    :href="rede.url" target="_blank"
                    :class="[
                        'group border-2 border-[#111111] dark:border-[#2a2a2a] bg-[#ffffff] dark:bg-[#111111] p-6 shadow-[6px_6px_0px_0px_#111111] dark:shadow-[6px_6px_0px_0px_#FFD60A] transition-all duration-300 text-center flex flex-col items-center justify-center',
                        rede.hoverBg, 
                        rede.hoverText
                    ]">
                    <i :class="['bi text-4xl mb-4 transition-colors', rede.icon, rede.color, rede.hoverText]"></i>
                    <p :class="['font-mono font-bold text-lg transition-colors', rede.hoverText]">
                        {{ rede.nome }}
                    </p>
                </a>
            </div>
        </div>
    </section>
</template>