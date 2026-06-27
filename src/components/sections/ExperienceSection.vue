<template>
    <section id="experiencia" class="min-h-[70vh] flex flex-col justify-start pt-12 pb-12">
        <div class="space-y-8">
            <div>
                <h2 class="font-mono text-3xl font-bold mb-4 text-[#111111] dark:text-[#ffffff] flex items-center">
                    <span class="relative inline-flex w-12 h-10 mr-4 items-center justify-center">
                        <span class="absolute inset-0 bg-[#111111] dark:bg-[#FFD60A] translate-x-[4px] translate-y-[4px]"></span>
                        <span class="relative z-10 bg-[#FFD60A] dark:bg-[#111111] border-2 border-[#111111] dark:border-[#2a2a2a] text-[#111111] dark:text-[#FFD60A] w-full h-full flex items-center justify-center font-bold text-xl">
                            >_
                        </span>
                    </span>
                    git log --experiência
                </h2>
                <hr class="border-t-2 border-[#111111] dark:border-[#2a2a2a] w-24" />
            </div>

            <div class="relative border-l-4 border-[#111111] dark:border-[#2a2a2a] ml-4 md:ml-8 mt-8 space-y-12">

                <!-- commit v1.0 -->
                <div class="relative pl-8 group">
                    <div class="absolute -left-[14px] top-1 w-6 h-6 bg-[#e34f26] border-4 border-[#111111] dark:border-[#f3f3f3] rounded-full group-hover:scale-125 transition-transform">
                    </div>
                    <span class="font-mono text-xs font-bold text-[#111111] bg-[#f3f3f3] border-2 border-[#111111] px-2 py-1 shadow-[2px_2px_0px_0px_#111111]">
                        commit v1.0
                    </span>
                    <h3 class="font-mono font-bold text-xl mt-3 text-[#111111] dark:text-[#ffffff]">
                        init: Fundamentos do Desenvolvimento Web
                    </h3>
                    <p class="text-sm mt-2 text-[#111111] dark:text-[#f3f3f3] leading-relaxed max-w-2xl">
                        Início da jornada fortalecendo a lógica de programação, compreensão do terminal Linux e fundamentos base da web para resolver problemas passo a passo.
                    </p>
                </div>

                <!-- commit v1.2 -->
                <div class="relative pl-8 group">
                    <div class="absolute -left-[14px] top-1 w-6 h-6 bg-[#ff2d20] border-4 border-[#111111] dark:border-[#f3f3f3] rounded-full group-hover:scale-125 transition-transform">
                    </div>
                    <span class="font-mono text-xs font-bold text-[#111111] bg-[#f3f3f3] border-2 border-[#111111] px-2 py-1 shadow-[2px_2px_0px_0px_#111111]">
                        commit v1.2
                    </span>
                    <h3 class="font-mono font-bold text-xl mt-3 text-[#111111] dark:text-[#ffffff]">
                        feat: Ecossistema PHP & Laravel
                    </h3>
                    <p class="text-sm mt-2 text-[#111111] dark:text-[#f3f3f3] leading-relaxed max-w-2xl">
                        Criação de projetos práticos lidando com rotas, manipulação de dados via Eloquent ORM, e modelagem de arquitetura usando o padrão MVC em sistemas reais (gestão, finanças e controle).
                    </p>
                </div>

                <!-- commit v1.3 -->
                <div class="relative pl-8 group">
                    <div class="absolute -left-[14px] top-1 w-6 h-6 bg-[#42b883] border-4 border-[#111111] dark:border-[#f3f3f3] rounded-full group-hover:scale-125 transition-transform">
                    </div>
                    <span class="font-mono text-xs font-bold text-[#111111] bg-[#f3f3f3] border-2 border-[#111111] px-2 py-1 shadow-[2px_2px_0px_0px_#111111]">
                        commit v1.3
                    </span>
                    <h3 class="font-mono font-bold text-xl mt-3 text-[#111111] dark:text-[#ffffff]">
                        merge branch 'front-end' into main
                    </h3>
                    <p class="text-sm mt-2 text-[#111111] dark:text-[#f3f3f3] leading-relaxed max-w-2xl">
                        Utilização contínua do ecossistema Vue.js (incluindo Alpine.js para dinamismo rápido) junto ao Tailwind, complementando a lógica sólida do backend para entregar soluções modernas.
                    </p>
                </div>

                <!-- commit v1.4 -->
                <div class="relative pl-8 group">
                    <div class="absolute -left-[14px] top-1 w-6 h-6 bg-[#FFD60A] border-4 border-[#111111] dark:border-[#f3f3f3] rounded-full group-hover:scale-125 transition-transform">
                    </div>
                    <span class="font-mono text-xs font-bold text-[#111111] bg-[#f3f3f3] border-2 border-[#111111] px-2 py-1 shadow-[2px_2px_0px_0px_#111111]">
                        commit v1.4
                    </span>
                    <h3 class="font-mono font-bold text-xl mt-3 text-[#111111] dark:text-[#ffffff]">
                        feat: Integrações de IA e Automações
                    </h3>
                    <p class="text-sm mt-2 text-[#111111] dark:text-[#f3f3f3] leading-relaxed max-w-2xl">
                        Desenvolvimento ativo de soluções para integrar IA em projetos do dia a dia (RAG, Agentes), explorando CLI com Go e automações baseadas no terminal para otimizar fluxos e processos de código.
                    </p>
                </div>

            </div>
        </div>
    </section>
</template>