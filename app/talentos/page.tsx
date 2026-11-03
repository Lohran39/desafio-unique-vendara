'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDemo } from '@/components/shared/DemoContext';
import { 
  Briefcase, 
  Search, 
  MapPin, 
  Building2, 
  Clock, 
  Sparkles, 
  Users, 
  ArrowRight, 
  ShieldCheck, 
  Award,
  ChevronRight
} from 'lucide-react';

export default function TalentosLandingPage() {
  const router = useRouter();
  const { jobs, currentUser } = useDemo();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('Todos');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/talentos/vagas?q=${encodeURIComponent(searchTerm)}`);
  };

  const departments = ['Todos', 'Tecnologia', 'Vendas', 'Engenharia', 'Operações', 'Finanças'];

  const filteredJobs = jobs.filter(job => {
    const matchesDept = selectedDept === 'Todos' || job.department === selectedDept;
    const matchesSearch = searchTerm === '' || 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDept && matchesSearch;
  });

  return (
    <div className="space-y-12 pb-16">
      
      {/* Talentos Hero Banner */}
      <section className="bg-gradient-to-b from-indigo-900 via-indigo-950 to-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-indigo-950">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            Portal de Recrutamento & Seleção Inteligente
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Descubra talentos e vagas no ecossistema <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-indigo-200">
              Unique Talentos
            </span>
          </h1>

          <p className="text-sm sm:text-base text-indigo-200/80 max-w-2xl mx-auto leading-relaxed">
            Conexão em tempo real entre recrutadores exigentes e os melhores profissionais do mercado, com triagem inteligente e cálculo de compatibilidade automatizado.
          </p>

          {/* Quick Search Form */}
          <form onSubmit={handleSearch} className="max-w-3xl mx-auto pt-4">
            <div className="bg-white p-2 rounded-2xl shadow-xl flex flex-col sm:flex-row items-center gap-2 border border-slate-200">
              <div className="flex items-center gap-2.5 px-3 py-2 flex-1 w-full text-slate-800">
                <Search className="w-5 h-5 text-indigo-600 shrink-0" />
                <input
                  type="text"
                  placeholder="Cargo, tecnologia (ex: React, Python, Vendas)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full text-sm outline-none placeholder:text-slate-400"
                />
              </div>

              <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>

              <div className="flex items-center gap-2.5 px-3 py-2 sm:w-56 w-full text-slate-700">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="text-xs text-slate-500 truncate">Brasil / Remoto</span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl transition shadow-md shrink-0"
              >
                Buscar Vagas
              </button>
            </div>
          </form>

          {/* Department tags */}
          <div className="flex items-center justify-center gap-2 flex-wrap pt-2">
            <span className="text-xs text-indigo-300 font-medium">Áreas em alta:</span>
            {departments.slice(1).map(dept => (
              <button
                key={dept}
                onClick={() => {
                  setSelectedDept(dept);
                  router.push(`/talentos/vagas?dept=${dept}`);
                }}
                className="text-xs px-2.5 py-1 rounded-lg bg-indigo-800/40 hover:bg-indigo-700/60 text-indigo-200 border border-indigo-700/50 transition"
              >
                {dept}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Navigation Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/talentos/vagas"
            className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-indigo-400 hover:shadow-lg transition group flex items-start gap-4"
          >
            <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition">
              <Briefcase className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-indigo-600 transition flex items-center justify-between">
                <span>Vagas Abertas</span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </h3>
              <p className="text-xs text-slate-500">
                Explore oportunidades com filtros de senioridade e formato de contratação.
              </p>
            </div>
          </Link>

          <Link
            href="/talentos/candidatos"
            className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-indigo-400 hover:shadow-lg transition group flex items-start gap-4"
          >
            <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition">
              <Users className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-indigo-600 transition flex items-center justify-between">
                <span>Banco de Talentos</span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </h3>
              <p className="text-xs text-slate-500">
                Acesse perfis profissionais qualificados e avaliados para recrutamento direto.
              </p>
            </div>
          </Link>

          <Link
            href="/talentos/dashboard"
            className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-indigo-400 hover:shadow-lg transition group flex items-start gap-4"
          >
            <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition">
              <Award className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-indigo-600 transition flex items-center justify-between">
                <span>Painel de Gestão</span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </h3>
              <p className="text-xs text-slate-500">
                Acompanhe o funil de candidatos, candidaturas enviadas e métricas de triagem.
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Vagas em Destaque no Grupo Unique</h2>
            <p className="text-xs text-slate-500">Oportunidades recentes com matching em tempo real disponível</p>
          </div>
          <Link
            href="/talentos/vagas"
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
          >
            Ver todas ({jobs.length})
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {jobs.slice(0, 4).map(job => (
            <div
              key={job.id}
              className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={job.companyLogo}
                      alt={job.company}
                      className="w-10 h-10 rounded-xl object-cover border border-slate-100 shadow-sm"
                    />
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm leading-tight hover:text-indigo-600 transition">
                        {job.title}
                      </h3>
                      <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                        <span className="font-medium text-slate-700">{job.company}</span>
                        <span>•</span>
                        <span>{job.location}</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                    {job.model}
                  </span>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {job.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {job.requirements.slice(0, 4).map(req => (
                    <span
                      key={req}
                      className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600"
                    >
                      {req}
                    </span>
                  ))}
                  {job.requirements.length > 4 && (
                    <span className="text-[10px] text-slate-400 self-center">
                      +{job.requirements.length - 4}
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="font-bold text-slate-800">
                  {job.salaryRange}
                </div>
                <Link
                  href={`/talentos/vagas?vaga=${job.id}`}
                  className="px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 font-semibold hover:bg-indigo-600 hover:text-white transition"
                >
                  Ver Detalhes & Candidatar
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
