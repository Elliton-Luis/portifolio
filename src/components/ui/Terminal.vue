<script setup>
import { ref, nextTick, onMounted } from 'vue';

// --- ESTADO DO TERMINAL ---
const terminalInput = ref('');
const terminalPrefix = ref('guest@terminal:~$ ');
const terminalHistory = ref([
    { type: 'output', text: 'Terminal de Contato v1.0' },
    { type: 'output', text: 'Digite "help" para ver os comandos ou "contato" para me enviar uma mensagem/proposta.' }
]);
const terminalContentRef = ref(null);
const terminalInputRef = ref(null);

// --- ESTADO DO WIZARD ---
const wizardStep = ref(0);
const contactData = ref({ nome: '', email: '', assunto: '', mensagem: '' });

const wizardQuestions = [
    '',
    'Seu nome: ',
    'Seu email: ',
    'Assunto (ex: Proposta, Freela, Dúvida): ',
    'Mensagem: '
];

// Foca no input automaticamente ao montar o componente
onMounted(() => {
    focusTerminal();
});

const focusTerminal = () => {
    if (terminalInputRef.value) terminalInputRef.value.focus();
};

const scrollToBottom = async () => {
    await nextTick();
    if (terminalContentRef.value) {
        terminalContentRef.value.scrollTop = terminalContentRef.value.scrollHeight;
    }
};

const resetWizard = () => {
    wizardStep.value = 0;
    contactData.value = { nome: '', email: '', assunto: '', mensagem: '' };
    terminalPrefix.value = 'guest@terminal:~$ ';
};

const generateMailto = () => {
    const subject = encodeURIComponent(`[Terminal] ${contactData.value.assunto}`);
    const body = encodeURIComponent(
        `Nome: ${contactData.value.nome}\n` +
        `Email: ${contactData.value.email}\n\n` +
        `Mensagem:\n${contactData.value.mensagem}\n\n` +
        `---\nEnviado via Terminal do Portfólio`
    );
    // SUBSTITUA PELO SEU EMAIL REAL AQUI
    return `mailto:SEU_EMAIL_AQUI@gmail.com?subject=${subject}&body=${body}`;
};

const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.substring(0, maxLength - 3) + '...' : text;
};

