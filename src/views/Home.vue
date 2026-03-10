<script setup>
import { ref, onMounted, nextTick } from 'vue';

// --- TEMA ---
const isDark = ref(true);

const toggleTheme = () => {
    isDark.value = !isDark.value;
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light');
    updateTheme();
};

const updateTheme = () => {
    if (isDark.value) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
};

// --- MENU MOBILE ---
const isMenuOpen = ref(false);

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
};

// --- SCROLLSPY (Menu Ativo) ---
const activeSection = ref('inicio');

// --- LINKS DO MENU ---
const navItems = [
    { id: '#inicio', label: 'Início' },
    { id: '#habilidades', label: 'Habilidades' },
    { id: '#experiencia', label: 'Experiência' },
    { id: '#projetos', label: 'Projetos' },
    { id: '#sobre', label: 'Sobre' }
];

// --- FUNÇÃO PARA RESOLVER AS IMAGENS NO VITE ---
const getImagemUrl = (nomeArquivo) => {
    if (!nomeArquivo) return '';
    return new URL(`../assets/images/${nomeArquivo}`, import.meta.url).href;
};

// --- DADOS DOS PROJETOS ---
const projetos = ref([
    {
        nome: 'FinTrack',
        descricao: 'Ferramenta de gestão financeira com verificações de saldo, histórico de transações e estatísticas.',
        imagem: 'fintrack.png',
        techs: ['Vue.js', 'Laravel', 'Postgres', 'Tailwind']
    },
    {
        nome: 'NeuroZen',
        descricao: 'Auxilia profissionais da saúde mental a acompanhar pacientes com hábitos gamificados, badges e avatares.',
        imagem: 'neuroZen.jpeg',
        techs: ['Laravel', 'Livewire', 'Blade', 'Alpine.js', 'Tailwind']
    },
    {
        nome: 'AlphaLanches',
        descricao: 'Gestão de lanchonetes com agendamento, controle de pais, gestão de saldo, PDV e análise financeira detalhada.',
        imagem: 'alphaLanches.jpeg',
        techs: ['Laravel', 'Livewire', 'Blade', 'Bootstrap']
    },
    {
        nome: 'Horizo',
        descricao: 'Dose matinal de informação: aplicação que compila e exibe os dados mais relevantes do cenário brasileiro.',
        imagem: 'horizo.jpeg',
        techs: ['Laravel', 'Blade', 'Tailwind']
    },
    {
        nome: 'AlphaControl',
        descricao: 'Sistema desktop projetado para automação de processos locais e controle sistêmico profundo do hardware.',
        imagem: 'alphaControl.png',
        techs: ['Java', 'Swing']
    },
    {
        nome: 'Vitória Vidros',
        descricao: 'Sistema integrado de gestão, acompanhamento de ordens de serviço e orçamentos para vidraçaria.',
        imagem: 'vitoriaVidros.jpeg',
        techs: ['Laravel', 'Livewire', 'Blade', 'Tailwind', 'Alpine.js']
    }
]);

// Mapa de cores para as tecnologias chamando as classes do CSS
const getTechClass = (tech) => {
    const classes = {
        'Vue.js': 'bg-vue text-linux-black',
        'Laravel': 'bg-laravel text-white',
        'Postgres': 'bg-postgres text-white',
        'Livewire': 'bg-livewire text-linux-black',
        'Blade': 'bg-linux-black text-white dark:bg-white dark:text-linux-black',
        'Alpine.js': 'bg-alpine text-linux-black',
        'Tailwind': 'bg-tailwind text-linux-black',
        'Bootstrap': 'bg-bootstrap text-white',
        'Java': 'bg-java text-white',
        'Swing': 'bg-soft-gray text-linux-black dark:bg-linux-black dark:text-soft-gray',
        'Python': 'bg-python text-white'
    };
    return classes[tech] || 'bg-linux-gray text-white dark:bg-white dark:text-linux-black';
};

// --- DADOS DAS HABILIDADES DO 'SOBRE' (FÁCIL MANUTENÇÃO) ---
const sobreHabilidades = ref([
    //{ nome: 'WebSec / OWASP', icone: 'bi-shield-check', cor: 'text-[#4a90e2]', classesExtras: '' },
    { nome: 'Gitflow', icone: 'bi-git', cor: 'text-[#f14e32]', classesExtras: '' },
    { nome: 'Solo Scrum', icone: 'bi-kanban', cor: 'text-[#27c93f]', classesExtras: '' },
    { nome: 'Clean Commits', icone: 'bi-code-square', cor: 'text-[#db2777]', classesExtras: '' },
    { nome: 'Inglês Avançado', icone: 'bi-translate', cor: 'text-[#FFD60A]', classesExtras: 'col-span-2 md:col-span-1' }
]);

// --- MODAL DE IMAGEM (LIGHTBOX) ---
const isImageModalOpen = ref(false);
const currentExpandedImage = ref('');
const currentExpandedImageAlt = ref('');

const openImageModal = (imagemNome, altText) => {
    if (!imagemNome) return;
    currentExpandedImage.value = getImagemUrl(imagemNome);
    currentExpandedImageAlt.value = altText;
    isImageModalOpen.value = true;
    document.body.style.overflow = 'hidden';
};

const closeImageModal = () => {
    isImageModalOpen.value = false;
    currentExpandedImage.value = '';
    document.body.style.overflow = '';
};

// --- TERMINAL INTERATIVO & JOGO CTF ---
const terminalInput = ref('');
const terminalPrefix = ref('root@elliton:~$ ');
const terminalHistory = ref([
    { type: 'output', text: 'Terminal EllitonOS v1.0.0' },
    { type: 'output', text: 'Digite "help" para comandos ou "play" para um desafio DevSecOps.' }
]);
const terminalContentRef = ref(null);
const terminalInputRef = ref(null);

const gameStatus = ref('inactive');
const gameDifficulty = ref('');

const focusTerminal = () => {
    if (terminalInputRef.value) terminalInputRef.value.focus();
};

