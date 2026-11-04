# Proposta de Solução Técnica: Módulo SOS Freelance & Diárias de Emergência
**Plataforma Unique Talentos — Grupo Unique**  
*Documento de Especificação Técnica e Operacional para Apresentação ao Cliente*

---

## 1. Resumo Executivo & O Desafio do Setor

No setor gastronômico, hoteleiro e de eventos, a ausência imprevista de um colaborador (atestado médico em cima da hora, emergências pessoais ou falta sem aviso) gera um **impacto financeiro e operacional imediato**:
- Redução na capacidade de atendimento e perda de mesas/faturamento;
- Sobrecarga e desgaste da equipe remanescente no turno;
- Frustração da experiência do cliente final.

**O objetivo deste módulo é resolver a falta em menos de 20 minutos**, conectando o restaurante aos melhores profissionais autônomos disponíveis e geograficamente mais próximos, com confirmação automatizada e sem fricção.

---

## 2. Arquitetura de Busca em Tempo Real no Banco de Dados

Diferente de um processo seletivo tradicional (que busca por palavras-chave e aguarda dias pela triagem), a contratação emergencial exige **velocidade sub-segundo e cruzamento espacial (GPS)**.

```
[Dono do Restaurante] 
       │ 
       ▼ (1 clique: "Preciso de Garçom hoje das 18h às 23h")
[Motor de Matching SOS]
       ├─► 1. Redis GEO (Localiza profissionais livres num raio de até 8 km em < 5ms)
       ├─► 2. PostgreSQL + PostGIS (Filtra função, avaliação por estrelas e No-Show Score)
       └─► 3. Algoritmo de Scoring (Ranqueia os Top 5 profissionais mais aptos)
```

### 2.1 Tecnologias Selecionadas para o Motor de Busca

| Tecnologia | Papel na Solução | Por que foi escolhida? |
| :--- | :--- | :--- |
| **Redis (Redis GEO)** | Indexação espacial em memória dos profissionais disponíveis. | Capacidade de consultar coordenadas geográficas (`GEOSEARCH`) com latência inferior a **5 milissegundos**, sem onerar o banco relacional. |
| **PostgreSQL + PostGIS** | Base relacional corporativa e histórico profissional. | Persistência segura de dados, histórico de avaliações, certificados e conformidade com a LGPD. |
| **Algoritmo de Confiabilidade (Anti No-Show)** | Ponderação e reputação do autônomo. | Avalia a taxa de comparecimento histórico. Freelancers que faltaram sem aviso prévio são rebaixados no ranking de despacho automático. |

### 2.2 Critérios do Algoritmo de Priorização

A ordenação dos profissionais que receberão o chamado segue a fórmula:

$$\text{Índice de Prioridade} = (\text{Proximidade Geográfica} \times 40\%) + (\text{Avaliação em Estrelas} \times 30\%) + (\text{Taxa de Presença Histórica} \times 30\%)$$

---

## 3. Estratégia de Comunicação & Despacho Imediato

O envio de e-mails ou notificações silenciosas em aplicativos não atende à urgência do restaurante. A solução utiliza uma **estratégia de comunicação ativa via WhatsApp Business API**.

### 3.1 Mensagem Interativa com Ação Rápida

O sistema dispara simultaneamente para os **5 profissionais mais próximos e melhor avaliados** uma mensagem direta no WhatsApp com botões interativos de ação imediata:

```
┌─────────────────────────────────────────────────────────────┐
│ 🚨 OPORTUNIDADE DE DIÁRIA URGENTE — HOJE                    │
│                                                             │
│ Olá, Lucas! O restaurante abaixo precisa de um profissional │
│ com seu perfil para o turno de hoje:                        │
│                                                             │
│ 🏢 Estabelecimento: Restaurante Fogão Mineiro               │
│ 🍽️ Função: Garçom / Salão                                   │
│ ⏰ Horário: Hoje, das 18:00 às 23:30                         │
│ 📍 Distância: 2,3 km de você (aprox. 12 minutos de trajeto) │
│ 💰 Remuneração: R$ 180,00 (pago via PIX ao fim do turno)     │
│ 🍴 Benefício: Jantar da equipe incluso no local              │
│                                                             │
│ [ 🟢 ACEITAR DIÁRIA AGORA ]      [ 🔴 HOJE NÃO POSSO ]      │
└─────────────────────────────────────────────────────────────┘
```

### 3.2 Regra de Negócio: "Primeiro a Aceitar Leva" (*First-to-Claim*)
- **Trava de Concorrência Segura (Distributed Lock via Redis)**: No milissegundo em que o primeiro candidato clica em **[ACEITAR DIÁRIA AGORA]**, o sistema bloqueia a vaga (`lock:vaga_id`), garantindo que apenas uma pessoa assuma o posto, evitando conflitos de escala;
- **Feedback aos Demais Profissionais**: Os outros 4 profissionais recebem uma notificação educada informando que a vaga foi preenchida, mantendo o engajamento alto para os próximos chamados.

---

## 4. Fluxo Operacional Pós-Confirmação

Assim que o profissional aceita o turno, a plataforma assume a condução logística para garantir que ele chegue no horário:

```
[Freelance Aceita] 
       │
       ├─► WhatsApp do Candidato:
       │     • Link direto para navegação no Waze / Google Maps;
       │     • Código de vestimenta (ex: "Camisa polo preta, calça escura e calçado antiderrapante");
       │     • Contato direto do gerente/chefe de salão para recepção.
       │
       └─► Painel do Restaurante:
             • Notificação em tempo real no dashboard e WhatsApp do gerente;
             • Nome, foto, telefone e previsão estimada de chegada do profissional;
             • Botão para validação de entrada via QR Code no balcão.
```

---

## 5. Validação de Presença e Avaliação Mútua

Para construir uma rede de freelancers confiável e de longo prazo:
1. **Check-in no Estabelecimento**: Na chegada, o freelancer faz o check-in lendo um **QR Code único gerado no painel do restaurante** ou via validação de raio GPS (Geofencing);
2. **Avaliação 360° Pós-Turno**:
   - O restaurante avalia pontualidade, postura e atendimento (1 a 5 estrelas);
   - O freelancer avalia se o valor combinado foi pago corretamente e o ambiente de trabalho;
3. **Liquidação Financeira**: Integração via Webhook com split de pagamentos (PIX automatizado), dando segurança ao profissional e agilidade ao restaurante.

---

## 6. Cronograma Sugerido de Implementação

| Etapa | Escopo & Entregáveis | Duração Estimada |
| :---: | :--- | :---: |
| **Fase 1** | Modelagem de dados espaciais no PostgreSQL + PostGIS e rotas no Redis GEO. | 1 a 2 semanas |
| **Fase 2** | Integração do gateway de WhatsApp Business API com templates e botões interativos. | 1 a 2 semanas |
| **Fase 3** | Mecanismo de trava de concorrência (*First-to-Claim*), regras de no-show e check-in via QR Code. | 1 semana |
| **Fase 4** | Testes integrados com donos de restaurantes e grupo piloto de freelancers para homologação. | 1 semana |

---

## 7. Conclusão & Próximos Passos

Esta solução resolve uma das **maiores dores diárias do setor gastronômico e de serviços**, elevando a plataforma **Unique Talentos** de um simples mural de vagas para uma **ferramenta de resgate operacional indispensável** para donos e gerentes de estabelecimentos.

Estamos à disposição para alinhar o início do desenvolvimento deste módulo dentro do cronograma do projeto.
