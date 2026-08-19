<script setup>
import { ref } from 'vue';
import ImageModal from '../ui/ImageModal.vue';

const projetos = ref([
    {
        nome: 'Synapse',
        descricao: 'Ferramenta que automatiza e padroniza a geração de mensagens de commit utilizando inteligência artificial, garantindo um histórico limpo.',
        imagens: ['synapse/synapse1.png'],
        titulos: ['Geração Automática de Commit'],
        techs: ['Go', 'IA', 'CLI'],
        github: 'https://github.com/Elliton-Luis/synapse'
    },
    {
        nome: 'AlphaLanches',
        descricao: 'Gestão de lanchonetes com agendamento, controle de pais, gestão de saldo, PDV e análise financeira detalhada.',
        imagens: ['alphaLanches/alphaLanches.jpeg', 'alphaLanches/alphaLanches1.jpeg','alphaLanches/alphaLanches2.jpeg','alphaLanches/alphaLanches3.jpeg','alphaLanches/alphaLanches4.jpeg','alphaLanches/alphaLanches5.jpeg','alphaLanches/alphaLanches6.jpeg'],
        titulos: ['Dashboard Principal', 'PDV', 'Gestão de Saldo', 'Controle de Pais', 'Relatórios', 'Agendamentos', 'Configurações'],
        techs: ['Laravel', 'Livewire', 'Blade', 'Bootstrap'],
        github: '', 
        status: 'privado' 
    },
    {
        nome: 'AlphaControl',
        descricao: 'Sistema desktop projetado para automação de processos locais e controle sistêmico focado em hardware.',
        imagens: ['alphaControl/alphaControl.png'],
        titulos: ['Painel de Controle'],
        techs: ['Java', 'Swing'],
        github: 'https://github.com/ArthurThuko/AlphaControl'
    },
    {
        nome: 'AlphaControl',
        descricao: 'Sistema desktop projetado para automação de processos locais e controle sistêmico focado em hardware.',
        imagens: ['alphaControl/alphaControl.png'],
        titulos: ['Painel de Controle'],
        techs: ['Java', 'Swing'],
        github: 'https://github.com/ArthurThuko/AlphaControl'
    }

]);

const getStatusBadge = (status) => {
    const config = {
        privado: {
            texto: 'Código Fechado (NDA)',
            icone: 'bi-lock-fill',
            classe: 'bg-[#ef4444] text-white border-[#111111] dark:border-[#000000]'
        },
        manutencao: {
            texto: 'Em Manutenção',
            icone: 'bi-tools',
            classe: 'bg-[#f97316] text-[#111111] border-[#111111] dark:border-[#000000]'
        }
    };
    return config[status] || null;
};

const getTechClass = (tech) => {
    const classes = {
        'Vue.js': 'bg-[#42b883] text-[#111111]',
        'Tailwind': 'bg-[#06b6d4] text-[#111111]',
        'Bootstrap': 'bg-[#7952b3] text-white',
        'Alpine.js': 'bg-[#8bc0d0] text-[#111111]',
        'Laravel': 'bg-[#ff2d20] text-white',
        'Livewire': 'bg-[#fb70a9] text-[#111111]',
        'Blade': 'bg-[#B02A24] text-white',
        'Go': 'bg-[#00add8] text-white',
        'Python': 'bg-[#3776ab] text-white',
        'Java': 'bg-[#f89820] text-[#111111]',
        'Swing': 'bg-[#5382a1] text-white',
        'Postgres': 'bg-[#336791] text-white',
        'IA': 'bg-[#9333ea] text-white',
        'CLI': 'bg-[#111111] text-[#FFD60A]',
        'Telegram API': 'bg-[#26A5E4] text-white'
    };
    return classes[tech] || 'bg-gray-700 text-white';
};

const imagensGlobais = import.meta.glob('../../assets/images/**/*.{png,jpg,jpeg,svg,webp,PNG,JPG,JPEG}', { eager: true });

