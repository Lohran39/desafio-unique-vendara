# Grupo Unique — Unique Talentos & Vendara B2B

[![Next.js](https://img.shields.io/badge/Next.js-15.5-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel)](https://desafio-psi-ashy.vercel.app)

> **Ecossistema digital integrado** desenvolvido em resposta ao Briefing Técnico do **Grupo Unique**, unindo o **Portal de Empregos (Unique Talentos)** ao **Marketplace B2B (Vendara)** com inteligência de dados, busca semântica em tempo real e os algoritmos proprietários de **IRC** e **FCI**.

🚀 **Acesse a aplicação em produção no Vercel:**  
👉 **[https://desafio-psi-ashy.vercel.app](https://desafio-psi-ashy.vercel.app)**

---

## 🌟 Principais Destaques da Plataforma

### 1. Barra de Demonstração em Tempo Real (`DemoBar`)
No topo da aplicação, uma barra fixa permite aos avaliadores técnicos simularem a experiência completa em 5 papéis sem a necessidade de criar contas ou efetuar logouts manuais:
- 💼 **Recrutador** (*Ana Beatriz - InovaTech / Grupo Unique*)
- 👨‍💻 **Candidato** (*Lucas Moreira - Desenvolvedor Full Stack Sênior*)
- 🏢 **Comprador B2B** (*Roberto Camargo - Diretor de Suprimentos na Metalúrgica Alfa*)
- 🏭 **Fornecedor B2B** (*Juliana Prado - Diretora Comercial na Nexus Máquinas*)
- 🛡️ **Admin Master** (*Diretoria Grupo Unique*)

---

### 2. Portal de Empregos — Unique Talentos
- **Busca Avançada com Filtros Facetados**: Filtros instantâneos por departamento, senioridade, pretensão salarial e modalidade (Remoto/Híbrido/Presencial).
- **Matching por Inteligência Artificial**: Cálculo em tempo real do **Match Score (0 a 100%)** cruzando as competências do candidato logado com os requisitos técnicos da vaga, acompanhado de diagnóstico técnico.
- **Painel do Recrutador com Funil Kanban**: Gestão de candidaturas em 4 fases (*Triagem &rarr; Entrevista &rarr; Proposta &rarr; Contratado*) com movimentação em 1 clique.
- **Banco de Talentos & Currículos**: Busca ativa de profissionais qualificados por tecnologias e localização.
- **Publicação Guiada de Vagas**: Criação ágil de vagas com tags dinâmicas e pacotes de benefícios.

---

### 3. Marketplace B2B — Vendara
- **Catálogo Corporativo & Industrial**: Vitrine de máquinas industriais, matérias-primas e serviços corporativos com fornecedores auditados e cotações diretas.
- **Mural de Demandas de Compras**: Publicação e consulta de solicitações corporativas abertas.
- **IRC (Índice de Interesse Real de Compra)**: Algoritmo multicritério que avalia a probabilidade de fechamento da operação com base em:
  - Urgência / Prazo (30%)
  - Decisor / C-Level Aprovado (30%)
  - Volume Orçamentário (25%)
  - Potencial de Recorrência / LTV (15%)
- **FCI (Fluxo Comercial Inverso)**: Algoritmo que rompe o modelo tradicional passivo, notificando automaticamente os fornecedores mais aptos assim que uma demanda qualificada surge no sistema.
- **Laboratório Interativo IRC & FCI**: Simulador interativo com gauge SVG animado para teste dos parâmetros de compra.

---

### 4. Modelo de Monetização & Planos SaaS
- Matriz completa de planos (**Básico Free**, **Profissional Pro** e **Corporativo Enterprise**) com controle granular de permissões e limites tanto para o portal de talentos quanto para o marketplace B2B.

---

## 🛠️ Stack Tecnológica

| Camada | Tecnologia | Justificativa Técnica |
| :--- | :--- | :--- |
| **Front-end** | Next.js 15 (App Router) + React 19 | Renderização híbrida (SSR para SEO de vagas e SPA para painéis rápidos), mobile-first. |
| **Linguagem** | TypeScript 5.8 | Tipagem estrita fim-a-fim, prevenindo inconsistências em tempo de compilação. |
| **Estilização** | Tailwind CSS + Lucide Icons | Design corporativo moderno, responsivo com suporte a glassmorphism e microinterações. |
| **Arquitetura de Dados** | Modelagem Relacional & Vetorial | Compatível com PostgreSQL + extensão `pgvector` para busca semântica unificada. |
| **Deploy** | Vercel Edge Platform | Hospedagem global de alta disponibilidade com CDN e SSL automático. |

---

## 📂 Estrutura de Pastas

```
├── app/
│   ├── globals.css              # Design system, grids e animações
│   ├── layout.tsx               # Root Layout com DemoProvider, DemoBar, Navbar e Footer
│   ├── page.tsx                 # Landing Page institucional unificada do Grupo Unique
│   ├── planos/                  # Tabela comparativa de planos e monetização SaaS
│   ├── talentos/                # Portal Unique Talentos
│   │   ├── page.tsx             # Home do portal com busca rápida e vagas em alta
│   │   ├── vagas/               # Busca facetada com modal e matching de IA
│   │   ├── candidatos/          # Banco de talentos e currículos
│   │   ├── publicar/            # Formulário de publicação de novas vagas
│   │   └── dashboard/           # Funil Kanban do recrutador e histórico de candidaturas
│   └── vendara/                 # Marketplace Vendara B2B
│       ├── page.tsx             # Home do marketplace e categorias
│       ├── catalogo/            # Catálogo de produtos/serviços e cotações
│       ├── demandas/            # Mural de demandas de compra com badges de IRC
│       ├── nova-demanda/        # Formulário com cálculo dinâmico de IRC
│       ├── irc-fci/             # Laboratório analítico e simulador interativo de IRC e FCI
│       └── dashboard/           # Painel de suprimentos e conexões de vendas
├── components/
│   └── shared/                  # Navbar, DemoBar, Footer e DemoContext
├── lib/
│   ├── matching.ts              # Motor semântico de compatibilidade candidato x vaga
│   ├── metrics.ts               # Algoritmos do IRC (score ponderado) e FCI (roteamento inverso)
│   └── mockData.ts              # Massa de dados rica com empresas, vagas e produtos
└── types/
    └── index.ts                 # Definições estritas de tipos TypeScript
```

---

## 🚀 Como Executar Localmente

### Pré-requisitos
- Node.js 18+ instalado
- npm ou yarn

### Passo a Passo

```bash
# 1. Clone o repositório
git clone git@github.com:Lohran39/desafio-unique-vendara.git

# 2. Acesse a pasta do projeto
cd desafio-unique-vendara

# 3. Instale as dependências
npm install

# 4. Inicie o servidor de desenvolvimento
npm run dev
```

Acesse em seu navegador:  
👉 **`http://localhost:3000`**

---

## 📄 Documentos Inclusos
- **[`Proposta_Tecnica_Unique_Vendara.md`](./Proposta_Tecnica_Unique_Vendara.md)**: Proposta técnica e comercial formal para o Grupo Unique.
- **[`Briefing_Tecnico_Unique_Talentos_Vendara.docx`](./Briefing_Tecnico_Unique_Talentos_Vendara.docx)**: Documento original de requisitos.