const executeCommand = async () => {
    const rawInput = terminalInput.value.trim();

    if (!rawInput && wizardStep.value === 0) {
        terminalInput.value = '';
        return;
    }

    terminalHistory.value.push({ type: 'input', text: `${terminalPrefix.value}${rawInput}` });

    if (wizardStep.value === 1) {
        contactData.value.nome = rawInput;
        wizardStep.value = 2;
        terminalPrefix.value = wizardQuestions[2];
        terminalInput.value = '';
        await scrollToBottom();
        return;
    }
    else if (wizardStep.value === 2) {
        contactData.value.email = rawInput;
        wizardStep.value = 3;
        terminalPrefix.value = wizardQuestions[3];
        terminalInput.value = '';
        await scrollToBottom();
        return;
    }
    else if (wizardStep.value === 3) {
        contactData.value.assunto = rawInput;
        wizardStep.value = 4;
        terminalPrefix.value = wizardQuestions[4];
        terminalInput.value = '';
        await scrollToBottom();
        return;
    }
    else if (wizardStep.value === 4) {
        contactData.value.mensagem = rawInput;
        wizardStep.value = 5;
        terminalPrefix.value = 'confirmar> ';

        const preview = `
┌─────────────────────────────────────────┐
│         PREVIEW DA MENSAGEM             │
├─────────────────────────────────────────┤
│ Nome:       ${truncateText(contactData.value.nome, 27).padEnd(28)}│
│ Email:      ${truncateText(contactData.value.email, 27).padEnd(28)}│
│ Assunto:    ${truncateText(contactData.value.assunto, 27).padEnd(28)}│
│ Mensagem:   ${truncateText(contactData.value.mensagem, 27).padEnd(28)}│
├─────────────────────────────────────────┤
│ Enviar para: SEU_EMAIL_AQUI@gmail.com   │
└─────────────────────────────────────────┘

Digite "enviar" para abrir o cliente de email ou "cancelar".`;
        terminalHistory.value.push({ type: 'output', text: preview });
        terminalInput.value = '';
        await scrollToBottom();
        return;
    }
    else if (wizardStep.value === 5) {
        const cmd = rawInput.toLowerCase();
        if (cmd === 'enviar' || cmd === 'send') {
            const mailtoLink = generateMailto();
            window.location.href = mailtoLink;
            terminalHistory.value.push({ type: 'output', text: '[✓] Abrindo seu cliente de email...' });
            resetWizard();
        } else if (cmd === 'cancelar' || cmd === 'cancel') {
            terminalHistory.value.push({ type: 'output', text: '[✗] Envio cancelado.' });
            resetWizard();
        } else {
            terminalHistory.value.push({ type: 'output', text: 'Opção inválida. Digite "enviar" ou "cancelar".' });
        }
        terminalInput.value = '';
        await scrollToBottom();
        return;
    }

    const args = rawInput.split(' ').filter(Boolean);
    const cmd = args[0] ? args[0].toLowerCase() : '';

    switch (cmd) {
        case 'help':
            terminalHistory.value.push({
                type: 'output', text: `Comandos disponíveis:
 contato   - Iniciar o envio de uma mensagem ou proposta
 clear     - Limpar o terminal
 help      - Mostrar esta ajuda`
            });
            break;
        case 'contato':
            wizardStep.value = 1;
            terminalPrefix.value = wizardQuestions[1];
            terminalHistory.value.push({ type: 'output', text: '[!] Iniciando formulário de contato. Preencha os dados abaixo.' });
            break;
        case 'clear':
            terminalHistory.value = [];
            break;
        case '':
            break;
        default:
            terminalHistory.value.push({ type: 'output', text: `bash: ${cmd}: comando não encontrado. Digite 'help'.` });
    }

    terminalInput.value = '';
    await scrollToBottom();
};
</script>

<template>
    <div class="mt-8 border-2 border-[#111111] dark:border-[#FFD60A] flex flex-col h-[500px] min-h-[300px] max-h-[80vh] resize-y overflow-hidden shadow-[4px_4px_0px_0px_#111111] dark:shadow-[4px_4px_0px_0px_#FFD60A] rounded-sm">
        <!-- Header do Terminal -->
        <div class="bg-[#e2e2e2] dark:bg-[#FFD60A] border-b-2 border-[#111111] dark:border-[#111111] px-4 py-2 flex items-center gap-2 flex-shrink-0">
            <div class="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#111111]"></div>
            <div class="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#111111]"></div>
            <div class="w-3 h-3 rounded-full bg-[#27c93f] border border-[#111111]"></div>
            <span class="ml-4 font-mono text-xs font-bold text-[#111111]">guest@terminal: ~</span>
        </div>

        <!-- Área do Terminal -->
        <div class="bg-[#111111] p-4 md:p-6 flex-grow overflow-y-auto font-mono text-sm md:text-base cursor-text" @click="focusTerminal" ref="terminalContentRef">
            <div v-for="(line, index) in terminalHistory" :key="index" class="mb-2">
                <div v-if="line.type === 'input'" class="text-[#f3f3f3]">
                    {{ line.text }}
                </div>
                <div v-else class="text-[#FFD60A] whitespace-pre-wrap">
                    {{ line.text }}
                </div>
            </div>
            
            <!-- Aqui estava o problema visual do input -->
            <div class="flex items-center text-[#f3f3f3] mt-2 w-full">
                <span class="mr-2 whitespace-pre flex-shrink-0">{{ terminalPrefix }}</span>
                <input type="text"
                    v-model="terminalInput" 
                    @keyup.enter="executeCommand"
                    ref="terminalInputRef"
                    autofocus
                    class="bg-transparent border-none focus:outline-none focus:ring-0 w-full flex-1 text-[#f3f3f3] caret-[#FFD60A] placeholder-[#555555]"
                    autocomplete="off" 
                    spellcheck="false" />
            </div>
        </div>
    </div>
</template>