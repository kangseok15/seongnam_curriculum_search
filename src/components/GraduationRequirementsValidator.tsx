import React, { useMemo } from 'react';
import { 
  SelectionGroup, 
  SUBJECT_AREAS, 
  normalizeSubjectName,
  isExchangeSubject,
  parseExchangeSubject
} from '../data/curriculumData';
import { SchoolCurriculum } from '../data/schoolsData';
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Info, 
  Sparkles, 
  Flame, 
  BookOpen, 
  Compass, 
  GraduationCap 
} from 'lucide-react';

interface Props {
  school: SchoolCurriculum;
  consultantChoices: Record<string, boolean>; // e.g. "grade-groupId-subjectName-semester"
  planGrade: number;
}

export interface CreditSummary {
  korean: number;
  math: number;
  english: number;
  history: number;
  social: number;
  science: number;
  pe: number;
  art: number;
  techInfo: number;
  secondLangEtc: number;
  totalElectiveAndMandatory: number;
  hasPhysics: boolean;
  hasChemistry: boolean;
  hasBiology: boolean;
  hasEarthScience: boolean;
  scienceBranchesCount: number;
  mathSubjectsCount: number;
  hasInfoSubject: boolean;
  specialMajorCredits: number; // for foreign lang / science specialized schools
}

function allocateSingleSubject(
  name: string,
  cred: number,
  acc: {
    korean: number;
    math: number;
    english: number;
    history: number;
    social: number;
    science: number;
    pe: number;
    art: number;
    techInfo: number;
    secondLangEtc: number;
    specialMajorCredits: number;
  },
  chosenMath: Set<string>,
  chosenSciences: Set<string>,
  onHasInfo: () => void,
  isSpecialPurpose: boolean
) {
  const norm = normalizeSubjectName(name);
  let area = '';

  for (const [aName, sList] of Object.entries(SUBJECT_AREAS)) {
    if (sList.some(s => normalizeSubjectName(s) === norm)) {
      area = aName;
      break;
    }
  }

  // '공통' 영역(공통국어·공통수학·공통영어·한국사·통합사회·통합과학·과학탐구실험)은
  // 학점 집계용 교과 영역이 아니므로, 아래 키워드 분류로 실제 교과(국/수/영/한국사/사회/과학)에 배정한다.
  if (area === '공통') area = '';

  if (!area) {
    if (norm.includes('국어') || norm.includes('문학') || norm.includes('독서') || norm.includes('화법')) area = '국어';
    else if (norm.includes('수학') || norm.includes('대수') || norm.includes('미적') || norm.includes('기하') || norm.includes('확률')) area = '수학';
    else if (norm.includes('영어')) area = '영어';
    else if (norm.includes('한국사')) area = '한국사';
    else if (norm.includes('사회') || norm.includes('역사') || norm.includes('지리') || norm.includes('윤리') || norm.includes('정치') || norm.includes('경제')) area = '사회';
    else if (norm.includes('과학') || norm.includes('물리') || norm.includes('화학') || norm.includes('생명') || norm.includes('지구')) area = '과학';
    else if (norm.includes('체육') || norm.includes('스포츠') || norm.includes('운동')) area = '체육';
    else if (norm.includes('음악') || norm.includes('미술') || norm.includes('연극') || norm.includes('예술')) area = '예술';
    else if (norm.includes('기술') || norm.includes('가정') || norm.includes('정보') || norm.includes('인공지능') || norm.includes('컴퓨터') || norm.includes('로봇')) area = '기술·가정/정보';
    else if (norm.includes('한문') || norm.includes('일본어') || norm.includes('중국어') || norm.includes('독일어') || norm.includes('프랑스어') || norm.includes('스페인어') || norm.includes('외국어')) area = '제2외국어/한문';
    else if (norm.includes('철학') || norm.includes('심리') || norm.includes('교육') || norm.includes('종교') || norm.includes('보건') || norm.includes('교양') || norm.includes('환경')) area = '교양';
    else area = '기타';
  }

  if (area === '국어') acc.korean += cred;
  else if (area === '수학') { acc.math += cred; chosenMath.add(norm); }
  else if (area === '영어') acc.english += cred;
  else if (norm.startsWith('한국사') || area === '한국사') acc.history += cred;
  else if (area === '사회') acc.social += cred;
  else if (area === '과학') { acc.science += cred; chosenSciences.add(norm); }
  else if (area === '체육') acc.pe += cred;
  else if (area === '예술') acc.art += cred;
  else if (area.includes('기술') || area.includes('정보')) {
    acc.techInfo += cred;
    if (norm.includes('정보') || norm.includes('프로그래밍') || norm.includes('인공지능') || norm.includes('소프트웨어')) {
      onHasInfo();
    }
  } else if (area.includes('제2외국어') || area === '교양') {
    acc.secondLangEtc += cred;
    if (isSpecialPurpose) acc.specialMajorCredits += cred;
  }
}

