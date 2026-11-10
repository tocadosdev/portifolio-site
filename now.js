// EDITE AQUI: updated usa AAAA-MM. Cada área tem id único, nomes PT/EN,
// topics (id, title e description) e current, que aponta para o assunto em destaque.
// Copie um item para adicionar assuntos/áreas; remova-o para excluir. Mantenha os ids únicos
// e ajuste current se remover seu assunto. A interface e os destaques são gerados dos dados.
const NOW_DATA = {
    updated: '2026-11',
    areas: [
        {
            id: 'ai',
            title: { pt: 'Inteligência Artificial', en: 'Artificial Intelligence' },
            tab: { pt: 'IA', en: 'AI' },
            current: 'machine-learning',
            topics: [
                {
                    id: 'machine-learning',
                    title: { pt: 'Machine Learning (aprendizado supervisionado e não supervisionado)', en: 'Machine Learning (supervised and unsupervised learning)' },
                    description: {
                        pt: 'Modelos aprendem padrões a partir de dados. No aprendizado supervisionado, usam exemplos com respostas conhecidas; no não supervisionado, buscam estruturas sem esses rótulos. Isso ajuda a prever resultados e agrupar dados.',
                        en: 'Models learn patterns from data. Supervised learning uses examples with known answers; unsupervised learning looks for structure without those labels. These methods help predict outcomes and group data.'
                    }
                },
                {
                    id: 'transformers',
                    title: { pt: 'Transformers e Modelos de Linguagem (LLMs)', en: 'Transformers and Large Language Models (LLMs)' },
                    description: {
                        pt: 'Transformers usam mecanismos de atenção para relacionar partes de uma sequência. Muitos LLMs usam essa arquitetura para processar e gerar texto, apoiando tarefas como resumo e tradução, sem garantir respostas corretas.',
                        en: 'Transformers use attention mechanisms to relate parts of a sequence. Many LLMs use this architecture to process and generate text for tasks such as summarization and translation, without guaranteeing correct answers.'
                    }
                },
                {
                    id: 'rag',
                    title: { pt: 'RAG (Retrieval-Augmented Generation)', en: 'RAG (Retrieval-Augmented Generation)' },
                    description: {
                        pt: 'Combina a busca de informações em fontes externas com a geração de uma resposta por IA. O conteúdo recuperado fornece contexto ao modelo, útil em consultas a documentos; a resposta ainda precisa ser verificada.',
                        en: 'Combines retrieving information from external sources with AI-generated answers. Retrieved content provides context for the model, useful for querying documents; the answer still needs verification.'
                    }
                },
                {
                    id: 'prompt-engineering',
                    title: { pt: 'Engenharia de Prompt', en: 'Prompt Engineering' },
                    description: {
                        pt: 'É a elaboração de instruções, contexto e exemplos para orientar um modelo de IA. Ajuda a especificar uma tarefa e o formato esperado da resposta, que deve ser avaliada em vez de aceita automaticamente.',
                        en: 'The practice of designing instructions, context and examples to guide an AI model. It helps specify a task and the desired response format, which should be evaluated rather than accepted automatically.'
                    }
                },
                {
                    id: 'ai-agents',
                    title: { pt: 'Agentes de IA e automação com IA', en: 'AI Agents and AI Automation' },
                    description: {
                        pt: 'Agentes usam modelos de IA para escolher etapas e acionar ferramentas em direção a um objetivo. A automação com IA integra essas capacidades a fluxos de trabalho, com limites, validação e supervisão adequados.',
                        en: 'Agents use AI models to choose steps and invoke tools toward a goal. AI automation integrates these capabilities into workflows, with appropriate limits, validation and oversight.'
                    }
                }
            ]
        },
        {
            id: 'math',
            title: { pt: 'Matemática Computacional Aplicada', en: 'Applied Computational Mathematics' },
            tab: { pt: 'Matemática', en: 'Mathematics' },
            current: 'linear-algebra',
            topics: [
                {
                    id: 'linear-algebra',
                    title: { pt: 'Álgebra Linear (vetores, matrizes, autovalores)', en: 'Linear Algebra (vectors, matrices, eigenvalues)' },
                    description: {
                        pt: 'Estuda vetores, matrizes e transformações lineares. Ajuda a representar dados e resolver sistemas; autovalores indicam como certas direções são escaladas por uma transformação.',
                        en: 'Studies vectors, matrices and linear transformations. It helps represent data and solve systems; eigenvalues indicate how certain directions are scaled by a transformation.'
                    }
                },
                {
                    id: 'probability',
                    title: { pt: 'Probabilidade e Estatística', en: 'Probability and Statistics' },
                    description: {
                        pt: 'A probabilidade modela a incerteza; a estatística analisa dados para estimar características e avaliar hipóteses. Juntas, ajudam a interpretar resultados e tomar decisões considerando a variabilidade.',
                        en: 'Probability models uncertainty; statistics analyzes data to estimate characteristics and assess hypotheses. Together, they help interpret results and make decisions while accounting for variability.'
                    }
                },
                {
                    id: 'numerical-methods',
                    title: { pt: 'Métodos Numéricos', en: 'Numerical Methods' },
                    description: {
                        pt: 'São técnicas para calcular soluções aproximadas com o computador. Servem para resolver equações, integrais e outros problemas quando uma solução exata é difícil, considerando erro e estabilidade dos cálculos.',
                        en: 'Techniques for computing approximate solutions. They help solve equations, integrals and other problems when exact solutions are difficult, while accounting for numerical error and stability.'
                    }
                },
                {
                    id: 'graphs',
                    title: { pt: 'Teoria dos Grafos e Matemática Discreta', en: 'Graph Theory and Discrete Mathematics' },
                    description: {
                        pt: 'A matemática discreta estuda estruturas como conjuntos, relações e objetos contáveis. Grafos representam conexões entre nós e ajudam a modelar redes, encontrar caminhos e analisar dependências.',
                        en: 'Discrete mathematics studies structures such as sets, relations and countable objects. Graphs represent connections between nodes and help model networks, find paths and analyze dependencies.'
                    }
                }
            ]
        },
        {
            id: 'software',
            title: { pt: 'Projeto e Engenharia de Software', en: 'Software Design and Engineering' },
            tab: { pt: 'Engenharia de Software', en: 'Software Engineering' },
            current: 'architecture',
            topics: [
                {
                    id: 'architecture',
                    title: { pt: 'Arquitetura de Software', en: 'Software Architecture' },
                    description: {
                        pt: 'Define a organização de um sistema, as responsabilidades dos componentes e suas relações. Ajuda a tomar decisões sobre manutenção, segurança e crescimento, considerando requisitos e compromissos.',
                        en: 'Defines a system’s organization, component responsibilities and relationships. It guides decisions about maintenance, security and growth while considering requirements and trade-offs.'
                    }
                },
                {
                    id: 'agile',
                    title: { pt: 'Metodologias Ágeis (Scrum e Kanban)', en: 'Agile Methods (Scrum and Kanban)' },
                    description: {
                        pt: 'Abordagens ágeis favorecem entregas incrementais e feedback frequente. Scrum organiza o trabalho em ciclos; Kanban visualiza o fluxo e limita o trabalho em andamento para melhorar sua gestão.',
                        en: 'Agile approaches favor incremental delivery and frequent feedback. Scrum organizes work in cycles; Kanban visualizes flow and limits work in progress to improve its management.'
                    }
                },
                {
                    id: 'testing',
                    title: { pt: 'Testes de Software e Qualidade', en: 'Software Testing and Quality' },
                    description: {
                        pt: 'Testes verificam comportamentos esperados e ajudam a encontrar defeitos. Com revisões e critérios de qualidade, apoiam mudanças mais confiáveis; passar nos testes não garante ausência de falhas.',
                        en: 'Tests check expected behavior and help find defects. Alongside reviews and quality criteria, they support more reliable changes; passing tests does not guarantee the absence of bugs.'
                    }
                },
                {
                    id: 'version-control',
                    title: { pt: 'Controle de Versão, Git e CI/CD', en: 'Version Control, Git and CI/CD' },
                    description: {
                        pt: 'Git registra o histórico de alterações e facilita a colaboração. CI/CD automatiza etapas de integração, verificação e entrega ou implantação, conforme as regras do projeto.',
                        en: 'Git records change history and supports collaboration. CI/CD automates integration, verification, delivery or deployment steps according to a project’s rules.'
                    }
                }
            ]
        }
    ]
};

