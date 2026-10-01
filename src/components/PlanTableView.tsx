import React, { Fragment, useMemo } from 'react';
import { 
  Major, 
  normalizeSubjectName, 
  SUBJECT_AREAS, 
  SUBJECT_TYPES, 
  SelectionType, 
  SubjectEvaluationInfo,
  isExchangeSubject,
  parseExchangeSubject,
  getSubjectAreas,
  formatAreasDisplay
} from '../data/curriculumData';
import { SchoolCurriculum, getGrade1SubjectCredit, getMandatorySubjectCredit } from '../data/schoolsData';
import { Info, Check, CheckCircle2 } from 'lucide-react';

interface Props {
  grade: number;
  school: SchoolCurriculum;
  groups: any[]; // formatted plan groups with groupedSubjects
  selectedMajor: Major;
  getCellCheckState: (grade: number, groupId: string, subjectName: string, semester: number, isAiRecommended: boolean) => 'ai' | 'consultant' | 'off';
  handleToggleCell: (grade: number, groupId: string, subjectName: string, semester: number, isAiRecommended: boolean) => void;
  handleOpenSubjectModal: (subjectName: string) => void;
  setUnivDesignationModal: (item: any) => void;
  renderAreaName: (areaName: string, isHeader?: boolean) => React.ReactNode;
  getSubjectTypeBadgeStyle: (type: string) => { bg: string; text: string; border: string; label: string };
  getSubjectEval: (name: string, area?: string, type?: SelectionType) => SubjectEvaluationInfo;
  getUnivDesignationsForSubject: (subjectName: string, majorName?: string) => any[];
  isSpread?: boolean;
}

