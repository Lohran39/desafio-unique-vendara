'use client';

import React from 'react';
import Link from 'next/link';
import { useDemo } from '@/components/shared/DemoContext';
import { 
  ShoppingBag, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  TrendingUp, 
  Zap, 
  ShieldCheck, 
  Search, 
  Building2,
  Factory,
  Boxes,
  Truck,
  Cpu,
  BarChart3
} from 'lucide-react';

export default function VendaraLandingPage() {
  const { products, demands } = useDemo();

  const categories = [
    { name: 'Máquinas & Equipamentos', icon: <Factory className="w-5 h-5 text-emerald-600" />, count: '142 itens' },
    { name: 'Matéria-Prima', icon: <Boxes className="w-5 h-5 text-emerald-600" />, count: '318 lotes' },
    { name: 'TI & Software Corporativo', icon: <Cpu className="w-5 h-5 text-emerald-600" />, count: '89 soluções' },
    { name: 'Logística & Transporte', icon: <Truck className="w-5 h-5 text-emerald-600" />, count: '64 frotas' },
  ];

  return (
    <div className="space-y-12 pb-16">
      
      {/* Vendara Hero Banner */}
      <section className="bg-gradient-to-b from-emerald-950 via-slate-900 to-slate-950 text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-emerald-950">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            Marketplace B2B do Grupo Unique
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Negociações corporativas com inteligência de dados: <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">
              Vendara B2B
            </span>
          </h1>

          <p className="text-sm sm:text-base text-emerald-200/80 max-w-2xl mx-auto leading-relaxed">
            Conectamos compradores qualificados e fornecedores industriais com cálculo em tempo real do 
            <strong> IRC (Índice de Interesse Real de Compra)</strong> e <strong>FCI (Fluxo Comercial Inverso)</strong>.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <Link
              href="/vendara/catalogo"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-semibold text-xs text-white shadow-lg shadow-emerald-600/30 transition-all hover:scale-105"
            >
              <ShoppingBag className="w-4 h-4" />
              Explorar Catálogo B2B
            </Link>

            <Link
              href="/vendara/nova-demanda"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 font-semibold text-xs text-white border border-slate-700 transition-all"
            >
              Publicar Demanda de Compra
            </Link>

            <Link
              href="/vendara/irc-fci"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 font-semibold text-xs border border-emerald-500/30 transition-all"
            >
              <BarChart3 className="w-4 h-4 text-emerald-400" />
              Entenda o IRC & FCI
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">Categorias Industriais e Corporativas</h2>
          <Link href="/vendara/catalogo" className="text-xs text-emerald-600 font-semibold hover:underline">
            Ver todas as soluções &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map(cat => (
            <Link
              key={cat.name}
              href={`/vendara/catalogo?cat=${encodeURIComponent(cat.name)}`}
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-emerald-400 hover:shadow-md transition flex items-center gap-4 group"
            >
              <div className="p-3 rounded-xl bg-emerald-50 group-hover:bg-emerald-600 group-hover:text-white transition">
                {cat.icon}
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-emerald-700 transition">
                  {cat.name}
                </h3>
                <span className="text-[11px] text-slate-500">{cat.count}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured B2B Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Vitrine em Destaque</h2>
            <p className="text-xs text-slate-500">Fornecedores auditados e pronta entrega industrial</p>
          </div>
          <Link
            href="/vendara/catalogo"
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 flex items-center gap-1"
          >
            Ver catálogo completo ({products.length})
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map(prod => (
            <div
              key={prod.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-emerald-400 hover:shadow-lg transition flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-44 overflow-hidden bg-slate-100">
                  <img
                    src={prod.imageUrl}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2.5 left-2.5 text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-900/80 text-white backdrop-blur-sm">
                    {prod.category}
                  </span>
                </div>

                <div className="p-4 space-y-2">
                  <div className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    {prod.supplierName}
                  </div>
                  <h3 className="font-bold text-slate-900 text-xs sm:text-sm line-clamp-2 leading-tight">
                    {prod.name}
                  </h3>
                  <div className="text-xs font-extrabold text-slate-800 pt-1">
                    {prod.priceEstimate}
                  </div>
                  <div className="text-[10px] text-slate-500">
                    Prazo: {prod.leadTime} • Min: {prod.minOrder}
                  </div>
                </div>
              </div>

              <div className="p-4 pt-0">
                <Link
                  href="/vendara/catalogo"
                  className="w-full block text-center py-2 rounded-xl bg-emerald-50 text-emerald-800 font-bold text-xs hover:bg-emerald-600 hover:text-white transition"
                >
                  Solicitar Cotação
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* IRC & FCI Explanatory Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 p-8 sm:p-10 text-white border border-emerald-500/30 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4" />
              Diferenciais de Negócio do Briefing
            </span>
            <h3 className="text-2xl font-bold text-white">
              Conheça o Índice IRC e o Fluxo FCI
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              O Vendara não é apenas uma vitrine passiva: o <strong>IRC</strong> qualifica se o comprador tem orçamento e poder de decisão, e o <strong>FCI</strong> dispara alertas comerciais imediatos aos fornecedores mais aptos.
            </p>
          </div>

          <Link
            href="/vendara/irc-fci"
            className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-xl transition-all hover:scale-105 shrink-0"
          >
            Acessar Simulador IRC & FCI &rarr;
          </Link>
        </div>
      </section>

    </div>
  );
}