// Referências conceituais: IBM Think (RAG), Scrum Guide 2020 e WAI-ARIA APG (abas).
// Não há percentuais de domínio ou progresso: "Em estudo" indica apenas o foco atual.
(() => {
    const section = document.getElementById('agora');
    if (!section) return;
    const en = document.documentElement.lang.toLowerCase().startsWith('en');
    const lang = en ? 'en' : 'pt';
    const text = en
        ? { current: 'Studying now', status: 'In study', tabs: 'Study areas', hint: 'Select a topic to explore what it means.', updated: 'Updated: ' }
        : { current: 'Estudando agora', status: 'Em estudo', tabs: 'Áreas de estudo', hint: 'Selecione um assunto para explorar o que ele significa.', updated: 'Atualizado em: ' };
    const host = section.querySelector('.now-content');
    const tabs = [];
    const panels = [];
    const topicButtons = [];
    const explanations = [];

    function element(tag, className, content) {
        const node = document.createElement(tag);
        if (className) node.className = className;
        if (content !== undefined) node.textContent = content;
        return node;
    }
    function closeTopics() {
        topicButtons.forEach(button => button.setAttribute('aria-expanded', 'false'));
        explanations.forEach(panel => { panel.hidden = true; });
    }
    function activate(index, focus = false) {
        tabs.forEach((tab, i) => {
            tab.setAttribute('aria-selected', String(i === index));
            tab.tabIndex = i === index ? 0 : -1;
            panels[i].hidden = i !== index;
        });
        if (focus) tabs[index].focus();
        closeTopics();
    }

    const fragment = document.createDocumentFragment();
    const currentHeading = element('h3', 'now-current-heading', text.current);
    const currentGrid = element('div', 'now-current-grid');
    const tablist = element('div', 'now-tabs');
    tablist.setAttribute('role', 'tablist');
    tablist.setAttribute('aria-label', text.tabs);
    const panelContainer = element('div', 'now-panels');

    NOW_DATA.areas.forEach((area, areaIndex) => {
        const current = area.topics.find(topic => topic.id === area.current);
        if (current) {
            const card = element('article', 'now-current-card');
            card.append(element('p', 'now-area-label', area.title[lang]), element('h4', '', current.title[lang]), element('span', 'now-status', text.status));
            currentGrid.append(card);
        }
        const tab = element('button', 'now-tab', area.tab[lang]);
        tab.type = 'button';
        tab.id = 'now-tab-' + area.id;
        tab.setAttribute('role', 'tab');
        tab.setAttribute('aria-controls', 'now-panel-' + area.id);
        tab.addEventListener('click', () => activate(areaIndex));
        tab.addEventListener('keydown', event => {
            let next;
            if (event.key === 'ArrowRight') next = (areaIndex + 1) % tabs.length;
            if (event.key === 'ArrowLeft') next = (areaIndex - 1 + tabs.length) % tabs.length;
            if (event.key === 'Home') next = 0;
            if (event.key === 'End') next = tabs.length - 1;
            if (next !== undefined) { event.preventDefault(); activate(next, true); }
        });
        tabs.push(tab); tablist.append(tab);

        const panel = element('div', 'now-panel');
        panel.id = 'now-panel-' + area.id;
        panel.setAttribute('role', 'tabpanel');
        panel.setAttribute('aria-labelledby', tab.id);
        panel.tabIndex = 0;
        panel.append(element('h3', '', area.title[lang]), element('p', 'now-hint', text.hint));
        const tags = element('div', 'now-topic-tags');
        const details = element('div', 'now-details');

        area.topics.forEach((topic, topicIndex) => {
            const button = element('button', 'now-topic-button', topic.title[lang]);
            button.type = 'button';
            button.id = 'now-topic-' + area.id + '-' + topic.id;
            button.setAttribute('aria-expanded', 'false');
            button.setAttribute('aria-controls', button.id + '-detail');
            button.style.setProperty('--tag-delay', topicIndex * 55 + 'ms');
            const detail = element('div', 'now-explanation');
            detail.id = button.id + '-detail';
            detail.setAttribute('role', 'region');
            detail.setAttribute('aria-labelledby', button.id);
            detail.tabIndex = 0;
            detail.hidden = true;
            detail.append(element('h4', '', topic.title[lang]), element('p', '', topic.description[lang]));
            button.addEventListener('click', () => {
                const open = button.getAttribute('aria-expanded') !== 'true';
                closeTopics();
                button.setAttribute('aria-expanded', String(open));
                detail.hidden = !open;
            });
            detail.addEventListener('keydown', event => {
                if (event.key === 'Escape') { closeTopics(); button.focus(); }
            });
            tags.append(button); details.append(detail);
            topicButtons.push(button); explanations.push(detail);
        });
        panel.append(tags, details);
        panels.push(panel); panelContainer.append(panel);
    });
    fragment.append(currentHeading, currentGrid, tablist, panelContainer);
    host.replaceChildren(fragment);
    activate(0);

    const time = section.querySelector('time');
    time.dateTime = NOW_DATA.updated;
    time.textContent = new Intl.DateTimeFormat(en ? 'en-US' : 'pt-BR', { month: '2-digit', year: 'numeric', timeZone: 'UTC' }).format(new Date(NOW_DATA.updated + '-01T12:00:00Z'));
    section.querySelector('.now-updated-label').textContent = text.updated;

    // Só anima a rede quando está visível; tags entram em sequência sem esconder conteúdo sem JS.
    function syncVisibility() { section.classList.toggle('now-paused', document.hidden); }
    document.addEventListener('visibilitychange', syncVisibility);
    syncVisibility();
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                section.classList.toggle('now-in-view', entry.isIntersecting);
                if (entry.isIntersecting) section.classList.add('now-entered');
            });
        }, { threshold: 0.06 });
        observer.observe(section);
    } else section.classList.add('now-entered');
})();
