import React, { useState, useMemo, useRef, Fragment, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { flushSync } from 'react-dom';
import { jsPDF } from 'jspdf';
import { toJpeg } from 'html-to-image';
import { 
  BookOpen, 
  GraduationCap, 
  Search, 
  ChevronRight, 
  ChevronDown,
  ChevronUp,
  Info, 
  CheckCircle2,
  LayoutGrid,
  ListFilter,
  Layers,
  FileText,
  CheckSquare,
  Check,
  RotateCcw,
  Printer,
  Download,
  Plus,
  X,
  Save,
  Trash2,
  Settings,
  FileUp,
  Loader2,
  FileCheck,
  Briefcase,
  Atom,
  Cpu,
  HeartPulse,
  Palette,
  Compass,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  School,
  Building2,
  Globe,
  ExternalLink,
  MapPin,
  Home,
  ClipboardCheck,
  BarChart3,
  UploadCloud,
  RefreshCw,
  AlertCircle,
  SlidersHorizontal,
  Clock,
  ArrowRightLeft
} from 'lucide-react';
import { 
  FIELD_DATA, 
  SUBJECT_AREAS, 
  SUBJECT_TYPES, 
  SUNGSHIN_GROUPS, 
  MANDATORY_SUBJECTS, 
  Major, 
  Field, 
  SelectionGroup, 
  SungshinSubject,
  getSubjectEvaluationInfo,
  SubjectEvaluationInfo,
  SelectionType,
  isExchangeSubject,
  parseExchangeSubject,
  getSubjectAreas,
  formatAreasDisplay
} from './data/curriculumData';
import { 
  SchoolCurriculum, 
  INITIAL_SCHOOLS, 
  getSchoolDistrict, 
  PDF_VERIFIED_SCHOOL_IDS,
  normalizeSchoolCurriculum,
  getSchoolLinks,
  getSchoolFoundation,
  SchoolLinks,
  isNoCurriculumSchool,
  getGrade1SubjectCredit,
  getMandatorySubjectCredit
} from './data/schoolsData';
import { UNIVERSITY_TIPS, UniversityTip } from './data/universityData';
import { getSubjectDetail, SubjectDetail } from './data/subjectDetailsData';
import { SubjectDetailModal } from './components/SubjectDetailModal';
import { GraduationRequirementsValidator } from './components/GraduationRequirementsValidator';
import { SchoolCompareModal } from './components/SchoolCompareModal';
import { GoogleGenAI, Type } from "@google/genai";

// GitHub 공개 배포용: API 키를 빌드에 포함하지 않고, 사용자가 브라우저에서 직접 입력(이 브라우저에만 저장)
const GEMINI_KEY_STORAGE = 'curriculum_guide_gemini_api_key';
const getAI = () => {
  let key = '';
  try { key = localStorage.getItem(GEMINI_KEY_STORAGE) || ''; } catch (_) {}
  if (!key) {
    key = (window.prompt('AI 분석 기능을 쓰려면 본인의 Gemini API 키를 입력하세요.\n(키는 이 브라우저에만 저장되며 서버로 전송되지 않습니다)') || '').trim();
    if (!key) throw new Error('Gemini API 키가 필요합니다.');
    try { localStorage.setItem(GEMINI_KEY_STORAGE, key); } catch (_) {}
  }
  return new GoogleGenAI({ apiKey: key });
};

interface FieldMeta {
  name: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  accentColor: string;
  bgLight: string;
  borderLight: string;
  badgeBg: string;
  badgeText: string;
  description: string;
  previewMajors: string[];
}

const FIELD_META: Record<string, FieldMeta> = {
  '인문 분야': {
    name: '인문 분야',
    icon: BookOpen,
    accentColor: '#d97706',
    bgLight: '#fffbeb',
    borderLight: '#fde68a',
    badgeBg: '#fef3c7',
    badgeText: '#92400e',
    description: '어문, 역사, 철학 등 인간과 문화의 본질과 가치를 탐구하는 학문',
    previewMajors: ['국어국문', '영어영문', '사학', '철학']
  },
  '사회 분야': {
    name: '사회 분야',
    icon: Briefcase,
    accentColor: '#059669',
    bgLight: '#ecfdf5',
    borderLight: '#a7f3d0',
    badgeBg: '#d1fae5',
    badgeText: '#065f46',
    description: '경영, 경제, 언론, 행정 등 사회 구조와 시스템을 연구하는 학문',
    previewMajors: ['경영학', '경제학', '미디어', '행정학']
  },
  '자연 분야': {
    name: '자연 분야',
    icon: Atom,
    accentColor: '#0891b2',
    bgLight: '#ecfeff',
    borderLight: '#a5f3fc',
    badgeBg: '#cffafe',
    badgeText: '#155e75',
    description: '수학, 물리, 화학, 생명 등 자연 현상의 근본 원리와 법칙을 탐구하는 학문',
    previewMajors: ['수학', '물리학', '화학', '생명과학']
  },
  '공학 분야': {
    name: '공학 분야',
    icon: Cpu,
    accentColor: '#2563eb',
    bgLight: '#eff6ff',
    borderLight: '#bfdbfe',
    badgeBg: '#dbeafe',
    badgeText: '#1e40af',
    description: '소프트웨어, 전자, 반도체, 기계 등 첨단 기술을 설계하고 구현하는 학문',
    previewMajors: ['컴퓨터공학', '전자공학', '인공지능', '기계공학']
  },
  '보건·의약학 분야': {
    name: '보건·의약학 분야',
    icon: HeartPulse,
    accentColor: '#e11d48',
    bgLight: '#fff1f2',
    borderLight: '#fecdd3',
    badgeBg: '#ffe4e6',
    badgeText: '#9f1239',
    description: '의학, 약학, 간호, 보건 등 인간 생명을 존중하고 건강을 증진하는 학문',
    previewMajors: ['의예과', '약학과', '간호학과', '수의예과']
  },
  '교육 분야': {
    name: '교육 분야',
    icon: GraduationCap,
    accentColor: '#4f46e5',
    bgLight: '#eef2ff',
    borderLight: '#c7d2fe',
    badgeBg: '#e0e7ff',
    badgeText: '#3730a3',
    description: '초등, 중등 교과 교육 및 미래 세대를 이끄는 교육 전문가를 양성하는 학문',
    previewMajors: ['초등교육', '국어교육', '수학교육', '영어교육']
  },
  '예술·체육 분야': {
    name: '예술·체육 분야',
    icon: Palette,
    accentColor: '#9333ea',
    bgLight: '#faf5ff',
    borderLight: '#e9d5ff',
    badgeBg: '#f3e8ff',
    badgeText: '#6b21a8',
    description: '시각디자인, 영상, 음악, 스포츠 과학 및 체육 지도 역량을 기르는 학문',
    previewMajors: ['디자인학', '회화과', '스포츠의학', '체육교육']
  },
  '자율전공 분야': {
    name: '자율전공 분야',
    icon: Compass,
    accentColor: '#0284c7',
    bgLight: '#f0f9ff',
    borderLight: '#bae6fd',
    badgeBg: '#e0f2fe',
    badgeText: '#075985',
    description: '전공 경계 없이 폭넓은 교양과 전공을 자유롭게 탐색하는 융복합 학부',
    previewMajors: ['자율전공학부', '자유전공학부']
  }
};

const getFieldMeta = (fieldName: string): FieldMeta => {
  return FIELD_META[fieldName] || {
    name: fieldName,
    icon: BookOpen,
    accentColor: '#2563eb',
    bgLight: '#eff6ff',
    borderLight: '#bfdbfe',
    badgeBg: '#dbeafe',
    badgeText: '#1e40af',
    description: '대학 전공별 권장과목 및 맞춤형 수강신청 계획',
    previewMajors: []
  };
};

export default function App() {
  const [selectedField, setSelectedField] = useState<Field | null>(null);
  const [selectedMajor, setSelectedMajor] = useState<Major | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [fieldSearchTerm, setFieldSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'plan' | 'university'>('plan');
  const [planGrade, setPlanGrade] = useState<1 | 2 | 3>(2);
  const [selectedSubjectModal, setSelectedSubjectModal] = useState<SubjectDetail | null>(null);
  const [univDesignationModal, setUnivDesignationModal] = useState<{
    subjectName: string;
    semester: number;
    grade: number;
    groupId: string;
    isAiRecommended: boolean;
  } | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Helper to guarantee unique school IDs
  const dedupeSchools = (list: SchoolCurriculum[]): SchoolCurriculum[] => {
    const map = new Map<string, SchoolCurriculum>();
    for (const s of list) {
      if (s && s.id && !map.has(s.id)) {
        map.set(s.id, s);
      }
    }
    return Array.from(map.values());
  };

  // Permanently forbidden / deleted schools that must NEVER show up on screen
  const FORBIDDEN_SCHOOL_IDS = new Set(['seongnam_seo', 'sungil_girls']);

  // Multiple School Curriculum State with localStorage persistence
  const [schools, setSchools] = useState<SchoolCurriculum[]>(() => {
    try {
      // Clean up legacy storage keys
      ['curriculum_guide_schools', 'curriculum_guide_schools_v2', 'curriculum_guide_schools_v3', 
       'curriculum_guide_schools_v4', 'curriculum_guide_schools_v5', 'curriculum_guide_schools_v6',
       'curriculum_guide_schools_v7', 'curriculum_guide_schools_v8', 'curriculum_guide_schools_v9',
       'curriculum_guide_schools_v10', 'curriculum_guide_schools_v11', 'curriculum_guide_schools_v12',
       'curriculum_guide_schools_v13', 'curriculum_guide_schools_v14', 'curriculum_guide_schools_v15',
       'curriculum_guide_schools_v16', 'curriculum_guide_schools_v17', 'curriculum_guide_schools_v18', 'curriculum_guide_schools_v19', 'curriculum_guide_schools_v20', 'curriculum_guide_schools_v21', 'curriculum_guide_schools_v22', 'curriculum_guide_schools_v23', 'curriculum_guide_schools_v24', 'curriculum_guide_schools_v25', 'curriculum_guide_schools_v26'].forEach(k => {
        try { localStorage.removeItem(k); } catch (_) {}
      });

      const saved = localStorage.getItem('curriculum_guide_schools_v27');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge INITIAL_SCHOOLS with user-custom schools, strictly excluding forbidden schools
          const customSchools = parsed.filter((s: SchoolCurriculum) => 
            s && s.id && !FORBIDDEN_SCHOOL_IDS.has(s.id) && !INITIAL_SCHOOLS.some(init => init.id === s.id)
          ).map(normalizeSchoolCurriculum);
          return dedupeSchools([...INITIAL_SCHOOLS, ...customSchools]).filter(s => !FORBIDDEN_SCHOOL_IDS.has(s.id));
        }
      }
    } catch (e) {
      console.warn('Failed to load schools from localStorage', e);
    }
    return dedupeSchools(INITIAL_SCHOOLS).filter(s => !FORBIDDEN_SCHOOL_IDS.has(s.id));
  });

  const [selectedSchoolId, setSelectedSchoolId] = useState<string>('sungshin');
  const [customSchoolName, setCustomSchoolName] = useState<string>('');

  // Screen mode: 'directory' (첫 화면 - 성남시 관내 고교 편제표 목록 및 현황) | 'explore' (학문 분야별 탐색 및 검색기 메인)
  const [activeScreen, setActiveScreen] = useState<'directory' | 'explore'>('directory');
  const [schoolStatusFilter, setSchoolStatusFilter] = useState<'전체' | 'verified' | 'pending'>('전체');

  const handleSelectSchoolAndExplore = (schoolId: string) => {
    const school = schools.find(s => s.id === schoolId);
    const externalLink = school?.externalLink || 
      (schoolId === 'kaywon' ? 'https://docs.google.com/spreadsheets/d/10Eg4xNqRnM38obns-OndbrQeyeGPRVTc/edit?usp=drive_link&ouid=115956131830918785013&rtpof=true&sd=true' : undefined) ||
      (schoolId === 'seongnam_fl' ? 'https://docs.google.com/spreadsheets/d/1MwG1ZzWYLRdDaZNXVQoTfA9S0QhKJVZp/edit?gid=1199729268#gid=1199729268' : undefined);
    if (externalLink) {
      window.open(externalLink, '_blank', 'noopener,noreferrer');
      showToast(`${school?.name || (schoolId === 'seongnam_fl' ? '성남외국어고등학교' : '계원예술고')} 교육과정 링크를 새 창으로 열었습니다.`);
      return;
    }
    if (isNoCurriculumSchool(schoolId)) {
      const name = school ? school.name : '해당 학교';
      showToast(`${name}은(는) 특성화고로 일반 선택과목 편제표 대상이 아닙니다. 우측 링크를 이용해 주세요.`);
      return;
    }
    setSelectedSchoolId(schoolId);
    setActiveScreen('explore');
    setSelectedField(null);
    setSelectedMajor(null);
    setSearchTerm('');
    setFieldSearchTerm('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToSchoolDirectory = () => {
    setActiveScreen('directory');
    setSelectedMajor(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toast notification state for school links
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((curr) => (curr === message ? null : curr));
    }, 2800);
  };

  const handleSchoolLinkClick = (
    e: React.MouseEvent,
    school: SchoolCurriculum,
    linkType: 'homepage' | 'alimi' | 'status26'
  ) => {
    e.stopPropagation(); // 카드 전체 클릭(학과 선택 이동) 방지
    const links = getSchoolLinks(school);
    const targetUrl = links[linkType];

    const typeLabels: Record<string, string> = {
      homepage: '학교 홈페이지',
      alimi: '학교 알리미',
      status26: '2026 교육과정 운영현황'
    };
    const label = typeLabels[linkType];

    if (targetUrl && targetUrl.trim()) {
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    } else {
      showToast(`${school.name}의 ${label} 링크는 추후 제공 시 바로 연결됩니다.`);
    }
  };

  useEffect(() => {
    try {
      localStorage.setItem('curriculum_guide_schools_v27', JSON.stringify(schools));
    } catch (e) {
      console.warn('Failed to save schools to localStorage', e);
    }
  }, [schools]);

  const selectedSchool = useMemo(() => {
    const found = schools.find(s => s.id === selectedSchoolId && !isNoCurriculumSchool(s)) ||
                  schools.find(s => s.id === 'sungshin' && !isNoCurriculumSchool(s)) ||
                  schools.find(s => !isNoCurriculumSchool(s)) ||
                  schools[0];
    return normalizeSchoolCurriculum(found);
  }, [schools, selectedSchoolId]);

  // School Selector Filter & Search States
  const [schoolDistrictFilter, setSchoolDistrictFilter] = useState<'전체' | '분당구' | '수정구' | '중원구' | '사용자 등록'>('전체');
  const [schoolSearchQuery, setSchoolSearchQuery] = useState('');
  const [isHomeSchoolExpanded, setIsHomeSchoolExpanded] = useState<boolean>(false);
  const [majorSchoolDistrictFilter, setMajorSchoolDistrictFilter] = useState<'전체' | '분당구' | '수정구' | '중원구' | '사용자 등록'>('전체');
  const [majorSchoolSearchQuery, setMajorSchoolSearchQuery] = useState('');
  const [majorSchoolViewMode, setMajorSchoolViewMode] = useState<'compact' | 'cards'>('compact');
  const [isMajorSchoolExpanded, setIsMajorSchoolExpanded] = useState<boolean>(true);
  const [presetModalDistrictFilter, setPresetModalDistrictFilter] = useState<'전체' | '분당구' | '수정구' | '중원구' | '사용자 등록'>('전체');
  const [presetModalSearchQuery, setPresetModalSearchQuery] = useState('');

  // Modal State for Add School & School Compare
  const [showAddSchoolModal, setShowAddSchoolModal] = useState<boolean>(false);
  const [showCompareModal, setShowCompareModal] = useState<boolean>(false);
  const [addSchoolTab, setAddSchoolTab] = useState<'pdf' | 'preset' | 'text'>('pdf');
  const [pastedCurriculumText, setPastedCurriculumText] = useState<string>('');
  const [isParsingText, setIsParsingText] = useState<boolean>(false);

  // School match stats for selectedMajor
  const getSchoolMajorStats = (school: SchoolCurriculum) => {
    if (!selectedMajor) return { count: 0, percent: 0, total: 0 };
    const recs = selectedMajor.recommendedSubjects || [];
    if (recs.length === 0) return { count: 0, percent: 100, total: 0 };
    const openedCount = recs.filter(sub => {
      const inGroups = school.groups.some(g => g.subjects.some(s => s.name === sub));
      const inMandatory = school.mandatory && Object.values(school.mandatory).some(list => list.some(m => m.name === sub));
      return inGroups || inMandatory;
    }).length;
    const percent = Math.round((openedCount / recs.length) * 100);
    return { count: openedCount, percent, total: recs.length };
  };

  // School Counts by District and Status
  const schoolCounts = useMemo(() => {
    const bundang = schools.filter(s => getSchoolDistrict(s) === '분당구').length;
    const sujeong = schools.filter(s => getSchoolDistrict(s) === '수정구').length;
    const jungwon = schools.filter(s => getSchoolDistrict(s) === '중원구').length;
    const custom = schools.filter(s => !INITIAL_SCHOOLS.some(init => init.id === s.id)).length;
    const verified = schools.filter(s => PDF_VERIFIED_SCHOOL_IDS.has(s.id)).length;
    const pending = schools.length - verified;
    return {
      all: schools.length,
      bundang,
      sujeong,
      jungwon,
      custom,
      verified,
      pending
    };
  }, [schools]);

  // Filtered Schools on Directory (First Screen)
  const filteredSchools = useMemo(() => {
    return schools.filter(s => {
      if (schoolDistrictFilter !== '전체') {
        if (schoolDistrictFilter === '사용자 등록') {
          const isCustom = !INITIAL_SCHOOLS.some(init => init.id === s.id);
          if (!isCustom) return false;
        } else {
          const district = getSchoolDistrict(s);
          if (district !== schoolDistrictFilter) return false;
        }
      }
      if (schoolStatusFilter !== '전체') {
        const isVerified = PDF_VERIFIED_SCHOOL_IDS.has(s.id);
        if (schoolStatusFilter === 'verified' && !isVerified) return false;
        if (schoolStatusFilter === 'pending' && isVerified) return false;
      }
      if (schoolSearchQuery.trim()) {
        const query = schoolSearchQuery.trim().toLowerCase();
        const matchName = s.name.toLowerCase().includes(query) || s.shortName.toLowerCase().includes(query);
        const matchBadge = s.typeBadge.toLowerCase().includes(query);
        const matchLocation = s.location.toLowerCase().includes(query);
        const matchTags = s.tags.some(t => t.toLowerCase().includes(query));
        if (!matchName && !matchBadge && !matchLocation && !matchTags) return false;
      }
      return true;
    });
  }, [schools, schoolDistrictFilter, schoolStatusFilter, schoolSearchQuery]);

  // Group schools by district for 2-column layout requested by user (가나다 오름차순 정렬)
  const districtSections = useMemo(() => {
    const districtOrder = ['수정구', '중원구', '분당구'];
    const activeDistricts = schoolDistrictFilter === '전체'
      ? districtOrder
      : schoolDistrictFilter === '사용자 등록'
      ? ['사용자 등록']
      : [schoolDistrictFilter];

    return activeDistricts.map(districtName => {
      const list = filteredSchools.filter(s => {
        if (districtName === '사용자 등록') {
          return !INITIAL_SCHOOLS.some(init => init.id === s.id);
        }
        return getSchoolDistrict(s) === districtName;
      });

      // 지역별 학교 배치를 가나다 오름차순으로 정렬
      const sortedList = [...list].sort((a, b) => {
        const nameA = a.shortName || a.name;
        const nameB = b.shortName || b.name;
        return nameA.localeCompare(nameB, 'ko');
      });

      return {
        district: districtName,
        schools: sortedList
      };
    }).filter(group => group.schools.length > 0);
  }, [filteredSchools, schoolDistrictFilter]);

  // Filtered Schools on Major Detail View
  const majorFilteredSchools = useMemo(() => {
    return schools.filter(s => {
      if (isNoCurriculumSchool(s)) return false;
      if (majorSchoolDistrictFilter !== '전체') {
        if (majorSchoolDistrictFilter === '사용자 등록') {
          const isCustom = !INITIAL_SCHOOLS.some(init => init.id === s.id);
          if (!isCustom) return false;
        } else {
          const district = getSchoolDistrict(s);
          if (district !== majorSchoolDistrictFilter) return false;
        }
      }
      if (majorSchoolSearchQuery.trim()) {
        const query = majorSchoolSearchQuery.trim().toLowerCase();
        const matchName = s.name.toLowerCase().includes(query) || s.shortName.toLowerCase().includes(query);
        const matchBadge = s.typeBadge.toLowerCase().includes(query);
        const matchLocation = s.location.toLowerCase().includes(query);
        const matchTags = s.tags.some(t => t.toLowerCase().includes(query));
        if (!matchName && !matchBadge && !matchLocation && !matchTags) return false;
      }
      return true;
    }).sort((a, b) => {
      const nameA = a.shortName || a.name;
      const nameB = b.shortName || b.name;
      return nameA.localeCompare(nameB, 'ko');
    });
  }, [schools, majorSchoolDistrictFilter, majorSchoolSearchQuery]);

  // Filtered Schools in Modal Preset Tab
  const presetFilteredSchools = useMemo(() => {
    return schools.filter(s => {
      if (isNoCurriculumSchool(s)) return false;
      if (presetModalDistrictFilter !== '전체') {
        if (presetModalDistrictFilter === '사용자 등록') {
          const isCustom = !INITIAL_SCHOOLS.some(init => init.id === s.id);
          if (!isCustom) return false;
        } else {
          const district = getSchoolDistrict(s);
          if (district !== presetModalDistrictFilter) return false;
        }
      }
      if (presetModalSearchQuery.trim()) {
        const query = presetModalSearchQuery.trim().toLowerCase();
        const matchName = s.name.toLowerCase().includes(query) || s.shortName.toLowerCase().includes(query);
        const matchBadge = s.typeBadge.toLowerCase().includes(query);
        const matchLocation = s.location.toLowerCase().includes(query);
        const matchTags = s.tags.some(t => t.toLowerCase().includes(query));
        if (!matchName && !matchBadge && !matchLocation && !matchTags) return false;
      }
      return true;
    }).sort((a, b) => {
      const nameA = a.shortName || a.name;
      const nameB = b.shortName || b.name;
      return nameA.localeCompare(nameB, 'ko');
    });
  }, [schools, presetModalDistrictFilter, presetModalSearchQuery]);

  const [showCustomForm, setShowCustomForm] = useState(false);
  const [customGroups, setCustomGroups] = useState<SelectionGroup[]>([]);
  const [customMandatory, setCustomMandatory] = useState<Record<number, SungshinSubject[]>>({});
  const [tempMandatory, setTempMandatory] = useState({
    '2-1': '',
    '2-2': '',
    '3-1': '',
    '3-2': ''
  });
  const [tempGroups, setTempGroups] = useState<any[]>([
    { id: Date.now(), grade: 2, semester: '1학기', credits: 4, selectCount: 1, subjects: '' }
  ]);
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [univSearchTerm, setUnivSearchTerm] = useState('');
  const [univRegionFilter, setUnivRegionFilter] = useState('전체');
  const [univViewMode, setUnivViewMode] = useState<'major' | 'all'>('major');
  const [isParsingPdf, setIsParsingPdf] = useState(false);
  const [showPdfReview, setShowPdfReview] = useState(false);
  const [parsedData, setParsedData] = useState<{
    schoolName?: string;
    mandatory: Record<number, SungshinSubject[]>;
    groups: SelectionGroup[];
  } | null>(null);
  // Consultant checked state: overrides default AI recommendations
  // key: `${grade}-${groupId}-${subjectName}-${semester}`
  // value: 'consultant' (녹색 체크) | 'off' (체크 해제)
  const [consultantChecks, setConsultantChecks] = useState<Record<string, 'consultant' | 'off'>>({});
  const printRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const normalizeSubjectName = (name: string) => {
    if (!name) return '';
    return name
      .replace(/\s+/g, '') // Remove all spaces
      .replace(/Ⅰ/g, '1')
      .replace(/Ⅱ/g, '2')
      .replace(/Ⅲ/g, '3')
      .replace(/Ⅳ/g, '4')
      .replace(/Ⅴ/g, '5')
      .replace(/Ⅵ/g, '6')
      .replace(/Ⅶ/g, '7')
      .replace(/Ⅷ/g, '8')
      .replace(/Ⅸ/g, '9')
      .replace(/Ⅹ/g, '10')
      .toLowerCase();
  };

  const handleAddGroup = () => {
    setTempGroups([...tempGroups, { id: Date.now(), grade: 2, semester: '1학기', credits: 3, selectCount: 1, subjects: '' }]);
  };

  const handleRemoveGroup = (id: number) => {
    setTempGroups(tempGroups.filter(g => g.id !== id));
  };

  const handleUpdateGroup = (id: number, field: string, value: any) => {
    setTempGroups(tempGroups.map(g => g.id === id ? { ...g, [field]: value } : g));
  };

  const handleDeleteCustomSchool = (schoolId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (INITIAL_SCHOOLS.some(s => s.id === schoolId)) {
      alert('기본 제공 고등학교는 삭제할 수 없습니다.');
      return;
    }
    if (confirm('이 맞춤 고등학교 편제표를 삭제하시겠습니까?')) {
      setSchools(prev => prev.filter(s => s.id !== schoolId));
      if (selectedSchoolId === schoolId) {
        setSelectedSchoolId('sungshin');
      }
    }
  };

  const handleResetToDefaultSchools = () => {
    if (confirm(`기본 성남지역 ${INITIAL_SCHOOLS.length}개 고등학교 목록으로 초기화하시겠습니까? (직접 추가한 학교는 목록에서 삭제됩니다)`)) {
      setSchools(INITIAL_SCHOOLS.filter(s => !FORBIDDEN_SCHOOL_IDS.has(s.id)));
      setSelectedSchoolId('sungshin');
      try { localStorage.removeItem('curriculum_guide_schools_v18'); } catch (_) {}
      alert(`성남지역 ${INITIAL_SCHOOLS.length}개 고등학교 목록으로 초기화되었습니다.`);
    }
  };

  const handleParsePastedText = async () => {
    if (!pastedCurriculumText.trim()) {
      alert('교육과정 편성표 텍스트나 표 내용을 입력해주세요.');
      return;
    }

    setIsParsingText(true);
    try {
      const response = await getAI().models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          {
            text: `다음 텍스트에서 고등학교 교육과정 편성표(학교명, 학년별 필수과목, 선택과목군)를 추출해주세요:
            ${pastedCurriculumText}

            결과는 반드시 다음 JSON 형식으로 응답해주세요:
            {
              "schoolName": "고등학교명 (없으면 '직접 등록 고등학교')",
              "mandatory": {
                "2": [{"name": "과목명", "semesters": [1, 2]}],
                "3": [{"name": "과목명", "semesters": [1, 2]}]
              },
              "groups": [
                {
                  "grade": 2,
                  "semester": "1학기",
                  "selectCount": 4,
                  "credits": 3,
                  "subjects": [{"name": "과목1", "semesters": [1]}, {"name": "과목2", "semesters": [1]}],
                  "description": "2학년 1학기 선택군"
                }
              ]
            }
            과목명은 2022 개정 정식 과목명으로 정확하게 추출해주세요.`
          }
        ],
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              schoolName: { type: Type.STRING },
              mandatory: {
                type: Type.OBJECT,
                properties: {
                  "2": {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        name: { type: Type.STRING },
                        semesters: { type: Type.ARRAY, items: { type: Type.NUMBER } }
                      },
                      required: ["name", "semesters"]
                    }
                  },
                  "3": {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        name: { type: Type.STRING },
                        semesters: { type: Type.ARRAY, items: { type: Type.NUMBER } }
                      },
                      required: ["name", "semesters"]
                    }
                  }
                },
                required: ["2", "3"]
              },
              groups: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    grade: { type: Type.NUMBER },
                    semester: { type: Type.STRING },
                    selectCount: { type: Type.NUMBER },
                    credits: { type: Type.NUMBER },
                    subjects: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          name: { type: Type.STRING },
                          semesters: { type: Type.ARRAY, items: { type: Type.NUMBER } }
                        },
                        required: ["name", "semesters"]
                      }
                    },
                    description: { type: Type.STRING }
                  },
                  required: ["grade", "semester", "selectCount", "subjects", "description"]
                }
              }
            },
            required: ["mandatory", "groups"]
          }
        }
      });

      const data = JSON.parse(response.text || '{}');
      if (data.groups) {
        data.groups = data.groups.map((g: any, idx: number) => ({
          ...g,
          id: `선택군${idx + 1}`
        }));
      }
      setParsedData(data);
      setCustomSchoolName(data.schoolName || '새 고등학교');
      setShowAddSchoolModal(false);
      setShowPdfReview(true);
    } catch (error) {
      console.error('Text Parsing Error:', error);
      alert('텍스트 분석 중 오류가 발생했습니다. 직접 입력 탭을 이용해보세요.');
    } finally {
      setIsParsingText(false);
    }
  };

  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      alert('PDF 파일만 업로드 가능합니다.');
      return;
    }

    setIsParsingPdf(true);
    try {
      const base64 = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          resolve(result.split(',')[1]);
        };
        reader.readAsDataURL(file);
      });

      const response = await getAI().models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          {
            inlineData: {
              mimeType: "application/pdf",
              data: base64
            }
          },
          {
            text: `이 PDF 파일에서 고등학교 교육과정 편성표 정보를 추출해주세요. 
            다음 정보를 찾아주세요:
            1. 학교 이름 (문서 상단이나 직인 주변에 표시된 학교명, 예: 성남고등학교, 성남여자고등학교 등)
            2. 2학년 및 3학년 필수(학교지정) 과목 (1학기, 2학기 구분)
            3. 2학년 및 3학년 선택 과목군 (몇 개 중 몇 개 선택인지, 학점, 과목 리스트)

            결과는 반드시 다음 JSON 형식으로 응답해주세요:
            {
              "schoolName": "고등학교명",
              "mandatory": {
                "2": [{"name": "과목명", "semesters": [1, 2]}],
                "3": [{"name": "과목명", "semesters": [1, 2]}]
              },
              "groups": [
                {
                  "grade": 2,
                  "semester": "1학기",
                  "selectCount": 4,
                  "credits": 3,
                  "subjects": [{"name": "과목1", "semesters": [1]}, {"name": "과목2", "semesters": [1]}],
                  "description": "2학년 1학기 선택군"
                }
              ]
            }
            
            주의사항:
            - 학교명을 찾을 수 있다면 정확하게 적어주세요.
            - 과목명은 정식 교육과정 과목명으로 정확하게 추출해주세요.
            - semesters는 1학기면 [1], 2학기면 [2], 둘 다면 [1, 2]로 표시하세요.
            - 선택군(groups)의 경우, '택4', '택5', '택1' 등 selectCount를 정확히 설정하세요.`
          }
        ],
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              schoolName: { type: Type.STRING },
              mandatory: {
                type: Type.OBJECT,
                properties: {
                  "2": {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        name: { type: Type.STRING },
                        semesters: { type: Type.ARRAY, items: { type: Type.NUMBER } }
                      },
                      required: ["name", "semesters"]
                    }
                  },
                  "3": {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        name: { type: Type.STRING },
                        semesters: { type: Type.ARRAY, items: { type: Type.NUMBER } }
                      },
                      required: ["name", "semesters"]
                    }
                  }
                },
                required: ["2", "3"]
              },
              groups: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    grade: { type: Type.NUMBER },
                    semester: { type: Type.STRING },
                    selectCount: { type: Type.NUMBER },
                    credits: { type: Type.NUMBER },
                    subjects: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          name: { type: Type.STRING },
                          semesters: { type: Type.ARRAY, items: { type: Type.NUMBER } }
                        },
                        required: ["name", "semesters"]
                      }
                    },
                    description: { type: Type.STRING }
                  },
                  required: ["grade", "semester", "selectCount", "subjects", "description"]
                }
              }
            },
            required: ["mandatory", "groups"]
          }
        }
      });

      const data = JSON.parse(response.text || '{}');
      // Add IDs to groups
      if (data.groups) {
        data.groups = data.groups.map((g: any, idx: number) => ({
          ...g,
          id: `선택군${idx + 1}`
        }));
      }
      
      setParsedData(data);
      setCustomSchoolName(data.schoolName || file.name.replace(/\.[^/.]+$/, '').slice(0, 12) || '새 고등학교');
      setShowPdfReview(true);
    } catch (error) {
      console.error('PDF Parsing Error:', error);
      alert('PDF 분석 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsParsingPdf(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const applyParsedData = () => {
    if (!parsedData) return;
    
    const finalSchoolName = customSchoolName.trim() || parsedData.schoolName || '업로드 고등학교';
    const newSchoolId = `custom_school_${Date.now()}`;
    const newSchool: SchoolCurriculum = {
      id: newSchoolId,
      name: finalSchoolName,
      shortName: finalSchoolName.length > 6 ? finalSchoolName.slice(0, 5) : finalSchoolName,
      typeBadge: '사용자 등록',
      location: '직접 등록',
      year: '2027학년도 입학생 (2022 개정)',
      description: 'PDF에서 AI 분석으로 자동 추출된 맞춤 교육과정 편제표입니다.',
      tags: ['직접 업로드', '2022 개정'],
      mandatory: parsedData.mandatory,
      groups: parsedData.groups
    };

    setSchools(prev => [...prev, newSchool]);
    setSelectedSchoolId(newSchoolId);
    setShowPdfReview(false);
    setParsedData(null);
    setCustomSchoolName('');
    alert(`[${finalSchoolName}] 교육과정이 성공적으로 등록 및 적용되었습니다.`);
  };

  const handleDone = () => {
    // Process Mandatory Subjects
    const newMandatory: Record<number, SungshinSubject[]> = { 2: [], 3: [] };
    
    const processSemester = (grade: number, semester: number, input: string) => {
      const subjects = input.split(',').map(s => s.trim()).filter(s => s !== '');
      subjects.forEach(name => {
        const existing = newMandatory[grade].find(s => s.name === name);
        if (existing) {
          if (!existing.semesters.includes(semester)) {
            existing.semesters.push(semester);
            existing.semesters.sort();
          }
        } else {
          newMandatory[grade].push({ name, semesters: [semester] });
        }
      });
    };

    processSemester(2, 1, tempMandatory['2-1']);
    processSemester(2, 2, tempMandatory['2-2']);
    processSemester(3, 1, tempMandatory['3-1']);
    processSemester(3, 2, tempMandatory['3-2']);

    // Process Selection Groups
    const newGroups: SelectionGroup[] = tempGroups.map((g, idx) => ({
      id: `선택군${idx + 1}`,
      grade: g.grade,
      semester: g.semester,
      selectCount: g.selectCount,
      credits: g.credits || 3,
      description: `${g.grade}학년 ${g.semester} 선택과목군 ${idx + 1} (택${g.selectCount})`,
      subjects: g.subjects.split(',').map((s: string) => ({
        name: s.trim(),
        semesters: g.semester === '1학기' ? [1] : [2]
      })).filter((s: any) => s.name !== '')
    }));

    const finalSchoolName = customSchoolName.trim() || '직접 등록 고등학교';
    const newSchoolId = `custom_school_${Date.now()}`;
    const newSchool: SchoolCurriculum = {
      id: newSchoolId,
      name: finalSchoolName,
      shortName: finalSchoolName.length > 6 ? finalSchoolName.slice(0, 5) : finalSchoolName,
      typeBadge: '직접 입력',
      location: '사용자 설정',
      year: '2027학년도 입학생 (2022 개정)',
      description: '사용자가 직접 입력한 맞춤 교육과정 편성표입니다.',
      tags: ['직접 입력', '2022 개정'],
      mandatory: newMandatory,
      groups: newGroups
    };

    setSchools(prev => [...prev, newSchool]);
    setSelectedSchoolId(newSchoolId);
    setShowCustomForm(false);
    setCustomSchoolName('');
    alert(`[${finalSchoolName}] 교육과정이 등록되었습니다.`);
  };

  // All majors flattened for global search
  const allMajors = useMemo(() => {
    return FIELD_DATA.flatMap(field => 
      field.majors.map(major => ({ ...major, fieldName: field.name }))
    );
  }, []);

  // Filtered majors based on search term
  const searchResults = useMemo(() => {
    if (!searchTerm.trim()) return [];
    return allMajors.filter(major => 
      major.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, allMajors]);

  // Exclusive subfields to prevent cross-matching unrelated sub-disciplines
  const EXCLUSIVE_SUBFIELDS = [
    { tag: '산업경영공학', keywords: ['산업경영', '산업공학', '산업시스템', '기술경영', '테크놀로지경영', 'it경영', '시스템경영', '경영공학', '공학경영', '기술창업'] },
    { tag: '일반경영', keywords: ['경영학과', '경영학부', '경영학', '경영대학', '경영전공', '글로벌경영', '국제경영', '경영정보', '경영'] },
    { tag: '경제', keywords: ['경제학', '경제금융', '글로벌경제', '응용경제', '농업경제', '식품자원경제', '경제'] },
    { tag: '뷰티', keywords: ['뷰티', '미용', '헤어', '메이크업', '에스테틱', '화장품'] },
    { tag: '실내', keywords: ['실내', '인테리어', '실내건축', '공간디자인'] },
    { tag: '테크놀로지', keywords: ['테크놀로지', '공학디자인'] },
    { tag: '패션', keywords: ['패션', '의류', '의상', '텍스타일', '섬유'] },
    { tag: '시각', keywords: ['시각', '커뮤니케이션', '시각정보', '시각영상', '그래픽디자인'] },
    { tag: '산업', keywords: ['산업디자인', '제품디자인', '공업디자인'] },
    { tag: '도예공예', keywords: ['공예', '도예', '금속공예', '도자'] },
    { tag: '만화영상', keywords: ['만화', '애니메이션', '웹툰', '캐릭터', '게임그래픽'] },
    { tag: '의예', keywords: ['의예', '의학', '의과'] },
    { tag: '치의예', keywords: ['치의예', '치의학', '치과'] },
    { tag: '한의예', keywords: ['한의예', '한의학', '한의'] },
    { tag: '수의예', keywords: ['수의예', '수의학', '수의'] },
    { tag: '약학', keywords: ['약학', '제약', '약제'] },
    { tag: '간호', keywords: ['간호'] },
    { tag: '화학공학', keywords: ['화학공', '화공', '응용화학', '에너지화학', '생명화학'] },
    { tag: '순수화학', keywords: ['화학과', '화학전공', '순수화학'] },
    { tag: '기계', keywords: ['기계', '로봇', '자동차', '모빌리티', '항공우주', '메카트로닉스'] },
    { tag: '건축', keywords: ['건축', '건축공', '건축학', '도시공'] },
    { tag: '토목', keywords: ['토목', '건설환경', '인프라', '사회기반'] },
    { tag: '전자전기', keywords: ['전자', '전기', '전기전자', '전자전기', '반도체'] },
    { tag: '환경에너지', keywords: ['환경', '환경공', '에너지환경', '사회에너지', '지구환경'] }
  ];

  const GENERIC_MAJOR_WORDS = new Set(['디자인', '공학', '융합', '시스템', '공학부', '학부', '학과', '전공', '계열', '대학', '경영']);

  const MAJOR_KEYWORD_MAP: Record<string, string[]> = {
    '컴퓨터': ['컴퓨터', '소프트웨어', '인공지능', 'ai', 'sw', '데이터', '정보통신', 'ict', '정보기술', '지능정보', '전산'],
    '소프트웨어': ['소프트웨어', '컴퓨터', '인공지능', 'ai', 'sw', '데이터', '정보보안', '사이버보안', '지능'],
    '인공지능': ['인공지능', 'ai', '데이터', '컴퓨터', '소프트웨어', '지능정보', '인텔리전스', '빅데이터'],
    '전자': ['전자', '전기', '반도체', '정보통신', '제어', '임베디드', '전파', '나노', 'it'],
    '전기': ['전기', '전자', '전력', '전기제어', '전기정보'],
    '에너지': ['에너지', '신재생에너지', '에너지자원', '에너지시스템', '미래에너지'],
    '환경': ['환경', '지구환경', '기후', '환경공학', '생태', '에너지환경'],
    '기계': ['기계', '로봇', '모빌리티', '자동차', '항공', '우주', '메카트로닉스', '정밀'],
    '화학공학': ['화학공', '화공', '응용화학', '에너지화학', '생명화학', '고분자'],
    '생명': ['생명', '바이오', '유전', '의생명', '생물', '분자', '식품생명', '생명과학', '생명공'],
    '신소재': ['신소재', '재료', '고분자', '나노', '금속', '무기재료'],
    '화학': ['화학', '응용화학', '정밀화학'],
    '물리': ['물리', '응용물리', '양자', '물리천문', '천문'],
    '수학': ['수학', '수리', '통계', '응용통계', '데이터과학', '빅데이터', '금융수학'],
    '통계': ['통계', '데이터', '빅데이터', '응용통계', '데이터사이언스'],
    '의예': ['의예', '의학', '의과', '의학부'],
    '치의예': ['치의예', '치의학', '치과'],
    '한의예': ['한의예', '한의학', '한의'],
    '수의예': ['수의예', '수의학', '수의'],
    '약학': ['약학', '제약', '약제'],
    '간호': ['간호'],
    '경영': ['경영', '비즈니스', '글로벌경영', '국제경영', '경영정보', '회계', '재무', '마케팅'],
    '산업공학': ['산업경영', '산업공학', '산업시스템', '기술경영', '테크놀로지경영', '시스템경영', '경영공학'],
    '경제': ['경제', '금융', '통상', '국제통상', '경제금융'],
    '행정': ['행정', '공공', '정책', '도시행정'],
    '정치외교': ['정치', '외교', '국제', '정치외교'],
    '미디어': ['미디어', '신문방송', '언론', '커뮤니케이션', '영상', '콘텐츠', '광고홍보'],
    '시각디자인': ['시각디자인', '커뮤니케이션디자인', '시각정보디자인', '시각영상', '그래픽디자인'],
    '산업디자인': ['산업디자인', '제품디자인', '공업디자인', '운송디자인'],
    '실내디자인': ['실내디자인', '실내건축', '인테리어', '공간디자인'],
    '테크놀로지디자인': ['테크놀로지디자인', '공학디자인', '스마트디자인'],
    '패션디자인': ['패션디자인', '의류', '의상', '텍스타일', '의류디자인', '패션산업'],
    '뷰티디자인': ['뷰티디자인', '뷰티', '미용', '화장품', '헤어디자인', '메이크업', '에스테틱'],
    '건축': ['건축', '도시', '실내건축', '건축공학'],
    '토목': ['토목', '건설', '인프라', '사회기반', '건설환경', '도시인프라'],
    '식품': ['식품', '영양', '식품생명', '식품가공', '외식', '식품영양'],
    '국어': ['국어', '국문', '한국어', '한국어문'],
    '영어': ['영어', '영문', '영어영문'],
    '교육': ['교육', '사범', '수학교육', '국어교육', '영어교육', '과학교육', '초등교육'],
    '체육': ['체육', '스포츠', '운동', '사회체육', '체육교육', '스포츠과학', '스포츠건강', '특수체육', '태권도', '경호', '건강재활', '운동처방'],
    '스포츠': ['체육', '스포츠', '운동', '사회체육', '체육교육', '스포츠과학', '스포츠건강', '특수체육', '스포츠산업', '건강재활'],
    '자유전공': ['자유전공', '자율전공', '계열선발', '통합모집', '자유전공학부']
  };

  const cleanMajorStr = (name: string) => {
    if (!name) return '';
    return name
      .replace(/\([^)]*\)/g, '')
      .replace(/\[[^\]]*\]/g, '')
      .replace(/\s+/g, '')
      .replace(/(학과|학부|전공|계열|대학)$/g, '')
      .toLowerCase();
  };

  const isMajorMatch = (selectedName: string, tipMajor: string) => {
    const sClean = cleanMajorStr(selectedName);
    const tClean = cleanMajorStr(tipMajor);
    
    if (!sClean || !tClean) return false;

    // 0. Exclude broad generic colleges (공과대학, 자연계열 등) when selecting a specific major
    const BROAD_COLLEGES = [
      '공과대학', '공학계열', '자연과학대학', '자연과학부', '자연계열', '인문대학', 
      '인문계열', '사회과학대학', '사회과학부', '사회계열', '사범대학', '자유전공학부', 
      '단과대학', 'ict융합대학', '소프트웨어융합대학', '인문사회계열', '융합전공학부'
    ];
    const normTip = tipMajor.replace(/\s+/g, '').toLowerCase();
    const normSel = selectedName.replace(/\s+/g, '').toLowerCase();
    if (BROAD_COLLEGES.some(b => normTip === b || normTip.startsWith(b)) && !BROAD_COLLEGES.some(b => normSel === b)) {
      return false;
    }

    // 1. Conflict check for exclusive subfields
    // (e.g. 일반경영 vs 산업경영공학/기술경영, 뷰티 vs 실내/테크놀로지, 의예 vs 치의예/한의예)
    for (const sub of EXCLUSIVE_SUBFIELDS) {
      const sMatchesSub = sub.keywords.some(kw => sClean.includes(kw));
      if (sMatchesSub) {
        // s matches this subfield! Verify if t belongs to another conflicting subfield
        const conflictingSub = EXCLUSIVE_SUBFIELDS.find(other => 
          other.tag !== sub.tag && other.keywords.some(kw => tClean.includes(kw))
        );
        if (conflictingSub) {
          // Cross-subfield collision! Disallow match
          return false;
        }
        // If s is specific (e.g. 뷰티, 산업경영공학), t must ALSO match this specific subfield
        const tMatchesSub = sub.keywords.some(kw => tClean.includes(kw));
        if (!tMatchesSub) {
          return false;
        }
      }
    }

    // 2. Direct exact match
    if (sClean === tClean) return true;

    // 2-1. Base stem match (e.g. 건축 -> 건축공학, 건축학부)
    const stripSuffix = (s: string) => s.replace(/(학과|학부|전공|계열|대학|과)$/g, '');
    const baseSel = stripSuffix(normSel);
    const baseTip = stripSuffix(normTip);
    if (baseSel.length >= 2 && baseTip.length >= 2) {
      if (baseTip === baseSel || baseTip.includes(baseSel) || baseSel.includes(baseTip)) {
        return true;
      }
    }

    // 3. Direct substring match (only if neither is purely a generic word)
    const isSGeneric = GENERIC_MAJOR_WORDS.has(sClean);
    const isTGeneric = GENERIC_MAJOR_WORDS.has(tClean);
    if (!isSGeneric && !isTGeneric) {
      if (sClean.length >= 3 && tClean.length >= 3) {
        if (sClean.includes(tClean) || tClean.includes(sClean)) {
          return true;
        }
      }
    }
    
    // 4. Keyword/Synonym matching
    for (const [key, synonyms] of Object.entries(MAJOR_KEYWORD_MAP)) {
      const isSelectedRelated = sClean.includes(cleanMajorStr(key)) || synonyms.some(syn => sClean.includes(cleanMajorStr(syn)));
      if (isSelectedRelated) {
        const isTipRelated = synonyms.some(syn => tClean.includes(cleanMajorStr(syn)));
        if (isTipRelated) return true;
      }
    }

    return false;
  };

  const universityTips = useMemo(() => {
    const search = univSearchTerm.trim().toLowerCase();
    
    return UNIVERSITY_TIPS.filter(tip => {
      // 1. Region filter
      if (univRegionFilter !== '전체') {
        if (tip.location !== univRegionFilter && tip.region !== univRegionFilter) {
          return false;
        }
      }

      // 2. View Mode (major-focused vs all)
      if (univViewMode === 'major') {
        if (!selectedMajor) return false;
        const isMatch = isMajorMatch(selectedMajor.name, tip.major);
        // If there's a search term, allow searching within matching or broad
        if (!isMatch && !search) return false;
        if (!isMatch && search) {
          const matchesSearch = tip.university.toLowerCase().includes(search) || 
                                tip.location.toLowerCase().includes(search) ||
                                tip.major.toLowerCase().includes(search) ||
                                tip.core.toLowerCase().includes(search) ||
                                tip.recommended.toLowerCase().includes(search);
          if (!matchesSearch) return false;
        }
      }

      // 3. Search query filter
      if (search) {
        const matchesSearch = tip.university.toLowerCase().includes(search) || 
                              tip.location.toLowerCase().includes(search) ||
                              tip.major.toLowerCase().includes(search) ||
                              tip.core.toLowerCase().includes(search) ||
                              tip.recommended.toLowerCase().includes(search);
        if (!matchesSearch) return false;
      }
      
      return true;
    });
  }, [selectedMajor, univSearchTerm, univRegionFilter, univViewMode]);

  const subjectsByArea = useMemo(() => {
    if (!selectedMajor) return null;

    const grouped: Record<string, string[]> = {};
    
    selectedMajor.recommendedSubjects.forEach(subjectName => {
      // Find which area this subject belongs to
      let areaFound = '기타';
      for (const [area, subjects] of Object.entries(SUBJECT_AREAS)) {
        if (subjects.includes(subjectName)) {
          areaFound = area;
          break;
        }
      }

      if (!grouped[areaFound]) grouped[areaFound] = [];
      grouped[areaFound].push(subjectName);
    });

    return grouped;
  }, [selectedMajor]);

  const handleFieldSelect = (field: Field) => {
    setSelectedField(field);
    setSelectedMajor(null);
    setSearchTerm(''); // Clear search when picking a field
    setFieldSearchTerm('');
  };

  const handleMajorSelect = (major: Major) => {
    setActiveScreen('explore');
    setSelectedMajor(major);
    setViewMode('plan');
    setConsultantChecks({});
    setFieldSearchTerm('');
    // If we were searching, we might not have the field set
    if (!selectedField) {
      const field = FIELD_DATA.find(f => f.majors.some(m => m.name === major.name));
      if (field) setSelectedField(field);
    }
  };

  const resetSelection = () => {
    setActiveScreen('directory');
    setSelectedField(null);
    setSelectedMajor(null);
    setSearchTerm('');
    setFieldSearchTerm('');
    setConsultantChecks({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredFieldMajors = useMemo(() => {
    if (!selectedField) return [];
    if (!fieldSearchTerm.trim()) return selectedField.majors;
    const term = fieldSearchTerm.toLowerCase().trim();
    return selectedField.majors.filter(m => 
      m.name.toLowerCase().includes(term) ||
      m.recommendedSubjects.some(s => s.toLowerCase().includes(term))
    );
  }, [selectedField, fieldSearchTerm]);

  const handlePrint = () => {
    setErrorMsg(null);
    try {
      window.print();
    } catch (error) {
      console.error('Print failed:', error);
      setErrorMsg('인쇄 기능을 실행할 수 없습니다. 브라우저 설정을 확인해 주세요.');
    }
  };

  const handleDownloadPDF = async () => {
    if (!printRef.current || !selectedMajor || isDownloading) return;

    setIsDownloading(true);
    setErrorMsg(null);
    const originalGrade = planGrade;
    try {
      const element = printRef.current;
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const margin = 15; // 여백 15mm
      const maxAvailableWidth = pdfWidth - (margin * 2);
      const maxAvailableHeight = pdfHeight - (margin * 2);

      // 2학년 → 3학년 순서로 화면을 전환하며 각각 캡처하여 한 PDF에 2페이지로 담는다
      const gradesToExport: (2 | 3)[] = [2, 3];
      for (let i = 0; i < gradesToExport.length; i++) {
        flushSync(() => setPlanGrade(gradesToExport[i]));
        // 레이아웃/폰트 반영 대기
        await new Promise(resolve => setTimeout(resolve, 250));

        // html-to-image: 최신 CSS(oklch) 호환성
        const dataUrl = await toJpeg(element, {
          quality: 0.95,
          backgroundColor: '#ffffff',
          pixelRatio: 2,
        });

        const img = new Image();
        img.src = dataUrl;
        await new Promise((resolve) => (img.onload = resolve));

        // 한 페이지(여백 안)에 맞춰 배치
        let finalWidth = maxAvailableWidth;
        let finalHeight = (img.height * finalWidth) / img.width;
        if (finalHeight > maxAvailableHeight) {
          finalHeight = maxAvailableHeight;
          finalWidth = (img.width * finalHeight) / img.height;
        }
        const xPos = (pdfWidth - finalWidth) / 2;

        if (i > 0) pdf.addPage();
        pdf.addImage(dataUrl, 'JPEG', xPos, margin, finalWidth, finalHeight);
      }

      pdf.save(`2022개정_선택과목가이드_${selectedMajor.name}_2-3학년.pdf`);
    } catch (error: any) {
      console.error('PDF generation failed:', error);
      setErrorMsg(`PDF 생성 실패: 브라우저 호환성 문제. 인쇄(PDF로 저장)를 이용해 주세요.`);
    } finally {
      flushSync(() => setPlanGrade(originalGrade));
      setIsDownloading(false);
    }
  };

  // Helper to determine grading and CSAT info based on 2022 revised curriculum & 2028 CSAT standards
  const getSubjectEval = (name: string, area?: string, type?: SelectionType): SubjectEvaluationInfo => {
    return getSubjectEvaluationInfo(name, area, type);
  };

  // Helper to return colorful pill styling for subject classification types (공통, 일반, 진로, 융합, 전문)
  const getSubjectTypeBadgeStyle = (type: string) => {
    switch (type) {
      case '공통':
        return {
          bg: '#e0f2fe',
          text: '#0369a1',
          border: '#7dd3fc',
          label: '공통 과목'
        };
      case '일반':
        return {
          bg: '#dcfce7',
          text: '#15803d',
          border: '#86efac',
          label: '일반 선택'
        };
      case '진로':
        return {
          bg: '#dbeafe',
          text: '#1d4ed8',
          border: '#93c5fd',
          label: '진로 선택'
        };
      case '융합':
        return {
          bg: '#f3e8ff',
          text: '#7e22ce',
          border: '#d8b4fe',
          label: '융합 선택'
        };
      case '전문':
        return {
          bg: '#ede9fe',
          text: '#6d28d9',
          border: '#c4b5fd',
          label: '전문 선택'
        };
      default:
        return {
          bg: '#f1f5f9',
          text: '#334155',
          border: '#cbd5e1',
          label: `${type} 선택`
        };
    }
  };

  // 교과군 표시 렌더러 (제2외국어 / 한문 및 학기제 교차 교과군을 줄바꿈하여 가독성 개선)
  const renderAreaName = (areaName: string, isHeader: boolean = false) => {
    if (areaName.includes('제2외국어') || areaName === '제2외국어/한문') {
      if (isHeader) {
        return '제2외국어 / 한문';
      }
      return (
        <div style={{ lineHeight: '1.25', textAlign: 'center', display: 'inline-block' }}>
          <span>제2외국어</span>
          <br />
          <span style={{ color: '#475569', fontSize: '0.78rem', fontWeight: '700' }}>/ 한문</span>
        </div>
      );
    }
    if (areaName.includes('기술·가정') && areaName.includes('예술')) {
      if (isHeader) {
        return '기술·가정 / 예술';
      }
      return (
        <div style={{ lineHeight: '1.25', textAlign: 'center', display: 'inline-block' }}>
          <span style={{ color: '#0f172a', fontWeight: '800' }}>기술·가정</span>
          <br />
          <span style={{ color: '#2563eb', fontSize: '0.74rem', fontWeight: '800' }}>/ 예술</span>
        </div>
      );
    }
    if (areaName.includes('정보') && areaName.includes('예술')) {
      if (isHeader) {
        return '정보 / 예술';
      }
      return (
        <div style={{ lineHeight: '1.25', textAlign: 'center', display: 'inline-block' }}>
          <span style={{ color: '#0f172a', fontWeight: '800' }}>정보</span>
          <br />
          <span style={{ color: '#2563eb', fontSize: '0.74rem', fontWeight: '800' }}>/ 예술</span>
        </div>
      );
    }
    if (areaName.includes('기술·가정') && areaName.includes('정보')) {
      if (isHeader) {
        return '기술·가정 / 정보';
      }
      return (
        <div style={{ lineHeight: '1.25', textAlign: 'center', display: 'inline-block' }}>
          <span>기술·가정</span>
          <br />
          <span style={{ color: '#475569', fontSize: '0.78rem', fontWeight: '700' }}>/ 정보</span>
        </div>
      );
    }
    if (areaName.includes(' / ')) {
      const parts = areaName.split(' / ');
      if (isHeader) return areaName;
      return (
        <div style={{ lineHeight: '1.25', textAlign: 'center', display: 'inline-block' }}>
          <span style={{ color: '#0f172a', fontWeight: '800' }}>{parts[0]}</span>
          <br />
          <span style={{ color: '#2563eb', fontSize: '0.74rem', fontWeight: '800' }}>/ {parts[1]}</span>
        </div>
      );
    }
    return areaName;
  };

  const handleOpenSubjectModal = (subjectName: string) => {
    const detail = getSubjectDetail(subjectName);
    setSelectedSubjectModal(detail);
  };

  interface UnivDesignationItem {
    univ: string;
    major: string;
    type: '핵심과목' | '권장과목';
  }

  // Calculate relevance score to rank directly corresponding departments first
  const getMajorRelevanceScore = (selectedMajor: string, tipMajor: string): number => {
    const rawSel = selectedMajor.replace(/\s+/g, '').toLowerCase();
    const rawTip = tipMajor.replace(/\s+/g, '').toLowerCase();
    const sClean = cleanMajorStr(selectedMajor);
    const tClean = cleanMajorStr(tipMajor);

    // 1. Exact match (e.g. 전자공학과 === 전자공학과)
    if (rawSel === rawTip) return 1000;
    if (sClean === tClean) return 950;

    // 2. Exact major prefix / direct department (e.g. 전자공학과 vs 전자공학부, 전자공학전공)
    if (rawTip.startsWith(sClean) || rawTip.startsWith(rawSel)) return 920;

    // Direct user-specified priority for 전자 / 전기:
    // User requested: 직접적으로 해당하는 학과 (전자공학과 -> 전기공학과 -> 전자전기공학과 순서대로)
    if (rawSel.includes('전자')) {
      // 1) 전자공학과 / 전자공학부 / 전자 (전기 미포함 단독 전자)
      if (rawTip.includes('전자공학') || (rawTip.includes('전자') && !rawTip.includes('전기'))) {
        return 900;
      }
      // 2) 전기공학과 / 전기공학부 (전자 미포함 단독 전기)
      if (rawTip.includes('전기공학') || (rawTip.includes('전기') && !rawTip.includes('전자'))) {
        return 820;
      }
      // 3) 전자전기 / 전기전자
      if (rawTip.includes('전자전기') || rawTip.includes('전기전자')) {
        return 800;
      }
      // 4) 반도체
      if (rawTip.includes('반도체')) return 720;
      return 650;
    }

    if (rawSel.includes('전기')) {
      if (rawTip.includes('전기공학') || (rawTip.includes('전기') && !rawTip.includes('전자'))) return 900;
      if (rawTip.includes('전자공학') || (rawTip.includes('전자') && !rawTip.includes('전기'))) return 820;
      if (rawTip.includes('전기전자') || rawTip.includes('전자전기')) return 800;
      return 650;
    }

    // Direct contains of clean name (e.g. 건축학과 vs 건축공학과, 건축학부)
    if (rawTip.includes(sClean) || sClean.includes(tClean)) return 850;

    const stripSuffix = (s: string) => s.replace(/(학과|학부|전공|계열|대학|과)$/g, '');
    const baseSel = stripSuffix(rawSel);
    const baseTip = stripSuffix(rawTip);
    if (baseSel.length >= 2 && (baseTip === baseSel || baseTip.startsWith(baseSel) || baseTip.includes(baseSel))) {
      return 800;
    }

    return 500;
  };

  const getUnivDesignationsForSubject = (subjectName: string, majorName?: string): UnivDesignationItem[] => {
    const norm = (s: string) => s.replace(/\s+/g, '').toLowerCase();
    const target = norm(subjectName);

    const matches: UnivDesignationItem[] = [];

    for (const tip of UNIVERSITY_TIPS) {
      // If user selected a specific major, ONLY show universities & majors matching that selected major (or its similar majors)
      if (majorName && !isMajorMatch(majorName, tip.major)) {
        continue;
      }

      const cores = tip.core.split(/[,/·\n]/).map(s => norm(s.trim())).filter(Boolean);
      const recs = tip.recommended.split(/[,/·\n]/).map(s => norm(s.trim())).filter(Boolean);

      const isCore = cores.some(c => c === target || (target.length >= 2 && (c.includes(target) || target.includes(c))));
      const isRec = recs.some(r => r === target || (target.length >= 2 && (r.includes(target) || target.includes(r))));

      if (isCore) {
        matches.push({ univ: tip.university, major: tip.major, type: '핵심과목' });
      } else if (isRec) {
        matches.push({ univ: tip.university, major: tip.major, type: '권장과목' });
      }
    }

    // Sort:
    // 1. Directly corresponding major relevance (전자공학과 -> 전기공학과 -> 전자전기공학과 순)
    // 2. 핵심과목 first, then 권장과목
    // 3. University name (ko locale)
    matches.sort((a, b) => {
      if (majorName) {
        const scoreA = getMajorRelevanceScore(majorName, a.major);
        const scoreB = getMajorRelevanceScore(majorName, b.major);
        if (scoreA !== scoreB) {
          return scoreB - scoreA;
        }
      }
      if (a.type !== b.type) return a.type === '핵심과목' ? -1 : 1;
      return a.univ.localeCompare(b.univ, 'ko');
    });

    const seen = new Set<string>();
    return matches.filter(item => {
      const key = `${item.univ}_${item.major}_${item.type}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  };

  // Set of subject keys ("grade-groupId-subjectName-semester") that AI recommends,
  // strictly capped at each group's selectCount (e.g. 택6이면 상위 6과목만 AI 추천 활성화)
  const aiRecommendedKeys = useMemo<Set<string>>(() => {
    const result = new Set<string>();
    if (!selectedMajor) return result;

    const recList = selectedMajor.recommendedSubjects || [];

    [2, 3].forEach(g => {
      const groups = (selectedSchool.groups || []).filter(grp => grp.grade === g);
      groups.forEach(grp => {
        const selectLimit = grp.selectCount || 999;

        // 해당 선택군 내에서 전공 추천과목과 일치하는 과목 추출
        const matchingSubs = grp.subjects.filter(sub =>
          recList.some(r => normalizeSubjectName(r) === normalizeSubjectName(sub.name))
        );

        // 핵심과목/권장과목 우선순위 점수 부여
        const scoredSubs = matchingSubs.map(sub => {
          const norm = normalizeSubjectName(sub.name);
          const designations = getUnivDesignationsForSubject(sub.name, selectedMajor.name);
          let score = 0;
          if (designations.some(d => d.type === '핵심과목')) score += 300;
          if (designations.some(d => d.type === '권장과목')) score += 150;
          const recIdx = recList.findIndex(r => normalizeSubjectName(r) === norm);
          if (recIdx !== -1) score += Math.max(0, 100 - recIdx);
          return { sub, score };
        });

        scoredSubs.sort((a, b) => b.score - a.score);

        // 선택군 정원(selectCount)만큼만 AI 추천으로 채택
        const topSubs = scoredSubs.slice(0, selectLimit);
        topSubs.forEach(({ sub }) => {
          sub.semesters.forEach(sem => {
            result.add(`${g}-${grp.id}-${sub.name}-${sem}`);
          });
        });
      });
    });

    return result;
  }, [selectedMajor, selectedSchool]);

  // Structured data for the plan view (grouped by selection group AND academic area)
  const planData = useMemo(() => {
    if (!selectedMajor) return [];
    
    const groupsToUse = selectedSchool.groups;
    
    return groupsToUse.filter(g => g.grade === planGrade).map(group => {
      const subjectsWithMetadata = group.subjects.map(subject => {
        const normalizedName = normalizeSubjectName(subject.name);
        const areas = getSubjectAreas(subject.name);
        const area = areas.length > 1 ? formatAreasDisplay(areas, subject.name) : (areas[0] || '기타');
        const typeKey = Object.keys(SUBJECT_TYPES).find(k => normalizeSubjectName(k) === normalizedName);
        const type = (typeKey ? SUBJECT_TYPES[typeKey] : '일반') as SelectionType;
        const isRecommended = subject.semesters.some(sem => 
          aiRecommendedKeys.has(`${planGrade}-${group.id}-${subject.name}-${sem}`)
        );
        const evalInfo = getSubjectEval(subject.name, areas[0] || '공통', type);
        return { ...subject, area, type, isRecommended, gradingType: evalInfo.displayTitle, evalInfo };
      });

      // Group by area
      const groupedByArea: Record<string, typeof subjectsWithMetadata> = {};
      subjectsWithMetadata.forEach(s => {
        if (!groupedByArea[s.area]) groupedByArea[s.area] = [];
        groupedByArea[s.area].push(s);
      });

      return {
        ...group,
        formattedLabel: `${group.id} [택${group.selectCount}] (${group.credits || 3}학점)`,
        groupedSubjects: Object.entries(groupedByArea).map(([area, subjects]) => ({
          area,
          subjects
        }))
      };
    });
  }, [selectedMajor, planGrade, selectedSchool, aiRecommendedKeys]);

  // 1학기 과목 쭉 나오고, 2학기 과목 쭉 나오는 순서로 정렬된 필수 과목 목록 (1학기 전용 -> 양학기/교차 -> 2학기 전용)
  const sortedMandatorySubjects = useMemo(() => {
    const rawList = selectedSchool?.mandatory?.[planGrade] || [];
    const sem1Only = rawList.filter((s: any) => s && s.semesters?.includes(1) && !s.semesters?.includes(2));
    const bothSem = rawList.filter((s: any) => s && s.semesters?.includes(1) && s.semesters?.includes(2));
    const sem2Only = rawList.filter((s: any) => s && !s.semesters?.includes(1) && s.semesters?.includes(2));
    const others = rawList.filter((s: any) => s && !s.semesters?.includes(1) && !s.semesters?.includes(2));
    return [...sem1Only, ...bothSem, ...sem2Only, ...others];
  }, [selectedSchool, planGrade]);

  // Checkbox state logic for plan table:
  // - 'ai': AI-recommended (Blue Check)
  // - 'consultant': Consultant-checked (Green Check)
  // - 'off': Unchecked (Empty)
  const getCellCheckState = (
    grade: number,
    groupId: string,
    subjectName: string,
    semester: number,
    isAiRecommended?: boolean
  ): 'ai' | 'consultant' | 'off' => {
    const key = `${grade}-${groupId}-${subjectName}-${semester}`;
    const override = consultantChecks[key];
    if (override === 'consultant') return 'consultant';
    if (override === 'off') return 'off';
    if (aiRecommendedKeys.has(key)) return 'ai';
    return isAiRecommended ? 'ai' : 'off';
  };

  // 선택군 내 현재 선택된 과목 수 계산 (AI 추천 또는 컨설턴트 체크된 과목 수)
  const getGroupSelectedCount = (
    grade: number,
    group: SelectionGroup
  ): number => {
    let count = 0;
    for (const sub of group.subjects) {
      const isSelected = sub.semesters.some(sem => {
        const state = getCellCheckState(grade, group.id, sub.name, sem);
        return state === 'ai' || state === 'consultant';
      });
      if (isSelected) count++;
    }
    return count;
  };

  const handleToggleCell = (
    grade: number,
    groupId: string,
    subjectName: string,
    semester: number,
    isAiRecommended?: boolean
  ) => {
    const key = `${grade}-${groupId}-${subjectName}-${semester}`;
    const currentState = getCellCheckState(grade, groupId, subjectName, semester, isAiRecommended);

    if (currentState === 'consultant' || currentState === 'ai') {
      // 선택 해제는 항상 가능 (과목 수 감소)
      setConsultantChecks(prev => ({ ...prev, [key]: 'off' }));
    } else {
      // 선택 추가 시도: 선택군의 택 N개(selectCount) 상한 도달 여부 엄격 검증
      const group = (selectedSchool.groups || []).find(g => g.id === groupId && g.grade === grade);
      if (group && group.selectCount) {
        const currentCount = getGroupSelectedCount(grade, group);
        if (currentCount >= group.selectCount) {
          const groupTitle = group.description || group.name || `${group.id} [택${group.selectCount}]`;
          showToast(
            `⚠️ [선택 불가] ${groupTitle}의 최대 선택 가능 과목 수(${group.selectCount}개)를 초과할 수 없습니다.\n현재 ${currentCount}개가 이미 선택되어 있으므로, 다른 과목의 선택을 먼저 해제해 주세요.`
          );
          return;
        }
      }
      // 상한 이내이므로 컨설턴트 녹색 체크로 추가
      setConsultantChecks(prev => ({ ...prev, [key]: 'consultant' }));
    }
  };

  // AI 추천(파란 체크)을 해지했던 칸을 다시 파란 체크로 복원
  const handleRestoreAiCell = (
    grade: number,
    groupId: string,
    subjectName: string,
    semester: number
  ) => {
    const key = `${grade}-${groupId}-${subjectName}-${semester}`;
    const group = (selectedSchool.groups || []).find(g => g.id === groupId && g.grade === grade);
    if (group && group.selectCount) {
      const subj = group.subjects.find(sb => sb.name === subjectName);
      const alreadyCounted = !!subj && subj.semesters.some(sem => {
        if (sem === semester) return false;
        const st = getCellCheckState(grade, groupId, subjectName, sem);
        return st === 'ai' || st === 'consultant';
      });
      if (!alreadyCounted && getGroupSelectedCount(grade, group) >= group.selectCount) {
        showToast(`⚠️ [선택 불가] 선택군 정원(${group.selectCount}개)이 모두 선택되어 있습니다.\n다른 과목의 선택을 먼저 해지해 주세요.`);
        return;
      }
    }
    setConsultantChecks(prev => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const handleResetConsultantChecks = () => {
    setConsultantChecks({});
  };

  const hasConsultantChanges = useMemo(() => {
    return Object.keys(consultantChecks).length > 0;
  }, [consultantChecks]);

  // Active choices across AI recommendations and consultant overrides for Graduation Requirements calculation
  const activePlanChoices = useMemo(() => {
    const result: Record<string, boolean> = {};
    if (!selectedMajor) return result;

    [2, 3].forEach(g => {
      (selectedSchool.groups || []).filter(grp => grp.grade === g).forEach(grp => {
        grp.subjects.forEach(sub => {
          [1, 2].forEach(sem => {
            if (sub.semesters.includes(sem)) {
              const key = `${g}-${grp.id}-${sub.name}-${sem}`;
              const state = getCellCheckState(g, grp.id, sub.name, sem);
              result[key] = (state === 'ai' || state === 'consultant');
            }
          });
        });
      });
    });
    return result;
  }, [selectedMajor, selectedSchool, consultantChecks, aiRecommendedKeys]);

  const renderSemesterCheckbox = (
    grade: number,
    groupId: string,
    subjectName: string,
    semester: number,
    isAiRecommended: boolean
  ) => {
    // 필수 과목은 말풍선(툴팁) 및 모달 없이 기본 체크 상태만 표시
    if (groupId === 'mandatory') {
      return (
        <div
          style={{
            width: '1.35rem',
            height: '1.35rem',
            borderRadius: '0.35rem',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#eff6ff',
            border: '2px solid #2563eb',
            margin: '0 auto',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
            cursor: 'default'
          }}
        >
          <Check style={{ width: '0.95rem', height: '0.95rem', color: '#1d4ed8', strokeWidth: 3 }} />
        </div>
      );
    }

    const state = getCellCheckState(grade, groupId, subjectName, semester, isAiRecommended);

    const group = (selectedSchool.groups || []).find(g => g.id === groupId && g.grade === grade);
    const selectLimit = group?.selectCount || 999;
    const currentCount = group ? getGroupSelectedCount(grade, group) : 0;
    const isFull = currentCount >= selectLimit;
    // AI 추천이었으나 사용자가 해지한 칸(성적 등 사유): 대학별 지정 현황은 계속 확인 가능
    const cellKey = `${grade}-${groupId}-${subjectName}-${semester}`;
    const isReleased = state === 'off' && consultantChecks[cellKey] === 'off' && aiRecommendedKeys.has(cellKey);
    const isBlocked = state === 'off' && isFull && !isReleased;

    const designations = getUnivDesignationsForSubject(subjectName, selectedMajor?.name);
    const topDesignations = designations.slice(0, 5);
    const hasMajorDesignations = designations.length > 0;

    const designationTooltip = hasMajorDesignations
      ? `${subjectName} ${semester}학기 — [${selectedMajor?.name || '선택 전공'}] 대학별 지정 현황\n` +
        topDesignations.map(d => `${d.univ} ${d.major} (${d.type})`).join('\n') +
        (designations.length > 5 ? `\n외 ${designations.length - 5}개 모집단위 (클릭 시 전체 대학 지정 현황)` : '\n(클릭 시 대학별 지정 현황 확인)')
      : `${subjectName} ${semester}학기: 추천 과목 (클릭 시 해제)`;

    const blockedTooltip = `${subjectName} ${semester}학기: [선택 불가] 선택군 정원(${selectLimit}개)이 모두 선택되었습니다. (현재 ${currentCount}/${selectLimit}개 선택 완료 - 다른 과목을 해제한 후 선택 가능)`;

    return (
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          if ((state === 'ai' || isReleased) && hasMajorDesignations) {
            setUnivDesignationModal({
              subjectName,
              semester,
              grade,
              groupId,
              isAiRecommended
            });
          } else {
            handleToggleCell(grade, groupId, subjectName, semester, isAiRecommended);
          }
        }}
        title={
          state === 'ai'
            ? designationTooltip
            : state === 'consultant'
            ? `${subjectName} ${semester}학기: 컨설턴트 상담 선택 (클릭 시 해제)`
            : isReleased
            ? `${subjectName} ${semester}학기: 권장·핵심과목이지만 선택 해지됨 (클릭 시 대학별 지정 현황 확인 · 다시 선택)`
            : isBlocked
            ? blockedTooltip
            : `${subjectName} ${semester}학기: 미선택 (클릭하여 선택)`
        }
        style={{
          width: '1.35rem',
          height: '1.35rem',
          borderRadius: '0.35rem',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: isBlocked ? 'not-allowed' : 'pointer',
          transition: 'all 0.15s ease',
          backgroundColor: state === 'ai' ? '#eff6ff' : state === 'consultant' ? '#f0fdf4' : isReleased ? '#f8fafc' : isBlocked ? '#f8fafc' : '#ffffff',
          border: state === 'ai' ? '2px solid #2563eb' : state === 'consultant' ? '2px solid #16a34a' : isReleased ? '1.5px dashed #60a5fa' : isBlocked ? '1.5px dashed #cbd5e1' : '1.5px solid #cbd5e1',
          opacity: isBlocked ? 0.6 : 1,
          padding: 0,
          margin: '0 auto',
          boxShadow: state !== 'off' ? '0 1px 3px rgba(0, 0, 0, 0.08)' : 'none'
        }}
        className={
          state === 'ai'
            ? 'hover:bg-blue-100 hover:border-blue-700 hover:scale-110 active:scale-95'
            : state === 'consultant'
            ? 'hover:bg-green-100 hover:border-green-700 hover:scale-110 active:scale-95'
            : isBlocked
            ? 'opacity-60 cursor-not-allowed hover:border-rose-400 hover:bg-rose-50/50'
            : 'hover:border-blue-400 hover:bg-slate-50 hover:scale-105 active:scale-95'
        }
      >
        {state === 'ai' && (
          <Check style={{ width: '0.95rem', height: '0.95rem', color: '#2563eb', strokeWidth: 3 }} />
        )}
        {state === 'consultant' && (
          <Check style={{ width: '0.95rem', height: '0.95rem', color: '#16a34a', strokeWidth: 3 }} />
        )}
        {isReleased && (
          <Check style={{ width: '0.95rem', height: '0.95rem', color: '#93c5fd', strokeWidth: 3, opacity: 0.55 }} />
        )}
        {isBlocked && (
          <span style={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: 'bold' }}>✕</span>
        )}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 print:bg-white">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm print:hidden">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 cursor-pointer shrink-0" onClick={resetSelection}>
            <div className="bg-blue-600 p-2 rounded-lg shadow-md shadow-blue-100">
              <BookOpen className="text-white w-5 h-5" />
            </div>
            <div className="hidden sm:block leading-tight">
              <h1 className="font-bold text-xl tracking-tight">
                성남지역 고등학교 <span className="text-blue-600">선택과목 가이드</span>
                <span className="text-xs font-semibold text-slate-500 ml-2.5 hidden xl:inline">
                  · 제작 : 숭신고등학교 진로전담교사 김강석
                </span>
              </h1>
              <p className="text-[11px] font-medium text-slate-500 mt-0.5">
                2022 개정교육과정 · 학교별 편제표 · 대학별 권장과목
              </p>
            </div>
            <h1 className="font-bold text-xl tracking-tight sm:hidden">
              성남 과목 가이드
            </h1>
          </div>
          
          <div className="flex-1 max-w-xl flex items-center justify-end gap-2">
            {/* School Directory button */}
            <button
              type="button"
              onClick={handleBackToSchoolDirectory}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 border ${
                activeScreen === 'directory' && !selectedMajor
                  ? 'bg-blue-50 text-blue-700 border-blue-200 font-extrabold shadow-2xs'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
              }`}
              title="첫 화면: 성남시 관내 고등학교 목록"
            >
              <School className="w-3.5 h-3.5 text-blue-600" />
              <span className="hidden sm:inline">고등학교 목록</span>
              <span className="sm:hidden">학교목록</span>
            </button>

            {/* Explore / Major Selection button */}
            <button
              type="button"
              onClick={() => {
                setActiveScreen('explore');
                setSelectedMajor(null);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 border ${
                (activeScreen === 'explore' || selectedMajor)
                  ? 'bg-blue-50 text-blue-700 border-blue-200 font-extrabold shadow-2xs'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
              }`}
              title="희망 진학 학과 선택 및 과목 가이드"
            >
              <LayoutGrid className="w-3.5 h-3.5 text-blue-600" />
              <span className="hidden sm:inline">학과 선택</span>
              <span className="sm:hidden">학과선택</span>
            </button>

            {/* Quick School Selector in Header */}
            <div className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200/80 px-2.5 py-1.5 rounded-xl border border-slate-200 transition-all shrink-0">
              <span className="text-[11px] font-semibold text-slate-500 hidden md:inline">기준학교:</span>
              <select
                value={selectedSchoolId}
                onChange={(e) => {
                  setSelectedSchoolId(e.target.value);
                }}
                className="bg-transparent text-xs font-bold text-slate-800 outline-none cursor-pointer pr-1 max-w-[120px] sm:max-w-none truncate"
                title="기준 고등학교 선택"
              >
                {[...schools]
                  .filter(s => !isNoCurriculumSchool(s))
                  .sort((a, b) => (a.shortName || a.name).localeCompare(b.shortName || b.name, 'ko'))
                  .map((s, idx) => (
                    <option key={`${s.id}-${idx}`} value={s.id}>
                      {s.shortName || s.name} ({s.typeBadge})
                    </option>
                  ))}
              </select>
            </div>

            <input 
              type="file"
              ref={fileInputRef}
              onChange={handlePdfUpload}
              accept=".pdf"
              className="hidden"
            />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 print:p-0 print:max-w-none">
        {!selectedMajor ? (
          activeScreen === 'directory' ? (
            /* ============================================================ */
            /* SCREEN 1: 첫 화면 (성남시 관내 고등학교 목록 및 학과 탐색) */
            /* ============================================================ */
            <div className="space-y-6">
              {/* Hero Banner */}
              <section className="text-center pt-2 pb-3 space-y-3 max-w-3xl mx-auto">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-50 border border-blue-200/80 text-blue-700 rounded-full text-xs font-bold tracking-tight shadow-2xs">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>성남시 고등학교 진로·진학 가이드</span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                  성남시 관내 고등학교 <span className="text-blue-600">학교 선택</span>
                </h2>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
                  성남시 관내 고등학교 목록입니다.<br className="hidden sm:inline" />
                  학교를 클릭하시면 희망 진학 학과 선택 및 맞춤 과목 설계 화면으로 바로 이동합니다.
                </p>
                <div className="pt-0.5">
                  <span className="inline-block text-xs font-bold text-slate-700 bg-slate-100/90 border border-slate-200 px-3 py-1 rounded-full">
                    제작 : 숭신고등학교 진로전담교사 김강석
                  </span>
                </div>
              </section>

              {/* KPI Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between">
                  <div>
                    <span className="text-xs font-medium text-slate-500">성남시 관내 고교</span>
                    <div className="text-2xl font-black text-slate-900 mt-0.5">총 {schoolCounts.all}개교</div>
                    <span className="text-[11px] text-slate-400">분당 {schoolCounts.bundang} · 수정 {schoolCounts.sujeong} · 중원 {schoolCounts.jungwon}</span>
                  </div>
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                    <School className="w-6 h-6" />
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-indigo-200/80 bg-indigo-50/20 shadow-2xs flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-indigo-700">8대 학문 분야</span>
                    <div className="text-2xl font-black text-indigo-900 mt-0.5">총 8개 계열</div>
                    <span className="text-[11px] text-indigo-600 font-medium">인문·사회·경영·자연·공학·의약·교육·예체능</span>
                  </div>
                  <div className="p-3 bg-indigo-600 text-white rounded-xl shadow-xs">
                    <LayoutGrid className="w-6 h-6" />
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-emerald-200/80 bg-emerald-50/20 shadow-2xs flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-emerald-800">대학 전공 학과</span>
                    <div className="text-2xl font-black text-emerald-900 mt-0.5">총 {allMajors.length}개 학과</div>
                    <span className="text-[11px] text-emerald-700">학과별 권장 선택과목 및 진로 가이드</span>
                  </div>
                  <div className="p-3 bg-emerald-100 text-emerald-800 rounded-xl">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                </div>
              </div>

              {/* School Directory Card */}
              <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
                {/* Filter Toolbar */}
                <div className="flex flex-col gap-3 border-b border-slate-100 pb-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    {/* District Tabs */}
                    <div className="flex items-center gap-1.5 bg-slate-100/80 p-1 rounded-xl border border-slate-200/80 overflow-x-auto shrink-0">
                      {(['전체', '분당구', '수정구', '중원구'] as const).map((tab, idx) => (
                        <button
                          key={`${tab}-${idx}`}
                          type="button"
                          onClick={() => setSchoolDistrictFilter(tab)}
                          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                            schoolDistrictFilter === tab
                              ? 'bg-white text-blue-600 shadow-2xs font-black'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          {tab}
                          <span className={`ml-1.5 text-[10px] px-1.5 py-0.2 rounded-full ${
                            schoolDistrictFilter === tab ? 'bg-blue-100 text-blue-700 font-bold' : 'bg-slate-200 text-slate-500'
                          }`}>
                            {tab === '전체' ? schoolCounts.all :
                             tab === '분당구' ? schoolCounts.bundang :
                             tab === '수정구' ? schoolCounts.sujeong : schoolCounts.jungwon}
                          </span>
                        </button>
                      ))}
                      {schoolCounts.custom > 0 && (
                        <button
                          type="button"
                          onClick={() => setSchoolDistrictFilter('사용자 등록')}
                          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                            schoolDistrictFilter === '사용자 등록'
                              ? 'bg-white text-amber-700 shadow-2xs font-black'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          직접 등록
                          <span className="ml-1.5 text-[10px] px-1.5 py-0.2 rounded-full bg-amber-100 text-amber-800">
                            {schoolCounts.custom}
                          </span>
                        </button>
                      )}
                    </div>

                    {/* School Count Info */}
                    <div className="text-xs font-semibold text-slate-500 hidden sm:flex items-center gap-1.5 shrink-0 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
                      <span>조회된 학교:</span>
                      <span className="font-extrabold text-blue-600">{filteredSchools.length}개교</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-1">
                    {/* Live Search Input */}
                    <div className="relative flex-1">
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={schoolSearchQuery}
                        onChange={(e) => setSchoolSearchQuery(e.target.value)}
                        placeholder="학교명 검색 (예: 분당고, 서현고, 낙생고, 숭신고, 성남고...)"
                        className="w-full pl-8 pr-7 py-2 bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl text-xs font-medium outline-none transition-all"
                      />
                      {schoolSearchQuery && (
                        <button
                          type="button"
                          onClick={() => setSchoolSearchQuery('')}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Legend Bar (범례) - 27·26 편제표 삭제 후 홈페이지, 26 운영 현황, 학교 알리미 3종 반영 */}
                <div className="bg-[#1c2434] text-white px-4 py-2.5 rounded-xl shadow-xs flex items-center justify-between gap-3 overflow-x-auto no-scrollbar">
                  <div className="flex items-center gap-3 sm:gap-6 shrink-0 flex-wrap">
                    {/* '범례' 알약 버튼 */}
                    <span className="px-3.5 py-1 bg-white text-slate-900 rounded-full text-xs font-black shadow-xs shrink-0 tracking-tight">
                      범례
                    </span>

                    {/* 1. 홈페이지 */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="w-6 h-6 rounded-md bg-[#7ad1c3] text-slate-900 flex items-center justify-center font-bold shadow-2xs">
                        <Home className="w-3.5 h-3.5" />
                      </span>
                      <span className="text-xs font-bold text-white tracking-tight">학교 홈페이지</span>
                    </div>

                    {/* 2. 26 운영 현황 */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="w-6 h-6 rounded-md bg-[#f4ba40] text-slate-900 flex items-center justify-center font-bold shadow-2xs">
                        <ClipboardCheck className="w-3.5 h-3.5" />
                      </span>
                      <span className="text-xs font-bold text-white tracking-tight">2026 교육과정 운영현황</span>
                    </div>

                    {/* 3. 학교 알리미 */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="w-6 h-6 rounded-md bg-[#98db86] text-slate-900 flex items-center justify-center font-bold shadow-2xs">
                        <BarChart3 className="w-3.5 h-3.5" />
                      </span>
                      <span className="text-xs font-bold text-white tracking-tight">학교 알리미</span>
                    </div>
                  </div>
                </div>

                {/* District Sections: 지역이 위로 나오고, 아래 2단으로 학교가 나오는 레이아웃 */}
                <div className="space-y-6 pt-1">
                  {districtSections.map(({ district, schools: districtSchoolList }) => {
                    // 구별 맞춤 시안 색상 테마: 수정구(틸), 중원구(코발트블루), 분당구(테라코타 브라운)
                    const theme = (() => {
                      switch (district) {
                        case '수정구':
                          return {
                            bg: 'bg-[#136f75]',
                            border: 'border-[#136f75]',
                            text: 'text-[#136f75]',
                            hoverBg: 'hover:bg-teal-50/40',
                            hoverBtnBg: 'hover:bg-[#136f75]'
                          };
                        case '중원구':
                          return {
                            bg: 'bg-[#354e96]',
                            border: 'border-[#354e96]',
                            text: 'text-[#354e96]',
                            hoverBg: 'hover:bg-blue-50/40',
                            hoverBtnBg: 'hover:bg-[#354e96]'
                          };
                        case '분당구':
                          return {
                            bg: 'bg-[#a94e2a]',
                            border: 'border-[#a94e2a]',
                            text: 'text-[#a94e2a]',
                            hoverBg: 'hover:bg-amber-50/40',
                            hoverBtnBg: 'hover:bg-[#a94e2a]'
                          };
                        default:
                          return {
                            bg: 'bg-slate-800',
                            border: 'border-slate-800',
                            text: 'text-slate-800',
                            hoverBg: 'hover:bg-slate-50',
                            hoverBtnBg: 'hover:bg-slate-800'
                          };
                      }
                    })();

                    return (
                      <div key={district} className="space-y-2">
                        {/* 1. 지역이 위로 나오고 (상단 지역 타이틀 바) */}
                        <div className={`${theme.bg} text-white px-5 py-3 rounded-xl flex items-center justify-between shadow-xs transition-colors`}>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-white fill-white" />
                            <span className="font-extrabold text-base sm:text-lg tracking-tight">{district}</span>
                          </div>
                          <span className="text-sm font-bold text-white/95">
                            {districtSchoolList.length}개교
                          </span>
                        </div>

                        {/* 2. 아래 2단으로 학교가 나오는 (2단 학교 리스트) */}
                        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-3.5 sm:p-5">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1">
                            {districtSchoolList.map((school) => {
                              const isSelected = school.id === selectedSchool.id;
                              const foundation = getSchoolFoundation(school);
                              const externalCurriculumUrl = school.externalLink || 
                                (school.id === 'kaywon' ? 'https://docs.google.com/spreadsheets/d/10Eg4xNqRnM38obns-OndbrQeyeGPRVTc/edit?usp=drive_link&ouid=115956131830918785013&rtpof=true&sd=true' : undefined) ||
                                (school.id === 'seongnam_fl' ? 'https://docs.google.com/spreadsheets/d/1MwG1ZzWYLRdDaZNXVQoTfA9S0QhKJVZp/edit?gid=1199729268#gid=1199729268' : undefined);
                              const isNoCurriculum = isNoCurriculumSchool(school) && !externalCurriculumUrl;

                              return (
                                <div
                                  key={school.id}
                                  className={`flex items-center justify-between py-2.5 border-b border-slate-200/80 px-2 sm:px-3 rounded-lg transition-colors group ${
                                    externalCurriculumUrl
                                      ? 'hover:bg-indigo-50/50 cursor-pointer'
                                      : isNoCurriculum 
                                      ? 'bg-slate-50/60 select-none' 
                                      : `${theme.hoverBg}`
                                  }`}
                                  onClick={() => {
                                    if (externalCurriculumUrl) {
                                      window.open(externalCurriculumUrl, '_blank', 'noopener,noreferrer');
                                      showToast(`${school.name} 교육과정 링크를 새 창으로 열었습니다.`);
                                    }
                                  }}
                                >
                                  {/* Left: 학교명 + (공립/사립) + 상태 배지 */}
                                  {externalCurriculumUrl ? (
                                    <a
                                      href={externalCurriculumUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        showToast(`${school.name} 교육과정 링크를 새 창으로 열었습니다.`);
                                      }}
                                      className="flex items-center gap-1.5 min-w-0 pr-2 flex-wrap text-left cursor-pointer group-hover:opacity-95 transition-opacity py-0.5"
                                      title={`${school.name} 2026 교육과정 구글 스프레드시트 새 창 열기`}
                                    >
                                      <span className="font-bold text-sm sm:text-base transition-colors truncate text-indigo-700 group-hover:text-indigo-900 group-hover:underline flex items-center gap-1">
                                        {school.shortName || school.name}
                                        <ExternalLink className="w-3.5 h-3.5 inline shrink-0 opacity-80" />
                                      </span>
                                      <span className="text-xs text-slate-400 font-medium shrink-0">
                                        ({foundation})
                                      </span>
                                      <span 
                                        className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200 shrink-0 inline-flex items-center gap-0.5"
                                        title="외부 교육과정(스프레드시트) 링크가 연결되어 있습니다."
                                      >
                                        교육과정 링크
                                      </span>
                                    </a>
                                  ) : isNoCurriculum ? (
                                    <div
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        showToast(`${school.name}은(는) ${school.typeBadge}으로 교육과정이 없어 학과 선택 페이지로 이동할 수 없습니다. 우측 학교 링크를 이용해 주세요.`);
                                      }}
                                      className="flex items-center gap-1.5 min-w-0 pr-2 flex-wrap cursor-not-allowed select-none opacity-85 py-0.5"
                                      title="특성화고는 고교학점제 일반 선택과목 편제표 대상이 아니므로 클릭하여 이동할 수 없습니다."
                                    >
                                      <span className="font-bold text-sm sm:text-base text-slate-500 cursor-not-allowed truncate">
                                        {school.shortName || school.name}
                                      </span>
                                      <span className="text-xs text-slate-400 font-medium shrink-0">
                                        ({foundation})
                                      </span>
                                      <span 
                                        className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-200/90 text-slate-600 border border-slate-300/80 shrink-0"
                                        title="특성화고는 일반 선택과목 편제표가 제공되지 않습니다."
                                      >
                                        교육과정 없음
                                      </span>
                                    </div>
                                  ) : (
                                    <button
                                      type="button"
                                      onClick={() => handleSelectSchoolAndExplore(school.id)}
                                      className="flex items-center gap-1.5 min-w-0 pr-2 flex-wrap text-left cursor-pointer group-hover:opacity-95 transition-opacity py-0.5"
                                      title={`${school.name} 선택과목 가이드 및 학과 선택 페이지로 이동`}
                                    >
                                      <span className={`font-bold text-sm sm:text-base transition-colors truncate text-slate-900 group-hover:${theme.text}`}>
                                        {school.shortName || school.name}
                                      </span>
                                      <span className="text-xs text-slate-400 font-medium shrink-0">
                                        ({foundation})
                                      </span>
                                      {isSelected && (
                                        <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-800 border border-slate-300 shrink-0">
                                          선택됨
                                        </span>
                                      )}
                                    </button>
                                  )}

                                  {/* Right: 링크 버튼 3종 (홈페이지, 26 운영 현황, 학교 알리미) */}
                                  <div
                                    className="flex items-center gap-1.5 shrink-0"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    {/* 1. 홈페이지 */}
                                    <button
                                      type="button"
                                      onClick={(e) => handleSchoolLinkClick(e, school, 'homepage')}
                                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg border border-[#7ad1c3] bg-teal-50/50 hover:bg-[#7ad1c3] text-teal-800 hover:text-slate-950 flex items-center justify-center transition-all cursor-pointer shadow-2xs group/btn"
                                      title={`${school.name} 공식 홈페이지 바로가기`}
                                    >
                                      <Home className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover/btn:scale-115 transition-transform" />
                                    </button>

                                    {/* 2. 26 운영 현황 */}
                                    <button
                                      type="button"
                                      onClick={(e) => handleSchoolLinkClick(e, school, 'status26')}
                                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg border border-[#f4ba40] bg-amber-50/50 hover:bg-[#f4ba40] text-amber-800 hover:text-slate-950 flex items-center justify-center transition-all cursor-pointer shadow-2xs group/btn"
                                      title={`${school.name} 2026 교육과정 운영현황 바로가기`}
                                    >
                                      <ClipboardCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover/btn:scale-115 transition-transform" />
                                    </button>

                                    {/* 3. 학교 알리미 */}
                                    <button
                                      type="button"
                                      onClick={(e) => handleSchoolLinkClick(e, school, 'alimi')}
                                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg border border-[#98db86] bg-green-50/50 hover:bg-[#98db86] text-green-800 hover:text-slate-950 flex items-center justify-center transition-all cursor-pointer shadow-2xs group/btn"
                                      title={`${school.name} 학교 알리미 공시정보 바로가기`}
                                    >
                                      <BarChart3 className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover/btn:scale-115 transition-transform" />
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {districtSections.length === 0 && (
                  <div className="text-center py-12 text-slate-400 text-xs">
                    검색 조건과 일치하는 학교가 없습니다.
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* ============================================================ */
            /* SCREEN 2: 학과 선택 & 탐색 메인 화면 */
            /* ============================================================ */
            <div className="space-y-6">
              {/* 1. 기준 고등학교 정보 헤드 */}
              <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-3">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-xs text-slate-500 border-b border-slate-100 pb-2.5">
                  <button 
                    type="button" 
                    onClick={handleBackToSchoolDirectory} 
                    className="hover:text-blue-600 font-semibold cursor-pointer flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3 h-3" />
                    <span>전체 학교 목록 (첫 화면)</span>
                  </button>
                  <ChevronRight className="w-3 h-3 text-slate-300" />
                  <span className="font-bold text-slate-800">{selectedSchool.name}</span>
                  <ChevronRight className="w-3 h-3 text-slate-300" />
                  <span className="text-blue-600 font-bold">희망 학과 선택 & 탐색</span>
                </div>

                {/* Header Row */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-1">
                  <div className="flex items-center gap-3.5">
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-2xl shadow-sm shadow-blue-500/20 shrink-0">
                      <School className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800 border border-blue-200">
                          선택된 학교
                        </span>
                        <span className="text-xs font-semibold text-slate-400">
                          {getSchoolDistrict(selectedSchool)} · {selectedSchool.typeBadge}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                          {selectedSchool.name}
                        </h3>
                        <div className="flex items-center gap-1.5 shrink-0">
                          {/* 1. 홈페이지 */}
                          <button
                            type="button"
                            onClick={(e) => handleSchoolLinkClick(e, selectedSchool, 'homepage')}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-[#7ad1c3] bg-teal-50/70 hover:bg-[#7ad1c3] text-teal-800 hover:text-slate-950 text-xs font-bold transition-all cursor-pointer shadow-2xs group/btn"
                            title={`${selectedSchool.name} 공식 홈페이지 바로가기`}
                          >
                            <Home className="w-3.5 h-3.5 group-hover/btn:scale-115 transition-transform" />
                            <span>학교 홈페이지</span>
                          </button>

                          {/* 2. 26 운영 현황 */}
                          <button
                            type="button"
                            onClick={(e) => handleSchoolLinkClick(e, selectedSchool, 'status26')}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-[#f4ba40] bg-amber-50/70 hover:bg-[#f4ba40] text-amber-800 hover:text-slate-950 text-xs font-bold transition-all cursor-pointer shadow-2xs group/btn"
                            title={`${selectedSchool.name} 2026 교육과정 운영현황 바로가기`}
                          >
                            <ClipboardCheck className="w-3.5 h-3.5 group-hover/btn:scale-115 transition-transform" />
                            <span>2026 교육과정 운영현황</span>
                          </button>

                          {/* 3. 학교 알리미 */}
                          <button
                            type="button"
                            onClick={(e) => handleSchoolLinkClick(e, selectedSchool, 'alimi')}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-[#98db86] bg-green-50/70 hover:bg-[#98db86] text-green-800 hover:text-slate-950 text-xs font-bold transition-all cursor-pointer shadow-2xs group/btn"
                            title={`${selectedSchool.name} 학교 알리미 정보 바로가기`}
                          >
                            <BarChart3 className="w-3.5 h-3.5 group-hover/btn:scale-115 transition-transform" />
                            <span>학교 알리미</span>
                          </button>
                        </div>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        {selectedSchool.shortName} 학생을 위한 대학 진학 학과 선택 및 맞춤 과목 설계 가이드입니다.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap shrink-0">
                    {/* Quick Switch Dropdown */}
                    <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold">
                      <span className="text-slate-400 font-medium">학교 변경:</span>
                      <select
                        value={selectedSchoolId}
                        onChange={(e) => setSelectedSchoolId(e.target.value)}
                        className="bg-transparent text-xs font-bold text-slate-800 outline-none cursor-pointer"
                      >
                        {[...schools]
                          .filter(s => !isNoCurriculumSchool(s))
                          .sort((a, b) => (a.shortName || a.name).localeCompare(b.shortName || b.name, 'ko'))
                          .map((s, idx) => (
                            <option key={`${s.id}-${idx}`} value={s.id}>
                              {s.shortName || s.name} ({getSchoolDistrict(s)})
                            </option>
                          ))}
                      </select>
                    </div>

                    {/* Change School Button -> Back to Directory */}
                    <button
                      type="button"
                      onClick={handleBackToSchoolDirectory}
                      className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
                    >
                      <School className="w-3.5 h-3.5" />
                      <span>다른 학교 선택</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* 2. 학과 검색 & 선택 섹션 */}
              <section className="text-center pt-2 pb-2 space-y-3 max-w-3xl mx-auto">
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  희망 진학 학과를 <span className="text-blue-600">선택 및 검색</span>하세요
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
                  학과를 선택하시면 {selectedSchool.shortName}에 맞춘 3개년 추천 과목과 수강 계획표를 안내해 드립니다.
                </p>

                {/* Central Academic Search Box */}
                <div className="pt-1 max-w-xl mx-auto">
                  <div className="relative flex items-center shadow-md shadow-blue-900/5 rounded-2xl bg-white border-2 border-slate-200 hover:border-blue-400 focus-within:border-blue-600 focus-within:ring-4 focus-within:ring-blue-100 transition-all">
                    <Search className="w-5 h-5 text-slate-400 ml-4 shrink-0" />
                    <input
                      type="text"
                      placeholder="학과명을 검색하세요 (예: 의예과, 경영학과, 컴퓨터공학과...)"
                      className="w-full px-3 py-3.5 text-slate-800 placeholder-slate-400 text-sm sm:text-base bg-transparent outline-none rounded-2xl font-medium"
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        if (e.target.value.trim()) {
                          setSelectedMajor(null);
                        }
                      }}
                    />
                    {searchTerm && (
                      <button
                        type="button"
                        onClick={() => setSearchTerm('')}
                        className="p-2 mr-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
                        title="검색어 지우기"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </section>

              {/* Dynamic Content Views */}
              <AnimatePresence mode="wait">
                {searchTerm.trim() ? (
                  /* Global Search Results View */
                  <motion.div
                    key="search-results"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm min-h-[400px]"
                  >
                    <div className="flex flex-wrap items-center justify-between pb-4 mb-6 border-b border-slate-100 gap-3">
                      <div className="flex items-center gap-2">
                        <Search className="text-blue-600 w-5 h-5" />
                        <h3 className="text-xl font-bold text-slate-900">
                          검색 결과 <span className="text-blue-600 font-extrabold">"{searchTerm}"</span>
                        </h3>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full">
                          {searchResults.length}개 학과 발견
                        </span>
                        <button
                          onClick={() => setSearchTerm('')}
                          className="text-xs font-bold text-slate-500 hover:text-slate-800 underline cursor-pointer"
                        >
                          검색 초기화
                        </button>
                      </div>
                    </div>
                    
                    {searchResults.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {searchResults.map((major, idx) => {
                          const meta = getFieldMeta(major.fieldName);
                          const IconComponent = meta.icon;
                          return (
                            <button
                              key={`${major.fieldName}-${major.name}-${idx}`}
                              onClick={() => handleMajorSelect(major)}
                              className="text-left p-4 rounded-xl border border-slate-200 bg-white hover:bg-blue-50/50 hover:border-blue-400 transition-all hover:shadow-md group flex flex-col justify-between cursor-pointer"
                            >
                              <div>
                                <div className="flex items-center justify-between gap-2 mb-2">
                                  <span 
                                    style={{ backgroundColor: meta.badgeBg, color: meta.badgeText }} 
                                    className="text-[11px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1"
                                  >
                                    <IconComponent className="w-3 h-3" />
                                    {major.fieldName}
                                  </span>
                                  <span className="text-[11px] font-semibold text-slate-500">
                                    권장 {major.recommendedSubjects.length}과목
                                  </span>
                                </div>
                                <div className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors">
                                  {major.name}
                                </div>
                                {major.recommendedSubjects && major.recommendedSubjects.length > 0 && (
                                  <p className="text-xs text-slate-500 mt-2 line-clamp-2">
                                    권장: {major.recommendedSubjects.slice(0, 4).join(', ')} 등
                                  </p>
                                )}
                              </div>
                              <div className="text-xs font-bold text-blue-600 mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                                <span>과목 설계 및 계획표 보기</span>
                                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-20 text-slate-500 space-y-4 text-center">
                        <div className="p-4 bg-slate-100 rounded-full">
                          <Search className="w-8 h-8 text-slate-400" />
                        </div>
                        <div>
                          <p className="font-bold text-lg text-slate-700">검색 결과가 없습니다.</p>
                          <p className="text-xs text-slate-500 mt-1">입력하신 "{searchTerm}"에 해당하는 학과가 없습니다. 다른 검색어를 입력해보세요.</p>
                        </div>
                        <button 
                          onClick={() => setSearchTerm('')}
                          className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-all shadow-sm cursor-pointer"
                        >
                          전체 분야 둘러보기
                        </button>
                      </div>
                    )}
                  </motion.div>
                ) : selectedField ? (
                  /* Field-specific Majors View */
                  <motion.div
                    key={selectedField.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    {/* Field Navigation & Switcher */}
                    <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedField(null)}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition-all cursor-pointer"
                          >
                            <ArrowLeft className="w-3.5 h-3.5" />
                            <span>전체 8개 분야 보기</span>
                          </button>
                          <ChevronRight className="w-4 h-4 text-slate-300" />
                          <span className="font-extrabold text-slate-900 text-base">{selectedField.name}</span>
                        </div>
                        <span className="text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-1 rounded-full">
                          총 {selectedField.majors.length}개 학과 수록
                        </span>
                      </div>

                      {/* Quick Field Switcher Pills */}
                      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                        {FIELD_DATA.map((field, idx) => {
                          const meta = getFieldMeta(field.name);
                          const IconComponent = meta.icon;
                          const isCurrent = selectedField.name === field.name;
                          return (
                            <button
                              key={`${field.name}-${idx}`}
                              onClick={() => handleFieldSelect(field)}
                              className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                                isCurrent
                                  ? 'bg-blue-600 text-white shadow-sm'
                                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                              }`}
                            >
                              <IconComponent className="w-3.5 h-3.5" />
                              <span>{field.name}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Field Header Banner & In-field Search */}
                    {(() => {
                      const meta = getFieldMeta(selectedField.name);
                      const IconComponent = meta.icon;
                      return (
                        <div 
                          style={{ backgroundColor: meta.bgLight, borderColor: meta.borderLight }}
                          className="rounded-2xl border p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs"
                        >
                          <div className="flex items-start sm:items-center gap-3.5">
                            <div 
                              style={{ backgroundColor: '#ffffff', color: meta.accentColor, borderColor: meta.borderLight }}
                              className="p-3 rounded-xl border shadow-xs shrink-0"
                            >
                              <IconComponent className="w-7 h-7" />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                {selectedField.name}
                                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-white text-slate-600 border border-slate-200">
                                  {filteredFieldMajors.length}개 학과
                                </span>
                              </h3>
                              <p className="text-xs text-slate-600 mt-1 max-w-xl">
                                {meta.description}
                              </p>
                            </div>
                          </div>

                          <div className="relative w-full sm:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-3.5 h-3.5" />
                            <input
                              type="text"
                              placeholder={`${selectedField.name} 내 학과 검색...`}
                              value={fieldSearchTerm}
                              onChange={(e) => setFieldSearchTerm(e.target.value)}
                              className="w-full pl-8 pr-7 py-1.5 bg-white border border-slate-200 focus:border-blue-500 rounded-xl text-xs outline-none transition-all"
                            />
                            {fieldSearchTerm && (
                              <button
                                onClick={() => setFieldSearchTerm('')}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })()}

                    {/* Field Majors Grid */}
                    {filteredFieldMajors.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredFieldMajors.map((major, idx) => (
                          <button
                            key={`${selectedField.name}-${major.name}-${idx}`}
                            onClick={() => handleMajorSelect(major)}
                            className="text-left p-4 rounded-xl border border-slate-200 bg-white hover:bg-blue-50/50 hover:border-blue-400 transition-all hover:shadow-md group flex flex-col justify-between cursor-pointer"
                          >
                            <div>
                              <div className="flex items-center justify-between gap-2 mb-2">
                                <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                                  {selectedField.name}
                                </span>
                                <span className="text-[11px] font-semibold text-slate-500">
                                  권장 {major.recommendedSubjects?.length || 0}과목
                                </span>
                              </div>
                              <div className="font-extrabold text-slate-900 text-base group-hover:text-blue-600 transition-colors">
                                {major.name}
                              </div>
                              {major.recommendedSubjects && major.recommendedSubjects.length > 0 && (
                                <p className="text-xs text-slate-500 mt-2 line-clamp-2">
                                  권장: {major.recommendedSubjects.slice(0, 4).join(', ')} 등
                                </p>
                              )}
                            </div>
                            <div className="text-xs font-bold text-blue-600 mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                              <span>과목 설계 및 계획표 보기</span>
                              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500 space-y-3">
                        <Search className="w-8 h-8 text-slate-300 mx-auto" />
                        <p className="font-bold text-slate-700">검색 조건에 맞는 학과가 없습니다.</p>
                        <button
                          onClick={() => setFieldSearchTerm('')}
                          className="text-xs text-blue-600 font-bold hover:underline cursor-pointer"
                        >
                          검색어 초기화
                        </button>
                      </div>
                    )}
                  </motion.div>
                ) : (
                  /* 8 Field Bento Cards Overview (when no search & no field selected) */
                  <motion.div 
                    key="field-bento-overview"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    {/* Category Section Header */}
                    <div className="flex flex-wrap items-center justify-between border-b border-slate-200 pb-3 gap-2">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                          <LayoutGrid className="w-5 h-5 text-blue-600" />
                          <span>학문 분야별 탐색</span>
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                          희망하시는 분야를 선택하면 세부 전공 학과와 맞춤 과목 설계 화면으로 이동합니다.
                        </p>
                      </div>
                      <span className="text-xs font-bold text-slate-600 bg-slate-100 border border-slate-200 px-3 py-1 rounded-full">
                        8개 분야 · 총 {allMajors.length}개 학과 수록
                      </span>
                    </div>

                    {/* 8 Field Bento Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {FIELD_DATA.map((field, idx) => {
                        const meta = getFieldMeta(field.name);
                        const IconComponent = meta.icon;
                        return (
                          <div
                            key={`${field.name}-${idx}`}
                            onClick={() => handleFieldSelect(field)}
                            className="bg-white border border-slate-200 hover:border-blue-400 hover:shadow-lg rounded-2xl p-5 transition-all cursor-pointer group flex flex-col justify-between"
                          >
                            <div>
                              <div className="flex items-center justify-between gap-2 mb-3">
                                <div 
                                  style={{ backgroundColor: meta.bgLight, color: meta.accentColor, borderColor: meta.borderLight }}
                                  className="p-2.5 rounded-xl border shrink-0 transition-transform group-hover:scale-110"
                                >
                                  <IconComponent className="w-5 h-5" />
                                </div>
                                <span 
                                  style={{ backgroundColor: meta.badgeBg, color: meta.badgeText }}
                                  className="text-xs font-bold px-2 py-0.5 rounded-full"
                                >
                                  {field.majors.length}개 학과
                                </span>
                              </div>

                              <h4 className="font-extrabold text-slate-900 text-base group-hover:text-blue-600 transition-colors">
                                {field.name}
                              </h4>
                              <p className="text-xs text-slate-500 mt-1 leading-relaxed line-clamp-2">
                                {meta.description}
                              </p>

                              {/* Preview tags */}
                              <div className="flex flex-wrap gap-1 mt-3">
                                {meta.previewMajors.map((pMajor, pIdx) => (
                                  <span 
                                    key={`${pMajor}-${pIdx}`} 
                                    className="text-[10px] font-medium bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded"
                                  >
                                    {pMajor}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-600 group-hover:text-blue-600 transition-colors">
                              <span>학과 둘러보기</span>
                              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Curriculum Guidance Information Strip */}
                    <div className="bg-gradient-to-r from-blue-50/80 via-slate-50 to-indigo-50/80 border border-slate-200/80 rounded-2xl p-5 mt-8 shadow-2xs">
                      <div className="flex items-center gap-2 mb-3">
                        <Info className="w-4 h-4 text-blue-600 shrink-0" />
                        <h4 className="font-bold text-slate-900 text-sm">2022 개정 교육과정 선택과목 설계 핵심 가이드</h4>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                        <div className="bg-white/90 p-4 rounded-xl border border-slate-200/80 shadow-2xs">
                          <span className="font-bold text-blue-700 block mb-1">1. 과목 체계의 위계성</span>
                          <p className="text-slate-600 leading-relaxed">
                            공통과목(1학년) 이수 후 일반선택과 진로선택(심화)을 학기별로 균형 있게 배치하여 전공 적합성을 확보합니다.
                          </p>
                        </div>
                        <div className="bg-white/90 p-4 rounded-xl border border-slate-200/80 shadow-2xs">
                          <span className="font-bold text-emerald-700 block mb-1">2. 2028 대입 및 성취평가</span>
                          <p className="text-slate-600 leading-relaxed">
                            수능 출제 과목과 사회·과학 융합선택(A~E 절대평가, 석차등급 미기재) 등 평가 특성을 고려해 설계합니다.
                          </p>
                        </div>
                        <div className="bg-white/90 p-4 rounded-xl border border-slate-200/80 shadow-2xs">
                          <span className="font-bold text-purple-700 block mb-1">3. 주요 대학 권장과목 연계</span>
                          <p className="text-slate-600 leading-relaxed">
                            서울대, 연세대, 고려대 등 주요 대학에서 제시한 학과별 핵심 권장과목을 충실히 이수할 수 있도록 돕습니다.
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        ) : (
          /* Subject Display Section */
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Breadcrumbs & Back Button */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4 print:hidden">
              <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
                <button onClick={handleBackToSchoolDirectory} className="hover:text-blue-600 transition-colors cursor-pointer flex items-center gap-1 font-semibold">
                  <School className="w-3.5 h-3.5 text-blue-600" />
                  <span>전체 학교 목록</span>
                </button>
                <ChevronRight className="w-3 h-3 text-slate-300" />
                <button onClick={() => setSelectedMajor(null)} className="hover:text-blue-600 transition-colors cursor-pointer font-bold text-slate-800">
                  {selectedSchool.name} 편제표
                </button>
                <ChevronRight className="w-3 h-3 text-slate-300" />
                {selectedField && (
                  <>
                    <button onClick={() => setSelectedMajor(null)} className="hover:text-blue-600 transition-colors cursor-pointer">
                      {selectedField.name}
                    </button>
                    <ChevronRight className="w-3 h-3 text-slate-300" />
                  </>
                )}
                <span className="font-extrabold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200">
                  {selectedMajor.name}
                </span>
              </div>
              
              <div className="flex items-center gap-2 flex-wrap">
                <button 
                  onClick={() => setSelectedMajor(null)}
                  className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>학문 분야별 탐색으로</span>
                </button>
                <button 
                  onClick={handleBackToSchoolDirectory}
                  className="px-3.5 py-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <School className="w-3.5 h-3.5 text-blue-600" />
                  <span>다른 학교 선택</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowCompareModal(true)}
                  className="px-3.5 py-2 bg-white hover:bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
                  title="두 학교의 편제표, 권장과목 개설률, 선택군 구성을 나란히 비교합니다."
                >
                  <ArrowRightLeft className="w-3.5 h-3.5" />
                  <span>학교 1:1 비교</span>
                </button>
              </div>
            </div>

            {/* Major Header */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-xs relative overflow-hidden print:hidden">
              <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 border border-blue-100 rounded-full text-xs font-bold tracking-tight">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                    <span>2022 개정 권장 선택과목 맞춤 안내</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
                    {selectedMajor.name}
                  </h2>
                  <p className="text-slate-600 text-sm font-medium leading-relaxed max-w-xl">
                    {selectedMajor.name} 진학을 희망하는 학생을 위한 수강신청 계획서와 대학별 전공연계 권장과목입니다.
                  </p>
                </div>
                
                {/* View Toggle Tabs */}
                <div className="flex bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200/80 self-start lg:self-center shadow-inner gap-1 shrink-0 flex-wrap">
                  <button 
                    onClick={() => setViewMode('plan')}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                      viewMode === 'plan' 
                        ? 'bg-white text-blue-600 shadow-sm border border-slate-200/50' 
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                    }`}
                  >
                    <FileText className="w-4 h-4" />
                    <span>수강신청 계획서</span>
                  </button>
                  <button 
                    onClick={() => setViewMode('university')}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                      viewMode === 'university' 
                        ? 'bg-white text-blue-600 shadow-sm border border-slate-200/50' 
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                    }`}
                  >
                    <GraduationCap className="w-4 h-4" />
                    <span>대학별 권장과목 가이드</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Subjects Grid or Plan */}
            <div className="grid grid-cols-1 gap-6">
              {viewMode === 'university' ? (
                (() => {
                  const renderTipSubjectBadges = (rawText: string, type: 'core' | 'recommended') => {
                    if (!rawText || rawText === '-' || rawText.trim() === '') {
                      return <span className="text-slate-300 font-medium text-xs">-</span>;
                    }

                    const isDescriptive = rawText.includes('적극 이수') || 
                                          rawText.includes('자신의 진로') || 
                                          rawText.includes('제시하지 않은') ||
                                          rawText.includes('선택 이수');

                    if (isDescriptive) {
                      return (
                        <span className={`text-xs leading-relaxed px-2.5 py-1.5 rounded-lg inline-block ${
                          type === 'core' 
                            ? 'bg-blue-50 text-blue-900 border border-blue-200' 
                            : 'bg-slate-50 text-slate-700 border border-slate-200'
                        }`}>
                          {rawText}
                        </span>
                      );
                    }

                    // Split by comma, slash or bullet
                    const parts = rawText.split(/[,/]/).map(s => s.trim()).filter(Boolean);

                    return (
                      <div className="flex flex-wrap gap-1.5 items-center">
                        {parts.map((part, pIdx) => {
                          const cleanPart = part.replace(/\([^)]*\)/g, '').trim();
                          const isKnownSubject = !!SUBJECT_TYPES[cleanPart] || !!SUBJECT_TYPES[part];
                          const isCore = type === 'core';

                          return (
                            <button
                              key={`tip-badge-${type}-${cleanPart || part}-${pIdx}`}
                              type="button"
                              onClick={() => {
                                if (isKnownSubject) {
                                  handleOpenSubjectModal(cleanPart || part);
                                }
                              }}
                              title={isKnownSubject ? `${cleanPart || part} 과목 상세안내 팝업 보기` : part}
                              className={`text-xs px-2.5 py-1 rounded-lg font-bold transition-all text-left inline-flex items-center gap-1 shadow-xs ${
                                isCore
                                  ? 'bg-blue-600 text-white hover:bg-blue-700 border border-blue-700'
                                  : 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 hover:border-emerald-300'
                              } ${isKnownSubject ? 'cursor-pointer active:scale-95' : 'cursor-default'}`}
                            >
                              <span>{part}</span>
                              {isKnownSubject && (
                                <Info className={`w-3 h-3 ${isCore ? 'text-blue-200' : 'text-emerald-600'} opacity-80 shrink-0`} />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    );
                  };

                  return (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm mb-6"
                    >
                      {/* Top Banner Header */}
                      <div className="bg-slate-900 px-6 py-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center shrink-0">
                            <GraduationCap className="text-blue-400 w-5 h-5" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-white font-bold text-base">2028학년도 대학별 권장과목 가이드</h3>
                              <span className="text-[11px] font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30 px-2 py-0.5 rounded-full">
                                {universityTips.length}개 모집단위
                              </span>
                            </div>
                            <p className="text-slate-400 text-xs mt-0.5">
                              주요 대학별 입학전형 핵심 권장과목 및 일반 권장과목 가이드라인입니다. 과목 클릭 시 상세 정보를 확인할 수 있습니다.
                            </p>
                          </div>
                        </div>

                        {/* Filter & Search Bar */}
                        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">
                          {/* View Mode Toggle */}
                          <div className="bg-slate-800 p-1 rounded-xl flex items-center border border-slate-700 text-xs shrink-0">
                            <button
                              type="button"
                              onClick={() => setUnivViewMode('major')}
                              className={`px-3.5 py-1.5 rounded-lg font-medium transition-all flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-1.5 whitespace-nowrap ${
                                univViewMode === 'major' 
                                  ? 'bg-blue-600 text-white font-bold shadow-xs' 
                                  : 'text-slate-300 hover:text-white'
                              }`}
                            >
                              <span className="whitespace-nowrap">학과 맞춤</span>
                              <span className="text-[11px] opacity-85 font-normal whitespace-nowrap">({selectedMajor?.name || '전공'})</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => setUnivViewMode('all')}
                              className={`px-3.5 py-1.5 rounded-lg font-medium transition-all flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-1.5 whitespace-nowrap ${
                                univViewMode === 'all' 
                                  ? 'bg-blue-600 text-white font-bold shadow-xs' 
                                  : 'text-slate-300 hover:text-white'
                              }`}
                            >
                              <span className="whitespace-nowrap">전체 대학</span>
                              <span className="text-[11px] opacity-85 font-normal whitespace-nowrap">(591개)</span>
                            </button>
                          </div>

                          {/* Region Select */}
                          <select
                            value={univRegionFilter}
                            onChange={(e) => setUnivRegionFilter(e.target.value)}
                            className="bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                          >
                            <option value="전체">지역 전체</option>
                            <option value="서울">서울</option>
                            <option value="경기">경기</option>
                            <option value="인천">인천</option>
                          </select>

                          {/* Search Input */}
                          <div className="relative group min-w-[180px] sm:min-w-[210px]">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-400 transition-colors" />
                            <input 
                              type="text"
                              placeholder="대학, 학과, 과목 검색..."
                              value={univSearchTerm}
                              onChange={(e) => setUnivSearchTerm(e.target.value)}
                              className="bg-slate-800 border border-slate-700 text-white text-xs rounded-xl pl-9 pr-8 py-2 w-full focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-500"
                            />
                            {univSearchTerm && (
                              <button
                                type="button"
                                onClick={() => setUnivSearchTerm('')}
                                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Table Container */}
                      <div className="overflow-x-auto max-h-[560px] overflow-y-auto">
                        <table className="w-full text-sm text-left border-collapse">
                          <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 sticky top-0 z-10 shadow-xs">
                            <tr>
                              <th className="px-5 py-3.5 whitespace-nowrap text-xs">지역</th>
                              <th className="px-5 py-3.5 whitespace-nowrap text-xs">대학교</th>
                              <th className="px-5 py-3.5 whitespace-nowrap text-xs">모집단위 (세부학과)</th>
                              <th className="px-5 py-3.5 text-xs w-[38%]">핵심과목 (필수 권장)</th>
                              <th className="px-5 py-3.5 text-xs w-[38%]">권장과목 (가급적 권장)</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {universityTips.map((tip, idx) => (
                              <tr key={`tip-${tip.university}-${tip.major}-${idx}`} className="hover:bg-slate-50/80 transition-colors">
                                <td className="px-5 py-3.5 align-top">
                                  <span className="inline-block px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                                    {tip.location || tip.region}
                                  </span>
                                </td>
                                <td className="px-5 py-3.5 align-top font-bold text-slate-900 whitespace-nowrap">
                                  {tip.university}
                                </td>
                                <td className="px-5 py-3.5 align-top">
                                  <span className="font-semibold text-slate-800 text-xs">
                                    {tip.major}
                                  </span>
                                </td>
                                <td className="px-5 py-3.5 align-top">
                                  {renderTipSubjectBadges(tip.core, 'core')}
                                </td>
                                <td className="px-5 py-3.5 align-top">
                                  <div className="space-y-2">
                                    {renderTipSubjectBadges(tip.recommended, 'recommended')}
                                    {tip.note && tip.note !== '-' && (
                                      <div className="text-[11px] text-slate-600 bg-amber-50/70 border border-amber-200/70 rounded-lg p-2 leading-relaxed whitespace-pre-line">
                                        <span className="font-bold text-amber-900 block mb-0.5">※ 안내사항</span>
                                        {tip.note}
                                      </div>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Empty state */}
                      {universityTips.length === 0 && (
                        <div className="p-10 text-center bg-slate-50/70 border-t border-slate-100">
                          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3 border border-blue-100 shadow-2xs">
                            <Search className="w-6 h-6" />
                          </div>
                          <p className="font-bold text-slate-800 text-base mb-1.5">
                            {univViewMode === 'major' && selectedMajor
                              ? `선택하신 [${selectedMajor.name}]는 대학별 별도 지정 권장과목이 없습니다.`
                              : '일치하는 대학별 권장과목이 없습니다.'}
                          </p>
                          <p className="text-xs text-slate-500 max-w-md mx-auto mb-5 leading-relaxed">
                            {univViewMode === 'major' && selectedMajor
                              ? `해당 학과는 수도권 주요 대학에서 필수/핵심 권장과목을 별도로 지정하지 않은 학과입니다. 연관성이 낮은 타 학과 과목을 무리하게 추천하지 않으니, 상단의 [성남지역 고등학교 선택과목 가이드]를 참고하여 균형 있게 설계해보세요.`
                              : '검색어 또는 지역 필터를 변경하시거나 초기화해보세요.'}
                          </p>
                          <div className="flex items-center justify-center gap-2.5 flex-wrap">
                            {univViewMode === 'major' && (
                              <button
                                type="button"
                                onClick={() => {
                                  setUnivViewMode('all');
                                  setUnivSearchTerm('');
                                  setUnivRegionFilter('전체');
                                }}
                                className="text-xs px-4 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-sm cursor-pointer"
                              >
                                전체 591개 대학 권장과목 목록 보기
                              </button>
                            )}
                            {(univSearchTerm || univRegionFilter !== '전체') && (
                              <button
                                type="button"
                                onClick={() => {
                                  setUnivSearchTerm('');
                                  setUnivRegionFilter('전체');
                                }}
                                className="text-xs px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-all shadow-2xs cursor-pointer"
                              >
                                검색 필터 초기화
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  );
                })()
              ) : (
                /* Course Registration Plan View (Table Format) */
                <div className="space-y-4">
                  {/* Action Buttons - Outside the print ref */}
                  <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm print:hidden relative z-50">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <FileText className="text-blue-600 w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-800">수강 신청 계획서</h3>
                        <p className="text-xs text-slate-400">{selectedMajor.name} 전공 권장</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {errorMsg && (
                        <div className="text-xs text-red-500 mr-4 font-medium animate-bounce max-w-[200px]">
                          {errorMsg}
                        </div>
                      )}
                      
                      <div className="flex flex-wrap items-center gap-2">
                        <div className="flex bg-slate-100 p-1 rounded-lg">
                          <button 
                            onClick={() => setPlanGrade(1)}
                            className={`px-3 py-1.5 rounded-md text-sm font-bold transition-all ${planGrade === 1 ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                          >
                            1학년
                          </button>
                          <button 
                            onClick={() => setPlanGrade(2)}
                            className={`px-3 py-1.5 rounded-md text-sm font-bold transition-all ${planGrade === 2 ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                          >
                            2학년
                          </button>
                          <button 
                            onClick={() => setPlanGrade(3)}
                            className={`px-3 py-1.5 rounded-md text-sm font-bold transition-all ${planGrade === 3 ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                          >
                            3학년
                          </button>
                        </div>
                        
                        <button 
                          onClick={handleDownloadPDF}
                          disabled={isDownloading}
                          className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-bold shadow-sm transition-all ${
                            isDownloading 
                              ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                              : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
                          }`}
                        >
                          {isDownloading ? (
                            <div className="w-4 h-4 border-2 border-slate-300 border-t-slate-500 rounded-full animate-spin"></div>
                          ) : (
                            <Download className="w-4 h-4" />
                          )}
                          {isDownloading ? '생성 중...' : 'PDF 다운로드'}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* 2022 개정 이수 학점 규정 자동 판별기 (일반고 / 과학중점고 / 자율형공립고 / 특목고 맞춤) */}
                  <GraduationRequirementsValidator
                    school={selectedSchool}
                    consultantChoices={activePlanChoices}
                    planGrade={planGrade}
                  />

                  <div
                    ref={printRef}
                    id="printable-plan"
                    className="bg-white print-area print:shadow-none print:border-none print:rounded-none rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden"
                    style={{ 
                      backgroundColor: '#ffffff', 
                      width: '100%', 
                      height: 'auto', 
                      overflow: 'visible', 
                      position: 'relative',
                      padding: '0',
                      margin: '0'
                    }}
                  >
                    <div style={{ 
                      borderBottom: '1px solid #1e293b', 
                      padding: '1.1rem 1.4rem', 
                      display: 'flex', 
                      flexDirection: 'row', 
                      alignItems: 'center', 
                      justifyContent: 'space-between', 
                      gap: '0.5rem', 
                      background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)' 
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                          <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)', padding: '0.4rem', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <FileText style={{ color: '#ffffff', width: '1.2rem', height: '1.2rem' }} />
                          </div>
                          <div>
                            <h3 style={{ color: '#ffffff', fontWeight: '800', fontSize: '1.15rem', margin: 0, letterSpacing: '-0.02em' }}>
                              {planGrade}학년 수강 신청 계획서
                            </h3>
                            <div style={{ color: '#93c5fd', fontSize: '0.75rem', fontWeight: '500', marginTop: '0.15rem' }}>
                              2022 개정 교육과정 기준 학기별 과목 이수 설계
                            </div>
                          </div>
                        </div>
                        <div style={{ 
                          color: '#ffffff', 
                          fontSize: '0.8rem', 
                          fontWeight: '700',
                          backgroundColor: 'rgba(255, 255, 255, 0.12)',
                          padding: '0.35rem 0.85rem',
                          borderRadius: '9999px',
                          border: '1px solid rgba(255, 255, 255, 0.2)'
                        }}>
                          {selectedSchool.name} | {selectedMajor.name} 전공 권장
                        </div>
                      </div>

                      {/* Grading & CSAT Legend */}
                      <div style={{ 
                        borderBottom: '1px solid #e2e8f0', 
                        padding: '1rem 1.4rem', 
                        backgroundColor: '#f8fafc',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.65rem',
                        fontSize: '0.78rem'
                      }}>
                        {hasConsultantChanges && (
                          <div style={{ display: 'flex', justifyContent: 'flex-end', borderBottom: '1px dashed #cbd5e1', paddingBottom: '0.4rem' }}>
                            <button
                              type="button"
                              onClick={handleResetConsultantChecks}
                              className="hover:bg-slate-200 transition-colors"
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.35rem',
                                padding: '0.25rem 0.65rem',
                                borderRadius: '6px',
                                fontSize: '0.74rem',
                                fontWeight: '700',
                                color: '#334155',
                                backgroundColor: '#e2e8f0',
                                border: '1px solid #cbd5e1',
                                cursor: 'pointer'
                              }}
                              title="수정된 체크 내역을 초기화하고 원래 추천 상태로 복원합니다."
                            >
                              <RotateCcw style={{ width: '0.75rem', height: '0.75rem' }} />
                              상담 체크 초기화
                            </button>
                          </div>
                        )}

                        {/* Subject Classification Legend */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                          <span style={{ fontWeight: '800', color: '#1e293b' }}>[과목 구분]</span>
                          <span style={{ backgroundColor: '#e0f2fe', color: '#0369a1', border: '1px solid #7dd3fc', padding: '0.15rem 0.55rem', borderRadius: '9999px', fontWeight: '700', fontSize: '0.74rem' }}>
                            공통 과목
                          </span>
                          <span style={{ backgroundColor: '#dcfce7', color: '#15803d', border: '1px solid #86efac', padding: '0.15rem 0.55rem', borderRadius: '9999px', fontWeight: '700', fontSize: '0.74rem' }}>
                            일반 선택
                          </span>
                          <span style={{ backgroundColor: '#dbeafe', color: '#1d4ed8', border: '1px solid #93c5fd', padding: '0.15rem 0.55rem', borderRadius: '9999px', fontWeight: '700', fontSize: '0.74rem' }}>
                            진로 선택
                          </span>
                          <span style={{ backgroundColor: '#f3e8ff', color: '#7e22ce', border: '1px solid #d8b4fe', padding: '0.15rem 0.55rem', borderRadius: '9999px', fontWeight: '700', fontSize: '0.74rem' }}>
                            융합 선택
                          </span>
                          <span style={{ backgroundColor: '#ede9fe', color: '#6d28d9', border: '1px solid #c4b5fd', padding: '0.15rem 0.55rem', borderRadius: '9999px', fontWeight: '700', fontSize: '0.74rem' }}>
                            전문 선택
                          </span>
                        </div>

                        {/* Grade Evaluation Legend */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexWrap: 'wrap' }}>
                          <span style={{ fontWeight: '800', color: '#1e293b' }}>[성적처리 & 수능 범례]</span>
                          <span style={{ backgroundColor: '#ffedd5', color: '#c2410c', border: '1px solid #fdba74', padding: '0.12rem 0.45rem', borderRadius: '4px', fontWeight: '700', fontSize: '0.72rem' }}>
                            ■ 수능 출제 / 5등급
                          </span>
                          <span style={{ backgroundColor: '#eff6ff', color: '#1e40af', border: '1px solid #bfdbfe', padding: '0.12rem 0.45rem', borderRadius: '4px', fontWeight: '700', fontSize: '0.72rem' }}>
                            ■ 보통교과 5등급 (성취도 5단계)
                          </span>
                          <span style={{ backgroundColor: '#fef9c3', color: '#854d0e', border: '1px solid #fde047', padding: '0.12rem 0.45rem', borderRadius: '4px', fontWeight: '700', fontSize: '0.72rem' }}>
                            ■ 사회·과학 융합선택 (성취도 5단계·등급미기재)
                          </span>
                          <span style={{ backgroundColor: '#f0fdf4', color: '#166534', border: '1px solid #bbf7d0', padding: '0.12rem 0.45rem', borderRadius: '4px', fontWeight: '700', fontSize: '0.72rem' }}>
                            ■ 체육·예술 (성취도 3단계)
                          </span>
                          <span style={{ backgroundColor: '#f8fafc', color: '#475569', border: '1px solid #cbd5e1', padding: '0.12rem 0.45rem', borderRadius: '4px', fontWeight: '700', fontSize: '0.72rem' }}>
                            ■ 교양 (P/F)
                          </span>
                          <span style={{ backgroundColor: '#e0e7ff', color: '#3730a3', border: '1px solid #c7d2fe', padding: '0.12rem 0.45rem', borderRadius: '4px', fontWeight: '700', fontSize: '0.72rem' }}>
                            ■ 전문교과 (5등급)
                          </span>
                        </div>

                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '0.45rem', 
                          color: '#1d4ed8', 
                          fontWeight: '700', 
                          fontSize: '0.76rem',
                          backgroundColor: '#eff6ff',
                          padding: '0.45rem 0.85rem',
                          borderRadius: '8px',
                          border: '1px solid #bfdbfe'
                        }}>
                          <Info style={{ width: '0.85rem', height: '0.85rem', flexShrink: 0 }} />
                          <span>안내: 계획서 표에서 <strong>과목명을 클릭</strong>하면 2022 개정 교육과정 기준 과목 소개, 평가방식, 관련 학과 및 진로 안내 팝업이 열립니다.</span>
                        </div>
                      </div>
                      
                      <div style={{ width: '100%', overflow: 'visible', position: 'relative', padding: '1.2rem' }}>
                        <table style={{ width: '100%', fontSize: '0.82rem', textAlign: 'center', borderCollapse: 'collapse', border: '1.5px solid #cbd5e1', tableLayout: 'fixed' }}>
                          <thead style={{ backgroundColor: '#f1f5f9', color: '#0f172a', fontWeight: '800', borderBottom: '2px solid #cbd5e1' }}>
                            <tr>
                              <th style={{ padding: '0.75rem 0.4rem', borderRight: '1px solid #cbd5e1', width: '5.2rem', textAlign: 'center', backgroundColor: '#f1f5f9', fontSize: '0.8rem', letterSpacing: '-0.01em' }}>선택 방법</th>
                              <th style={{ padding: '0.75rem 0.4rem', borderRight: '1px solid #cbd5e1', width: '5.6rem', textAlign: 'center', backgroundColor: '#f1f5f9', fontSize: '0.8rem', letterSpacing: '-0.01em' }}>교과군</th>
                              <th style={{ padding: '0.75rem 0.8rem', borderRight: '1px solid #cbd5e1', textAlign: 'left', backgroundColor: '#f1f5f9', fontSize: '0.8rem', letterSpacing: '-0.01em' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '0.45rem' }}>
                                  <span>과목명(학점수)</span>
                                  <span style={{ 
                                    fontSize: '0.68rem', 
                                    fontWeight: '700', 
                                    backgroundColor: '#eff6ff', 
                                    color: '#1d4ed8', 
                                    border: '1px solid #bfdbfe', 
                                    padding: '0.12rem 0.45rem', 
                                    borderRadius: '9999px',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.2rem'
                                  }}>
                                    <Info style={{ width: '0.65rem', height: '0.65rem' }} />
                                    클릭 시 상세안내
                                  </span>
                                </div>
                              </th>
                              <th style={{ padding: '0.75rem 0.4rem', borderRight: '1px solid #cbd5e1', width: '5.6rem', textAlign: 'center', backgroundColor: '#f1f5f9', fontSize: '0.8rem', letterSpacing: '-0.01em' }}>과목 구분</th>
                              <th style={{ padding: '0.75rem 0.4rem', borderRight: '1px solid #cbd5e1', width: '3.6rem', textAlign: 'center', backgroundColor: '#f1f5f9', fontSize: '0.8rem', letterSpacing: '-0.01em' }}>1학기</th>
                              <th style={{ padding: '0.75rem 0.4rem', borderRight: '1px solid #cbd5e1', width: '3.6rem', textAlign: 'center', backgroundColor: '#f1f5f9', fontSize: '0.8rem', letterSpacing: '-0.01em' }}>2학기</th>
                              <th style={{ padding: '0.75rem 0.4rem', borderRight: '1px solid #cbd5e1', width: '8.5rem', textAlign: 'center', backgroundColor: '#f1f5f9', fontSize: '0.8rem', letterSpacing: '-0.01em' }}>성적처리 유형</th>
                              <th style={{ padding: '0.75rem 0.4rem', width: '4.8rem', textAlign: 'center', backgroundColor: '#f1f5f9', fontSize: '0.8rem', letterSpacing: '-0.01em' }}>비고</th>
                            </tr>
                          </thead>
                          <tbody style={{ borderTop: '1px solid #cbd5e1' }}>
                            {/* Mandatory Subjects (1학기 과목 우선 -> 양학기/교차 -> 2학기 과목 순) */}
                            {sortedMandatorySubjects.map((subject, idx) => {
                              const normalizedName = normalizeSubjectName(subject.name);
                              const isEx = isExchangeSubject(subject.name);
                              const exParts = isEx ? parseExchangeSubject(subject.name) : [subject.name];
                              const areas = getSubjectAreas(subject.name);
                              const areaDisplay = formatAreasDisplay(areas, subject.name);
                              const typeKey = Object.keys(SUBJECT_TYPES).find(k => normalizeSubjectName(k) === normalizedName);
                              const type = (typeKey ? SUBJECT_TYPES[typeKey] : '일반') as SelectionType;
                              const evalInfo = getSubjectEval(subject.name, areas[0] || '공통', type);
                              return (
                                <tr key={`mandatory-${planGrade}-${subject.name}-${idx}`} style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                                  {idx === 0 && (
                                    <td rowSpan={sortedMandatorySubjects.length} style={{ padding: '0.65rem 0.4rem', borderRight: '1px solid #cbd5e1', fontWeight: '900', color: '#1e3a8a', textAlign: 'center', letterSpacing: '0.05em', fontSize: '0.82rem', backgroundColor: '#f1f5f9' }}>필수</td>
                                  )}
                                  <td style={{ padding: '0.65rem 0.4rem', borderRight: '1px solid #cbd5e1', color: '#1e293b', textAlign: 'center', fontWeight: '700', fontSize: '0.82rem' }}>
                                    {renderAreaName(areaDisplay)}
                                  </td>
                                  <td style={{ padding: '0.65rem 0.8rem', borderRight: '1px solid #cbd5e1', textAlign: 'left' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                                      {isEx && exParts.length > 1 ? (
                                        <div style={{ display: 'inline-flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.3rem' }}>
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
                                              gap: '0.3rem',
                                              fontWeight: '700',
                                              fontSize: '0.94rem',
                                              textDecoration: 'none'
                                            }}
                                            className="hover:text-blue-700 transition-colors group cursor-pointer"
                                          >
                                            <span style={{ textDecoration: 'none' }}>{exParts[0]}</span>
                                            <Info style={{ width: '0.8rem', height: '0.8rem', color: '#2563eb', opacity: 0.85, flexShrink: 0 }} />
                                          </button>

                                          <span style={{ 
                                            color: '#2563eb', 
                                            fontWeight: '800', 
                                            fontSize: '0.72rem',
                                            backgroundColor: '#eff6ff',
                                            padding: '0.1rem 0.35rem',
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
                                              gap: '0.3rem',
                                              fontWeight: '700',
                                              fontSize: '0.94rem',
                                              textDecoration: 'none'
                                            }}
                                            className="hover:text-blue-700 transition-colors group cursor-pointer"
                                          >
                                            <span style={{ textDecoration: 'none' }}>{exParts[1]}</span>
                                            <Info style={{ width: '0.8rem', height: '0.8rem', color: '#2563eb', opacity: 0.85, flexShrink: 0 }} />
                                          </button>

                                          {planGrade === 1 && !/\(\d+(?:학점)?\)$/.test(subject.name.trim()) && (
                                            <span style={{ color: '#94a3b8', fontWeight: '400', marginLeft: '0.25rem', fontSize: '0.82rem' }}>
                                              ({getGrade1SubjectCredit(subject)}학점)
                                            </span>
                                          )}
                                          {planGrade !== 1 && !/\(\d+(?:학점)?\)$/.test(subject.name.trim()) && (
                                            <span style={{ color: '#94a3b8', fontWeight: '400', marginLeft: '0.25rem', fontSize: '0.82rem' }}>
                                              ({getMandatorySubjectCredit(subject, planGrade)}학점)
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
                                            gap: '0.45rem',
                                            fontWeight: '700',
                                            fontSize: '0.94rem',
                                            textDecoration: 'none'
                                          }}
                                          className="hover:text-blue-700 transition-colors group cursor-pointer"
                                        >
                                          <span style={{ textDecoration: 'none' }}>
                                            {subject.name}
                                            {planGrade === 1 && !/\(\d+(?:학점)?\)$/.test(subject.name.trim()) && (
                                              <span style={{ color: '#94a3b8', fontWeight: '400', marginLeft: '0.25rem', fontSize: '0.82rem' }}>
                                                ({getGrade1SubjectCredit(subject)}학점)
                                              </span>
                                            )}
                                            {planGrade !== 1 && !/\(\d+(?:학점)?\)$/.test(subject.name.trim()) && (
                                              <span style={{ color: '#94a3b8', fontWeight: '400', marginLeft: '0.25rem', fontSize: '0.82rem' }}>
                                                ({getMandatorySubjectCredit(subject, planGrade)}학점)
                                              </span>
                                            )}
                                          </span>
                                          <Info style={{ width: '0.82rem', height: '0.82rem', color: '#2563eb', opacity: 0.85, flexShrink: 0 }} />
                                          {evalInfo.isCsat && (
                                            <span style={{ 
                                              fontSize: '0.68rem', 
                                              backgroundColor: '#ffedd5', 
                                              color: '#c2410c', 
                                              border: '1px solid #fdba74', 
                                              borderRadius: '4px', 
                                              padding: '0.1rem 0.35rem', 
                                              fontWeight: '700' 
                                            }}>
                                              수능
                                            </span>
                                          )}
                                        </button>
                                      )}
                                    </div>
                                  </td>
                                  <td style={{ padding: '0.65rem 0.4rem', borderRight: '1px solid #cbd5e1', textAlign: 'center' }}>
                                    {(() => {
                                      const typeStyle = getSubjectTypeBadgeStyle(type);
                                      return (
                                        <span style={{ 
                                          fontSize: '0.74rem', 
                                          padding: '0.18rem 0.55rem', 
                                          borderRadius: '9999px', 
                                          fontWeight: '700',
                                          backgroundColor: typeStyle.bg,
                                          color: typeStyle.text,
                                          border: `1px solid ${typeStyle.border}`,
                                          display: 'inline-block',
                                          whiteSpace: 'nowrap',
                                          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)'
                                        }}>
                                          {typeStyle.label}
                                        </span>
                                      );
                                    })()}
                                  </td>
                                  <td style={{ padding: '0.65rem 0.4rem', borderRight: '1px solid #cbd5e1', textAlign: 'center' }}>
                                    {subject.semesters.includes(1) && renderSemesterCheckbox(planGrade, 'mandatory', subject.name, 1, true)}
                                  </td>
                                  <td style={{ padding: '0.65rem 0.4rem', borderRight: '1px solid #cbd5e1', textAlign: 'center' }}>
                                    {subject.semesters.includes(2) && renderSemesterCheckbox(planGrade, 'mandatory', subject.name, 2, true)}
                                  </td>
                                  <td style={{ padding: '0.55rem 0.4rem', borderRight: '1px solid #cbd5e1', textAlign: 'center' }}>
                                    <span style={{ 
                                      fontSize: '0.74rem', 
                                      padding: '0.16rem 0.45rem', 
                                      borderRadius: '5px', 
                                      fontWeight: '700',
                                      backgroundColor: evalInfo.badgeBg,
                                      color: evalInfo.badgeText,
                                      border: `1px solid ${evalInfo.badgeBorder}`,
                                      whiteSpace: 'nowrap',
                                      display: 'inline-block'
                                    }}>
                                      {evalInfo.displayTitle}
                                    </span>
                                  </td>
                                  <td style={{ padding: '0.65rem 0.4rem', textAlign: 'center' }}></td>
                                </tr>
                              );
                            })}

                            {/* Selection Groups */}
                            {planGrade === 1 && (
                              <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1.5px solid #cbd5e1' }}>
                                <td colSpan={8} style={{ padding: '0.85rem 1rem', textAlign: 'center', color: '#475569', fontSize: '0.82rem', fontWeight: '600' }}>
                                  💡 1학년은 2022 개정 교육과정 기준 전 과목 공통 이수(필수)로 편성되어 별도의 학생 선택과목군이 없습니다. (1학기 29학점, 2학기 29학점 공통 편성)
                                </td>
                              </tr>
                            )}
                            {planData.map((group, gIdx) => (
                              <Fragment key={`${group.id}-${gIdx}`}>
                                {group.groupedSubjects.map((areaGroup, aIdx) => (
                                  <Fragment key={`${group.id}-${areaGroup.area}-${aIdx}`}>
                                    {areaGroup.subjects.map((subject, sIdx) => {
                                      const isLastInGroup = aIdx === group.groupedSubjects.length - 1 && sIdx === areaGroup.subjects.length - 1;
                                      const sem1State = subject.semesters.includes(1) 
                                        ? getCellCheckState(planGrade, group.id, subject.name, 1, subject.isRecommended) 
                                        : 'off';
                                      const sem2State = subject.semesters.includes(2) 
                                        ? getCellCheckState(planGrade, group.id, subject.name, 2, subject.isRecommended) 
                                        : 'off';

                                      const isRowConsultant = sem1State === 'consultant' || sem2State === 'consultant';
                                      const isRowAi = !isRowConsultant && (sem1State === 'ai' || sem2State === 'ai');
                                      const isRowChecked = isRowConsultant || isRowAi;

                                      const rowBgColor = isRowConsultant 
                                        ? '#f0fdf4' 
                                        : isRowAi 
                                        ? '#f0f7ff' 
                                        : '#ffffff';

                                      return (
                                        <tr key={`${group.id}-${areaGroup.area}-${subject.name}-${sIdx}`} style={{ 
                                          backgroundColor: rowBgColor,
                                          borderBottom: isLastInGroup ? '2px solid #94a3b8' : '1px solid #e2e8f0',
                                          borderTop: (aIdx === 0 && sIdx === 0) ? '2px solid #94a3b8' : 'none',
                                          transition: 'background-color 0.2s ease'
                                        }}>
                                        {aIdx === 0 && sIdx === 0 && (
                                          <td rowSpan={group.subjects.length} style={{ 
                                            padding: '0.65rem 0.4rem', 
                                            borderRight: '1px solid #cbd5e1', 
                                            fontWeight: 'bold', 
                                            color: '#0f172a', 
                                            textAlign: 'center', 
                                            backgroundColor: '#ffffff',
                                            verticalAlign: 'middle'
                                          }}>
                                            {(() => {
                                              const groupSelectedCount = getGroupSelectedCount(planGrade, group);
                                              return (
                                                <div style={{ color: '#0f172a', fontSize: '0.78rem', fontWeight: '800', lineHeight: '1.4' }}>
                                                  {group.id.startsWith('pdf-group') ? '선택과목' : group.id}<br/>
                                                  <span style={{ color: '#2563eb', fontWeight: '800', fontSize: '0.78rem' }}>[택{group.selectCount}]</span><br/>
                                                  <span style={{ color: '#94a3b8', fontSize: '0.72rem', fontWeight: '400' }}>({group.credits || 4}학점)</span>
                                                  <div style={{ marginTop: '0.4rem' }}>
                                                    {groupSelectedCount === group.selectCount ? (
                                                      <span style={{
                                                        display: 'inline-block',
                                                        fontSize: '0.68rem',
                                                        fontWeight: '800',
                                                        padding: '0.15rem 0.45rem',
                                                        borderRadius: '9999px',
                                                        backgroundColor: '#dcfce7',
                                                        color: '#15803d',
                                                        border: '1px solid #86efac',
                                                        boxShadow: '0 1px 2px rgba(0,0,0,0.04)'
                                                      }}>
                                                        선택 완료 ({groupSelectedCount}/{group.selectCount})
                                                      </span>
                                                    ) : groupSelectedCount < group.selectCount ? (
                                                      <span style={{
                                                        display: 'inline-block',
                                                        fontSize: '0.68rem',
                                                        fontWeight: '700',
                                                        padding: '0.15rem 0.45rem',
                                                        borderRadius: '9999px',
                                                        backgroundColor: '#eff6ff',
                                                        color: '#1d4ed8',
                                                        border: '1px solid #bfdbfe'
                                                      }}>
                                                        {groupSelectedCount}/{group.selectCount} 선택
                                                      </span>
                                                    ) : (
                                                      <span style={{
                                                        display: 'inline-block',
                                                        fontSize: '0.68rem',
                                                        fontWeight: '800',
                                                        padding: '0.15rem 0.45rem',
                                                        borderRadius: '9999px',
                                                        backgroundColor: '#fee2e2',
                                                        color: '#b91c1c',
                                                        border: '1px solid #fca5a5'
                                                      }}>
                                                        초과 {groupSelectedCount}/{group.selectCount}
                                                      </span>
                                                    )}
                                                  </div>
                                                </div>
                                              );
                                            })()}
                                          </td>
                                        )}
                                        {sIdx === 0 && (
                                          <td rowSpan={areaGroup.subjects.length} style={{ 
                                            padding: '0.65rem 0.4rem', 
                                            borderRight: '1px solid #cbd5e1', 
                                            color: '#1e293b', 
                                            fontWeight: '700', 
                                            fontSize: '0.82rem',
                                            backgroundColor: '#ffffff',
                                            textAlign: 'center',
                                            verticalAlign: 'middle'
                                          }}>
                                            {renderAreaName(areaGroup.area)}
                                          </td>
                                        )}
                                        <td style={{ 
                                          padding: '0.65rem 0.8rem', 
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
                                                   <div style={{ display: 'inline-flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.3rem' }}>
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
                                                         gap: '0.3rem',
                                                         fontWeight: isRowChecked ? '800' : '700',
                                                         fontSize: '0.94rem',
                                                         textDecoration: 'none'
                                                       }}
                                                       className="hover:text-blue-700 transition-colors group cursor-pointer"
                                                     >
                                                       <span>{exParts[0]}</span>
                                                       <Info style={{ width: '0.8rem', height: '0.8rem', color: isRowConsultant ? '#16a34a' : isRowAi ? '#2563eb' : '#94a3b8', opacity: 0.85, flexShrink: 0 }} />
                                                     </button>

                                                     <span style={{ 
                                                       color: '#2563eb', 
                                                       fontWeight: '800', 
                                                       fontSize: '0.72rem',
                                                       backgroundColor: '#eff6ff',
                                                       padding: '0.1rem 0.35rem',
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
                                                         gap: '0.3rem',
                                                         fontWeight: isRowChecked ? '800' : '700',
                                                         fontSize: '0.94rem',
                                                         textDecoration: 'none'
                                                       }}
                                                       className="hover:text-blue-700 transition-colors group cursor-pointer"
                                                     >
                                                       <span>{exParts[1]}</span>
                                                       <Info style={{ width: '0.8rem', height: '0.8rem', color: isRowConsultant ? '#16a34a' : isRowAi ? '#2563eb' : '#94a3b8', opacity: 0.85, flexShrink: 0 }} />
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
                                                     gap: '0.45rem',
                                                     fontWeight: isRowChecked ? '800' : '700',
                                                     fontSize: '0.94rem',
                                                     textDecoration: 'none'
                                                   }}
                                                   className="hover:text-blue-700 transition-colors group cursor-pointer"
                                                 >
                                                   <span style={{ textDecoration: 'none' }}>
                                                     {subject.name}
                                                   </span>
                                                   <Info style={{ 
                                                     width: '0.82rem', 
                                                     height: '0.82rem', 
                                                     color: isRowConsultant ? '#16a34a' : isRowAi ? '#2563eb' : '#94a3b8', 
                                                     opacity: 0.85,
                                                     flexShrink: 0
                                                   }} />
                                                   {subject.evalInfo?.isCsat && (
                                                     <span style={{ 
                                                       fontSize: '0.68rem', 
                                                       backgroundColor: '#ffedd5', 
                                                       color: '#c2410c', 
                                                       border: '1px solid #fdba74', 
                                                       borderRadius: '4px', 
                                                       padding: '0.1rem 0.35rem', 
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
                                      <td style={{ padding: '0.65rem 0.4rem', borderRight: '1px solid #cbd5e1', textAlign: 'center' }}>
                                        {(() => {
                                          const typeStyle = getSubjectTypeBadgeStyle(subject.type);
                                          return (
                                            <span style={{ 
                                              fontSize: '0.74rem', 
                                              padding: '0.18rem 0.55rem', 
                                              borderRadius: '9999px', 
                                              fontWeight: '700',
                                              backgroundColor: typeStyle.bg,
                                              color: typeStyle.text,
                                              border: `1px solid ${typeStyle.border}`,
                                              display: 'inline-block',
                                              whiteSpace: 'nowrap',
                                              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)'
                                            }}>
                                              {typeStyle.label}
                                            </span>
                                          );
                                        })()}
                                      </td>
                                      <td style={{ padding: '0.65rem 0.4rem', borderRight: '1px solid #cbd5e1', textAlign: 'center' }}>
                                        {subject.semesters.includes(1) && renderSemesterCheckbox(planGrade, group.id, subject.name, 1, subject.isRecommended)}
                                      </td>
                                      <td style={{ padding: '0.65rem 0.4rem', borderRight: '1px solid #cbd5e1', textAlign: 'center' }}>
                                        {subject.semesters.includes(2) && renderSemesterCheckbox(planGrade, group.id, subject.name, 2, subject.isRecommended)}
                                      </td>
                                      <td style={{ padding: '0.55rem 0.4rem', borderRight: '1px solid #cbd5e1', textAlign: 'center' }}>
                                        <span style={{ 
                                          fontSize: '0.74rem', 
                                          padding: '0.16rem 0.45rem', 
                                          borderRadius: '5px', 
                                          fontWeight: '700',
                                          backgroundColor: subject.evalInfo?.badgeBg || '#eff6ff',
                                          color: subject.evalInfo?.badgeText || '#1e40af',
                                          border: `1px solid ${subject.evalInfo?.badgeBorder || '#bfdbfe'}`,
                                          whiteSpace: 'nowrap',
                                          display: 'inline-block'
                                        }}>
                                          {subject.evalInfo?.displayTitle || subject.gradingType}
                                        </span>
                                      </td>
                                      <td style={{ padding: '0.65rem 0.4rem' }}></td>
                                    </tr>
                                  );
                                })}
                              </Fragment>
                            ))}
                          </Fragment>
                        ))}
                        </tbody>
                        </table>
                      </div>
                      
                      <div style={{ padding: '1rem 1.6rem', borderTop: '1px solid #e2e8f0', backgroundColor: '#f8fafc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ fontSize: '0.76rem', color: '#64748b', fontStyle: 'normal' }}>
                          * 본 계획서는 학생의 전공 적합성을 고려한 추천 안이며, 실제 수강 신청 시 학교 교육과정 편성 현황에 따라 변경될 수 있습니다.
                        </div>
                        <div style={{ fontSize: '0.82rem', fontWeight: '700', color: '#1e293b' }}>
                          제작 : 숭신고등학교 진로전담교사 김강석
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-50 p-4 border-t border-slate-200 text-center print:hidden">
                      <p className="text-xs text-slate-500 font-medium">
                        * 위 체크박스는 대학별 권장 과목을 바탕으로 자동 생성되었습니다. <br />
                        * 실제 수강신청 시에는 본인의 적성과 진로 계획을 충분히 고려하시기 바랍니다.
                      </p>
                    </div>
                  </div>
                )}
              </div>

            {/* Footer Note */}
            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100 flex gap-4 print:hidden">
              <Info className="text-blue-600 w-6 h-6 shrink-0" />
              <div className="text-sm text-blue-800 space-y-2">
                <p className="font-bold">안내 사항</p>
                <p>위 과목 리스트는 일반적인 권장 사항이며, 실제 학교의 교육과정 편성 현황에 따라 다를 수 있습니다.</p>
                <p>대학별로 요구하는 핵심 권장 과목이 다를 수 있으니, 목표 대학의 입학처 홈페이지를 반드시 참고하시기 바랍니다.</p>
              </div>
            </div>
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-12 print:hidden">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-4">
          <div className="flex justify-center gap-4">
            <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-slate-900 font-bold text-lg">
              성남지역 고등학교 선택과목 가이드 · {selectedSchool.name}
            </p>
            <p className="text-slate-800 text-sm font-bold">
              제작 : 숭신고등학교 진로전담교사 김강석
            </p>
            <p className="text-slate-400 text-sm">
              이 자료는 학과바이블(캠퍼스멘토) 및 각 시도교육청, 대학 권장과목, 각 고등학교 2027학년도 교육과정 편제표를 바탕으로 제작되었습니다.
            </p>
          </div>
        </div>
      </footer>

      {/* PDF Review Modal */}
      <AnimatePresence>
        {showPdfReview && parsedData && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col"
              >
                <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 text-blue-600 rounded-xl">
                      <FileCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-xl font-black text-slate-900">추출된 교육과정 확인</h2>
                      <p className="text-sm text-slate-500">AI가 분석한 내용을 확인하고 학교명을 지정해주세요.</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setShowPdfReview(false)}
                    className="p-2 hover:bg-slate-200 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6 text-slate-400" />
                  </button>
                </div>

                {/* School Name Configuration */}
                <div className="px-6 py-3.5 bg-blue-50/70 border-b border-blue-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <School className="w-5 h-5 text-blue-600 shrink-0" />
                    <label className="text-xs font-bold text-slate-800 whitespace-nowrap">고등학교 이름:</label>
                    <input
                      type="text"
                      value={customSchoolName}
                      onChange={(e) => setCustomSchoolName(e.target.value)}
                      placeholder="고등학교 이름 (예: 분당고등학교)"
                      className="bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-800 outline-none focus:border-blue-500 w-52 sm:w-64"
                    />
                  </div>
                  <span className="text-[11px] text-slate-500">
                    반영 시 학교 목록에 등록되어 언제든 전환할 수 있습니다.
                  </span>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-8">
                  {/* Mandatory Subjects */}
                  <section className="space-y-4">
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                      <span className="w-1.5 h-5 bg-blue-600 rounded-full"></span>
                      학년별 필수(지정) 과목
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[2, 3].map((grade, grIdx) => (
                        <div key={`grade-${grade}-${grIdx}`} className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                          <h4 className="font-bold text-slate-700 mb-3">{grade}학년 필수</h4>
                          <div className="flex flex-wrap gap-2">
                            {parsedData.mandatory[grade]?.length > 0 ? (
                              parsedData.mandatory[grade].map((s, i) => (
                                <span key={`mand-${grade}-${s.name}-${i}`} className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 shadow-sm">
                                  {s.name} 
                                  <span className="ml-1 text-[10px] text-blue-500">
                                    ({s.semesters.join(', ')}학기)
                                  </span>
                                </span>
                              ))
                            ) : (
                              <p className="text-sm text-slate-400 italic">추출된 과목이 없습니다.</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Selection Groups */}
                  <section className="space-y-4">
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                      <span className="w-1.5 h-5 bg-purple-600 rounded-full"></span>
                      학년별 선택 과목군
                    </h3>
                    <div className="space-y-4">
                      {parsedData.groups.length > 0 ? (
                        parsedData.groups.map((group, idx) => (
                          <div key={`parsed-group-${group.id || idx}-${idx}`} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:border-purple-200 transition-colors">
                            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                              <div className="flex items-center gap-3">
                                <span className="px-2.5 py-1 bg-purple-50 text-purple-700 rounded-lg text-xs font-bold">
                                  {group.grade}학년 {group.semester}
                                </span>
                                <span className="text-slate-900 font-bold">{group.description}</span>
                              </div>
                              <div className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold">
                                {group.subjects.length}개 중 {group.selectCount}개 선택
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {group.subjects.map((s, i) => (
                                <span key={`parsed-subj-${s.name}-${i}`} className="px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-lg text-xs text-slate-600">
                                  {s.name}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-slate-400">
                          추출된 선택 과목군이 없습니다.
                        </div>
                      )}
                    </div>
                  </section>
                </div>

                <div className="p-6 border-t border-slate-100 bg-slate-50 flex gap-3">
                  <button 
                    onClick={() => setShowPdfReview(false)}
                    className="flex-1 py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl font-bold hover:bg-slate-100 transition-all"
                  >
                    취소
                  </button>
                  <button 
                    onClick={applyParsedData}
                    className="flex-[2] py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
                  >
                    확인 및 반영하기
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* 추가 학교 업로드 및 등록 모달 */}
        <AnimatePresence>
          {showAddSchoolModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-white w-full max-w-4xl max-h-[92vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col"
              >
                {/* Modal Header */}
                <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-blue-600 text-white rounded-2xl shadow-sm">
                      <School className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                        <span>추가 고등학교 편제표 등록 및 관리</span>
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
                          {schools.length}개 학교 등록됨
                        </span>
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        새 학교의 2022 개정 교육과정 편성표를 업로드하거나 성남지역 고등학교를 즉시 적용할 수 있습니다.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowAddSchoolModal(false)}
                    className="p-2 hover:bg-slate-200 rounded-full transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5 text-slate-400" />
                  </button>
                </div>

                {/* Tab Navigation */}
                <div className="flex border-b border-slate-200 bg-slate-100/60 px-6 pt-3 gap-2 overflow-x-auto">
                  <button
                    onClick={() => setAddSchoolTab('pdf')}
                    className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all border-b-2 cursor-pointer ${
                      addSchoolTab === 'pdf'
                        ? 'bg-white text-blue-600 border-blue-600 shadow-2xs'
                        : 'text-slate-600 border-transparent hover:text-slate-900 hover:bg-white/50'
                    }`}
                  >
                    <UploadCloud className="w-4 h-4" />
                    <span>PDF 파일 자동 분석</span>
                  </button>
                  <button
                    onClick={() => setAddSchoolTab('preset')}
                    className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all border-b-2 cursor-pointer ${
                      addSchoolTab === 'preset'
                        ? 'bg-white text-blue-600 border-blue-600 shadow-2xs'
                        : 'text-slate-600 border-transparent hover:text-slate-900 hover:bg-white/50'
                    }`}
                  >
                    <Building2 className="w-4 h-4" />
                    <span>성남지역 고등학교 라이브러리 ({schools.length})</span>
                  </button>
                  <button
                    onClick={() => setAddSchoolTab('text')}
                    className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all border-b-2 cursor-pointer ${
                      addSchoolTab === 'text'
                        ? 'bg-white text-blue-600 border-blue-600 shadow-2xs'
                        : 'text-slate-600 border-transparent hover:text-slate-900 hover:bg-white/50'
                    }`}
                  >
                    <FileText className="w-4 h-4" />
                    <span>텍스트 / 표 붙여넣기 변환</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowAddSchoolModal(false);
                      setShowCustomForm(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900 rounded-t-xl transition-all border-b-2 border-transparent hover:bg-white/50 cursor-pointer ml-auto"
                  >
                    <Settings className="w-4 h-4" />
                    <span>직접 서식 작성 폼</span>
                  </button>
                </div>

                {/* Tab Contents */}
                <div className="flex-1 overflow-y-auto p-6">
                  {/* PDF Upload Tab */}
                  {addSchoolTab === 'pdf' && (
                    <div className="space-y-6 max-w-2xl mx-auto py-2">
                      <div className="text-center space-y-2">
                        <h4 className="text-lg font-black text-slate-900">
                          학교 교육과정 편성표 PDF 업로드
                        </h4>
                        <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                          학교 알리미 또는 학교 공지사항의 '2025~2027학년도 입학생 교육과정 편성표' PDF 파일을 업로드하시면,
                          Gemini AI가 2·3학년 필수과목과 선택과목군(택1, 택4, 택5 등)을 자동으로 분석하여 편제표를 생성합니다.
                        </p>
                      </div>

                      {/* Dropzone Area */}
                      <div
                        onClick={() => !isParsingPdf && fileInputRef.current?.click()}
                        className={`p-8 border-2 border-dashed rounded-3xl text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-4 ${
                          isParsingPdf 
                            ? 'bg-blue-50/50 border-blue-300 pointer-events-none' 
                            : 'border-blue-300 hover:border-blue-600 bg-blue-50/20 hover:bg-blue-50/50'
                        }`}
                      >
                        <div className="p-4 bg-blue-100 text-blue-600 rounded-2xl">
                          {isParsingPdf ? (
                            <Loader2 className="w-8 h-8 animate-spin" />
                          ) : (
                            <UploadCloud className="w-8 h-8" />
                          )}
                        </div>

                        {isParsingPdf ? (
                          <div className="space-y-1">
                            <p className="text-sm font-black text-blue-800">
                              AI가 고등학교 교육과정 편성표를 정밀 분석 중입니다...
                            </p>
                            <p className="text-xs text-blue-600">
                              학교명, 필수 이수 단위 및 학기별 선택과목군 추출 중 (약 5~10초 소요)
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-1">
                            <p className="text-sm font-bold text-slate-800">
                              클릭하여 교육과정 편성표 PDF 파일 선택
                            </p>
                            <p className="text-xs text-slate-500">
                              지원 형식: .pdf (문서 내 텍스트나 표가 포함된 고등학교 편제표)
                            </p>
                          </div>
                        )}

                        <button
                          type="button"
                          disabled={isParsingPdf}
                          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md transition-all disabled:opacity-50"
                        >
                          {isParsingPdf ? '분석 중...' : 'PDF 파일 찾아보기'}
                        </button>
                      </div>

                      {/* Instructions */}
                      <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 text-xs text-slate-600 space-y-2">
                        <div className="font-bold text-slate-800 flex items-center gap-1.5">
                          <Info className="w-4 h-4 text-blue-600" />
                          <span>업로드 팁 & 권장 형식</span>
                        </div>
                        <ul className="list-disc list-inside space-y-1 text-slate-500 leading-relaxed">
                          <li>2022 개정교육과정이 적용되는 2025~2027학년도 고등학교 입학생 교육과정 편성표 권장</li>
                          <li>표 형태의 필수과목, 교과(군) 간 선택과목군(택4, 택5, 택1 등), 이수단위/학점이 기재된 문서</li>
                          <li>분석 완료 후 세부 내용을 미리 확인하고 학교명을 원하는 대로 수정하여 등록할 수 있습니다.</li>
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Preset Schools Tab */}
                  {addSchoolTab === 'preset' && (
                    <div className="space-y-5">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                        <div>
                          <h4 className="text-base font-black text-slate-900">
                            성남지역 고등학교 편제표 라이브러리
                          </h4>
                          <p className="text-xs text-slate-500">
                            성남시 관내 일반계 고등학교 편제표를 원클릭으로 비교 및 적용합니다. (특성화·예술고 7개교 제외)
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={handleResetToDefaultSchools}
                          className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer self-start sm:self-auto shrink-0"
                          title="기본 학교 목록으로 초기화"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          <span>기본 목록 복원</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                        {presetFilteredSchools.map((school, idx) => {
                          const isCurrent = school.id === selectedSchool.id;
                          const isCustom = !INITIAL_SCHOOLS.some(init => init.id === school.id);
                          return (
                            <div
                              key={`${school.id}-${idx}`}
                              className={`p-4 rounded-2xl border-2 transition-all flex flex-col justify-between ${
                                isCurrent
                                  ? 'border-blue-600 bg-blue-50/70 shadow-sm'
                                  : 'border-slate-200 bg-white hover:border-blue-300 hover:shadow-xs'
                              }`}
                            >
                              <div>
                                <div className="flex items-center justify-between gap-2 mb-1.5">
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-blue-100 text-blue-800">
                                      {school.typeBadge}
                                    </span>
                                    <span className="text-[11px] text-slate-500">{school.location}</span>
                                    {isCustom && (
                                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-100 text-amber-800">
                                        사용자 등록
                                      </span>
                                    )}
                                  </div>
                                  {isCustom && (
                                    <button
                                      type="button"
                                      onClick={(e) => handleDeleteCustomSchool(school.id, e)}
                                      className="text-slate-400 hover:text-red-500 p-1 rounded-md"
                                      title="학교 삭제"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  )}
                                </div>

                                <h5 className="font-extrabold text-slate-900 text-sm">
                                  {school.name}
                                </h5>
                                <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                                  {school.description}
                                </p>
                              </div>

                              <div className="mt-3 pt-2.5 border-t border-slate-200/70 flex items-center justify-between">
                                <span className="text-[11px] font-medium text-slate-500">
                                  선택군 {school.groups.length}개 · 2027 편성
                                </span>
                                {isCurrent ? (
                                  <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 bg-white px-2.5 py-1 rounded-lg border border-blue-200">
                                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                                    현재 적용 중
                                  </span>
                                ) : (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setSelectedSchoolId(school.id);
                                      setShowAddSchoolModal(false);
                                    }}
                                    className="px-3 py-1 bg-slate-900 hover:bg-blue-600 text-white rounded-lg text-xs font-bold transition-all cursor-pointer"
                                  >
                                    이 학교 적용하기
                                  </button>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Text Paste Tab */}
                  {addSchoolTab === 'text' && (
                    <div className="space-y-4 max-w-2xl mx-auto py-2">
                      <div className="space-y-1">
                        <h4 className="text-base font-black text-slate-900">
                          교육과정 편성표 텍스트 또는 표 붙여넣기
                        </h4>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          한글(HWP), 엑셀, 웹페이지의 교육과정 편성표 표나 텍스트를 그대로 복사하여 아래에 붙여넣으세요.
                          Gemini AI가 정식 과목명과 학기별 선택군을 구조화하여 즉시 반영합니다.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <textarea
                          value={pastedCurriculumText}
                          onChange={(e) => setPastedCurriculumText(e.target.value)}
                          placeholder={`예시:\n[성남제일고등학교 2027학년도 교육과정]\n2학년 1학기 필수: 문학, 대수, 영어Ⅰ, 운동과 건강\n2학년 1학기 선택군 (택4): 세계시민과 지리, 세계사, 사회와 문화, 물리학, 화학, 생명과학, 지구과학, 프로그래밍\n2학년 1학기 외국어 (택1): 중국어, 일본어\n3학년 1학기 선택군 (택5): 미적분Ⅱ, 경제 수학, 인문학과 윤리, 전자기와 양자, 화학 반응의 세계...`}
                          className="w-full h-56 p-4 bg-slate-50 border border-slate-300 rounded-2xl text-xs font-mono text-slate-800 placeholder-slate-400 outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all resize-none"
                        />
                      </div>

                      <div className="flex items-center justify-between gap-3 pt-2">
                        <span className="text-[11px] text-slate-500">
                          입력 후 [AI로 분석 및 등록] 버튼을 누르면 검토 창이 열립니다.
                        </span>
                        <button
                          type="button"
                          onClick={handleParsePastedText}
                          disabled={isParsingText || !pastedCurriculumText.trim()}
                          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        >
                          {isParsingText ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Sparkles className="w-4 h-4" />
                          )}
                          <span>{isParsingText ? 'AI 분석 중...' : 'AI로 분석 및 등록하기'}</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Modal Footer */}
                <div className="p-4 px-6 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>등록된 학교는 브라우저에 안전하게 보관되어 새로고침 후에도 유지됩니다.</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowAddSchoolModal(false)}
                    className="px-4 py-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold rounded-xl transition-all cursor-pointer"
                  >
                    닫기
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* 직접 입력 모달 */}
        <AnimatePresence>
          {showCustomForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCustomForm(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-600 p-2 rounded-xl text-white">
                    <Settings className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">교육과정 직접 입력</h3>
                    <p className="text-xs text-slate-500">학년별 선택 그룹과 과목을 직접 구성합니다.</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowCustomForm(false)}
                  className="p-2 hover:bg-slate-200 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* School Name Input */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <School className="w-5 h-5 text-blue-600 shrink-0" />
                    <label className="text-xs font-bold text-slate-800 whitespace-nowrap">고등학교 이름:</label>
                    <input
                      type="text"
                      value={customSchoolName}
                      onChange={(e) => setCustomSchoolName(e.target.value)}
                      placeholder="예: 분당고등학교"
                      className="bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-800 outline-none focus:border-blue-500 w-52"
                    />
                  </div>
                  <span className="text-[11px] text-slate-500">
                    저장 시 고등학교 목록에 추가되어 언제든 선택할 수 있습니다.
                  </span>
                </div>

                {/* Mandatory Subjects Section */}
                <div className="p-6 bg-blue-50/50 rounded-2xl border border-blue-100 space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    <h4 className="font-bold text-slate-800">학년별 필수 과목</h4>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 ml-1">2학년 1학기 필수</label>
                      <textarea 
                        value={tempMandatory['2-1']}
                        onChange={(e) => setTempMandatory({...tempMandatory, '2-1': e.target.value})}
                        placeholder="과목명을 쉼표(,)로 구분하여 입력"
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none h-20 resize-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 ml-1">2학년 2학기 필수</label>
                      <textarea 
                        value={tempMandatory['2-2']}
                        onChange={(e) => setTempMandatory({...tempMandatory, '2-2': e.target.value})}
                        placeholder="과목명을 쉼표(,)로 구분하여 입력"
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none h-20 resize-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 ml-1">3학년 1학기 필수</label>
                      <textarea 
                        value={tempMandatory['3-1']}
                        onChange={(e) => setTempMandatory({...tempMandatory, '3-1': e.target.value})}
                        placeholder="과목명을 쉼표(,)로 구분하여 입력"
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none h-20 resize-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 ml-1">3학년 2학기 필수</label>
                      <textarea 
                        value={tempMandatory['3-2']}
                        onChange={(e) => setTempMandatory({...tempMandatory, '3-2': e.target.value})}
                        placeholder="과목명을 쉼표(,)로 구분하여 입력"
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none h-20 resize-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-slate-400" />
                    <h4 className="font-bold text-slate-800">선택 과목 그룹</h4>
                  </div>
                  <button 
                    onClick={handleAddGroup}
                    className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                    추가하기
                  </button>
                </div>

                {tempGroups.map((group, index) => (
                  <div key={`${group.id}-${index}`} className="p-6 bg-slate-50 rounded-2xl border border-slate-200 relative group">
                    <button 
                      onClick={() => handleRemoveGroup(group.id)}
                      className="absolute -top-2 -right-2 bg-white border border-slate-200 p-1.5 rounded-full text-slate-400 hover:text-red-500 hover:border-red-200 shadow-sm opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 ml-1">학년</label>
                        <select 
                          value={group.grade}
                          onChange={(e) => handleUpdateGroup(group.id, 'grade', parseInt(e.target.value))}
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        >
                          <option value={2}>2학년</option>
                          <option value={3}>3학년</option>
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 ml-1">학기</label>
                        <select 
                          value={group.semester}
                          onChange={(e) => handleUpdateGroup(group.id, 'semester', e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        >
                          <option value="1학기">1학기</option>
                          <option value="2학기">2학기</option>
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 ml-1">학점</label>
                        <input 
                          type="number"
                          value={group.credits}
                          onChange={(e) => handleUpdateGroup(group.id, 'credits', parseInt(e.target.value))}
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 ml-1">선택과목수</label>
                        <input 
                          type="number"
                          value={group.selectCount}
                          onChange={(e) => handleUpdateGroup(group.id, 'selectCount', parseInt(e.target.value))}
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 ml-1">선택과목 리스트 (쉼표로 구분)</label>
                      <textarea 
                        value={group.subjects}
                        onChange={(e) => handleUpdateGroup(group.id, 'subjects', e.target.value)}
                        placeholder="예: 물리학, 화학, 생명과학, 지구과학"
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none min-h-[80px] resize-none"
                      />
                    </div>
                  </div>
                ))}

                <button 
                  onClick={handleAddGroup}
                  className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 font-bold flex items-center justify-center gap-2 hover:bg-slate-50 hover:border-blue-200 hover:text-blue-500 transition-all"
                >
                  <Plus className="w-5 h-5" />
                  항목 추가하기
                </button>
              </div>

              <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
                <button 
                  onClick={() => setShowCustomForm(false)}
                  className="px-6 py-2.5 text-sm font-bold text-slate-500 hover:text-slate-700"
                >
                  취소
                </button>
                <button 
                  onClick={handleDone}
                  className="px-8 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 active:scale-95 transition-all flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  교육과정 생성 완료
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 과목 상세 안내 팝업 모달 */}
      <SubjectDetailModal 
        subjectDetail={selectedSubjectModal} 
        onClose={() => setSelectedSubjectModal(null)} 
      />

      {/* 학교 간 1:1 교육과정 편제표 비교 모달 */}
      <SchoolCompareModal
        isOpen={showCompareModal}
        onClose={() => setShowCompareModal(false)}
        schools={schools}
        currentSchool={selectedSchool}
        selectedMajor={selectedMajor}
        onSelectSchool={(schoolId) => setSelectedSchoolId(schoolId)}
      />

      {/* 대학별 지정 현황 팝업 모달 */}
      {univDesignationModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="p-4 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-base flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-200" />
                  {univDesignationModal.subjectName} {univDesignationModal.semester}학기 — 대학별 지정 현황
                </h3>
                <p className="text-xs text-blue-100 mt-0.5">
                  {selectedMajor ? `[${selectedMajor.name}] 진학 및 주요 대학 전공 연계 지정 현황` : '주요 대학 입시 핵심 및 권장과목 현황'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setUnivDesignationModal(null)}
                className="p-1 rounded-lg hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 max-h-[60vh] overflow-y-auto space-y-2">
              {(() => {
                const curState = getCellCheckState(
                  univDesignationModal.grade,
                  univDesignationModal.groupId,
                  univDesignationModal.subjectName,
                  univDesignationModal.semester,
                  univDesignationModal.isAiRecommended
                );
                const selected = curState === 'ai' || curState === 'consultant';
                return (
                  <div className={`flex items-center gap-2 text-xs font-bold rounded-xl p-2.5 border ${
                    selected ? 'bg-blue-50 border-blue-200 text-blue-800' : 'bg-slate-100 border-slate-300 text-slate-700'
                  }`}>
                    <span>{selected ? '✅ 현재 선택됨' : '⛔ 현재 선택 해지됨'}</span>
                    <span className="font-medium text-[11px] opacity-80">
                      {selected
                        ? '성적 등 사정이 있으면 아래 [선택 해지]를 누르세요. 해지해도 이 목록은 계속 볼 수 있습니다.'
                        : '해지 상태에서도 대학별 지정 현황을 볼 수 있습니다. 필요하면 [다시 선택]을 누르세요.'}
                    </span>
                  </div>
                );
              })()}
              {(() => {
                const list = getUnivDesignationsForSubject(univDesignationModal.subjectName, selectedMajor?.name);
                if (list.length === 0) {
                  return (
                    <div className="text-center py-8 text-slate-500 text-sm">
                      {selectedMajor ? (
                        <>
                          현재 등록된 주요 대학 모집단위 중 <strong className="text-blue-700">[{selectedMajor.name}]</strong> 관련하여 
                          <br />
                          <strong className="text-slate-800">[{univDesignationModal.subjectName}]</strong> 과목을 핵심 또는 권장과목으로 지정한 내역이 없습니다.
                        </>
                      ) : (
                        `현재 등록된 주요 대학 모집단위 중 [${univDesignationModal.subjectName}] 과목을 핵심 또는 권장과목으로 지정한 내역이 없습니다.`
                      )}
                    </div>
                  );
                }
                const coreCount = list.filter(x => x.type === '핵심과목').length;
                const recCount = list.filter(x => x.type === '권장과목').length;
                return (
                  <>
                    <div className="flex items-center justify-between text-xs bg-blue-50 border border-blue-200 rounded-xl p-2.5 mb-2">
                      <span className="text-blue-900 font-semibold">
                        {selectedMajor && <span className="font-extrabold text-blue-700">[{selectedMajor.name}] </span>}
                        총 <strong className="text-blue-700">{list.length}개</strong> 모집단위 지정
                      </span>
                      <div className="flex gap-2">
                        {coreCount > 0 && <span className="font-bold text-blue-700">핵심과목 {coreCount}개</span>}
                        {recCount > 0 && <span className="font-bold text-emerald-700">권장과목 {recCount}개</span>}
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      {list.map((item, idx) => (
                        <div
                          key={`desig-${item.univ}-${item.major}-${idx}`}
                          className="flex items-center justify-between p-2.5 bg-slate-50 hover:bg-blue-50/50 rounded-xl border border-slate-200 text-sm transition-colors"
                        >
                          <div className="flex items-baseline gap-1.5 flex-wrap">
                            <span className="font-bold text-slate-900 text-sm">{item.univ}</span>
                            <span className="text-slate-700 text-sm font-medium">{item.major}</span>
                            <span className={`text-xs font-bold ${item.type === '핵심과목' ? 'text-blue-700' : 'text-emerald-700'}`}>
                              ({item.type})
                            </span>
                          </div>
                          {item.type === '핵심과목' ? (
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-blue-100 text-blue-800 border border-blue-300 shrink-0">
                              핵심과목
                            </span>
                          ) : (
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 shrink-0">
                              권장과목
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </>
                );
              })()}
            </div>

            {/* Modal Footer */}
            <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              {(() => {
                const m = univDesignationModal;
                const curState = getCellCheckState(m.grade, m.groupId, m.subjectName, m.semester, m.isAiRecommended);
                const selected = curState === 'ai' || curState === 'consultant';
                const key = `${m.grade}-${m.groupId}-${m.subjectName}-${m.semester}`;
                const released = !selected && consultantChecks[key] === 'off' && aiRecommendedKeys.has(key);
                return selected ? (
                  <button
                    type="button"
                    onClick={() => handleToggleCell(m.grade, m.groupId, m.subjectName, m.semester, m.isAiRecommended)}
                    className="text-xs text-rose-600 hover:text-rose-700 font-bold px-3 py-1.5 rounded-lg border border-rose-200 hover:bg-rose-50 transition-colors"
                  >
                    선택 해지
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => released
                      ? handleRestoreAiCell(m.grade, m.groupId, m.subjectName, m.semester)
                      : handleToggleCell(m.grade, m.groupId, m.subjectName, m.semester, m.isAiRecommended)}
                    className="text-xs text-blue-700 hover:text-blue-800 font-bold px-3 py-1.5 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors"
                  >
                    다시 선택
                  </button>
                );
              })()}
              <button
                type="button"
                onClick={() => setUnivDesignationModal(null)}
                className="text-xs bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-xl shadow-xs transition-colors"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 text-xs font-semibold px-5 py-3 rounded-2xl shadow-2xl flex items-start gap-3 backdrop-blur-md border animate-in fade-in slide-in-from-bottom-2 pointer-events-none max-w-lg ${
          toastMessage.includes('⚠️')
            ? 'bg-amber-950/95 border-amber-500/50 shadow-amber-950/40 text-amber-100'
            : 'bg-slate-900/95 border-slate-700 shadow-slate-950/40 text-white'
        }`}>
          {toastMessage.includes('⚠️') ? (
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          ) : (
            <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
          )}
          <span className="whitespace-pre-line leading-relaxed">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
