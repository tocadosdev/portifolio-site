// Textos de interface conforme o idioma da página; sem bibliotecas externas.
const english = document.documentElement.lang.toLowerCase().startsWith('en');
const ui = english
    ? { close: 'Close ', menu: 'Menu ', phrases: ['Computer Science student', 'My next step: cybersecurity'], one: ' project displayed.', many: ' projects displayed.' }
    : { close: 'Fechar ', menu: 'Menu ', phrases: ['Estudante de Ciência da Computação', 'Meu próximo passo: cibersegurança'], one: ' projeto exibido.', many: ' projetos exibidos.' };

// 1. Menu: melhoria progressiva, teclado e retorno do foco.
const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
const desktop = window.matchMedia('(min-width: 960px)');
const header = document.querySelector('.site-header');
const menu = document.querySelector('#menu');
const menuButton = document.querySelector('.menu-toggle');
const allMenuLinks = [...menu.querySelectorAll('a')];
const sectionLinks = allMenuLinks.filter(link => link.getAttribute('href').startsWith('#'));
document.body.classList.add('menu-ready');

function setMenu(open) {
    menu.hidden = !open;
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.firstChild.textContent = open ? ui.close : ui.menu;
}
function adaptMenu() {
    const activeElement = document.activeElement;
    const focusInMenu = menu.contains(activeElement);
    menuButton.hidden = desktop.matches;
    setMenu(desktop.matches);
    if (!desktop.matches && focusInMenu) menuButton.focus();
    if (desktop.matches && activeElement === menuButton) allMenuLinks[0].focus();
}
menuButton.addEventListener('click', () => setMenu(menu.hidden));
allMenuLinks.forEach(link => link.addEventListener('click', () => {
    if (desktop.matches) return;
    setMenu(false);
    if (link.hash && link.origin === window.location.origin) {
        const target = document.getElementById(link.hash.slice(1));
        if (target) {
            target.setAttribute('tabindex', '-1');
            target.focus({ preventScroll: true });
        }
    } else menuButton.focus();
}));
document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !desktop.matches && !menu.hidden) {
        setMenu(false);
        menuButton.focus();
    }
});
document.addEventListener('click', event => {
    if (!desktop.matches && !menu.hidden && !header.contains(event.target)) {
        const focusInMenu = menu.contains(document.activeElement);
        setMenu(false);
        if (focusInMenu) menuButton.focus();
    }
});
desktop.addEventListener('change', adaptMenu);
adaptMenu();

// 2. Digitação sem cursor. O texto completo e acessível já está no hero.
const typewriter = document.querySelector('#typewriter');
const phrases = ui.phrases;
let phraseIndex = 0;
let position = phrases[0].length;
let deleting = true;
let typingTimer;
function typePhrase() {
    const phrase = phrases[phraseIndex];
    position += deleting ? -1 : 1;
    typewriter.textContent = phrase.slice(0, position);
    let delay = deleting ? 28 : 65;
    if (deleting && position === 0) {
        phraseIndex = (phraseIndex + 1) % phrases.length;
        deleting = false;
        delay = 300;
    } else if (!deleting && position === phrase.length) {
        deleting = true;
        delay = 3200;
    }
    typingTimer = window.setTimeout(typePhrase, delay);
}
function syncTyping() {
    window.clearTimeout(typingTimer);
    phraseIndex = 0;
    position = phrases[0].length;
    deleting = true;
    typewriter.textContent = phrases[0];
    if (!motion.matches && !document.hidden) typingTimer = window.setTimeout(typePhrase, 3200);
}
motion.addEventListener('change', syncTyping);
document.addEventListener('visibilitychange', syncTyping);
syncTyping();

// 3. Entrada com atraso escalonado; sem observer, o conteúdo fica visível.
const revealElements = [...document.querySelectorAll('[data-reveal]')];
document.querySelectorAll('.project-card').forEach((card, index) => {
    card.style.setProperty('--reveal-delay', (index % 3) * 90 + 'ms');
});
if ('IntersectionObserver' in window && !motion.matches) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('reveal-pending');
                entry.target.classList.add('is-revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08 });
    revealElements.forEach(element => {
        element.classList.add('reveal-pending');
        observer.observe(element);
    });
    motion.addEventListener('change', () => {
        if (!motion.matches) return;
        observer.disconnect();
        revealElements.forEach(element => element.classList.remove('reveal-pending'));
    });
}

// 4. Filtros acessíveis. Não escondemos projetos de usuários sem JavaScript.
const filters = document.querySelector('.project-filters');
const projectCards = [...document.querySelectorAll('.project-card')];
const filterStatus = document.querySelector('#filter-status');
filters.hidden = false;
filters.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
        const category = button.dataset.filter;
        filters.querySelectorAll('button').forEach(item => {
            item.setAttribute('aria-pressed', String(item === button));
        });
        let visibleCount = 0;
        projectCards.forEach(card => {
            card.hidden = category !== 'todos' && card.dataset.category !== category;
            if (!card.hidden) visibleCount++;
        });
        filterStatus.textContent = visibleCount + (visibleCount === 1 ? ui.one : ui.many);
        scheduleScroll();
    });
});

// 5. Progresso, menu ativo e botão de topo em uma única atualização por frame.
const progress = document.querySelector('.reading-progress');
const backToTop = document.querySelector('.back-to-top');
const sections = sectionLinks.map(link => document.getElementById(link.hash.slice(1)));
let scheduled = false;
function updateScroll() {
    const top = window.scrollY;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = 'scaleX(' + (scrollable > 0 ? Math.min(1, Math.max(0, top / scrollable)) : 0) + ')';
    header.classList.toggle('is-scrolled', top > 16);
    backToTop.hidden = top < 400;

    // Usa a área visível abaixo do cabeçalho. Em empates, escolhe o início
    // mais próximo do topo; não depende da ordem de cards lado a lado.
    const offset = header.getBoundingClientRect().height + 16;
    let active = null;
    let bestScore = 0;
    let bestDistance = Infinity;
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const visible = Math.max(0, Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, offset));
        const score = visible / Math.max(1, Math.min(rect.height, window.innerHeight - offset));
        const distance = Math.abs(rect.top - offset);
        if (score > bestScore + 0.001 || (score > 0 && Math.abs(score - bestScore) <= 0.001 && distance < bestDistance)) {
            bestScore = score;
            bestDistance = distance;
            active = section;
        }
    });
    if (top > 0 && top + window.innerHeight >= document.documentElement.scrollHeight - 4) active = sections[sections.length - 1];
    sectionLinks.forEach(link => {
        const current = active !== null && link.hash === '#' + active.id;
        link.classList.toggle('active', current);
        if (current) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
    });
    scheduled = false;
}
function scheduleScroll() {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(updateScroll);
}
window.addEventListener('scroll', scheduleScroll, { passive: true });
window.addEventListener('resize', scheduleScroll);
window.addEventListener('load', scheduleScroll);
if ('ResizeObserver' in window) new ResizeObserver(scheduleScroll).observe(document.body);
updateScroll();
