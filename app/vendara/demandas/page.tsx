'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useDemo } from '@/components/shared/DemoContext';
import { 
  ShoppingBag, 
  PlusCircle, 
  TrendingUp, 
  Calendar, 
  MapPin, 
  Building2, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight,
  Filter,
  BarChart3
} from 'lucide-react';

export default function DemandasAbertasPage() {
  const { demands, currentUser, showNotification } = useDemo();
  const [selectedCategory, setSelectedCategory] = useState('Todas');

  const categories = [
    'Todas',
    'Máquinas & Equipamentos',
    'Matéria-Prima',
    'TI & Software Corporativo',
    'Logística & Transporte',
    'Serviços Especializados',
  ];

  const filteredDemands = demands.filter(d => {
    return selectedCategory === 'Todas' || d.category === selectedCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-700 text-xs font-semibold uppercase tracking-wider mb-1">
            <ShoppingBag className="w-4 h-4 text-emerald-600" />
            Compras & Cotações Corporativas
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Mural de Demandas de Compra B2B</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Demandas publicadas por compradores corporativos com o Índice de Interesse Real de Compra (IRC) calculado.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/vendara/irc-fci"
            className="px-4 py-2.5 rounded-xl border border-emerald-300 text-emerald-800 bg-emerald-50 text-xs font-bold hover:bg-emerald-100 transition flex items-center gap-1.5"
          >
            <BarChart3 className="w-3.5 h-3.5 text-emerald-600" />
            Como o IRC funciona?
          </Link>
          <Link
            href="/vendara/nova-demanda"
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-md flex items-center gap-1.5"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            Publicar Demanda
          </Link>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map(c => (
          <button
            key={c}
            onClick={() => setSelectedCategory(c)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition ${
              selectedCategory === c
                ? 'bg-emerald-600 text-white font-bold shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Demands List */}
      <div className="space-y-4">
        {filteredDemands.map(demand => {
          // Color based on IRC
          const isHighIRC = demand.ircScore >= 80;
          const isMedIRC = demand.ircScore >= 60;

          return (
            <div
              key={demand.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-emerald-400 hover:shadow-md transition space-y-4"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {demand.category}
                    </span>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Building2 className="w-3 h-3 text-slate-400" />
                      {demand.buyerCompany}
                    </span>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      {demand.location}
                    </span>
                  </div>

                  <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                    {demand.title}
                  </h2>

                  <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
                    {demand.description}
                  </p>
                </div>

                {/* IRC Score Badge Widget */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col items-center justify-center shrink-0 min-w-[170px] space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-emerald-600" />
                    Score de Compra (IRC)
                  </span>
                  
                  <div className="flex items-baseline gap-1">
                    <span className={`text-3xl font-extrabold ${
                      isHighIRC ? 'text-emerald-700' : isMedIRC ? 'text-amber-700' : 'text-slate-700'
                    }`}>
                      {demand.ircScore}
                    </span>
                    <span className="text-xs text-slate-400">/ 100</span>
                  </div>

                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isHighIRC ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {demand.ircLevel}
                  </span>
                </div>
              </div>

              {/* Bottom Specs & Action */}
              <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex flex-wrap items-center gap-4 text-slate-600">
                  <div>
                    Orçamento Estimado:{' '}
                    <strong className="text-slate-900 font-bold">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(demand.estimatedBudget)}
                    </strong>
                  </div>
                  <div>
                    Prazo Limite:{' '}
                    <strong className="text-slate-900 font-bold">{demand.deadlineDays} dias</strong>
                  </div>
                  <div>
                    Decisor Aprovado:{' '}
                    <strong className={demand.hasDecisor ? 'text-emerald-600 font-bold' : 'text-slate-500'}>
                      {demand.hasDecisor ? 'Sim (Alta Prioridade)' : 'Em aprovação'}
                    </strong>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => showNotification(`Proposta comercial iniciada para a demanda #${demand.id}!`)}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition flex items-center gap-1.5"
                  >
                    <span>Enviar Proposta / Cotação</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
