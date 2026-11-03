'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDemo } from '@/components/shared/DemoContext';
import { Job } from '@/types';
import { 
  Briefcase, 
  Sparkles, 
  CheckCircle, 
  Plus, 
  X, 
  Building2, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export default function PublicarVagaPage() {
  const router = useRouter();
  const { addJob, currentUser } = useDemo();

  const [title, setTitle] = useState('');
  const [company, setCompany] = useState(currentUser.company || 'InovaTech Solutions');
  const [location, setLocation] = useState('São Paulo, SP');
  const [model, setModel] = useState<Job['model']>('Híbrido');
  const [contractType, setContractType] = useState<Job['contractType']>('PJ');
  const [level, setLevel] = useState<Job['level']>('Pleno');
  const [department, setDepartment] = useState<Job['department']>('Tecnologia');
  const [salaryRange, setSalaryRange] = useState('R$ 10.000 - R$ 14.000');
  const [description, setDescription] = useState('');
  
  const [requirements, setRequirements] = useState<string[]>(['React', 'TypeScript', 'Node.js']);
  const [newReq, setNewReq] = useState('');

  const [benefits, setBenefits] = useState<string[]>([
    'Plano de Saúde Premium',
    'Auxílio Home Office',
    'Seguro de Vida',
  ]);
  const [newBenefit, setNewBenefit] = useState('');

  const handleAddReq = () => {
    if (newReq.trim() && !requirements.includes(newReq.trim())) {
      setRequirements([...requirements, newReq.trim()]);
      setNewReq('');
    }
  };

  const handleRemoveReq = (req: string) => {
    setRequirements(requirements.filter(r => r !== req));
  };

  const handleAddBenefit = () => {
    if (newBenefit.trim() && !benefits.includes(newBenefit.trim())) {
      setBenefits([...benefits, newBenefit.trim()]);
      setNewBenefit('');
    }
  };

  const handleRemoveBenefit = (b: string) => {
    setBenefits(benefits.filter(item => item !== b));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert('Por favor, preencha o título e a descrição da vaga.');
      return;
    }

    addJob({
      title,
      company,
      companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=80&auto=format&fit=crop&q=80',
      location,
      model,
      contractType,
      level,
      salaryRange,
      description,
      requirements,
      benefits,
      department,
    });

    router.push('/talentos/vagas');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      <div>
        <div className="flex items-center gap-2 text-indigo-600 text-xs font-semibold uppercase tracking-wider mb-1">
          <Briefcase className="w-4 h-4" />
          Gerenciamento de Recrutamento
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Publicar Nova Vaga de Emprego</h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Preencha os detalhes da posição para ativar o matching com o banco de talentos do Grupo Unique.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        
        {/* Basic Info */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b pb-2">
            1. Dados Principais da Vaga
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-semibold text-slate-700">Título do Cargo / Posição *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Desenvolvedor Front-end Next.js Sênior"
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:border-indigo-500 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Empresa Contratante</label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:border-indigo-500 outline-none bg-slate-50"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Departamento / Área</label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value as Job['department'])}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:border-indigo-500 outline-none bg-slate-50"
              >
                <option value="Tecnologia">Tecnologia</option>
                <option value="Vendas">Vendas</option>
                <option value="Engenharia">Engenharia</option>
                <option value="Operações">Operações</option>
                <option value="Finanças">Finanças</option>
                <option value="Marketing">Marketing</option>
              </select>
            </div>
          </div>
        </div>

        {/* Work Model & Compensation */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b pb-2">
            2. Localização, Modelo e Faixa Salarial
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Localização (Cidade/UF)</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Ex: São Paulo, SP"
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:border-indigo-500 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Modelo de Trabalho</label>
              <select
                value={model}
                onChange={(e) => setModel(e.target.value as Job['model'])}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:border-indigo-500 outline-none bg-slate-50"
              >
                <option value="Remoto">Remoto (100% Home Office)</option>
                <option value="Híbrido">Híbrido</option>
                <option value="Presencial">Presencial</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Senioridade Exigida</label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value as Job['level'])}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:border-indigo-500 outline-none bg-slate-50"
              >
                <option value="Júnior">Júnior</option>
                <option value="Pleno">Pleno</option>
                <option value="Sênior">Sênior</option>
                <option value="Especialista">Especialista</option>
                <option value="Liderança">Liderança / Gestão</option>
              </select>
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-semibold text-slate-700">Faixa Salarial Pretendida</label>
              <input
                type="text"
                value={salaryRange}
                onChange={(e) => setSalaryRange(e.target.value)}
                placeholder="Ex: R$ 8.000 - R$ 12.000"
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:border-indigo-500 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Regime Contratual</label>
              <select
                value={contractType}
                onChange={(e) => setContractType(e.target.value as Job['contractType'])}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:border-indigo-500 outline-none bg-slate-50"
              >
                <option value="CLT">CLT (Efetivo)</option>
                <option value="PJ">PJ (Prestador de Serviços)</option>
                <option value="Estágio">Estágio</option>
              </select>
            </div>
          </div>
        </div>

        {/* Requirements & Description */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b pb-2">
            3. Descrição e Competências Técnicas
          </h3>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Descrição Detalhada do Papel *</label>
            <textarea
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descreva as principais responsabilidades, desafios e o momento da equipe..."
              className="w-full p-3.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:border-indigo-500 outline-none"
            />
          </div>

          {/* Tags de Requisitos */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700">
              Requisitos Técnicos (Utilizados no Algoritmo de Matching)
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {requirements.map(req => (
                <span
                  key={req}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-medium border border-indigo-100"
                >
                  {req}
                  <button type="button" onClick={() => handleRemoveReq(req)} className="hover:text-indigo-900">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newReq}
                onChange={(e) => setNewReq(e.target.value)}
                placeholder="Adicionar habilidade (Ex: Docker, Python, SQL)..."
                className="flex-1 px-3 py-2 text-xs border border-slate-200 rounded-xl focus:border-indigo-500 outline-none"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddReq();
                  }
                }}
              />
              <button
                type="button"
                onClick={handleAddReq}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition"
              >
                Adicionar
              </button>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-700">Benefícios Oferecidos</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {benefits.map(b => (
              <span
                key={b}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-medium border border-emerald-100"
              >
                {b}
                <button type="button" onClick={() => handleRemoveBenefit(b)} className="hover:text-emerald-950">
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={newBenefit}
              onChange={(e) => setNewBenefit(e.target.value)}
              placeholder="Adicionar benefício (Ex: Seguro de Vida, Horário Flexível)..."
              className="flex-1 px-3 py-2 text-xs border border-slate-200 rounded-xl focus:border-indigo-500 outline-none"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddBenefit();
                }
              }}
            />
            <button
              type="button"
              onClick={handleAddBenefit}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition"
            >
              Adicionar
            </button>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-5 py-2.5 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-100 transition"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-7 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-lg shadow-indigo-600/25 transition flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            Publicar Vaga Imediatamente
          </button>
        </div>

      </form>
    </div>
  );
}