const getImagemUrl = (caminhoArquivo) => {
    if (!caminhoArquivo) return '';
    
    const caminhoCompleto = `../../assets/images/${caminhoArquivo}`;
    
    if (imagensGlobais[caminhoCompleto]) {
        return imagensGlobais[caminhoCompleto].default || imagensGlobais[caminhoCompleto];
    }
    
    console.warn(`[Vite Glob] Arquivo de imagem não encontrado no diretório: ${caminhoCompleto}`);
    return ''; 
};

const isModalOpen = ref(false);
const currentExpandedImages = ref([]);
const currentExpandedImageAlt = ref('');
const currentExpandedImageTitles = ref([]); // NOVO: Ref para os títulos do modal

const openModal = (imagensArray, altText, titulosArray) => {
    if (!imagensArray || imagensArray.length === 0) return;
    
    const urlsResolvidas = [];
    const titulosResolvidos = [];
    
    // Resolve as URLs mantendo a mesma ordem entre imagem e título
    imagensArray.forEach((img, index) => {
        const url = getImagemUrl(img);
        if (url !== '') {
            urlsResolvidas.push(url);
            
            // Pega o título correspondente, ou cria um título padrão (fallback) caso o array de títulos não tenha sido preenchido completamente
            const titulo = (titulosArray && titulosArray[index]) 
                ? titulosArray[index] 
                : `Imagem ${index + 1}`;
                
            titulosResolvidos.push(titulo);
        }
    });
    
    if (urlsResolvidas.length === 0) return;
    
    currentExpandedImages.value = urlsResolvidas;
    currentExpandedImageTitles.value = titulosResolvidos; // Preenche os títulos no modal
    currentExpandedImageAlt.value = altText;
    
    isModalOpen.value = true;
    document.body.style.overflow = 'hidden';
};

const closeModal = () => {
    isModalOpen.value = false;
    currentExpandedImages.value = [];
    currentExpandedImageTitles.value = []; // Limpa os títulos
    document.body.style.overflow = '';
};
</script>

