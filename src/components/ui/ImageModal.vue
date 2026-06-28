<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
    images: {
        type: Array,
        required: true,
        default: () => []
    },
    // NOVO: Recebe os títulos passados pelo componente pai
    titles: {
        type: Array,
        default: () => []
    },
    altText: {
        type: String,
        default: 'Imagem do projeto'
    }
});

const emit = defineEmits(['close']);

const currentIndex = ref(0);

const nextImage = (e) => {
    e?.stopPropagation(); // Evita que o clique feche o modal
    currentIndex.value = (currentIndex.value + 1) % props.images.length;
};

const prevImage = (e) => {
    e?.stopPropagation();
    currentIndex.value = (currentIndex.value - 1 + props.images.length) % props.images.length;
};

// Navegação pelo teclado
const handleKeydown = (e) => {
    if (e.key === 'Escape') emit('close');
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
};

onMounted(() => {
    window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown);
});
</script>

<template>
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-[#111111]/80 backdrop-blur-md p-4 md:p-8" @click.self="$emit('close')">
        
        <button @click="$emit('close')" class="absolute top-4 right-4 md:top-8 md:right-8 w-12 h-12 flex items-center justify-center bg-[#ff2d20] text-white border-2 border-[#111111] shadow-[4px_4px_0px_0px_#111111] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-200 z-50">
            <i class="bi bi-x-lg text-xl font-bold"></i>
        </button>

        <div class="relative w-full max-w-5xl max-h-[85vh] flex items-center justify-center flex-col gap-4" @click.stop>
            
            <div class="relative w-full flex items-center justify-center border-4 border-[#111111] dark:border-[#FFD60A] bg-[#111111] shadow-[8px_8px_0px_0px_#FFD60A] overflow-hidden">
                <img v-if="images.length > 0" :src="images[currentIndex]" :alt="`${altText} - Imagem ${currentIndex + 1}`" 
                     class="max-w-full max-h-[65vh] object-contain transition-opacity duration-300" />
            </div>

            <div v-if="images.length > 0" 
                class="w-full md:w-auto px-6 py-2 bg-[#FFD60A] dark:bg-[#111111] border-2 border-[#111111] dark:border-[#FFD60A] shadow-[4px_4px_0px_0px_#111111] dark:shadow-[4px_4px_0px_0px_#FFD60A] text-center mt-2">
                <h4 class="font-mono font-bold text-lg text-[#111111] dark:text-[#FFD60A]">
                    {{ (titles && titles[currentIndex]) ? titles[currentIndex] : `${altText} - ${currentIndex + 1}` }}
                </h4>
            </div>

            <div v-if="images.length > 1" class="flex items-center justify-between w-full md:w-auto md:gap-8 mt-2 bg-[#ffffff] dark:bg-[#111111] border-2 border-[#111111] dark:border-[#FFD60A] p-2 shadow-[4px_4px_0px_0px_#111111] dark:shadow-[4px_4px_0px_0px_#FFD60A]">
                
                <button @click="prevImage" class="w-10 h-10 flex items-center justify-center bg-[#FFD60A] text-[#111111] border-2 border-[#111111] hover:bg-[#111111] hover:text-[#FFD60A] transition-colors">
                    <i class="bi bi-chevron-left text-xl"></i>
                </button>

                <div class="font-mono font-bold text-[#111111] dark:text-[#ffffff] px-4">
                    {{ currentIndex + 1 }} / {{ images.length }}
                </div>

                <button @click="nextImage" class="w-10 h-10 flex items-center justify-center bg-[#FFD60A] text-[#111111] border-2 border-[#111111] hover:bg-[#111111] hover:text-[#FFD60A] transition-colors">
                    <i class="bi bi-chevron-right text-xl"></i>
                </button>
            </div>
            
        </div>
    </div>
</template>