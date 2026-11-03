'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useDemo } from '@/components/shared/DemoContext';
import { JobApplication } from '@/types';
import { 
  Users, 
  Briefcase, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  ChevronRight, 
  ArrowUpRight, 
  BarChart3, 
  Filter,
  PlusCircle,
  Eye,
  Check,
  X
} from 'lucide-react';

export default function TalentosDashboardPage() {
  const { currentUser, jobs, applications, updateApplicationStatus, showNotification } = useDemo();
  const [selectedApp, setSelectedApp] = useState<JobApplication | null>(null);

  const isRecruiter = currentUser.role === 'recrutador' || currentUser.role === 'admin';

  // Kanban columns for recruiter
  const statuses: JobApplication['status'][] = ['Triagem', 'Entrevista', 'Proposta', 'Contratado'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Dashboard Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 text-xs font-semibold uppercase tracking-wider mb-1">
            <BarChart3 className="w-4 h-4" />
            {isRecruiter ? 'Painel de Recrutamento & Seleção' : 'Painel do Profissional'}
          </div>
          <h1 className="text-2xl font-bold text-slate-900">
            {isRecruiter ? 'Gestão de Vagas e Funil de Candidatos' : 'Minhas Candidaturas e Oportunidades'}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {isRecruiter 
              ? 'Acompanhe métricas de atração de talentos, triagem automatizada com IA e evolução das etapas.' 
              : 'Veja o status dos processos seletivos em andamento e seu índice de compatibilidade.'}
          </p>
        </div>

        {isRecruiter ? (
          <Link
            href="/talentos/publicar"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-md transition shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            Publicar Nova Vaga
          </Link>
        ) : (
          <Link
            href="/talentos/vagas"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-md transition shrink-0"
          >
            <Briefcase className="w-4 h-4" />
            Explorar Mais Vagas
          </Link>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <div className="text-xs text-slate-500 font-medium">
            {isRecruiter ? 'Vagas Publicadas' : 'Vagas no Radar'}
          </div>
          <div className="text-2xl font-bold text-slate-900">{jobs.length}</div>
          <div className="text-[10px] text-emerald-600 flex items-center gap-1 font-semibold">
            <CheckCircle2 className="w-3 h-3" /> Todas ativas
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <div className="text-xs text-slate-500 font-medium">
            {isRecruiter ? 'Candidaturas Recebidas' : 'Processos Inscritos'}
          </div>
          <div className="text-2xl font-bold text-indigo-600">{applications.length}</div>
          <div className="text-[10px] text-indigo-600 font-semibold">
            Triagem automatizada ativa
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <div className="text-xs text-slate-500 font-medium">Taxa Média de Match</div>
          <div className="text-2xl font-bold text-slate-900">
            {applications.length > 0
              ? Math.round(applications.reduce((acc, a) => acc + a.matchScore, 0) / applications.length)
              : 85}%
          </div>
          <div className="text-[10px] text-indigo-500 font-semibold flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Motor semântico
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <div className="text-xs text-slate-500 font-medium">Nível de Assinatura</div>
          <div className="text-2xl font-bold text-purple-600 uppercase text-lg sm:text-2xl">
            {currentUser.plan}
          </div>
          <div className="text-[10px] text-slate-400">Sem limites de vagas no MVP</div>
        </div>
      </div>

      {/* Recruiter View: Funnel Kanban */}
      {isRecruiter ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <span>Funil de Candidatos por Etapa</span>
              <span className="text-xs font-normal text-slate-500">(Arraste ou clique para mover de fase)</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {statuses.map(st => {
              const columnApps = applications.filter(a => a.status === st);
              return (
                <div key={st} className="bg-slate-100/70 p-4 rounded-2xl border border-slate-200 space-y-3 min-h-[320px]">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                    <span className="font-bold text-xs text-slate-700 uppercase tracking-wider">
                      {st}
                    </span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white text-slate-700 shadow-sm">
                      {columnApps.length}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {columnApps.map(app => (
                      <div
                        key={app.id}
                        className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition space-y-2 cursor-pointer"
                        onClick={() => setSelectedApp(app)}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <img
                              src={app.candidateAvatar}
                              alt={app.candidateName}
                              className="w-8 h-8 rounded-full object-cover"
                            />
                            <div>
                              <div className="font-bold text-xs text-slate-900 leading-tight">
                                {app.candidateName}
                              </div>
                              <div className="text-[10px] text-slate-500 truncate max-w-[120px]">
                                {app.jobTitle}
                              </div>
                            </div>
                          </div>
                          <span className={`text-[11px] font-extrabold px-1.5 py-0.5 rounded ${
                            app.matchScore >= 85 ? 'bg-emerald-50 text-emerald-700' : 'bg-indigo-50 text-indigo-700'
                          }`}>
                            {app.matchScore}%
                          </span>
                        </div>

                        <p className="text-[11px] text-slate-600 line-clamp-2">
                          {app.matchAnalysis.strengths}
                        </p>

                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
                          <span className="text-slate-400">{app.appliedAt}</span>
                          <span className="text-indigo-600 font-semibold hover:underline">
                            Ver Análise &rarr;
                          </span>
                        </div>
                      </div>
                    ))}

                    {columnApps.length === 0 && (
                      <div className="py-10 text-center text-xs text-slate-400">
                        Nenhum candidato nesta etapa
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Candidate View: Applied Jobs */
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-bold text-base text-slate-900">Histórico de Candidaturas</h3>
          <div className="divide-y divide-slate-100">
            {applications.map(app => (
              <div key={app.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="font-bold text-sm text-slate-900">{app.jobTitle}</div>
                  <div className="text-xs text-slate-500">{app.company} • Inscrito em {app.appliedAt}</div>
                  <div className="text-xs text-indigo-600 font-medium">
                    Parecer do Algoritmo: {app.matchAnalysis.strengths}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-sm font-bold text-indigo-600">{app.matchScore}% de Match</div>
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-50 text-indigo-700">
                      Status: {app.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal: Application Detailed Review for Recruiter */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl relative">
            <button
              onClick={() => setSelectedApp(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4">
              <img
                src={selectedApp.candidateAvatar}
                alt={selectedApp.candidateName}
                className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shadow-sm"
              />
              <div>
                <h3 className="text-base font-bold text-slate-900">{selectedApp.candidateName}</h3>
                <p className="text-xs text-slate-500">{selectedApp.candidateEmail}</p>
                <div className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 mt-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Score de Compatibilidade: {selectedApp.matchScore}%
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Vaga Alvo
              </h4>
              <p className="text-xs text-slate-700 font-medium bg-slate-50 p-3 rounded-xl border border-slate-100">
                {selectedApp.jobTitle} ({selectedApp.company})
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Diagnóstico de IA & Competências
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed bg-indigo-50/50 p-3 rounded-xl border border-indigo-100">
                {selectedApp.matchAnalysis.strengths}
              </p>
              
              <div className="space-y-1">
                <span className="text-[11px] font-semibold text-slate-500">Competências Compatíveis:</span>
                <div className="flex flex-wrap gap-1">
                  {selectedApp.matchAnalysis.skillsMatch.map(s => (
                    <span key={s} className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 text-[10px] font-medium border border-emerald-200">
                      ✓ {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Change Status Buttons */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                Mover de Etapa no Processo
              </label>
              <div className="grid grid-cols-2 gap-2">
                {statuses.map(s => (
                  <button
                    key={s}
                    onClick={() => {
                      updateApplicationStatus(selectedApp.id, s);
                      setSelectedApp({ ...selectedApp, status: s });
                    }}
                    className={`py-2 px-3 text-xs font-semibold rounded-xl border transition ${
                      selectedApp.status === s
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedApp(null)}
                className="px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition"
              >
                Concluir Visualização
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