const executeCommand = async () => {
    const rawInput = terminalInput.value.trim();

    if (!rawInput && gameStatus.value !== 'password') return;

    if (gameStatus.value === 'password') {
        terminalHistory.value.push({ type: 'input', text: `${terminalPrefix.value}` }); // Esconde a senha digitada
    } else {
        terminalHistory.value.push({ type: 'input', text: `${terminalPrefix.value}${rawInput}` });
    }

    const args = rawInput.split(' ').filter(Boolean);
    const cmd = args[0] ? args[0].toLowerCase() : '';

    // Lógica para sair do jogo
    if ((cmd === 'quit' || cmd === 'exit') && gameStatus.value !== 'inactive') {
        gameStatus.value = 'inactive';
        terminalPrefix.value = 'root@elliton:~$ ';
        terminalHistory.value.push({ type: 'output', text: '[!] Conexão SSH encerrada. Retornando ao terminal local.' });
        terminalInput.value = '';
        await nextTick();
        if (terminalContentRef.value) terminalContentRef.value.scrollTop = terminalContentRef.value.scrollHeight;
        return;
    }

    // Seleção de Dificuldade
    if (gameStatus.value === 'select_diff') {
        if (cmd === 'facil' || cmd === 'fácil') {
            gameDifficulty.value = 'facil';
            gameStatus.value = 'playing';
            terminalPrefix.value = 'guest@ctf-server:~$ ';
            terminalHistory.value.push({ type: 'output', text: '[!] MODO FÁCIL: Comandos de dicas ativados.\n\n[ Conectado a 192.168.1.104 ]\nBem-vindo ao servidor de homologação. Você está logado como "guest".\nObjetivo: Escalar privilégios para "root" usando falhas de configuração.\nDica inicial: Digite "hint" se não souber por onde começar.' });
        } else if (cmd === 'dificil' || cmd === 'difícil') {
            gameDifficulty.value = 'dificil';
            gameStatus.value = 'playing';
            terminalPrefix.value = 'guest@ctf-server:~$ ';
            terminalHistory.value.push({ type: 'output', text: '[!] MODO DIFÍCIL: Dicas desativadas. Você está por conta própria.\n\n[ Conectado a 192.168.1.104 ]\nBem-vindo ao servidor de homologação. Você está logado como "guest".\nObjetivo: Escalar privilégios para "root". Enumerar é a chave.' });
        } else {
            terminalHistory.value.push({ type: 'output', text: 'Dificuldade não reconhecida. Digite "facil" ou "dificil".' });
        }
    }
    
    // Inserção da Senha/Token
    else if (gameStatus.value === 'password') {
        if (rawInput === 'vaca_hacker_2026') {
            gameStatus.value = 'inactive';
            terminalPrefix.value = 'root@elliton:~$ ';
            terminalHistory.value.push({
                type: 'output', text: `
 _________________________________________
/         ACESSO ROOT VERIFICADO          \\
|   Parabéns por quebrar a segurança!     |
|                                         |
|        🏆 DEV SEC OPS MASTER 🏆         |
|                                         |
|  Mande uma mensagem no LinkedIn dizendo |
\\  que você encontrou a Vaca Hacker!      /
 -----------------------------------------
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||
` });
        } else {
            gameStatus.value = 'playing';
            terminalPrefix.value = 'guest@ctf-server:~$ ';
            terminalHistory.value.push({ type: 'output', text: 'sys-recovery: Token inválido ou expirado. Acesso negado.' });
        }
    }
    
    // Lógica do Jogo Rodando
    else if (gameStatus.value === 'playing') {
        if (cmd === 'ls') {
            if (args.includes('-a') || args.includes('-la') || args.includes('-al')) {
                terminalHistory.value.push({ type: 'output', text: '.  ..  .bash_history  .env.backup  notas.txt  readme.md' });
            } else {
                terminalHistory.value.push({ type: 'output', text: 'notas.txt  readme.md' });
            }
        } 
        else if (cmd === 'cat') {
            const file = args[1];
            if (file === 'notas.txt') {
                terminalHistory.value.push({ type: 'output', text: 'LEMBRETE DA EQUIPE DEV:\n"Atenção: Não esquecer de limpar o histórico do terminal e apagar backups de variáveis de ambiente do diretório home após o deploy."' });
            } else if (file === 'readme.md') {
                terminalHistory.value.push({ type: 'output', text: '# Servidor de Homologação\nEm caso de perda de acesso administrativo, utilize o utilitário de recuperação do sistema.\nComando: sudo /sbin/sys-recovery\nNota: É necessário possuir o token de autorização atualizado.' });
            } else if (file === '.bash_history') {
                terminalHistory.value.push({ type: 'output', text: 'cd /var/www/html\nnano .env\ncp .env /home/guest/.env.backup\nchmod 777 /home/guest/.env.backup\nsudo /sbin/sys-recovery\nexit' });
            } else if (file === '.env.backup') {
                terminalHistory.value.push({ type: 'output', text: 'APP_ENV=homolog\nAPP_KEY=base64:xpto987...\nDB_CONNECTION=postgres\nDB_PASS=admin123\nSYS_RECOVERY_TOKEN=vaca_hacker_2026' });
            } else if (!file) {
                terminalHistory.value.push({ type: 'output', text: 'cat: falta operando de arquivo' });
            } else {
                terminalHistory.value.push({ type: 'output', text: `cat: ${file}: Arquivo ou diretório inexistente` });
            }
        } 
        else if (cmd === 'sudo') {
            if (args[1] === '-l') {
                terminalHistory.value.push({ type: 'output', text: 'Matching Defaults entries for guest on ctf-server:\n    env_reset, mail_badpass\n\nUser guest may run the following commands on ctf-server:\n    (root) NOPASSWD: /sbin/sys-recovery' });
            } else if (args[1] === '/sbin/sys-recovery' || args[1] === 'sys-recovery') {
                gameStatus.value = 'password';
                terminalPrefix.value = 'Insira o Token de Recuperação: ';
            } else {
                terminalHistory.value.push({ type: 'output', text: `[sudo] password for guest:` });
                terminalHistory.value.push({ type: 'output', text: `sudo: authentication failure` });
            }
        }
        else if (cmd === 'su') {
            terminalHistory.value.push({ type: 'output', text: 'su: Authentication failure' });
        }
        else if (cmd === 'hint') {
            if (gameDifficulty.value === 'facil') {
                terminalHistory.value.push({ type: 'output', text: '[DICA] 1. Liste todos os arquivos, inclusive os ocultos (ls -a).\n2. Leia todos os arquivos de texto para entender o contexto.\n3. O histórico do terminal (.bash_history) sempre entrega os passos de quem usou antes.\n4. Se descobrir um comando restrito, use "sudo <comando>".' });
            } else {
                terminalHistory.value.push({ type: 'output', text: 'bash: hint: comando não habilitado na dificuldade difícil.' });
            }
        } 
        else if (cmd === 'pwd') {
            terminalHistory.value.push({ type: 'output', text: '/home/guest' });
        } 
        else if (cmd === 'whoami') {
            terminalHistory.value.push({ type: 'output', text: 'guest' });
        } 
        else if (cmd === 'clear') {
            terminalHistory.value = [];
        } 
        else {
            terminalHistory.value.push({ type: 'output', text: `bash: ${cmd}: comando não encontrado no ambiente guest.` });
        }
    }
    
    // Lógica do Terminal Padrão (Fora do Jogo)
    else {
        switch (cmd) {
            case 'help':
                terminalHistory.value.push({
                    type: 'output', text: `Comandos úteis:
  about    - Resumo do meu perfil
  skills   - Minhas principais tecnologias
  contact  - Informações de contato e redes
  cv       - Baixar meu currículo (PDF)
  theme    - Alternar modo Dark/Light
  play     - Iniciar minigame de Invasão (CTF Sandbox)
  clear    - Limpar o terminal` });
                break;
            case 'about':
            case 'whoami':
                terminalHistory.value.push({ type: 'output', text: 'Elliton Luís\nDesenvolvedor Full-Stack focado em ecossistema PHP (Laravel), Vue.js e infraestrutura (Linux/WSL).' });
                break;
            case 'skills':
                terminalHistory.value.push({ type: 'output', text: '> Back-end: PHP 8+, Laravel\n> Front-end: Vue.js, Tailwind\n> Infra: Linux, WSL, Automações' });
                break;
            case 'contact':
                terminalHistory.value.push({ type: 'output', text: 'LinkedIn: /in/elliton-luis...\nGitHub: github.com/Elliton-Luis' });
                break;
            case 'cv':
                const link = document.createElement('a');
                link.href = '/curriculo_elliton_luis.pdf';
                link.download = 'Elliton_Luis_CV.pdf';
                link.click();
                terminalHistory.value.push({ type: 'output', text: '> Iniciando download do currículo...' });
                break;
            case 'theme':
                toggleTheme();
                terminalHistory.value.push({ type: 'output', text: `> Tema alterado para ${isDark.value ? 'Dark' : 'Light'} Mode.` });
                break;
            case 'play':
            case 'game':
                gameStatus.value = 'select_diff';
                terminalPrefix.value = 'CTF> ';
                terminalHistory.value.push({ type: 'output', text: '>> INICIANDO PROTOCOLO DE CTF <<\nEscolha a dificuldade digitando "facil" (com dicas) ou "dificil" (sem dicas).' });
                break;
            case 'clear':
                terminalHistory.value = [];
                break;
            case 'ls':
                terminalHistory.value.push({ type: 'output', text: 'projetos/  habilidades/  contato.txt  cv.pdf' });
                break;
            case 'sudo':
                terminalHistory.value.push({ type: 'output', text: 'elliton is not in the sudoers file. This incident will be reported.' });
                break;
            default:
                terminalHistory.value.push({ type: 'output', text: `bash: ${cmd}: comando não encontrado. Digite 'help'.` });
        }
    }

    terminalInput.value = '';

    await nextTick();
    if (terminalContentRef.value) {
        terminalContentRef.value.scrollTop = terminalContentRef.value.scrollHeight;
    }
};

