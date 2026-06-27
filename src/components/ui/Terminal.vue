<script setup>
import { ref, nextTick } from 'vue';
import { useTheme } from '../../composables/useTheme';

const { toggleTheme } = useTheme();

// --- ESTADO DO TERMINAL & JOGO ---
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
        terminalHistory.value.push({ type: 'input', text: `${terminalPrefix.value}` });
    } else {
        terminalHistory.value.push({ type: 'input', text: `${terminalPrefix.value}${rawInput}` });
    }

    const args = rawInput.split(' ').filter(Boolean);
    const cmd = args[0] ? args[0].toLowerCase() : '';

    // Sair do Jogo
    if ((cmd === 'quit' || cmd === 'exit') && gameStatus.value !== 'inactive') {
        gameStatus.value = 'inactive';
        terminalPrefix.value = 'root@elliton:~$ ';
        terminalHistory.value.push({ type: 'output', text: '[!] Conexão SSH encerrada. Retornando ao terminal local.' });
        terminalInput.value = '';
        await nextTick();
        if (terminalContentRef.value) terminalContentRef.value.scrollTop = terminalContentRef.value.scrollHeight;
        return;
    }

    // Lógica do Minigame (CTF)
    if (gameStatus.value === 'select_diff') {
        if (cmd === 'facil' || cmd === 'fácil') {
            gameDifficulty.value = 'facil';
            gameStatus.value = 'playing';
            terminalPrefix.value = 'guest@ctf-server:~$ ';
            terminalHistory.value.push({ type: 'output', text: '[!] MODO FÁCIL ativado.\n\n[ Conectado a 192.168.1.104 ]\nObjetivo: Escalar privilégios para "root".\nDigite "hint" se não souber por onde começar.' });
        } else if (cmd === 'dificil' || cmd === 'difícil') {
            gameDifficulty.value = 'dificil';
            gameStatus.value = 'playing';
            terminalPrefix.value = 'guest@ctf-server:~$ ';
            terminalHistory.value.push({ type: 'output', text: '[!] MODO DIFÍCIL ativado.\n\n[ Conectado a 192.168.1.104 ]\nObjetivo: Escalar privilégios para "root". Enumerar é a chave.' });
        } else {
            terminalHistory.value.push({ type: 'output', text: 'Dificuldade não reconhecida. Digite "facil" ou "dificil".' });
        }
    }
    else if (gameStatus.value === 'password') {
        if (rawInput === 'vaca_hacker_2026') {
            gameStatus.value = 'inactive';
            terminalPrefix.value = 'root@elliton:~$ ';
            terminalHistory.value.push({
                type: 'output', text: `
 _________________________________________
/         ACESSO ROOT VERIFICADO          \\
|                                         |
|        🏆 DEV SEC OPS MASTER 🏆         |
\\                                         /
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
                terminalHistory.value.push({ type: 'output', text: 'LEMBRETE DA EQUIPE DEV:\n"Atenção: Não esquecer de limpar o histórico e apagar backups."' });
            } else if (file === 'readme.md') {
                terminalHistory.value.push({ type: 'output', text: '# Servidor de Homologação\nRecuperação do sistema: sudo /sbin/sys-recovery' });
            } else if (file === '.bash_history') {
                terminalHistory.value.push({ type: 'output', text: 'nano .env\ncp .env /home/guest/.env.backup\nchmod 777 /home/guest/.env.backup\nsudo /sbin/sys-recovery' });
            } else if (file === '.env.backup') {
                terminalHistory.value.push({ type: 'output', text: 'SYS_RECOVERY_TOKEN=vaca_hacker_2026' });
            } else {
                terminalHistory.value.push({ type: 'output', text: `cat: ${file || 'falta operando'}: Arquivo inexistente` });
            }
        } 
        else if (cmd === 'sudo') {
            if (args[1] === '-l') {
                terminalHistory.value.push({ type: 'output', text: 'User guest may run:\n    (root) NOPASSWD: /sbin/sys-recovery' });
            } else if (args[1] === '/sbin/sys-recovery' || args[1] === 'sys-recovery') {
                gameStatus.value = 'password';
                terminalPrefix.value = 'Insira o Token: ';
            } else {
                terminalHistory.value.push({ type: 'output', text: `sudo: authentication failure` });
            }
        }
        else if (cmd === 'hint') {
            if (gameDifficulty.value === 'facil') {
                terminalHistory.value.push({ type: 'output', text: '[DICA] O histórico do terminal (.bash_history) sempre entrega os passos de quem usou antes.' });
            } else {
                terminalHistory.value.push({ type: 'output', text: 'bash: hint: desativado.' });
            }
        } 
        else if (cmd === 'clear') {
            terminalHistory.value = [];
        } 
        else {
            terminalHistory.value.push({ type: 'output', text: `bash: ${cmd}: comando não encontrado.` });
        }
    }
    else {
        // Comandos do Terminal Principal
        switch (cmd) {
            case 'help':
                terminalHistory.value.push({
                    type: 'output', text: `Comandos úteis:
 about    - Resumo do meu perfil
 skills   - Minhas principais tecnologias
 contact  - Redes e contatos
 cv       - Baixar meu currículo
 theme    - Alternar modo Dark/Light
 play     - Iniciar minigame CTF
 clear    - Limpar o terminal` });
                break;
            case 'about':
            case 'whoami':
                terminalHistory.value.push({ type: 'output', text: 'Elliton Luís\nDesenvolvedor construindo soluções reais com PHP/Laravel, Vue.js e integrando IA no fluxo.' });
                break;
            case 'skills':
                terminalHistory.value.push({ type: 'output', text: '> Back-end: PHP 8, Laravel, Python, Go\n> Front-end: Vue.js, Tailwind\n> Infra & Sec: Linux (Manjaro/WSL), AppSec Base' });
                break;
            case 'contact':
                terminalHistory.value.push({ type: 'output', text: 'GitHub: github.com/Elliton-Luis' });
                break;
            case 'cv':
                const link = document.createElement('a');
                link.href = '/curriculo_elliton_luis.pdf';
                link.download = 'Elliton_Luis_CV.pdf';
                link.click();
                terminalHistory.value.push({ type: 'output', text: '> Iniciando download...' });
                break;
            case 'theme':
                toggleTheme();
                break;
            case 'play':
            case 'game':
                gameStatus.value = 'select_diff';
                terminalPrefix.value = 'CTF> ';
                terminalHistory.value.push({ type: 'output', text: '>> INICIANDO PROTOCOLO DE CTF <<\nEscolha: "facil" ou "dificil".' });
                break;
            case 'clear':
                terminalHistory.value = [];
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
</script>

<template>
    <div class="mt-8 border-2 border-[#111111] dark:border-[#FFD60A] flex flex-col h-[400px] min-h-[250px] max-h-[75vh] resize-y overflow-hidden shadow-[4px_4px_0px_0px_#111111] dark:shadow-[4px_4px_0px_0px_#FFD60A]">
        <!-- INVERSÃO DE COR APLICADA NO HEADER DO TERMINAL -->
        <div class="bg-[#e2e2e2] dark:bg-[#FFD60A] border-b-2 border-[#111111] dark:border-[#111111] px-4 py-2 flex items-center gap-2 flex-shrink-0">
            <div class="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#111111]"></div>
            <div class="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#111111]"></div>
            <div class="w-3 h-3 rounded-full bg-[#27c93f] border border-[#111111]"></div>
            <span class="ml-4 font-mono text-xs font-bold text-[#111111] dark:text-[#111111]">elliton@wsl: ~</span>
        </div>
        
        <div class="bg-[#111111] p-4 md:p-6 flex-grow overflow-y-auto font-mono text-sm md:text-base cursor-text" @click="focusTerminal" ref="terminalContentRef">
            <div v-for="(line, index) in terminalHistory" :key="index" class="mb-2">
                <div v-if="line.type === 'input'" class="text-[#f3f3f3]">
                    <template v-if="line.text.includes('Password:')">
                        {{ line.text.split('Password:')[0] }}Password: <span class="tracking-[0.3em]">********</span>
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
</template>