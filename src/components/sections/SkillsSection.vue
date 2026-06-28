<script setup>
import { ref } from 'vue';

const topCards = ref([
    {
        titulo: 'Prática & Automação',
        icone: 'bi-gear',
        descricao: 'Valorizo o desenvolvimento que sai da teoria. Gosto de criar ferramentas (CLI, bots) para automatizar fluxos repetitivos no terminal e melhorar o fluxo de trabalho.'
    },
    {
        titulo: 'Arquitetura e Clean Code',
        icone: 'bi-diagram-3',
        descricao: 'Mantenho uma busca constante por escrever códigos sustentáveis. Estudo modelagem de banco, organização de regras de negócio e consumo/criação de APIs RESTful estruturadas.'
    }
]);

const techTags = {
    backend: [
        { name: 'PHP 8+', style: 'bg-[#777bb4] text-[#ffffff]' },
        { name: 'Laravel', style: 'bg-[#ff2d20] text-[#ffffff]' },
        { name: 'Python', style: 'bg-[#3776ab] text-[#ffffff]' },
        { name: 'Go', style: 'bg-[#00add8] text-[#ffffff]' }
    ],
    frontend: [
        { name: 'Vue.js', style: 'bg-[#42b883] text-[#111111]' },
        { name: 'Tailwind CSS', style: 'bg-[#06b6d4] text-[#111111]' },
        { name: 'Livewire', style: 'bg-[#fb70a9] text-[#111111]' },
        { name: 'Alpine.js', style: 'bg-[#8bc0d0] text-[#111111]' }
    ],
    infra: [
        { name: 'Manjaro / WSL', style: 'bg-[#111111] text-[#ffffff]' },
        { name: 'AppSec Basics', style: 'bg-[#0ea5e9] text-[#ffffff]' }
    ],
    ai: [
        { name: 'RAG', style: 'bg-[#9333ea] text-[#ffffff]' },
        { name: 'Embeddings & Chunking', style: 'bg-[#9333ea] text-[#ffffff]' },
        { name: 'Agentes Autônomos', style: 'bg-[#db2777] text-[#ffffff]' },
        { name: 'Prompt Engineering', style: 'bg-[#e34c26] text-[#ffffff]' }
    ]
};
</script>

