'use client';

import React from 'react';
import Link from 'next/link';
import { useDemo } from '@/components/shared/DemoContext';
import { 
  Briefcase, 
  ShoppingBag, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  TrendingUp, 
  Zap, 
  ShieldCheck, 
  Search, 
  Building2,
  Users2,
  Layers,
  ArrowUpRight,
  Database
} from 'lucide-react';

export default function HomePage() {
  const { jobs, products, demands } = useDemo();

  return (
    <div className="space-y-20 py-8 relative overflow-hidden">
      
      {/* Background Decorative Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] pointer-events-none -z-10 opacity-40">
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-indigo-400/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl"></div>
      </div>

      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-6">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-slate-200/90 text-slate-800 text-xs font-bold shadow-xs hover:border-indigo-300 transition">
            <span className="flex h-2 w-2 rounded-full bg-indigo-600 animate-ping"></span>
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            Ecossistema Digital Unificado — Grupo Unique
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
            Do talento estratégico às <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-700 to-emerald-600">
              grandes conexões B2B
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal">
            Plataforma corporativa de ponta a ponta projetada para acelerar a atração de profissionais de alto impacto e viabilizar compras industriais estratégicas com <strong>busca semântica</strong> e os exclusivos <strong>IRC & FCI</strong>.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
            <Link
              href="/talentos"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xl shadow-indigo-600/25 transition-all duration-200 hover:scale-105"
            >
              <Briefcase className="w-4 h-4" />
              Explorar Unique Talentos
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/vendara"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xl shadow-emerald-600/25 transition-all duration-200 hover:scale-105"
            >
              <ShoppingBag className="w-4 h-4" />
              Acessar Vendara B2B
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Quick Metrics Ticker */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto text-left">
            <div className="p-4 rounded-2xl bg-white/70 backdrop-blur-md border border-slate-200/80 shadow-xs">
              <div className="text-2xl font-extrabold text-slate-900">{jobs.length} Vagas</div>
              <div className="text-[11px] text-slate-500 font-medium">Unique Talentos</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/70 backdrop-blur-md border border-slate-200/80 shadow-xs">
              <div className="text-2xl font-extrabold text-indigo-600">94% Match</div>
              <div className="text-[11px] text-slate-500 font-medium">Precisão Semântica</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/70 backdrop-blur-md border border-slate-200/80 shadow-xs">
              <div className="text-2xl font-extrabold text-emerald-600">R$ 1.0M+</div>
              <div className="text-[11px] text-slate-500 font-medium">Demandas B2B</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/70 backdrop-blur-md border border-slate-200/80 shadow-xs">
              <div className="text-2xl font-extrabold text-teal-600">FCI Ativo</div>
              <div className="text-[11px] text-slate-500 font-medium">Fluxo Reverso</div>
            </div>
          </div>

        </div>
      </section>

      {/* Main Two Ecosystem Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Card 1: Unique Talentos */}
          <div className="relative rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 p-8 sm:p-10 text-white shadow-2xl overflow-hidden flex flex-col justify-between border border-indigo-500/30 group hover:border-indigo-400/60 transition-all duration-300">
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-indigo-500/20 transition-all"></div>
            
            <div className="space-y-6 relative z-10">
              <div className="flex items-center justify-between">
                <span className="p-3 bg-indigo-600/30 border border-indigo-400/30 rounded-2xl text-indigo-300 shadow-inner">
                  <Briefcase className="w-6 h-6" />
                </span>
                <span className="text-[11px] font-bold uppercase tracking-wider px-3.5 py-1 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full backdrop-blur-sm">
                  Portal de Recrutamento & Seleção
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
                  Unique Talentos
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Conecte empresas do ecossistema a profissionais de alta qualificação. Triagem guiada por inteligência artificial com cálculo automático de <strong>Match Score</strong> entre candidatos e requisitos da posição.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/80 rounded-2xl p-4">
                  <div className="text-2xl font-extrabold text-indigo-400">{jobs.length} Vagas</div>
                  <div className="text-xs text-slate-400">Ativas e auditadas</div>
                </div>
                <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/80 rounded-2xl p-4">
                  <div className="text-2xl font-extrabold text-indigo-400">Tempo Real</div>
                  <div className="text-xs text-slate-400">Filtros instantâneos</div>
                </div>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-300 pt-2">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>Filtros facetados por área, senioridade, modelo remoto e pretensão</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>Painel do Recrutador com gestão de funil (Kanban de 4 etapas)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>Banco de talentos com busca de currículos e competências técnicas</span>
                </li>
              </ul>
            </div>

            <div className="pt-8 relative z-10 flex flex-wrap gap-3">
              <Link
                href="/talentos/vagas"
                className="flex-1 text-center py-3.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-bold text-xs text-white transition shadow-lg shadow-indigo-600/30"
              >
                Ver Vagas Disponíveis
              </Link>
              <Link
                href="/talentos/dashboard"
                className="flex-1 text-center py-3.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 font-bold text-xs text-white transition border border-slate-700"
              >
                Painel do Recrutador
              </Link>
            </div>
          </div>

          {/* Card 2: Vendara B2B */}
          <div className="relative rounded-3xl bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 p-8 sm:p-10 text-white shadow-2xl overflow-hidden flex flex-col justify-between border border-emerald-500/30 group hover:border-emerald-400/60 transition-all duration-300">
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald-500/20 transition-all"></div>
            
            <div className="space-y-6 relative z-10">
              <div className="flex items-center justify-between">
                <span className="p-3 bg-emerald-600/30 border border-emerald-400/30 rounded-2xl text-emerald-300 shadow-inner">
                  <ShoppingBag className="w-6 h-6" />
                </span>
                <span className="text-[11px] font-bold uppercase tracking-wider px-3.5 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full backdrop-blur-sm">
                  Marketplace B2B Corporativo
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
                  Vendara Marketplace
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Ecossistema transacional para contratação de serviços e suprimentos industriais com os dois pilares exclusivos do briefing: <strong>IRC</strong> (Índice de Interesse Real) e <strong>FCI</strong> (Fluxo Comercial Inverso).
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/80 rounded-2xl p-4">
                  <div className="text-2xl font-extrabold text-emerald-400">R$ 1.025.000</div>
                  <div className="text-xs text-slate-400">Em demandas abertas</div>
                </div>
                <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/80 rounded-2xl p-4">
                  <div className="text-2xl font-extrabold text-emerald-400">92 IRC</div>
                  <div className="text-xs text-slate-400">Score de urgência</div>
                </div>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-300 pt-2">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Catálogo de máquinas, insumos e logística com fornecedores verificados</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Cálculo do IRC considerando decisor, orçamento e urgência</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Fluxo Comercial Inverso notificando fornecedores de forma proativa</span>
                </li>
              </ul>
            </div>

            <div className="pt-8 relative z-10 flex flex-wrap gap-3">
              <Link
                href="/vendara/catalogo"
                className="flex-1 text-center py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-bold text-xs text-white transition shadow-lg shadow-emerald-600/30"
              >
                Explorar Catálogo B2B
              </Link>
              <Link
                href="/vendara/irc-fci"
                className="flex-1 text-center py-3.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 font-bold text-xs text-white transition border border-slate-700"
              >
                Ver Painel IRC & FCI
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Engineering & Compliance Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-sm space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[11px] font-extrabold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
              Conformidade com os Critérios do Briefing
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Excelência Técnica e Arquitetura Escalável
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm">
              Construído com base nas melhores práticas da indústria para entregar estabilidade, velocidade e segurança jurídica.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-3 hover:border-indigo-300 transition hover-glow">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                <Search className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Busca Semântica & Reatividade</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Filtros combinados com latência ultrabaixa e scoring semântico que interpreta as exigências das vagas e as necessidades dos compradores.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-3 hover:border-emerald-300 transition hover-glow-emerald">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Algoritmos de IRC e FCI</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Ponderação multicritério para qualificar a intenção real de compra e algoritmo de roteamento inverso para conectar fornecedores diretamente.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-3 hover:border-purple-300 transition">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Multi-tenant, RBAC & LGPD</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Camada unificada de permissões, isolamento de dados cadastrais sensíveis e conformidade legal com privacidade de currículos e cotações.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