export const PlanTableView: React.FC<Props> = ({
  grade,
  school,
  groups,
  selectedMajor,
  getCellCheckState,
  handleToggleCell,
  handleOpenSubjectModal,
  setUnivDesignationModal,
  renderAreaName,
  getSubjectTypeBadgeStyle,
  getSubjectEval,
  getUnivDesignationsForSubject,
  isSpread = false
}) => {
  const mandatoryList = useMemo(() => {
    const raw = school.mandatory[grade] || [];
    const sem1 = raw.filter((s: any) => s && s.semesters?.includes(1) && !s.semesters?.includes(2));
    const both = raw.filter((s: any) => s && s.semesters?.includes(1) && s.semesters?.includes(2));
    const sem2 = raw.filter((s: any) => s && !s.semesters?.includes(1) && s.semesters?.includes(2));
    const others = raw.filter((s: any) => s && !s.semesters?.includes(1) && !s.semesters?.includes(2));
    return [...sem1, ...both, ...sem2, ...others];
  }, [school.mandatory, grade]);

  return (
    <div style={{ width: '100%', overflow: 'visible', position: 'relative' }}>
      <table style={{ 
        width: '100%', 
        fontSize: isSpread ? '0.74rem' : '0.82rem', 
        textAlign: 'center', 
        borderCollapse: 'collapse', 
        border: '1.5px solid #cbd5e1', 
        tableLayout: 'fixed' 
      }}>
        <thead style={{ backgroundColor: '#f1f5f9', color: '#0f172a', fontWeight: '800', borderBottom: '2px solid #cbd5e1' }}>
          <tr>
            <th style={{ padding: isSpread ? '0.5rem 0.2rem' : '0.75rem 0.4rem', borderRight: '1px solid #cbd5e1', width: isSpread ? '4.6rem' : '5.2rem', textAlign: 'center', backgroundColor: '#f1f5f9', fontSize: isSpread ? '0.72rem' : '0.8rem', letterSpacing: '-0.01em' }}>
              선택 방법
            </th>
            <th style={{ padding: isSpread ? '0.5rem 0.2rem' : '0.75rem 0.4rem', borderRight: '1px solid #cbd5e1', width: isSpread ? '4.8rem' : '5.6rem', textAlign: 'center', backgroundColor: '#f1f5f9', fontSize: isSpread ? '0.72rem' : '0.8rem', letterSpacing: '-0.01em' }}>
              교과군
            </th>
            <th style={{ padding: isSpread ? '0.5rem 0.4rem' : '0.75rem 0.8rem', borderRight: '1px solid #cbd5e1', textAlign: 'left', backgroundColor: '#f1f5f9', fontSize: isSpread ? '0.72rem' : '0.8rem', letterSpacing: '-0.01em' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '0.35rem' }}>
                <span>과목명(학점수)</span>
                <span style={{ 
                  fontSize: isSpread ? '0.62rem' : '0.68rem', 
                  fontWeight: '700', 
                  backgroundColor: '#eff6ff', 
                  color: '#1d4ed8', 
                  padding: '0.05rem 0.3rem', 
                  borderRadius: '4px',
                  border: '1px solid #bfdbfe'
                }}>
                  클릭: 상세
                </span>
              </div>
            </th>
            <th style={{ padding: isSpread ? '0.5rem 0.2rem' : '0.75rem 0.4rem', borderRight: '1px solid #cbd5e1', width: isSpread ? '4.8rem' : '5.6rem', textAlign: 'center', backgroundColor: '#f1f5f9', fontSize: isSpread ? '0.72rem' : '0.8rem', letterSpacing: '-0.01em' }}>
              구분
            </th>
            <th style={{ padding: isSpread ? '0.5rem 0.2rem' : '0.75rem 0.4rem', borderRight: '1px solid #cbd5e1', width: isSpread ? '3.0rem' : '3.6rem', textAlign: 'center', backgroundColor: '#f1f5f9', fontSize: isSpread ? '0.72rem' : '0.8rem', letterSpacing: '-0.01em' }}>
              1학기
            </th>
            <th style={{ padding: isSpread ? '0.5rem 0.2rem' : '0.75rem 0.4rem', borderRight: '1px solid #cbd5e1', width: isSpread ? '3.0rem' : '3.6rem', textAlign: 'center', backgroundColor: '#f1f5f9', fontSize: isSpread ? '0.72rem' : '0.8rem', letterSpacing: '-0.01em' }}>
              2학기
            </th>
            <th style={{ padding: isSpread ? '0.5rem 0.3rem' : '0.75rem 0.4rem', borderRight: '1px solid #cbd5e1', width: isSpread ? '6.8rem' : '8.5rem', textAlign: 'center', backgroundColor: '#f1f5f9', fontSize: isSpread ? '0.72rem' : '0.8rem', letterSpacing: '-0.01em' }}>
              성적처리
            </th>
            <th style={{ padding: isSpread ? '0.5rem 0.2rem' : '0.75rem 0.4rem', width: isSpread ? '3.8rem' : '4.8rem', textAlign: 'center', backgroundColor: '#f1f5f9', fontSize: isSpread ? '0.72rem' : '0.8rem', letterSpacing: '-0.01em' }}>
              비고
            </th>
          </tr>
        </thead>
        <tbody style={{ borderTop: '1px solid #cbd5e1' }}>
          {/* Mandatory Subjects */}
          {mandatoryList.map((subject, idx) => {
            const normalizedName = normalizeSubjectName(subject.name);
            const areas = getSubjectAreas(subject.name);
            const primaryArea = areas[0] || '공통';
            const typeKey = Object.keys(SUBJECT_TYPES).find(k => normalizeSubjectName(k) === normalizedName);
            const type = (typeKey ? SUBJECT_TYPES[typeKey] : '일반') as SelectionType;
            const evalInfo = getSubjectEval(subject.name, primaryArea, type);
            const isEx = isExchangeSubject(subject.name);
            const exParts = isEx ? parseExchangeSubject(subject.name) : [subject.name];

            return (
              <tr key={`mandatory-${grade}-${subject.name}-${idx}`} style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                {idx === 0 && (
                  <td rowSpan={mandatoryList.length} style={{ 
                    padding: isSpread ? '0.45rem 0.2rem' : '0.65rem 0.4rem', 
                    borderRight: '1px solid #cbd5e1', 
                    fontWeight: '900', 
                    color: '#1e3a8a', 
                    textAlign: 'center', 
                    letterSpacing: '0.05em', 
                    fontSize: isSpread ? '0.75rem' : '0.82rem', 
                    backgroundColor: '#f1f5f9' 
                  }}>
                    필수
                  </td>
                )}
                <td style={{ 
                  padding: isSpread ? '0.45rem 0.2rem' : '0.65rem 0.4rem', 
                  borderRight: '1px solid #cbd5e1', 
                  color: '#1e293b', 
                  textAlign: 'center', 
                  fontWeight: '700', 
                  fontSize: isSpread ? '0.75rem' : '0.82rem' 
                }}>
                  {renderAreaName(formatAreasDisplay(areas, subject.name))}
                </td>
                <td style={{ padding: isSpread ? '0.45rem 0.4rem' : '0.65rem 0.8rem', borderRight: '1px solid #cbd5e1', textAlign: 'left' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                    {isEx && exParts.length > 1 ? (
                      <div style={{ display: 'inline-flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.25rem' }}>
                        <button
                          type="button"
                          onClick={() => handleOpenSubjectModal(exParts[0])}
                          title={`${exParts[0]} 과목 상세 안내 팝업 보기`}
                          style={{
                            background: 'none',
                            border: 'none',
                            padding: '0.1rem 0',
                            margin: 0,
                            font: 'inherit',
                            color: '#0f172a',
                            cursor: 'pointer',
                            textAlign: 'left',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                            fontWeight: '700',
                            fontSize: isSpread ? '0.82rem' : '0.94rem',
                            textDecoration: 'none'
                          }}
                          className="hover:text-blue-700 hover:underline transition-colors"
                        >
                          <span>{exParts[0]}</span>
                          <Info style={{ width: '0.75rem', height: '0.75rem', color: '#2563eb', opacity: 0.85, flexShrink: 0 }} />
                        </button>

                        <span style={{ 
                          color: '#2563eb', 
                          fontWeight: '800', 
                          fontSize: isSpread ? '0.66rem' : '0.72rem',
                          backgroundColor: '#eff6ff',
                          padding: '0.08rem 0.3rem',
                          borderRadius: '4px',
                          border: '1px solid #bfdbfe',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.15rem'
                        }}>
                          <span style={{ color: '#475569', fontSize: '0.62rem' }}>학기제</span>
                          <span>↔</span>
                        </span>

                        <button
                          type="button"
                          onClick={() => handleOpenSubjectModal(exParts[1])}
                          title={`${exParts[1]} 과목 상세 안내 팝업 보기`}
                          style={{
                            background: 'none',
                            border: 'none',
                            padding: '0.1rem 0',
                            margin: 0,
                            font: 'inherit',
                            color: '#0f172a',
                            cursor: 'pointer',
                            textAlign: 'left',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                            fontWeight: '700',
                            fontSize: isSpread ? '0.82rem' : '0.94rem',
                            textDecoration: 'none'
                          }}
                          className="hover:text-blue-700 hover:underline transition-colors"
                        >
                          <span>{exParts[1]}</span>
                          <Info style={{ width: '0.75rem', height: '0.75rem', color: '#2563eb', opacity: 0.85, flexShrink: 0 }} />
                        </button>

                        {grade === 1 && !/\(\d+(?:학점)?\)$/.test(subject.name.trim()) && (
                          <span style={{ color: '#94a3b8', fontWeight: '400', marginLeft: '0.2rem', fontSize: isSpread ? '0.7rem' : '0.82rem' }}>
                            ({getGrade1SubjectCredit(subject)}학점)
                          </span>
                        )}
                        {grade !== 1 && !/\(\d+(?:학점)?\)$/.test(subject.name.trim()) && (
                          <span style={{ color: '#94a3b8', fontWeight: '400', marginLeft: '0.2rem', fontSize: isSpread ? '0.7rem' : '0.82rem' }}>
                            ({getMandatorySubjectCredit(subject, grade)}학점)
                          </span>
                        )}
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleOpenSubjectModal(subject.name)}
                        title={`${subject.name} 과목 상세 안내 팝업 보기`}
                        style={{
                          background: 'none',
                          border: 'none',
                          padding: '0.1rem 0',
                          margin: 0,
                          font: 'inherit',
                          color: '#0f172a',
                          cursor: 'pointer',
                          textAlign: 'left',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          fontWeight: '700',
                          fontSize: isSpread ? '0.82rem' : '0.94rem',
                          textDecoration: 'none'
                        }}
                        className="hover:text-blue-700 transition-colors group"
                      >
                        <span>
                          {subject.name}
                          {grade === 1 && !/\(\d+(?:학점)?\)$/.test(subject.name.trim()) && (
                            <span style={{ color: '#94a3b8', fontWeight: '400', marginLeft: '0.25rem', fontSize: isSpread ? '0.7rem' : '0.82rem' }}>
                              ({getGrade1SubjectCredit(subject)}학점)
                            </span>
                          )}
                          {grade !== 1 && !/\(\d+(?:학점)?\)$/.test(subject.name.trim()) && (
                            <span style={{ color: '#94a3b8', fontWeight: '400', marginLeft: '0.25rem', fontSize: isSpread ? '0.7rem' : '0.82rem' }}>
                              ({getMandatorySubjectCredit(subject, grade)}학점)
                            </span>
                          )}
                        </span>
                        <Info style={{ width: '0.75rem', height: '0.75rem', color: '#2563eb', opacity: 0.85, flexShrink: 0 }} />
                        {evalInfo.isCsat && (
                          <span style={{ 
                            fontSize: '0.62rem', 
                            backgroundColor: '#ffedd5', 
                            color: '#c2410c', 
                            border: '1px solid #fdba74', 
                            borderRadius: '4px', 
                            padding: '0.05rem 0.25rem', 
                            fontWeight: '700' 
                          }}>
                            수능
                          </span>
                        )}
                      </button>
                    )}
                  </div>
                </td>
                <td style={{ padding: isSpread ? '0.45rem 0.2rem' : '0.65rem 0.4rem', borderRight: '1px solid #cbd5e1', textAlign: 'center' }}>
                  {(() => {
                    const typeStyle = getSubjectTypeBadgeStyle(type);
                    return (
                      <span style={{ 
                        fontSize: isSpread ? '0.68rem' : '0.74rem', 
                        padding: isSpread ? '0.12rem 0.4rem' : '0.18rem 0.55rem', 
                        borderRadius: '9999px', 
                        fontWeight: '700',
                        backgroundColor: typeStyle.bg,
                        color: typeStyle.text,
                        border: `1px solid ${typeStyle.border}`,
                        display: 'inline-block',
                        whiteSpace: 'nowrap'
                      }}>
                        {typeStyle.label}
                      </span>
                    );
                  })()}
                </td>
                <td style={{ padding: isSpread ? '0.45rem 0.2rem' : '0.65rem 0.4rem', borderRight: '1px solid #cbd5e1', textAlign: 'center' }}>
                  {subject.semesters.includes(1) && (
                    <div style={{
                      width: isSpread ? '1.15rem' : '1.35rem',
                      height: isSpread ? '1.15rem' : '1.35rem',
                      borderRadius: '0.35rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#eff6ff',
                      border: '2px solid #2563eb',
                      margin: '0 auto'
                    }}>
                      <Check style={{ width: '0.75rem', height: '0.75rem', color: '#1d4ed8', strokeWidth: 3 }} />
                    </div>
                  )}
                </td>
                <td style={{ padding: isSpread ? '0.45rem 0.2rem' : '0.65rem 0.4rem', borderRight: '1px solid #cbd5e1', textAlign: 'center' }}>
                  {subject.semesters.includes(2) && (
                    <div style={{
                      width: isSpread ? '1.15rem' : '1.35rem',
                      height: isSpread ? '1.15rem' : '1.35rem',
                      borderRadius: '0.35rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#eff6ff',
                      border: '2px solid #2563eb',
                      margin: '0 auto'
                    }}>
                      <Check style={{ width: '0.75rem', height: '0.75rem', color: '#1d4ed8', strokeWidth: 3 }} />
                    </div>
                  )}
                </td>
                <td style={{ padding: isSpread ? '0.45rem 0.2rem' : '0.55rem 0.4rem', borderRight: '1px solid #cbd5e1', textAlign: 'center' }}>
                  <span style={{ 
                    fontSize: isSpread ? '0.68rem' : '0.74rem', 
                    padding: '0.12rem 0.35rem', 
                    borderRadius: '4px', 
                    fontWeight: '700',
                    backgroundColor: evalInfo.badgeBg,
                    color: evalInfo.badgeText,
                    border: `1px solid ${evalInfo.badgeBorder}`,
                    display: 'inline-block',
                    whiteSpace: 'nowrap'
                  }}>
                    {evalInfo.displayTitle}
                  </span>
                </td>
                <td style={{ padding: '0.45rem 0.2rem', textAlign: 'center' }}></td>
              </tr>
            );
          })}

          {groups.length === 0 && mandatoryList.length > 0 && (
            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #cbd5e1' }}>
              <td colSpan={8} style={{ padding: '1.2rem', color: '#475569', fontSize: '0.82rem', fontWeight: '600', textAlign: 'center' }}>
                ✨ {grade}학년은 전 과목 공통 및 필수 이수 체제로 편성되어 있으며, 선택과목군은 2·3학년부터 운영됩니다.
              </td>
            </tr>
          )}

          {/* Selection Groups */}
          {groups.map((group, gIdx) => {
            // Count currently selected distinct subjects in this group
            const selectedCount = group.subjects.filter((s: any) => {
              const s1 = s.semesters.includes(1) ? getCellCheckState(grade, group.id, s.name, 1, s.isRecommended) : 'off';
              const s2 = s.semesters.includes(2) ? getCellCheckState(grade, group.id, s.name, 2, s.isRecommended) : 'off';
              return s1 !== 'off' || s2 !== 'off';
            }).length;

            return (
              <Fragment key={`${group.id}-${gIdx}`}>
                {group.groupedSubjects.map((areaGroup: any, aIdx: number) => (
                  <Fragment key={`${group.id}-${areaGroup.area}-${aIdx}`}>
                    {areaGroup.subjects.map((subject: any, sIdx: number) => {
                      const isLastInGroup = aIdx === group.groupedSubjects.length - 1 && sIdx === areaGroup.subjects.length - 1;
                      const sem1State = subject.semesters.includes(1) 
                        ? getCellCheckState(grade, group.id, subject.name, 1, subject.isRecommended) 
                        : 'off';
                      const sem2State = subject.semesters.includes(2) 
                        ? getCellCheckState(grade, group.id, subject.name, 2, subject.isRecommended) 
                        : 'off';

                      const isRowConsultant = sem1State === 'consultant' || sem2State === 'consultant';
                      const isRowAi = !isRowConsultant && (sem1State === 'ai' || sem2State === 'ai');
                      const isRowChecked = isRowConsultant || isRowAi;

                      const rowBgColor = isRowConsultant 
                        ? '#f0fdf4' 
                        : isRowAi 
                        ? '#f0f7ff' 
                        : '#ffffff';

                      const topDesignations = getUnivDesignationsForSubject(subject.name, selectedMajor?.name);

                      return (
                        <tr key={`${group.id}-${areaGroup.area}-${subject.name}-${sIdx}`} style={{ 
                          backgroundColor: rowBgColor,
                          borderBottom: isLastInGroup ? '2px solid #94a3b8' : '1px solid #e2e8f0',
                          borderTop: (aIdx === 0 && sIdx === 0) ? '2px solid #94a3b8' : 'none',
                          transition: 'background-color 0.2s ease'
                        }}>
                          {aIdx === 0 && sIdx === 0 && (
                            <td rowSpan={group.subjects.length} style={{ 
                              padding: isSpread ? '0.45rem 0.2rem' : '0.65rem 0.4rem', 
                              borderRight: '1px solid #cbd5e1', 
                              fontWeight: 'bold', 
                              color: '#0f172a', 
                              textAlign: 'center', 
                              backgroundColor: '#ffffff',
                              verticalAlign: 'middle'
                            }}>
                              <div style={{ color: '#0f172a', fontSize: isSpread ? '0.72rem' : '0.78rem', fontWeight: '800', lineHeight: '1.3' }}>
                                {group.id.startsWith('pdf-group') ? '선택과목' : group.id}<br/>
                                <span style={{ color: '#2563eb', fontWeight: '800', fontSize: isSpread ? '0.72rem' : '0.78rem' }}>
                                  [택{group.selectCount}]
                                </span><br/>
                                <span style={{ color: '#94a3b8', fontSize: isSpread ? '0.65rem' : '0.72rem', fontWeight: '400' }}>
                                  ({group.credits || 4}학점)
                                </span>

                                {/* Selection Quota Badge */}
                                <div style={{ marginTop: '0.25rem' }}>
                                  {selectedCount === group.selectCount ? (
                                    <span style={{ 
                                      fontSize: '0.64rem', 
                                      backgroundColor: '#dcfce7', 
                                      color: '#15803d', 
                                      border: '1px solid #86efac', 
                                      borderRadius: '4px', 
                                      padding: '0.08rem 0.3rem', 
                                      fontWeight: '800',
                                      display: 'inline-block'
                                    }}>
                                      ✓ 완료 ({selectedCount}/{group.selectCount})
                                    </span>
                                  ) : selectedCount > group.selectCount ? (
                                    <span style={{ 
                                      fontSize: '0.64rem', 
                                      backgroundColor: '#fee2e2', 
                                      color: '#b91c1c', 
                                      border: '1px solid #fca5a5', 
                                      borderRadius: '4px', 
                                      padding: '0.08rem 0.3rem', 
                                      fontWeight: '800',
                                      display: 'inline-block'
                                    }}>
                                      ⚠️ 초과 ({selectedCount}/{group.selectCount})
                                    </span>
                                  ) : (
                                    <span style={{ 
                                      fontSize: '0.64rem', 
                                      backgroundColor: '#f1f5f9', 
                                      color: '#475569', 
                                      border: '1px solid #cbd5e1', 
                                      borderRadius: '4px', 
                                      padding: '0.08rem 0.3rem', 
                                      fontWeight: '700',
                                      display: 'inline-block'
                                    }}>
                                      {selectedCount}/{group.selectCount}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </td>
                          )}

                          {sIdx === 0 && (
                            <td rowSpan={areaGroup.subjects.length} style={{ 
                              padding: isSpread ? '0.45rem 0.2rem' : '0.65rem 0.4rem', 
                              borderRight: '1px solid #cbd5e1', 
                              color: '#1e293b', 
                              fontWeight: '700', 
                              fontSize: isSpread ? '0.75rem' : '0.82rem',
                              backgroundColor: '#ffffff',
                              textAlign: 'center',
                              verticalAlign: 'middle'
                            }}>
                              {renderAreaName(areaGroup.area)}
                            </td>
                          )}

                          <td style={{ 
                            padding: isSpread ? '0.45rem 0.4rem' : '0.65rem 0.8rem', 
                            borderRight: '1px solid #cbd5e1', 
                            color: '#0f172a',
                            textAlign: 'left'
                          }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                              {(() => {
                                const isEx = isExchangeSubject(subject.name);
                                const exParts = isEx ? parseExchangeSubject(subject.name) : [subject.name];

                                if (isEx && exParts.length > 1) {
                                  return (
                                    <div style={{ display: 'inline-flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.25rem' }}>
                                      <button
                                        type="button"
                                        onClick={() => handleOpenSubjectModal(exParts[0])}
                                        title={`${exParts[0]} 과목 상세 안내 팝업 보기`}
                                        style={{
                                          background: 'none',
                                          border: 'none',
                                          padding: '0.1rem 0',
                                          margin: 0,
                                          font: 'inherit',
                                          color: isRowConsultant ? '#15803d' : isRowAi ? '#1d4ed8' : '#0f172a',
                                          cursor: 'pointer',
                                          textAlign: 'left',
                                          display: 'inline-flex',
                                          alignItems: 'center',
                                          gap: '0.25rem',
                                          fontWeight: isRowChecked ? '800' : '700',
                                          fontSize: isSpread ? '0.82rem' : '0.94rem',
                                          textDecoration: 'none'
                                        }}
                                        className="hover:text-blue-700 hover:underline transition-colors"
                                      >
                                        <span>{exParts[0]}</span>
                                        <Info style={{ width: '0.75rem', height: '0.75rem', color: '#2563eb', opacity: 0.85, flexShrink: 0 }} />
                                      </button>

                                      <span style={{ 
                                        color: '#2563eb', 
                                        fontWeight: '800', 
                                        fontSize: isSpread ? '0.66rem' : '0.72rem',
                                        backgroundColor: '#eff6ff',
                                        padding: '0.08rem 0.3rem',
                                        borderRadius: '4px',
                                        border: '1px solid #bfdbfe',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.15rem'
                                      }}>
                                        <span style={{ color: '#475569', fontSize: '0.62rem' }}>학기제</span>
                                        <span>↔</span>
                                      </span>

                                      <button
                                        type="button"
                                        onClick={() => handleOpenSubjectModal(exParts[1])}
                                        title={`${exParts[1]} 과목 상세 안내 팝업 보기`}
                                        style={{
                                          background: 'none',
                                          border: 'none',
                                          padding: '0.1rem 0',
                                          margin: 0,
                                          font: 'inherit',
                                          color: isRowConsultant ? '#15803d' : isRowAi ? '#1d4ed8' : '#0f172a',
                                          cursor: 'pointer',
                                          textAlign: 'left',
                                          display: 'inline-flex',
                                          alignItems: 'center',
                                          gap: '0.25rem',
                                          fontWeight: isRowChecked ? '800' : '700',
                                          fontSize: isSpread ? '0.82rem' : '0.94rem',
                                          textDecoration: 'none'
                                        }}
                                        className="hover:text-blue-700 hover:underline transition-colors"
                                      >
                                        <span>{exParts[1]}</span>
                                        <Info style={{ width: '0.75rem', height: '0.75rem', color: '#2563eb', opacity: 0.85, flexShrink: 0 }} />
                                      </button>
                                    </div>
                                  );
                                }

                                return (
                                  <button
                                    type="button"
                                    onClick={() => handleOpenSubjectModal(subject.name)}
                                    title={`${subject.name} 과목 상세 안내 팝업 보기`}
                                    style={{
                                      background: 'none',
                                      border: 'none',
                                      padding: '0.1rem 0',
                                      margin: 0,
                                      font: 'inherit',
                                      color: isRowConsultant ? '#15803d' : isRowAi ? '#1d4ed8' : '#0f172a',
                                      cursor: 'pointer',
                                      textAlign: 'left',
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      gap: '0.35rem',
                                      fontWeight: isRowChecked ? '800' : '700',
                                      fontSize: isSpread ? '0.82rem' : '0.94rem',
                                      textDecoration: 'none'
                                    }}
                                    className="hover:text-blue-700 transition-colors group"
                                  >
                                    <span>{subject.name}</span>
                                    <Info style={{ width: '0.75rem', height: '0.75rem', color: '#2563eb', opacity: 0.85, flexShrink: 0 }} />
                                    {subject.evalInfo?.isCsat && (
                                      <span style={{ 
                                        fontSize: '0.62rem', 
                                        backgroundColor: '#ffedd5', 
                                        color: '#c2410c', 
                                        border: '1px solid #fdba74', 
                                        borderRadius: '4px', 
                                        padding: '0.05rem 0.25rem', 
                                        fontWeight: '700' 
                                      }}>
                                        수능
                                      </span>
                                    )}
                                  </button>
                                );
                              })()}
                            </div>
                          </td>

                          <td style={{ padding: isSpread ? '0.45rem 0.2rem' : '0.65rem 0.4rem', borderRight: '1px solid #cbd5e1', textAlign: 'center' }}>
                            {(() => {
                              const typeStyle = getSubjectTypeBadgeStyle(subject.type);
                              return (
                                <span style={{ 
                                  fontSize: isSpread ? '0.68rem' : '0.74rem', 
                                  padding: isSpread ? '0.12rem 0.4rem' : '0.18rem 0.55rem', 
                                  borderRadius: '9999px', 
                                  fontWeight: '700',
                                  backgroundColor: typeStyle.bg,
                                  color: typeStyle.text,
                                  border: `1px solid ${typeStyle.border}`,
                                  display: 'inline-block',
                                  whiteSpace: 'nowrap'
                                }}>
                                  {typeStyle.label}
                                </span>
                              );
                            })()}
                          </td>

                          {/* Semester 1 Checkbox */}
                          <td style={{ padding: isSpread ? '0.45rem 0.2rem' : '0.65rem 0.4rem', borderRight: '1px solid #cbd5e1', textAlign: 'center' }}>
                            {subject.semesters.includes(1) && (
                              <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.2rem' }}>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleToggleCell(grade, group.id, subject.name, 1, subject.isRecommended);
                                  }}
                                  title={
                                    sem1State === 'ai' 
                                      ? `${subject.name} 1학기: AI 추천 과목 (클릭 시 해제)`
                                      : sem1State === 'consultant'
                                      ? `${subject.name} 1학기: 직접 선택 과목 (클릭 시 해제)`
                                      : `${subject.name} 1학기: 미선택 (클릭하여 선택)`
                                  }
                                  style={{
                                    width: isSpread ? '1.15rem' : '1.35rem',
                                    height: isSpread ? '1.15rem' : '1.35rem',
                                    borderRadius: '0.35rem',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    transition: 'all 0.15s ease',
                                    backgroundColor: sem1State === 'ai' ? '#eff6ff' : sem1State === 'consultant' ? '#f0fdf4' : '#ffffff',
                                    border: sem1State === 'ai' ? '2px solid #2563eb' : sem1State === 'consultant' ? '2px solid #16a34a' : '1.5px solid #cbd5e1',
                                    padding: 0,
                                    boxShadow: sem1State !== 'off' ? '0 1px 3px rgba(0, 0, 0, 0.08)' : 'none'
                                  }}
                                >
                                  {sem1State === 'ai' && <Check style={{ width: '0.8rem', height: '0.8rem', color: '#1d4ed8', strokeWidth: 3 }} />}
                                  {sem1State === 'consultant' && <Check style={{ width: '0.8rem', height: '0.8rem', color: '#16a34a', strokeWidth: 3 }} />}
                                </button>
                                {topDesignations.length > 0 && (
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setUnivDesignationModal({
                                        subjectName: subject.name,
                                        semester: 1,
                                        grade,
                                        groupId: group.id,
                                        isAiRecommended: subject.isRecommended
                                      });
                                    }}
                                    title="대학별 지정 현황 보기"
                                    style={{
                                      fontSize: '0.62rem',
                                      padding: '0.05rem 0.2rem',
                                      borderRadius: '3px',
                                      backgroundColor: '#eff6ff',
                                      color: '#1d4ed8',
                                      border: '1px solid #bfdbfe',
                                      fontWeight: '800',
                                      cursor: 'pointer'
                                    }}
                                  >
                                    대입
                                  </button>
                                )}
                              </div>
                            )}
                          </td>

                          {/* Semester 2 Checkbox */}
                          <td style={{ padding: isSpread ? '0.45rem 0.2rem' : '0.65rem 0.4rem', borderRight: '1px solid #cbd5e1', textAlign: 'center' }}>
                            {subject.semesters.includes(2) && (
                              <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.2rem' }}>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleToggleCell(grade, group.id, subject.name, 2, subject.isRecommended);
                                  }}
                                  title={
                                    sem2State === 'ai' 
                                      ? `${subject.name} 2학기: AI 추천 과목 (클릭 시 해제)`
                                      : sem2State === 'consultant'
                                      ? `${subject.name} 2학기: 직접 선택 과목 (클릭 시 해제)`
                                      : `${subject.name} 2학기: 미선택 (클릭하여 선택)`
                                  }
                                  style={{
                                    width: isSpread ? '1.15rem' : '1.35rem',
                                    height: isSpread ? '1.15rem' : '1.35rem',
                                    borderRadius: '0.35rem',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    transition: 'all 0.15s ease',
                                    backgroundColor: sem2State === 'ai' ? '#eff6ff' : sem2State === 'consultant' ? '#f0fdf4' : '#ffffff',
                                    border: sem2State === 'ai' ? '2px solid #2563eb' : sem2State === 'consultant' ? '2px solid #16a34a' : '1.5px solid #cbd5e1',
                                    padding: 0,
                                    boxShadow: sem2State !== 'off' ? '0 1px 3px rgba(0, 0, 0, 0.08)' : 'none'
                                  }}
                                >
                                  {sem2State === 'ai' && <Check style={{ width: '0.8rem', height: '0.8rem', color: '#1d4ed8', strokeWidth: 3 }} />}
                                  {sem2State === 'consultant' && <Check style={{ width: '0.8rem', height: '0.8rem', color: '#16a34a', strokeWidth: 3 }} />}
                                </button>
                                {topDesignations.length > 0 && (
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setUnivDesignationModal({
                                        subjectName: subject.name,
                                        semester: 2,
                                        grade,
                                        groupId: group.id,
                                        isAiRecommended: subject.isRecommended
                                      });
                                    }}
                                    title="대학별 지정 현황 보기"
                                    style={{
                                      fontSize: '0.62rem',
                                      padding: '0.05rem 0.2rem',
                                      borderRadius: '3px',
                                      backgroundColor: '#eff6ff',
                                      color: '#1d4ed8',
                                      border: '1px solid #bfdbfe',
                                      fontWeight: '800',
                                      cursor: 'pointer'
                                    }}
                                  >
                                    대입
                                  </button>
                                )}
                              </div>
                            )}
                          </td>

                          <td style={{ padding: isSpread ? '0.45rem 0.2rem' : '0.55rem 0.4rem', borderRight: '1px solid #cbd5e1', textAlign: 'center' }}>
                            <span style={{ 
                              fontSize: isSpread ? '0.68rem' : '0.74rem', 
                              padding: '0.12rem 0.35rem', 
                              borderRadius: '4px', 
                              fontWeight: '700',
                              backgroundColor: subject.evalInfo?.badgeBg || '#eff6ff',
                              color: subject.evalInfo?.badgeText || '#1e40af',
                              border: `1px solid ${subject.evalInfo?.badgeBorder || '#bfdbfe'}`,
                              display: 'inline-block',
                              whiteSpace: 'nowrap'
                            }}>
                              {subject.evalInfo?.displayTitle || '5등급'}
                            </span>
                          </td>

                          <td style={{ padding: '0.45rem 0.2rem', textAlign: 'center' }}>
                            {subject.isRecommended && (
                              <span style={{ 
                                fontSize: isSpread ? '0.64rem' : '0.72rem', 
                                backgroundColor: '#dbeafe', 
                                color: '#1d4ed8', 
                                border: '1px solid #93c5fd', 
                                borderRadius: '4px', 
                                padding: '0.08rem 0.35rem', 
                                fontWeight: '700',
                                display: 'inline-block',
                                whiteSpace: 'nowrap'
                              }}>
                                권장
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </Fragment>
                ))}
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
