'use client';

import React from 'react';
import { useDemo } from './DemoContext';
import { UserRole } from '@/types';
import { UserCheck, Briefcase, ShoppingBag, ShieldCheck, User, Sparkles, CheckCircle2 } from 'lucide-react';

export default function DemoBar() {
  const { currentUser, switchUser, notification } = useDemo();

  const roleLabels: Record<UserRole, { label: string; sub: string; icon: React.ReactNode; color: string; ring: string }> = {
    recrutador: { 
      label: 'Recrutador', 
      sub: 'Unique Talentos',
      icon: <Briefcase className="w-3.5 h-3.5" />, 
      color: 'bg-indigo-600',
      ring: 'ring-indigo-400'
    },
    candidato: { 
      label: 'Candidato', 
      sub: 'Dev Sênior',
      icon: <User className="w-3.5 h-3.5" />, 
      color: 'bg-blue-600',
      ring: 'ring-blue-400'
    },
    comprador_b2b: { 
      label: 'Comprador B2B', 
      sub: 'Procurement',
      icon: <ShoppingBag className="w-3.5 h-3.5" />, 
      color: 'bg-emerald-600',
      ring: 'ring-emerald-400'
    },
    fornecedor_b2b: { 
      label: 'Fornecedor B2B', 
      sub: 'Indústria Nexus',
      icon: <UserCheck className="w-3.5 h-3.5" />, 
      color: 'bg-teal-600',
      ring: 'ring-teal-400'
    },
    admin: { 
      label: 'Admin Master', 
      sub: 'Grupo Unique',
      icon: <ShieldCheck className="w-3.5 h-3.5" />, 
      color: 'bg-purple-600',
      ring: 'ring-purple-400'
    },
  };

  return (
    <>
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md bg-slate-900/95 backdrop-blur-md text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-slate-700/80 text-xs flex items-center gap-3 transition-all transform animate-bounce">
          <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-xl border border-indigo-500/30">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="flex-1 font-medium leading-relaxed">{notification}</div>
        </div>
      )}

      {/* Demo Switcher Bar */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-slate-200 text-xs border-b border-slate-800/80 px-4 py-2 sticky top-0 z-40 shadow-sm backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          
          <div className="flex items-center gap-2.5">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="font-extrabold text-white tracking-wide uppercase text-[11px] bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white to-emerald-300">
              Modo Demonstração do Avaliador
            </span>
            <span className="text-slate-400 text-[11px] hidden xl:inline">
              (Alterne os perfis abaixo para testar fluxos com permissões exclusivas)
            </span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {(Object.keys(roleLabels) as UserRole[]).map(roleKey => {
              const active = currentUser.role === roleKey;
              const roleInfo = roleLabels[roleKey];
              return (
                <button
                  key={roleKey}
                  onClick={() => switchUser(roleKey)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 whitespace-nowrap ${
                    active
                      ? `${roleInfo.color} text-white shadow-lg ring-2 ${roleInfo.ring} ring-offset-1 ring-offset-slate-900 scale-105`
                      : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/60'
                  }`}
                >
                  {roleInfo.icon}
                  <span>{roleInfo.label}</span>
                  {active && (
                    <CheckCircle2 className="w-3 h-3 text-white/90 shrink-0 ml-0.5" />
                  )}
                </button>
              );
            })}
          </div>

        </div>
      </div>
    </>
  );
}
