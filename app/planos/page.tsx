'use client';

import React from 'react';
import Link from 'next/link';
import { useDemo } from '@/components/shared/DemoContext';
import { 
  Check, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  HelpCircle, 
  ArrowRight,
  Briefcase,
  ShoppingBag
} from 'lucide-react';

export default function PlanosPage() {
  const { currentUser, showNotification } = useDemo();

  const plans = [
    {
      name: 'Básico (Free)',
      price: 'R$ 0',
      period: 'gratuito para sempre',
      desc: 'Ideal para profissionais buscando oportunidades e empresas iniciando testes.',
      badge: null,
      highlight: false,
      talentosFeatures: [
        'Até 2 vagas ativas por mês',
        'Visualização básica de candidaturas',
        'Candidaturas ilimitadas para profissionais',
        'Busca com filtros padrão',
      ],
      vendaraFeatures: [
        'Até 3 itens cadastrados no catálogo',
        'Publicação de 1 demanda mensal',
        'Acesso padrão às cotações',
        'Visualização do score IRC básico',
      ],
      ctaText: 'Plano Gratuito',
      planKey: 'free',
    },
    {
      name: 'Profissional (Pro)',
      price: 'R$ 490',
      period: 'por mês / faturamento anual',
      desc: 'Perfeito para empresas em crescimento, recrutadores ágeis e fornecedores ativos.',
      badge: 'Mais Popular',
      highlight: true,
      talentosFeatures: [
        'Vagas ativas ilimitadas',
        'Algoritmo de Matching por IA ativo',
        'Acesso completo ao Banco de Talentos',
        'Exportação de currículos e relatórios',
        'Gestão de funil com kanban avançado',
      ],
      vendaraFeatures: [
        'Catálogo ilimitado com selo de verificação',
        'Notificação prioritária no FCI em até 2 horas',
        'Cálculo detalhado de IRC com detalhamento de decisores',
        'Canal direto de negociação e cotações rápidas',
      ],
      ctaText: 'Assinar Plano Pro',
      planKey: 'pro',
    },
    {
      name: 'Corporativo (Enterprise)',
      price: 'R$ 1.890',
      period: 'por mês / faturamento anual',
      desc: 'Para grandes corporações e ecossistema do Grupo Unique com múltiplos CNPJs.',
      badge: 'Escala Máxima',
      highlight: false,
      talentosFeatures: [
        'Múltiplos recrutadores e gestão de permissões RBAC',
        'Integração via API com ATS e sistemas internos',
        'Suporte dedicado com SLA de 2 horas',
        'Auditoria e relatórios de conformidade LGPD',
      ],
      vendaraFeatures: [
        'Sourcing dedicado com atendimento consultivo',
        'Acesso irrestrito ao mural de demandas e FCI',
        'Contratos e cotações com assinatura digital integrada',
        'Account Manager corporativo exclusivo',
      ],
      ctaText: 'Falar com Especialista',
      planKey: 'enterprise',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-200">
          <Sparkles className="w-3.5 h-3.5" />
          Modelagem SaaS & Monetização
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Planos flexíveis para cada momento do seu negócio
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Permissões granulares e limites desenhados tanto para o <strong>Unique Talentos</strong> quanto para o <strong>Vendara B2B</strong>.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {plans.map(p => {
          const isCurrent = currentUser.plan === p.planKey;

          return (
            <div
              key={p.name}
              className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
                p.highlight
                  ? 'bg-slate-900 text-white shadow-2xl ring-2 ring-indigo-500 scale-105'
                  : 'bg-white text-slate-900 border border-slate-200 shadow-sm'
              }`}
            >
              {p.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-emerald-500 text-white text-[10px] font-extrabold uppercase tracking-widest shadow-md">
                  {p.badge}
                </span>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-lg">{p.name}</h3>
                  <p className={`text-xs mt-1 ${p.highlight ? 'text-slate-400' : 'text-slate-500'}`}>
                    {p.desc}
                  </p>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold">{p.price}</span>
                  <span className={`text-xs ${p.highlight ? 'text-slate-400' : 'text-slate-500'}`}>
                    {p.period}
                  </span>
                </div>

                {/* Features Unique Talentos */}
                <div className="space-y-2.5 pt-4 border-t border-slate-700/40">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5" />
                    Unique Talentos
                  </div>
                  <ul className="space-y-2 text-xs">
                    {p.talentosFeatures.map(f => (
                      <li key={f} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className={p.highlight ? 'text-slate-200' : 'text-slate-600'}>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Features Vendara B2B */}
                <div className="space-y-2.5 pt-4 border-t border-slate-700/40">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                    <ShoppingBag className="w-3.5 h-3.5" />
                    Vendara B2B
                  </div>
                  <ul className="space-y-2 text-xs">
                    {p.vendaraFeatures.map(f => (
                      <li key={f} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className={p.highlight ? 'text-slate-200' : 'text-slate-600'}>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-8">
                {isCurrent ? (
                  <div className="w-full py-3 rounded-xl bg-slate-800 text-emerald-400 font-bold text-xs text-center border border-emerald-500/30">
                    ✓ Seu Plano Atual de Demonstração
                  </div>
                ) : (
                  <button
                    onClick={() => showNotification(`Simulação: Upgrade para o plano ${p.name} efetuado!`)}
                    className={`w-full py-3 rounded-xl font-bold text-xs transition shadow-md ${
                      p.highlight
                        ? 'bg-indigo-600 hover:bg-indigo-500 text-white'
                        : 'bg-slate-900 hover:bg-slate-800 text-white'
                    }`}
                  >
                    {p.ctaText}
                  </button>
                )}
              </div>

            </div>
          );
        })}
      </div>

      {/* Security & LGPD Banner */}
      <div className="p-6 rounded-3xl bg-slate-100 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
          <div>
            <strong className="text-slate-900 block font-semibold">Segurança e Proteção de Dados (LGPD)</strong>
            <span>Criptografia de ponta a ponta e gestão segura de acessos e permissões corporativas.</span>
          </div>
        </div>
        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
          Faturamento via Boleto, Cartão ou PIX
        </span>
      </div>

    </div>
  );
}
