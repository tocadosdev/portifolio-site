// Alternância de tema compartilhada entre PT-BR, inglês e página 404.
(() => {
    const root = document.documentElement;
    const buttons = [...document.querySelectorAll('.theme-toggle')];
    const system = window.matchMedia('(prefers-color-scheme: dark)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const key = 'portfolio-theme';
    const en = root.lang.toLowerCase().startsWith('en');
    let manual = false;
    let busy = false;
    let currentTransition;
    let currentAnimation;
    try { manual = ['light', 'dark'].includes(localStorage.getItem(key)); } catch { /* Navegação privada ou armazenamento bloqueado. */ }

    function applyTheme(theme) {
        root.dataset.theme = theme;
        const dark = theme === 'dark';
        buttons.forEach(button => {
            const label = en ? (dark ? 'Enable light mode' : 'Enable dark mode') : (dark ? 'Ativar modo claro' : 'Ativar modo escuro');
            button.setAttribute('aria-label', label);
            button.setAttribute('aria-pressed', String(dark));
        });
        const meta = document.querySelector('meta[name="theme-color"]');
        // Lê a variável do CSS para acompanhar futuras mudanças na paleta.
        if (meta) meta.content = getComputedStyle(root).getPropertyValue('--background').trim();
    }

    async function chooseTheme(theme, button) {
        if (busy) return;
        manual = true;
        try { localStorage.setItem(key, theme); } catch { /* A escolha funciona mesmo sem persistência. */ }
        if (reduced.matches || typeof document.startViewTransition !== 'function') {
            applyTheme(theme);
            return;
        }
        busy = true;
        const rect = button.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
        root.classList.add('theme-revealing');
        try {
            currentTransition = document.startViewTransition(() => applyTheme(theme));
            await currentTransition.ready;
            if (reduced.matches) { currentTransition.skipTransition(); return; }
            currentAnimation = root.animate(
                { clipPath: ['circle(0px at ' + x + 'px ' + y + 'px)', 'circle(' + radius + 'px at ' + x + 'px ' + y + 'px)'] },
                { duration: 400, easing: 'cubic-bezier(.22,.61,.36,1)', pseudoElement: '::view-transition-new(root)' }
            );
            await currentAnimation.finished;
            await currentTransition.finished;
        } catch {
            // APIs parciais, aba oculta ou transição cancelada: mantém o tema escolhido.
            if (currentTransition) currentTransition.skipTransition();
            applyTheme(theme);
        } finally {
            root.classList.remove('theme-revealing');
            currentTransition = null;
            currentAnimation = null;
            busy = false;
        }
    }

    applyTheme(root.dataset.theme === 'dark' ? 'dark' : 'light');
    buttons.forEach(button => {
        button.hidden = false;
        button.addEventListener('click', () => chooseTheme(root.dataset.theme === 'dark' ? 'light' : 'dark', button));
    });
    // Evita animar o primeiro carregamento; Enter/Espaço funcionam pelo botão nativo.
    requestAnimationFrame(() => requestAnimationFrame(() => root.classList.add('theme-ready')));
    system.addEventListener('change', event => {
        if (!manual) applyTheme(event.matches ? 'dark' : 'light');
    });
    reduced.addEventListener('change', event => {
        if (event.matches) {
            if (currentAnimation) currentAnimation.cancel();
            if (currentTransition) currentTransition.skipTransition();
        }
    });
    window.addEventListener('storage', event => {
        if (event.key !== key && event.key !== null) return;
        manual = ['light', 'dark'].includes(event.newValue);
        applyTheme(manual ? event.newValue : (system.matches ? 'dark' : 'light'));
    });
})();