onMounted(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        isDark.value = false;
    }
    updateTheme();
    document.documentElement.classList.add('scroll-smooth');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                activeSection.value = entry.target.id;
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('section[id]').forEach((section) => {
        observer.observe(section);
    });
});
</script>

<template>
    <div :class="{ 'dark': isDark }">
        <div
            class="min-h-screen flex flex-col bg-[#f3f3f3] dark:bg-[#050505] text-[#111111] dark:text-[#f3f3f3] font-sans selection:bg-[#FFD60A] selection:text-[#111111] transition-colors duration-300">

            <nav
                class="border-b-4 border-[#111111] dark:border-[#1a1a1a] sticky top-0 z-40 bg-[#f3f3f3] dark:bg-[#050505] w-full transition-colors duration-300">
                <div class="container mx-auto px-6 py-3 flex justify-between items-center">

                    <a href="#inicio" class="flex items-center gap-4 z-50 group cursor-pointer">
                        <div class="relative w-12 h-10 flex items-center justify-center">
                            <div
                                class="absolute inset-0 bg-[#111111] translate-x-[4px] translate-y-[4px] transition-transform group-hover:translate-x-[2px] group-hover:translate-y-[2px]">
                            </div>
                            <span
                                class="relative z-10 bg-[#FFD60A] border-2 border-[#111111] text-[#111111] px-3 py-1 font-mono font-bold text-xl flex items-center justify-center w-full h-full transition-transform group-hover:translate-x-[2px] group-hover:translate-y-[2px]">
                                >_
                            </span>
                        </div>
                        <span class="text-2xl font-black tracking-tight font-sans text-[#111111] dark:text-[#ffffff]">
                            Elliton Luís
                        </span>
                    </a>

                    <button @click="toggleMenu"
                        class="md:hidden text-3xl text-[#111111] dark:text-[#ffffff] focus:outline-none hover:text-[#FFD60A] transition-colors z-50">
                        <i :class="isMenuOpen ? 'bi bi-x-lg' : 'bi bi-list'"></i>
                    </button>

                    <ul class="hidden md:flex gap-6 text-sm font-bold uppercase tracking-wider font-sans items-center">
                        <li v-for="(item, index) in navItems" :key="index">
                            <a :href="item.id" :class="[
                                'group flex items-center px-4 py-2 border-2 transition-all duration-200',
                                activeSection === item.id.substring(1)
                                    ? 'border-[#111111] dark:border-[#FFD60A] bg-[#FFD60A] text-[#111111] shadow-[3px_3px_0px_0px_#111111] dark:shadow-[3px_3px_0px_0px_#000000]'
                                    : 'border-transparent text-[#111111] dark:text-[#f3f3f3] hover:border-[#111111] dark:hover:border-[#FFD60A] hover:bg-[#FFD60A] dark:hover:bg-[#FFD60A] hover:text-[#111111] dark:hover:text-[#111111] hover:shadow-[3px_3px_0px_0px_#111111] dark:hover:shadow-[3px_3px_0px_0px_#000000]'
                            ]">
                                <span class="font-mono font-black mr-2 text-base transition-opacity duration-200"
                                    :class="activeSection === item.id.substring(1) ? 'opacity-100 text-[#111111]' : 'opacity-0 group-hover:opacity-100 text-[#111111]'">$</span>
                                {{ item.label }}
                            </a>
                        </li>
                    </ul>

                    <div
                        class="hidden md:flex gap-4 text-xl border-l-2 border-[#2a2a2a] pl-6 items-center text-[#111111] dark:text-[#f3f3f3]">
                        <a href="https://github.com/Elliton-Luis" target="_blank"
                            class="hover:text-[#FFD60A] hover:scale-110 transition-all"><i class="bi bi-github"></i></a>
                        <a href="https://www.linkedin.com/in/elliton-luis-correia-da-silva-junior-9779452b3"
                            target="_blank" class="hover:text-[#0A66C2] hover:scale-110 transition-all"><i
                                class="bi bi-linkedin"></i></a>
                        <a href="https://wa.me/75999488795" target="_blank"
                            class="hover:text-[#25D366] hover:scale-110 transition-all"><i
                                class="bi bi-whatsapp"></i></a>

                        <button @click="toggleTheme"
                            class="ml-2 bg-[#f3f3f3] dark:bg-[#111111] border-2 border-[#111111] dark:border-[#2a2a2a] px-3 py-1 text-sm font-mono shadow-[2px_2px_0px_0px_#111111] dark:shadow-[2px_2px_0px_0px_#000000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none hover:bg-[#FFD60A] dark:hover:bg-[#FFD60A] dark:hover:text-[#111111] dark:hover:border-[#111111] transition-all">
                            <i class="bi" :class="isDark ? 'bi-sun-fill' : 'bi-moon-stars-fill'"></i>
                        </button>
                    </div>
                </div>
            </nav>

            <div v-if="isMenuOpen" @click="toggleMenu"
                class="fixed inset-0 bg-black/80 z-30 md:hidden backdrop-blur-sm transition-opacity duration-300"></div>

            <aside :class="isMenuOpen ? 'translate-x-0' : '-translate-x-full'"
                class="fixed top-0 left-0 h-full w-[80%] max-w-sm bg-[#f3f3f3] dark:bg-[#050505] border-r-4 border-[#111111] dark:border-[#2a2a2a] z-40 transform transition-transform duration-300 ease-in-out md:hidden shadow-[10px_0px_0px_0px_#111111] dark:shadow-[10px_0px_0px_0px_#000000] flex flex-col pt-28 pb-6 px-6">
                <ul
                    class="flex flex-col gap-4 text-lg font-bold uppercase tracking-wider font-sans text-[#111111] dark:text-[#f3f3f3]">
                    <li v-for="(item, index) in navItems" :key="index">
                        <a :href="item.id" @click="toggleMenu" :class="[
                            'group flex items-center py-3 px-4 border-2 transition-all duration-200',
                            activeSection === item.id.substring(1)
                                ? 'border-[#111111] dark:border-[#ffffff] bg-[#FFD60A] text-[#111111] shadow-[4px_4px_0px_0px_#111111] dark:shadow-[4px_4px_0px_0px_#000000]'
                                : 'border-transparent hover:border-[#111111] dark:hover:border-[#ffffff] hover:bg-[#FFD60A] dark:hover:bg-[#FFD60A] hover:text-[#111111] dark:hover:text-[#111111] hover:shadow-[4px_4px_0px_0px_#111111] dark:hover:shadow-[4px_4px_0px_0px_#000000]'
                        ]">
                            <span
                                :class="['font-mono font-black mr-3 transition-opacity duration-200', activeSection === item.id.substring(1) ? 'opacity-100 text-[#111111]' : 'opacity-0 group-hover:opacity-100 text-[#111111] dark:text-[#111111]']">$</span>
                            {{ item.label }}
                        </a>
                    </li>
                </ul>
                <div class="mt-auto">
                    <div
                        class="bg-[#ffffff] dark:bg-[#111111] p-4 border-2 border-[#111111] dark:border-[#2a2a2a] shadow-[4px_4px_0px_0px_#111111] dark:shadow-[4px_4px_0px_0px_#000000]">
                        <p class="font-mono text-xs text-center mb-4 text-[#111111] dark:text-[#f3f3f3]">Conecte-se
                            comigo:</p>
                        <div class="flex gap-6 text-3xl text-[#111111] dark:text-[#f3f3f3] justify-center items-center">
                            <a href="https://github.com/Elliton-Luis" target="_blank"
                                class="hover:text-[#FFD60A] transition-colors"><i class="bi bi-github"></i></a>
                            <a href="https://www.linkedin.com/in/elliton-luis-correia-da-silva-junior-9779452b3"
                                target="_blank" class="hover:text-[#0A66C2] transition-colors"><i
                                    class="bi bi-linkedin"></i></a>
                            <a href="https://wa.me/75999488795" target="_blank"
                                class="hover:text-[#25D366] transition-colors"><i class="bi bi-whatsapp"></i></a>
                            <button @click="toggleTheme"
                                class="ml-2 pl-4 border-l-2 border-[#2a2a2a] hover:text-[#FFD60A] transition-colors">
                                <i class="bi" :class="isDark ? 'bi-sun-fill' : 'bi-moon-stars-fill'"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </aside>

            <main class="flex-grow container mx-auto px-4 sm:px-6 relative">

                <section id="inicio" class="min-h-[85vh] flex flex-col justify-center pb-12 scroll-mt-20 pt-10">
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <div class="space-y-8 animate-fade-in-up">
                            <div class="space-y-4">
                                <div
                                    class="inline-block bg-[#111111] text-[#ffffff] px-3 py-1 font-mono text-sm border border-[#111111] shadow-[2px_2px_0px_0px_#FFD60A]">
                                    #!/bin/bash
                                </div>
                                <h1
                                    class="font-mono text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-[#111111] dark:text-[#ffffff]">
                                    <span
                                        class="bg-[#FFD60A] text-[#111111] px-2 py-1 inline-block transform -rotate-1 shadow-[3px_3px_0px_0px_#111111] dark:shadow-[3px_3px_0px_0px_#ffffff]">"Elliton
                                        Luís"</span>
                                </h1>
                                <h2
                                    class="font-mono text-xl md:text-2xl font-bold text-[#2a2a2a] dark:text-[#f3f3f3] border-l-4 border-[#FFD60A] pl-4">
                                    &lt;Desenvolvedor_FullStack /&gt;
                                </h2>
                            </div>

                            <hr class="border-t-4 border-[#111111] dark:border-[#2a2a2a] w-16" />

                            <p class="text-lg font-medium leading-relaxed max-w-lg text-[#111111] dark:text-[#f3f3f3]">
                                Focado na construção de aplicações reais e funcionais. Minha abordagem une a prática
                                constante com o ecossistema <strong
                                    class="font-bold text-[#111111] dark:text-[#ffffff]">PHP moderno</strong> à
                                busca por autonomia em infraestrutura <strong
                                    class="font-bold text-[#111111] dark:text-[#ffffff]">Linux</strong> e integração de
                                <strong class="font-bold text-[#111111] dark:text-[#ffffff]">IA</strong>.
                            </p>

                            <div class="flex flex-col xl:flex-row gap-4 pt-2">
                                <a href="/curriculo.pdf"
                                    download="Elliton_Luis_CV.pdf"
                                    class="px-8 py-3.5 bg-[#ffffff] dark:bg-[#111111] text-[#111111] dark:text-[#ffffff] font-mono font-bold border-2 border-[#111111] dark:border-[#2a2a2a] shadow-[4px_4px_0px_0px_#111111] dark:shadow-[4px_4px_0px_0px_#FFD60A] hover:bg-[#f3f3f3] dark:hover:bg-[#050505] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer">
                                    <i class="bi bi-file-earmark-arrow-down-fill text-lg"></i> Baixar_CV.pdf
                                </a>

                                <a href="https://github.com/Elliton-Luis" target="_blank"
                                    class="px-8 py-3.5 bg-[#ffffff] dark:bg-[#111111] text-[#111111] dark:text-[#ffffff] font-mono font-bold border-2 border-[#111111] dark:border-[#2a2a2a] shadow-[4px_4px_0px_0px_#111111] dark:shadow-[4px_4px_0px_0px_#FFD60A] hover:bg-[#f3f3f3] dark:hover:bg-[#050505] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer">
                                    <i class="bi bi-github text-lg"></i> GitHub
                                </a>

                                <a href="#projetos"
                                    class="px-8 py-3.5 bg-[#ffffff] dark:bg-[#111111] text-[#111111] dark:text-[#ffffff] font-mono font-bold border-2 border-[#111111] dark:border-[#2a2a2a] shadow-[4px_4px_0px_0px_#111111] dark:shadow-[4px_4px_0px_0px_#FFD60A] hover:bg-[#f3f3f3] dark:hover:bg-[#050505] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer">
                                    <i class="bi bi-folder-fill text-lg"></i> {{ projetos.length + 4 }}+ Projetos
                                </a>
                            </div>
                        </div>

                        <div class="flex justify-center lg:justify-end group">
                            <div
                                class="relative w-full max-w-md transition-transform duration-500 ease-out group-hover:-translate-y-2">
                                <div
                                    class="absolute top-4 right-[-16px] w-full h-full bg-[#FFD60A] border-2 border-[#111111] dark:border-[#2a2a2a] transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2">
                                </div>
                                <div
                                    class="bg-[#ffffff] dark:bg-[#111111] border-2 border-[#111111] dark:border-[#2a2a2a] relative z-10 flex flex-col">
                                    <div
                                        class="bg-[#111111] text-[#ffffff] font-mono text-xs py-2 px-3 flex justify-between items-center border-b-2 border-[#111111] dark:border-[#2a2a2a]">
                                        <span class="opacity-80">root@elliton:~</span>
                                        <div class="flex gap-2">
                                            <div class="w-2.5 h-2.5 rounded-full bg-[#FFD60A]"></div>
                                            <div class="w-2.5 h-2.5 rounded-full bg-[#ffffff]"></div>
                                            <div class="w-2.5 h-2.5 rounded-full bg-[#FFD60A]"></div>
                                        </div>
                                    </div>
                                    <div
                                        class="bg-[#f3f3f3] dark:bg-[#050505] h-[320px] sm:h-[420px] lg:h-[500px] w-full flex items-center justify-center relative overflow-hidden">
                                        <img src="../assets/images/foto_perfil.png" alt="Elliton Luís"
                                            class="object-cover w-full h-full transition-transform duration-500 hover:scale-105" />
                                        <div
                                            class="absolute bottom-4 left-4 bg-[#111111] text-[#ffffff] px-3 py-1.5 text-xs font-mono border border-[#FFD60A] shadow-[2px_2px_0px_0px_#FFD60A] animate-pulse">
                                            $ status: online<span
                                                class="animate-ping inline-block w-1.5 h-3 bg-[#FFD60A] ml-1 align-middle"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="habilidades" class="min-h-[90vh] flex flex-col justify-start pt-12 pb-12">
                    <div class="space-y-8 mb-12">
                        <div>
                            <h2
                                class="font-mono text-3xl font-bold mb-4 text-[#111111] dark:text-[#ffffff] flex items-center">
                                <span class="relative inline-flex w-12 h-10 mr-4 items-center justify-center">
                                    <span
                                        class="absolute inset-0 bg-[#111111] dark:bg-[#FFD60A] translate-x-[4px] translate-y-[4px]"></span>
                                    <span
                                        class="relative z-10 bg-[#FFD60A] dark:bg-[#111111] border-2 border-[#111111] dark:border-[#2a2a2a] text-[#111111] dark:text-[#FFD60A] w-full h-full flex items-center justify-center font-bold text-xl">
                                        >_
                                    </span>
                                </span>
                                Habilidades
                            </h2>
                            <hr class="border-t-2 border-[#111111] dark:border-[#2a2a2a] w-24" />
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div
                                class="border-2 border-[#111111] dark:border-[#2a2a2a] bg-[#ffffff] dark:bg-[#111111] p-8 shadow-[6px_6px_0px_0px_#111111] dark:shadow-[6px_6px_0px_0px_#FFD60A] hover:-translate-y-2 transition-all duration-300 flex flex-col">
                                <h3
                                    class="inline-block px-2 py-1 font-mono font-bold text-xl mb-4 bg-[#111111] text-[#ffffff] dark:bg-transparent dark:text-[#ffffff] transition-colors self-start">
                                    <i class="bi bi-phone mr-2 text-[#FFD60A]"></i>Mobile-First
                                </h3>
                                <p class="text-sm leading-relaxed text-[#111111] dark:text-[#f3f3f3]">Desenvolvimento
                                    orientado à responsividade, buscando garantir uma boa performance e experiência do
                                    usuário (UX) em
                                    diferentes dispositivos, priorizando a base mobile.</p>
                            </div>
                            <div
                                class="border-2 border-[#111111] dark:border-[#2a2a2a] bg-[#ffffff] dark:bg-[#111111] p-8 shadow-[6px_6px_0px_0px_#111111] dark:shadow-[6px_6px_0px_0px_#FFD60A] hover:-translate-y-2 transition-all duration-300 flex flex-col">
                                <h3
                                    class="inline-block px-2 py-1 font-mono font-bold text-xl mb-4 bg-[#111111] text-[#ffffff] dark:bg-transparent dark:text-[#ffffff] transition-colors self-start">
                                    <i class="bi bi-diagram-3 mr-2 text-[#FFD60A]"></i>Arquitetura de Sistemas
                                </h3>
                                <p class="text-sm leading-relaxed text-[#111111] dark:text-[#f3f3f3]">Modelagem
                                    cuidadosa
                                    de regras de negócio, construção de APIs RESTful e organização de bancos de dados
                                    visando aplicações mais escaláveis e de fácil manutenção.</p>
                            </div>
                        </div>
                    </div>

                    <div class="space-y-8">
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div
                                class="border-2 border-[#111111] dark:border-[#2a2a2a] bg-[#ffffff] dark:bg-[#111111] p-6 shadow-[6px_6px_0px_0px_#111111] dark:shadow-[6px_6px_0px_0px_#FFD60A] hover:-translate-y-1 transition-all duration-300 flex flex-col">
                                <h3
                                    class="inline-block px-2 py-1 font-mono font-bold text-lg mb-4 bg-[#111111] text-[#ffffff] dark:bg-transparent dark:text-[#ffffff] transition-colors self-start">
                                    <i class="bi bi-code-slash mr-2 text-[#FFD60A]"></i>Fundamentos & CS
                                </h3>
                                <div class="flex flex-wrap gap-2 mb-3">
                                    <span
                                        class="px-3 py-1 border-2 border-[#111111] bg-[#e34c26] text-[#ffffff] text-xs font-mono font-bold shadow-[2px_2px_0px_0px_#111111]">HTML5
                                        / CSS3</span>
                                    <span
                                        class="px-3 py-1 border-2 border-[#111111] bg-[#f0db4f] text-[#111111] text-xs font-mono font-bold shadow-[2px_2px_0px_0px_#111111]">JS
                                        (ES6+)</span>
                                    <span
                                        class="px-3 py-1 border-2 border-[#111111] bg-[#4a90e2] text-[#ffffff] text-xs font-mono font-bold shadow-[2px_2px_0px_0px_#111111]">Estruturas
                                        de Dados</span>
                                </div>
                            </div>

                            <div
                                class="border-2 border-[#111111] dark:border-[#2a2a2a] bg-[#ffffff] dark:bg-[#111111] p-6 shadow-[6px_6px_0px_0px_#111111] dark:shadow-[6px_6px_0px_0px_#FFD60A] hover:-translate-y-1 transition-all duration-300 lg:row-span-2 flex flex-col">
                                <h3
                                    class="inline-block px-2 py-1 font-mono font-bold text-lg mb-4 bg-[#111111] text-[#ffffff] dark:bg-transparent dark:text-[#ffffff] transition-colors self-start">
                                    <i class="bi bi-server mr-2 text-[#FFD60A]"></i>Back-end
                                </h3>
                                <div class="space-y-4">
                                    <div class="flex flex-wrap gap-2">
                                        <span
                                            class="px-3 py-1 border-2 border-[#111111] bg-[#777bb4] text-[#ffffff] text-xs font-mono font-bold shadow-[2px_2px_0px_0px_#111111]">PHP
                                            8+</span>
                                        <span
                                            class="px-3 py-1 border-2 border-[#111111] bg-[#ff2d20] text-[#ffffff] text-xs font-mono font-bold shadow-[2px_2px_0px_0px_#111111]">Laravel</span>
                                    </div>
                                    <ul class="text-sm text-[#111111] dark:text-[#f3f3f3] space-y-3 font-mono">
                                        <li>› <strong
                                                class="bg-[#27c93f] text-[#111111] px-1.5 py-0.5 border border-[#111111] shadow-[2px_2px_0px_0px_#111111] mr-1">Eloquent
                                                ORM</strong> Queries eficientes</li>
                                        <li>› <strong
                                                class="bg-[#ff5f56] text-[#ffffff] px-1.5 py-0.5 border border-[#111111] shadow-[2px_2px_0px_0px_#111111] mr-1">Arquitetura</strong>
                                            MVC, SOLID, Clean Code</li>
                                        <li>› Componentes: Migrations, Providers</li>
                                        <li>› APIs RESTful robustas</li>
                                    </ul>
                                </div>
                            </div>

                            <div
                                class="border-2 border-[#111111] dark:border-[#2a2a2a] bg-[#ffffff] dark:bg-[#111111] p-6 shadow-[6px_6px_0px_0px_#111111] dark:shadow-[6px_6px_0px_0px_#FFD60A] hover:-translate-y-1 transition-all duration-300 flex flex-col">
                                <h3
                                    class="inline-block px-2 py-1 font-mono font-bold text-lg mb-4 bg-[#111111] text-[#ffffff] dark:bg-transparent dark:text-[#ffffff] transition-colors self-start">
                                    <i class="bi bi-robot mr-2 text-[#FFD60A]"></i>IA & Produtividade
                                </h3>
                                <div class="flex flex-wrap gap-2">
                                    <span
                                        class="px-3 py-1 border-2 border-[#111111] bg-[#9333ea] text-[#ffffff] text-xs font-mono font-bold shadow-[2px_2px_0px_0px_#111111]">RAG</span>
                                    <span
                                        class="px-3 py-1 border-2 border-[#111111] bg-[#9333ea] text-[#ffffff] text-xs font-mono font-bold shadow-[2px_2px_0px_0px_#111111]">Embeddings</span>
                                    <span
                                        class="px-3 py-1 border-2 border-[#111111] bg-[#9333ea] text-[#ffffff] text-xs font-mono font-bold shadow-[2px_2px_0px_0px_#111111]">Chunking</span>
                                    <span
                                        class="px-3 py-1 border-2 border-[#111111] bg-[#db2777] text-[#ffffff] text-xs font-mono font-bold shadow-[2px_2px_0px_0px_#111111]">Agentes
                                        de IA</span>
                                </div>
                            </div>

                            <div
                                class="border-2 border-[#111111] dark:border-[#2a2a2a] bg-[#ffffff] dark:bg-[#111111] p-6 shadow-[6px_6px_0px_0px_#111111] dark:shadow-[6px_6px_0px_0px_#FFD60A] hover:-translate-y-1 transition-all duration-300 flex flex-col">
                                <h3
                                    class="inline-block px-2 py-1 font-mono font-bold text-lg mb-4 bg-[#111111] text-[#ffffff] dark:bg-transparent dark:text-[#ffffff] transition-colors self-start">
                                    <i class="bi bi-window-sidebar mr-2 text-[#FFD60A]"></i>Front-end
                                </h3>
                                <div class="flex flex-wrap gap-2">
                                    <span
                                        class="px-3 py-1 border-2 border-[#111111] bg-[#42b883] text-[#111111] text-xs font-mono font-bold shadow-[2px_2px_0px_0px_#111111]">Vue.js</span>
                                    <span
                                        class="px-3 py-1 border-2 border-[#111111] bg-[#8bc0d0] text-[#111111] text-xs font-mono font-bold shadow-[2px_2px_0px_0px_#111111]">Alpine.js</span>
                                    <span
                                        class="px-3 py-1 border-2 border-[#111111] bg-[#38b2ac] text-[#111111] text-xs font-mono font-bold shadow-[2px_2px_0px_0px_#111111]">Tailwind
                                        CSS</span>
                                    <span
                                        class="px-3 py-1 border-2 border-[#111111] bg-[#6366f1] text-[#ffffff] text-xs font-mono font-bold shadow-[2px_2px_0px_0px_#111111]">Bootstrap</span>
                                </div>
                            </div>

                            <div
                                class="border-2 border-[#111111] dark:border-[#2a2a2a] bg-[#ffffff] dark:bg-[#111111] p-6 shadow-[6px_6px_0px_0px_#111111] dark:shadow-[6px_6px_0px_0px_#FFD60A] hover:-translate-y-1 transition-all duration-300 flex flex-col">
                                <h3
                                    class="inline-block px-2 py-1 font-mono font-bold text-lg mb-4 bg-[#111111] text-[#ffffff] dark:bg-transparent dark:text-[#ffffff] transition-colors self-start">
                                    <i class="bi bi-pc-display mr-2 text-[#FFD60A]"></i>Sistemas & DevOps
                                </h3>
                                <div class="flex flex-wrap gap-2">
                                    <span
                                        class="px-3 py-1 border-2 border-[#111111] bg-[#111111] text-[#ffffff] text-xs font-mono font-bold shadow-[2px_2px_0px_0px_#FFD60A] dark:shadow-[2px_2px_0px_0px_#ffffff]">Linux</span>
                                    <span
                                        class="px-3 py-1 border-2 border-[#111111] bg-[#0078d7] text-[#ffffff] text-xs font-mono font-bold shadow-[2px_2px_0px_0px_#111111]">WSL</span>
                                    <span
                                        class="px-3 py-1 border-2 border-[#111111] bg-[#0ea5e9] text-[#ffffff] text-xs font-mono font-bold shadow-[2px_2px_0px_0px_#111111]">Virtualização</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="experiencia" class="min-h-[70vh] flex flex-col justify-start pt-12 pb-12">
                    <div class="space-y-8">
                        <div>
                            <h2
                                class="font-mono text-3xl font-bold mb-4 text-[#111111] dark:text-[#ffffff] flex items-center">
                                <span class="relative inline-flex w-12 h-10 mr-4 items-center justify-center">
                                    <span
                                        class="absolute inset-0 bg-[#111111] dark:bg-[#FFD60A] translate-x-[4px] translate-y-[4px]"></span>
                                    <span
                                        class="relative z-10 bg-[#FFD60A] dark:bg-[#111111] border-2 border-[#111111] dark:border-[#2a2a2a] text-[#111111] dark:text-[#FFD60A] w-full h-full flex items-center justify-center font-bold text-xl">
                                        >_
                                    </span>
                                </span>
                                git log --experiência
                            </h2>
                            <hr class="border-t-2 border-[#111111] dark:border-[#2a2a2a] w-24" />
                        </div>

                        <div
                            class="relative border-l-4 border-[#111111] dark:border-[#2a2a2a] ml-4 md:ml-8 mt-8 space-y-12">

                            <div class="relative pl-8 group">
                                <div
                                    class="absolute -left-[14px] top-1 w-6 h-6 bg-[#FFD60A] border-4 border-[#111111] dark:border-[#f3f3f3] rounded-full group-hover:scale-125 transition-transform">
                                </div>
                                <span
                                    class="font-mono text-xs font-bold text-[#111111] bg-[#f3f3f3] border-2 border-[#111111] px-2 py-1 shadow-[2px_2px_0px_0px_#111111]">commit
                                    v1.4</span>
                                <h3 class="font-mono font-bold text-xl mt-3 text-[#111111] dark:text-[#ffffff]">feat:
                                    Foco em Ferramentas e IA</h3>
                                <p class="text-sm mt-2 text-[#111111] dark:text-[#f3f3f3] leading-relaxed max-w-2xl">
                                    Desenvolvimento de ferramentas como o AIC e o Draftly. Em paralelo, aprendizado em
                                    curso de técnicas para melhor utilização e integração de ferramentas de IA no fluxo
                                    de desenvolvimento.
                                </p>
                            </div>

                            <div class="relative pl-8 group">
                                <div
                                    class="absolute -left-[14px] top-1 w-6 h-6 bg-[#42b883] border-4 border-[#111111] dark:border-[#f3f3f3] rounded-full group-hover:scale-125 transition-transform">
                                </div>
                                <span
                                    class="font-mono text-xs font-bold text-[#111111] bg-[#f3f3f3] border-2 border-[#111111] px-2 py-1 shadow-[2px_2px_0px_0px_#111111]">commit
                                    v1.3</span>
                                <h3 class="font-mono font-bold text-xl mt-3 text-[#111111] dark:text-[#ffffff]">merge
                                    branch 'front-end' into main</h3>
                                <p class="text-sm mt-2 text-[#111111] dark:text-[#f3f3f3] leading-relaxed max-w-2xl">
                                    Integrando o ecossistema Vue.js aos projetos, construindo interfaces reativas e
                                    modernas, complementando a base sólida do backend.
                                </p>
                            </div>

                            <div class="relative pl-8 group">
                                <div
                                    class="absolute -left-[14px] top-1 w-6 h-6 bg-[#ff2d20] border-4 border-[#111111] dark:border-[#f3f3f3] rounded-full group-hover:scale-125 transition-transform">
                                </div>
                                <span
                                    class="font-mono text-xs font-bold text-[#111111] bg-[#f3f3f3] border-2 border-[#111111] px-2 py-1 shadow-[2px_2px_0px_0px_#111111]">commit
                                    v1.2</span>
                                <h3 class="font-mono font-bold text-xl mt-3 text-[#111111] dark:text-[#ffffff]">feat:
                                    Ecossistema PHP & Laravel</h3>
                                <p class="text-sm mt-2 text-[#111111] dark:text-[#f3f3f3] leading-relaxed max-w-2xl">
                                    Construção e estruturação de aplicações web. Experiência prática na criação de APIs,
                                    padrão MVC, Eloquent ORM e implementação de regras de negócio.
                                </p>
                            </div>

                            <div class="relative pl-8 group">
                                <div
                                    class="absolute -left-[14px] top-1 w-6 h-6 bg-[#3776ab] border-4 border-[#111111] dark:border-[#f3f3f3] rounded-full group-hover:scale-125 transition-transform">
                                </div>
                                <span
                                    class="font-mono text-xs font-bold text-[#111111] bg-[#f3f3f3] border-2 border-[#111111] px-2 py-1 shadow-[2px_2px_0px_0px_#111111]">commit
                                    v1.1</span>
                                <h3 class="font-mono font-bold text-xl mt-3 text-[#111111] dark:text-[#ffffff]">feat:
                                    Lógica com Python</h3>
                                <p class="text-sm mt-2 text-[#111111] dark:text-[#f3f3f3] leading-relaxed max-w-2xl">
                                    Estudo de Python como evolução da lógica de programação. Foco na resolução de
                                    problemas.
                                </p>
                            </div>

                            <div class="relative pl-8 group">
                                <div
                                    class="absolute -left-[14px] top-1 w-6 h-6 bg-[#e34f26] border-4 border-[#111111] dark:border-[#f3f3f3] rounded-full group-hover:scale-125 transition-transform">
                                </div>
                                <span
                                    class="font-mono text-xs font-bold text-[#111111] bg-[#f3f3f3] border-2 border-[#111111] px-2 py-1 shadow-[2px_2px_0px_0px_#111111]">commit
                                    v1.0</span>
                                <h3 class="font-mono font-bold text-xl mt-3 text-[#111111] dark:text-[#ffffff]">init:
                                    Introdução ao Desenvolvimento Web</h3>
                                <p class="text-sm mt-2 text-[#111111] dark:text-[#f3f3f3] leading-relaxed max-w-2xl">
                                    Início da jornada na programação com foco nos fundamentos da web, estruturação de
                                    páginas e lógica de programação básica.
                                </p>
                            </div>

                        </div>
                    </div>
                </section>

                <section id="projetos" class="min-h-[90vh] flex flex-col justify-start pt-12 pb-12">
                    <div class="space-y-8">
                        <div>
                            <h2
                                class="font-mono text-3xl font-bold mb-4 text-[#111111] dark:text-[#ffffff] flex items-center">
                                <span class="relative inline-flex w-12 h-10 mr-4 items-center justify-center">
                                    <span
                                        class="absolute inset-0 bg-[#111111] dark:bg-[#FFD60A] translate-x-[4px] translate-y-[4px]"></span>
                                    <span
                                        class="relative z-10 bg-[#FFD60A] dark:bg-[#111111] border-2 border-[#111111] dark:border-[#2a2a2a] text-[#111111] dark:text-[#FFD60A] w-full h-full flex items-center justify-center font-bold text-xl">
                                        >_
                                    </span>
                                </span>
                                Projetos
                            </h2>
                            <hr class="border-t-2 border-[#111111] dark:border-[#2a2a2a] w-24" />
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div v-for="(projeto, index) in projetos" :key="index"
                                class="group border-2 border-[#111111] dark:border-[#2a2a2a] bg-[#ffffff] dark:bg-[#111111] p-6 md:p-8 shadow-[6px_6px_0px_0px_#111111] dark:shadow-[6px_6px_0px_0px_#FFD60A] hover:-translate-y-2 transition-all duration-300 flex flex-col h-full">

                                <div class="relative w-full h-48 md:h-56 bg-[#f3f3f3] dark:bg-[#2a2a2a] mb-6 border-2 border-[#111111] flex items-center justify-center overflow-hidden cursor-pointer group/img"
                                    @click="openImageModal(projeto.imagem, projeto.nome)">

                                    <img v-if="projeto.imagem" :src="getImagemUrl(projeto.imagem)" :alt="projeto.nome"
                                        class="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105" />

                                    <div v-if="projeto.imagem"
                                        class="absolute inset-0 bg-[#111111]/60 backdrop-blur-sm opacity-0 group-hover/img:opacity-100 transition-all duration-300 flex items-center justify-center">
                                        <i
                                            class="bi bi-zoom-in text-[#FFD60A] text-4xl drop-shadow-[2px_2px_0px_#111111]"></i>
                                    </div>

                                    <span v-else class="font-mono text-xs text-gray-500 font-bold tracking-widest">[
                                        IMAGEM DO PROJETO ]</span>
                                </div>

                                <h3
                                    class="inline-block px-2 py-1 font-mono font-bold text-xl mb-4 bg-[#111111] text-[#ffffff] dark:bg-transparent dark:text-[#ffffff] dark:group-hover:text-[#FFD60A] transition-colors self-start">
                                    {{ projeto.nome }}
                                </h3>
                                <p class="text-sm leading-relaxed mb-6 text-[#111111] dark:text-[#f3f3f3] flex-grow">
                                    {{ projeto.descricao }}
                                </p>

                                <div class="flex flex-wrap gap-2 mt-auto">
                                    <span v-for="tech in projeto.techs" :key="tech"
                                        class="px-3 py-1 border-2 border-[#111111] text-xs font-mono font-bold shadow-[2px_2px_0px_0px_#111111]"
                                        :class="getTechClass(tech)">
                                        {{ tech }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="sobre" class="min-h-[90vh] flex flex-col justify-start pt-12 pb-12">
                    <div class="space-y-16">
                        <div>
                            <div class="mb-8">
                                <h2
                                    class="font-mono text-3xl font-bold mb-4 text-[#111111] dark:text-[#ffffff] flex items-center">
                                    <span class="relative inline-flex w-12 h-10 mr-4 items-center justify-center">
                                        <span
                                            class="absolute inset-0 bg-[#111111] dark:bg-[#FFD60A] translate-x-[4px] translate-y-[4px]"></span>
                                        <span
                                            class="relative z-10 bg-[#FFD60A] dark:bg-[#111111] border-2 border-[#111111] dark:border-[#2a2a2a] text-[#111111] dark:text-[#FFD60A] w-full h-full flex items-center justify-center font-bold text-xl">
                                            >_
                                        </span>
                                    </span>
                                    Sobre
                                </h2>
                                <hr class="border-t-2 border-[#111111] dark:border-[#2a2a2a] w-24" />
                            </div>

                            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                                <div v-for="(hab, index) in sobreHabilidades" :key="index"
                                    :class="['group border-2 border-[#111111] dark:border-[#2a2a2a] bg-[#ffffff] dark:bg-[#111111] p-4 text-center shadow-[3px_3px_0px_0px_#111111] dark:shadow-[3px_3px_0px_0px_#FFD60A] transition-all duration-300 hover:-translate-y-1 hover:shadow-[5px_5px_0px_0px_#111111] dark:hover:shadow-[5px_5px_0px_0px_#FFD60A] cursor-default', hab.classesExtras]">
                                    <i
                                        :class="['bi text-2xl mb-2 block drop-shadow-[1px_1px_0px_#111111] dark:drop-shadow-none group-hover:scale-110 transition-transform', hab.icone, hab.cor]"></i>
                                    <h4 class="font-bold text-sm mb-1 text-[#111111] dark:text-[#ffffff]">{{ hab.nome }}
                                    </h4>
                                </div>
                            </div>
                        </div>

                        <div class="relative group">
                            <div
                                class="absolute inset-0 bg-[#FFD60A] border-2 border-[#111111] dark:border-[#2a2a2a] translate-x-2 translate-y-2 transition-transform duration-300 group-hover:translate-x-3 group-hover:translate-y-3">
                            </div>
                            <div
                                class="relative border-2 border-[#111111] dark:border-[#2a2a2a] bg-[#111111] text-[#ffffff] p-8 md:p-12 shadow-none">
                                <div class="flex items-start gap-6">
                                    <div class="hidden md:flex text-[#FFD60A] text-5xl">
                                        <i class="bi bi-terminal-fill drop-shadow-[2px_2px_0px_#000000]"></i>
                                    </div>
                                    <div class="space-y-6 flex-grow">
                                        <h2 class="font-mono text-2xl md:text-3xl font-bold flex items-center mb-4">
                                            <span class="text-[#FFD60A] mr-3 animate-pulse">_</span> Objetivos
                                        </h2>

                                        <p
                                            class="text-base md:text-lg leading-relaxed font-sans font-light text-[#f3f3f3]">
                                            Direcionado a construir soluções tecnológicas úteis e escaláveis, <span
                                                class="bg-[#FFD60A] text-[#111111] px-2 py-0.5 font-bold font-mono text-base shadow-[2px_2px_0px_0px_#ffffff]">minha
                                                meta contínua</span>
                                            é evoluir na arquitetura de sistemas, aprimorando ativamente meus
                                            conhecimentos em <strong
                                                class="text-[#ffffff] border-b-2 border-[#FFD60A] pb-0.5">Engenharia de
                                                Software</strong>,
                                            <strong class="text-[#ffffff] border-b-2 border-[#FFD60A] pb-0.5">IA
                                                Aplicada</strong> e <strong
                                                class="text-[#ffffff] border-b-2 border-[#FFD60A] pb-0.5">Web
                                                Segurança</strong>.
                                        </p>
                                    </div>
                                </div>

                                <div
                                    class="mt-8 border-2 border-[#ffffff] dark:border-[#2a2a2a] flex flex-col h-[400px] min-h-[250px] max-h-[75vh] resize-y overflow-hidden shadow-[4px_4px_0px_0px_#ffffff] dark:shadow-[4px_4px_0px_0px_#FFD60A]">
                                    <div
                                        class="bg-[#e2e2e2] dark:bg-[#2a2a2a] border-b-2 border-[#111111] px-4 py-2 flex items-center gap-2 flex-shrink-0">
                                        <div class="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#111111]"></div>
                                        <div class="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#111111]"></div>
                                        <div class="w-3 h-3 rounded-full bg-[#27c93f] border border-[#111111]"></div>
                                        <span
                                            class="ml-4 font-mono text-xs font-bold text-[#111111] dark:text-[#ffffff]">elliton@wsl:
                                            ~</span>
                                    </div>
                                    <div class="bg-[#111111] p-4 md:p-6 flex-grow overflow-y-auto font-mono text-sm md:text-base cursor-text"
                                        @click="focusTerminal" ref="terminalContentRef">
                                        <div v-for="(line, index) in terminalHistory" :key="index" class="mb-2">
                                            <div v-if="line.type === 'input'" class="text-[#f3f3f3]">
                                                <template v-if="line.text.includes('Password:')">
                                                    {{ line.text.split('Password:')[0] }}Password: <span
                                                        class="tracking-[0.3em]">********</span>
                                                </template>
                                                <template v-else>
                                                    {{ line.text }}
                                                </template>
                                            </div>
                                            <div v-else class="text-[#FFD60A] whitespace-pre-wrap">
                                                {{ line.text }}
                                            </div>
                                        </div>
                                        <div class="flex items-center text-[#f3f3f3] mt-2">
                                            <span class="mr-2 whitespace-pre">{{ terminalPrefix }}</span>
                                            <input :type="gameStatus === 'password' ? 'password' : 'text'"
                                                v-model="terminalInput" @keyup.enter="executeCommand"
                                                ref="terminalInputRef"
                                                class="bg-transparent border-none outline-none flex-grow text-[#f3f3f3] caret-[#FFD60A]"
                                                autocomplete="off" spellcheck="false" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="pt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                            <a href="https://github.com/Elliton-Luis" target="_blank"
                                class="group border-2 border-[#111111] dark:border-[#2a2a2a] bg-[#ffffff] dark:bg-[#111111] p-6 shadow-[6px_6px_0px_0px_#111111] dark:shadow-[6px_6px_0px_0px_#FFD60A] hover:-translate-y-2 hover:bg-[#111111] dark:hover:bg-[#111111] hover:shadow-[8px_8px_0px_0px_#555555] dark:hover:shadow-[8px_8px_0px_0px_#555555] dark:hover:border-[#2a2a2a] active:bg-[#111111] dark:active:bg-[#111111] active:text-[#ffffff] transition-all duration-300 text-center flex flex-col items-center justify-center">
                                <i
                                    class="bi bi-github text-4xl mb-4 text-[#111111] dark:text-[#ffffff] group-hover:text-[#ffffff] transition-colors"></i>
                                <p
                                    class="font-mono font-bold text-lg text-[#111111] dark:text-[#ffffff] group-hover:text-[#ffffff]">
                                    GitHub</p>
                            </a>
                            <a href="https://www.linkedin.com/in/elliton-luis-correia-da-silva-junior-9779452b3"
                                target="_blank"
                                class="group border-2 border-[#111111] dark:border-[#2a2a2a] bg-[#ffffff] dark:bg-[#111111] p-6 shadow-[6px_6px_0px_0px_#111111] dark:shadow-[6px_6px_0px_0px_#FFD60A] hover:-translate-y-2 hover:bg-[#0A66C2] dark:hover:bg-[#0A66C2] hover:shadow-[8px_8px_0px_0px_#0A66C2] dark:hover:shadow-[8px_8px_0px_0px_#0A66C2] transition-all duration-300 text-center flex flex-col items-center justify-center">
                                <i
                                    class="bi bi-linkedin text-4xl mb-4 text-[#0A66C2] dark:text-[#4a90e2] group-hover:text-[#ffffff] transition-colors"></i>
                                <p
                                    class="font-mono font-bold text-lg text-[#111111] dark:text-[#ffffff] group-hover:text-[#ffffff]">
                                    LinkedIn
                                </p>
                            </a>
                            <a href="https://wa.me/75999488795" target="_blank"
                                class="group border-2 border-[#111111] dark:border-[#2a2a2a] bg-[#ffffff] dark:bg-[#111111] p-6 shadow-[6px_6px_0px_0px_#111111] dark:shadow-[6px_6px_0px_0px_#FFD60A] hover:-translate-y-2 hover:bg-[#25D366] dark:hover:bg-[#25D366] hover:shadow-[8px_8px_0px_0px_#25D366] dark:hover:shadow-[8px_8px_0px_0px_#25D366] transition-all duration-300 text-center flex flex-col items-center justify-center">
                                <i
                                    class="bi bi-whatsapp text-4xl mb-4 text-[#25D366] dark:text-[#25D366] group-hover:text-[#ffffff] transition-colors"></i>
                                <p
                                    class="font-mono font-bold text-lg text-[#111111] dark:text-[#ffffff] group-hover:text-[#ffffff]">
                                    WhatsApp
                                </p>
                            </a>
                        </div>
                    </div>
                </section>

            </main>

            <div v-if="isImageModalOpen"
                class="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 sm:p-8 transition-opacity animate-fade-in"
                @click="closeImageModal">

                <button
                    class="absolute top-4 right-4 sm:top-8 sm:right-8 w-12 h-12 flex items-center justify-center bg-[#FFD60A] border-2 border-[#111111] text-[#111111] text-2xl shadow-[4px_4px_0px_0px_#111111] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#111111] transition-all z-[101]"
                    @click.stop="closeImageModal">
                    <i class="bi bi-x-lg"></i>
                </button>

                <div class="relative max-w-6xl w-full h-full max-h-[85vh] flex items-center justify-center" @click.stop>
                    <img :src="currentExpandedImage" :alt="currentExpandedImageAlt"
                        class="max-w-full max-h-full object-contain border-4 border-[#111111] dark:border-[#2a2a2a] shadow-[12px_12px_0px_0px_#FFD60A] bg-[#111111]" />
                </div>
            </div>

            <footer
                class="border-t-4 border-[#111111] dark:border-[#2a2a2a] bg-[#ffffff] dark:bg-[#111111] py-8 text-center transition-colors duration-300">
                <div class="container mx-auto px-6">
                    <p class="font-mono text-sm font-bold text-[#111111] dark:text-[#f3f3f3]">
                        Desenvolvido com <span class="text-[#42b883]">Vue.js</span> & TailwindCSS por Elliton Luís © {{
                            new
                                Date().getFullYear() }}.
                    </p>
                    <p class="font-mono text-xs text-gray-500 dark:text-gray-400 mt-2">
                        System Status: <span class="text-green-500">All Systems Operational</span>
                    </p>
                </div>
            </footer>
        </div>
    </div>
</template>

<style>
html {
    scroll-padding-top: 5rem;
}

.animate-fade-in {
    animation: fadeIn 0.2s ease-out forwards;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}
</style>