'use client';

import React, { useState } from 'react';
import { useDemo } from '@/components/shared/DemoContext';
import { UserProfile } from '@/types';
import { 
  Users, 
  Search, 
  MapPin, 
  Briefcase, 
  Mail, 
  CheckCircle2, 
  Sparkles, 
  Star,
  FileText,
  X
} from 'lucide-react';

export default function BancoDeTalentosPage() {
  const { candidates, showNotification } = useDemo();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState<UserProfile | null>(null);

  const filteredCandidates = candidates.filter(c => {
    const term = searchTerm.toLowerCase();
    const matchName = c.name.toLowerCase().includes(term);
    const matchTitle = (c.title || '').toLowerCase().includes(term);
    const matchSkills = (c.skills || []).some(s => s.toLowerCase().includes(term));
    const matchLocation = c.location.toLowerCase().includes(term);
    return matchName || matchTitle || matchSkills || matchLocation;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 text-xs font-semibold uppercase tracking-wider mb-1">
            <Users className="w-4 h-4" />
            Recrutamento Proativo
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Banco de Talentos & Currículos</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Busca de profissionais pré-avaliados em tempo real com filtros por habilidades e senioridade.
          </p>
        </div>

        {/* Search bar */}
        <div className="w-full md:w-80 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Buscar por competência, cargo ou cidade..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none bg-white shadow-sm"
          />
        </div>
      </div>

      {/* Talent Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCandidates.map(candidate => (
          <div
            key={candidate.id}
            className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-start gap-4">
                <img
                  src={candidate.avatar}
                  alt={candidate.name}
                  className="w-14 h-14 rounded-2xl object-cover border border-slate-100 shadow-sm shrink-0"
                />
                <div className="space-y-0.5">
                  <h3 className="font-bold text-slate-900 text-sm leading-tight hover:text-indigo-600 transition">
                    {candidate.name}
                  </h3>
                  <div className="text-xs text-indigo-600 font-medium">
                    {candidate.title}
                  </div>
                  <div className="text-[11px] text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    {candidate.location} • {candidate.experienceYears} anos de exp.
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                {candidate.bio}
              </p>

              {/* Skills Tags */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Competências Chave
                </span>
                <div className="flex flex-wrap gap-1">
                  {(candidate.skills || []).map(skill => (
                    <span
                      key={skill}
                      className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100/50"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <button
                onClick={() => setSelectedCandidate(candidate)}
                className="flex-1 py-2 px-3 text-center rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200 transition"
              >
                Ver Currículo
              </button>
              <button
                onClick={() => showNotification(`Mensagem de convite enviada para ${candidate.name}!`)}
                className="py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition shadow-sm flex items-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5" />
                Conectar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Candidate Modal */}
      {selectedCandidate && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl relative">
            <button
              onClick={() => setSelectedCandidate(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4">
              <img
                src={selectedCandidate.avatar}
                alt={selectedCandidate.name}
                className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shadow-sm"
              />
              <div>
                <h3 className="text-lg font-bold text-slate-900">{selectedCandidate.name}</h3>
                <p className="text-xs text-indigo-600 font-medium">{selectedCandidate.title}</p>
                <p className="text-xs text-slate-500">{selectedCandidate.location}</p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Resumo Profissional</h4>
              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                {selectedCandidate.bio}
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Stack Tecnológica & Habilidades</h4>
              <div className="flex flex-wrap gap-1.5">
                {(selectedCandidate.skills || []).map(skill => (
                  <span key={skill} className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedCandidate(null)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-100 transition"
              >
                Fechar
              </button>
              <button
                onClick={() => {
                  showNotification(`Convite para entrevista enviado para ${selectedCandidate.name}!`);
                  setSelectedCandidate(null);
                }}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition shadow-md"
              >
                Convidar para Processo Seletivo
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
