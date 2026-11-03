'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, Job, JobApplication, B2BProduct, B2BDemand, UserRole } from '@/types';
import { DEMO_USERS, INITIAL_JOBS, INITIAL_CANDIDATES, INITIAL_APPLICATIONS, INITIAL_B2B_PRODUCTS, INITIAL_B2B_DEMANDS } from '@/lib/mockData';
import { calculateJobMatch } from '@/lib/matching';
import { calculateIRC, executeFCI } from '@/lib/metrics';

interface DemoContextType {
  currentUser: UserProfile;
  switchUser: (role: UserRole) => void;
  availableUsers: UserProfile[];
  
  // Jobs (Unique Talentos)
  jobs: Job[];
  addJob: (newJob: Omit<Job, 'id' | 'createdAt' | 'applicationsCount' | 'status'>) => void;
  applications: JobApplication[];
  applyToJob: (jobId: string) => { success: boolean; matchScore: number; message: string };
  updateApplicationStatus: (appId: string, status: JobApplication['status']) => void;
  candidates: UserProfile[];

  // Vendara B2B
  products: B2BProduct[];
  demands: B2BDemand[];
  addDemand: (newDemand: {
    title: string;
    category: B2BDemand['category'];
    description: string;
    estimatedBudget: number;
    deadlineDays: number;
    hasDecisor: boolean;
    isRecurring: boolean;
  }) => B2BDemand;
  requestProductQuote: (productId: string, notes: string) => void;
  
  // Notification toast
  notification: string | null;
  showNotification: (msg: string) => void;
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<UserProfile>(DEMO_USERS[0]); // Starts as Recruiter
  const [jobs, setJobs] = useState<Job[]>(INITIAL_JOBS);
  const [applications, setApplications] = useState<JobApplication[]>(INITIAL_APPLICATIONS);
  const [candidates] = useState<UserProfile[]>(INITIAL_CANDIDATES);
  const [products] = useState<B2BProduct[]>(INITIAL_B2B_PRODUCTS);
  const [demands, setDemands] = useState<B2BDemand[]>(INITIAL_B2B_DEMANDS);
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const switchUser = (role: UserRole) => {
    const found = DEMO_USERS.find(u => u.role === role);
    if (found) {
      setCurrentUser(found);
      showNotification(`Perfil alterado para: ${found.name} (${found.title || found.role})`);
    }
  };

  const addJob = (newJobData: Omit<Job, 'id' | 'createdAt' | 'applicationsCount' | 'status'>) => {
    const newJob: Job = {
      ...newJobData,
      id: `job-${Date.now()}`,
      createdAt: 'Agora mesmo',
      applicationsCount: 0,
      status: 'Ativa',
    };
    setJobs(prev => [newJob, ...prev]);
    showNotification(`Vaga "${newJob.title}" publicada com sucesso!`);
  };

  const applyToJob = (jobId: string) => {
    const targetJob = jobs.find(j => j.id === jobId);
    if (!targetJob) return { success: false, matchScore: 0, message: 'Vaga não encontrada' };

    const alreadyApplied = applications.some(a => a.jobId === jobId && a.candidateId === currentUser.id);
    if (alreadyApplied) {
      return { success: false, matchScore: 0, message: 'Você já se candidatou a esta vaga!' };
    }

    const match = calculateJobMatch(targetJob, currentUser);

    const newApp: JobApplication = {
      id: `app-${Date.now()}`,
      jobId,
      jobTitle: targetJob.title,
      company: targetJob.company,
      candidateId: currentUser.id,
      candidateName: currentUser.name,
      candidateAvatar: currentUser.avatar,
      candidateEmail: currentUser.email,
      matchScore: match.score,
      matchAnalysis: {
        skillsMatch: match.skillsMatch,
        skillsMissing: match.skillsMissing,
        strengths: match.strengths,
      },
      appliedAt: 'Agora mesmo',
      status: 'Triagem',
    };

    setApplications(prev => [newApp, ...prev]);
    setJobs(prev => prev.map(j => j.id === jobId ? { ...j, applicationsCount: j.applicationsCount + 1 } : j));

    showNotification(`Candidatura enviada! Seu Match Score foi de ${match.score}%.`);
    return { success: true, matchScore: match.score, message: `Candidatura enviada com sucesso! (${match.score}% compatível)` };
  };

  const updateApplicationStatus = (appId: string, status: JobApplication['status']) => {
    setApplications(prev => prev.map(a => a.id === appId ? { ...a, status } : a));
    showNotification(`Status da candidatura atualizado para: ${status}`);
  };

  const addDemand = (data: {
    title: string;
    category: B2BDemand['category'];
    description: string;
    estimatedBudget: number;
    deadlineDays: number;
    hasDecisor: boolean;
    isRecurring: boolean;
  }) => {
    const irc = calculateIRC({
      estimatedBudget: data.estimatedBudget,
      deadlineDays: data.deadlineDays,
      hasDecisor: data.hasDecisor,
      isRecurring: data.isRecurring,
    });

    // Run FCI matching
    const suppliersList = products.map(p => ({
      id: p.supplierId,
      name: p.supplierName,
      category: p.category,
      location: p.supplierLocation,
      verified: p.supplierVerified,
      rating: p.rating,
    }));
    const fciMatches = executeFCI(data.category, currentUser.location, suppliersList);

    const newDemand: B2BDemand = {
      id: `dem-${Date.now()}`,
      title: data.title,
      category: data.category,
      buyerId: currentUser.id,
      buyerCompany: currentUser.company || 'Empresa Compradora',
      buyerName: currentUser.name,
      location: currentUser.location,
      description: data.description,
      estimatedBudget: data.estimatedBudget,
      deadlineDays: data.deadlineDays,
      hasDecisor: data.hasDecisor,
      isRecurring: data.isRecurring,
      ircScore: irc.score,
      ircLevel: irc.level,
      fciStatus: fciMatches.length > 0 ? 'Fornecedores Notificados' : 'Buscando',
      matchedSuppliersCount: fciMatches.length,
      createdAt: 'Agora mesmo',
      proposalsCount: 0,
    };

    setDemands(prev => [newDemand, ...prev]);
    showNotification(`Demanda B2B cadastrada! IRC Score calculado: ${irc.score} (${irc.level}) com FCI ativo.`);
    return newDemand;
  };

  const requestProductQuote = (productId: string, notes: string) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    showNotification(`Solicitação de cotação enviada para ${product.supplierName}!`);
  };

  return (
    <DemoContext.Provider
      value={{
        currentUser,
        switchUser,
        availableUsers: DEMO_USERS,
        jobs,
        addJob,
        applications,
        applyToJob,
        updateApplicationStatus,
        candidates,
        products,
        demands,
        addDemand,
        requestProductQuote,
        notification,
        showNotification,
      }}
    >
      {children}
    </DemoContext.Provider>
  );
}

export function useDemo() {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error('useDemo must be used within a DemoProvider');
  }
  return context;
}
