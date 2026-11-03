import { Job, UserProfile } from '@/types';

export interface CandidateMatchResult {
  score: number; // 0-100
  skillsMatch: string[];
  skillsMissing: string[];
  strengths: string;
  recommendation: 'Altamente Recomendado' | 'Bom Encaixe' | 'Potencial com Treinamento' | 'Pouca Aderência';
}

/**
 * Algoritmo de Inteligência e Matching para o Portal Unique Talentos
 * Cruza requisitos técnicos da vaga com as competências do perfil profissional.
 */
export function calculateJobMatch(job: Job, candidate: UserProfile): CandidateMatchResult {
  const candidateSkills = (candidate.skills || []).map(s => s.toLowerCase().trim());
  const jobRequirements = job.requirements.map(r => r.toLowerCase().trim());

  const matched: string[] = [];
  const missing: string[] = [];

  jobRequirements.forEach(req => {
    const isMatched = candidateSkills.some(skill => 
      skill.includes(req) || req.includes(skill)
    );
    if (isMatched) {
      matched.push(req);
    } else {
      missing.push(req);
    }
  });

  // Base score from skills overlap
  const skillRatio = jobRequirements.length > 0 ? (matched.length / jobRequirements.length) : 0.8;
  let baseScore = Math.round(skillRatio * 75);

  // Experience level bonus
  const expYears = candidate.experienceYears || 2;
  if (job.level === 'Sênior' || job.level === 'Especialista' || job.level === 'Liderança') {
    if (expYears >= 5) baseScore += 20;
    else if (expYears >= 3) baseScore += 10;
  } else if (job.level === 'Pleno') {
    if (expYears >= 3) baseScore += 20;
    else baseScore += 10;
  } else {
    // Júnior / Estágio
    baseScore += 20;
  }

  // Location / Model bonus
  if (job.model === 'Remoto' || candidate.location.includes(job.location) || job.location.includes(candidate.location)) {
    baseScore += 5;
  }

  const finalScore = Math.min(99, Math.max(35, baseScore));

  let recommendation: CandidateMatchResult['recommendation'] = 'Pouca Aderência';
  let strengths = 'Requer desenvolvimento nas principais tecnologias da vaga.';

  if (finalScore >= 85) {
    recommendation = 'Altamente Recomendado';
    strengths = `Forte domínio técnico em ${matched.slice(0, 3).join(', ')} e senioridade alinhada ao cargo.`;
  } else if (finalScore >= 70) {
    recommendation = 'Bom Encaixe';
    strengths = `Atende aos pilares essenciais (${matched.slice(0, 2).join(', ')}). Adaptação rápida esperada.`;
  } else if (finalScore >= 50) {
    recommendation = 'Potencial com Treinamento';
    strengths = `Possui boa base de experiência, necessitando aperfeiçoamento em ${missing.slice(0, 2).join(', ')}.`;
  }

  return {
    score: finalScore,
    skillsMatch: matched,
    skillsMissing: missing,
    strengths,
    recommendation,
  };
}
