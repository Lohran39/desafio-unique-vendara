'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDemo } from '@/components/shared/DemoContext';
import { B2BDemand } from '@/types';
import { calculateIRC } from '@/lib/metrics';
import { 
  ShoppingBag, 
  TrendingUp, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight,
  Calculator,
  ShieldCheck
} from 'lucide-react';

export default function NovaDemandaPage() {
  const router = useRouter();
  const { addDemand, currentUser } = useDemo();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<B2BDemand['category']>('Máquinas & Equipamentos');
  const [description, setDescription] = useState('');
  const [estimatedBudget, setEstimatedBudget] = useState(150000);
  const [deadlineDays, setDeadlineDays] = useState(30);
  const [hasDecisor, setHasDecisor] = useState(true);
  const [isRecurring, setIsRecurring] = useState(false);

  // Live calculation of IRC as user modifies fields
  const liveIRC = calculateIRC({
    estimatedBudget,
    deadlineDays,
    hasDecisor,
    isRecurring,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert('Por favor, preencha o título e a descrição da demanda.');
      return;
    }

    addDemand({
      title,
      category,
      description,
      estimatedBudget,
      deadlineDays,
      hasDecisor,
      isRecurring,
    });

    router.push('/vendara/demandas');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      <div>
        <div className="flex items-center gap-2 text-emerald-700 text-xs font-semibold uppercase tracking-wider mb-1">
          <ShoppingBag className="w-4 h-4 text-emerald-600" />
          Compras Corporativas & Sourcing
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          Cadastrar Nova Demanda de Compra
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Informe os parâmetros da necessidade para o algoritmo calcular o <strong>IRC (Índice de Interesse Real)</strong> e disparar o <strong>FCI</strong> para fornecedores qualificados.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Form Column */}
        <form onSubmit={handleSubmit} className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b pb-2">
              1. Identificação da Demanda
            </h3>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Título Resumido da Necessidade *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Aquisição de 10 Toneladas de Tubos de Aço Carbono"
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:border-emerald-500 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Categoria do Setor</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as B2BDemand['category'])}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:border-emerald-500 outline-none bg-slate-50"
              >
                <option value="Máquinas & Equipamentos">Máquinas & Equipamentos</option>
                <option value="Matéria-Prima">Matéria-Prima</option>
                <option value="TI & Software Corporativo">TI & Software Corporativo</option>
                <option value="Logística & Transporte">Logística & Transporte</option>
                <option value="Serviços Especializados">Serviços Especializados</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Descrição Técnica e Escopo *</label>
              <textarea
                required
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Especifique normas ABNT/ISO, tolerâncias mecânicas, requisitos de entrega ou certificações exigidas..."
                className="w-full p-3.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:border-emerald-500 outline-none"
              />
            </div>
          </div>

          {/* IRC Factors inputs */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b pb-2 flex items-center justify-between">
              <span>2. Parâmetros Determinantes do IRC</span>
              <span className="text-[10px] text-emerald-600 font-bold lowercase">impactam o score de compra</span>
            </h3>

            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-700">Orçamento Previsto (R$)</span>
                <span className="font-bold text-emerald-700">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(estimatedBudget)}
                </span>
              </div>
              <input
                type="range"
                min="10000"
                max="2000000"
                step="10000"
                value={estimatedBudget}
                onChange={(e) => setEstimatedBudget(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-700">Prazo Limite para Decisão / Fechamento</span>
                <span className="font-bold text-slate-900">{deadlineDays} dias</span>
              </div>
              <input
                type="range"
                min="5"
                max="90"
                step="5"
                value={deadlineDays}
                onChange={(e) => setDeadlineDays(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

            <div className="space-y-3 pt-2">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasDecisor}
                  onChange={(e) => setHasDecisor(e.target.checked)}
                  className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500"
                />
                <div className="text-xs">
                  <span className="font-bold text-slate-800">Orçamento Aprovado por Decisor / Diretoria</span>
                  <p className="text-[11px] text-slate-500">
                    Aumenta expressivamente o IRC ao demonstrar que a empresa possui fundos liberados para compra imediata.
                  </p>
                </div>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isRecurring}
                  onChange={(e) => setIsRecurring(e.target.checked)}
                  className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500"
                />
                <div className="text-xs">
                  <span className="font-bold text-slate-800">Fornecimento Recorrente (Contrato Contínuo)</span>
                  <p className="text-[11px] text-slate-500">
                    Sinaliza LTV recorrente para os fornecedores, atraindo melhores condições comerciais.
                  </p>
                </div>
              </label>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-100 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-lg shadow-emerald-600/25 transition flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Publicar Demanda & Ativar FCI
            </button>
          </div>

        </form>

        {/* Live IRC Calculator Preview Card */}
        <div className="space-y-4">
          <div className="bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 shadow-xl space-y-5 sticky top-28">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <Calculator className="w-4 h-4" />
              Cálculo do IRC em Tempo Real
            </div>

            <div className="text-center py-4 bg-slate-800/60 rounded-2xl border border-slate-700 space-y-1">
              <span className="text-[11px] text-slate-400 uppercase font-semibold">Índice Calculado</span>
              <div className="text-5xl font-extrabold text-emerald-400 tracking-tight">
                {liveIRC.score}
              </div>
              <span className="inline-block text-[11px] font-bold px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {liveIRC.level}
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {liveIRC.description}
            </p>

            <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
              <span className="font-semibold text-slate-400 block">Composição do Score:</span>
              <div className="space-y-1.5 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-400">Prazo / Urgência:</span>
                  <span className="font-bold text-white">{liveIRC.breakdown.urgencyWeight} / 30 pts</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Volume Orçamentário:</span>
                  <span className="font-bold text-white">{liveIRC.breakdown.budgetWeight} / 25 pts</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Aprovação do Decisor:</span>
                  <span className="font-bold text-white">{liveIRC.breakdown.decisionWeight} / 30 pts</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Potencial de Recorrência:</span>
                  <span className="font-bold text-white">{liveIRC.breakdown.recurrenceWeight} / 15 pts</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-emerald-950/60 rounded-xl border border-emerald-800 text-[11px] text-emerald-200 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                Ao publicar, o <strong>FCI</strong> disparará notificações para fornecedores verificados com capacidade produtiva compatível.
              </span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
