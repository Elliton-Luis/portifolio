import { ref } from 'vue';

const isDark = ref(true);

export function useTheme() {
    const updateTheme = () => {
        if (isDark.value) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    const toggleTheme = () => {
        isDark.value = !isDark.value;
        localStorage.setItem('theme', isDark.value ? 'dark' : 'light');
        updateTheme();
    };

    const initTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            isDark.value = false;
        }
        updateTheme();
        document.documentElement.classList.add('scroll-smooth');
    };

    return { isDark, toggleTheme, initTheme };
}