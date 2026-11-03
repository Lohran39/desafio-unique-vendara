'use client';

import React from 'react';
import Link from 'next/link';
import { useDemo } from '@/components/shared/DemoContext';
import { 
  ShoppingBag, 
  PlusCircle, 
  TrendingUp, 
  CheckCircle2, 
  BarChart3, 
  Building2, 
  DollarSign, 
  FileText, 
  ArrowRight,
  ShieldCheck,
  Zap
} from 'lucide-react';

export default function VendaraDashboardPage() {
  const { currentUser, demands, products, showNotification } = useDemo();

  const isSupplier = currentUser.role === 'fornecedor_b2b';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-700 text-xs font-semibold uppercase tracking-wider mb-1">
            <BarChart3 className="w-4 h-4 text-emerald-600" />
            {isSupplier ? 'Painel do Fornecedor B2B' : 'Painel de Suprimentos & Procurement'}
          </div>
          <h1 className="text-2xl font-bold text-slate-900">
            {isSupplier ? 'Gestão Comercial de Fornecimento' : 'Controle de Demandas & Cotações'}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {isSupplier
              ? 'Oportunidades capturadas via FCI, propostas submetidas e performance do catálogo.'
              : 'Acompanhamento do pipeline de aquisições corporativas e métricas de IRC.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {isSupplier ? (
            <Link
              href="/vendara/demandas"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-md transition shrink-0"
            >
              <Zap className="w-4 h-4" />
              Ver Oportunidades FCI
            </Link>
          ) : (
            <Link
              href="/vendara/nova-demanda"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-md transition shrink-0"
            >
              <PlusCircle className="w-4 h-4" />
              Nova Demanda B2B
            </Link>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <div className="text-xs text-slate-500 font-medium">
            {isSupplier ? 'Itens Ativos no Catálogo' : 'Demandas Publicadas'}
          </div>
          <div className="text-2xl font-bold text-slate-900">
            {isSupplier ? products.length : demands.length}
          </div>
          <div className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            {isSupplier ? '100% auditados' : 'IRC ativo'}
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <div className="text-xs text-slate-500 font-medium">
            {isSupplier ? 'Conexões FCI Recebidas' : 'Volume Estimado em Cotação'}
          </div>
          <div className="text-2xl font-bold text-emerald-700">
            {isSupplier ? '12 conexões' : 'R$ 1.025.000'}
          </div>
          <div className="text-[10px] text-emerald-600 font-semibold">
            {isSupplier ? 'Sem custo por lead' : 'Média de 3 propostas/demanda'}
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <div className="text-xs text-slate-500 font-medium">Média do IRC</div>
          <div className="text-2xl font-bold text-slate-900">
            {Math.round(demands.reduce((acc, d) => acc + d.ircScore, 0) / demands.length)} pts
          </div>
          <div className="text-[10px] text-emerald-600 font-semibold">
            Classificação Alta Prioridade
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <div className="text-xs text-slate-500 font-medium">Plano Atual</div>
          <div className="text-2xl font-bold text-purple-600 uppercase text-lg sm:text-2xl">
            {currentUser.plan}
          </div>
          <div className="text-[10px] text-slate-400">Acesso ilimitado ao FCI</div>
        </div>
      </div>

      {/* Main List */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b pb-3 border-slate-100">
          <h3 className="font-bold text-base text-slate-900">
            {isSupplier ? 'Oportunidades em Aberto no seu Segmento' : 'Suas Demandas de Compra Registradas'}
          </h3>
          <span className="text-xs text-slate-400">Atualizado agora</span>
        </div>

        <div className="divide-y divide-slate-100">
          {demands.map(demand => (
            <div key={demand.id} className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                    {demand.category}
                  </span>
                  <span className="text-xs font-semibold text-emerald-700">
                    IRC: {demand.ircScore} ({demand.ircLevel})
                  </span>
                </div>
                <h4 className="font-bold text-sm text-slate-900">{demand.title}</h4>
                <p className="text-xs text-slate-500 line-clamp-1">{demand.description}</p>
                <div className="text-[11px] text-slate-400">
                  Prazo: {demand.deadlineDays} dias • Empresa: {demand.buyerCompany} • Local: {demand.location}
                </div>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <div className="text-right">
                  <div className="text-sm font-bold text-slate-900">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(demand.estimatedBudget)}
                  </div>
                  <div className="text-[10px] text-emerald-600 font-medium">
                    {demand.matchedSuppliersCount} fornecedores notificados
                  </div>
                </div>

                <button
                  onClick={() => showNotification(`Abrindo sala de negociação da demanda #${demand.id}...`)}
                  className="px-3.5 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition shadow-sm"
                >
                  Ver Cotações
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