<template>
    <section id="habilidades" class="min-h-[90vh] flex flex-col justify-start pt-12 pb-12">
        <div class="space-y-8 mb-12">
            <div>
                <h2 class="font-mono text-3xl font-bold mb-4 text-[#111111] dark:text-[#ffffff] flex items-center">
                    <span class="relative inline-flex w-12 h-10 mr-4 items-center justify-center">
                        <span class="absolute inset-0 bg-[#111111] dark:bg-[#FFD60A] translate-x-[4px] translate-y-[4px]"></span>
                        <span class="relative z-10 bg-[#FFD60A] dark:bg-[#111111] border-2 border-[#111111] dark:border-[#FFD60A] text-[#111111] dark:text-[#FFD60A] w-full h-full flex items-center justify-center font-bold text-xl">>_</span>
                    </span>
                    Competências & Foco
                </h2>
                <hr class="border-t-2 border-[#111111] dark:border-[#2a2a2a] w-24" />
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div v-for="(card, index) in topCards" :key="index"
                    class="border-2 border-[#111111] dark:border-[#2a2a2a] bg-[#ffffff] dark:bg-[#111111] p-8 shadow-[6px_6px_0px_0px_#111111] dark:shadow-[6px_6px_0px_0px_#FFD60A] hover:-translate-y-2 transition-all duration-300 flex flex-col">
                    
                    <div class="flex items-center mb-6 min-h-[40px]">
                        <h3 class="relative inline-flex items-center px-3 py-1 font-mono font-bold text-lg md:text-xl border-2 border-[#111111] dark:border-[#FFD60A] bg-[#FFD60A] dark:bg-[#111111] text-[#111111] dark:text-[#FFD60A] shadow-[3px_3px_0px_0px_#111111] dark:shadow-[3px_3px_0px_0px_#FFD60A] self-start transition-colors">
                            <i :class="['bi', card.icone, 'mr-2 text-[#111111] dark:text-[#FFD60A]']"></i>
                            {{ card.titulo }}
                        </h3>
                    </div>

                    <p class="text-sm leading-relaxed text-[#111111] dark:text-[#f3f3f3]">{{ card.descricao }}</p>
                </div>
            </div>
        </div>

        <div class="space-y-8">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                <!-- Back-end -->
                <div class="border-2 border-[#111111] dark:border-[#2a2a2a] bg-[#ffffff] dark:bg-[#111111] p-6 shadow-[6px_6px_0px_0px_#111111] dark:shadow-[6px_6px_0px_0px_#FFD60A] hover:-translate-y-1 transition-all duration-300 flex flex-col">
                    <div class="flex items-center mb-5 min-h-[36px]">
                        <h3 class="relative inline-flex items-center px-3 py-1 font-mono font-bold text-sm md:text-base border-2 border-[#111111] dark:border-[#FFD60A] bg-[#FFD60A] dark:bg-[#111111] text-[#111111] dark:text-[#FFD60A] shadow-[3px_3px_0px_0px_#111111] dark:shadow-[3px_3px_0px_0px_#FFD60A] self-start transition-colors">
                            <i class="bi bi-server mr-2 text-[#111111] dark:text-[#FFD60A]"></i>Back-end
                        </h3>
                    </div>
                    <div class="flex flex-wrap gap-2 mb-4">
                        <span v-for="tech in techTags.backend" :key="tech.name"
                            class="px-3 py-1 border-2 border-[#111111] dark:border-[#000000] text-xs font-mono font-bold shadow-[2px_2px_0px_0px_#111111] dark:shadow-[2px_2px_0px_0px_#000000]"
                            :class="tech.style">
                            {{ tech.name }}
                        </span>
                    </div>
                    <ul class="text-sm text-[#111111] dark:text-[#f3f3f3] space-y-3 font-mono mt-auto">
                        <li>› <strong class="bg-[#27c93f] text-[#111111] px-1.5 py-0.5 border border-[#111111] dark:border-[#000000] shadow-[2px_2px_0px_0px_#111111] dark:shadow-[2px_2px_0px_0px_#000000] mr-1">APIs</strong> Construção e consumo</li>
                        <li>› <strong class="bg-[#ff5f56] text-[#ffffff] px-1.5 py-0.5 border border-[#111111] dark:border-[#000000] shadow-[2px_2px_0px_0px_#111111] dark:shadow-[2px_2px_0px_0px_#000000] mr-1">Arquitetura</strong> MVC na prática</li>
                        <li>› Eloquent ORM e migrations</li>
                    </ul>
                </div>

                <!-- Front-end -->
                <div class="border-2 border-[#111111] dark:border-[#2a2a2a] bg-[#ffffff] dark:bg-[#111111] p-6 shadow-[6px_6px_0px_0px_#111111] dark:shadow-[6px_6px_0px_0px_#FFD60A] hover:-translate-y-1 transition-all duration-300 flex flex-col">
                    <div class="flex items-center mb-5 min-h-[36px]">
                        <h3 class="relative inline-flex items-center px-3 py-1 font-mono font-bold text-sm md:text-base border-2 border-[#111111] dark:border-[#FFD60A] bg-[#FFD60A] dark:bg-[#111111] text-[#111111] dark:text-[#FFD60A] shadow-[3px_3px_0px_0px_#111111] dark:shadow-[3px_3px_0px_0px_#FFD60A] self-start transition-colors">
                            <i class="bi bi-window-sidebar mr-2 text-[#111111] dark:text-[#FFD60A]"></i>Front-end
                        </h3>
                    </div>
                    <div class="flex flex-wrap gap-2">
                        <span v-for="tech in techTags.frontend" :key="tech.name"
                            class="px-3 py-1 border-2 border-[#111111] dark:border-[#000000] text-xs font-mono font-bold shadow-[2px_2px_0px_0px_#111111] dark:shadow-[2px_2px_0px_0px_#000000]"
                            :class="tech.style">
                            {{ tech.name }}
                        </span>
                    </div>
                    <ul class="text-sm text-[#111111] dark:text-[#f3f3f3] space-y-3 font-mono mt-4">
                        <li>› Mobile-first e responsividade</li>
                        <li>› Componentização de UI</li>
                    </ul>
                </div>

                <!-- Infraestrutura & Sec -->
                <div class="border-2 border-[#111111] dark:border-[#2a2a2a] bg-[#ffffff] dark:bg-[#111111] p-6 shadow-[6px_6px_0px_0px_#111111] dark:shadow-[6px_6px_0px_0px_#FFD60A] hover:-translate-y-1 transition-all duration-300 flex flex-col">
                    <div class="flex items-center mb-5 min-h-[36px]">
                        <h3 class="relative inline-flex items-center px-3 py-1 font-mono font-bold text-sm md:text-base border-2 border-[#111111] dark:border-[#FFD60A] bg-[#FFD60A] dark:bg-[#111111] text-[#111111] dark:text-[#FFD60A] shadow-[3px_3px_0px_0px_#111111] dark:shadow-[3px_3px_0px_0px_#FFD60A] self-start transition-colors">
                            <i class="bi bi-pc-display mr-2 text-[#111111] dark:text-[#FFD60A]"></i>Infraestrutura & Sec
                        </h3>
                    </div>
                    <div class="flex flex-wrap gap-2">
                        <span v-for="tech in techTags.infra" :key="tech.name"
                            class="px-3 py-1 border-2 border-[#111111] dark:border-[#000000] text-xs font-mono font-bold shadow-[2px_2px_0px_0px_#111111] dark:shadow-[2px_2px_0px_0px_#000000]"
                            :class="tech.style">
                            {{ tech.name }}
                        </span>
                    </div>
                    <ul class="text-sm text-[#111111] dark:text-[#f3f3f3] space-y-3 font-mono mt-4">
                        <li>› Autonomia de ambiente local</li>
                        <li>› Fundamentos de web security</li>
                    </ul>
                </div>

                <!-- Inteligência Artificial -->
                <div class="border-2 border-[#111111] dark:border-[#2a2a2a] bg-[#ffffff] dark:bg-[#111111] p-6 shadow-[6px_6px_0px_0px_#111111] dark:shadow-[6px_6px_0px_0px_#FFD60A] hover:-translate-y-1 transition-all duration-300 flex flex-col md:col-span-2 lg:col-span-3">
                    <div class="flex items-center mb-5 min-h-[36px]">
                        <h3 class="relative inline-flex items-center px-3 py-1 font-mono font-bold text-sm md:text-base border-2 border-[#111111] dark:border-[#FFD60A] bg-[#FFD60A] dark:bg-[#111111] text-[#111111] dark:text-[#FFD60A] shadow-[3px_3px_0px_0px_#111111] dark:shadow-[3px_3px_0px_0px_#FFD60A] self-start transition-colors">
                            <i class="bi bi-robot mr-2 text-[#111111] dark:text-[#FFD60A]"></i>Estudos em Inteligência Artificial
                        </h3>
                    </div>
                    <div class="flex flex-wrap gap-2">
                        <span v-for="tech in techTags.ai" :key="tech.name"
                            class="px-3 py-1 border-2 border-[#111111] dark:border-[#000000] text-xs font-mono font-bold shadow-[2px_2px_0px_0px_#111111] dark:shadow-[2px_2px_0px_0px_#000000]"
                            :class="tech.style">
                            {{ tech.name }}
                        </span>
                    </div>
                </div>
                
            </div>
        </div>
    </section>
</template>