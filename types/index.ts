export type UserRole = 
  | 'recrutador' 
  | 'candidato' 
  | 'comprador_b2b' 
  | 'fornecedor_b2b' 
  | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  company?: string;
  title?: string;
  avatar: string;
  bio?: string;
  location: string;
  plan: 'free' | 'pro' | 'enterprise';
  skills?: string[];
  experienceYears?: number;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  model: 'Remoto' | 'Híbrido' | 'Presencial';
  contractType: 'CLT' | 'PJ' | 'Estágio';
  level: 'Júnior' | 'Pleno' | 'Sênior' | 'Especialista' | 'Liderança';
  salaryRange: string;
  description: string;
  requirements: string[];
  benefits: string[];
  department: 'Tecnologia' | 'Vendas' | 'Engenharia' | 'Operações' | 'Finanças' | 'Marketing';
  createdAt: string;
  applicationsCount: number;
  status: 'Ativa' | 'Pausada' | 'Encerrada';
}

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  candidateId: string;
  candidateName: string;
  candidateAvatar: string;
  candidateEmail: string;
  matchScore: number;
  matchAnalysis: {
    skillsMatch: string[];
    skillsMissing: string[];
    strengths: string;
  };
  appliedAt: string;
  status: 'Triagem' | 'Entrevista' | 'Proposta' | 'Contratado' | 'Desqualificado';
  resumeUrl?: string;
}

export interface B2BProduct {
  id: string;
  name: string;
  category: 'Máquinas & Equipamentos' | 'Matéria-Prima' | 'TI & Software Corporativo' | 'Logística & Transporte' | 'Serviços Especializados';
  description: string;
  supplierId: string;
  supplierName: string;
  supplierVerified: boolean;
  supplierLocation: string;
  minOrder: string;
  priceEstimate: string;
  leadTime: string;
  rating: number;
  reviewsCount: number;
  imageUrl: string;
  tags: string[];
}

export interface B2BDemand {
  id: string;
  title: string;
  category: 'Máquinas & Equipamentos' | 'Matéria-Prima' | 'TI & Software Corporativo' | 'Logística & Transporte' | 'Serviços Especializados';
  buyerId: string;
  buyerCompany: string;
  buyerName: string;
  location: string;
  description: string;
  estimatedBudget: number; // in BRL
  deadlineDays: number; // urgency in days
  hasDecisor: boolean; // budget approved by board
  isRecurring: boolean; // one-off or contract
  ircScore: number; // 0-100 calculated
  ircLevel: 'Crítico / Imediato' | 'Alto' | 'Médio' | 'Baixo';
  fciStatus: 'Buscando' | 'Fornecedores Notificados' | 'Cotações em Análise' | 'Concluído';
  matchedSuppliersCount: number;
  createdAt: string;
  proposalsCount: number;
}

export interface B2BQuoteProposal {
  id: string;
  demandId: string;
  supplierId: string;
  supplierName: string;
  value: number;
  estimatedDelivery: string;
  notes: string;
  createdAt: string;
  status: 'Enviada' | 'Em Análise' | 'Aprovada' | 'Recusada';
}
