'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useDemo } from '@/components/shared/DemoContext';
import { B2BProduct } from '@/types';
import { 
  Search, 
  Filter, 
  ShieldCheck, 
  Star, 
  MapPin, 
  Clock, 
  X, 
  Send, 
  ShoppingBag,
  CheckCircle,
  Building2
} from 'lucide-react';

function CatalogoContent() {
  const searchParams = useSearchParams();
  const initialCat = searchParams.get('cat') || 'Todas';

  const { products, requestProductQuote, currentUser } = useDemo();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCat, setSelectedCat] = useState(initialCat);
  const [activeProduct, setActiveProduct] = useState<B2BProduct | null>(null);
  const [quoteNotes, setQuoteNotes] = useState('');
  const [quoteSent, setQuoteSent] = useState(false);

  const categories = [
    'Todas',
    'Máquinas & Equipamentos',
    'Matéria-Prima',
    'TI & Software Corporativo',
    'Logística & Transporte',
    'Serviços Especializados',
  ];

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchSearch = searchTerm === '' ||
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.supplierName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchCat = selectedCat === 'Todas' || p.category === selectedCat;

      return matchSearch && matchCat;
    });
  }, [products, searchTerm, selectedCat]);

  const handleSendQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeProduct) return;
    requestProductQuote(activeProduct.id, quoteNotes);
    setQuoteSent(true);
    setTimeout(() => {
      setActiveProduct(null);
      setQuoteSent(false);
      setQuoteNotes('');
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Catálogo de Produtos & Serviços B2B</h1>
        <p className="text-xs text-slate-500 mt-1">
          Soluções corporativas, matérias-primas e maquinário fornecidos por parceiros industriais auditados.
        </p>
      </div>

      {/* Grid: Filters + Products */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left Filters */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-6 h-fit">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="font-bold text-xs uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-emerald-600" />
              Filtrar Catálogo
            </span>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCat('Todas');
              }}
              className="text-[11px] text-emerald-700 hover:underline"
            >
              Resetar
            </button>
          </div>

          {/* Search */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Buscar Produto ou Fornecedor</label>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Ex: CNC, Aço Inox, Frete..."
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
              />
            </div>
          </div>

          {/* Category */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Categoria</label>
            <div className="space-y-1">
              {categories.map(cat => (
                <label key={cat} className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
                  <input
                    type="radio"
                    name="cat"
                    checked={selectedCat === cat}
                    onChange={() => setSelectedCat(cat)}
                    className="text-emerald-600 focus:ring-emerald-500"
                  />
                  <span>{cat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Verification Badge info */}
          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-xs space-y-1.5">
            <div className="font-semibold text-emerald-900 flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Garantia Vendara
            </div>
            <p className="text-[11px] text-emerald-800">
              Todos os fornecedores são submetidos a compliance fiscal e possuem capacidade produtiva verificada.
            </p>
          </div>
        </div>

        {/* Product Cards */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span>Mostrando <strong>{filteredProducts.length}</strong> itens disponíveis</span>
            <span>Preços para faturamento PJ com prazo flexível</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(prod => (
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
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-semibold text-emerald-700 flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        {prod.supplierName}
                      </span>
                      <span className="flex items-center gap-0.5 text-amber-500 font-bold">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        {prod.rating}
                      </span>
                    </div>

                    <h3 className="font-bold text-slate-900 text-xs sm:text-sm line-clamp-2 leading-tight">
                      {prod.name}
                    </h3>

                    <div className="text-xs font-extrabold text-slate-800 pt-1">
                      {prod.priceEstimate}
                    </div>

                    <div className="text-[10px] text-slate-500 space-y-0.5 pt-1 border-t border-slate-100">
                      <div>Prazo médio: <strong>{prod.leadTime}</strong></div>
                      <div>Pedido mínimo: <strong>{prod.minOrder}</strong></div>
                      <div>Origem: <strong>{prod.supplierLocation}</strong></div>
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <button
                    onClick={() => {
                      setActiveProduct(prod);
                      setQuoteSent(false);
                    }}
                    className="w-full py-2 rounded-xl bg-emerald-50 text-emerald-800 font-bold text-xs hover:bg-emerald-600 hover:text-white transition"
                  >
                    Solicitar Cotação B2B
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Quote Modal */}
      {activeProduct && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl relative">
            
            <button
              onClick={() => setActiveProduct(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition"
            >
              <X className="w-5 h-5" />
            </button>

            {quoteSent ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Solicitação Enviada com Sucesso!</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  A empresa <strong>{activeProduct.supplierName}</strong> recebeu suas especificações e entrará em contato via chat corporativo.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendQuote} className="space-y-4">
                <div className="flex items-center gap-3">
                  <img
                    src={activeProduct.imageUrl}
                    alt={activeProduct.name}
                    className="w-14 h-14 rounded-2xl object-cover border border-slate-200"
                  />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-emerald-600 tracking-wider">
                      Cotação de Fornecimento
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 leading-tight">
                      {activeProduct.name}
                    </h3>
                    <p className="text-xs text-slate-500">{activeProduct.supplierName}</p>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs space-y-1">
                  <div><strong>Preço Estimado:</strong> {activeProduct.priceEstimate}</div>
                  <div><strong>Lote Mínimo:</strong> {activeProduct.minOrder}</div>
                  <div><strong>Tempo de Produção:</strong> {activeProduct.leadTime}</div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">
                    Detalhes da Demanda (Quantidade, especificações técnicas, prazo pretendido)
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={quoteNotes}
                    onChange={(e) => setQuoteNotes(e.target.value)}
                    placeholder="Ex: Precisamos de 3 unidades para entrega no polo industrial de Curitiba até o final do próximo mês..."
                    className="w-full p-3 text-xs border border-slate-200 rounded-xl focus:border-emerald-500 outline-none"
                  />
                </div>

                <div className="text-[11px] text-slate-500">
                  Solicitante: <strong>{currentUser.name}</strong> ({currentUser.company || 'Empresa Compradora'})
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveProduct(null)}
                    className="px-4 py-2 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-100 transition"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition flex items-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Enviar Solicitação Formal
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}

export default function CatalogoPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-slate-500">Carregando catálogo B2B...</div>}>
      <CatalogoContent />
    </Suspense>
  );
}