<template>
    <section id="projetos" class="min-h-[90vh] flex flex-col justify-start pt-12 pb-12">
        <div class="space-y-8">
            <div>
                <h2 class="font-mono text-3xl font-bold mb-4 text-[#111111] dark:text-[#ffffff] flex items-center">
                    <span class="relative inline-flex w-12 h-10 mr-4 items-center justify-center">
                        <span class="absolute inset-0 bg-[#111111] dark:bg-[#FFD60A] translate-x-[4px] translate-y-[4px]"></span>
                        <span class="relative z-10 bg-[#FFD60A] dark:bg-[#111111] border-2 border-[#111111] dark:border-[#FFD60A] text-[#111111] dark:text-[#FFD60A] w-full h-full flex items-center justify-center font-bold text-xl">>_</span>
                    </span>
                    Projetos
                </h2>
                <hr class="border-t-2 border-[#111111] dark:border-[#2a2a2a] w-24" />
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div v-for="(projeto, index) in projetos" :key="index" class="group border-2 border-[#111111] dark:border-[#2a2a2a] bg-[#ffffff] dark:bg-[#111111] p-6 md:p-8 shadow-[6px_6px_0px_0px_#111111] dark:shadow-[6px_6px_0px_0px_#FFD60A] hover:-translate-y-2 transition-all duration-300 flex flex-col h-full">

                    <div class="relative w-full h-48 md:h-56 bg-[#f3f3f3] dark:bg-[#2a2a2a] mb-6 border-2 border-[#111111] flex items-center justify-center overflow-hidden cursor-pointer group/img" @click="openModal(projeto.imagens, projeto.nome, projeto.titulos)">
                        <img v-if="projeto.imagens && projeto.imagens.length > 0 && getImagemUrl(projeto.imagens[0])" 
                             :src="getImagemUrl(projeto.imagens[0])" 
                             :alt="projeto.nome" 
                             class="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105" />
                        
                        <div v-else class="w-full h-full flex flex-col items-center justify-center bg-[#e5e5e5] dark:bg-[#1f1f1f] text-[#737373] font-mono p-4 text-center">
                            <i class="bi bi-image text-3xl mb-2"></i>
                            <span class="text-xs">Preview indisponível</span>
                        </div>
                        
                        <div v-if="projeto.imagens && projeto.imagens.length > 0" class="absolute inset-0 bg-[#111111]/60 backdrop-blur-sm opacity-0 group-hover/img:opacity-100 transition-all duration-300 flex flex-col items-center justify-center text-[#FFD60A]">
                            <i :class="['bi text-4xl drop-shadow-[2px_2px_0px_#111111]', projeto.imagens.length > 1 ? 'bi-images' : 'bi-zoom-in']"></i>
                            <span v-if="projeto.imagens.length > 1" class="font-mono font-bold text-sm mt-2 shadow-black drop-shadow-md">Ver Galeria ({{ projeto.imagens.length }})</span>
                        </div>
                    </div>

                    <div class="flex flex-wrap items-center gap-3 mb-4">
                        <h3 class="relative inline-flex items-center justify-center px-3 py-1 font-mono font-bold text-lg border-2 border-[#111111] dark:border-[#FFD60A] bg-[#FFD60A] dark:bg-[#111111] text-[#111111] dark:text-[#FFD60A] shadow-[3px_3px_0px_0px_#111111] dark:shadow-[3px_3px_0px_0px_#FFD60A] self-start transition-colors">
                            {{ projeto.nome }}
                        </h3>
                        
                        <span v-if="projeto.status && getStatusBadge(projeto.status)" 
                              :class="['flex items-center gap-1.5 px-2 py-1 border-2 font-mono font-bold text-xs shadow-[2px_2px_0px_0px_#111111] dark:shadow-[2px_2px_0px_0px_#000000]', getStatusBadge(projeto.status).classe]">
                            <i :class="['bi', getStatusBadge(projeto.status).icone]"></i>
                            {{ getStatusBadge(projeto.status).texto }}
                        </span>
                    </div>
                    
                    <p class="text-sm leading-relaxed mb-6 text-[#111111] dark:text-[#f3f3f3] flex-grow">
                        {{ projeto.descricao }}
                    </p>

                    <div class="flex flex-col gap-6 mt-auto">
                        <div class="flex flex-wrap gap-2">
                            <span v-for="tech in projeto.techs" :key="tech" 
                                class="px-3 py-1 border-2 border-[#111111] dark:border-[#000000] text-xs font-mono font-bold shadow-[2px_2px_0px_0px_#111111] dark:shadow-[2px_2px_0px_0px_#000000]" 
                                :class="getTechClass(tech)">
                                {{ tech }}
                            </span>
                        </div>

                        <template v-if="projeto.status === 'privado'">
                            <div class="flex items-center justify-center gap-3 w-full py-2.5 border-2 border-[#e5e5e5] dark:border-[#2a2a2a] bg-[#f3f3f3] dark:bg-[#1a1a1a] text-[#a3a3a3] dark:text-[#525252] font-mono font-bold text-sm cursor-not-allowed shadow-none select-none">
                                <i class="bi bi-lock-fill text-lg"></i>
                                Repositório Privado
                            </div>
                        </template>
                        <template v-else>
                            <a :href="projeto.github" target="_blank" rel="noopener noreferrer"
                               class="flex items-center justify-center gap-3 w-full py-2.5 border-2 border-[#111111] dark:border-[#FFD60A] bg-[#ffffff] dark:bg-[#111111] text-[#111111] dark:text-[#FFD60A] font-mono font-bold text-sm transition-all duration-300 shadow-[4px_4px_0px_0px_#111111] dark:shadow-[4px_4px_0px_0px_#FFD60A] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#111111] dark:hover:shadow-[2px_2px_0px_0px_#FFD60A] hover:bg-[#111111] hover:text-[#ffffff] dark:hover:bg-[#FFD60A] dark:hover:text-[#111111]">
                                <i class="bi bi-github text-lg"></i>
                                Acessar GitHub
                            </a>
                        </template>
                    </div>
                </div>
            </div>
        </div>

        <ImageModal 
            v-if="isModalOpen" 
            :images="currentExpandedImages" 
            :titles="currentExpandedImageTitles" :altText="currentExpandedImageAlt" 
            @close="closeModal" 
        />
    </section>
</template>