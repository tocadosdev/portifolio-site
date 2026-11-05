// 1. Digitação no hero. O texto original continua disponível para leitores de tela.
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const typewriter = document.querySelector('#typewriter');
const phrases = [
    'Estudante de Ciência da Computação',
    'Futuro profissional de Cibersegurança'
];
let phraseIndex = 0;
let characterIndex = phrases[0].length;
let deleting = true;
let typingTimer;

function typePhrase() {
    if (reducedMotion.matches) return;
    const phrase = phrases[phraseIndex];
    characterIndex += deleting ? -1 : 1;
    typewriter.textContent = phrase.slice(0, characterIndex);
    let delay = deleting ? 35 : 75;

    if (!deleting && characterIndex === phrase.length) {
        deleting = true;
        delay = 2000;
    } else if (deleting && characterIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        delay = 350;
    }
    typingTimer = window.setTimeout(typePhrase, delay);
}

function updateMotionPreference() {
    window.clearTimeout(typingTimer);
    if (reducedMotion.matches) {
        typewriter.textContent = phrases[0];
    } else {
        characterIndex = 0;
        deleting = false;
        typePhrase();
    }
}
if (!reducedMotion.matches) typingTimer = window.setTimeout(typePhrase, 2000);
reducedMotion.addEventListener('change', updateMotionPreference);

// 2. Menu do celular: botão, Escape e fechamento após escolher uma seção.
const navigation = document.querySelector('.navigation');
const menuButton = document.querySelector('.menu-toggle');
const menuLinks = [...document.querySelectorAll('.nav-links a')];
const mobileScreen = window.matchMedia('(max-width: 760px)');
menuButton.hidden = false;
navigation.classList.add('menu-ready');

function setMenu(open) {
    navigation.classList.toggle('menu-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
}
menuButton.addEventListener('click', () => {
    setMenu(menuButton.getAttribute('aria-expanded') !== 'true');
});
menuLinks.forEach(link => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && navigation.classList.contains('menu-open')) {
        setMenu(false);
        menuButton.focus();
    }
});
document.addEventListener('click', event => {
    if (!navigation.contains(event.target)) setMenu(false);
});
mobileScreen.addEventListener('change', () => setMenu(false));

// 3. Revela cada seção uma vez. Sem suporte ao observer, tudo permanece visível.
const sections = [...document.querySelectorAll('main section')];
if ('IntersectionObserver' in window && !reducedMotion.matches) {
    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        section.classList.add('reveal');
        revealObserver.observe(section);
    });
}

// 4. Atualiza o link ativo e mostra o botão de topo, limitando a uma atualização por frame.
const backToTop = document.querySelector('.back-to-top');
let scrollScheduled = false;

function updateScrollState() {
    const activationLine = Math.max(120, window.innerHeight * 0.35);
    let activeSection = null;
    sections.forEach(section => {
        if (section.getBoundingClientRect().top <= activationLine) activeSection = section;
    });
    // No fim da página, a última seção pode não alcançar a linha de ativação.
    if (window.scrollY > 0 && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        activeSection = sections[sections.length - 1];
    }
    menuLinks.forEach(link => {
        const active = activeSection !== null && link.hash === `#${activeSection.id}`;
        link.classList.toggle('active', active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
    });
    backToTop.hidden = window.scrollY < 350;
    scrollScheduled = false;
}

function scheduleScrollUpdate() {
    if (!scrollScheduled) {
        scrollScheduled = true;
        window.requestAnimationFrame(updateScrollState);
    }
}
window.addEventListener('scroll', scheduleScrollUpdate, { passive: true });
window.addEventListener('resize', scheduleScrollUpdate);
updateScrollState();
