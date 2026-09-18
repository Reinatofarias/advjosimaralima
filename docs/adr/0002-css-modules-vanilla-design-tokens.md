# ADR 0002: Estilização com CSS Modules e Design Tokens Vanilla

* **Status:** Aceito
* **Data:** 2026-09-18
* **Decisores:** UX/UI Designer & Front-end Sênior

### Contexto
Para atender ao público-alvo com forte presença de trabalhadores rurais e conexões móveis simples, a interface precisa ser leve, ter carregamento instantâneo, evitar bundles pesados e ao mesmo tempo expressar acolhimento, solidez e modernidade sem ostentação.

### Decisão
Utilizar **CSS Modules nativo com CSS Custom Properties (Design Tokens)** centralizados em `src/app/globals.css`.
* Evita o peso e dependência de frameworks utilitários externos.
* Garante isolamento estrito de classes CSS por componente (zero colisão global).
* Permite controle fino e artesanal de microinterações, foco acessível e responsividade mobile-first.

### Consequências
* CSS com zero runtime Javascript.
* Bundle CSS compilado mínimo e em cache agressivo pelo browser.
* Total alinhamento com as diretrizes do UI Style Guide definido em `docs/05-UI-STYLE-GUIDE.md`.
