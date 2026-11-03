'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useDemo } from '@/components/shared/DemoContext';
import { Job } from '@/types';
import { 
  Search, 
  MapPin, 
  Briefcase, 
  Building2, 
  DollarSign, 
  Filter, 
  CheckCircle, 
  Sparkles, 
  Clock, 
  X,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Laptop,
  CheckCircle2
} from 'lucide-react';

function VagasContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialDept = searchParams.get('dept') || 'Todas';
  const initialJobId = searchParams.get('vaga') || null;

  const { jobs, currentUser, applyToJob, applications } = useDemo();

  const [search, setSearch] = useState(initialQuery);
  const [selectedDept, setSelectedDept] = useState(initialDept);
  const [selectedModel, setSelectedModel] = useState<string>('Todos');
  const [selectedLevel, setSelectedLevel] = useState<string>('Todos');
  const [activeJob, setActiveJob] = useState<Job | null>(
    initialJobId ? jobs.find(j => j.id === initialJobId) || null : null
  );

  const [applicationResult, setApplicationResult] = useState<{
    score: number;
    message: string;
  } | null>(null);

  // Filter logic
  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchSearch = search === '' || 
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.requirements.some(r => r.toLowerCase().includes(search.toLowerCase())) ||
        job.company.toLowerCase().includes(search.toLowerCase());

      const matchDept = selectedDept === 'Todas' || job.department === selectedDept;
      const matchModel = selectedModel === 'Todos' || job.model === selectedModel;
      const matchLevel = selectedLevel === 'Todos' || job.level === selectedLevel;

      return matchSearch && matchDept && matchModel && matchLevel;
    });
  }, [jobs, search, selectedDept, selectedModel, selectedLevel]);

  const handleApply = (jobId: string) => {
    const res = applyToJob(jobId);
    if (res.success) {
      setApplicationResult({
        score: res.matchScore,
        message: res.message,
      });
    } else {
      alert(res.message);
    }
  };

  const isUserApplied = (jobId: string) => {
    return applications.some(a => a.jobId === jobId && a.candidateId === currentUser.id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-900 p-8 text-white border border-indigo-500/20 shadow-xl">
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            Oportunidades em Tecnologia, Vendas e Engenharia
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Central de Vagas Unique Talentos
          </h1>
          <p className="text-xs sm:text-sm text-indigo-200/80 leading-relaxed">
            Filtre posições estratégicas em tempo real e teste o algoritmo de compatibilidade direta com o seu perfil.
          </p>
        </div>

        {/* Quick Filter Badges */}
        <div className="flex flex-wrap items-center gap-2 pt-6 relative z-10 text-xs">
          <span className="text-indigo-300 font-semibold text-xs">Filtros rápidos:</span>
          {['Todas', 'Tecnologia', 'Vendas', 'Engenharia', 'Operações'].map(d => (
            <button
              key={d}
              onClick={() => setSelectedDept(d)}
              className={`px-3 py-1 rounded-xl font-medium transition ${
                selectedDept === d
                  ? 'bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-400/30 font-bold'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/60'
              }`}
            >
              {d}
            </button>
          ))}
          <button
            onClick={() => setSelectedModel(selectedModel === 'Remoto' ? 'Todos' : 'Remoto')}
            className={`px-3 py-1 rounded-xl font-medium transition flex items-center gap-1.5 ${
              selectedModel === 'Remoto'
                ? 'bg-emerald-600 text-white shadow-sm font-bold'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/60'
            }`}
          >
            <Laptop className="w-3 h-3" />
            100% Remoto
          </button>
        </div>
      </div>

      {/* Main Grid: Filters + List */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left Sidebar Filters */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-sm space-y-6 h-fit sticky top-28">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="font-extrabold text-xs uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-indigo-600" />
              Filtros Avançados
            </span>
            <button
              onClick={() => {
                setSearch('');
                setSelectedDept('Todas');
                setSelectedModel('Todos');
                setSelectedLevel('Todos');
              }}
              className="text-[11px] font-semibold text-indigo-600 hover:underline"
            >
              Limpar Todos
            </button>
          </div>

          {/* Search Box */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Palavra-chave / Cargo</label>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Ex: Next.js, Vendas, Python..."
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition"
              />
            </div>
          </div>

          {/* Work Model */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Modelo de Atuação</label>
            <div className="space-y-1">
              {['Todos', 'Remoto', 'Híbrido', 'Presencial'].map(m => (
                <label key={m} className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer hover:text-slate-900 transition py-0.5">
                  <input
                    type="radio"
                    name="model"
                    checked={selectedModel === m}
                    onChange={() => setSelectedModel(m)}
                    className="text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>{m}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Seniority */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Senioridade</label>
            <div className="space-y-1">
              {['Todos', 'Júnior', 'Pleno', 'Sênior', 'Especialista', 'Liderança'].map(l => (
                <label key={l} className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer hover:text-slate-900 transition py-0.5">
                  <input
                    type="radio"
                    name="level"
                    checked={selectedLevel === l}
                    onChange={() => setSelectedLevel(l)}
                    className="text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>{l}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Candidate Profile info helper */}
          <div className="p-3.5 bg-indigo-50/70 rounded-2xl border border-indigo-100 text-xs space-y-2">
            <div className="font-bold text-indigo-950 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              IA Matching Habilitado
            </div>
            <p className="text-[11px] text-indigo-800 leading-relaxed">
              Logado como <strong>{currentUser.name}</strong>. Candidaturas calculam score em tempo real.
            </p>
          </div>
        </div>

        {/* Right Job List */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 px-1 font-medium">
            <span>Mostrando <strong>{filteredJobs.length}</strong> vagas disponíveis</span>
            <span className="flex items-center gap-1 text-emerald-600 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Atualização contínua
            </span>
          </div>

          {filteredJobs.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-3xl border border-slate-200/90 space-y-3 shadow-xs">
              <Briefcase className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="font-bold text-slate-800 text-sm">Nenhuma vaga encontrada</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Tente ajustar os filtros laterais ou busque por outro termo.
              </p>
            </div>
          ) : (
            filteredJobs.map(job => {
              const applied = isUserApplied(job.id);
              return (
                <div
                  key={job.id}
                  className="bg-white p-6 rounded-3xl border border-slate-200/80 hover:border-indigo-400 hover:shadow-xl transition-all duration-200 space-y-4 group hover-glow"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <img
                        src={job.companyLogo}
                        alt={job.company}
                        className="w-13 h-13 rounded-2xl object-cover border border-slate-100 shadow-xs shrink-0 group-hover:scale-105 transition-transform"
                      />
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                            {job.department}
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700">
                            {job.model} • {job.level}
                          </span>
                        </div>

                        <h2 className="font-extrabold text-slate-900 text-base sm:text-lg leading-tight group-hover:text-indigo-600 transition">
                          {job.title}
                        </h2>

                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                          <span className="font-bold text-slate-800 flex items-center gap-1">
                            <Building2 className="w-3.5 h-3.5 text-slate-400" />
                            {job.company}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" />
                            {job.location}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                      <span className="font-extrabold text-xs text-emerald-800 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200/80 shadow-xs">
                        {job.salaryRange}
                      </span>
                      <span className="text-[10px] text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {job.createdAt}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {job.description}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-100 flex-wrap gap-3">
                    <div className="flex flex-wrap gap-1.5">
                      {job.requirements.map(req => (
                        <span
                          key={req}
                          className="text-[10px] font-semibold px-2.5 py-0.5 rounded-lg bg-slate-100/80 text-slate-700 border border-slate-200/60"
                        >
                          {req}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setActiveJob(job);
                          setApplicationResult(null);
                        }}
                        className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition shadow-xs"
                      >
                        Ver Detalhes
                      </button>

                      {applied ? (
                        <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold shadow-xs">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Candidatura Realizada
                        </span>
                      ) : (
                        <button
                          onClick={() => handleApply(job.id)}
                          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-xs font-bold text-white transition shadow-md shadow-indigo-600/20 hover:scale-102 flex items-center gap-1.5"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          Candidatar-se
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>

      {/* Modal: Job Details & Real-time AI Match Evaluation */}
      {activeJob && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative border border-slate-100">
            
            <button
              onClick={() => setActiveJob(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header Modal */}
            <div className="flex items-start gap-4">
              <img
                src={activeJob.companyLogo}
                alt={activeJob.company}
                className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shadow-sm"
              />
              <div className="space-y-1 pr-6">
                <span className="text-[10px] font-extrabold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-2 py-0.5 rounded">
                  {activeJob.department}
                </span>
                <h2 className="text-xl font-extrabold text-slate-900 leading-tight">
                  {activeJob.title}
                </h2>
                <div className="text-xs text-slate-600 flex flex-wrap gap-2 pt-0.5">
                  <span className="font-bold text-slate-800">{activeJob.company}</span>
                  <span>•</span>
                  <span>{activeJob.location}</span>
                  <span>•</span>
                  <span className="font-extrabold text-emerald-700">{activeJob.salaryRange}</span>
                </div>
              </div>
            </div>

            {/* Tags Pills */}
            <div className="flex flex-wrap gap-2">
              <span className="text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-semibold">
                Regime: {activeJob.contractType}
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-semibold">
                Modelo: {activeJob.model}
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-semibold">
                Nível: {activeJob.level}
              </span>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Descrição da Oportunidade</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                {activeJob.description}
              </p>
            </div>

            {/* Requirements */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Requisitos Técnicos</h4>
              <div className="flex flex-wrap gap-1.5">
                {activeJob.requirements.map(req => (
                  <span key={req} className="px-3 py-1 rounded-xl bg-indigo-50 text-indigo-700 text-xs font-semibold border border-indigo-100">
                    {req}
                  </span>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Benefícios Oferecidos</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                {activeJob.benefits.map(b => (
                  <li key={b} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* AI Match Box evaluation */}
            {applicationResult && (
              <div className="p-5 bg-gradient-to-br from-indigo-50 to-indigo-100/50 border border-indigo-200 rounded-3xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-indigo-950 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-indigo-600" />
                    Diagnóstico de Compatibilidade Semântica
                  </span>
                  <span className="text-lg font-black text-indigo-700">
                    {applicationResult.score}% Match
                  </span>
                </div>
                <div className="w-full bg-indigo-200/80 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-indigo-600 h-2.5 rounded-full transition-all duration-700"
                    style={{ width: `${applicationResult.score}%` }}
                  ></div>
                </div>
                <p className="text-xs text-indigo-900 leading-relaxed font-medium">
                  {applicationResult.message}
                </p>
              </div>
            )}

            {/* Modal Actions */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                onClick={() => setActiveJob(null)}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition"
              >
                Fechar
              </button>
              
              {isUserApplied(activeJob.id) ? (
                <button
                  disabled
                  className="px-5 py-2.5 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold cursor-not-allowed flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Candidatura Já Realizada
                </button>
              ) : (
                <button
                  onClick={() => handleApply(activeJob.id)}
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition shadow-lg shadow-indigo-600/30 flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  Candidatar-se com Perfil Atual
                </button>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default function VagasPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-slate-500">Carregando catálogo de vagas...</div>}>
      <VagasContent />
    </Suspense>
  );
}
