<script setup>
    import Navbar from '../components/Navbar.vue';
</script>

<template>
  <div class="min-h-screen flex flex-col bg-white text-[#111] font-sans selection:bg-[#FFD60A] selection:text-black">
    
    <Navbar />

    <main class="flex-grow container mx-auto px-6 py-12 md:py-16 relative">
      
      <slot></slot> 

      <div class="fixed bottom-6 right-6 md:top-28 md:right-10 z-40">
        <button class="bg-white border-2 border-black p-2 text-2xl shadow-[4px_4px_0px_0px_#111] hover:bg-[#111] hover:text-white transition-all active:shadow-none active:translate-x-[2px] active:translate-y-[2px]">
           <i class="ph-bold ph-moon"></i>
        </button>
      </div>

    </main>


  </div>
</template>