function allocateSubjectCredit(
  name: string,
  cred: number,
  acc: {
    korean: number;
    math: number;
    english: number;
    history: number;
    social: number;
    science: number;
    pe: number;
    art: number;
    techInfo: number;
    secondLangEtc: number;
    specialMajorCredits: number;
  },
  chosenMath: Set<string>,
  chosenSciences: Set<string>,
  onHasInfo: () => void,
  isSpecialPurpose: boolean
) {
  if (isExchangeSubject(name)) {
    const parts = parseExchangeSubject(name);
    const splitCred = cred / Math.max(1, parts.length);
    for (const part of parts) {
      allocateSingleSubject(part, splitCred, acc, chosenMath, chosenSciences, onHasInfo, isSpecialPurpose);
    }
  } else {
    allocateSingleSubject(name, cred, acc, chosenMath, chosenSciences, onHasInfo, isSpecialPurpose);
  }
}

export const GraduationRequirementsValidator: React.FC<Props> = ({
  school,
  consultantChoices,
  planGrade
}) => {
  const isScienceFocused = school.typeBadge.includes('과학') || 
                           school.tags.some(t => t.includes('과학중점') || t.includes('과중'));
  const isAutonomousPublic = school.typeBadge.includes('자율');
  const isSpecialPurpose = school.typeBadge.includes('특목') || 
                           school.tags.some(t => t.includes('특목') || t.includes('외고'));

  // Calculate accumulated credits based on 1st grade actual/default + 2nd/3rd grade selected choices
  const creditSummary = useMemo<CreditSummary>(() => {
    const acc = {
      korean: 0,
      math: 0,
      english: 0,
      history: 0,
      social: 0,
      science: 0,
      pe: 0,
      art: 0,
      techInfo: 0,
      secondLangEtc: 0,
      specialMajorCredits: 0
    };

    const chosenSciences = new Set<string>();
    const chosenMath = new Set<string>();
    let hasInfo = false;
    const onHasInfo = () => { hasInfo = true; };

    // 1. Grade 1 Mandatory: dynamically evaluate if school.mandatory[1] exists, else use standard 2022 revised curriculum defaults
    const grade1Mandatory = school.mandatory?.[1];
    if (Array.isArray(grade1Mandatory) && grade1Mandatory.length > 0) {
      grade1Mandatory.forEach((m: any) => {
        const semesterCount = m.semesters?.length || 1;
        const totalCred = (m.credit != null ? m.credit : 3) * (isExchangeSubject(m.name) && semesterCount > 1 ? semesterCount : 1);
        allocateSubjectCredit(m.name, totalCred, acc, chosenMath, chosenSciences, onHasInfo, isSpecialPurpose);
      });
    } else {
      // Standard Grade 1 defaults (공통국어 8, 공통수학 8, 공통영어 8, 한국사 6, 통합사회 8, 통합과학 8+2=10, 체육 4, 예술 3, 기가/정보 3)
      acc.korean += 8;
      acc.math += 8;
      acc.english += 8;
      acc.history += 6;
      acc.social += 8;
      acc.science += 10;
      acc.pe += 4;
      acc.art += 3;
      acc.techInfo += 3;
    }

    // 2. Grade 2 & 3 Mandatory
    [2, 3].forEach(g => {
      const mandList = school.mandatory?.[g] || [];
      mandList.forEach((m: any) => {
        const semesterCount = m.semesters?.length || 1;
        const totalCred = (m.credit != null ? m.credit : 3) * semesterCount;
        allocateSubjectCredit(m.name, totalCred, acc, chosenMath, chosenSciences, onHasInfo, isSpecialPurpose);
      });
    });

    // 3. Selected choices from consultantChoices in Grade 2 & 3
    Object.entries(consultantChoices).forEach(([key, isChecked]) => {
      if (!isChecked) return;
      // key format: "grade-groupId-subjectName-semester"
      const parts = key.split('-');
      if (parts.length < 4) return;
      const g = parseInt(parts[0], 10);
      const groupId = parts[1];
      const subjectName = parts.slice(2, parts.length - 1).join('-');

      // Find group to determine credits
      const grp = (school.groups || []).find(gr => gr.id === groupId && gr.grade === g);
      const subjectCred = grp?.credits || 3;

      allocateSubjectCredit(subjectName, subjectCred, acc, chosenMath, chosenSciences, onHasInfo, isSpecialPurpose);
    });

    // Science branches
    const allSciences = Array.from(chosenSciences).join(' ');
    const hasPhysics = allSciences.includes('물리') || allSciences.includes('역학');
    const hasChemistry = allSciences.includes('화학') || allSciences.includes('물질');
    const hasBiology = allSciences.includes('생명') || allSciences.includes('세포') || allSciences.includes('유전');
    const hasEarthScience = allSciences.includes('지구') || allSciences.includes('우주') || allSciences.includes('행성');
    
    let branches = 0;
    if (hasPhysics) branches++;
    if (hasChemistry) branches++;
    if (hasBiology) branches++;
    if (hasEarthScience) branches++;

    const total = acc.korean + acc.math + acc.english + acc.history + acc.social + acc.science + acc.pe + acc.art + acc.techInfo + acc.secondLangEtc;

    return {
      korean: acc.korean,
      math: acc.math,
      english: acc.english,
      history: acc.history,
      social: acc.social,
      science: acc.science,
      pe: acc.pe,
      art: acc.art,
      techInfo: acc.techInfo,
      secondLangEtc: acc.secondLangEtc,
      totalElectiveAndMandatory: total,
      hasPhysics,
      hasChemistry,
      hasBiology,
      hasEarthScience,
      scienceBranchesCount: branches,
      mathSubjectsCount: chosenMath.size,
      hasInfoSubject: hasInfo,
      specialMajorCredits: acc.specialMajorCredits
    };
  }, [school, consultantChoices, isSpecialPurpose]);

  // Basic curriculum limit: Korean + Math + English <= 81 credits (기초교과 국·영·수 81학점 상한)
  const basicSubjectTotal = creditSummary.korean + creditSummary.math + creditSummary.english;
  const isBasicWithinLimit = basicSubjectTotal <= 81;

  // Science focused criteria: Math + Science >= 65 credits (~40%)
  const mathScienceTotal = creditSummary.math + creditSummary.science;
  const mathScienceTarget = 65;
  const isScienceTargetMet = mathScienceTotal >= mathScienceTarget;

  // General high school criteria specified by user:
  // - 사회: 한국사 포함 14학점 이상
  // - 과학: 10학점 이상
  // - 체육: 10학점 이상
  // - 예술: 10학점 이상
  // - 기술·가정/정보/제2외국어/한문/교양: 10학점 이상
  const socialTotalWithHistory = creditSummary.social + creditSummary.history;
  const isSocialRequirementMet = socialTotalWithHistory >= 14;
  const isScienceRequirementMet = creditSummary.science >= 10;
  const isPeRequirementMet = creditSummary.pe >= 10;
  const isArtRequirementMet = creditSummary.art >= 10;
  const lifeLiberalTotal = creditSummary.techInfo + creditSummary.secondLangEtc;
  const isLifeLiberalRequirementMet = lifeLiberalTotal >= 10;

  // Foreign language specialized criteria
  const isForeignLangMet = creditSummary.specialMajorCredits >= 68;

  // General high school overall compliance
  const isGeneralHighMet = 
    isBasicWithinLimit && 
    isSocialRequirementMet && 
    isScienceRequirementMet && 
    isPeRequirementMet && 
    isArtRequirementMet && 
    isLifeLiberalRequirementMet;

  const isOverallCompliant = isScienceFocused 
    ? (isBasicWithinLimit && isScienceTargetMet)
    : isSpecialPurpose
    ? (isBasicWithinLimit && isForeignLangMet)
    : isGeneralHighMet;

  return (
    <div className="bg-white rounded-2xl border-2 border-slate-200 shadow-sm overflow-hidden mb-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-900 text-white px-5 py-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-white/10 text-blue-300">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-base font-black text-white tracking-tight">
                2022 개정 이수 학점 규정 자동 판별기
              </span>
              <span className={`text-[11px] font-extrabold px-2 py-0.5 rounded-full ${
                isScienceFocused 
                  ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-400/30' 
                  : isAutonomousPublic
                  ? 'bg-amber-500/20 text-amber-200 border border-amber-400/30'
                  : isSpecialPurpose
                  ? 'bg-purple-500/20 text-purple-200 border border-purple-400/30'
                  : 'bg-blue-500/20 text-blue-200 border border-blue-400/30'
              }`}>
                {school.shortName} [{school.typeBadge} 모드]
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              학생의 과목 선택 상태에 따라 교육부 고교학점제 규정 및 {school.typeBadge} 특화 이수 요건을 실시간 자동 검증합니다.
            </p>
          </div>
        </div>

        {/* Global Status Pill */}
        <div className="flex items-center gap-2">
          {isOverallCompliant ? (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-black">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>규정 충족 양호</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-black animate-pulse">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>집중 점검 필요</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Validation Cards Grid */}
      <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-slate-50/50">
        
        {/* Card 1: 기초교과(국·영·수) 총 이수 상한제 (모든 고교 공통) */}
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-1 mb-2">
              <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                기초교과(국·영·수) 총량 상한제
              </span>
              <span className={`text-[10px] font-black px-1.5 py-0.5 rounded ${
                isBasicWithinLimit ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
              }`}>
                {isBasicWithinLimit ? '정상 준수' : '81학점 초과 경고'}
              </span>
            </div>
            
            <div className="flex items-baseline gap-2 mb-2">
              <span className={`text-2xl font-black ${isBasicWithinLimit ? 'text-slate-800' : 'text-red-600'}`}>
                {basicSubjectTotal}
              </span>
              <span className="text-xs text-slate-400 font-semibold">/ 최대 81학점 (50% 상한)</span>
            </div>

            {/* Progress bar */}
            <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden mb-2">
              <div 
                className={`h-full transition-all duration-300 ${
                  isBasicWithinLimit ? 'bg-blue-600' : 'bg-red-500'
                }`}
                style={{ width: `${Math.min(100, (basicSubjectTotal / 81) * 100)}%` }}
              />
            </div>
          </div>

          <p className="text-[11px] text-slate-500 leading-relaxed border-t border-slate-100 pt-2 mt-2">
            국어({creditSummary.korean}학점), 수학({creditSummary.math}학점), 영어({creditSummary.english}학점) 합산({basicSubjectTotal}학점)이 교과 이수 총합 81학점을 넘지 않아야 합니다.
          </p>
        </div>

        {/* Card 2: 학교 유형별 특화 판정 (과학중점 or 특목 or 일반고) */}
        {isScienceFocused ? (
          <div className="p-4 rounded-xl bg-cyan-50/60 border border-cyan-200 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-1 mb-2">
                <span className="text-xs font-black text-cyan-950 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-cyan-600" />
                  과학중점 특화: 수학·과학 40% 이상
                </span>
                <span className={`text-[10px] font-black px-1.5 py-0.5 rounded ${
                  isScienceTargetMet ? 'bg-cyan-600 text-white' : 'bg-cyan-200 text-cyan-900'
                }`}>
                  {isScienceTargetMet ? '과중 기준 달성' : '이수 보완 권장'}
                </span>
              </div>

              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-2xl font-black text-cyan-950">
                  {mathScienceTotal}
                </span>
                <span className="text-xs text-cyan-700 font-semibold">/ 목표 65학점 (약 40%)</span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 rounded-full bg-cyan-100 overflow-hidden mb-2">
                <div 
                  className="h-full bg-cyan-600 transition-all duration-300"
                  style={{ width: `${Math.min(100, (mathScienceTotal / mathScienceTarget) * 100)}%` }}
                />
              </div>
            </div>

            <div className="border-t border-cyan-100 pt-2 mt-2 text-[11px] text-cyan-900 space-y-1">
              <div className="flex items-center justify-between">
                <span>과학 4대 영역 균형 이수:</span>
                <span className="font-bold">
                  {creditSummary.scienceBranchesCount}/4개 영역 (물·화·생·지)
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>정보/SW 필수 과목:</span>
                <span className={`font-bold ${creditSummary.hasInfoSubject ? 'text-emerald-700' : 'text-slate-500'}`}>
                  {creditSummary.hasInfoSubject ? '개설/선택 완료' : '미선택 상태'}
                </span>
              </div>
            </div>
          </div>
        ) : isSpecialPurpose ? (
          <div className="p-4 rounded-xl bg-purple-50/60 border border-purple-200 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-1 mb-2">
                <span className="text-xs font-black text-purple-950 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                  특목고 특화: 전공 전문교과 이수
                </span>
                <span className={`text-[10px] font-black px-1.5 py-0.5 rounded ${
                  isForeignLangMet ? 'bg-purple-600 text-white' : 'bg-purple-200 text-purple-900'
                }`}>
                  {isForeignLangMet ? '68학점 충족' : '전문교과 누적 중'}
                </span>
              </div>

              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-2xl font-black text-purple-950">
                  {creditSummary.specialMajorCredits}
                </span>
                <span className="text-xs text-purple-700 font-semibold">/ 기준 68학점</span>
              </div>

              <div className="w-full h-2 rounded-full bg-purple-100 overflow-hidden mb-2">
                <div 
                  className="h-full bg-purple-600 transition-all duration-300"
                  style={{ width: `${Math.min(100, (creditSummary.specialMajorCredits / 68) * 100)}%` }}
                />
              </div>
            </div>

            <p className="text-[11px] text-purple-900 border-t border-purple-100 pt-2 mt-2 leading-relaxed">
              외국어·국제 계열 전공 심화 및 전문교과 68학점 이상 이수 기준을 모니터링합니다.
            </p>
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-1 mb-2">
                <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                  <Compass className="w-3.5 h-3.5 text-indigo-600" />
                  탐구(사회·과학) 균형 이수제
                </span>
                <span className={`text-[10px] font-black px-1.5 py-0.5 rounded ${
                  isSocialRequirementMet && isScienceRequirementMet
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {isSocialRequirementMet && isScienceRequirementMet ? '기준 충족' : '이수 보완'}
                </span>
              </div>

              <div className="space-y-2.5 mb-2">
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-slate-700">
                      사회(한국사 포함): <span className="font-bold text-slate-900">{socialTotalWithHistory}학점</span>
                    </span>
                    <span className={`text-[11px] font-bold ${isSocialRequirementMet ? 'text-emerald-600' : 'text-amber-600'}`}>
                      기준 14학점 {isSocialRequirementMet ? '(충족)' : `(${14 - socialTotalWithHistory}학점 부족)`}
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-300 ${isSocialRequirementMet ? 'bg-emerald-500' : 'bg-amber-400'}`}
                      style={{ width: `${Math.min(100, (socialTotalWithHistory / 14) * 100)}%` }}
                    />
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    한국사 {creditSummary.history}학점 + 사회 {creditSummary.social}학점
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-slate-700">
                      과학(실험포함): <span className="font-bold text-slate-900">{creditSummary.science}학점</span>
                    </span>
                    <span className={`text-[11px] font-bold ${isScienceRequirementMet ? 'text-emerald-600' : 'text-amber-600'}`}>
                      기준 10학점 {isScienceRequirementMet ? '(충족)' : `(${10 - creditSummary.science}학점 부족)`}
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-300 ${isScienceRequirementMet ? 'bg-emerald-500' : 'bg-amber-400'}`}
                      style={{ width: `${Math.min(100, (creditSummary.science / 10) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 border-t border-slate-100 pt-2 mt-2 leading-relaxed">
              일반고 규정: 사회(한국사 포함) 14학점, 과학 10학점 이상을 반드시 이수해야 합니다.
            </p>
          </div>
        )}

        {/* Card 3: 체육·예술 & 생활·교양 영역 필수 충족 현황 */}
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-1 mb-2">
              <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-emerald-600" />
                체육·예술 & 생활·교양 영역
              </span>
              <span className={`text-[10px] font-black px-1.5 py-0.5 rounded ${
                isPeRequirementMet && isArtRequirementMet && isLifeLiberalRequirementMet
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-amber-100 text-amber-800'
              }`}>
                {isPeRequirementMet && isArtRequirementMet && isLifeLiberalRequirementMet ? '전체 충족' : '점검 필요'}
              </span>
            </div>

            <div className="space-y-2 pt-1 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span>체육 교과</span>
                    <span className={isPeRequirementMet ? 'text-emerald-600 font-bold' : 'text-amber-600 font-bold'}>
                      {isPeRequirementMet ? '충족' : '부족'}
                    </span>
                  </div>
                  <div className="font-black text-slate-800 text-sm mt-0.5">
                    {creditSummary.pe} <span className="text-[10px] font-normal text-slate-400">/ 기준 10학점</span>
                  </div>
                </div>

                <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span>예술 교과</span>
                    <span className={isArtRequirementMet ? 'text-emerald-600 font-bold' : 'text-amber-600 font-bold'}>
                      {isArtRequirementMet ? '충족' : '부족'}
                    </span>
                  </div>
                  <div className="font-black text-slate-800 text-sm mt-0.5">
                    {creditSummary.art} <span className="text-[10px] font-normal text-slate-400">/ 기준 10학점</span>
                  </div>
                </div>
              </div>

              {/* 생활·교양: 기술·가정/정보/제2외국어/한문/교양 10학점 */}
              <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                <div className="flex items-center justify-between text-[10px] text-slate-500 font-bold mb-0.5">
                  <span>기술·가정/정보/제2외국어/한문/교양</span>
                  <span className={isLifeLiberalRequirementMet ? 'text-emerald-600 font-bold' : 'text-amber-600 font-bold'}>
                    {isLifeLiberalRequirementMet ? '10학점 충족' : `${10 - lifeLiberalTotal}학점 부족`}
                  </span>
                </div>
                <div className="flex items-baseline justify-between">
                  <div className="font-black text-slate-800 text-sm">
                    {lifeLiberalTotal} <span className="text-[10px] font-normal text-slate-400">/ 기준 10학점</span>
                  </div>
                  <div className="text-[10px] text-slate-400">
                    기가·정보 {creditSummary.techInfo} + 외·한·교양 {creditSummary.secondLangEtc}
                  </div>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden mt-1.5">
                  <div 
                    className={`h-full transition-all duration-300 ${isLifeLiberalRequirementMet ? 'bg-emerald-500' : 'bg-amber-400'}`}
                    style={{ width: `${Math.min(100, (lifeLiberalTotal / 10) * 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-slate-500 border-t border-slate-100 pt-2 mt-2 leading-relaxed">
            일반고 규정: 체육 10학점, 예술 10학점, 기술·가정/정보/제2외국어/한문/교양 10학점 이상을 충족해야 합니다.
          </p>
        </div>

      </div>
    </div>
  );
};
