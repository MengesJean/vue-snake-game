import { ref, watch } from 'vue';

export function useDarkMode() {
  const isDark = ref(localStorage.getItem('darkMode') === 'true');

  const toggleDarkMode = () => {
    isDark.value = !isDark.value;
    localStorage.setItem('darkMode', isDark.value.toString());
  };

  watch(isDark, (newValue) => {
    document.documentElement.classList.toggle('dark', newValue);
  }, { immediate: true });

  return {
    isDark,
    toggleDarkMode
  };
} 