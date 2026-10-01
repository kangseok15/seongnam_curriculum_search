import React, { useState, useMemo } from 'react';
import { Major, normalizeSubjectName, SUBJECT_AREAS } from '../data/curriculumData';
import { SchoolCurriculum } from '../data/schoolsData';
import { 
  X, 
  ArrowRightLeft, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  Flame, 
  BookOpen, 
  Compass, 
  Check, 
  ExternalLink,
  ChevronRight,
  School,
  Layers,
  Award
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  schools: SchoolCurriculum[];
  currentSchool: SchoolCurriculum;
  selectedMajor: Major | null;
  onSelectSchool: (schoolId: string) => void;
}

export const SchoolCompareModal: React.FC<Props> = ({
  isOpen,
  onClose,
  schools,
  currentSchool,
  selectedMajor,
  onSelectSchool
}) => {
  const [schoolAId, setSchoolAId] = useState<string>(currentSchool.id);
  // Default school B to a popular comparative school (e.g. if A is naksaeng -> seohyeon, else naksaeng)
  const [schoolBId, setSchoolBId] = useState<string>(() => {
    if (currentSchool.id === 'naksaeng') return 'seohyeon';
    if (currentSchool.id === 'bopyeong') return 'bundang';
    if (currentSchool.id === 'seongnam') return 'pangyo';
    return schools.find(s => s.id !== currentSchool.id && (s.typeBadge.includes('과학') || s.typeBadge.includes('자율')))?.id || schools[1]?.id || 'seohyeon';
  });

  const schoolA = useMemo(() => schools.find(s => s.id === schoolAId) || currentSchool, [schools, schoolAId, currentSchool]);
  const schoolB = useMemo(() => schools.find(s => s.id === schoolBId) || schools[1] || currentSchool, [schools, schoolBId, currentSchool]);

  if (!isOpen) return null;

  // Analysis helpers for a school
  const analyzeSchool = (sch: SchoolCurriculum) => {
    // 1. All subjects offered in grade 2 and 3
    const allSubjects = new Set<string>();
    const mandatorySubjects: string[] = [];

    [2, 3].forEach(g => {
      (sch.mandatory[g] || []).forEach(m => {
        allSubjects.add(normalizeSubjectName(m.name));
        mandatorySubjects.push(m.name);
      });
    });

    (sch.groups || []).forEach(grp => {
      grp.subjects.forEach(sub => {
        allSubjects.add(normalizeSubjectName(sub.name));
      });
    });

    // 2. Recommended subjects match
    const recommended = selectedMajor?.recommendedSubjects || [];
    const matchedRecommended: string[] = [];
    const missingRecommended: string[] = [];

    recommended.forEach(rec => {
      const normRec = normalizeSubjectName(rec);
      const isOffered = Array.from(allSubjects).some(offered => 
        offered === normRec || offered.includes(normRec) || normRec.includes(offered)
      );
      if (isOffered) matchedRecommended.push(rec);
      else missingRecommended.push(rec);
    });

    // 3. Advanced STEM subjects
    const stemKeywords = ['미적분Ⅱ', '기하', '인공지능', '프로그래밍', '고급', '실험', '데이터', '경제 수학'];
    const advancedStem = Array.from(allSubjects).filter(sub => 
      stemKeywords.some(kw => sub.includes(normalizeSubjectName(kw)))
    );

    // 4. Group counts
    const grp2 = (sch.groups || []).filter(g => g.grade === 2);
    const grp3 = (sch.groups || []).filter(g => g.grade === 3);

    return {
      allSubjectsCount: allSubjects.size,
      matchedRecommended,
      missingRecommended,
      matchRate: recommended.length > 0 ? Math.round((matchedRecommended.length / recommended.length) * 100) : 100,
      advancedStem,
      grp2Count: grp2.length,
      grp3Count: grp3.length,
      mandatoryCount: mandatorySubjects.length
    };
  };

  const statsA = analyzeSchool(schoolA);
  const statsB = analyzeSchool(schoolB);

  const getBadgeStyle = (badge: string) => {
    if (badge.includes('과학')) return 'bg-cyan-100 text-cyan-900 border-cyan-300';
    if (badge.includes('자율')) return 'bg-amber-100 text-amber-900 border-amber-300';
    if (badge.includes('특목')) return 'bg-purple-100 text-purple-900 border-purple-300';
    return 'bg-blue-100 text-blue-900 border-blue-300';
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn">
      <div 
        className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 sm:px-8 sm:py-6 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-blue-600 text-white shadow-md">
              <ArrowRightLeft className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-black tracking-tight text-white">
                  성남지역 고교 교육과정 1:1 비교
                </h3>
                {selectedMajor && (
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
                    목표: {selectedMajor.name} 기준
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                두 학교의 편제표 구성, 학과 권장과목 개설률, 2·3학년 선택 자유도를 나란히 비교합니다.
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-8 overflow-y-auto space-y-6 custom-scrollbar bg-slate-50/40">
          
          {/* School Selectors Header Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* School A Selector Card */}
            <div className="p-4 rounded-2xl bg-white border-2 border-blue-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">기준 학교 [A]</span>
                <span className={`text-[11px] font-black px-2 py-0.5 rounded-full border ${getBadgeStyle(schoolA.typeBadge)}`}>
                  {schoolA.typeBadge}
                </span>
              </div>
              <div>
                <select 
                  value={schoolAId}
                  onChange={e => setSchoolAId(e.target.value)}
                  className="w-full text-base font-black text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
                >
                  {schools.map(s => (
                    <option key={`a-${s.id}`} value={s.id}>
                      {s.name} ({s.district} · {s.typeBadge})
                    </option>
                  ))}
                </select>
                <p className="text-xs text-slate-500 mt-1.5 line-clamp-1">{schoolA.description}</p>
              </div>
            </div>

            {/* School B Selector Card */}
            <div className="p-4 rounded-2xl bg-white border-2 border-indigo-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider">비교 학교 [B]</span>
                <span className={`text-[11px] font-black px-2 py-0.5 rounded-full border ${getBadgeStyle(schoolB.typeBadge)}`}>
                  {schoolB.typeBadge}
                </span>
              </div>
              <div>
                <select 
                  value={schoolBId}
                  onChange={e => setSchoolBId(e.target.value)}
                  className="w-full text-base font-black text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none cursor-pointer"
                >
                  {schools.map(s => (
                    <option key={`b-${s.id}`} value={s.id}>
                      {s.name} ({s.district} · {s.typeBadge})
                    </option>
                  ))}
                </select>
                <p className="text-xs text-slate-500 mt-1.5 line-clamp-1">{schoolB.description}</p>
              </div>
            </div>
          </div>

          {/* Section 1: Major Recommended Subjects Match Rate */}
          {selectedMajor && (
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-500" />
                  <h4 className="font-extrabold text-slate-900 text-sm sm:text-base">
                    [{selectedMajor.name}] 권장 과목 개설 현황 비교
                  </h4>
                </div>
                <span className="text-xs text-slate-400 font-semibold">
                  총 {selectedMajor.recommendedSubjects.length}개 권장 과목 기준
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* School A Recommended */}
                <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100 space-y-3">
                  <div className="flex items-baseline justify-between">
                    <span className="font-black text-blue-950 text-sm">{schoolA.shortName}</span>
                    <span className="text-xl font-black text-blue-600">
                      {statsA.matchedRecommended.length} / {selectedMajor.recommendedSubjects.length}개 ({statsA.matchRate}%)
                    </span>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="w-full h-2 rounded-full bg-blue-100 overflow-hidden">
                    <div className="h-full bg-blue-600 transition-all duration-300" style={{ width: `${statsA.matchRate}%` }} />
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <div className="text-[11px] font-bold text-slate-500">개설된 권장 과목:</div>
                    <div className="flex flex-wrap gap-1">
                      {statsA.matchedRecommended.map(m => (
                        <span key={`a-match-${m}`} className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-white border border-blue-200 text-blue-800 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-blue-600 shrink-0" />
                          {m}
                        </span>
                      ))}
                    </div>

                    {statsA.missingRecommended.length > 0 && (
                      <>
                        <div className="text-[11px] font-bold text-slate-400 pt-1">미개설 과목:</div>
                        <div className="flex flex-wrap gap-1">
                          {statsA.missingRecommended.map(m => (
                            <span key={`a-miss-${m}`} className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-400 line-through">
                              {m}
                            </span>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* School B Recommended */}
                <div className="p-4 rounded-xl bg-indigo-50/50 border border-indigo-100 space-y-3">
                  <div className="flex items-baseline justify-between">
                    <span className="font-black text-indigo-950 text-sm">{schoolB.shortName}</span>
                    <span className="text-xl font-black text-indigo-600">
                      {statsB.matchedRecommended.length} / {selectedMajor.recommendedSubjects.length}개 ({statsB.matchRate}%)
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-2 rounded-full bg-indigo-100 overflow-hidden">
                    <div className="h-full bg-indigo-600 transition-all duration-300" style={{ width: `${statsB.matchRate}%` }} />
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <div className="text-[11px] font-bold text-slate-500">개설된 권장 과목:</div>
                    <div className="flex flex-wrap gap-1">
                      {statsB.matchedRecommended.map(m => (
                        <span key={`b-match-${m}`} className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-white border border-indigo-200 text-indigo-800 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-indigo-600 shrink-0" />
                          {m}
                        </span>
                      ))}
                    </div>

                    {statsB.missingRecommended.length > 0 && (
                      <>
                        <div className="text-[11px] font-bold text-slate-400 pt-1">미개설 과목:</div>
                        <div className="flex flex-wrap gap-1">
                          {statsB.missingRecommended.map(m => (
                            <span key={`b-miss-${m}`} className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-400 line-through">
                              {m}
                            </span>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Section 2: Structure & Elective Freedom Comparison */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-blue-600" />
              <h4 className="font-extrabold text-slate-900 text-sm sm:text-base">
                교육과정 선택군 구조 및 학생 선택권 비교
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* School A Structure */}
              <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-3">
                <div className="font-black text-slate-800 text-sm pb-2 border-b border-slate-100 flex items-center justify-between">
                  <span>{schoolA.name}</span>
                  <span className="text-xs text-slate-500 font-semibold">{schoolA.year}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <span className="text-slate-400 block text-[10px]">2학년 선택군</span>
                    <span className="font-extrabold text-slate-800 text-sm mt-0.5 block">{statsA.grp2Count}개 그룹 운영</span>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <span className="text-slate-400 block text-[10px]">3학년 선택군</span>
                    <span className="font-extrabold text-slate-800 text-sm mt-0.5 block">{statsA.grp3Count}개 그룹 운영</span>
                  </div>
                </div>

                <div className="text-xs space-y-1 pt-1">
                  <div className="flex items-center justify-between text-slate-600">
                    <span>전체 개설 과목 수:</span>
                    <span className="font-bold text-slate-800">{statsA.allSubjectsCount}개 과목</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600">
                    <span>수학·과학 심화 과목군:</span>
                    <span className="font-bold text-cyan-700">{statsA.advancedStem.length}개 과목 개설</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onSelectSchool(schoolA.id);
                    onClose();
                  }}
                  className="w-full mt-2 py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{schoolA.shortName} 교육과정으로 적용하기</span>
                </button>
              </div>

              {/* School B Structure */}
              <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-3">
                <div className="font-black text-slate-800 text-sm pb-2 border-b border-slate-100 flex items-center justify-between">
                  <span>{schoolB.name}</span>
                  <span className="text-xs text-slate-500 font-semibold">{schoolB.year}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <span className="text-slate-400 block text-[10px]">2학년 선택군</span>
                    <span className="font-extrabold text-slate-800 text-sm mt-0.5 block">{statsB.grp2Count}개 그룹 운영</span>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <span className="text-slate-400 block text-[10px]">3학년 선택군</span>
                    <span className="font-extrabold text-slate-800 text-sm mt-0.5 block">{statsB.grp3Count}개 그룹 운영</span>
                  </div>
                </div>

                <div className="text-xs space-y-1 pt-1">
                  <div className="flex items-center justify-between text-slate-600">
                    <span>전체 개설 과목 수:</span>
                    <span className="font-bold text-slate-800">{statsB.allSubjectsCount}개 과목</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600">
                    <span>수학·과학 심화 과목군:</span>
                    <span className="font-bold text-indigo-700">{statsB.advancedStem.length}개 과목 개설</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onSelectSchool(schoolB.id);
                    onClose();
                  }}
                  className="w-full mt-2 py-2.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{schoolB.shortName} 교육과정으로 적용하기</span>
                </button>
              </div>
            </div>
          </div>

          {/* Section 3: STEM & Advanced Electives Highlight */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              <h4 className="font-extrabold text-slate-900 text-sm sm:text-base">
                특화 및 심화(이공계·AI·전문) 과목 개설 대조
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-black text-slate-800 block mb-2">{schoolA.shortName} 특화 과목 ({statsA.advancedStem.length}개):</span>
                <div className="flex flex-wrap gap-1">
                  {statsA.advancedStem.map((sub, i) => (
                    <span key={`a-stem-${i}`} className="px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700 font-semibold">
                      {sub}
                    </span>
                  ))}
                  {statsA.advancedStem.length === 0 && <span className="text-slate-400">심화 과목 없음</span>}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-black text-slate-800 block mb-2">{schoolB.shortName} 특화 과목 ({statsB.advancedStem.length}개):</span>
                <div className="flex flex-wrap gap-1">
                  {statsB.advancedStem.map((sub, i) => (
                    <span key={`b-stem-${i}`} className="px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700 font-semibold">
                      {sub}
                    </span>
                  ))}
                  {statsB.advancedStem.length === 0 && <span className="text-slate-400">심화 과목 없음</span>}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 sm:px-8 bg-slate-100 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-medium">
            2027학년도 성남 관내 고교 공식 교육과정 편제표 기준
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-extrabold text-xs transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
