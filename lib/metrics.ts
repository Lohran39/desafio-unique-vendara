/**
 * Motor de Métricas Exclusivas da Plataforma Vendara B2B:
 * 1. IRC - Índice de Interesse Real de Compra
 * 2. FCI - Fluxo Comercial Inverso
 */

export interface IRCCalculationParams {
  estimatedBudget: number; // Volume financeiro em R$
  deadlineDays: number;    // Prazo máximo pretendido para fechamento
  hasDecisor: boolean;     // Decisor/Orçamento aprovado na empresa
  isRecurring: boolean;    // Se é contrato recorrente ou compra pontual
}

export interface IRCResult {
  score: number; // 0 - 100
  level: 'Crítico / Imediato' | 'Alto' | 'Médio' | 'Baixo';
  description: string;
  breakdown: {
    budgetWeight: number;
    urgencyWeight: number;
    decisionWeight: number;
    recurrenceWeight: number;
  };
}

/**
 * Calcula o Índice de Interesse Real de Compra (IRC)
 * Algoritmo multicritério ponderado:
 * - Urgência / Prazo (30%)
 * - Orçamento e Viabilidade Financeira (25%)
 * - Alinhamento com Decisor / Diretoria (30%)
 * - Potencial de LTV / Recorrência (15%)
 */
export function calculateIRC(params: IRCCalculationParams): IRCResult {
  // 1. Urgência (dias)
  let urgencyWeight = 0;
  if (params.deadlineDays <= 7) urgencyWeight = 30;
  else if (params.deadlineDays <= 15) urgencyWeight = 25;
  else if (params.deadlineDays <= 30) urgencyWeight = 18;
  else if (params.deadlineDays <= 60) urgencyWeight = 10;
  else urgencyWeight = 5;

  // 2. Orçamento (R$)
  let budgetWeight = 0;
  if (params.estimatedBudget >= 500000) budgetWeight = 25;
  else if (params.estimatedBudget >= 100000) budgetWeight = 20;
  else if (params.estimatedBudget >= 25000) budgetWeight = 15;
  else if (params.estimatedBudget > 0) budgetWeight = 10;
  else budgetWeight = 2;

  // 3. Decisor aprovado
  const decisionWeight = params.hasDecisor ? 30 : 10;

  // 4. Recorrência
  const recurrenceWeight = params.isRecurring ? 15 : 8;

  const totalScore = Math.min(100, urgencyWeight + budgetWeight + decisionWeight + recurrenceWeight);

  let level: IRCResult['level'] = 'Baixo';
  let description = 'Oportunidade em estágio preliminar de estudo ou prospecção.';

  if (totalScore >= 80) {
    level = 'Crítico / Imediato';
    description = 'Demanda de alta prioridade com decisor alinhado e orçamento garantido. Fechamento urgente.';
  } else if (totalScore >= 65) {
    level = 'Alto';
    description = 'Interesse consolidado com viabilidade comprovada para curto prazo.';
  } else if (totalScore >= 45) {
    level = 'Médio';
    description = 'Interesse moderado, fase de cotações de mercado e alinhamento de escopo.';
  }

  return {
    score: totalScore,
    level,
    description,
    breakdown: {
      budgetWeight,
      urgencyWeight,
      decisionWeight,
      recurrenceWeight,
    },
  };
}

export interface FCIMatch {
  supplierId: string;
  supplierName: string;
  matchReason: string;
  relevanceScore: number; // 0 a 100
  readinessSpeed: string;
}

/**
 * FCI - Fluxo Comercial Inverso
 * Em vez do fornecedor esperar o cliente visitar sua vitrine, o FCI identifica a demanda
 * do comprador e ativa ativamente os fornecedores mais aptos, acelerando a conversão.
 */
export function executeFCI(
  demandCategory: string,
  demandLocation: string,
  suppliers: Array<{
    id: string;
    name: string;
    category: string;
    location: string;
    verified: boolean;
    rating: number;
  }>
): FCIMatch[] {
  return suppliers
    .map(sup => {
      let score = 50;
      const reasons: string[] = [];

      if (sup.category === demandCategory) {
        score += 30;
        reasons.push('Especialista direto na categoria');
      }

      if (sup.location.includes(demandLocation) || demandLocation.includes('Brasil') || sup.location.includes('Brasil')) {
        score += 10;
        reasons.push('Proximidade logística');
      }

      if (sup.verified) {
        score += 10;
        reasons.push('Fornecedor verificado com selo de garantia');
      }

      return {
        supplierId: sup.id,
        supplierName: sup.name,
        matchReason: reasons.join(' • ') || 'Compatibilidade de catálogo',
        relevanceScore: Math.min(100, score),
        readinessSpeed: score > 80 ? 'Atendimento em menos de 2h' : 'Atendimento em 24h',
      };
    })
    .sort((a, b) => b.relevanceScore - a.relevanceScore);
}
