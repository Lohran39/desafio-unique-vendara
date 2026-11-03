'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useDemo } from './DemoContext';
import { 
  Briefcase, 
  ShoppingBag, 
  Sparkles, 
  PlusCircle, 
  Layers, 
  BarChart3, 
  Users, 
  FileText,
  CreditCard,
  Menu,
  X,
  ChevronDown
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const { currentUser } = useDemo();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isTalentos = pathname.startsWith('/talentos');
  const isVendara = pathname.startsWith('/vendara');
  const isPlanos = pathname === '/planos';

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-slate-200/80 sticky top-[39px] z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Platform Switcher Tabs */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-emerald-600 flex items-center justify-center text-white font-extrabold text-lg shadow-md group-hover:scale-105 transition-all duration-300">
                U
              </div>
              <div>
                <span className="font-extrabold text-slate-900 text-base leading-tight tracking-tight block group-hover:text-indigo-600 transition">
                  Grupo Unique
                </span>
                <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider block">
                  Talentos & Vendara
                </span>
              </div>
            </Link>

            {/* Platform Selector Tabs */}
            <div className="hidden md:flex items-center p-1 bg-slate-100/90 rounded-2xl border border-slate-200/80 shadow-xs">
              <Link
                href="/talentos"
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                  isTalentos
                    ? 'bg-white text-indigo-700 shadow-sm ring-1 ring-slate-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                <div className={`p-1 rounded-lg ${isTalentos ? 'bg-indigo-50 text-indigo-600' : 'text-slate-400'}`}>
                  <Briefcase className="w-3.5 h-3.5" />
                </div>
                Unique Talentos
              </Link>
              <Link
                href="/vendara"
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                  isVendara
                    ? 'bg-white text-emerald-700 shadow-sm ring-1 ring-slate-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                <div className={`p-1 rounded-lg ${isVendara ? 'bg-emerald-50 text-emerald-600' : 'text-slate-400'}`}>
                  <ShoppingBag className="w-3.5 h-3.5" />
                </div>
                Vendara B2B
              </Link>
            </div>
          </div>

          {/* Navigation Links for Desktop */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-semibold">
            {isTalentos ? (
              <>
                <Link
                  href="/talentos/vagas"
                  className={`px-3 py-2 rounded-xl text-xs font-semibold transition ${
                    pathname === '/talentos/vagas' ? 'text-indigo-600 bg-indigo-50/80 font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  Buscar Vagas
                </Link>
                <Link
                  href="/talentos/candidatos"
                  className={`px-3 py-2 rounded-xl text-xs font-semibold transition ${
                    pathname === '/talentos/candidatos' ? 'text-indigo-600 bg-indigo-50/80 font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  Banco de Talentos
                </Link>
                <Link
                  href="/talentos/dashboard"
                  className={`px-3 py-2 rounded-xl text-xs font-semibold transition ${
                    pathname === '/talentos/dashboard' ? 'text-indigo-600 bg-indigo-50/80 font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  Painel de Gestão
                </Link>
                <Link
                  href="/talentos/publicar"
                  className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition shadow-sm hover:scale-102 ml-2"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  Publicar Vaga
                </Link>
              </>
            ) : isVendara ? (
              <>
                <Link
                  href="/vendara/catalogo"
                  className={`px-3 py-2 rounded-xl text-xs font-semibold transition ${
                    pathname === '/vendara/catalogo' ? 'text-emerald-700 bg-emerald-50/80 font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  Catálogo B2B
                </Link>
                <Link
                  href="/vendara/demandas"
                  className={`px-3 py-2 rounded-xl text-xs font-semibold transition ${
                    pathname === '/vendara/demandas' ? 'text-emerald-700 bg-emerald-50/80 font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  Demandas Abertas
                </Link>
                <Link
                  href="/vendara/irc-fci"
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition ${
                    pathname === '/vendara/irc-fci' ? 'text-emerald-700 bg-emerald-50 font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <BarChart3 className="w-3.5 h-3.5 text-emerald-600" />
                  Métricas IRC & FCI
                </Link>
                <Link
                  href="/vendara/dashboard"
                  className={`px-3 py-2 rounded-xl text-xs font-semibold transition ${
                    pathname === '/vendara/dashboard' ? 'text-emerald-700 bg-emerald-50/80 font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  Painel B2B
                </Link>
                <Link
                  href="/vendara/nova-demanda"
                  className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition shadow-sm hover:scale-102 ml-2"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  Nova Demanda
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/talentos"
                  className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                >
                  Portal Talentos
                </Link>
                <Link
                  href="/vendara"
                  className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                >
                  Marketplace Vendara
                </Link>
              </>
            )}

            <Link
              href="/planos"
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition ml-1 ${
                isPlanos ? 'text-amber-700 bg-amber-50 font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <CreditCard className="w-3.5 h-3.5 text-amber-600" />
              Planos
            </Link>
          </nav>

          {/* User Profile Pill & Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
              <div className="relative">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-indigo-500/30 shadow-xs"
                />
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-xs font-bold text-slate-900 leading-tight">
                  {currentUser.name}
                </div>
                <div className="text-[10px] text-slate-500 font-medium">
                  {currentUser.company || currentUser.title || currentUser.role}
                </div>
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200/80 shadow-xs">
                {currentUser.plan}
              </span>
            </div>

            {/* Mobile hamburger button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-3 shadow-xl">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-100">
            <Link
              href="/talentos"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-indigo-50 text-indigo-700 font-bold text-xs"
            >
              <Briefcase className="w-3.5 h-3.5" />
              Unique Talentos
            </Link>
            <Link
              href="/vendara"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-50 text-emerald-700 font-bold text-xs"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              Vendara B2B
            </Link>
          </div>

          <div className="space-y-1 text-xs font-semibold text-slate-700">
            <Link
              href="/talentos/vagas"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              🔍 Buscar Vagas
            </Link>
            <Link
              href="/talentos/candidatos"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              👥 Banco de Talentos
            </Link>
            <Link
              href="/talentos/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              📊 Painel Unique Talentos
            </Link>
            <Link
              href="/vendara/catalogo"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              📦 Catálogo Vendara B2B
            </Link>
            <Link
              href="/vendara/demandas"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              📑 Demandas de Compras
            </Link>
            <Link
              href="/vendara/irc-fci"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              📈 Métricas IRC & FCI
            </Link>
            <Link
              href="/planos"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg hover:bg-slate-50 text-amber-700"
            >
              💳 Planos e Assinaturas
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
