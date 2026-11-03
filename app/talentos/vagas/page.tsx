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
  ChevronRight
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header Breadcrumb */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Buscar Oportunidades Profissionais</h1>
        <p className="text-xs text-slate-500 mt-1">
          Explore as vagas abertas no ecossistema do Grupo Unique e teste o matching automático de perfil.
        </p>
      </div>

      {/* Main Grid: Filters + List */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left Sidebar Filters */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-6 h-fit">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="font-bold text-xs uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
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
              className="text-[11px] text-indigo-600 hover:underline"
            >
              Limpar
            </button>
          </div>

          {/* Search Box */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Palavra-chave / Cargo</label>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Ex: Next.js, Vendas..."
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>

          {/* Department */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Área / Departamento</label>
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:border-indigo-500 outline-none bg-slate-50"
            >
              <option value="Todas">Todas as Áreas</option>
              <option value="Tecnologia">Tecnologia</option>
              <option value="Vendas">Vendas</option>
              <option value="Engenharia">Engenharia</option>
              <option value="Operações">Operações</option>
              <option value="Finanças">Finanças</option>
            </select>
          </div>

          {/* Work Model */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Modelo de Trabalho</label>
            <div className="space-y-1">
              {['Todos', 'Remoto', 'Híbrido', 'Presencial'].map(m => (
                <label key={m} className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
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
            <label className="text-xs font-semibold text-slate-700">Nível de Experiência</label>
            <div className="space-y-1">
              {['Todos', 'Júnior', 'Pleno', 'Sênior', 'Especialista', 'Liderança'].map(l => (
                <label key={l} className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
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
          <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-100 text-xs space-y-2">
            <div className="font-semibold text-indigo-900 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              Matching Ativo
            </div>
            <p className="text-[11px] text-indigo-700">
              Você está navegando como <strong>{currentUser.name}</strong>. Ao clicar em candidatar-se, o sistema comparará seu perfil e emitirá o índice de compatibilidade.
            </p>
          </div>
        </div>

        {/* Right Job List */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span>Mostrando <strong>{filteredJobs.length}</strong> vagas encontradas</span>
            <span>Atualização em tempo real</span>
          </div>

          {filteredJobs.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-2xl border border-slate-200 space-y-3">
              <Briefcase className="w-10 h-10 text-slate-300 mx-auto" />
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
                  className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition space-y-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3.5">
                      <img
                        src={job.companyLogo}
                        alt={job.company}
                        className="w-12 h-12 rounded-xl object-cover border border-slate-100 shadow-sm shrink-0"
                      />
                      <div className="space-y-1">
                        <h2 className="font-bold text-slate-900 text-base leading-tight hover:text-indigo-600 transition">
                          {job.title}
                        </h2>
                        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                          <span className="font-medium text-slate-800 flex items-center gap-1">
                            <Building2 className="w-3.5 h-3.5 text-slate-400" />
                            {job.company}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" />
                            {job.location}
                          </span>
                          <span>•</span>
                          <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                            {job.salaryRange}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                      <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                        {job.model} • {job.level}
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

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 flex-wrap gap-2">
                    <div className="flex flex-wrap gap-1.5">
                      {job.requirements.map(req => (
                        <span
                          key={req}
                          className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700"
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
                        className="px-3.5 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                      >
                        Ver Detalhes
                      </button>

                      {applied ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-semibold">
                          <CheckCircle className="w-3.5 h-3.5" />
                          Candidatura Enviada
                        </span>
                      ) : (
                        <button
                          onClick={() => handleApply(job.id)}
                          className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-xs font-semibold text-white transition shadow-sm"
                        >
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
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative">
            
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
                <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
                  {activeJob.department}
                </span>
                <h2 className="text-xl font-bold text-slate-900 leading-tight">
                  {activeJob.title}
                </h2>
                <div className="text-xs text-slate-600 flex flex-wrap gap-2">
                  <span className="font-semibold text-slate-800">{activeJob.company}</span>
                  <span>•</span>
                  <span>{activeJob.location}</span>
                  <span>•</span>
                  <span className="font-bold text-emerald-600">{activeJob.salaryRange}</span>
                </div>
              </div>
            </div>

            {/* Tags Pills */}
            <div className="flex flex-wrap gap-2">
              <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-medium">
                Regime: {activeJob.contractType}
              </span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-medium">
                Modelo: {activeJob.model}
              </span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-medium">
                Nível: {activeJob.level}
              </span>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Descrição da Oportunidade</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {activeJob.description}
              </p>
            </div>

            {/* Requirements */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Requisitos Técnicos</h4>
              <div className="flex flex-wrap gap-1.5">
                {activeJob.requirements.map(req => (
                  <span key={req} className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-medium">
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
              <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-900 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-indigo-600" />
                    Resultado da Análise de Compatibilidade
                  </span>
                  <span className="text-base font-extrabold text-indigo-600">
                    {applicationResult.score}% Match
                  </span>
                </div>
                <div className="w-full bg-indigo-200 rounded-full h-2">
                  <div
                    className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${applicationResult.score}%` }}
                  ></div>
                </div>
                <p className="text-xs text-indigo-800">
                  {applicationResult.message}
                </p>
              </div>
            )}

            {/* Modal Actions */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                onClick={() => setActiveJob(null)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-100 transition"
              >
                Fechar
              </button>
              
              {isUserApplied(activeJob.id) ? (
                <button
                  disabled
                  className="px-5 py-2.5 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold cursor-not-allowed flex items-center gap-1.5"
                >
                  <CheckCircle className="w-4 h-4" />
                  Candidatura Já Realizada
                </button>
              ) : (
                <button
                  onClick={() => handleApply(activeJob.id)}
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition shadow-md flex items-center gap-2"
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
