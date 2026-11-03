'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useDemo } from '@/components/shared/DemoContext';
import { calculateIRC, executeFCI } from '@/lib/metrics';
import { 
  TrendingUp, 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  Target, 
  Sparkles, 
  ShieldCheck, 
  Building2, 
  Bell, 
  Workflow, 
  Search,
  Sliders
} from 'lucide-react';

export default function IrcFciExplainerPage() {
  const { demands, products } = useDemo();

  // Interactive Simulator State
  const [budget, setBudget] = useState(350000);
  const [days, setDays] = useState(15);
  const [hasDecisor, setHasDecisor] = useState(true);
  const [isRecurring, setIsRecurring] = useState(true);

  const simulatedIRC = calculateIRC({
    estimatedBudget: budget,
    deadlineDays: days,
    hasDecisor,
    isRecurring,
  });

  // Simulator for FCI
  const suppliersList = products.map(p => ({
    id: p.supplierId,
    name: p.supplierName,
    category: p.category,
    location: p.supplierLocation,
    verified: p.supplierVerified,
    rating: p.rating,
  }));
  const fciResults = executeFCI('Máquinas & Equipamentos', 'Curitiba, PR', suppliersList);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Title */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
          <Workflow className="w-3.5 h-3.5 text-emerald-600" />
          Inteligência Comercial Proprietária do Grupo Unique
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Painel Analítico de IRC & FCI
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Compreenda como os dois pilares tecnológicos do <strong>Vendara B2B</strong> eliminam o desperdício de tempo comercial, priorizam negócios com dinheiro em caixa e ativam fornecedores de forma reversa e automatizada.
        </p>
      </div>

      {/* Two Pillars Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Pillar 1: IRC */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">Pilar 1</span>
              <h2 className="text-xl font-bold text-slate-900 leading-tight">IRC — Índice de Interesse Real de Compra</h2>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Muitas plataformas B2B sofrem com cotações falsas e compradores sem verba. O IRC é um score preditivo de <strong>0 a 100</strong> que afere a maturidade e a probabilidade de fechamento imediato da demanda corporativa.
          </p>

          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Composição Ponderada do Algoritmo
            </h4>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <div className="font-bold text-slate-800">Urgência / Prazo (30%)</div>
                <div className="text-[11px] text-slate-500">Prazos curtos (&lt; 15 dias) aumentam a pontuação.</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <div className="font-bold text-slate-800">Decisor Alinhado (30%)</div>
                <div className="text-[11px] text-slate-500">Confirmação de aprovação pela diretoria/C-Level.</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <div className="font-bold text-slate-800">Orçamento Previsto (25%)</div>
                <div className="text-[11px] text-slate-500">Volume financeiro compatível com o mercado.</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <div className="font-bold text-slate-800">Potencial LTV (15%)</div>
                <div className="text-[11px] text-slate-500">Contratos contínuos com compras recorrentes.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Pillar 2: FCI */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-teal-600">Pilar 2</span>
              <h2 className="text-xl font-bold text-slate-900 leading-tight">FCI — Fluxo Comercial Inverso</h2>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Diferente dos marketplaces tradicionais onde o vendedor espera passivamente que um comprador visite sua página, o <strong>FCI inverte o funil</strong>: assim que uma demanda é publicada, os fornecedores com melhor histórico e capacidade são ativados automaticamente.
          </p>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Workflow className="w-4 h-4 text-emerald-600" />
              Comparativo de Dinâmica Comercial
            </h4>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-red-50/60 border border-red-200/60 text-red-900 space-y-1">
                <span className="font-bold block text-[11px] uppercase">Fluxo Tradicional (Passivo)</span>
                <p className="text-[11px] text-red-800">
                  Fornecedor anuncia produto &rarr; Espera cliente buscar no Google &rarr; Recebe lead frio &rarr; Negociação longa e sem garantia.
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-1">
                <span className="font-bold block text-[11px] uppercase text-emerald-700">FCI Vendara (Ativo & Inteligente)</span>
                <p className="text-[11px] text-emerald-900">
                  Comprador publica necessidade qualificada (IRC &gt; 80) &rarr; FCI varre base &rarr; Fornecedores recebem oportunidade pronta com cotação direta em poucas horas.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Interactive Simulator Section */}
      <section className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5 mb-1">
              <Sliders className="w-4 h-4" />
              Laboratório Interativo
            </div>
            <h3 className="text-2xl font-bold text-white">Simulador Dinâmico de IRC & FCI</h3>
            <p className="text-xs text-slate-400 mt-1">
              Altere os sliders para visualizar como o algoritmo recalcula o índice e prioriza o matching.
            </p>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Score Resultante</span>
            <span className="text-4xl font-extrabold text-emerald-400">{simulatedIRC.score} pts</span>
            <span className="block text-[11px] font-bold text-emerald-300">{simulatedIRC.level}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Controls */}
          <div className="space-y-5 lg:col-span-2">
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300">Volume Orçamentário da Operação:</span>
                <strong className="text-emerald-400 font-bold">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(budget)}
                </strong>
              </div>
              <input
                type="range"
                min="15000"
                max="1000000"
                step="25000"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300">Prazo Máximo para Decisão / Entrega:</span>
                <strong className="text-white font-bold">{days} dias</strong>
              </div>
              <input
                type="range"
                min="5"
                max="90"
                step="5"
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/80 border border-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasDecisor}
                  onChange={(e) => setHasDecisor(e.target.checked)}
                  className="rounded text-emerald-500 focus:ring-emerald-400"
                />
                <span className="text-xs text-slate-200">Decisor / C-Level Aprovou Verba (+30 pts)</span>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/80 border border-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isRecurring}
                  onChange={(e) => setIsRecurring(e.target.checked)}
                  className="rounded text-emerald-500 focus:ring-emerald-400"
                />
                <span className="text-xs text-slate-200">Compra Recorrente / Contrato (+15 pts)</span>
              </label>
            </div>
          </div>

          {/* FCI Output preview */}
          <div className="bg-slate-800/60 p-5 rounded-2xl border border-slate-700 space-y-4">
            <div className="flex items-center justify-between text-xs font-bold text-slate-300 uppercase tracking-wider">
              <span>Disparos FCI Simulados</span>
              <span className="text-emerald-400">Ativo</span>
            </div>

            <div className="space-y-2.5">
              {fciResults.slice(0, 2).map(match => (
                <div key={match.supplierId} className="p-3 bg-slate-900 rounded-xl border border-slate-700/80 text-xs space-y-1">
                  <div className="flex justify-between font-bold text-white">
                    <span>{match.supplierName}</span>
                    <span className="text-emerald-400 font-extrabold">{match.relevanceScore}%</span>
                  </div>
                  <div className="text-[10px] text-slate-400">{match.matchReason}</div>
                  <div className="text-[10px] text-emerald-300 font-medium">⚡ {match.readinessSpeed}</div>
                </div>
              ))}
            </div>

            <div className="pt-2 text-[11px] text-slate-400">
              Score de <strong>{simulatedIRC.score}</strong> dispara alertas automáticos prioritários no canal corporativo dos fornecedores.
            </div>
          </div>

        </div>
      </section>

      {/* Active Demands with current IRC Ranking */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-900">Ranking Real de Demandas Ativas por IRC</h3>
            <p className="text-xs text-slate-500">Acompanhamento contínuo da fila de oportunidades B2B</p>
          </div>
          <Link
            href="/vendara/nova-demanda"
            className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1"
          >
            Cadastrar Nova Demanda
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-700 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
              <tr>
                <th className="p-4">Demanda B2B</th>
                <th className="p-4">Empresa / Prazo</th>
                <th className="p-4">Orçamento</th>
                <th className="p-4 text-center">Score IRC</th>
                <th className="p-4">Status FCI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {demands.map(d => (
                <tr key={d.id} className="hover:bg-slate-50 transition">
                  <td className="p-4 font-semibold text-slate-900">
                    <div>{d.title}</div>
                    <div className="text-[10px] text-slate-400 font-normal">{d.category}</div>
                  </td>
                  <td className="p-4">
                    <div className="font-medium text-slate-800">{d.buyerCompany}</div>
                    <div className="text-[10px] text-slate-500">{d.deadlineDays} dias restantes</div>
                  </td>
                  <td className="p-4 font-bold text-slate-900">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(d.estimatedBudget)}
                  </td>
                  <td className="p-4 text-center">
                    <span className="inline-block px-2.5 py-1 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800">
                      {d.ircScore} pts ({d.ircLevel})
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="text-[11px] font-medium text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      {d.fciStatus} ({d.matchedSuppliersCount} parceiros)
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
}
