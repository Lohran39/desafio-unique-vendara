import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Sparkles, Building2, Globe2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-emerald-500 flex items-center justify-center text-white font-bold text-sm">
                U
              </div>
              <span className="font-bold text-white text-base">Grupo Unique</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Ecossistema integrado de soluções corporativas, unindo o recrutamento inteligente da 
              <strong> Unique Talentos</strong> com a potência de negociações do <strong>Vendara B2B</strong>.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Conformidade total com a LGPD e Segurança SSL</span>
            </div>
          </div>

          {/* Unique Talentos Links */}
          <div className="space-y-2">
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider">Unique Talentos</h4>
            <ul className="space-y-1.5">
              <li><Link href="/talentos/vagas" className="hover:text-white transition">Buscar Vagas de Emprego</Link></li>
              <li><Link href="/talentos/candidatos" className="hover:text-white transition">Banco de Talentos & Currículos</Link></li>
              <li><Link href="/talentos/publicar" className="hover:text-white transition">Publicação de Vagas</Link></li>
              <li><Link href="/talentos/dashboard" className="hover:text-white transition">Painel do Recrutador / Candidato</Link></li>
            </ul>
          </div>

          {/* Vendara B2B Links */}
          <div className="space-y-2">
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider">Vendara Marketplace</h4>
            <ul className="space-y-1.5">
              <li><Link href="/vendara/catalogo" className="hover:text-white transition">Catálogo de Produtos & Serviços</Link></li>
              <li><Link href="/vendara/demandas" className="hover:text-white transition">Mural de Cotações & Demandas</Link></li>
              <li><Link href="/vendara/irc-fci" className="hover:text-white transition">Métricas Exclusivas IRC & FCI</Link></li>
              <li><Link href="/vendara/nova-demanda" className="hover:text-white transition">Cadastrar Demanda de Compra</Link></li>
            </ul>
          </div>

          {/* Arquitetura & Stack */}
          <div className="space-y-2">
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider">Tecnologias & Arquitetura</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Desenvolvido em Next.js 15, TypeScript, Tailwind CSS, PostgreSQL + pgvector (busca semântica por IA), 
              Node.js e microsserviço de inteligência artificial.
            </p>
            <div className="pt-2">
              <Link href="/planos" className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition font-medium text-xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Ver Planos e Assinaturas
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <div>
            &copy; 2026 Grupo Unique. Todos os direitos reservados. Projeto desenvolvido para avaliação técnica.
          </div>
          <div className="flex items-center gap-4 text-slate-500">
            <span>Privacidade & LGPD</span>
            <span>Termos de Uso</span>
            <span>API Docs</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
