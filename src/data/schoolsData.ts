import { SelectionGroup, SungshinSubject, SUNGSHIN_GROUPS, MANDATORY_SUBJECTS } from './curriculumData';
import { PDF_CURRICULA } from './pdfCurriculaData';

export interface SchoolCurriculum {
  id: string;
  name: string;
  shortName: string;
  typeBadge: string;
  foundation?: '공립' | '사립' | string;
  district?: '분당구' | '수정구' | '중원구' | string;
  location: string;
  year: string;
  description: string;
  tags: string[];
  mandatory: Record<number | string, any>;
  groups: SelectionGroup[];
  hasCurriculum?: boolean;
  externalLink?: string;
}

// 1. 숭신고등학교 (일반고)
export const SUNGSHIN_CURRICULUM: SchoolCurriculum = {
  id: 'sungshin',
  name: '숭신고등학교',
  shortName: '숭신고',
  typeBadge: '일반고',
  district: '중원구',
  location: '경기 성남 중원구',
  year: '2027학년도 입학생 (2022 개정)',
  description: '2027학년도 숭신고 교육과정 편제표 (1학년 공통 및 2·3학년 7개 교과군 간 선택 192학점 체계 운영)',
  tags: ['일반고', '중원구', '숭신고', '2022 개정'],
  mandatory: MANDATORY_SUBJECTS,
  groups: SUNGSHIN_GROUPS
};

// 2. 성남여자고등학교 (일반고)
export const SEONGNAM_GIRLS_CURRICULUM: SchoolCurriculum = {
  id: 'seongnam_girls',
  name: '성남여자고등학교',
  shortName: '성남여고',
  typeBadge: '일반고',
  district: '중원구',
  location: '경기 성남 중원구',
  year: '2027학년도 입학생 (2022 개정)',
  description: '2027학년도 성남여고 공식 교육과정 편제표 (1학년 공통 및 2·3학년 교과군 간 선택 192학점 체계)',
  tags: ['일반고', '중원구', '성남여고', '공식편제', '2022 개정'],
  mandatory: {
    1: [
      { name: '공통국어1', semesters: [1], credit: 4 },
      { name: '공통국어2', semesters: [2], credit: 4 },
      { name: '공통수학1', semesters: [1], credit: 4 },
      { name: '공통수학2', semesters: [2], credit: 4 },
      { name: '공통영어1', semesters: [1], credit: 4 },
      { name: '공통영어2', semesters: [2], credit: 4 },
      { name: '한국사1', semesters: [1], credit: 3 },
      { name: '한국사2', semesters: [2], credit: 3 },
      { name: '통합사회1', semesters: [1], credit: 4 },
      { name: '통합사회2', semesters: [2], credit: 4 },
      { name: '통합과학1', semesters: [1], credit: 4 },
      { name: '통합과학2', semesters: [2], credit: 4 },
      { name: '과학탐구실험1', semesters: [1], credit: 1 },
      { name: '과학탐구실험2', semesters: [2], credit: 1 },
      { name: '체육1', semesters: [1], credit: 2 },
      { name: '체육2', semesters: [2], credit: 2 },
      { name: '음악↔미술', semesters: [1, 2], credit: 3 }
    ],
    2: [
      { name: '문학', semesters: [1], credit: 4 },
      { name: '대수', semesters: [1], credit: 4 },
      { name: '영어Ⅰ', semesters: [1], credit: 4 },
      { name: '운동과 건강', semesters: [1], credit: 2 },
      { name: '화법과 언어', semesters: [2], credit: 4 },
      { name: '미적분Ⅰ', semesters: [2], credit: 4 },
      { name: '영어Ⅱ', semesters: [2], credit: 4 },
      { name: '스포츠 생활1', semesters: [2], credit: 2 }
    ],
    3: [
      { name: '독서와 작문', semesters: [1], credit: 4 },
      { name: '확률과 통계', semesters: [1], credit: 4 },
      { name: '영어 독해와 작문', semesters: [1], credit: 4 },
      { name: '스포츠 문화', semesters: [1], credit: 1 },
      { name: '주제 탐구 독서', semesters: [2], credit: 4 },
      { name: '수학과제 탐구', semesters: [2], credit: 4 },
      { name: '심화 영어 독해와 작문', semesters: [2], credit: 4 },
      { name: '스포츠 과학', semesters: [2], credit: 1 }
    ]
  },
  groups: [
    {
      id: '선택군1',
      grade: 2,
      semester: '1학기',
      selectCount: 5,
      credits: 3,
      description: '2학년 1학기 교과(군) 간 선택 (택5, 15학점)',
      subjects: [
        { name: '기하', semesters: [1] },
        { name: '세계 문화와 영어', semesters: [1] },
        { name: '세계사', semesters: [1] },
        { name: '사회와 문화', semesters: [1] },
        { name: '윤리와 사상', semesters: [1] },
        { name: '여행지리', semesters: [1] },
        { name: '윤리문제 탐구', semesters: [1] },
        { name: '물리학', semesters: [1] },
        { name: '화학', semesters: [1] },
        { name: '생명과학', semesters: [1] },
        { name: '과학의 역사와 문화', semesters: [1] },
        { name: '일본어', semesters: [1] },
        { name: '중국어', semesters: [1] },
        { name: '인공지능 기초', semesters: [1] }
      ]
    },
    {
      id: '선택군2',
      grade: 2,
      semester: '2학기',
      selectCount: 5,
      credits: 3,
      description: '2학년 2학기 교과(군) 간 선택 (택5, 15학점)',
      subjects: [
        { name: '독서 토론과 글쓰기', semesters: [2] },
        { name: '인공지능 수학', semesters: [2] },
        { name: '영미 문학 읽기', semesters: [2] },
        { name: '세계시민과 지리', semesters: [2] },
        { name: '인문학과 윤리', semesters: [2] },
        { name: '경제', semesters: [2] },
        { name: '사회문제 탐구', semesters: [2] },
        { name: '역사로 탐구하는 현대 세계', semesters: [2] },
        { name: '지구과학', semesters: [2] },
        { name: '세포와 물질대사', semesters: [2] },
        { name: '화학 반응의 세계', semesters: [2] },
        { name: '역학과 에너지', semesters: [2] },
        { name: '과학과제 연구', semesters: [2] },
        { name: '일본어 회화', semesters: [2] },
        { name: '중국어 회화', semesters: [2] },
        { name: '소프트웨어와 생활', semesters: [2] }
      ]
    },
    {
      id: '선택군3',
      grade: 3,
      semester: '1학기',
      selectCount: 1,
      credits: 2,
      description: '3학년 1학기 교양/외국어 (택1, 2학점)',
      subjects: [
        { name: '심화 일본어', semesters: [1] },
        { name: '심화 중국어', semesters: [1] },
        { name: '인간과 심리', semesters: [1] },
        { name: '비판적 질문과 창의적 해결', semesters: [1] }
      ]
    },
    {
      id: '선택군4',
      grade: 3,
      semester: '1학기',
      selectCount: 5,
      credits: 3,
      description: '3학년 1학기 교과(군) 간 선택 (택5, 15학점)',
      subjects: [
        { name: '문학과 영상', semesters: [1] },
        { name: '미적분Ⅱ', semesters: [1] },
        { name: '심화 영어', semesters: [1] },
        { name: '법과 사회', semesters: [1] },
        { name: '정치', semesters: [1] },
        { name: '한국지리 탐구', semesters: [1] },
        { name: '현대사회와 윤리', semesters: [1] },
        { name: '역사로 탐구하는 현대 세계', semesters: [1] },
        { name: '전자기와 양자', semesters: [1] },
        { name: '물질과 에너지', semesters: [1] },
        { name: '생물의 유전', semesters: [1] },
        { name: '지구시스템과학', semesters: [1] },
        { name: '행성우주과학', semesters: [1] },
        { name: '융합과학 탐구', semesters: [1] },
        { name: '일본 문화', semesters: [1] },
        { name: '중국 문화', semesters: [1] },
        { name: '데이터 과학', semesters: [1] },
        { name: '생활과학 탐구', semesters: [1] },
        { name: '음악 감상과 비평', semesters: [1] },
        { name: '미술 감상과 비평', semesters: [1] }
      ]
    },
    {
      id: '선택군5',
      grade: 3,
      semester: '2학기',
      selectCount: 1,
      credits: 2,
      description: '3학년 2학기 교양 선택 (택1, 2학점)',
      subjects: [
        { name: '논리와 사고', semesters: [2] },
        { name: '미디어 정보 리터러시', semesters: [2] }
      ]
    },
    {
      id: '선택군6',
      grade: 3,
      semester: '2학기',
      selectCount: 5,
      credits: 3,
      description: '3학년 2학기 교과(군) 간 선택 (택5, 15학점)',
      subjects: [
        { name: '매체 의사소통', semesters: [2] },
        { name: '경제 수학', semesters: [2] },
        { name: '미디어 영어', semesters: [2] },
        { name: '금융과 경제생활', semesters: [2] },
        { name: '동아시아 역사 기행', semesters: [2] },
        { name: '기후변화와 지속가능한 세계', semesters: [2] },
        { name: '여행지리', semesters: [2] },
        { name: '윤리문제 탐구', semesters: [2] },
        { name: '융합과학 탐구', semesters: [2] },
        { name: '과학의 역사와 문화', semesters: [2] },
        { name: '기후변화와 환경생태', semesters: [2] },
        { name: '음악 연주와 창작', semesters: [2] },
        { name: '미술 창작', semesters: [2] }
      ]
    }
  ]
};

// 4. 늘푸른고등학교 (일반고)
export const NEULBLUE_HIGH_CURRICULUM: SchoolCurriculum = {
  id: 'neulblue',
  name: '늘푸른고등학교',
  shortName: '늘푸른고',
  typeBadge: '일반고',
  district: '분당구',
  location: '경기 성남 분당구 정자동',
  year: '2027학년도 입학생 (2022 개정)',
  description: '2027학년도 늘푸른고 공식 교육과정 편제표 (1학년 공통·학기제 교차 및 2·3학년 교과군 간 선택 192학점 체계)',
  tags: ['분당', '일반고', '정자동', '늘푸른고', '공식편제', '2022 개정'],
  mandatory: {
    1: [
      { name: '공통국어1', semesters: [1], credit: 4 },
      { name: '공통국어2', semesters: [2], credit: 4 },
      { name: '공통수학1', semesters: [1], credit: 4 },
      { name: '공통수학2', semesters: [2], credit: 4 },
      { name: '공통영어1', semesters: [1], credit: 4 },
      { name: '공통영어2', semesters: [2], credit: 4 },
      { name: '한국사1', semesters: [1], credit: 3 },
      { name: '한국사2', semesters: [2], credit: 3 },
      { name: '통합사회1', semesters: [1], credit: 4 },
      { name: '통합사회2', semesters: [2], credit: 4 },
      { name: '통합과학1', semesters: [1], credit: 4 },
      { name: '통합과학2', semesters: [2], credit: 4 },
      { name: '과학탐구실험1', semesters: [1], credit: 1 },
      { name: '과학탐구실험2', semesters: [2], credit: 1 },
      { name: '체육1', semesters: [1], credit: 2 },
      { name: '체육2', semesters: [2], credit: 2 },
      { name: '음악↔미술', semesters: [1, 2], credit: 3 }
    ],
    2: [
      { name: '문학', semesters: [1], credit: 4 },
      { name: '대수', semesters: [1], credit: 4 },
      { name: '영어Ⅰ', semesters: [1], credit: 4 },
      { name: '운동과 건강', semesters: [1], credit: 2 },
      { name: '화법과 언어', semesters: [2], credit: 4 },
      { name: '미적분Ⅰ', semesters: [2], credit: 4 },
      { name: '영어Ⅱ', semesters: [2], credit: 4 },
      { name: '스포츠 생활1', semesters: [2], credit: 2 }
    ],
    3: [
      { name: '독서와 작문', semesters: [1], credit: 4 },
      { name: '확률과 통계', semesters: [1], credit: 4 },
      { name: '영어 독해와 작문', semesters: [1], credit: 4 },
      { name: '스포츠 문화', semesters: [1], credit: 1 },
      { name: '독서 토론과 글쓰기', semesters: [2], credit: 4 },
      { name: '전문 수학', semesters: [2], credit: 4 },
      { name: '심화 영어', semesters: [2], credit: 4 },
      { name: '스포츠 과학', semesters: [2], credit: 1 }
    ]
  },
  groups: [
    {
      id: '선택군1',
      grade: 2,
      semester: '1학기',
      selectCount: 5,
      credits: 3,
      description: '2학년 1학기 교과(군) 간 선택 (택5, 15학점)',
      subjects: [
        { name: '문학과 영상', semesters: [1] },
        { name: '기하', semesters: [1] },
        { name: '세계 문화와 영어', semesters: [1] },
        { name: '세계시민과 지리', semesters: [1] },
        { name: '윤리와 사상', semesters: [1] },
        { name: '사회와 문화', semesters: [1] },
        { name: '정치', semesters: [1] },
        { name: '물리학', semesters: [1] },
        { name: '화학', semesters: [1] },
        { name: '생명과학', semesters: [1] },
        { name: '지구과학', semesters: [1] },
        { name: '중국어', semesters: [1] },
        { name: '일본어', semesters: [1] },
        { name: '정보', semesters: [1] }
      ]
    },
    {
      id: '선택군2',
      grade: 2,
      semester: '2학기',
      selectCount: 4,
      credits: 3,
      description: '2학년 2학기 교과(군) 간 선택 (택4, 12학점)',
      subjects: [
        { name: '인공지능 수학', semesters: [2] },
        { name: '현대사회와 윤리', semesters: [2] },
        { name: '법과 사회', semesters: [2] },
        { name: '한국지리 탐구', semesters: [2] },
        { name: '동아시아 역사 기행', semesters: [2] },
        { name: '역학과 에너지', semesters: [2] },
        { name: '물질과 에너지', semesters: [2] },
        { name: '세포와 물질대사', semesters: [2] },
        { name: '지구시스템과학', semesters: [2] },
        { name: '물리학 실험', semesters: [2] },
        { name: '화학 실험', semesters: [2] },
        { name: '생명과학 실험', semesters: [2] },
        { name: '지구과학 실험', semesters: [2] },
        { name: '중국어 회화', semesters: [2] },
        { name: '일본어 회화', semesters: [2] },
        { name: '데이터 과학', semesters: [2] }
      ]
    },
    {
      id: '선택군3',
      grade: 2,
      semester: '2학기',
      selectCount: 1,
      credits: 3,
      description: '2학년 2학기 진로 심화 선택 (택1, 3학점)',
      subjects: [
        { name: '글로벌 이슈와 토론', semesters: [2] },
        { name: '주제 탐구(R&E) 심화', semesters: [2] }
      ]
    },
    {
      id: '선택군4',
      grade: 3,
      semester: '1학기',
      selectCount: 1,
      credits: 2,
      description: '3학년 1학기 예술 선택 (택1, 2학점)',
      subjects: [
        { name: '음악 연주와 창작', semesters: [1] },
        { name: '미술 창작', semesters: [1] }
      ]
    },
    {
      id: '선택군5',
      grade: 3,
      semester: '1학기',
      selectCount: 1,
      credits: 2,
      description: '3학년 1학기 교양 선택 (택1, 2학점)',
      subjects: [
        { name: '인간과 심리', semesters: [1] },
        { name: '논리와 사고', semesters: [1] }
      ]
    },
    {
      id: '선택군6',
      grade: 3,
      semester: '1학기',
      selectCount: 4,
      credits: 3,
      description: '3학년 1학기 교과(군) 간 선택 (택4, 12학점)',
      subjects: [
        { name: '언어생활 탐구', semesters: [1] },
        { name: '미적분Ⅱ', semesters: [1] },
        { name: '심화 영어 독해와 작문', semesters: [1] },
        { name: '전자기와 양자', semesters: [1] },
        { name: '화학 반응의 세계', semesters: [1] },
        { name: '생물의 유전', semesters: [1] },
        { name: '행성우주과학', semesters: [1] },
        { name: '고급 물리학', semesters: [1] },
        { name: '고급 화학', semesters: [1] },
        { name: '고급 생명과학', semesters: [1] },
        { name: '고급 지구과학', semesters: [1] },
        { name: '경제', semesters: [1] },
        { name: '인문학과 윤리', semesters: [1] },
        { name: '사회문제 탐구', semesters: [1] },
        { name: '도시의 미래 탐구', semesters: [1] },
        { name: '여행지리', semesters: [1] },
        { name: '기후변화와 지속가능한 세계', semesters: [1] },
        { name: '중국 문화', semesters: [1] },
        { name: '일본 문화', semesters: [1] },
        { name: '프로그래밍', semesters: [1] }
      ]
    },
    {
      id: '선택군7',
      grade: 3,
      semester: '2학기',
      selectCount: 1,
      credits: 2,
      description: '3학년 2학기 예술 선택 (택1, 2학점)',
      subjects: [
        { name: '음악 감상과 비평', semesters: [2] },
        { name: '미술과 매체', semesters: [2] }
      ]
    },
    {
      id: '선택군8',
      grade: 3,
      semester: '2학기',
      selectCount: 1,
      credits: 2,
      description: '3학년 2학기 교양 선택 (택1, 2학점)',
      subjects: [
        { name: '철학', semesters: [2] },
        { name: '교육의 이해', semesters: [2] }
      ]
    },
    {
      id: '선택군9',
      grade: 3,
      semester: '2학기',
      selectCount: 4,
      credits: 3,
      description: '3학년 2학기 교과(군) 간 선택 (택4, 12학점)',
      subjects: [
        { name: '매체 의사소통', semesters: [2] },
        { name: '수학과 문화', semesters: [2] },
        { name: '실생활 영어 회화', semesters: [2] },
        { name: '영미 문학 읽기', semesters: [2] },
        { name: '역사로 탐구하는 현대 세계', semesters: [2] },
        { name: '금융과 경제생활', semesters: [2] },
        { name: '윤리문제 탐구', semesters: [2] },
        { name: '기후변화와 환경생태', semesters: [2] },
        { name: '과학의 역사와 문화', semesters: [2] },
        { name: '융합과학 탐구', semesters: [2] },
        { name: '인공지능 기초', semesters: [2] },
        { name: '소프트웨어와 생활', semesters: [2] },
        { name: '심화 중국어', semesters: [2] },
        { name: '심화 일본어', semesters: [2] }
      ]
    }
  ]
};

// 5. 낙생고등학교 (과학중점)
export const NAKSAENG_HIGH_CURRICULUM: SchoolCurriculum = {
  id: 'naksaeng',
  name: '낙생고등학교',
  shortName: '낙생고',
  typeBadge: '과학중점',
  district: '분당구',
  location: '경기 성남 분당구 백현동',
  year: '2027학년도 입학생 (2022 개정)',
  description: '2027학년도 낙생고 공식 교육과정 편제표 (1학년 공통·학기제 교차 및 2·3학년 교과군 간 선택 192학점 체계)',
  tags: ['분당', '일반고', '과학중점', '낙생고', '공식편제', '2022 개정'],
  mandatory: {
    1: [
      { name: '공통국어1', semesters: [1], credit: 4 },
      { name: '공통국어2', semesters: [2], credit: 4 },
      { name: '공통수학1', semesters: [1], credit: 4 },
      { name: '공통수학2', semesters: [2], credit: 4 },
      { name: '공통영어1', semesters: [1], credit: 4 },
      { name: '공통영어2', semesters: [2], credit: 4 },
      { name: '한국사1', semesters: [1], credit: 3 },
      { name: '한국사2', semesters: [2], credit: 3 },
      { name: '통합사회1', semesters: [1], credit: 4 },
      { name: '통합사회2', semesters: [2], credit: 4 },
      { name: '통합과학1', semesters: [1], credit: 4 },
      { name: '통합과학2', semesters: [2], credit: 4 },
      { name: '과학탐구실험1', semesters: [1], credit: 1 },
      { name: '과학탐구실험2', semesters: [2], credit: 1 },
      { name: '체육1', semesters: [1], credit: 2 },
      { name: '체육2', semesters: [2], credit: 2 },
      { name: '음악↔미술', semesters: [1, 2], credit: 3 }
    ],
    2: [
      { name: '문학', semesters: [1], credit: 4 },
      { name: '대수', semesters: [1], credit: 4 },
      { name: '영어Ⅰ', semesters: [1], credit: 4 },
      { name: '스포츠 생활1', semesters: [1], credit: 2 },
      { name: '화법과 언어', semesters: [2], credit: 4 },
      { name: '미적분Ⅰ', semesters: [2], credit: 4 },
      { name: '영어Ⅱ', semesters: [2], credit: 4 },
      { name: '스포츠 생활2', semesters: [2], credit: 2 }
    ],
    3: [
      { name: '독서와 작문', semesters: [1], credit: 4 },
      { name: '영어 독해와 작문', semesters: [1], credit: 4 },
      { name: '스포츠 과학', semesters: [1], credit: 1 },
      { name: '음악 감상과 비평↔미술 감상과 비평', semesters: [1, 2], credit: 2 },
      { name: '주제 탐구 독서', semesters: [2], credit: 4 },
      { name: '심화 영어 독해와 작문', semesters: [2], credit: 4 },
      { name: '스포츠 문화', semesters: [2], credit: 1 }
    ]
  },
  groups: [
    {
      id: '선택군1',
      grade: 2,
      semester: '1학기',
      selectCount: 1,
      credits: 3,
      description: '2학년 1학기 제2외국어/정보 선택 (택1, 3학점)',
      subjects: [
        { name: '한문', semesters: [1] },
        { name: '중국어', semesters: [1] },
        { name: '일본어', semesters: [1] },
        { name: '정보', semesters: [1] },
        { name: '인공지능 기초', semesters: [1] }
      ]
    },
    {
      id: '선택군2',
      grade: 2,
      semester: '1학기',
      selectCount: 4,
      credits: 3,
      description: '2학년 1학기 교과(군) 간 선택 (택4, 12학점)',
      subjects: [
        { name: '한국지리 탐구', semesters: [1] },
        { name: '사회와 문화', semesters: [1] },
        { name: '세계시민과 지리', semesters: [1] },
        { name: '현대사회와 윤리', semesters: [1] },
        { name: '물리학', semesters: [1] },
        { name: '화학', semesters: [1] },
        { name: '생명과학', semesters: [1] },
        { name: '지구과학', semesters: [1] },
        { name: '역학과 에너지', semesters: [1] },
        { name: '물질과 에너지', semesters: [1] },
        { name: '세포와 물질대사', semesters: [1] },
        { name: '지구시스템과학', semesters: [1] }
      ]
    },
    {
      id: '선택군3',
      grade: 2,
      semester: '2학기',
      selectCount: 1,
      credits: 3,
      description: '2학년 2학기 제2외국어/정보 선택 (택1, 3학점)',
      subjects: [
        { name: '언어생활과 한자', semesters: [2] },
        { name: '한문 고전 읽기', semesters: [2] },
        { name: '중국어 회화', semesters: [2] },
        { name: '일본어 회화', semesters: [2] },
        { name: '프로그래밍', semesters: [2] },
        { name: '데이터 과학', semesters: [2] }
      ]
    },
    {
      id: '선택군4',
      grade: 2,
      semester: '2학기',
      selectCount: 4,
      credits: 3,
      description: '2학년 2학기 교과(군) 간 선택 (택4, 12학점)',
      subjects: [
        { name: '세계사', semesters: [2] },
        { name: '경제', semesters: [2] },
        { name: '정치', semesters: [2] },
        { name: '법과 사회', semesters: [2] },
        { name: '물리학', semesters: [2] },
        { name: '화학', semesters: [2] },
        { name: '생명과학', semesters: [2] },
        { name: '지구과학', semesters: [2] },
        { name: '역학과 에너지', semesters: [2] },
        { name: '물질과 에너지', semesters: [2] },
        { name: '세포와 물질대사', semesters: [2] },
        { name: '지구시스템과학', semesters: [2] }
      ]
    },
    {
      id: '선택군5',
      grade: 3,
      semester: '1학기',
      selectCount: 1,
      credits: 4,
      description: '3학년 1학기 수학 선택 (택1, 4학점)',
      subjects: [
        { name: '확률과 통계', semesters: [1] },
        { name: '기하', semesters: [1] },
        { name: '인공지능 수학', semesters: [1] }
      ]
    },
    {
      id: '선택군6',
      grade: 3,
      semester: '1학기',
      selectCount: 3,
      credits: 3,
      description: '3학년 1학기 교과(군) 간 선택 (택3, 9학점)',
      subjects: [
        { name: '인문학과 윤리', semesters: [1] },
        { name: '윤리와 사상', semesters: [1] },
        { name: '세계 문제와 미래 사회', semesters: [1] },
        { name: '사회문제 탐구', semesters: [1] },
        { name: '화학 반응의 세계', semesters: [1] },
        { name: '역학과 에너지', semesters: [1] },
        { name: '물질과 에너지', semesters: [1] },
        { name: '세포와 물질대사', semesters: [1] },
        { name: '전자기와 양자', semesters: [1] },
        { name: '생물의 유전', semesters: [1] },
        { name: '행성우주과학', semesters: [1] },
        { name: '과학과제 연구', semesters: [1] },
        { name: '물리학 실험', semesters: [1] },
        { name: '화학 실험', semesters: [1] },
        { name: '생명과학 실험', semesters: [1] },
        { name: '지구과학 실험', semesters: [1] }
      ]
    },
    {
      id: '선택군7',
      grade: 3,
      semester: '2학기',
      selectCount: 1,
      credits: 4,
      description: '3학년 2학기 수학 선택 (택1, 4학점)',
      subjects: [
        { name: '미적분Ⅱ', semesters: [2] },
        { name: '실용 통계', semesters: [2] },
        { name: '경제 수학', semesters: [2] }
      ]
    },
    {
      id: '선택군8',
      grade: 3,
      semester: '2학기',
      selectCount: 3,
      credits: 3,
      description: '3학년 2학기 교과(군) 간 선택 (택3, 9학점)',
      subjects: [
        { name: '인문학과 윤리', semesters: [2] },
        { name: '국제 관계와 국제기구', semesters: [2] },
        { name: '역사로 탐구하는 현대 세계', semesters: [2] },
        { name: '역학과 에너지', semesters: [2] },
        { name: '물질과 에너지', semesters: [2] },
        { name: '세포와 물질대사', semesters: [2] },
        { name: '전자기와 양자', semesters: [2] },
        { name: '생물의 유전', semesters: [2] },
        { name: '행성우주과학', semesters: [2] },
        { name: '융합과학 탐구', semesters: [2] },
        { name: '과학과제 연구', semesters: [2] },
        { name: '교육학', semesters: [2] },
        { name: '보건', semesters: [2] }
      ]
    },
    {
      id: '선택군9',
      grade: 3,
      semester: '2학기',
      selectCount: 1,
      credits: 2,
      description: '3학년 2학기 교양 선택 (택1, 2학점)',
      subjects: [
        { name: '논리와 사고', semesters: [2] },
        { name: '철학', semesters: [2] }
      ]
    }
  ]
};

// 6. 동광고등학교 (일반고)
export const DONGGWANG_HIGH_CURRICULUM: SchoolCurriculum = {
  id: 'donggwang',
  name: '동광고등학교',
  shortName: '동광고',
  typeBadge: '일반고',
  district: '중원구',
  location: '경기 성남 중원구',
  year: '2027학년도 입학생 (2022 개정)',
  description: '2027학년도 동광고 공식 교육과정 편제표 (1학년 공통·학기제 교차 및 2·3학년 교과군 간 선택 195학점 체계)',
  tags: ['일반고', '중원구', '동광고', '공식편제', '2022 개정'],
  mandatory: {
    1: [
      { name: '공통국어1', semesters: [1], credit: 4 },
      { name: '공통국어2', semesters: [2], credit: 4 },
      { name: '공통수학1', semesters: [1], credit: 4 },
      { name: '공통수학2', semesters: [2], credit: 4 },
      { name: '공통영어1', semesters: [1], credit: 4 },
      { name: '공통영어2', semesters: [2], credit: 4 },
      { name: '한국사1', semesters: [1], credit: 3 },
      { name: '한국사2', semesters: [2], credit: 3 },
      { name: '통합사회1', semesters: [1], credit: 4 },
      { name: '통합사회2', semesters: [2], credit: 4 },
      { name: '통합과학1', semesters: [1], credit: 4 },
      { name: '통합과학2', semesters: [2], credit: 4 },
      { name: '과학탐구실험1', semesters: [1], credit: 1 },
      { name: '과학탐구실험2', semesters: [2], credit: 1 },
      { name: '체육1', semesters: [1], credit: 2 },
      { name: '체육2', semesters: [2], credit: 2 },
      { name: '음악↔미술', semesters: [1, 2], credit: 3 }
    ],
    2: [
      { name: '문학', semesters: [1], credit: 4 },
      { name: '대수', semesters: [1], credit: 4 },
      { name: '영어Ⅰ', semesters: [1], credit: 4 },
      { name: '운동과 건강', semesters: [1], credit: 2 },
      { name: '화법과 언어', semesters: [2], credit: 4 },
      { name: '미적분Ⅰ', semesters: [2], credit: 4 },
      { name: '영어Ⅱ', semesters: [2], credit: 4 },
      { name: '스포츠 생활1', semesters: [2], credit: 2 }
    ],
    3: [
      { name: '독서와 작문', semesters: [1], credit: 4 },
      { name: '확률과 통계', semesters: [1], credit: 4 },
      { name: '영어 독해와 작문', semesters: [1], credit: 4 },
      { name: '스포츠 문화', semesters: [1], credit: 1 },
      { name: '독서 토론과 글쓰기', semesters: [2], credit: 4 },
      { name: '수학과 문화', semesters: [2], credit: 4 },
      { name: '심화 영어 독해와 작문', semesters: [2], credit: 4 },
      { name: '스포츠 과학', semesters: [2], credit: 1 }
    ]
  },
  groups: [
    {
      id: '선택군1',
      grade: 2,
      semester: '1학기',
      selectCount: 1,
      credits: 3,
      description: '2학년 1학기 제2외국어 선택 (택1, 3학점)',
      subjects: [
        { name: '일본어', semesters: [1] },
        { name: '독일어', semesters: [1] }
      ]
    },
    {
      id: '선택군2',
      grade: 2,
      semester: '1학기',
      selectCount: 5,
      credits: 3,
      description: '2학년 1학기 교과(군) 간 선택 (택5, 15학점)',
      subjects: [
        { name: '물리학', semesters: [1] },
        { name: '화학', semesters: [1] },
        { name: '생명과학', semesters: [1] },
        { name: '지구과학', semesters: [1] },
        { name: '세계시민과 지리', semesters: [1] },
        { name: '사회와 문화', semesters: [1] },
        { name: '현대사회와 윤리', semesters: [1] },
        { name: '동아시아 역사 기행', semesters: [1] }
      ]
    },
    {
      id: '선택군3',
      grade: 2,
      semester: '2학기',
      selectCount: 1,
      credits: 3,
      description: '2학년 2학기 제2외국어/수학 선택 (택1, 3학점)',
      subjects: [
        { name: '일본어 회화', semesters: [2] },
        { name: '독일어 회화', semesters: [2] },
        { name: '기하', semesters: [2] }
      ]
    },
    {
      id: '선택군4',
      grade: 2,
      semester: '2학기',
      selectCount: 5,
      credits: 3,
      description: '2학년 2학기 교과(군) 간 선택 (택5, 15학점)',
      subjects: [
        { name: '역학과 에너지', semesters: [2] },
        { name: '물질과 에너지', semesters: [2] },
        { name: '세포와 물질대사', semesters: [2] },
        { name: '지구시스템과학', semesters: [2] },
        { name: '한국지리 탐구', semesters: [2] },
        { name: '정치', semesters: [2] },
        { name: '경제', semesters: [2] },
        { name: '윤리문제 탐구', semesters: [2] },
        { name: '세계사', semesters: [2] }
      ]
    },
    {
      id: '선택군5',
      grade: 3,
      semester: '1학기',
      selectCount: 1,
      credits: 2,
      description: '3학년 1학기 교양 선택 (택1, 2학점)',
      subjects: [
        { name: '논술', semesters: [1] },
        { name: '논리와 사고', semesters: [1] }
      ]
    },
    {
      id: '선택군6',
      grade: 3,
      semester: '1학기',
      selectCount: 5,
      credits: 3,
      description: '3학년 1학기 교과(군) 간 선택 (택5, 15학점)',
      subjects: [
        { name: '주제 탐구 독서', semesters: [1] },
        { name: '미적분Ⅱ', semesters: [1] },
        { name: '세계 문화와 영어', semesters: [1] },
        { name: '전자기와 양자', semesters: [1] },
        { name: '화학 반응의 세계', semesters: [1] },
        { name: '생물의 유전', semesters: [1] },
        { name: '행성우주과학', semesters: [1] },
        { name: '융합과학 탐구', semesters: [1] },
        { name: '여행지리', semesters: [1] },
        { name: '윤리와 사상', semesters: [1] },
        { name: '사회문제 탐구', semesters: [1] },
        { name: '역사로 탐구하는 현대 세계', semesters: [1] },
        { name: '일본 문화', semesters: [1] },
        { name: '독일어권 문화', semesters: [1] }
      ]
    },
    {
      id: '선택군7',
      grade: 3,
      semester: '2학기',
      selectCount: 5,
      credits: 3,
      description: '3학년 2학기 교과(군) 간 선택 (택5, 15학점)',
      subjects: [
        { name: '문학과 영상', semesters: [2] },
        { name: '전문 수학', semesters: [2] },
        { name: '실생활 영어 회화', semesters: [2] },
        { name: '물리학 실험', semesters: [2] },
        { name: '고급 화학', semesters: [2] },
        { name: '고급 생명과학', semesters: [2] },
        { name: '기후변화와 환경생태', semesters: [2] },
        { name: '과학의 역사와 문화', semesters: [2] },
        { name: '기후변화와 지속가능한 세계', semesters: [2] },
        { name: '인문학과 윤리', semesters: [2] },
        { name: '금융과 경제생활', semesters: [2] },
        { name: '현대 세계의 변화', semesters: [2] },
        { name: '심화 일본어', semesters: [2] },
        { name: '심화 독일어', semesters: [2] }
      ]
    }
  ]
};

// 7. 돌마고등학교 (일반고)
export const DOLMA_HIGH_CURRICULUM: SchoolCurriculum = {
  id: 'dolma',
  name: '돌마고등학교',
  shortName: '돌마고',
  typeBadge: '일반고',
  district: '분당구',
  location: '경기 성남 분당구 야탑동',
  year: '2027학년도 입학생 (2022 개정)',
  description: '2027학년도 돌마고 공식 교육과정 편제표 (1학년 공통·학기제 교차 및 2·3학년 교과군 간 선택 192학점 체계)',
  tags: ['분당', '일반고', '야탑동', '돌마고', '공식편제', '2022 개정'],
  mandatory: {
    1: [
      { name: '공통국어1', semesters: [1], credit: 4 },
      { name: '공통국어2', semesters: [2], credit: 4 },
      { name: '공통수학1', semesters: [1], credit: 4 },
      { name: '공통수학2', semesters: [2], credit: 4 },
      { name: '공통영어1', semesters: [1], credit: 3 },
      { name: '공통영어2', semesters: [2], credit: 3 },
      { name: '한국사1', semesters: [1], credit: 3 },
      { name: '한국사2', semesters: [2], credit: 3 },
      { name: '통합사회1', semesters: [1], credit: 3 },
      { name: '통합사회2', semesters: [2], credit: 3 },
      { name: '통합과학1', semesters: [1], credit: 4 },
      { name: '통합과학2', semesters: [2], credit: 4 },
      { name: '과학탐구실험1', semesters: [1], credit: 1 },
      { name: '과학탐구실험2', semesters: [2], credit: 1 },
      { name: '체육1', semesters: [1], credit: 2 },
      { name: '체육2', semesters: [2], credit: 2 },
      { name: '미술↔음악', semesters: [1, 2], credit: 2 },
      { name: '정보↔지식 재산 일반', semesters: [1, 2], credit: 3 }
    ],
    2: [
      { name: '문학', semesters: [1], credit: 4 },
      { name: '대수', semesters: [1], credit: 4 },
      { name: '영어Ⅰ', semesters: [1], credit: 4 },
      { name: '스포츠 생활1', semesters: [1], credit: 2 },
      { name: '화법과 언어', semesters: [2], credit: 4 },
      { name: '미적분Ⅰ', semesters: [2], credit: 4 },
      { name: '영어Ⅱ', semesters: [2], credit: 4 },
      { name: '스포츠 생활2', semesters: [2], credit: 2 }
    ],
    3: [
      { name: '독서와 작문', semesters: [1], credit: 4 },
      { name: '확률과 통계', semesters: [1], credit: 3 },
      { name: '영어 독해와 작문', semesters: [1], credit: 3 },
      { name: '스포츠 문화', semesters: [1], credit: 1 },
      { name: '언어생활 탐구', semesters: [2], credit: 3 },
      { name: '수학과 문화', semesters: [2], credit: 3 },
      { name: '심화 영어 독해와 작문', semesters: [2], credit: 3 },
      { name: '스포츠 과학', semesters: [2], credit: 1 },
      { name: '비판적 질문과 창의적 해결', semesters: [2], credit: 1 }
    ]
  },
  groups: [
    {
      id: '선택군1',
      grade: 2,
      semester: '1학기',
      selectCount: 5,
      credits: 3,
      description: '2학년 1학기 교과(군) 간 선택 (택5, 15학점)',
      subjects: [
        { name: '주제 탐구 독서', semesters: [1] },
        { name: '인공지능 수학', semesters: [1] },
        { name: '수학과제 탐구', semesters: [1] },
        { name: '영미 문학 읽기', semesters: [1] },
        { name: '세계시민과 지리', semesters: [1] },
        { name: '세계사', semesters: [1] },
        { name: '현대사회와 윤리', semesters: [1] },
        { name: '정치', semesters: [1] },
        { name: '물리학', semesters: [1] },
        { name: '화학', semesters: [1] },
        { name: '생명과학', semesters: [1] },
        { name: '지구과학', semesters: [1] },
        { name: '음악 감상과 비평', semesters: [1] },
        { name: '미술 창작', semesters: [1] },
        { name: '중국어', semesters: [1] },
        { name: '일본어', semesters: [1] },
        { name: '한문', semesters: [1] }
      ]
    },
    {
      id: '선택군2',
      grade: 2,
      semester: '2학기',
      selectCount: 5,
      credits: 3,
      description: '2학년 2학기 교과(군) 간 선택 (택5, 15학점)',
      subjects: [
        { name: '문학과 영상', semesters: [2] },
        { name: '기하', semesters: [2] },
        { name: '경제 수학', semesters: [2] },
        { name: '직무 영어', semesters: [2] },
        { name: '한국지리 탐구', semesters: [2] },
        { name: '동아시아 역사 기행', semesters: [2] },
        { name: '경제', semesters: [2] },
        { name: '인문학과 윤리', semesters: [2] },
        { name: '법과 사회', semesters: [2] },
        { name: '역학과 에너지', semesters: [2] },
        { name: '물질과 에너지', semesters: [2] },
        { name: '세포와 물질대사', semesters: [2] },
        { name: '지구시스템과학', semesters: [2] },
        { name: '미술과 매체', semesters: [2] },
        { name: '음악 연주와 창작', semesters: [2] },
        { name: '프로그래밍', semesters: [2] },
        { name: '중국어 회화', semesters: [2] },
        { name: '일본어 회화', semesters: [2] },
        { name: '한문 고전 읽기', semesters: [2] }
      ]
    },
    {
      id: '선택군3',
      grade: 3,
      semester: '1학기',
      selectCount: 6,
      credits: 3,
      description: '3학년 1학기 교과(군) 간 선택 (택6, 18학점)',
      subjects: [
        { name: '매체 의사소통', semesters: [1] },
        { name: '미적분Ⅱ', semesters: [1] },
        { name: '심화 영어', semesters: [1] },
        { name: '미디어 영어', semesters: [1] },
        { name: '도시의 미래 탐구', semesters: [1] },
        { name: '한국사 심화 탐구', semesters: [1] },
        { name: '윤리와 사상', semesters: [1] },
        { name: '국제 관계의 이해', semesters: [1] },
        { name: '사회와 문화', semesters: [1] },
        { name: '사회문제 탐구', semesters: [1] },
        { name: '전자기와 양자', semesters: [1] },
        { name: '화학 반응의 세계', semesters: [1] },
        { name: '생물의 유전', semesters: [1] },
        { name: '행성우주과학', semesters: [1] },
        { name: '융합과학 탐구', semesters: [1] },
        { name: '중국 문화', semesters: [1] },
        { name: '일본 문화', semesters: [1] },
        { name: '언어생활과 한자', semesters: [1] },
        { name: '로봇과 공학세계', semesters: [1] },
        { name: '데이터 과학', semesters: [1] },
        { name: '인간과 심리', semesters: [1] }
      ]
    },
    {
      id: '선택군4',
      grade: 3,
      semester: '2학기',
      selectCount: 6,
      credits: 3,
      description: '3학년 2학기 교과(군) 간 선택 (택6, 18학점)',
      subjects: [
        { name: '독서 토론과 글쓰기', semesters: [2] },
        { name: '실용 통계', semesters: [2] },
        { name: '고급 대수', semesters: [2] },
        { name: '세계 문화와 영어', semesters: [2] },
        { name: '여행지리', semesters: [2] },
        { name: '역사로 탐구하는 현대 세계', semesters: [2] },
        { name: '윤리문제 탐구', semesters: [2] },
        { name: '금융과 경제생활', semesters: [2] },
        { name: '기후변화와 지속가능한 세계', semesters: [2] },
        { name: '과학의 역사와 문화', semesters: [2] },
        { name: '기후변화와 환경생태', semesters: [2] },
        { name: '미술 감상과 비평', semesters: [2] },
        { name: '관광 일본어', semesters: [2] },
        { name: '관광 중국어', semesters: [2] },
        { name: '언어생활과 한자', semesters: [2] },
        { name: '창의 공학 설계', semesters: [2] },
        { name: '생태와 환경', semesters: [2] },
        { name: '인간과 철학', semesters: [2] }
      ]
    }
  ]
};

// 8. 분당고등학교 (과학중점)
export const BUNDANG_HIGH_CURRICULUM: SchoolCurriculum = {
  id: 'bundang',
  name: '분당고등학교',
  shortName: '분당고',
  typeBadge: '과학중점',
  district: '분당구',
  location: '경기 성남 분당구',
  year: '2027학년도 입학생 (2022 개정)',
  description: '2027학년도 분당고 교육과정 편성표 (국·수·영 탄탄한 필수 이수 및 학기당 교과군 택4, 제2외국어/정보/예술 10개 선택군 체계)',
  tags: ['과학중점', '분당구', '공식편제', '2022 개정'],
  mandatory: {
    1: [
      { name: '공통국어1', semesters: [1], credit: 4 },
      { name: '공통국어2', semesters: [2], credit: 4 },
      { name: '공통수학1', semesters: [1], credit: 4 },
      { name: '공통수학2', semesters: [2], credit: 4 },
      { name: '공통영어1', semesters: [1], credit: 4 },
      { name: '공통영어2', semesters: [2], credit: 4 },
      { name: '한국사1', semesters: [1], credit: 3 },
      { name: '한국사2', semesters: [2], credit: 3 },
      { name: '통합사회1', semesters: [1], credit: 4 },
      { name: '통합사회2', semesters: [2], credit: 4 },
      { name: '통합과학1', semesters: [1], credit: 4 },
      { name: '통합과학2', semesters: [2], credit: 4 },
      { name: '과학탐구실험1', semesters: [1], credit: 1 },
      { name: '과학탐구실험2', semesters: [2], credit: 1 },
      { name: '체육1', semesters: [1], credit: 2 },
      { name: '체육2', semesters: [2], credit: 2 },
      { name: '음악↔미술', semesters: [1, 2], credit: 3 }
    ],
    2: [
      { name: '문학', semesters: [1], credit: 4 },
      { name: '대수', semesters: [1], credit: 4 },
      { name: '영어Ⅰ', semesters: [1], credit: 4 },
      { name: '운동과 건강', semesters: [1], credit: 2 },
      { name: '화법과 언어', semesters: [2], credit: 4 },
      { name: '미적분Ⅰ', semesters: [2], credit: 4 },
      { name: '영어Ⅱ', semesters: [2], credit: 4 },
      { name: '스포츠 생활1', semesters: [2], credit: 2 }
    ],
    3: [
      { name: '독서와 작문', semesters: [1], credit: 4 },
      { name: '확률과 통계', semesters: [1], credit: 4 },
      { name: '영어 독해와 작문', semesters: [1], credit: 4 },
      { name: '스포츠 문화', semesters: [1], credit: 1 },
      { name: '언어생활 탐구', semesters: [2], credit: 4 },
      { name: '실용 통계', semesters: [2], credit: 4 },
      { name: '심화 영어', semesters: [2], credit: 4 },
      { name: '스포츠 과학', semesters: [2], credit: 1 }
    ]
  },
  groups: [
    {
      id: '선택군1',
      grade: 2,
      semester: '1학기',
      selectCount: 1,
      credits: 3,
      description: '2학년 1학기 제2외국어/정보/한문 선택 (택1, 3학점)',
      subjects: [
        { name: '한문', semesters: [1] },
        { name: '정보', semesters: [1] },
        { name: '중국어', semesters: [1] },
        { name: '일본어', semesters: [1] }
      ]
    },
    {
      id: '선택군2',
      grade: 2,
      semester: '1학기',
      selectCount: 4,
      credits: 3,
      description: '2학년 1학기 교과(군) 간 선택 (택4, 과목당 3학점, 총 12학점)',
      subjects: [
        { name: '주제 탐구 독서', semesters: [1] },
        { name: '인공지능 수학', semesters: [1] },
        { name: '영어 발표와 토론', semesters: [1] },
        { name: '현대사회와 윤리', semesters: [1] },
        { name: '사회와 문화', semesters: [1] },
        { name: '경제', semesters: [1] },
        { name: '세계사', semesters: [1] },
        { name: '한국지리 탐구', semesters: [1] },
        { name: '물리학', semesters: [1] },
        { name: '화학', semesters: [1] },
        { name: '생명과학', semesters: [1] },
        { name: '지구과학', semesters: [1] },
        { name: '과학과제 연구', semesters: [1] }
      ]
    },
    {
      id: '선택군3',
      grade: 2,
      semester: '2학기',
      selectCount: 1,
      credits: 3,
      description: '2학년 2학기 제2외국어/정보/한문 선택 (택1, 3학점)',
      subjects: [
        { name: '언어생활과 한자', semesters: [2] },
        { name: '인공지능 기초', semesters: [2] },
        { name: '중국어 회화', semesters: [2] },
        { name: '일본어 회화', semesters: [2] }
      ]
    },
    {
      id: '선택군4',
      grade: 2,
      semester: '2학기',
      selectCount: 4,
      credits: 3,
      description: '2학년 2학기 교과(군) 간 선택 (택4, 과목당 3학점, 총 12학점)',
      subjects: [
        { name: '독서 토론과 글쓰기', semesters: [2] },
        { name: '기하', semesters: [2] },
        { name: '세계 문화와 영어', semesters: [2] },
        { name: '윤리와 사상', semesters: [2] },
        { name: '정치', semesters: [2] },
        { name: '법과 사회', semesters: [2] },
        { name: '동아시아 역사 기행', semesters: [2] },
        { name: '세계시민과 지리', semesters: [2] },
        { name: '물리학', semesters: [2] },
        { name: '역학과 에너지', semesters: [2] },
        { name: '물질과 에너지', semesters: [2] },
        { name: '세포와 물질대사', semesters: [2] }
      ]
    },
    {
      id: '선택군5',
      grade: 3,
      semester: '1학기',
      selectCount: 1,
      credits: 2,
      description: '3학년 1학기 예술 선택 (택1, 2학점)',
      subjects: [
        { name: '음악 연주와 창작', semesters: [1] },
        { name: '미술 창작', semesters: [1] }
      ]
    },
    {
      id: '선택군6',
      grade: 3,
      semester: '1학기',
      selectCount: 1,
      credits: 2,
      description: '3학년 1학기 교양 선택 (택1, 2학점)',
      subjects: [
        { name: '논술', semesters: [1] },
        { name: '생태와 환경', semesters: [1] }
      ]
    },
    {
      id: '선택군7',
      grade: 3,
      semester: '1학기',
      selectCount: 4,
      credits: 3,
      description: '3학년 1학기 교과(군) 간 선택 (택4, 과목당 3학점, 총 12학점)',
      subjects: [
        { name: '심화 영어 독해와 작문', semesters: [1] },
        { name: '문학과 영상', semesters: [1] },
        { name: '미적분Ⅱ', semesters: [1] },
        { name: '경제 수학', semesters: [1] },
        { name: '금융과 경제생활', semesters: [1] },
        { name: '사회문제 탐구', semesters: [1] },
        { name: '인문학과 윤리', semesters: [1] },
        { name: '도시의 미래 탐구', semesters: [1] },
        { name: '물질과 에너지', semesters: [1] },
        { name: '전자기와 양자', semesters: [1] },
        { name: '화학 반응의 세계', semesters: [1] },
        { name: '생물의 유전', semesters: [1] },
        { name: '한문 고전 읽기', semesters: [1] },
        { name: '데이터 과학', semesters: [1] },
        { name: '중국 문화', semesters: [1] },
        { name: '일본 문화', semesters: [1] }
      ]
    },
    {
      id: '선택군8',
      grade: 3,
      semester: '2학기',
      selectCount: 1,
      credits: 2,
      description: '3학년 2학기 예술 선택 (택1, 2학점)',
      subjects: [
        { name: '음악 감상과 비평', semesters: [2] },
        { name: '미술과 매체', semesters: [2] }
      ]
    },
    {
      id: '선택군9',
      grade: 3,
      semester: '2학기',
      selectCount: 1,
      credits: 2,
      description: '3학년 2학기 교양 선택 (택1, 2학점)',
      subjects: [
        { name: '논술', semesters: [2] },
        { name: '생태와 환경', semesters: [2] }
      ]
    },
    {
      id: '선택군10',
      grade: 3,
      semester: '2학기',
      selectCount: 4,
      credits: 3,
      description: '3학년 2학기 교과(군) 간 선택 (택4, 과목당 3학점, 총 12학점)',
      subjects: [
        { name: '매체 의사소통', semesters: [2] },
        { name: '수학과 문화', semesters: [2] },
        { name: '심화 영어', semesters: [2] },
        { name: '미디어 영어', semesters: [2] },
        { name: '역사로 탐구하는 현대 세계', semesters: [2] },
        { name: '윤리문제 탐구', semesters: [2] },
        { name: '여행지리', semesters: [2] },
        { name: '기후변화와 지속가능한 세계', semesters: [2] },
        { name: '지구시스템과학', semesters: [2] },
        { name: '과학의 역사와 문화', semesters: [2] },
        { name: '융합과학 탐구', semesters: [2] },
        { name: '기후변화와 환경생태', semesters: [2] },
        { name: '생활과 한문', semesters: [2] },
        { name: '소프트웨어와 생활', semesters: [2] },
        { name: '심화 중국어', semesters: [2] },
        { name: '심화 일본어', semesters: [2] }
      ]
    }
  ]
};

// 9. 서현고등학교 (과학중점) - 2027학년도 공식 편제표 원본 정밀 반영
export const SEOHYEON_HIGH_CURRICULUM: SchoolCurriculum = {
  id: 'seohyeon',
  name: '서현고등학교',
  shortName: '서현고',
  typeBadge: '과학중점',
  district: '분당구',
  location: '경기 성남 분당구 서현동',
  year: '2027학년도 입학생 (2022 개정)',
  description: '서현고등학교 2027학년도 입학생 교육과정 편성표 (국·수·영 탄탄한 이수, 학기제 교차이수 및 3학년 대규모 진로·심화 선택 개방 체계)',
  tags: ['과학중점', '분당구', '서현고', '공식편제', '2022 개정'],
  mandatory: {
    1: [
      { name: '공통국어1', semesters: [1], credit: 4 },
      { name: '공통국어2', semesters: [2], credit: 4 },
      { name: '공통수학1', semesters: [1], credit: 4 },
      { name: '공통수학2', semesters: [2], credit: 4 },
      { name: '공통영어1', semesters: [1], credit: 4 },
      { name: '공통영어2', semesters: [2], credit: 4 },
      { name: '한국사1', semesters: [1], credit: 3 },
      { name: '한국사2', semesters: [2], credit: 3 },
      { name: '통합사회1', semesters: [1], credit: 4 },
      { name: '통합사회2', semesters: [2], credit: 4 },
      { name: '통합과학1', semesters: [1], credit: 4 },
      { name: '통합과학2', semesters: [2], credit: 4 },
      { name: '과학탐구실험1', semesters: [1], credit: 1 },
      { name: '과학탐구실험2', semesters: [2], credit: 1 },
      { name: '체육1', semesters: [1], credit: 2 },
      { name: '체육2', semesters: [2], credit: 2 },
      { name: '음악↔미술', semesters: [1, 2], credit: 3 },
      { name: '정보↔언어생활과 한자', semesters: [1, 2], credit: 3 }
    ],
    2: [
      { name: '문학', semesters: [1], credit: 4 },
      { name: '대수', semesters: [1], credit: 4 },
      { name: '영어Ⅰ', semesters: [1], credit: 4 },
      { name: '스포츠 생활1', semesters: [1], credit: 2 },
      { name: '화법과 언어', semesters: [2], credit: 4 },
      { name: '미적분Ⅰ', semesters: [2], credit: 4 },
      { name: '영어Ⅱ', semesters: [2], credit: 4 },
      { name: '스포츠 생활2', semesters: [2], credit: 2 }
    ],
    3: [
      { name: '독서와 작문', semesters: [1], credit: 3 },
      { name: '확률과 통계', semesters: [1], credit: 3 },
      { name: '영어 독해와 작문', semesters: [1], credit: 3 },
      { name: '스포츠 문화', semesters: [1], credit: 1 },
      { name: '스포츠 과학', semesters: [2], credit: 1 }
    ]
  },
  groups: [
    {
      id: '선택군1',
      grade: 2,
      semester: '1학기',
      selectCount: 1,
      credits: 3,
      description: '2학년 1학기 외국어/문화 선택 (택1, 3학점)',
      subjects: [
        { name: '일본 언어와 역사의 이해1', semesters: [1] },
        { name: '중국 언어와 역사의 이해1', semesters: [1] }
      ]
    },
    {
      id: '선택군2',
      grade: 2,
      semester: '1학기',
      selectCount: 4,
      credits: 3,
      description: '2학년 1학기 교과(군) 간 선택 (택4, 과목당 3학점, 총 12학점)',
      subjects: [
        { name: '기하', semesters: [1] },
        { name: '미디어 영어', semesters: [1] },
        { name: '세계사', semesters: [1] },
        { name: '윤리와 사상', semesters: [1] },
        { name: '경제', semesters: [1] },
        { name: '세계시민과 지리', semesters: [1] },
        { name: '물리학', semesters: [1] },
        { name: '화학', semesters: [1] },
        { name: '생명과학', semesters: [1] },
        { name: '과학과제 연구', semesters: [1] }
      ]
    },
    {
      id: '선택군3',
      grade: 2,
      semester: '2학기',
      selectCount: 1,
      credits: 3,
      description: '2학년 2학기 외국어/문화 선택 (택1, 3학점)',
      subjects: [
        { name: '일본 언어와 역사의 이해2', semesters: [2] },
        { name: '중국 언어와 역사의 이해2', semesters: [2] }
      ]
    },
    {
      id: '선택군4',
      grade: 2,
      semester: '2학기',
      selectCount: 4,
      credits: 3,
      description: '2학년 2학기 교과(군) 간 선택 (택4, 과목당 3학점, 총 12학점)',
      subjects: [
        { name: '독서 토론과 글쓰기', semesters: [2] },
        { name: '인공지능 수학', semesters: [2] },
        { name: '세계 문화와 영어', semesters: [2] },
        { name: '역사로 탐구하는 현대 세계', semesters: [2] },
        { name: '현대사회와 윤리', semesters: [2] },
        { name: '사회와 문화', semesters: [2] },
        { name: '여행지리', semesters: [2] },
        { name: '지구과학', semesters: [2] },
        { name: '역학과 에너지', semesters: [2] },
        { name: '행성우주과학', semesters: [2] }
      ]
    },
    {
      id: '선택군5',
      grade: 3,
      semester: '1학기',
      selectCount: 1,
      credits: 2,
      description: '3학년 1학기 예술 선택 (택1, 2학점)',
      subjects: [
        { name: '음악 감상과 비평', semesters: [1] },
        { name: '미술 창작', semesters: [1] }
      ]
    },
    {
      id: '선택군6',
      grade: 3,
      semester: '1학기',
      selectCount: 1,
      credits: 2,
      description: '3학년 1학기 융합교양 선택 (택1, 2학점)',
      subjects: [
        { name: '과학창의연구', semesters: [1] },
        { name: '인공지능 기초', semesters: [1] },
        { name: '생태와 환경', semesters: [1] }
      ]
    },
    {
      id: '선택군7',
      grade: 3,
      semester: '1학기',
      selectCount: 4,
      credits: 3,
      description: '3학년 1학기 교과(군) 간 심화 선택 (택4, 과목당 3학점, 총 12학점)',
      subjects: [
        { name: '언어생활 탐구', semesters: [1] },
        { name: '전문 수학', semesters: [1] },
        { name: '고급 미적분', semesters: [1] },
        { name: '심화 영어', semesters: [1] },
        { name: '정치', semesters: [1] },
        { name: '도시의 미래 탐구', semesters: [1] },
        { name: '법과 사회', semesters: [1] },
        { name: '윤리문제 탐구', semesters: [1] },
        { name: '사회문제 탐구', semesters: [1] },
        { name: '물질과 에너지', semesters: [1] },
        { name: '전자기와 양자', semesters: [1] },
        { name: '화학 반응의 세계', semesters: [1] },
        { name: '세포와 물질대사', semesters: [1] },
        { name: '생물의 유전', semesters: [1] },
        { name: '지구시스템과학', semesters: [1] },
        { name: '기후변화와 환경생태', semesters: [1] }
      ]
    },
    {
      id: '선택군8',
      grade: 3,
      semester: '2학기',
      selectCount: 1,
      credits: 2,
      description: '3학년 2학기 예술 선택 (택1, 2학점)',
      subjects: [
        { name: '음악과 미디어', semesters: [2] },
        { name: '미술과 매체', semesters: [2] }
      ]
    },
    {
      id: '선택군9',
      grade: 3,
      semester: '2학기',
      selectCount: 1,
      credits: 2,
      description: '3학년 2학기 융합교양 선택 (택1, 2학점)',
      subjects: [
        { name: '과학 교양', semesters: [2] },
        { name: '인공지능과 함께하는 세상', semesters: [2] },
        { name: '인간과 경제활동', semesters: [2] }
      ]
    },
    {
      id: '선택군10',
      grade: 3,
      semester: '2학기',
      selectCount: 7,
      credits: 3,
      description: '3학년 2학기 교과(군) 간 집중선택 (택7, 과목당 3학점, 총 21학점)',
      subjects: [
        { name: '매체 의사소통', semesters: [2] },
        { name: '실용 통계', semesters: [2] },
        { name: '수학과제 탐구', semesters: [2] },
        { name: '수학과 문화', semesters: [2] },
        { name: '심화 영어 독해와 작문', semesters: [2] },
        { name: '영어 발표와 토론', semesters: [2] },
        { name: '실생활 영어 회화', semesters: [2] },
        { name: '한국지리 탐구', semesters: [2] },
        { name: '금융과 경제생활', semesters: [2] },
        { name: '문학과 영상', semesters: [2] },
        { name: '기후변화와 지속가능한 세계', semesters: [2] },
        { name: '고급 물리학', semesters: [2] },
        { name: '고급 화학', semesters: [2] },
        { name: '고급 생명과학', semesters: [2] },
        { name: '고급 지구과학', semesters: [2] },
        { name: '과학의 역사와 문화', semesters: [2] }
      ]
    }
  ]
};

// 10. 보평고등학교 (과학중점/일반고)
export const BOPYEONG_HIGH_CURRICULUM: SchoolCurriculum = {
  id: 'bopyeong',
  name: '보평고등학교',
  shortName: '보평고',
  typeBadge: '과학중점',
  district: '분당구',
  location: '경기 성남 분당구 (판교)',
  year: '2027학년도 입학생 (2022 개정)',
  description: '2027학년도 보평고 공식 교육과정 편제표 (1학년 공통·학기제 교차 및 2·3학년 교과군 간 선택 192학점 체계)',
  tags: ['과학중점', '분당구', '판교', '보평고', '공식편제', '2022 개정'],
  mandatory: {
    1: [
      { name: '공통국어1', semesters: [1], credit: 4 },
      { name: '공통국어2', semesters: [2], credit: 4 },
      { name: '공통수학1', semesters: [1], credit: 4 },
      { name: '공통수학2', semesters: [2], credit: 4 },
      { name: '공통영어1', semesters: [1], credit: 4 },
      { name: '공통영어2', semesters: [2], credit: 4 },
      { name: '한국사1', semesters: [1], credit: 3 },
      { name: '한국사2', semesters: [2], credit: 3 },
      { name: '통합사회1', semesters: [1], credit: 4 },
      { name: '통합사회2', semesters: [2], credit: 4 },
      { name: '통합과학1', semesters: [1], credit: 4 },
      { name: '통합과학2', semesters: [2], credit: 4 },
      { name: '과학탐구실험1', semesters: [1], credit: 1 },
      { name: '과학탐구실험2', semesters: [2], credit: 1 },
      { name: '체육1', semesters: [1], credit: 2 },
      { name: '체육2', semesters: [2], credit: 2 },
      { name: '음악↔미술', semesters: [1, 2], credit: 3 },
      { name: '정보↔프로그래밍', semesters: [1, 2], credit: 3 }
    ],
    2: [
      { name: '문학', semesters: [1], credit: 4 },
      { name: '대수', semesters: [1], credit: 4 },
      { name: '영어Ⅰ', semesters: [1], credit: 4 },
      { name: '스포츠 생활1', semesters: [1], credit: 2 },
      { name: '독서와 작문', semesters: [2], credit: 4 },
      { name: '미적분Ⅰ', semesters: [2], credit: 4 },
      { name: '영어Ⅱ', semesters: [2], credit: 4 },
      { name: '스포츠 생활2', semesters: [2], credit: 2 }
    ],
    3: [
      { name: '화법과 언어', semesters: [1], credit: 4 },
      { name: '확률과 통계', semesters: [1], credit: 4 },
      { name: '영어 독해와 작문', semesters: [1], credit: 4 },
      { name: '스포츠 문화', semesters: [1], credit: 1 },
      { name: '스포츠 과학', semesters: [2], credit: 1 }
    ]
  },
  groups: [
    {
      id: '선택군1',
      grade: 2,
      semester: '1학기',
      selectCount: 1,
      credits: 3,
      description: '2학년 1학기 제2외국어 선택 (택1, 3학점)',
      subjects: [
        { name: '중국어', semesters: [1] },
        { name: '일본어', semesters: [1] }
      ]
    },
    {
      id: '선택군2',
      grade: 2,
      semester: '1학기',
      selectCount: 3,
      credits: 3,
      description: '2학년 1학기 교과(군) 간 선택 (택3, 9학점)',
      subjects: [
        { name: '한국사 심화탐구', semesters: [1] },
        { name: '사회와 문화', semesters: [1] },
        { name: '한국지리 탐구', semesters: [1] },
        { name: '물리학', semesters: [1] },
        { name: '지구과학', semesters: [1] },
        { name: '과학과제 연구', semesters: [1] },
        { name: '세계시민과 지리', semesters: [1] },
        { name: '법과 사회', semesters: [1] },
        { name: '인문학과 윤리', semesters: [1] },
        { name: '동아시아 역사 기행', semesters: [1] },
        { name: '화학', semesters: [1] },
        { name: '생명과학', semesters: [1] },
        { name: '융합과학 탐구', semesters: [1] }
      ]
    },
    {
      id: '선택군3',
      grade: 2,
      semester: '2학기',
      selectCount: 1,
      credits: 3,
      description: '2학년 2학기 제2외국어 선택 (택1, 3학점)',
      subjects: [
        { name: '중국어 회화', semesters: [2] },
        { name: '일본어 회화', semesters: [2] }
      ]
    },
    {
      id: '선택군4',
      grade: 2,
      semester: '2학기',
      selectCount: 3,
      credits: 3,
      description: '2학년 2학기 교과(군) 간 선택 (택3, 9학점)',
      subjects: [
        { name: '한국사 심화탐구', semesters: [2] },
        { name: '사회와 문화', semesters: [2] },
        { name: '한국지리 탐구', semesters: [2] },
        { name: '물리학', semesters: [2] },
        { name: '지구과학', semesters: [2] },
        { name: '과학과제 연구', semesters: [2] },
        { name: '세계시민과 지리', semesters: [2] },
        { name: '법과 사회', semesters: [2] },
        { name: '인문학과 윤리', semesters: [2] },
        { name: '동아시아 역사 기행', semesters: [2] },
        { name: '화학', semesters: [2] },
        { name: '생명과학', semesters: [2] },
        { name: '융합과학 탐구', semesters: [2] }
      ]
    },
    {
      id: '선택군5',
      grade: 3,
      semester: '1학기',
      selectCount: 1,
      credits: 2,
      description: '3학년 1학기 예술 선택 (택1, 2학점)',
      subjects: [
        { name: '음악 감상과 비평', semesters: [1] },
        { name: '미술 감상과 비평', semesters: [1] }
      ]
    },
    {
      id: '선택군6',
      grade: 3,
      semester: '1학기',
      selectCount: 1,
      credits: 2,
      description: '3학년 1학기 교양 선택 (택1, 2학점)',
      subjects: [
        { name: '논술', semesters: [1] },
        { name: '생태와 환경', semesters: [1] },
        { name: '인간과 심리', semesters: [1] },
        { name: '인간과 경제활동', semesters: [1] }
      ]
    },
    {
      id: '선택군7',
      grade: 3,
      semester: '1학기',
      selectCount: 4,
      credits: 3,
      description: '3학년 1학기 교과(군) 간 선택 (택4, 12학점)',
      subjects: [
        { name: '주제 탐구 독서', semesters: [1] },
        { name: '경제 수학', semesters: [1] },
        { name: '심화 영어', semesters: [1] },
        { name: '도시의 미래 탐구', semesters: [1] },
        { name: '사회문제 탐구', semesters: [1] },
        { name: '역사로 탐구하는 현대 세계', semesters: [1] },
        { name: '현대사회와 윤리', semesters: [1] },
        { name: '역학과 에너지', semesters: [1] },
        { name: '전자기와 양자', semesters: [1] },
        { name: '세포와 물질대사', semesters: [1] },
        { name: '생물의 유전', semesters: [1] },
        { name: '물질과 에너지', semesters: [1] },
        { name: '화학 반응의 세계', semesters: [1] },
        { name: '지구시스템과학', semesters: [1] },
        { name: '행성우주과학', semesters: [1] },
        { name: '인공지능 기초', semesters: [1] },
        { name: '중국 문화', semesters: [1] },
        { name: '일본 문화', semesters: [1] }
      ]
    },
    {
      id: '선택군8',
      grade: 3,
      semester: '2학기',
      selectCount: 1,
      credits: 2,
      description: '3학년 2학기 예술 선택 (택1, 2학점)',
      subjects: [
        { name: '음악 연주와 창작', semesters: [2] },
        { name: '미술 창작', semesters: [2] }
      ]
    },
    {
      id: '선택군9',
      grade: 3,
      semester: '2학기',
      selectCount: 1,
      credits: 2,
      description: '3학년 2학기 교양 선택 (택1, 2학점)',
      subjects: [
        { name: '논술', semesters: [2] },
        { name: '생태와 환경', semesters: [2] },
        { name: '인간과 심리', semesters: [2] },
        { name: '인간과 경제활동', semesters: [2] }
      ]
    },
    {
      id: '선택군10',
      grade: 3,
      semester: '2학기',
      selectCount: 5,
      credits: 3,
      description: '3학년 2학기 교과(군) 간 선택 (택5, 15학점)',
      subjects: [
        { name: '독서 토론과 글쓰기', semesters: [2] },
        { name: '매체 의사소통', semesters: [2] },
        { name: '수학과제 탐구', semesters: [2] },
        { name: '세계 문화와 영어', semesters: [2] },
        { name: '영미 문학 읽기', semesters: [2] },
        { name: '여행지리', semesters: [2] },
        { name: '금융과 경제생활', semesters: [2] },
        { name: '윤리문제 탐구', semesters: [2] },
        { name: '기후변화와 지속가능한 세계', semesters: [2] },
        { name: '고급 물리학', semesters: [2] },
        { name: '고급 화학', semesters: [2] },
        { name: '고급 생명과학', semesters: [2] },
        { name: '고급 지구과학', semesters: [2] },
        { name: '과학의 역사와 문화', semesters: [2] },
        { name: '기후변화와 환경생태', semesters: [2] },
        { name: '데이터 과학', semesters: [2] },
        { name: '심화 중국어', semesters: [2] },
        { name: '심화 일본어', semesters: [2] }
      ]
    }
  ]
};

// 11. 효성고등학교 (과학중점)
export const HYOSUNG_HIGH_CURRICULUM: SchoolCurriculum = {
  id: 'hyosung',
  name: '효성고등학교',
  shortName: '효성고',
  typeBadge: '과학중점',
  district: '수정구',
  location: '경기 성남 수정구 산성동',
  year: '2027학년도 입학생 (2022 개정)',
  description: '2027학년도 효성고 공식 교육과정 편제표 (1학년 공통 및 2·3학년 교과군 간 선택 192학점 체계)',
  tags: ['일반고', '수정구', '효성고', '과학중점', '공식편제', '2022 개정'],
  mandatory: {
    1: [
      { name: '공통국어1', semesters: [1], credit: 4 },
      { name: '공통국어2', semesters: [2], credit: 4 },
      { name: '공통수학1', semesters: [1], credit: 4 },
      { name: '공통수학2', semesters: [2], credit: 4 },
      { name: '공통영어1', semesters: [1], credit: 4 },
      { name: '공통영어2', semesters: [2], credit: 4 },
      { name: '한국사1', semesters: [1], credit: 3 },
      { name: '한국사2', semesters: [2], credit: 3 },
      { name: '통합사회1', semesters: [1], credit: 4 },
      { name: '통합사회2', semesters: [2], credit: 4 },
      { name: '통합과학1', semesters: [1], credit: 4 },
      { name: '통합과학2', semesters: [2], credit: 4 },
      { name: '과학탐구실험1', semesters: [1], credit: 1 },
      { name: '과학탐구실험2', semesters: [2], credit: 1 },
      { name: '체육1', semesters: [1], credit: 2 },
      { name: '체육2', semesters: [2], credit: 2 },
      { name: '음악↔미술', semesters: [1, 2], credit: 3 }
    ],
    2: [
      { name: '문학', semesters: [1], credit: 4 },
      { name: '대수', semesters: [1], credit: 4 },
      { name: '영어Ⅰ', semesters: [1], credit: 4 },
      { name: '운동과 건강', semesters: [1], credit: 2 },
      { name: '화법과 언어', semesters: [2], credit: 4 },
      { name: '미적분Ⅰ', semesters: [2], credit: 4 },
      { name: '영어Ⅱ', semesters: [2], credit: 4 },
      { name: '스포츠 생활1', semesters: [2], credit: 2 }
    ],
    3: [
      { name: '독서와 작문', semesters: [1], credit: 4 },
      { name: '확률과 통계', semesters: [1], credit: 4 },
      { name: '영어 독해와 작문', semesters: [1], credit: 4 },
      { name: '스포츠 문화', semesters: [1], credit: 1 },
      { name: '독서 토론과 글쓰기', semesters: [2], credit: 4 },
      { name: '전문 수학', semesters: [2], credit: 4 },
      { name: '심화 영어', semesters: [2], credit: 4 },
      { name: '스포츠 과학', semesters: [2], credit: 1 }
    ]
  },
  groups: [
    {
      id: '선택군1',
      grade: 2,
      semester: '1학기',
      selectCount: 1,
      credits: 3,
      description: '2학년 1학기 제2외국어/정보 (택1, 3학점)',
      subjects: [
        { name: '일본어', semesters: [1] },
        { name: '스페인어', semesters: [1] },
        { name: '정보', semesters: [1] }
      ]
    },
    {
      id: '선택군2',
      grade: 2,
      semester: '1학기',
      selectCount: 3,
      credits: 4,
      description: '2학년 1학기 교과(군) 간 선택 (택3, 12학점)',
      subjects: [
        { name: '현대사회와 윤리', semesters: [1] },
        { name: '동아시아 역사 기행', semesters: [1] },
        { name: '정치', semesters: [1] },
        { name: '세계시민과 지리', semesters: [1] },
        { name: '물리학', semesters: [1] },
        { name: '화학', semesters: [1] },
        { name: '생명과학', semesters: [1] },
        { name: '지구과학', semesters: [1] }
      ]
    },
    {
      id: '선택군3',
      grade: 2,
      semester: '2학기',
      selectCount: 1,
      credits: 3,
      description: '2학년 2학기 제2외국어/정보 (택1, 3학점)',
      subjects: [
        { name: '일본어 회화', semesters: [2] },
        { name: '스페인어 회화', semesters: [2] },
        { name: '인공지능 기초', semesters: [2] }
      ]
    },
    {
      id: '선택군4',
      grade: 2,
      semester: '2학기',
      selectCount: 3,
      credits: 4,
      description: '2학년 2학기 교과(군) 간 선택 (택3, 12학점)',
      subjects: [
        { name: '기하', semesters: [2] },
        { name: '인공지능 수학', semesters: [2] },
        { name: '인문학과 윤리', semesters: [2] },
        { name: '역사로 탐구하는 현대 세계', semesters: [2] },
        { name: '법과 사회', semesters: [2] },
        { name: '도시의 미래 탐구', semesters: [2] },
        { name: '역학과 에너지', semesters: [2] },
        { name: '물질과 에너지', semesters: [2] },
        { name: '생물의 유전', semesters: [2] },
        { name: '행성우주과학', semesters: [2] }
      ]
    },
    {
      id: '선택군5',
      grade: 3,
      semester: '1학기',
      selectCount: 1,
      credits: 2,
      description: '3학년 1학기 예술 (택1, 2학점)',
      subjects: [
        { name: '미술 창작', semesters: [1] },
        { name: '음악 연주와 창작', semesters: [1] }
      ]
    },
    {
      id: '선택군6',
      grade: 3,
      semester: '1학기',
      selectCount: 1,
      credits: 2,
      description: '3학년 1학기 교양 1 (택1, 2학점)',
      subjects: [
        { name: '논리와 사고', semesters: [1] },
        { name: '논술', semesters: [1] }
      ]
    },
    {
      id: '선택군7',
      grade: 3,
      semester: '1학기',
      selectCount: 1,
      credits: 2,
      description: '3학년 1학기 교양 2 (택1, 2학점)',
      subjects: [
        { name: '진로와 직업', semesters: [1] },
        { name: '교육의 이해', semesters: [1] }
      ]
    },
    {
      id: '선택군8',
      grade: 3,
      semester: '1학기',
      selectCount: 2,
      credits: 4,
      description: '3학년 1학기 교과(군) 간 선택 (택2, 8학점)',
      subjects: [
        { name: '미적분Ⅱ', semesters: [1] },
        { name: '여행지리', semesters: [1] },
        { name: '윤리와 사상', semesters: [1] },
        { name: '사회와 문화', semesters: [1] },
        { name: '사회문제 탐구', semesters: [1] },
        { name: '전자기와 양자', semesters: [1] },
        { name: '화학 반응의 세계', semesters: [1] },
        { name: '세포와 물질대사', semesters: [1] },
        { name: '지구시스템과학', semesters: [1] }
      ]
    },
    {
      id: '선택군9',
      grade: 3,
      semester: '2학기',
      selectCount: 1,
      credits: 2,
      description: '3학년 2학기 예술 (택1, 2학점)',
      subjects: [
        { name: '미술과 매체', semesters: [2] },
        { name: '음악과 미디어', semesters: [2] }
      ]
    },
    {
      id: '선택군10',
      grade: 3,
      semester: '2학기',
      selectCount: 1,
      credits: 2,
      description: '3학년 2학기 교양 1 (택1, 2학점)',
      subjects: [
        { name: '논리와 사고', semesters: [2] },
        { name: '논술', semesters: [2] }
      ]
    },
    {
      id: '선택군11',
      grade: 3,
      semester: '2학기',
      selectCount: 1,
      credits: 2,
      description: '3학년 2학기 교양 2 (택1, 2학점)',
      subjects: [
        { name: '진로와 직업', semesters: [2] },
        { name: '교육의 이해', semesters: [2] }
      ]
    },
    {
      id: '선택군12',
      grade: 3,
      semester: '2학기',
      selectCount: 2,
      credits: 4,
      description: '3학년 2학기 교과(군) 간 선택 (택2, 8학점)',
      subjects: [
        { name: '경제', semesters: [2] },
        { name: '한국지리 탐구', semesters: [2] },
        { name: '윤리문제 탐구', semesters: [2] },
        { name: '금융과 경제생활', semesters: [2] },
        { name: '기후변화와 지속가능한 세계', semesters: [2] },
        { name: '과학과제 연구', semesters: [2] },
        { name: '고급 물리학', semesters: [2] },
        { name: '고급 화학', semesters: [2] },
        { name: '고급 생명과학', semesters: [2] },
        { name: '고급 지구과학', semesters: [2] },
        { name: '융합과학 탐구', semesters: [2] },
        { name: '과학의 역사와 문화', semesters: [2] },
        { name: '기후변화와 환경생태', semesters: [2] }
      ]
    }
  ]
};

// 12. 수내고등학교 (일반고)
export const SUNAE_HIGH_CURRICULUM: SchoolCurriculum = {
  id: 'sunae',
  name: '수내고등학교',
  shortName: '수내고',
  typeBadge: '일반고',
  district: '분당구',
  location: '경기 성남 분당구',
  year: '2027학년도 입학생 (2022 개정)',
  description: '2027학년도 수내고 교육과정 편성표 (국·수·영 충실한 필수 이수, 2학년 4학점 다교과 선택 및 3학년 전공심화 4학점 맞춤 개방 체계)',
  tags: ['일반고', '분당구', '공식편제', '2022 개정'],
  mandatory: {
    1: [
      { name: '공통국어1', semesters: [1], credit: 4 },
      { name: '공통국어2', semesters: [2], credit: 4 },
      { name: '공통수학1', semesters: [1], credit: 4 },
      { name: '공통수학2', semesters: [2], credit: 4 },
      { name: '공통영어1', semesters: [1], credit: 4 },
      { name: '공통영어2', semesters: [2], credit: 4 },
      { name: '한국사1', semesters: [1], credit: 3 },
      { name: '한국사2', semesters: [2], credit: 3 },
      { name: '통합사회1', semesters: [1], credit: 4 },
      { name: '통합사회2', semesters: [2], credit: 4 },
      { name: '통합과학1', semesters: [1], credit: 4 },
      { name: '통합과학2', semesters: [2], credit: 4 },
      { name: '과학탐구실험1', semesters: [1], credit: 1 },
      { name: '과학탐구실험2', semesters: [2], credit: 1 },
      { name: '체육1', semesters: [1], credit: 2 },
      { name: '체육2', semesters: [2], credit: 2 },
      { name: '음악↔미술', semesters: [1, 2], credit: 3 }
    ],
    2: [
      { name: '화법과 언어', semesters: [1], credit: 4 },
      { name: '대수', semesters: [1], credit: 4 },
      { name: '영어Ⅰ', semesters: [1], credit: 4 },
      { name: '스포츠 생활1', semesters: [1], credit: 2 },
      { name: '독서와 작문', semesters: [2], credit: 4 },
      { name: '미적분Ⅰ', semesters: [2], credit: 4 },
      { name: '영어Ⅱ', semesters: [2], credit: 4 },
      { name: '스포츠 생활2', semesters: [2], credit: 2 }
    ],
    3: [
      { name: '확률과 통계', semesters: [1], credit: 4 },
      { name: '영어 독해와 작문', semesters: [1], credit: 4 },
      { name: '스포츠 과학', semesters: [1], credit: 2 },
      { name: '주제 탐구 독서', semesters: [2], credit: 4 },
      { name: '수학과제 탐구', semesters: [2], credit: 4 },
      { name: '심화 영어 독해와 작문', semesters: [2], credit: 4 },
      { name: '스포츠 문화', semesters: [2], credit: 2 }
    ]
  },
  groups: [
    {
      id: '선택군1',
      grade: 2,
      semester: '1학기',
      selectCount: 1,
      credits: 2,
      description: '2학년 1학기 예술 선택 (택1, 2학점)',
      subjects: [
        { name: '음악 연주와 창작', semesters: [1] },
        { name: '미술 창작', semesters: [1] }
      ]
    },
    {
      id: '선택군2',
      grade: 2,
      semester: '1학기',
      selectCount: 1,
      credits: 2,
      description: '2학년 1학기 공학/정보/논리 선택 (택1, 2학점)',
      subjects: [
        { name: '로봇과 공학세계', semesters: [1] },
        { name: '프로그래밍', semesters: [1] },
        { name: '논리와 사고', semesters: [1] }
      ]
    },
    {
      id: '선택군3',
      grade: 2,
      semester: '1학기',
      selectCount: 1,
      credits: 3,
      description: '2학년 1학기 제2외국어/한문 선택 (택1, 3학점)',
      subjects: [
        { name: '일본어', semesters: [1] },
        { name: '중국어', semesters: [1] },
        { name: '언어생활과 한자', semesters: [1] }
      ]
    },
    {
      id: '선택군4',
      grade: 2,
      semester: '1학기',
      selectCount: 2,
      credits: 4,
      description: '2학년 1학기 교과(군) 간 심화 선택 (택2, 과목당 4학점, 총 8학점)',
      subjects: [
        { name: '문학과 영상', semesters: [1] },
        { name: '기하', semesters: [1] },
        { name: '세계 문화와 영어', semesters: [1] },
        { name: '경제', semesters: [1] },
        { name: '국제 관계의 이해', semesters: [1] },
        { name: '세계시민과 지리', semesters: [1] },
        { name: '윤리와 사상', semesters: [1] },
        { name: '물리학', semesters: [1] },
        { name: '화학', semesters: [1] },
        { name: '생명과학', semesters: [1] },
        { name: '지구과학', semesters: [1] }
      ]
    },
    {
      id: '선택군5',
      grade: 2,
      semester: '2학기',
      selectCount: 1,
      credits: 2,
      description: '2학년 2학기 예술 선택 (택1, 2학점)',
      subjects: [
        { name: '음악과 미디어', semesters: [2] },
        { name: '미술과 매체', semesters: [2] }
      ]
    },
    {
      id: '선택군6',
      grade: 2,
      semester: '2학기',
      selectCount: 1,
      credits: 2,
      description: '2학년 2학기 교양 선택 (택1, 2학점)',
      subjects: [
        { name: '인간과 경제활동', semesters: [2] },
        { name: '논술', semesters: [2] }
      ]
    },
    {
      id: '선택군7',
      grade: 2,
      semester: '2학기',
      selectCount: 1,
      credits: 3,
      description: '2학년 2학기 제2외국어/한문 선택 (택1, 3학점)',
      subjects: [
        { name: '일본어 회화', semesters: [2] },
        { name: '중국어 회화', semesters: [2] },
        { name: '한문 고전 읽기', semesters: [2] }
      ]
    },
    {
      id: '선택군8',
      grade: 2,
      semester: '2학기',
      selectCount: 2,
      credits: 4,
      description: '2학년 2학기 교과(군) 간 심화 선택 (택2, 과목당 4학점, 총 8학점)',
      subjects: [
        { name: '정치', semesters: [2] },
        { name: '법과 사회', semesters: [2] },
        { name: '한국지리 탐구', semesters: [2] },
        { name: '현대사회와 윤리', semesters: [2] },
        { name: '동아시아 역사 기행', semesters: [2] },
        { name: '역학과 에너지', semesters: [2] },
        { name: '물질과 에너지', semesters: [2] },
        { name: '세포와 물질대사', semesters: [2] },
        { name: '지구시스템과학', semesters: [2] }
      ]
    },
    {
      id: '선택군9',
      grade: 3,
      semester: '1학기',
      selectCount: 1,
      credits: 3,
      description: '3학년 1학기 문화/공학/정보 선택 (택1, 3학점)',
      subjects: [
        { name: '일본 문화', semesters: [1] },
        { name: '중국 문화', semesters: [1] },
        { name: '창의 공학 설계', semesters: [1] },
        { name: '한문 고전 읽기', semesters: [1] },
        { name: '인공지능 기초', semesters: [1] },
        { name: '지식 재산 일반', semesters: [1] }
      ]
    },
    {
      id: '선택군10',
      grade: 3,
      semester: '1학기',
      selectCount: 4,
      credits: 4,
      description: '3학년 1학기 교과(군) 간 심화 선택 (택4, 과목당 4학점, 총 16학점)',
      subjects: [
        { name: '언어생활 탐구', semesters: [1] },
        { name: '미적분Ⅱ', semesters: [1] },
        { name: '심화 영어', semesters: [1] },
        { name: '인공지능 수학', semesters: [1] },
        { name: '사회와 문화', semesters: [1] },
        { name: '도시의 미래 탐구', semesters: [1] },
        { name: '세계사', semesters: [1] },
        { name: '윤리문제 탐구', semesters: [1] },
        { name: '전자기와 양자', semesters: [1] },
        { name: '화학 반응의 세계', semesters: [1] },
        { name: '생물의 유전', semesters: [1] },
        { name: '행성우주과학', semesters: [1] },
        { name: '융합과학 탐구', semesters: [1] }
      ]
    },
    {
      id: '선택군11',
      grade: 3,
      semester: '2학기',
      selectCount: 1,
      credits: 3,
      description: '3학년 2학기 외국어/실과/SW 선택 (택1, 3학점)',
      subjects: [
        { name: '심화 일본어', semesters: [2] },
        { name: '심화 중국어', semesters: [2] },
        { name: '지식 재산 일반', semesters: [2] },
        { name: '생활과학 탐구', semesters: [2] },
        { name: '소프트웨어와 생활', semesters: [2] }
      ]
    },
    {
      id: '선택군12',
      grade: 3,
      semester: '2학기',
      selectCount: 3,
      credits: 4,
      description: '3학년 2학기 교과(군) 간 심화 선택 (택3, 과목당 4학점, 총 12학점)',
      subjects: [
        { name: '매체 의사소통', semesters: [2] },
        { name: '전문 수학', semesters: [2] },
        { name: '실생활 영어 회화', semesters: [2] },
        { name: '인문학과 윤리', semesters: [2] },
        { name: '사회문제 탐구', semesters: [2] },
        { name: '금융과 경제생활', semesters: [2] },
        { name: '여행지리', semesters: [2] },
        { name: '기후변화와 지속가능한 세계', semesters: [2] },
        { name: '역사로 탐구하는 현대 세계', semesters: [2] },
        { name: '과학의 역사와 문화', semesters: [2] },
        { name: '기후변화와 환경생태', semesters: [2] },
        { name: '융합과학 탐구', semesters: [2] }
      ]
    }
  ]
};

// 13. 이매고등학교 (일반고)
// 13. 이매고등학교 (일반고) - 2027학년도 공식 편제표 원본 정밀 반영
export const IMAE_HIGH_CURRICULUM: SchoolCurriculum = {
  id: 'imae',
  name: '이매고등학교',
  shortName: '이매고',
  typeBadge: '일반고',
  district: '분당구',
  location: '경기 성남 분당구 이매동',
  year: '2027학년도 입학생',
  description: '이매고등학교 2027학년도 입학생 교육과정 편성표 (국영수 24/24/22 필수체계 및 학기별 선택과목군)',
  tags: ['분당', '일반고', '수시정시대비', '체계적편제'],
  mandatory: {
    1: [
      { name: '공통국어1', semesters: [1], credit: 4 },
      { name: '공통국어2', semesters: [2], credit: 4 },
      { name: '공통수학1', semesters: [1], credit: 4 },
      { name: '공통수학2', semesters: [2], credit: 4 },
      { name: '공통영어1', semesters: [1], credit: 4 },
      { name: '공통영어2', semesters: [2], credit: 4 },
      { name: '한국사1', semesters: [1], credit: 3 },
      { name: '한국사2', semesters: [2], credit: 3 },
      { name: '통합사회1', semesters: [1], credit: 4 },
      { name: '통합사회2', semesters: [2], credit: 4 },
      { name: '통합과학1', semesters: [1], credit: 4 },
      { name: '통합과학2', semesters: [2], credit: 4 },
      { name: '과학탐구실험1', semesters: [1], credit: 1 },
      { name: '과학탐구실험2', semesters: [2], credit: 1 },
      { name: '체육1', semesters: [1], credit: 2 },
      { name: '체육2', semesters: [2], credit: 2 },
      { name: '기술·가정↔정보', semesters: [1, 2], credit: 3 }
    ],
    2: [
      { name: '문학', semesters: [1], credit: 4 },
      { name: '대수', semesters: [1], credit: 4 },
      { name: '영어Ⅰ', semesters: [1], credit: 4 },
      { name: '운동과 건강', semesters: [1], credit: 2 },
      { name: '음악↔미술', semesters: [1, 2], credit: 3 },
      { name: '화법과 언어', semesters: [2], credit: 4 },
      { name: '미적분Ⅰ', semesters: [2], credit: 4 },
      { name: '영어Ⅱ', semesters: [2], credit: 4 },
      { name: '스포츠 생활1', semesters: [2], credit: 2 }
    ],
    3: [
      { name: '독서와 작문', semesters: [1], credit: 4 },
      { name: '확률과 통계', semesters: [1], credit: 4 },
      { name: '심화 영어', semesters: [1], credit: 4 },
      { name: '스포츠 문화', semesters: [1], credit: 1 },
      { name: '언어생활 탐구', semesters: [2], credit: 4 },
      { name: '실용 통계', semesters: [2], credit: 4 },
      { name: '영어 독해와 작문', semesters: [2], credit: 3 },
      { name: '스포츠 과학', semesters: [2], credit: 1 }
    ]
  },
  groups: [
    {
      id: 'imae_g1',
      name: '2학년 1학기 교과간 선택 (택4)',
      selectCount: 4,
      targetGrade: '2학년',
      subjects: [
        { name: '세계시민과 지리', semesters: [1] },
        { name: '세계사', semesters: [1] },
        { name: '사회와 문화', semesters: [1] },
        { name: '윤리와 사상', semesters: [1] },
        { name: '정치', semesters: [1] },
        { name: '물리학', semesters: [1] },
        { name: '화학', semesters: [1] },
        { name: '생명과학', semesters: [1] },
        { name: '지구과학', semesters: [1] },
        { name: '중국어', semesters: [1] },
        { name: '일본어', semesters: [1] },
        { name: '인공지능 기초', semesters: [1] }
      ]
    },
    {
      id: 'imae_g2',
      name: '2학년 2학기 교과간 선택 (택4)',
      selectCount: 4,
      targetGrade: '2학년',
      subjects: [
        { name: '도시의 미래 탐구', semesters: [2] },
        { name: '동아시아 역사 기행', semesters: [2] },
        { name: '법과 사회', semesters: [2] },
        { name: '경제', semesters: [2] },
        { name: '인문학과 윤리', semesters: [2] },
        { name: '역학과 에너지', semesters: [2] },
        { name: '물질과 에너지', semesters: [2] },
        { name: '세포와 물질대사', semesters: [2] },
        { name: '지구시스템과학', semesters: [2] },
        { name: '기하', semesters: [2] },
        { name: '중국어 회화', semesters: [2] },
        { name: '일본어 회화', semesters: [2] },
        { name: '데이터 과학', semesters: [2] }
      ]
    },
    {
      id: 'imae_g3',
      name: '3학년 1학기 교과간 선택 (택5)',
      selectCount: 5,
      targetGrade: '3학년',
      subjects: [
        { name: '문학과 영상', semesters: [1] },
        { name: '미적분Ⅱ', semesters: [1] },
        { name: '미디어 영어', semesters: [1] },
        { name: '여행지리', semesters: [1] },
        { name: '역사로 탐구하는 현대 세계', semesters: [1] },
        { name: '사회문제 탐구', semesters: [1] },
        { name: '현대사회와 윤리', semesters: [1] },
        { name: '전자기와 양자', semesters: [1] },
        { name: '화학 반응의 세계', semesters: [1] },
        { name: '생물의 유전', semesters: [1] },
        { name: '행성우주과학', semesters: [1] },
        { name: '과학과제 연구', semesters: [1] },
        { name: '인간과 심리', semesters: [1] },
        { name: '중국 문화', semesters: [1] },
        { name: '일본 문화', semesters: [1] },
        { name: '소프트웨어와 생활', semesters: [1] }
      ]
    },
    {
      id: 'imae_g4',
      name: '3학년 2학기 교과간 선택 (택5)',
      selectCount: 5,
      targetGrade: '3학년',
      subjects: [
        { name: '주제 탐구 독서', semesters: [2] },
        { name: '인공지능 수학', semesters: [2] },
        { name: '세계 문화와 영어', semesters: [2] },
        { name: '금융과 경제생활', semesters: [2] },
        { name: '윤리문제 탐구', semesters: [2] },
        { name: '기후변화와 지속가능한 세계', semesters: [2] },
        { name: '과학의 역사와 문화', semesters: [2] },
        { name: '융합과학 탐구', semesters: [2] },
        { name: '기후변화와 환경생태', semesters: [2] },
        { name: '논술', semesters: [2] },
        { name: '심화 중국어', semesters: [2] },
        { name: '심화 일본어', semesters: [2] },
        { name: '프로그래밍', semesters: [2] }
      ]
    },
    {
      id: 'imae_g5',
      name: '3학년 1학기 예술 (택1)',
      selectCount: 1,
      targetGrade: '3학년',
      subjects: [
        { name: '음악 연주와 창작', semesters: [1] },
        { name: '미술 창작', semesters: [1] }
      ]
    },
    {
      id: 'imae_g6',
      name: '3학년 2학기 예술 (택1)',
      selectCount: 1,
      targetGrade: '3학년',
      subjects: [
        { name: '음악 감상과 비평', semesters: [2] },
        { name: '미술 감상과 비평', semesters: [2] }
      ]
    }
  ]
};

// 14. 태원고등학교 (일반고)
export const TAEWON_HIGH_CURRICULUM: SchoolCurriculum = {
  id: 'taewon',
  name: '태원고등학교',
  shortName: '태원고',
  typeBadge: '일반고',
  district: '분당구',
  location: '경기 성남 분당구 야탑동',
  year: '2027학년도 입학생 (2022 개정)',
  description: '2027학년도 태원고 공식 교육과정 편성표 (국·수·영 충실한 필수 이수, 학기제 교차이수 및 2·3학년 교과(군) 간 맞춤 선택 체계)',
  tags: ['일반고', '분당구', '사립', '공식편제', '2022 개정'],
  mandatory: {
    1: [
      { name: '공통국어1', semesters: [1], credit: 4 },
      { name: '공통국어2', semesters: [2], credit: 4 },
      { name: '공통수학1', semesters: [1], credit: 4 },
      { name: '공통수학2', semesters: [2], credit: 4 },
      { name: '공통영어1', semesters: [1], credit: 4 },
      { name: '공통영어2', semesters: [2], credit: 4 },
      { name: '한국사1', semesters: [1], credit: 3 },
      { name: '한국사2', semesters: [2], credit: 3 },
      { name: '통합사회1', semesters: [1], credit: 4 },
      { name: '통합사회2', semesters: [2], credit: 4 },
      { name: '통합과학1', semesters: [1], credit: 4 },
      { name: '통합과학2', semesters: [2], credit: 4 },
      { name: '과학탐구실험1', semesters: [1], credit: 1 },
      { name: '과학탐구실험2', semesters: [2], credit: 1 },
      { name: '체육1', semesters: [1], credit: 2 },
      { name: '체육2', semesters: [2], credit: 2 },
      { name: '음악↔미술', semesters: [1, 2], credit: 3 },
      { name: '언어생활과 한자↔학문의 기초와 융합', semesters: [1, 2], credit: 2 }
    ],
    2: [
      { name: '문학', semesters: [1], credit: 4 },
      { name: '대수', semesters: [1], credit: 4 },
      { name: '영어Ⅰ', semesters: [1], credit: 4 },
      { name: '운동과 건강', semesters: [1], credit: 2 },
      { name: '독서와 작문', semesters: [2], credit: 4 },
      { name: '미적분Ⅰ', semesters: [2], credit: 4 },
      { name: '영어 독해와 작문', semesters: [2], credit: 4 },
      { name: '스포츠 생활1', semesters: [2], credit: 2 }
    ],
    3: [
      { name: '화법과 언어', semesters: [1], credit: 4 },
      { name: '확률과 통계', semesters: [1], credit: 4 },
      { name: '영어Ⅱ', semesters: [1], credit: 3 },
      { name: '스포츠 문화', semesters: [1], credit: 1 },
      { name: '언어생활 탐구', semesters: [2], credit: 4 },
      { name: '수학과제 탐구', semesters: [2], credit: 4 },
      { name: '심화 영어', semesters: [2], credit: 3 },
      { name: '스포츠 과학', semesters: [2], credit: 1 }
    ]
  },
  groups: [
    {
      id: '선택군1',
      grade: 2,
      semester: '1학기',
      selectCount: 1,
      credits: 3,
      description: '2학년 1학기 제2외국어 (택1, 3학점)',
      subjects: [
        { name: '일본어', semesters: [1] },
        { name: '중국어', semesters: [1] }
      ]
    },
    {
      id: '선택군2',
      grade: 2,
      semester: '1학기',
      selectCount: 4,
      credits: 3,
      description: '2학년 1학기 교과(군) 간 선택 (택4, 12학점)',
      subjects: [
        { name: '주제 탐구 독서', semesters: [1] },
        { name: '영미 문학 읽기', semesters: [1] },
        { name: '인공지능 수학', semesters: [1] },
        { name: '세계시민과 지리', semesters: [1] },
        { name: '세계사', semesters: [1] },
        { name: '법과 사회', semesters: [1] },
        { name: '현대사회와 윤리', semesters: [1] },
        { name: '물리학', semesters: [1] },
        { name: '화학', semesters: [1] },
        { name: '생명과학', semesters: [1] },
        { name: '인공지능 기초', semesters: [1] }
      ]
    },
    {
      id: '선택군3',
      grade: 2,
      semester: '2학기',
      selectCount: 1,
      credits: 3,
      description: '2학년 2학기 제2외국어 문화 (택1, 3학점)',
      subjects: [
        { name: '일본 문화', semesters: [2] },
        { name: '중국 문화', semesters: [2] }
      ]
    },
    {
      id: '선택군4',
      grade: 2,
      semester: '2학기',
      selectCount: 4,
      credits: 3,
      description: '2학년 2학기 교과(군) 간 선택 (택4, 12학점)',
      subjects: [
        { name: '문학과 영상', semesters: [2] },
        { name: '영어 발표와 토론', semesters: [2] },
        { name: '기하', semesters: [2] },
        { name: '경제 수학', semesters: [2] },
        { name: '한국지리 탐구', semesters: [2] },
        { name: '동아시아 역사 기행', semesters: [2] },
        { name: '경제', semesters: [2] },
        { name: '윤리와 사상', semesters: [2] },
        { name: '역학과 에너지', semesters: [2] },
        { name: '물질과 에너지', semesters: [2] },
        { name: '세포와 물질대사', semesters: [2] },
        { name: '지구과학', semesters: [2] }
      ]
    },
    {
      id: '선택군5',
      grade: 3,
      semester: '1학기',
      selectCount: 1,
      credits: 2,
      description: '3학년 1학기 예술 (택1, 2학점)',
      subjects: [
        { name: '음악 연주와 창작', semesters: [1] },
        { name: '미술 창작', semesters: [1] }
      ]
    },
    {
      id: '선택군6',
      grade: 3,
      semester: '1학기',
      selectCount: 1,
      credits: 3,
      description: '3학년 1학기 정보/공학 (택1, 3학점)',
      subjects: [
        { name: '로봇과 공학세계', semesters: [1] },
        { name: '소프트웨어와 생활', semesters: [1] }
      ]
    },
    {
      id: '선택군7',
      grade: 3,
      semester: '1학기',
      selectCount: 4,
      credits: 3,
      description: '3학년 1학기 교과(군) 간 심화 선택 (택4, 12학점)',
      subjects: [
        { name: '독서 토론과 글쓰기', semesters: [1] },
        { name: '미적분Ⅱ', semesters: [1] },
        { name: '심화 영어', semesters: [1] },
        { name: '사회와 문화', semesters: [1] },
        { name: '세계 문제와 미래 사회', semesters: [1] },
        { name: '기후변화와 지속가능한 세계', semesters: [1] },
        { name: '사회문제 탐구', semesters: [1] },
        { name: '전자기와 양자', semesters: [1] },
        { name: '화학 반응의 세계', semesters: [1] },
        { name: '생물의 유전', semesters: [1] },
        { name: '행성우주과학', semesters: [1] },
        { name: '지구시스템과학', semesters: [1] },
        { name: '기후변화와 환경생태', semesters: [1] }
      ]
    },
    {
      id: '선택군8',
      grade: 3,
      semester: '2학기',
      selectCount: 1,
      credits: 2,
      description: '3학년 2학기 예술 (택1, 2학점)',
      subjects: [
        { name: '음악과 미디어', semesters: [2] },
        { name: '미술과 매체', semesters: [2] }
      ]
    },
    {
      id: '선택군9',
      grade: 3,
      semester: '2학기',
      selectCount: 1,
      credits: 3,
      description: '3학년 2학기 정보/공학 (택1, 3학점)',
      subjects: [
        { name: '창의 공학 설계', semesters: [2] },
        { name: '인공지능 프로젝트', semesters: [2] }
      ]
    },
    {
      id: '선택군10',
      grade: 3,
      semester: '2학기',
      selectCount: 4,
      credits: 3,
      description: '3학년 2학기 교과(군) 간 심화 선택 (택4, 12학점)',
      subjects: [
        { name: '매체 의사소통', semesters: [2] },
        { name: '실용 통계', semesters: [2] },
        { name: '세계 문화와 영어', semesters: [2] },
        { name: '도시의 미래 탐구', semesters: [2] },
        { name: '역사로 탐구하는 현대 세계', semesters: [2] },
        { name: '인문학과 윤리', semesters: [2] },
        { name: '국제 관계와 국제기구', semesters: [2] },
        { name: '금융과 경제생활', semesters: [2] },
        { name: '정치', semesters: [2] },
        { name: '윤리문제 탐구', semesters: [2] },
        { name: '고급 생명과학', semesters: [2] },
        { name: '과학의 역사와 문화', semesters: [2] },
        { name: '융합과학 탐구', semesters: [2] }
      ]
    }
  ]
};

// 15. 한솔고등학교 (일반고)
export const HANSOL_HIGH_CURRICULUM: SchoolCurriculum = {
  id: 'hansol',
  name: '한솔고등학교',
  shortName: '한솔고',
  typeBadge: '일반고',
  district: '분당구',
  location: '경기 성남 분당구 정자동',
  year: '2027학년도 입학생 (2022 개정)',
  description: '2027학년도 한솔고 공식 교육과정 편성표 (국·수·영 탄탄한 기초, 학기제 교차이수 및 2·3학년 진로·예술·교양 다채로운 선택 체계)',
  tags: ['일반고', '분당구', '공식편제', '2022 개정'],
  mandatory: {
    1: [
      { name: '공통국어1', semesters: [1], credit: 4 },
      { name: '공통국어2', semesters: [2], credit: 4 },
      { name: '공통수학1', semesters: [1], credit: 4 },
      { name: '공통수학2', semesters: [2], credit: 4 },
      { name: '공통영어1', semesters: [1], credit: 4 },
      { name: '공통영어2', semesters: [2], credit: 4 },
      { name: '한국사1', semesters: [1], credit: 3 },
      { name: '한국사2', semesters: [2], credit: 3 },
      { name: '통합사회1', semesters: [1], credit: 4 },
      { name: '통합사회2', semesters: [2], credit: 4 },
      { name: '통합과학1', semesters: [1], credit: 4 },
      { name: '통합과학2', semesters: [2], credit: 4 },
      { name: '과학탐구실험1', semesters: [1], credit: 1 },
      { name: '과학탐구실험2', semesters: [2], credit: 1 },
      { name: '체육1', semesters: [1], credit: 2 },
      { name: '체육2', semesters: [2], credit: 2 },
      { name: '음악↔미술', semesters: [1, 2], credit: 3 }
    ],
    2: [
      { name: '문학', semesters: [1], credit: 4 },
      { name: '대수', semesters: [1], credit: 4 },
      { name: '영어Ⅰ', semesters: [1], credit: 4 },
      { name: '스포츠 생활1', semesters: [1], credit: 2 },
      { name: '화법과 언어', semesters: [2], credit: 4 },
      { name: '미적분Ⅰ', semesters: [2], credit: 4 },
      { name: '영어Ⅱ', semesters: [2], credit: 4 },
      { name: '스포츠 생활2', semesters: [2], credit: 2 }
    ],
    3: [
      { name: '독서와 작문', semesters: [1], credit: 4 },
      { name: '확률과 통계', semesters: [1], credit: 4 },
      { name: '영어 독해와 작문', semesters: [1], credit: 4 },
      { name: '스포츠 문화', semesters: [1], credit: 1 },
      { name: '독서 토론과 글쓰기', semesters: [2], credit: 4 },
      { name: '수학과제 탐구', semesters: [2], credit: 4 },
      { name: '심화 영어', semesters: [2], credit: 4 },
      { name: '스포츠 과학', semesters: [2], credit: 1 }
    ]
  },
  groups: [
    {
      id: '선택군1',
      grade: 2,
      semester: '1학기',
      selectCount: 1,
      credits: 3,
      description: '2학년 1학기 정보/기술/외국어 (택1, 3학점)',
      subjects: [
        { name: '정보', semesters: [1] },
        { name: '생활과학 탐구', semesters: [1] },
        { name: '일본어', semesters: [1] },
        { name: '중국어', semesters: [1] }
      ]
    },
    {
      id: '선택군2',
      grade: 2,
      semester: '1학기',
      selectCount: 4,
      credits: 3,
      description: '2학년 1학기 교과(군) 간 선택 (택4, 12학점)',
      subjects: [
        { name: '주제 탐구 독서', semesters: [1] },
        { name: '세계 문화와 영어', semesters: [1] },
        { name: '인공지능 수학', semesters: [1] },
        { name: '윤리와 사상', semesters: [1] },
        { name: '정치', semesters: [1] },
        { name: '경제', semesters: [1] },
        { name: '한국지리 탐구', semesters: [1] },
        { name: '물리학', semesters: [1] },
        { name: '화학', semesters: [1] },
        { name: '생명과학', semesters: [1] },
        { name: '지구과학', semesters: [1] }
      ]
    },
    {
      id: '선택군3',
      grade: 2,
      semester: '2학기',
      selectCount: 1,
      credits: 3,
      description: '2학년 2학기 정보/과학/외국어 (택1, 3학점)',
      subjects: [
        { name: '인공지능 기초', semesters: [2] },
        { name: '과학탐구실험', semesters: [2] },
        { name: '일본어 회화', semesters: [2] },
        { name: '중국어 회화', semesters: [2] }
      ]
    },
    {
      id: '선택군4',
      grade: 2,
      semester: '2학기',
      selectCount: 4,
      credits: 3,
      description: '2학년 2학기 교과(군) 간 선택 (택4, 12학점)',
      subjects: [
        { name: '영어 발표와 토론', semesters: [2] },
        { name: '기하', semesters: [2] },
        { name: '동아시아 역사 기행', semesters: [2] },
        { name: '현대사회와 윤리', semesters: [2] },
        { name: '법과 사회', semesters: [2] },
        { name: '여행지리', semesters: [2] },
        { name: '역학과 에너지', semesters: [2] },
        { name: '물질과 에너지', semesters: [2] },
        { name: '세포와 물질대사', semesters: [2] },
        { name: '지구시스템과학', semesters: [2] }
      ]
    },
    {
      id: '선택군5',
      grade: 3,
      semester: '1학기',
      selectCount: 1,
      credits: 2,
      description: '3학년 1학기 예술 (택1, 2학점)',
      subjects: [
        { name: '음악 연주와 창작', semesters: [1] },
        { name: '미술 창작', semesters: [1] },
        { name: '음악 감상과 비평', semesters: [1] }
      ]
    },
    {
      id: '선택군6',
      grade: 3,
      semester: '1학기',
      selectCount: 1,
      credits: 2,
      description: '3학년 1학기 환경/교양 (택1, 2학점)',
      subjects: [
        { name: '생태와 환경', semesters: [1] },
        { name: '인간과 경제활동', semesters: [1] }
      ]
    },
    {
      id: '선택군7',
      grade: 3,
      semester: '1학기',
      selectCount: 1,
      credits: 2,
      description: '3학년 1학기 정보/공학/외국어문화 (택1, 2학점)',
      subjects: [
        { name: '데이터 과학', semesters: [1] },
        { name: '창의 공학 설계', semesters: [1] },
        { name: '일본 문화', semesters: [1] },
        { name: '중국 문화', semesters: [1] }
      ]
    },
    {
      id: '선택군8',
      grade: 3,
      semester: '1학기',
      selectCount: 4,
      credits: 3,
      description: '3학년 1학기 교과(군) 간 선택 (택4, 12학점)',
      subjects: [
        { name: '문학과 영상', semesters: [1] },
        { name: '심화 영어 독해와 작문', semesters: [1] },
        { name: '미적분Ⅱ', semesters: [1] },
        { name: '경제 수학', semesters: [1] },
        { name: '역사로 탐구하는 현대 세계', semesters: [1] },
        { name: '인문학과 윤리', semesters: [1] },
        { name: '사회와 문화', semesters: [1] },
        { name: '사회문제 탐구', semesters: [1] },
        { name: '세계시민과 지리', semesters: [1] },
        { name: '전자기와 양자', semesters: [1] },
        { name: '화학 반응의 세계', semesters: [1] },
        { name: '생물의 유전', semesters: [1] },
        { name: '행성우주과학', semesters: [1] },
        { name: '융합과학 탐구', semesters: [1] }
      ]
    },
    {
      id: '선택군9',
      grade: 3,
      semester: '2학기',
      selectCount: 1,
      credits: 2,
      description: '3학년 2학기 예술 (택1, 2학점)',
      subjects: [
        { name: '음악 감상과 비평', semesters: [2] },
        { name: '미술과 매체', semesters: [2] },
        { name: '연극과 미디어', semesters: [2] }
      ]
    },
    {
      id: '선택군10',
      grade: 3,
      semester: '2학기',
      selectCount: 1,
      credits: 2,
      description: '3학년 2학기 환경/교양 (택1, 2학점)',
      subjects: [
        { name: '생태와 환경', semesters: [2] },
        { name: '인간과 경제활동', semesters: [2] }
      ]
    },
    {
      id: '선택군11',
      grade: 3,
      semester: '2학기',
      selectCount: 1,
      credits: 2,
      description: '3학년 2학기 정보/교양/심화외국어 (택1, 2학점)',
      subjects: [
        { name: '소프트웨어와 생활', semesters: [2] },
        { name: '지식 재산 일반', semesters: [2] },
        { name: '심화 일본어', semesters: [2] },
        { name: '심화 중국어', semesters: [2] }
      ]
    },
    {
      id: '선택군12',
      grade: 3,
      semester: '2학기',
      selectCount: 4,
      credits: 3,
      description: '3학년 2학기 교과(군) 간 선택 (택4, 12학점)',
      subjects: [
        { name: '언어생활 탐구', semesters: [2] },
        { name: '미디어 영어', semesters: [2] },
        { name: '전문 수학', semesters: [2] },
        { name: '역사로 탐구하는 현대 세계', semesters: [2] },
        { name: '윤리문제 탐구', semesters: [2] },
        { name: '금융과 경제생활', semesters: [2] },
        { name: '기후변화와 지속가능한 세계', semesters: [2] },
        { name: '융합과학 탐구', semesters: [2] },
        { name: '과학의 역사와 문화', semesters: [2] },
        { name: '기후변화와 환경생태', semesters: [2] }
      ]
    }
  ]
};

// 16. 송림고등학교 (일반고)
export const SONGRIM_HIGH_CURRICULUM: SchoolCurriculum = {
  id: 'songrim',
  name: '송림고등학교',
  shortName: '송림고',
  typeBadge: '일반고',
  district: '분당구',
  location: '경기 성남 분당구',
  year: '2027학년도 입학생 (2022 개정)',
  description: '2027학년도 송림고 공식 교육과정 편성표 (국·수·영 탄탄한 심화 및 2·3학년 교과(군) 간 택3~4, 제2외국어/정보/교양 11개 선택군 운영)',
  tags: ['일반고', '분당구', '사립', '공식편제', '2022 개정'],
  mandatory: {
    1: [
      { name: '공통국어1', semesters: [1], credit: 4 },
      { name: '공통국어2', semesters: [2], credit: 4 },
      { name: '공통수학1', semesters: [1], credit: 4 },
      { name: '공통수학2', semesters: [2], credit: 4 },
      { name: '공통영어1', semesters: [1], credit: 4 },
      { name: '공통영어2', semesters: [2], credit: 4 },
      { name: '한국사1', semesters: [1], credit: 3 },
      { name: '한국사2', semesters: [2], credit: 3 },
      { name: '통합사회1', semesters: [1], credit: 4 },
      { name: '통합사회2', semesters: [2], credit: 4 },
      { name: '통합과학1', semesters: [1], credit: 4 },
      { name: '통합과학2', semesters: [2], credit: 4 },
      { name: '과학탐구실험1', semesters: [1], credit: 1 },
      { name: '과학탐구실험2', semesters: [2], credit: 1 },
      { name: '체육1', semesters: [1], credit: 2 },
      { name: '체육2', semesters: [2], credit: 2 },
      { name: '음악↔미술', semesters: [1, 2], credit: 3 },
      { name: '정보↔생활과학 탐구', semesters: [1, 2], credit: 3 }
    ],
    2: [
      { name: '문학', semesters: [1], credit: 3 },
      { name: '대수', semesters: [1], credit: 3 },
      { name: '영어Ⅰ', semesters: [1], credit: 3 },
      { name: '스포츠 생활1', semesters: [1], credit: 2 },
      { name: '화법과 언어', semesters: [2], credit: 3 },
      { name: '미적분Ⅰ', semesters: [2], credit: 3 },
      { name: '영어Ⅱ', semesters: [2], credit: 3 },
      { name: '스포츠 생활2', semesters: [2], credit: 2 }
    ],
    3: [
      { name: '독서와 작문', semesters: [1], credit: 4 },
      { name: '확률과 통계', semesters: [1], credit: 4 },
      { name: '영어 독해와 작문', semesters: [1], credit: 4 },
      { name: '스포츠 문화', semesters: [1], credit: 1 },
      { name: '미술 감상과 비평', semesters: [1], credit: 2 },
      { name: '언어생활 탐구', semesters: [2], credit: 4 },
      { name: '실용 통계', semesters: [2], credit: 4 },
      { name: '심화 영어 독해와 작문', semesters: [2], credit: 4 },
      { name: '스포츠 과학', semesters: [2], credit: 1 },
      { name: '미술과 매체', semesters: [2], credit: 2 }
    ]
  },
  groups: [
    {
      id: '선택군1',
      grade: 2,
      semester: '1학기',
      selectCount: 1,
      credits: 3,
      description: '2학년 1학기 교과(군) 간 선택 1 (택1, 3학점)',
      subjects: [
        { name: '주제 탐구 독서', semesters: [1] },
        { name: '기하', semesters: [1] },
        { name: '세계 문화와 영어', semesters: [1] }
      ]
    },
    {
      id: '선택군2',
      grade: 2,
      semester: '1학기',
      selectCount: 3,
      credits: 3,
      description: '2학년 1학기 교과(군) 간 선택 2 (택3, 9학점)',
      subjects: [
        { name: '세계시민과 지리', semesters: [1] },
        { name: '윤리와 사상', semesters: [1] },
        { name: '경제', semesters: [1] },
        { name: '정치', semesters: [1] },
        { name: '물리학', semesters: [1] },
        { name: '화학', semesters: [1] },
        { name: '생명과학', semesters: [1] },
        { name: '지구과학', semesters: [1] }
      ]
    },
    {
      id: '선택군3',
      grade: 2,
      semester: '1학기',
      selectCount: 1,
      credits: 3,
      description: '2학년 1학기 제2외국어/정보 (택1, 3학점)',
      subjects: [
        { name: '한문', semesters: [1] },
        { name: '중국어', semesters: [1] },
        { name: '독일어', semesters: [1] },
        { name: '데이터 과학', semesters: [1] }
      ]
    },
    {
      id: '선택군4',
      grade: 2,
      semester: '2학기',
      selectCount: 1,
      credits: 3,
      description: '2학년 2학기 교과(군) 간 선택 1 (택1, 3학점)',
      subjects: [
        { name: '문학과 영상', semesters: [2] },
        { name: '고급 대수', semesters: [2] },
        { name: '영미 문학 읽기', semesters: [2] }
      ]
    },
    {
      id: '선택군5',
      grade: 2,
      semester: '2학기',
      selectCount: 3,
      credits: 3,
      description: '2학년 2학기 교과(군) 간 선택 2 (택3, 9학점)',
      subjects: [
        { name: '한국지리 탐구', semesters: [2] },
        { name: '인문학과 윤리', semesters: [2] },
        { name: '동아시아 역사 기행', semesters: [2] },
        { name: '사회와 문화', semesters: [2] },
        { name: '역학과 에너지', semesters: [2] },
        { name: '물질과 에너지', semesters: [2] },
        { name: '세포와 물질대사', semesters: [2] },
        { name: '지구시스템과학', semesters: [2] }
      ]
    },
    {
      id: '선택군6',
      grade: 2,
      semester: '2학기',
      selectCount: 1,
      credits: 3,
      description: '2학년 2학기 제2외국어/정보 (택1, 3학점)',
      subjects: [
        { name: '언어생활과 한자', semesters: [2] },
        { name: '중국어 회화', semesters: [2] },
        { name: '독일어 회화', semesters: [2] },
        { name: '인공지능 기초', semesters: [2] }
      ]
    },
    {
      id: '선택군7',
      grade: 3,
      semester: '1학기',
      selectCount: 4,
      credits: 3,
      description: '3학년 1학기 교과(군) 간 선택 (택4, 12학점)',
      subjects: [
        { name: '매체 의사소통', semesters: [1] },
        { name: '미적분Ⅱ', semesters: [1] },
        { name: '심화 영어Ⅰ', semesters: [1] },
        { name: '세계사', semesters: [1] },
        { name: '현대사회와 윤리', semesters: [1] },
        { name: '법과 사회', semesters: [1] },
        { name: '사회문제 탐구', semesters: [1] },
        { name: '전자기와 양자', semesters: [1] },
        { name: '화학 반응의 세계', semesters: [1] },
        { name: '생물의 유전', semesters: [1] },
        { name: '행성우주과학', semesters: [1] },
        { name: '프로그래밍', semesters: [1] }
      ]
    },
    {
      id: '선택군8',
      grade: 3,
      semester: '1학기',
      selectCount: 1,
      credits: 2,
      description: '3학년 1학기 교양 (택1, 2학점)',
      subjects: [
        { name: '인간과 철학', semesters: [1] },
        { name: '인공지능 윤리', semesters: [1] },
        { name: '인간과 심리', semesters: [1] },
        { name: '삶과 종교', semesters: [1] }
      ]
    },
    {
      id: '선택군9',
      grade: 3,
      semester: '2학기',
      selectCount: 1,
      credits: 2,
      description: '3학년 2학기 교양 (택1, 2학점)',
      subjects: [
        { name: '논리와 사고', semesters: [2] },
        { name: '논술', semesters: [2] },
        { name: '인간과 심리', semesters: [2] },
        { name: '삶과 종교', semesters: [2] }
      ]
    },
    {
      id: '선택군10',
      grade: 3,
      semester: '2학기',
      selectCount: 1,
      credits: 3,
      description: '3학년 2학기 교과(군) 간 선택 1 (택1, 3학점)',
      subjects: [
        { name: '독서 토론과 글쓰기', semesters: [2] },
        { name: '고급 미적분', semesters: [2] },
        { name: '심화 영어Ⅱ', semesters: [2] }
      ]
    },
    {
      id: '선택군11',
      grade: 3,
      semester: '2학기',
      selectCount: 3,
      credits: 3,
      description: '3학년 2학기 교과(군) 간 선택 2 (택3, 9학점)',
      subjects: [
        { name: '윤리문제 탐구', semesters: [2] },
        { name: '금융과 경제생활', semesters: [2] },
        { name: '기후변화와 지속가능한 세계', semesters: [2] },
        { name: '과학의 역사와 문화', semesters: [2] },
        { name: '기후변화와 환경생태', semesters: [2] },
        { name: '융합과학 탐구', semesters: [2] },
        { name: '소프트웨어와 생활', semesters: [2] }
      ]
    }
  ]
};

// 17. 야탑고등학교 (일반고)
export const YATAP_HIGH_CURRICULUM: SchoolCurriculum = {
  id: 'yatap',
  name: '야탑고등학교',
  shortName: '야탑고',
  typeBadge: '일반고',
  district: '분당구',
  location: '경기 성남 분당구',
  year: '2027학년도 입학생 (2022 개정)',
  description: '2027학년도 야탑고 공식 교육과정 편성표 (국·수·영 집중 이수, 2학년 학기당 택5 대규모 개방형 선택 및 3학년 진로·예술 융합 체계)',
  tags: ['일반고', '분당구', '맞춤선택', '공식편제', '2022 개정'],
  mandatory: {
    1: [
      { name: '공통국어1', semesters: [1], credit: 4 },
      { name: '공통국어2', semesters: [2], credit: 4 },
      { name: '공통수학1', semesters: [1], credit: 4 },
      { name: '공통수학2', semesters: [2], credit: 4 },
      { name: '공통영어1', semesters: [1], credit: 4 },
      { name: '공통영어2', semesters: [2], credit: 4 },
      { name: '한국사1', semesters: [1], credit: 3 },
      { name: '한국사2', semesters: [2], credit: 3 },
      { name: '통합사회1', semesters: [1], credit: 4 },
      { name: '통합사회2', semesters: [2], credit: 4 },
      { name: '통합과학1', semesters: [1], credit: 4 },
      { name: '통합과학2', semesters: [2], credit: 4 },
      { name: '과학탐구실험1', semesters: [1], credit: 1 },
      { name: '과학탐구실험2', semesters: [2], credit: 1 },
      { name: '체육1', semesters: [1], credit: 2 },
      { name: '체육2', semesters: [2], credit: 2 },
      { name: '음악↔미술', semesters: [1, 2], credit: 3 }
    ],
    2: [
      { name: '문학', semesters: [1], credit: 4 },
      { name: '대수', semesters: [1], credit: 4 },
      { name: '영어Ⅰ', semesters: [1], credit: 4 },
      { name: '스포츠 생활1', semesters: [1], credit: 2 },
      { name: '화법과 언어', semesters: [2], credit: 4 },
      { name: '미적분Ⅰ', semesters: [2], credit: 4 },
      { name: '영어Ⅱ', semesters: [2], credit: 4 },
      { name: '스포츠 생활2', semesters: [2], credit: 2 }
    ],
    3: [
      { name: '독서와 작문', semesters: [1], credit: 4 },
      { name: '확률과 통계', semesters: [1], credit: 4 },
      { name: '영어 독해와 작문', semesters: [1], credit: 3 },
      { name: '스포츠 문화', semesters: [1], credit: 1 },
      { name: '논리와 사고', semesters: [1], credit: 2 },
      { name: '주제 탐구 독서', semesters: [2], credit: 3 },
      { name: '실용 통계', semesters: [2], credit: 3 },
      { name: '심화 영어 독해와 작문', semesters: [2], credit: 3 },
      { name: '스포츠 과학', semesters: [2], credit: 1 },
      { name: '논술', semesters: [2], credit: 2 }
    ]
  },
  groups: [
    {
      id: '선택군1',
      grade: 2,
      semester: '1학기',
      selectCount: 5,
      credits: 3,
      description: '2학년 1학기 교과(군) 간 대규모 개방 선택 (택5, 과목당 3학점, 총 15학점)',
      subjects: [
        { name: '독서 토론과 글쓰기', semesters: [1] },
        { name: '기하', semesters: [1] },
        { name: '영미 문학 읽기', semesters: [1] },
        { name: '세계시민과 지리', semesters: [1] },
        { name: '사회와 문화', semesters: [1] },
        { name: '정치', semesters: [1] },
        { name: '현대사회와 윤리', semesters: [1] },
        { name: '물리학', semesters: [1] },
        { name: '화학', semesters: [1] },
        { name: '생명과학', semesters: [1] },
        { name: '지구과학', semesters: [1] },
        { name: '일본어', semesters: [1] },
        { name: '중국어', semesters: [1] },
        { name: '정보', semesters: [1] }
      ]
    },
    {
      id: '선택군2',
      grade: 2,
      semester: '2학기',
      selectCount: 5,
      credits: 3,
      description: '2학년 2학기 교과(군) 간 대규모 개방 선택 (택5, 과목당 3학점, 총 15학점)',
      subjects: [
        { name: '문학과 영상', semesters: [2] },
        { name: '미적분Ⅱ', semesters: [2] },
        { name: '미디어 영어', semesters: [2] },
        { name: '기후변화와 지속가능한 세계', semesters: [2] },
        { name: '법과 사회', semesters: [2] },
        { name: '경제', semesters: [2] },
        { name: '윤리와 사상', semesters: [2] },
        { name: '역학과 에너지', semesters: [2] },
        { name: '물질과 에너지', semesters: [2] },
        { name: '세포와 물질대사', semesters: [2] },
        { name: '지구시스템과학', semesters: [2] },
        { name: '일본어 회화', semesters: [2] },
        { name: '중국어 회화', semesters: [2] },
        { name: '인공지능 기초', semesters: [2] }
      ]
    },
    {
      id: '선택군3',
      grade: 3,
      semester: '1학기',
      selectCount: 5,
      credits: 3,
      description: '3학년 1학기 심화 탐구 선택 (택5, 과목당 3학점, 총 15학점)',
      subjects: [
        { name: '언어생활 탐구', semesters: [1] },
        { name: '수학과제 탐구', semesters: [1] },
        { name: '심화 영어', semesters: [1] },
        { name: '한국지리 탐구', semesters: [1] },
        { name: '세계사', semesters: [1] },
        { name: '금융과 경제생활', semesters: [1] },
        { name: '사회문제 탐구', semesters: [1] },
        { name: '인문학과 윤리', semesters: [1] },
        { name: '전자기와 양자', semesters: [1] },
        { name: '화학 반응의 세계', semesters: [1] },
        { name: '생물의 유전', semesters: [1] },
        { name: '행성우주과학', semesters: [1] },
        { name: '융합과학 탐구', semesters: [1] },
        { name: '인간과 심리', semesters: [1] },
        { name: '보건', semesters: [1] }
      ]
    },
    {
      id: '선택군4',
      grade: 3,
      semester: '1학기',
      selectCount: 1,
      credits: 2,
      description: '3학년 1학기 예술 선택 (택1, 2학점)',
      subjects: [
        { name: '음악 연주와 창작', semesters: [1] },
        { name: '미술 창작', semesters: [1] }
      ]
    },
    {
      id: '선택군5',
      grade: 3,
      semester: '2학기',
      selectCount: 4,
      credits: 3,
      description: '3학년 2학기 융합 탐구 선택 (택4, 과목당 3학점, 총 12학점)',
      subjects: [
        { name: '매체 의사소통', semesters: [2] },
        { name: '수학과 문화', semesters: [2] },
        { name: '세계 문화와 영어', semesters: [2] },
        { name: '여행지리', semesters: [2] },
        { name: '역사로 탐구하는 현대 세계', semesters: [2] },
        { name: '국제 관계의 이해', semesters: [2] },
        { name: '윤리문제 탐구', semesters: [2] },
        { name: '과학의 역사와 문화', semesters: [2] },
        { name: '기후변화와 환경생태', semesters: [2] },
        { name: '일본 언어와 문화', semesters: [2] },
        { name: '중국 언어와 문화', semesters: [2] }
      ]
    },
    {
      id: '선택군6',
      grade: 3,
      semester: '2학기',
      selectCount: 1,
      credits: 2,
      description: '3학년 2학기 예술 선택 (택1, 2학점)',
      subjects: [
        { name: '음악 감상과 비평', semesters: [2] },
        { name: '미술 감상과 비평', semesters: [2] }
      ]
    }
  ]
};

// 18. 분당중앙고등학교 (과학중점·특목과정)
export const BUNDANG_JUNGANG_CURRICULUM: SchoolCurriculum = {
  id: 'bundang_jungang',
  name: '분당중앙고등학교',
  shortName: '분당중앙고',
  typeBadge: '특목고',
  district: '분당구',
  location: '경기 성남 분당구 정자동',
  year: '2027학년도 입학생 (2022 개정)',
  description: '2027학년도 분당중앙고 교육과정 편성표 (과학중점·특목과정, AP 과정 및 특목 전공 선택 심화 융합 과정)',
  tags: ['특목고', '과학중점', '분당구', '공식편제', '2022 개정'],
  mandatory: {
    1: [
      { name: '공통국어1', semesters: [1], credit: 4 },
      { name: '공통국어2', semesters: [2], credit: 4 },
      { name: '공통수학1', semesters: [1], credit: 4 },
      { name: '공통수학2', semesters: [2], credit: 4 },
      { name: '공통영어1', semesters: [1], credit: 4 },
      { name: '공통영어2', semesters: [2], credit: 4 },
      { name: '한국사1', semesters: [1], credit: 3 },
      { name: '한국사2', semesters: [2], credit: 3 },
      { name: '통합사회1', semesters: [1], credit: 4 },
      { name: '통합사회2', semesters: [2], credit: 4 },
      { name: '통합과학1', semesters: [1], credit: 4 },
      { name: '통합과학2', semesters: [2], credit: 4 },
      { name: '과학탐구실험1', semesters: [1], credit: 1 },
      { name: '과학탐구실험2', semesters: [2], credit: 1 },
      { name: '체육1', semesters: [1], credit: 2 },
      { name: '체육2', semesters: [2], credit: 2 },
      { name: '음악↔미술', semesters: [1, 2], credit: 2 }
    ],
    2: [
      { name: '문학', semesters: [1], credit: 4 },
      { name: '대수', semesters: [1], credit: 4 },
      { name: '영어Ⅰ', semesters: [1], credit: 4 },
      { name: '운동과 건강', semesters: [1], credit: 2 },
      { name: '독서와 작문', semesters: [2], credit: 4 },
      { name: '미적분Ⅰ', semesters: [2], credit: 4 },
      { name: '영어Ⅱ', semesters: [2], credit: 4 },
      { name: '스포츠 생활1', semesters: [2], credit: 2 }
    ],
    3: [
      { name: '화법과 언어', semesters: [1], credit: 4 },
      { name: '확률과 통계', semesters: [1], credit: 4 },
      { name: '영어 독해와 작문', semesters: [1], credit: 3 },
      { name: '스포츠 문화', semesters: [1], credit: 1 },
      { name: '언어생활 탐구', semesters: [2], credit: 3 },
      { name: '심화 영어', semesters: [2], credit: 3 },
      { name: '스포츠 과학', semesters: [2], credit: 1 }
    ]
  },
  groups: [
    {
      id: '선택군1',
      grade: 2,
      semester: '1학기',
      selectCount: 1,
      credits: 3,
      description: '2학년 1학기 SW/AI/프로그래밍 선택 (택1, 3학점)',
      subjects: [
        { name: '정보', semesters: [1] },
        { name: '인공지능 기초', semesters: [1] },
        { name: '프로그래밍', semesters: [1] }
      ]
    },
    {
      id: '선택군2',
      grade: 2,
      semester: '1학기',
      selectCount: 3,
      credits: 3,
      description: '2학년 1학기 특목/전공 선택 (택3, 과목당 3학점, 총 9학점)',
      subjects: [
        { name: '물리학', semesters: [1] },
        { name: '화학', semesters: [1] },
        { name: '생명과학', semesters: [1] },
        { name: '지구과학', semesters: [1] },
        { name: '전문 수학', semesters: [1] },
        { name: '고급 물리학', semesters: [1] },
        { name: '고급 화학', semesters: [1] }
      ]
    },
    {
      id: '선택군3',
      grade: 2,
      semester: '2학기',
      selectCount: 1,
      credits: 3,
      description: '2학년 2학기 AI/공학/데이터 선택 (택1, 3학점)',
      subjects: [
        { name: '인공지능 심화탐구', semesters: [2] },
        { name: '로봇과 공학세계', semesters: [2] },
        { name: '데이터 과학', semesters: [2] }
      ]
    },
    {
      id: '선택군4',
      grade: 2,
      semester: '2학기',
      selectCount: 3,
      credits: 3,
      description: '2학년 2학기 특목/전공 선택 (택3, 과목당 3학점, 총 9학점)',
      subjects: [
        { name: '역학과 에너지', semesters: [2] },
        { name: '물질과 에너지', semesters: [2] },
        { name: '세포와 물질대사', semesters: [2] },
        { name: '지구시스템과학', semesters: [2] },
        { name: '고급 생명과학', semesters: [2] },
        { name: '고급 지구과학', semesters: [2] },
        { name: '지구과학 실험', semesters: [2] }
      ]
    },
    {
      id: '선택군5',
      grade: 3,
      semester: '1학기',
      selectCount: 1,
      credits: 2,
      description: '3학년 1학기 예술 선택 (택1, 2학점)',
      subjects: [
        { name: '음악 연주와 창작', semesters: [1] },
        { name: '미술 창작', semesters: [1] }
      ]
    },
    {
      id: '선택군6',
      grade: 3,
      semester: '1학기',
      selectCount: 1,
      credits: 3,
      description: '3학년 1학기 인문/수학 선택 (택1, 3학점)',
      subjects: [
        { name: '주제 탐구 독서', semesters: [1] },
        { name: '기하', semesters: [1] },
        { name: '영미 문학 읽기', semesters: [1] }
      ]
    },
    {
      id: '선택군7',
      grade: 3,
      semester: '1학기',
      selectCount: 3,
      credits: 3,
      description: '3학년 1학기 특목/전공 심화 선택 (택3, 과목당 3학점, 총 9학점)',
      subjects: [
        { name: 'AP 미적분학Ⅰ', semesters: [1] },
        { name: '고급 대수', semesters: [1] },
        { name: 'Conceptual 물리학', semesters: [1] },
        { name: '유전체 기반 생명공학', semesters: [1] },
        { name: '지구환경 데이터 분석', semesters: [1] },
        { name: '전산 물리학', semesters: [1] },
        { name: 'AP 프로그래밍', semesters: [1] },
        { name: '과학과제 연구', semesters: [1] }
      ]
    },
    {
      id: '선택군8',
      grade: 3,
      semester: '2학기',
      selectCount: 1,
      credits: 3,
      description: '3학년 2학기 인문/융합 선택 (택1, 3학점)',
      subjects: [
        { name: '문학과 영상', semesters: [2] },
        { name: '수학과 문화', semesters: [2] },
        { name: '세계 문화와 영어', semesters: [2] },
        { name: '기후변화와 지속가능한 세계', semesters: [2] }
      ]
    },
    {
      id: '선택군9',
      grade: 3,
      semester: '2학기',
      selectCount: 3,
      credits: 3,
      description: '3학년 2학기 특목/전공 심화 선택 (택3, 과목당 3학점, 총 9학점)',
      subjects: [
        { name: 'AP 화학', semesters: [2] },
        { name: 'AP 생물', semesters: [2] },
        { name: 'AP 환경과학', semesters: [2] },
        { name: '지구환경과학 세미나', semesters: [2] },
        { name: '생명과학 융합 연구', semesters: [2] },
        { name: '융합과학 기법 탐구', semesters: [2] },
        { name: '인공지능 프로젝트', semesters: [2] },
        { name: '과학과제 연구', semesters: [2] }
      ]
    }
  ]
};

// 19. 불곡고등학교 (일반고)
export const BULGOK_HIGH_CURRICULUM: SchoolCurriculum = {
  id: 'bulgok',
  name: '불곡고등학교',
  shortName: '불곡고',
  typeBadge: '일반고',
  district: '분당구',
  location: '경기 성남 분당구 구미동',
  year: '2027학년도 입학생 (2022 개정)',
  description: '2027학년도 불곡고 공식 교육과정 편성표 (2학년 예술·교과간 선택 및 3학년 각 학기당 6과목 18학점 대규모 진로·융합 선택 개방 체계)',
  tags: ['일반고', '분당구', '공식편제', '2022 개정'],
  mandatory: {
    1: [
      { name: '공통국어1', semesters: [1], credit: 4 },
      { name: '공통국어2', semesters: [2], credit: 4 },
      { name: '공통수학1', semesters: [1], credit: 4 },
      { name: '공통수학2', semesters: [2], credit: 4 },
      { name: '공통영어1', semesters: [1], credit: 4 },
      { name: '공통영어2', semesters: [2], credit: 4 },
      { name: '한국사1', semesters: [1], credit: 3 },
      { name: '한국사2', semesters: [2], credit: 3 },
      { name: '통합사회1', semesters: [1], credit: 4 },
      { name: '통합사회2', semesters: [2], credit: 4 },
      { name: '통합과학1', semesters: [1], credit: 4 },
      { name: '통합과학2', semesters: [2], credit: 4 },
      { name: '과학탐구실험1', semesters: [1], credit: 1 },
      { name: '과학탐구실험2', semesters: [2], credit: 1 },
      { name: '체육1', semesters: [1], credit: 2 },
      { name: '체육2', semesters: [2], credit: 2 },
      { name: '음악↔미술', semesters: [1, 2], credit: 2 },
      { name: '정보↔기술·가정', semesters: [1, 2], credit: 3 }
    ],
    2: [
      { name: '문학', semesters: [1], credit: 4 },
      { name: '대수', semesters: [1], credit: 4 },
      { name: '영어Ⅰ', semesters: [1], credit: 4 },
      { name: '스포츠 생활1', semesters: [1], credit: 2 },
      { name: '독서와 작문', semesters: [2], credit: 4 },
      { name: '미적분Ⅰ', semesters: [2], credit: 4 },
      { name: '영어Ⅱ', semesters: [2], credit: 4 },
      { name: '스포츠 생활2', semesters: [2], credit: 2 }
    ],
    3: [
      { name: '화법과 언어', semesters: [1], credit: 4 },
      { name: '확률과 통계', semesters: [1], credit: 4 },
      { name: '영어 독해와 작문', semesters: [1], credit: 4 },
      { name: '스포츠 문화', semesters: [1], credit: 1 },
      { name: '독서 토론과 글쓰기', semesters: [2], credit: 3 },
      { name: '수학과 문화', semesters: [2], credit: 3 },
      { name: '심화 영어 독해와 작문', semesters: [2], credit: 3 },
      { name: '스포츠 과학', semesters: [2], credit: 1 }
    ]
  },
  groups: [
    {
      id: '선택군1',
      grade: 2,
      semester: '1학기',
      selectCount: 1,
      credits: 3,
      description: '2학년 1학기 예술 선택 (택1, 3학점)',
      subjects: [
        { name: '음악 감상과 비평', semesters: [1] },
        { name: '미술 감상과 비평', semesters: [1] }
      ]
    },
    {
      id: '선택군2',
      grade: 2,
      semester: '1학기',
      selectCount: 4,
      credits: 3,
      description: '2학년 1학기 교과(군) 간 선택 (택4, 과목당 3학점, 총 12학점)',
      subjects: [
        { name: '인공지능 수학', semesters: [1] },
        { name: '경제', semesters: [1] },
        { name: '세계시민과 지리', semesters: [1] },
        { name: '현대사회와 윤리', semesters: [1] },
        { name: '세계사', semesters: [1] },
        { name: '물리학', semesters: [1] },
        { name: '화학', semesters: [1] },
        { name: '지구과학', semesters: [1] },
        { name: '생명과학', semesters: [1] },
        { name: '일본어', semesters: [1] },
        { name: '중국어', semesters: [1] },
        { name: '소프트웨어와 생활', semesters: [1] }
      ]
    },
    {
      id: '선택군3',
      grade: 2,
      semester: '2학기',
      selectCount: 1,
      credits: 3,
      description: '2학년 2학기 예술 선택 (택1, 3학점)',
      subjects: [
        { name: '음악과 미디어', semesters: [2] },
        { name: '미술 창작', semesters: [2] }
      ]
    },
    {
      id: '선택군4',
      grade: 2,
      semester: '2학기',
      selectCount: 4,
      credits: 3,
      description: '2학년 2학기 교과(군) 간 선택 (택4, 과목당 3학점, 총 12학점)',
      subjects: [
        { name: '기하', semesters: [2] },
        { name: '사회와 문화', semesters: [2] },
        { name: '한국지리 탐구', semesters: [2] },
        { name: '윤리와 사상', semesters: [2] },
        { name: '동아시아 역사 기행', semesters: [2] },
        { name: '역학과 에너지', semesters: [2] },
        { name: '물질과 에너지', semesters: [2] },
        { name: '지구시스템과학', semesters: [2] },
        { name: '세포와 물질대사', semesters: [2] },
        { name: '일본어 회화', semesters: [2] },
        { name: '중국어 회화', semesters: [2] },
        { name: '인공지능 기초', semesters: [2] }
      ]
    },
    {
      id: '선택군5',
      grade: 3,
      semester: '1학기',
      selectCount: 6,
      credits: 3,
      description: '3학년 1학기 교과(군) 간 선택 (택6, 과목당 3학점, 총 18학점)',
      subjects: [
        { name: '주제 탐구 독서', semesters: [1] },
        { name: '미적분Ⅱ', semesters: [1] },
        { name: '경제 수학', semesters: [1] },
        { name: '영미 문학 읽기', semesters: [1] },
        { name: '심화 영어', semesters: [1] },
        { name: '정치', semesters: [1] },
        { name: '도시의 미래 탐구', semesters: [1] },
        { name: '인문학과 윤리', semesters: [1] },
        { name: '법과 사회', semesters: [1] },
        { name: '역사 과제연구', semesters: [1] },
        { name: '전자기와 양자', semesters: [1] },
        { name: '화학 반응의 세계', semesters: [1] },
        { name: '생물의 유전', semesters: [1] },
        { name: '행성우주과학', semesters: [1] },
        { name: '과학과제 연구', semesters: [1] },
        { name: '창의 공학 설계', semesters: [1] },
        { name: '데이터 과학', semesters: [1] },
        { name: '심화 일본어', semesters: [1] },
        { name: '중국 문화', semesters: [1] },
        { name: '인공지능 윤리', semesters: [1] }
      ]
    },
    {
      id: '선택군6',
      grade: 3,
      semester: '2학기',
      selectCount: 6,
      credits: 3,
      description: '3학년 2학기 교과(군) 간 선택 (택6, 과목당 3학점, 총 18학점)',
      subjects: [
        { name: '문학과 영상', semesters: [2] },
        { name: '수학과제 탐구', semesters: [2] },
        { name: '미디어 영어', semesters: [2] },
        { name: '세계 문화와 영어', semesters: [2] },
        { name: '사회문제 탐구', semesters: [2] },
        { name: '역사로 탐구하는 현대 세계', semesters: [2] },
        { name: '여행지리', semesters: [2] },
        { name: '윤리문제 탐구', semesters: [2] },
        { name: '금융과 경제생활', semesters: [2] },
        { name: '기후변화와 지속가능한 세계', semesters: [2] },
        { name: '기후변화와 환경생태', semesters: [2] },
        { name: '과학의 역사와 문화', semesters: [2] },
        { name: '융합과학 탐구', semesters: [2] },
        { name: '로봇과 공학세계', semesters: [2] },
        { name: '정보과학', semesters: [2] },
        { name: '일본 문화', semesters: [2] },
        { name: '심화 중국어', semesters: [2] },
        { name: '인간과 심리', semesters: [2] }
      ]
    }
  ]
};

// 20. 운중고등학교 (일반고)
export const UNJUNG_HIGH_CURRICULUM: SchoolCurriculum = {
  id: 'unjung',
  name: '운중고등학교',
  shortName: '운중고',
  typeBadge: '일반고',
  district: '분당구',
  location: '경기 성남 분당구 산운로',
  year: '2027학년도 입학생 (2022 개정)',
  description: '2027학년도 운중고 공식 교육과정 편성표 (국·수·영 집중, 2학년 탐구·예술·제2외국어·교과간 4개 선택군 & 3학년 탐구·교양·교과간 3개 선택군 맞춤 운영)',
  tags: ['일반고', '분당구', '판교', '공식편제', '2022 개정'],
  mandatory: {
    1: [
      { name: '공통국어1', semesters: [1], credit: 4 },
      { name: '공통국어2', semesters: [2], credit: 4 },
      { name: '공통수학1', semesters: [1], credit: 4 },
      { name: '공통수학2', semesters: [2], credit: 4 },
      { name: '공통영어1', semesters: [1], credit: 4 },
      { name: '공통영어2', semesters: [2], credit: 4 },
      { name: '한국사1', semesters: [1], credit: 3 },
      { name: '한국사2', semesters: [2], credit: 3 },
      { name: '통합사회1', semesters: [1], credit: 4 },
      { name: '통합사회2', semesters: [2], credit: 4 },
      { name: '통합과학1', semesters: [1], credit: 4 },
      { name: '통합과학2', semesters: [2], credit: 4 },
      { name: '과학탐구실험1', semesters: [1], credit: 1 },
      { name: '과학탐구실험2', semesters: [2], credit: 1 },
      { name: '체육1', semesters: [1], credit: 2 },
      { name: '체육2', semesters: [2], credit: 2 },
      { name: '음악↔미술', semesters: [1, 2], credit: 3 }
    ],
    2: [
      { name: '문학', semesters: [1], credit: 4 },
      { name: '대수', semesters: [1], credit: 4 },
      { name: '영어Ⅰ', semesters: [1], credit: 3 },
      { name: '스포츠 과학', semesters: [1], credit: 1 },
      { name: '독서와 작문', semesters: [2], credit: 4 },
      { name: '미적분Ⅰ', semesters: [2], credit: 4 },
      { name: '영어Ⅱ', semesters: [2], credit: 3 },
      { name: '스포츠 문화', semesters: [2], credit: 1 }
    ],
    3: [
      { name: '화법과 언어', semesters: [1], credit: 4 },
      { name: '확률과 통계', semesters: [1], credit: 3 },
      { name: '영어 독해와 작문', semesters: [1], credit: 3 },
      { name: '스포츠 생활1', semesters: [1], credit: 2 },
      { name: '주제 탐구 독서', semesters: [2], credit: 3 },
      { name: '전문 수학', semesters: [2], credit: 3 },
      { name: '심화 영어', semesters: [2], credit: 3 },
      { name: '스포츠 생활2', semesters: [2], credit: 2 }
    ]
  },
  groups: [
    {
      id: '선택군1',
      grade: 2,
      semester: '1학기',
      selectCount: 3,
      credits: 3,
      description: '2학년 1학기 탐구 선택 (택3, 9학점)',
      subjects: [
        { name: '세계시민과 지리', semesters: [1] },
        { name: '동아시아 역사 기행', semesters: [1] },
        { name: '사회와 문화', semesters: [1] },
        { name: '윤리와 사상', semesters: [1] },
        { name: '물리학', semesters: [1] },
        { name: '화학', semesters: [1] },
        { name: '지구과학', semesters: [1] },
        { name: '생명과학', semesters: [1] }
      ]
    },
    {
      id: '선택군2',
      grade: 2,
      semester: '1학기',
      selectCount: 1,
      credits: 2,
      description: '2학년 1학기 예술 선택 (택1, 2학점)',
      subjects: [
        { name: '음악 연주와 창작', semesters: [1] },
        { name: '미술 창작', semesters: [1] }
      ]
    },
    {
      id: '선택군3',
      grade: 2,
      semester: '1학기',
      selectCount: 1,
      credits: 3,
      description: '2학년 1학기 제2외국어/기술·가정 (택1, 3학점)',
      subjects: [
        { name: '일본어', semesters: [1] },
        { name: '중국어', semesters: [1] },
        { name: '기술·가정', semesters: [1] }
      ]
    },
    {
      id: '선택군4',
      grade: 2,
      semester: '1학기',
      selectCount: 1,
      credits: 3,
      description: '2학년 1학기 교과 영역 간 선택 (택1, 3학점)',
      subjects: [
        { name: '문학과 영상', semesters: [1] },
        { name: '기하', semesters: [1] },
        { name: '영어 발표와 토론', semesters: [1] },
        { name: '기후변화와 지속가능한 세계', semesters: [1] },
        { name: '정보', semesters: [1] }
      ]
    },
    {
      id: '선택군5',
      grade: 2,
      semester: '2학기',
      selectCount: 3,
      credits: 3,
      description: '2학년 2학기 탐구 선택 (택3, 9학점)',
      subjects: [
        { name: '도시의 미래 탐구', semesters: [2] },
        { name: '세계사', semesters: [2] },
        { name: '경제', semesters: [2] },
        { name: '현대사회와 윤리', semesters: [2] },
        { name: '화학 반응의 세계', semesters: [2] },
        { name: '역학과 에너지', semesters: [2] },
        { name: '지구시스템과학', semesters: [2] },
        { name: '세포와 물질대사', semesters: [2] }
      ]
    },
    {
      id: '선택군6',
      grade: 2,
      semester: '2학기',
      selectCount: 1,
      credits: 2,
      description: '2학년 2학기 예술 선택 (택1, 2학점)',
      subjects: [
        { name: '음악 감상과 비평', semesters: [2] },
        { name: '미술 감상과 비평', semesters: [2] }
      ]
    },
    {
      id: '선택군7',
      grade: 2,
      semester: '2학기',
      selectCount: 1,
      credits: 3,
      description: '2학년 2학기 제2외국어/기술·가정 (택1, 3학점)',
      subjects: [
        { name: '일본어 회화', semesters: [2] },
        { name: '중국어 회화', semesters: [2] },
        { name: '로봇과 공학세계', semesters: [2] }
      ]
    },
    {
      id: '선택군8',
      grade: 2,
      semester: '2학기',
      selectCount: 1,
      credits: 3,
      description: '2학년 2학기 교과 영역 간 선택 (택1, 3학점)',
      subjects: [
        { name: '독서 토론과 글쓰기', semesters: [2] },
        { name: '인공지능 수학', semesters: [2] },
        { name: '미디어 영어', semesters: [2] },
        { name: '사회문제 탐구', semesters: [2] },
        { name: '인공지능 기초', semesters: [2] }
      ]
    },
    {
      id: '선택군9',
      grade: 3,
      semester: '1학기',
      selectCount: 2,
      credits: 3,
      description: '3학년 1학기 탐구 선택 (택2, 6학점)',
      subjects: [
        { name: '한국지리 탐구', semesters: [1] },
        { name: '법과 사회', semesters: [1] },
        { name: '윤리문제 탐구', semesters: [1] },
        { name: '물질과 에너지', semesters: [1] },
        { name: '전자기와 양자', semesters: [1] },
        { name: '생명과학 실험', semesters: [1] }
      ]
    },
    {
      id: '선택군10',
      grade: 3,
      semester: '1학기',
      selectCount: 2,
      credits: 3,
      description: '3학년 1학기 교양/제2외국어/정보 (택2, 6학점)',
      subjects: [
        { name: '인간과 심리', semesters: [1] },
        { name: '생태와 환경', semesters: [1] },
        { name: '심화 일본어', semesters: [1] },
        { name: '심화 중국어', semesters: [1] },
        { name: '소프트웨어와 생활', semesters: [1] },
        { name: '창의 공학 설계', semesters: [1] }
      ]
    },
    {
      id: '선택군11',
      grade: 3,
      semester: '1학기',
      selectCount: 2,
      credits: 3,
      description: '3학년 1학기 교과 영역 간 선택 (택2, 6학점)',
      subjects: [
        { name: '언어생활 탐구', semesters: [1] },
        { name: '수학과제 탐구', semesters: [1] },
        { name: '미적분Ⅱ', semesters: [1] },
        { name: '생물의 유전', semesters: [1] },
        { name: '행성우주과학', semesters: [1] },
        { name: '화학 실험', semesters: [1] },
        { name: '영미 문학 읽기', semesters: [1] }
      ]
    },
    {
      id: '선택군12',
      grade: 3,
      semester: '2학기',
      selectCount: 2,
      credits: 3,
      description: '3학년 2학기 탐구 선택 (택2, 6학점)',
      subjects: [
        { name: '여행지리', semesters: [2] },
        { name: '금융과 경제생활', semesters: [2] },
        { name: '인문학과 윤리', semesters: [2] },
        { name: '기후변화와 환경생태', semesters: [2] },
        { name: '융합과학 탐구', semesters: [2] }
      ]
    },
    {
      id: '선택군13',
      grade: 3,
      semester: '2학기',
      selectCount: 2,
      credits: 3,
      description: '3학년 2학기 교양/제2외국어/정보 (택2, 6학점)',
      subjects: [
        { name: '논술', semesters: [2] },
        { name: '교육의 이해', semesters: [2] },
        { name: '일본 문화', semesters: [2] },
        { name: '중국 문화', semesters: [2] },
        { name: '데이터 과학', semesters: [2] },
        { name: '지식 재산 일반', semesters: [2] }
      ]
    },
    {
      id: '선택군14',
      grade: 3,
      semester: '2학기',
      selectCount: 2,
      credits: 3,
      description: '3학년 2학기 교과 영역 간 선택 (택2, 6학점)',
      subjects: [
        { name: '매체 의사소통', semesters: [2] },
        { name: '경제 수학', semesters: [2] },
        { name: '과학의 역사와 문화', semesters: [2] },
        { name: '심화 영어 독해와 작문', semesters: [2] }
      ]
    }
  ]
};

// 20-2. 이우고등학교 (대안·특성화)
export const EEWOO_HIGH_CURRICULUM: SchoolCurriculum = {
  id: 'eewoo',
  name: '이우고등학교',
  shortName: '이우고',
  typeBadge: '대안·특성화',
  district: '분당구',
  location: '경기 성남 분당구 동원동',
  year: '2027학년도 입학생 (2022 개정)',
  description: '2027학년도 이우고 편성표 (프로젝트 기반 자율 탐구, 생태·사회적경제·철학 융합 및 학생 맞춤형 선택)',
  tags: ['대안고', '특성화', '분당', '혁신학교', '2022 개정'],
  mandatory: {
    1: [
      { name: '공통국어1', semesters: [1], credit: 4 },
      { name: '공통국어2', semesters: [2], credit: 4 },
      { name: '공통수학1', semesters: [1], credit: 4 },
      { name: '공통수학2', semesters: [2], credit: 4 },
      { name: '공통영어1', semesters: [1], credit: 4 },
      { name: '공통영어2', semesters: [2], credit: 4 },
      { name: '한국사1', semesters: [1], credit: 3 },
      { name: '한국사2', semesters: [2], credit: 3 },
      { name: '통합사회1', semesters: [1], credit: 4 },
      { name: '통합사회2', semesters: [2], credit: 4 },
      { name: '통합과학1', semesters: [1], credit: 4 },
      { name: '통합과학2', semesters: [2], credit: 4 },
      { name: '과학탐구실험1', semesters: [1], credit: 1 },
      { name: '과학탐구실험2', semesters: [2], credit: 1 },
      { name: '체육1', semesters: [1], credit: 2 },
      { name: '체육2', semesters: [2], credit: 2 },
      { name: '미술↔음악', semesters: [1, 2], credit: 3 },
      { name: '기술·가정↔정보', semesters: [1, 2], credit: 3 }
    ],
    2: [
      { name: '문학', semesters: [1], credit: 4 },
      { name: '대수', semesters: [1], credit: 4 },
      { name: '스포츠 생활1', semesters: [1], credit: 2 },
      { name: '독서와 작문', semesters: [2], credit: 4 },
      { name: '미적분Ⅰ', semesters: [2], credit: 4 },
      { name: '스포츠 생활2', semesters: [2], credit: 2 }
    ],
    3: [
      { name: '화법과 언어', semesters: [1], credit: 4 },
      { name: '확률과 통계', semesters: [1], credit: 4 },
      { name: '스포츠 문화', semesters: [1], credit: 1 },
      { name: '주제 탐구 독서', semesters: [2], credit: 4 },
      { name: '수학과 문화', semesters: [2], credit: 4 },
      { name: '스포츠 과학', semesters: [2], credit: 1 }
    ]
  },
  groups: [
    {
      id: '선택군1',
      grade: 2,
      semester: '1학기',
      selectCount: 4,
      credits: 3,
      description: '2학년 1학기 교과간 융합 선택 (택4, 12학점)',
      subjects: [
        { name: '사회적 경제', semesters: [1] },
        { name: '융합과학 탐구', semesters: [1] },
        { name: '생태와 환경', semesters: [1] },
        { name: '물리학', semesters: [1] },
        { name: '화학', semesters: [1] },
        { name: '생명과학', semesters: [1] },
        { name: '지구과학', semesters: [1] },
        { name: '세계지리', semesters: [1] },
        { name: '세계사', semesters: [1] },
        { name: '정치와 법', semesters: [1] },
        { name: '기하', semesters: [1] },
        { name: '프로그래밍', semesters: [1] }
      ]
    },
    {
      id: '선택군2',
      grade: 2,
      semester: '1학기',
      selectCount: 1,
      credits: 2,
      description: '2학년 1학기 제2외국어/생활교양 (택1, 2학점)',
      subjects: [
        { name: '일본어', semesters: [1] },
        { name: '중국어', semesters: [1] },
        { name: '철학', semesters: [1] },
        { name: '생태농업', semesters: [1] }
      ]
    },
    {
      id: '선택군3',
      grade: 2,
      semester: '2학기',
      selectCount: 4,
      credits: 3,
      description: '2학년 2학기 교과간 심화 선택 (택4, 12학점)',
      subjects: [
        { name: '사회문제 탐구', semesters: [2] },
        { name: '생활과 윤리', semesters: [2] },
        { name: '비교 문화', semesters: [2] },
        { name: '고전과 윤리', semesters: [2] },
        { name: '역학적 시스템', semesters: [2] },
        { name: '물질과 에너지', semesters: [2] },
        { name: '생명 시스템', semesters: [2] },
        { name: '지구시스템과학', semesters: [2] },
        { name: '인공지능 수학', semesters: [2] },
        { name: '수학과제 탐구', semesters: [2] },
        { name: '영어 회화', semesters: [2] },
        { name: '공동체와 삶', semesters: [2] }
      ]
    },
    {
      id: '선택군4',
      grade: 2,
      semester: '2학기',
      selectCount: 1,
      credits: 2,
      description: '2학년 2학기 예술·교양 (택1, 2학점)',
      subjects: [
        { name: '음악 감상과 비평', semesters: [2] },
        { name: '미술 감상과 비평', semesters: [2] },
        { name: '연극', semesters: [2] },
        { name: '영상 제작의 이해', semesters: [2] }
      ]
    },
    {
      id: '선택군5',
      grade: 3,
      semester: '1학기',
      selectCount: 4,
      credits: 3,
      description: '3학년 1학기 전공 진로 심화 (택4, 12학점)',
      subjects: [
        { name: '미적분Ⅱ', semesters: [1] },
        { name: '기하', semesters: [1] },
        { name: '고급 물리학', semesters: [1] },
        { name: '고급 화학', semesters: [1] },
        { name: '고급 생명과학', semesters: [1] },
        { name: '고급 지구과학', semesters: [1] },
        { name: '현대사회와 철학', semesters: [1] },
        { name: '국제 관계와 국제기구', semesters: [1] },
        { name: '경제', semesters: [1] },
        { name: '사회·문화 나눔과 실천', semesters: [1] },
        { name: '문학과 영상', semesters: [1] },
        { name: '미디어 영어', semesters: [1] }
      ]
    },
    {
      id: '선택군6',
      grade: 3,
      semester: '2학기',
      selectCount: 4,
      credits: 3,
      description: '3학년 2학기 졸업 프로젝트 및 융합 탐구 (택4, 12학점)',
      subjects: [
        { name: '심화 국어', semesters: [2] },
        { name: '수학 과제 탐구', semesters: [2] },
        { name: '과학과제 연구', semesters: [2] },
        { name: '사회과제 연구', semesters: [2] },
        { name: '생태 문명과 지속가능성', semesters: [2] },
        { name: '세계 시민 교육', semesters: [2] },
        { name: '창의공학설계', semesters: [2] },
        { name: '인공지능과 미래사회', semesters: [2] },
        { name: '고급 영어 독해와 작문', semesters: [2] },
        { name: '인문학적 상상력과 창작', semesters: [2] }
      ]
    }
  ]
};

// 21. 판교고등학교 (자율형공립고)
export const PANGYO_HIGH_CURRICULUM: SchoolCurriculum = {
  id: 'pangyo',
  name: '판교고등학교',
  shortName: '판교고',
  typeBadge: '자율형공립고',
  district: '분당구',
  location: '경기 성남 분당구 (판교)',
  year: '2027학년도 입학생 (2022 개정)',
  description: '2027학년도 판교고 공식 교육과정 편성표 (국·수·영 충실한 필수 이수, SW·AI 및 이공·인문 융합 4학점 심화 블록 체계)',
  tags: ['자율공립고', '판교', '공식편제', '2022 개정'],
  mandatory: {
    1: [
      { name: '공통국어1', semesters: [1], credit: 4 },
      { name: '공통국어2', semesters: [2], credit: 4 },
      { name: '공통수학1', semesters: [1], credit: 4 },
      { name: '공통수학2', semesters: [2], credit: 4 },
      { name: '공통영어1', semesters: [1], credit: 4 },
      { name: '공통영어2', semesters: [2], credit: 4 },
      { name: '한국사1', semesters: [1], credit: 3 },
      { name: '한국사2', semesters: [2], credit: 3 },
      { name: '통합사회1', semesters: [1], credit: 4 },
      { name: '통합사회2', semesters: [2], credit: 4 },
      { name: '통합과학1', semesters: [1], credit: 4 },
      { name: '통합과학2', semesters: [2], credit: 4 },
      { name: '과학탐구실험1', semesters: [1], credit: 1 },
      { name: '과학탐구실험2', semesters: [2], credit: 1 },
      { name: '체육1', semesters: [1], credit: 2 },
      { name: '체육2', semesters: [2], credit: 2 },
      { name: '음악↔미술', semesters: [1, 2], credit: 3 },
      { name: '기술·가정↔정보', semesters: [1, 2], credit: 3 }
    ],
    2: [
      { name: '문학', semesters: [1], credit: 4 },
      { name: '대수', semesters: [1], credit: 4 },
      { name: '영어Ⅰ', semesters: [1], credit: 4 },
      { name: '스포츠 생활1', semesters: [1], credit: 2 },
      { name: '독서와 작문', semesters: [2], credit: 4 },
      { name: '미적분Ⅰ', semesters: [2], credit: 4 },
      { name: '영어Ⅱ', semesters: [2], credit: 4 },
      { name: '스포츠 생활2', semesters: [2], credit: 2 }
    ],
    3: [
      { name: '화법과 언어', semesters: [1], credit: 4 },
      { name: '확률과 통계', semesters: [1], credit: 4 },
      { name: '영어 독해와 작문', semesters: [1], credit: 4 },
      { name: '스포츠 문화', semesters: [1], credit: 1 },
      { name: '주제 탐구 독서', semesters: [2], credit: 4 },
      { name: '수학과제 탐구', semesters: [2], credit: 4 },
      { name: '심화 영어 독해와 작문', semesters: [2], credit: 4 },
      { name: '스포츠 과학', semesters: [2], credit: 1 }
    ]
  },
  groups: [
    {
      id: '선택군1',
      grade: 2,
      semester: '1학기',
      selectCount: 1,
      credits: 2,
      description: '2학년 1학기 공학/창의탐구 (택1, 2학점)',
      subjects: [
        { name: '로봇과 공학세계', semesters: [1] },
        { name: '비판적 질문과 창의적 해결', semesters: [1] }
      ]
    },
    {
      id: '선택군2',
      grade: 2,
      semester: '1학기',
      selectCount: 5,
      credits: 3,
      description: '2학년 1학기 교과(군) 간 선택 (택5, 15학점)',
      subjects: [
        { name: '인공지능 수학', semesters: [1] },
        { name: '물리학', semesters: [1] },
        { name: '화학', semesters: [1] },
        { name: '생명과학', semesters: [1] },
        { name: '지구과학', semesters: [1] },
        { name: '세계시민과 지리', semesters: [1] },
        { name: '세계사', semesters: [1] },
        { name: '사회와 문화', semesters: [1] },
        { name: '현대사회와 윤리', semesters: [1] },
        { name: '중국어', semesters: [1] },
        { name: '일본어', semesters: [1] },
        { name: '인공지능 기초', semesters: [1] }
      ]
    },
    {
      id: '선택군3',
      grade: 2,
      semester: '2학기',
      selectCount: 1,
      credits: 2,
      description: '2학년 2학기 공학/인문창작 (택1, 2학점)',
      subjects: [
        { name: '공학 일반', semesters: [2] },
        { name: '인문학적 상상력과 창작', semesters: [2] }
      ]
    },
    {
      id: '선택군4',
      grade: 2,
      semester: '2학기',
      selectCount: 5,
      credits: 3,
      description: '2학년 2학기 교과(군) 간 선택 (택5, 15학점)',
      subjects: [
        { name: '기하', semesters: [2] },
        { name: '역학과 에너지', semesters: [2] },
        { name: '물질과 에너지', semesters: [2] },
        { name: '세포와 물질대사', semesters: [2] },
        { name: '지구와 우주과학', semesters: [2] },
        { name: '한국지리 탐구', semesters: [2] },
        { name: '동아시아 역사 기행', semesters: [2] },
        { name: '법과 사회', semesters: [2] },
        { name: '윤리와 사상', semesters: [2] },
        { name: '중국어 회화', semesters: [2] },
        { name: '일본어 회화', semesters: [2] },
        { name: '프로그래밍', semesters: [2] }
      ]
    },
    {
      id: '선택군5',
      grade: 3,
      semester: '1학기',
      selectCount: 1,
      credits: 1,
      description: '3학년 1학기 자율/탐구/예체능 (택1, 1학점)',
      subjects: [
        { name: '융합과학 탐구', semesters: [1] },
        { name: '사회문제 탐구', semesters: [1] },
        { name: '음악과 미디어', semesters: [1] },
        { name: '미술과 매체', semesters: [1] },
        { name: '운동과 여가', semesters: [1] }
      ]
    },
    {
      id: '선택군6',
      grade: 3,
      semester: '1학기',
      selectCount: 3,
      credits: 4,
      description: '3학년 1학기 교과(군) 간 심화 선택 (택3, 12학점)',
      subjects: [
        { name: '독서 토론과 글쓰기', semesters: [1] },
        { name: '미적분Ⅱ', semesters: [1] },
        { name: '전자기와 양자', semesters: [1] },
        { name: '화학 반응의 세계', semesters: [1] },
        { name: '생물의 유전', semesters: [1] },
        { name: '지구시스템과학', semesters: [1] },
        { name: '생명과학 실험', semesters: [1] },
        { name: '도시의 미래와 탐구', semesters: [1] },
        { name: '정치와 법', semesters: [1] },
        { name: '경제', semesters: [1] },
        { name: '인문학과 예술 지리', semesters: [1] },
        { name: '중국 문화', semesters: [1] },
        { name: '일본 문화', semesters: [1] },
        { name: '창의 공학 설계', semesters: [1] }
      ]
    },
    {
      id: '선택군7',
      grade: 3,
      semester: '2학기',
      selectCount: 1,
      credits: 1,
      description: '3학년 2학기 자율/탐구/예체능 (택1, 1학점)',
      subjects: [
        { name: '과학탐구와 실험 심화', semesters: [2] },
        { name: '인공지능 윤리', semesters: [2] },
        { name: '음악 감상과 비평', semesters: [2] },
        { name: '미술 창작', semesters: [2] },
        { name: '스포츠와 진로', semesters: [2] }
      ]
    },
    {
      id: '선택군8',
      grade: 3,
      semester: '2학기',
      selectCount: 4,
      credits: 4,
      description: '3학년 2학기 교과(군) 간 심화 선택 (택4, 16학점)',
      subjects: [
        { name: '기후변화와 환경생태', semesters: [2] },
        { name: '과학창의연구', semesters: [2] },
        { name: '여행지리', semesters: [2] },
        { name: '금융과 경제생활', semesters: [2] },
        { name: '윤리문제 탐구', semesters: [2] },
        { name: '기후변화와 지속가능한 세계', semesters: [2] },
        { name: '심화 중국어', semesters: [2] },
        { name: '심화 일본어', semesters: [2] },
        { name: '지식 재산 일반', semesters: [2] },
        { name: '소프트웨어와 생활', semesters: [2] },
        { name: '음악 연주와 창작', semesters: [2] },
        { name: '미술 감상과 비평', semesters: [2] },
        { name: '운동과 건강', semesters: [2] },
        { name: '인간과 심리', semesters: [2] }
      ]
    }
  ]
};

// 22. 분당대진고등학교 (일반고)
export const BUNDANG_DAEJIN_CURRICULUM: SchoolCurriculum = {
  id: 'bundang_daejin',
  name: '분당대진고등학교',
  shortName: '분당대진고',
  typeBadge: '일반고',
  district: '분당구',
  location: '경기 성남 분당구',
  year: '2027학년도 입학생 (2022 개정)',
  description: '2027학년도 분당대진고 교육과정 편성표 (국·수·영 심화 및 2·3학년 교과(군) 간 택4, 학기제 교차이수 체계)',
  tags: ['일반고', '분당구', '분당대진고', '대진고', '사립', '2022 개정', '공식편제'],
  mandatory: {
    1: [
      { name: '공통국어1', semesters: [1], credit: 4 },
      { name: '공통국어2', semesters: [2], credit: 4 },
      { name: '공통수학1', semesters: [1], credit: 4 },
      { name: '공통수학2', semesters: [2], credit: 4 },
      { name: '공통영어1', semesters: [1], credit: 4 },
      { name: '공통영어2', semesters: [2], credit: 4 },
      { name: '한국사1', semesters: [1], credit: 3 },
      { name: '한국사2', semesters: [2], credit: 3 },
      { name: '통합사회1', semesters: [1], credit: 4 },
      { name: '통합사회2', semesters: [2], credit: 4 },
      { name: '통합과학1', semesters: [1], credit: 4 },
      { name: '통합과학2', semesters: [2], credit: 4 },
      { name: '과학탐구실험1', semesters: [1], credit: 1 },
      { name: '과학탐구실험2', semesters: [2], credit: 1 },
      { name: '체육1', semesters: [1], credit: 2 },
      { name: '체육2', semesters: [2], credit: 2 },
      { name: '기술·가정↔정보', semesters: [1, 2], credit: 3 }
    ],
    2: [
      { name: '문학', semesters: [1], credit: 4 },
      { name: '대수', semesters: [1], credit: 4 },
      { name: '영어Ⅰ', semesters: [1], credit: 4 },
      { name: '스포츠 생활1', semesters: [1], credit: 3 },
      { name: '음악 감상과 비평↔미술 창작', semesters: [1, 2], credit: 2 },
      { name: '화법과 언어', semesters: [2], credit: 4 },
      { name: '미적분Ⅰ', semesters: [2], credit: 4 },
      { name: '영어Ⅱ', semesters: [2], credit: 4 },
      { name: '스포츠 생활2', semesters: [2], credit: 3 }
    ],
    3: [
      { name: '독서와 작문', semesters: [1], credit: 4 },
      { name: '확률과 통계', semesters: [1], credit: 4 },
      { name: '영어 독해와 작문', semesters: [1], credit: 4 },
      { name: '스포츠 과학', semesters: [1], credit: 2 },
      { name: '주제탐구 독서', semesters: [2], credit: 4 },
      { name: '실용 통계', semesters: [2], credit: 4 },
      { name: '심화 영어', semesters: [2], credit: 4 },
      { name: '스포츠 문화', semesters: [2], credit: 2 }
    ]
  },
  groups: [
    {
      id: '선택군1',
      grade: 2,
      semester: '1학기',
      selectCount: 1,
      credits: 3,
      description: '2학년 1학기 제2외국어/한문 선택 (택1, 과목당 3학점)',
      subjects: [
        { name: '일본어', semesters: [1] },
        { name: '중국어', semesters: [1] },
        { name: '한문', semesters: [1] }
      ]
    },
    {
      id: '선택군2',
      grade: 2,
      semester: '1학기',
      selectCount: 4,
      credits: 3,
      description: '2학년 1학기 교과(군) 간 선택 (택4, 과목당 3학점, 총 12학점)',
      subjects: [
        { name: '사회와 문화', semesters: [1] },
        { name: '현대사회와 윤리', semesters: [1] },
        { name: '한국지리 탐구', semesters: [1] },
        { name: '동아시아 역사 기행', semesters: [1] },
        { name: '물리학', semesters: [1] },
        { name: '화학', semesters: [1] },
        { name: '생명과학', semesters: [1] },
        { name: '지구과학', semesters: [1] }
      ]
    },
    {
      id: '선택군3',
      grade: 2,
      semester: '2학기',
      selectCount: 1,
      credits: 3,
      description: '2학년 2학기 제2외국어/한문 선택 (택1, 과목당 3학점)',
      subjects: [
        { name: '일본어 회화', semesters: [2] },
        { name: '중국어 회화', semesters: [2] },
        { name: '언어생활과 한자', semesters: [2] }
      ]
    },
    {
      id: '선택군4',
      grade: 2,
      semester: '2학기',
      selectCount: 4,
      credits: 3,
      description: '2학년 2학기 교과(군) 간 선택 (택4, 과목당 3학점, 총 12학점)',
      subjects: [
        { name: '세계시민과 지리', semesters: [2] },
        { name: '세계사', semesters: [2] },
        { name: '정치', semesters: [2] },
        { name: '법과 사회', semesters: [2] },
        { name: '역학과 에너지', semesters: [2] },
        { name: '물질과 에너지', semesters: [2] },
        { name: '세포와 물질대사', semesters: [2] },
        { name: '지구시스템과학', semesters: [2] }
      ]
    },
    {
      id: '선택군5',
      grade: 3,
      semester: '1학기',
      selectCount: 1,
      credits: 3,
      description: '3학년 1학기 교양/정보/과학 선택 (택1, 과목당 3학점)',
      subjects: [
        { name: '생태와 환경', semesters: [1] },
        { name: '데이터 과학', semesters: [1] },
        { name: '인공지능 기초', semesters: [1] }
      ]
    },
    {
      id: '선택군6',
      grade: 3,
      semester: '1학기',
      selectCount: 4,
      credits: 3,
      description: '3학년 1학기 교과(군) 간 선택 (택4, 과목당 3학점, 총 12학점)',
      subjects: [
        { name: '문학과 영상', semesters: [1] },
        { name: '기하', semesters: [1] },
        { name: '세계 문화와 영어', semesters: [1] },
        { name: '법과 사회', semesters: [1] },
        { name: '영미 문학 읽기', semesters: [1] },
        { name: '여행지리', semesters: [1] },
        { name: '역사로 탐구하는 현대 세계', semesters: [1] },
        { name: '전자기와 양자', semesters: [1] },
        { name: '화학 반응의 세계', semesters: [1] },
        { name: '생물의 유전', semesters: [1] },
        { name: '행성우주과학', semesters: [1] }
      ]
    },
    {
      id: '선택군7',
      grade: 3,
      semester: '2학기',
      selectCount: 1,
      credits: 3,
      description: '3학년 2학기 교양/한문/정보 선택 (택1, 과목당 3학점)',
      subjects: [
        { name: '논술', semesters: [2] },
        { name: '한문 고전 읽기', semesters: [2] },
        { name: '인공지능 기초', semesters: [2] }
      ]
    },
    {
      id: '선택군8',
      grade: 3,
      semester: '2학기',
      selectCount: 4,
      credits: 3,
      description: '3학년 2학기 교과(군) 간 선택 (택4, 과목당 3학점, 총 12학점)',
      subjects: [
        { name: '언어생활 탐구', semesters: [2] },
        { name: '수학과제 탐구', semesters: [2] },
        { name: '미디어 영어', semesters: [2] },
        { name: '금융과 경제생활', semesters: [2] },
        { name: '윤리문제 탐구', semesters: [2] },
        { name: '사회문제 탐구', semesters: [2] },
        { name: '기후변화와 지속가능한 세계', semesters: [2] },
        { name: '융합과학 탐구', semesters: [2] },
        { name: '기후변화와 환경생태', semesters: [2] },
        { name: '과학의 역사와 문화', semesters: [2] }
      ]
    }
  ]
};

// 23. 분당영덕여자고등학교 (일반고)
export const BUNDANG_YEONGDEOK_CURRICULUM: SchoolCurriculum = {
  id: 'bundang_yeongdeok',
  name: '분당영덕여자고등학교',
  shortName: '분당영덕여고',
  typeBadge: '일반고',
  district: '분당구',
  location: '경기 성남 분당구 야탑동',
  year: '2027학년도 입학생 (2022 개정)',
  description: '2027학년도 분당영덕여고 공식 교육과정 편성표 (국·수·영 집중, 2학년 2개 선택군 및 3학년 2개 선택군(택5+택1) 심화·융합 맞춤 설계)',
  tags: ['일반고', '분당구', '분당영덕여고', '영덕여고', '사립', '여고', '공식편제', '2022 개정'],
  mandatory: {
    1: [
      { name: '공통국어1', semesters: [1], credit: 4 },
      { name: '공통국어2', semesters: [2], credit: 4 },
      { name: '공통수학1', semesters: [1], credit: 4 },
      { name: '공통수학2', semesters: [2], credit: 4 },
      { name: '공통영어1', semesters: [1], credit: 4 },
      { name: '공통영어2', semesters: [2], credit: 4 },
      { name: '한국사1', semesters: [1], credit: 3 },
      { name: '한국사2', semesters: [2], credit: 3 },
      { name: '통합사회1', semesters: [1], credit: 4 },
      { name: '통합사회2', semesters: [2], credit: 4 },
      { name: '통합과학1', semesters: [1], credit: 4 },
      { name: '통합과학2', semesters: [2], credit: 4 },
      { name: '과학탐구실험1', semesters: [1], credit: 1 },
      { name: '과학탐구실험2', semesters: [2], credit: 1 },
      { name: '체육1', semesters: [1], credit: 2 },
      { name: '체육2', semesters: [2], credit: 2 },
      { name: '음악↔미술', semesters: [1, 2], credit: 3 }
    ],
    2: [
      { name: '독서와 작문', semesters: [1], credit: 4 },
      { name: '대수', semesters: [1], credit: 4 },
      { name: '영어Ⅰ', semesters: [1], credit: 4 },
      { name: '운동과 건강', semesters: [1], credit: 2 },
      { name: '화법과 언어', semesters: [2], credit: 4 },
      { name: '미적분Ⅰ', semesters: [2], credit: 4 },
      { name: '영어Ⅱ', semesters: [2], credit: 4 },
      { name: '스포츠 생활1', semesters: [2], credit: 2 }
    ],
    3: [
      { name: '확률과 통계', semesters: [1], credit: 4 },
      { name: '심화 영어', semesters: [1], credit: 4 },
      { name: '스포츠 문화', semesters: [1], credit: 1 },
      { name: '독서 토론과 글쓰기', semesters: [2], credit: 4 },
      { name: '스포츠 과학', semesters: [2], credit: 1 }
    ]
  },
  groups: [
    {
      id: '선택군1',
      grade: 2,
      semester: '1학기',
      selectCount: 1,
      credits: 3,
      description: '2학년 1학기 제2외국어/한문 선택 (택1, 3학점)',
      subjects: [
        { name: '일본어', semesters: [1] },
        { name: '중국어', semesters: [1] },
        { name: '언어생활과 한자', semesters: [1] }
      ]
    },
    {
      id: '선택군2',
      grade: 2,
      semester: '1학기',
      selectCount: 4,
      credits: 3,
      description: '2학년 1학기 교과(군) 간 선택 (택4, 과목당 3학점, 총 12학점)',
      subjects: [
        { name: '세계시민과 지리', semesters: [1] },
        { name: '세계사', semesters: [1] },
        { name: '사회와 문화', semesters: [1] },
        { name: '현대사회와 윤리', semesters: [1] },
        { name: '물리학', semesters: [1] },
        { name: '화학', semesters: [1] },
        { name: '생명과학', semesters: [1] },
        { name: '정보', semesters: [1] },
        { name: '독일어', semesters: [1] },
        { name: '중국어', semesters: [1] }
      ]
    },
    {
      id: '선택군3',
      grade: 2,
      semester: '2학기',
      selectCount: 1,
      credits: 3,
      description: '2학년 2학기 정보/문화 선택 (택1, 3학점)',
      subjects: [
        { name: '데이터 과학', semesters: [2] },
        { name: '독일어권 문화', semesters: [2] },
        { name: '중국 문화', semesters: [2] }
      ]
    },
    {
      id: '선택군4',
      grade: 2,
      semester: '2학기',
      selectCount: 4,
      credits: 3,
      description: '2학년 2학기 교과(군) 간 선택 (택4, 과목당 3학점, 총 12학점)',
      subjects: [
        { name: '동아시아 역사 기행', semesters: [2] },
        { name: '정치', semesters: [2] },
        { name: '법과 사회', semesters: [2] },
        { name: '경제', semesters: [2] },
        { name: '윤리와 사상', semesters: [2] },
        { name: '지구과학', semesters: [2] },
        { name: '역학과 에너지', semesters: [2] },
        { name: '전자기와 양자', semesters: [2] },
        { name: '화학 반응의 세계', semesters: [2] },
        { name: '세포와 물질대사', semesters: [2] }
      ]
    },
    {
      id: '선택군5',
      grade: 3,
      semester: '1학기',
      selectCount: 1,
      credits: 2,
      description: '3학년 1학기 AI/교양/연구 선택 (택1, 2학점)',
      subjects: [
        { name: '인공지능과 함께하는 세상', semesters: [1] },
        { name: '주제 탐구(R&E) 심화', semesters: [1] },
        { name: '비판적 질문과 창의적 해결', semesters: [1] }
      ]
    },
    {
      id: '선택군6',
      grade: 3,
      semester: '1학기',
      selectCount: 5,
      credits: 3,
      description: '3학년 1학기 교과(군) 간 심화 선택 (택5, 과목당 3학점, 총 15학점)',
      subjects: [
        { name: '문학과 영상', semesters: [1] },
        { name: '매체 의사소통', semesters: [1] },
        { name: '세계 문화와 영어', semesters: [1] },
        { name: '미적분Ⅱ', semesters: [1] },
        { name: '경제 수학', semesters: [1] },
        { name: '인공지능 수학', semesters: [1] },
        { name: '물질과 에너지', semesters: [1] },
        { name: '지구시스템과학', semesters: [1] },
        { name: '행성우주과학', semesters: [1] },
        { name: '도시의 미래 탐구', semesters: [1] },
        { name: '문화로 보는 한국사', semesters: [1] },
        { name: '국제 관계의 이해', semesters: [1] },
        { name: '인문학과 윤리', semesters: [1] },
        { name: '사회문제 탐구', semesters: [1] },
        { name: '과학과제 연구', semesters: [1] },
        { name: '고급 화학', semesters: [1] },
        { name: '고급 생명과학', semesters: [1] },
        { name: '융합과학 탐구', semesters: [1] }
      ]
    },
    {
      id: '선택군7',
      grade: 3,
      semester: '2학기',
      selectCount: 1,
      credits: 2,
      description: '3학년 2학기 교양 선택 (택1, 2학점)',
      subjects: [
        { name: '생태와 환경', semesters: [2] },
        { name: '인간과 심리', semesters: [2] }
      ]
    },
    {
      id: '선택군8',
      grade: 3,
      semester: '2학기',
      selectCount: 5,
      credits: 3,
      description: '3학년 2학기 교과(군) 간 심화 선택 (택5, 과목당 3학점, 총 15학점)',
      subjects: [
        { name: '언어생활 탐구', semesters: [2] },
        { name: '미디어 영어', semesters: [2] },
        { name: '전문 수학', semesters: [2] },
        { name: '수학과제 탐구', semesters: [2] },
        { name: '실용 통계', semesters: [2] },
        { name: '기하', semesters: [2] },
        { name: '여행지리', semesters: [2] },
        { name: '역사로 탐구하는 현대 세계', semesters: [2] },
        { name: '윤리문제 탐구', semesters: [2] },
        { name: '기후변화와 지속가능한 세계', semesters: [2] },
        { name: '과학의 역사와 문화', semesters: [2] },
        { name: '기후변화와 환경생태', semesters: [2] },
        { name: '고급 지구과학', semesters: [2] }
      ]
    }
  ]
};

// 24. 복정고등학교 (일반고)
export const BOKJEONG_HIGH_CURRICULUM: SchoolCurriculum = {
  id: 'bokjeong',
  name: '복정고등학교',
  shortName: '복정고',
  typeBadge: '일반고',
  district: '수정구',
  location: '경기 성남 수정구 복정동',
  year: '2027학년도 입학생 (2022 개정)',
  description: '2027학년도 복정고 공식 교육과정 편제표 (1학년 공통 및 2·3학년 교과군 간 선택 192학점 체계)',
  tags: ['일반고', '수정구', '복정고', '공식편제', '2022 개정'],
  mandatory: {
    1: [
      { name: '공통국어1', semesters: [1], credit: 4 },
      { name: '공통국어2', semesters: [2], credit: 4 },
      { name: '공통수학1', semesters: [1], credit: 4 },
      { name: '공통수학2', semesters: [2], credit: 4 },
      { name: '공통영어1', semesters: [1], credit: 4 },
      { name: '공통영어2', semesters: [2], credit: 4 },
      { name: '한국사1', semesters: [1], credit: 3 },
      { name: '한국사2', semesters: [2], credit: 3 },
      { name: '통합사회1', semesters: [1], credit: 4 },
      { name: '통합사회2', semesters: [2], credit: 4 },
      { name: '통합과학1', semesters: [1], credit: 4 },
      { name: '통합과학2', semesters: [2], credit: 4 },
      { name: '과학탐구실험1', semesters: [1], credit: 1 },
      { name: '과학탐구실험2', semesters: [2], credit: 1 },
      { name: '체육1', semesters: [1], credit: 2 },
      { name: '체육2', semesters: [2], credit: 2 },
      { name: '음악↔미술', semesters: [1, 2], credit: 3 }
    ],
    2: [
      { name: '문학', semesters: [1], credit: 4 },
      { name: '대수', semesters: [1], credit: 4 },
      { name: '영어Ⅰ', semesters: [1], credit: 4 },
      { name: '운동과 건강', semesters: [1], credit: 2 },
      { name: '화법과 언어', semesters: [2], credit: 4 },
      { name: '미적분Ⅰ', semesters: [2], credit: 4 },
      { name: '영어Ⅱ', semesters: [2], credit: 4 },
      { name: '스포츠 생활1', semesters: [2], credit: 2 }
    ],
    3: [
      { name: '독서와 작문', semesters: [1], credit: 4 },
      { name: '확률과 통계', semesters: [1], credit: 4 },
      { name: '영어 독해와 작문', semesters: [1], credit: 4 },
      { name: '스포츠 문화', semesters: [1], credit: 1 },
      { name: '언어생활 탐구', semesters: [2], credit: 4 },
      { name: '실용 통계', semesters: [2], credit: 4 },
      { name: '심화 영어', semesters: [2], credit: 4 },
      { name: '스포츠 과학', semesters: [2], credit: 1 }
    ]
  },
  groups: [
    {
      id: '선택군1',
      grade: 2,
      semester: '1학기',
      selectCount: 1,
      credits: 3,
      description: '2학년 1학기 제2외국어 (택1, 3학점)',
      subjects: [
        { name: '일본어', semesters: [1] },
        { name: '중국어', semesters: [1] }
      ]
    },
    {
      id: '선택군2',
      grade: 2,
      semester: '1학기',
      selectCount: 4,
      credits: 3,
      description: '2학년 1학기 교과(군) 간 선택 (택4, 12학점)',
      subjects: [
        { name: '주제 탐구 독서', semesters: [1] },
        { name: '기하', semesters: [1] },
        { name: '세계 문화와 영어', semesters: [1] },
        { name: '정치', semesters: [1] },
        { name: '경제', semesters: [1] },
        { name: '한국지리 탐구', semesters: [1] },
        { name: '세계사', semesters: [1] },
        { name: '윤리와 사상', semesters: [1] },
        { name: '물리학', semesters: [1] },
        { name: '화학', semesters: [1] },
        { name: '생명과학', semesters: [1] },
        { name: '지구과학', semesters: [1] }
      ]
    },
    {
      id: '선택군3',
      grade: 2,
      semester: '2학기',
      selectCount: 1,
      credits: 3,
      description: '2학년 2학기 제2외국어 (택1, 3학점)',
      subjects: [
        { name: '일본어 회화', semesters: [2] },
        { name: '중국어 회화', semesters: [2] }
      ]
    },
    {
      id: '선택군4',
      grade: 2,
      semester: '2학기',
      selectCount: 4,
      credits: 3,
      description: '2학년 2학기 교과(군) 간 선택 (택4, 12학점)',
      subjects: [
        { name: '문학과 영상', semesters: [2] },
        { name: '인공지능 수학', semesters: [2] },
        { name: '미디어 영어', semesters: [2] },
        { name: '법과 사회', semesters: [2] },
        { name: '사회와 문화', semesters: [2] },
        { name: '세계시민과 지리', semesters: [2] },
        { name: '동아시아 역사 기행', semesters: [2] },
        { name: '현대사회와 윤리', semesters: [2] },
        { name: '역학과 에너지', semesters: [2] },
        { name: '물질과 에너지', semesters: [2] },
        { name: '생물의 유전', semesters: [2] },
        { name: '지구시스템과학', semesters: [2] }
      ]
    },
    {
      id: '선택군5',
      grade: 3,
      semester: '1학기',
      selectCount: 1,
      credits: 3,
      description: '3학년 1학기 예술 (택1, 3학점)',
      subjects: [
        { name: '음악', semesters: [1] },
        { name: '미술', semesters: [1] }
      ]
    },
    {
      id: '선택군6',
      grade: 3,
      semester: '1학기',
      selectCount: 1,
      credits: 3,
      description: '3학년 1학기 제2외국어/교양/정보 (택1, 3학점)',
      subjects: [
        { name: '심화 일본어', semesters: [1] },
        { name: '심화 중국어', semesters: [1] },
        { name: '지식 재산 일반', semesters: [1] },
        { name: '인공지능 기초', semesters: [1] }
      ]
    },
    {
      id: '선택군7',
      grade: 3,
      semester: '1학기',
      selectCount: 4,
      credits: 3,
      description: '3학년 1학기 교과(군) 간 선택 (택4, 12학점)',
      subjects: [
        { name: '미적분Ⅱ', semesters: [1] },
        { name: '경제 수학', semesters: [1] },
        { name: '심화 영어', semesters: [1] },
        { name: '심화 영어 독해와 작문', semesters: [1] },
        { name: '사회문제 탐구', semesters: [1] },
        { name: '인문학과 윤리', semesters: [1] },
        { name: '도시의 미래 탐구', semesters: [1] },
        { name: '한국사 심화탐구', semesters: [1] },
        { name: '전자기와 양자', semesters: [1] },
        { name: '화학 반응의 세계', semesters: [1] },
        { name: '세포와 물질대사', semesters: [1] },
        { name: '행성우주과학', semesters: [1] },
        { name: '과학과제 연구', semesters: [1] }
      ]
    },
    {
      id: '선택군8',
      grade: 3,
      semester: '2학기',
      selectCount: 1,
      credits: 3,
      description: '3학년 2학기 예술 (택1, 3학점)',
      subjects: [
        { name: '음악과 미디어', semesters: [2] },
        { name: '미술과 매체', semesters: [2] }
      ]
    },
    {
      id: '선택군9',
      grade: 3,
      semester: '2학기',
      selectCount: 1,
      credits: 3,
      description: '3학년 2학기 제2외국어/정보 (택1, 3학점)',
      subjects: [
        { name: '일본 문화', semesters: [2] },
        { name: '중국 문화', semesters: [2] },
        { name: '창의 공학 설계', semesters: [2] },
        { name: '데이터 과학', semesters: [2] }
      ]
    },
    {
      id: '선택군10',
      grade: 3,
      semester: '2학기',
      selectCount: 7,
      credits: 3,
      description: '3학년 2학기 교과(군) 간 선택 (택7, 21학점)',
      subjects: [
        { name: '언어생활 탐구', semesters: [2] },
        { name: '매체 의사소통', semesters: [2] },
        { name: '수학과제 탐구', semesters: [2] },
        { name: '실용 통계', semesters: [2] },
        { name: '수학과 문화', semesters: [2] },
        { name: '영어 발표와 토론', semesters: [2] },
        { name: '실생활 영어 회화', semesters: [2] },
        { name: '여행지리', semesters: [2] },
        { name: '역사로 탐구하는 현대 세계', semesters: [2] },
        { name: '금융과 경제생활', semesters: [2] },
        { name: '윤리문제 탐구', semesters: [2] },
        { name: '과학의 역사와 문화', semesters: [2] },
        { name: '기후변화와 환경생태', semesters: [2] },
        { name: '융합과학 탐구', semesters: [2] }
      ]
    }
  ]
};

// 25. 풍생고등학교 (과학중점)
export const PUNGSAENG_HIGH_CURRICULUM: SchoolCurriculum = {
  id: 'pungsaeng',
  name: '풍생고등학교',
  shortName: '풍생고',
  typeBadge: '과학중점',
  district: '수정구',
  location: '경기 성남 수정구 태평동',
  year: '2027학년도 입학생 (2022 개정)',
  description: '2027학년도 풍생고 공식 교육과정 편제표 (1학년 공통 및 2·3학년 교과군 간 선택 192학점 체계)',
  tags: ['일반고', '수정구', '풍생고', '과학중점', '공식편제', '2022 개정'],
  mandatory: {
    1: [
      { name: '공통국어1', semesters: [1], credit: 4 },
      { name: '공통국어2', semesters: [2], credit: 4 },
      { name: '공통수학1', semesters: [1], credit: 4 },
      { name: '공통수학2', semesters: [2], credit: 4 },
      { name: '공통영어1', semesters: [1], credit: 4 },
      { name: '공통영어2', semesters: [2], credit: 4 },
      { name: '한국사1', semesters: [1], credit: 3 },
      { name: '한국사2', semesters: [2], credit: 3 },
      { name: '통합사회1', semesters: [1], credit: 4 },
      { name: '통합사회2', semesters: [2], credit: 4 },
      { name: '통합과학1', semesters: [1], credit: 4 },
      { name: '통합과학2', semesters: [2], credit: 4 },
      { name: '과학탐구실험1', semesters: [1], credit: 1 },
      { name: '과학탐구실험2', semesters: [2], credit: 1 },
      { name: '체육1', semesters: [1], credit: 2 },
      { name: '체육2', semesters: [2], credit: 2 },
      { name: '음악↔미술', semesters: [1, 2], credit: 3 }
    ],
    2: [
      { name: '문학', semesters: [1], credit: 4 },
      { name: '대수', semesters: [1], credit: 4 },
      { name: '영어Ⅰ', semesters: [1], credit: 4 },
      { name: '운동과 건강', semesters: [1], credit: 2 },
      { name: '화법과 언어', semesters: [2], credit: 4 },
      { name: '미적분Ⅰ', semesters: [2], credit: 4 },
      { name: '영어Ⅱ', semesters: [2], credit: 4 },
      { name: '스포츠 생활1', semesters: [2], credit: 2 }
    ],
    3: [
      { name: '독서와 작문', semesters: [1], credit: 4 },
      { name: '확률과 통계', semesters: [1], credit: 4 },
      { name: '영어 독해와 작문', semesters: [1], credit: 4 },
      { name: '스포츠 문화', semesters: [1], credit: 1 },
      { name: '주제 탐구 독서', semesters: [2], credit: 4 },
      { name: '수학과제 탐구', semesters: [2], credit: 4 },
      { name: '심화 영어', semesters: [2], credit: 4 },
      { name: '스포츠 과학', semesters: [2], credit: 1 }
    ]
  },
  groups: [
    {
      id: '선택군1',
      grade: 2,
      semester: '1학기',
      selectCount: 4,
      credits: 3,
      description: '2학년 1학기 교과(군) 간 선택 (택4, 12학점)',
      subjects: [
        { name: '사회와 문화', semesters: [1] },
        { name: '세계시민과 지리', semesters: [1] },
        { name: '세계사', semesters: [1] },
        { name: '현대사회와 윤리', semesters: [1] },
        { name: '물리학', semesters: [1] },
        { name: '화학', semesters: [1] },
        { name: '생명과학', semesters: [1] },
        { name: '지구과학', semesters: [1] }
      ]
    },
    {
      id: '선택군2',
      grade: 2,
      semester: '1학기',
      selectCount: 1,
      credits: 3,
      description: '2학년 1학기 기술·가정/정보 (택1, 3학점)',
      subjects: [
        { name: '생활과학 탐구', semesters: [1] },
        { name: '프로그래밍', semesters: [1] }
      ]
    },
    {
      id: '선택군3',
      grade: 2,
      semester: '2학기',
      selectCount: 4,
      credits: 3,
      description: '2학년 2학기 교과(군) 간 선택 (택4, 12학점)',
      subjects: [
        { name: '경제', semesters: [2] },
        { name: '한국지리 탐구', semesters: [2] },
        { name: '동아시아 역사 기행', semesters: [2] },
        { name: '윤리와 사상', semesters: [2] },
        { name: '역학과 에너지', semesters: [2] },
        { name: '물질과 에너지', semesters: [2] },
        { name: '세포와 물질대사', semesters: [2] },
        { name: '지구시스템과학', semesters: [2] },
        { name: '기하', semesters: [2] },
        { name: '기술·가정', semesters: [2] }
      ]
    },
    {
      id: '선택군4',
      grade: 2,
      semester: '2학기',
      selectCount: 1,
      credits: 3,
      description: '2학년 2학기 제2외국어/문화 (택1, 3학점)',
      subjects: [
        { name: '언어생활과 한자', semesters: [2] },
        { name: '중국 문화', semesters: [2] },
        { name: '일본 문화', semesters: [2] }
      ]
    },
    {
      id: '선택군5',
      grade: 3,
      semester: '1학기',
      selectCount: 1,
      credits: 3,
      description: '3학년 1학기 교과(군) 간 선택 1 (택1, 3학점)',
      subjects: [
        { name: '문학과 영상', semesters: [1] },
        { name: '미적분Ⅱ', semesters: [1] },
        { name: '세계 문화와 영어', semesters: [1] }
      ]
    },
    {
      id: '선택군6',
      grade: 3,
      semester: '1학기',
      selectCount: 3,
      credits: 3,
      description: '3학년 1학기 교과(군) 간 선택 2 (택3, 9학점)',
      subjects: [
        { name: '정치', semesters: [1] },
        { name: '법과 사회', semesters: [1] },
        { name: '도시의 미래 탐구', semesters: [1] },
        { name: '인문학과 윤리', semesters: [1] },
        { name: '음악 감상과 비평', semesters: [1] },
        { name: '미술 감상과 비평', semesters: [1] },
        { name: '전자기와 양자', semesters: [1] },
        { name: '화학 반응의 세계', semesters: [1] },
        { name: '생물의 유전', semesters: [1] },
        { name: '행성우주과학', semesters: [1] },
        { name: '한문', semesters: [1] },
        { name: '중국어', semesters: [1] },
        { name: '일본어', semesters: [1] },
        { name: '물리학 실험', semesters: [1] },
        { name: '화학 실험', semesters: [1] },
        { name: '생명과학 실험', semesters: [1] },
        { name: '지구과학 실험', semesters: [1] }
      ]
    },
    {
      id: '선택군7',
      grade: 3,
      semester: '1학기',
      selectCount: 1,
      credits: 2,
      description: '3학년 1학기 교양 (택1, 2학점)',
      subjects: [
        { name: '진로와 직업', semesters: [1] },
        { name: '논리와 사고', semesters: [1] },
        { name: '과학창의연구', semesters: [1] }
      ]
    },
    {
      id: '선택군8',
      grade: 3,
      semester: '2학기',
      selectCount: 3,
      credits: 3,
      description: '3학년 2학기 교과(군) 간 선택 (택3, 9학점)',
      subjects: [
        { name: '금융과 경제생활', semesters: [2] },
        { name: '여행지리', semesters: [2] },
        { name: '윤리문제 탐구', semesters: [2] },
        { name: '역사로 탐구하는 현대 세계', semesters: [2] },
        { name: '음악과 미디어', semesters: [2] },
        { name: '미술과 매체', semesters: [2] },
        { name: '과학의 역사와 문화', semesters: [2] },
        { name: '기후변화와 환경생태', semesters: [2] },
        { name: '융합과학 탐구', semesters: [2] },
        { name: '데이터 과학', semesters: [2] },
        { name: '과학과제 연구', semesters: [2] }
      ]
    },
    {
      id: '선택군9',
      grade: 3,
      semester: '2학기',
      selectCount: 1,
      credits: 2,
      description: '3학년 2학기 교양 (택1, 2학점)',
      subjects: [
        { name: '진로와 직업', semesters: [2] },
        { name: '논리와 사고', semesters: [2] },
        { name: '생태와 환경', semesters: [2] },
        { name: '과학 교양', semesters: [2] }
      ]
    }
  ]
};

// 26. 성일고등학교 (일반고)
export const SUNGIL_HIGH_CURRICULUM: SchoolCurriculum = {
  id: 'sungil',
  name: '성일고등학교',
  shortName: '성일고',
  typeBadge: '일반고',
  district: '중원구',
  location: '경기 성남 중원구',
  year: '2027학년도 입학생 (2022 개정)',
  description: '2027학년도 성일고 공식 교육과정 편제표 (1학년 공통·학기제 교차 및 2·3학년 교과군 간 선택 192학점 체계)',
  tags: ['일반고', '중원구', '사립', '성일고', '공식편제', '2022 개정'],
  mandatory: {
    1: [
      { name: '공통국어1', semesters: [1], credit: 4 },
      { name: '공통국어2', semesters: [2], credit: 4 },
      { name: '공통수학1', semesters: [1], credit: 4 },
      { name: '공통수학2', semesters: [2], credit: 4 },
      { name: '공통영어1', semesters: [1], credit: 4 },
      { name: '공통영어2', semesters: [2], credit: 4 },
      { name: '한국사1', semesters: [1], credit: 3 },
      { name: '한국사2', semesters: [2], credit: 3 },
      { name: '통합사회1', semesters: [1], credit: 4 },
      { name: '통합사회2', semesters: [2], credit: 4 },
      { name: '통합과학1', semesters: [1], credit: 4 },
      { name: '통합과학2', semesters: [2], credit: 4 },
      { name: '과학탐구실험1', semesters: [1], credit: 1 },
      { name: '과학탐구실험2', semesters: [2], credit: 1 },
      { name: '체육1', semesters: [1], credit: 2 },
      { name: '체육2', semesters: [2], credit: 2 },
      { name: '음악↔미술', semesters: [1, 2], credit: 3 },
      { name: '정보↔기술·가정', semesters: [1, 2], credit: 3 }
    ],
    2: [
      { name: '문학', semesters: [1], credit: 4 },
      { name: '대수', semesters: [1], credit: 4 },
      { name: '영어Ⅰ', semesters: [1], credit: 4 },
      { name: '스포츠 생활1', semesters: [1], credit: 2 },
      { name: '화법과 언어', semesters: [2], credit: 4 },
      { name: '미적분Ⅰ', semesters: [2], credit: 4 },
      { name: '영어Ⅱ', semesters: [2], credit: 4 },
      { name: '스포츠 생활2', semesters: [2], credit: 2 }
    ],
    3: [
      { name: '독서와 작문', semesters: [1], credit: 4 },
      { name: '확률과 통계', semesters: [1], credit: 4 },
      { name: '영어 독해와 작문', semesters: [1], credit: 4 },
      { name: '스포츠 문화', semesters: [1], credit: 1 },
      { name: '언어생활 탐구', semesters: [2], credit: 4 },
      { name: '실용 통계', semesters: [2], credit: 4 },
      { name: '심화 영어', semesters: [2], credit: 4 },
      { name: '스포츠 과학', semesters: [2], credit: 1 }
    ]
  },
  groups: [
    {
      id: '선택군1',
      grade: 2,
      semester: '1학기',
      selectCount: 1,
      credits: 3,
      description: '2학년 1학기 교과(군) 간 선택 1 (택1, 3학점)',
      subjects: [
        { name: '주제 탐구 독서', semesters: [1] },
        { name: '기하', semesters: [1] },
        { name: '영어 발표와 토론', semesters: [1] }
      ]
    },
    {
      id: '선택군2',
      grade: 2,
      semester: '1학기',
      selectCount: 3,
      credits: 3,
      description: '2학년 1학기 교과(군) 간 선택 2 (택3, 9학점)',
      subjects: [
        { name: '물리학', semesters: [1] },
        { name: '화학', semesters: [1] },
        { name: '생명과학', semesters: [1] },
        { name: '지구과학', semesters: [1] },
        { name: '인문학과 윤리', semesters: [1] },
        { name: '경제', semesters: [1] },
        { name: '동아시아 역사 기행', semesters: [1] },
        { name: '한국지리 탐구', semesters: [1] }
      ]
    },
    {
      id: '선택군3',
      grade: 2,
      semester: '2학기',
      selectCount: 1,
      credits: 3,
      description: '2학년 2학기 교과(군) 간 선택 1 (택1, 3학점)',
      subjects: [
        { name: '문학과 영상', semesters: [2] },
        { name: '실용 통계', semesters: [2] },
        { name: '세계 문화와 영어', semesters: [2] }
      ]
    },
    {
      id: '선택군4',
      grade: 2,
      semester: '2학기',
      selectCount: 3,
      credits: 3,
      description: '2학년 2학기 교과(군) 간 선택 2 (택3, 9학점)',
      subjects: [
        { name: '역학과 에너지', semesters: [2] },
        { name: '물질과 에너지', semesters: [2] },
        { name: '세포와 물질대사', semesters: [2] },
        { name: '지구시스템과학', semesters: [2] },
        { name: '현대사회와 윤리', semesters: [2] },
        { name: '사회와 문화', semesters: [2] },
        { name: '세계사', semesters: [2] },
        { name: '세계시민과 지리', semesters: [2] }
      ]
    },
    {
      id: '선택군5',
      grade: 3,
      semester: '1학기',
      selectCount: 1,
      credits: 3,
      description: '3학년 1학기 제2외국어 선택 (택1, 3학점)',
      subjects: [
        { name: '중국어', semesters: [1] },
        { name: '일본어', semesters: [1] }
      ]
    },
    {
      id: '선택군6',
      grade: 3,
      semester: '1학기',
      selectCount: 1,
      credits: 2,
      description: '3학년 1학기 예술 선택 (택1, 2학점)',
      subjects: [
        { name: '음악 감상과 비평', semesters: [1] },
        { name: '미술 감상과 비평', semesters: [1] }
      ]
    },
    {
      id: '선택군7',
      grade: 3,
      semester: '1학기',
      selectCount: 1,
      credits: 2,
      description: '3학년 1학기 교양 선택 (택1, 2학점)',
      subjects: [
        { name: '생태와 환경', semesters: [1] },
        { name: '인간과 철학', semesters: [1] },
        { name: '인간과 심리', semesters: [1] },
        { name: '교육의 이해', semesters: [1] },
        { name: '인간과 경제활동', semesters: [1] }
      ]
    },
    {
      id: '선택군8',
      grade: 3,
      semester: '1학기',
      selectCount: 1,
      credits: 3,
      description: '3학년 1학기 교과(군) 간 선택 1 (택1, 3학점)',
      subjects: [
        { name: '언어생활 탐구', semesters: [1] },
        { name: '미적분Ⅱ', semesters: [1] },
        { name: '심화 영어', semesters: [1] }
      ]
    },
    {
      id: '선택군9',
      grade: 3,
      semester: '1학기',
      selectCount: 3,
      credits: 3,
      description: '3학년 1학기 교과(군) 간 선택 2 (택3, 9학점)',
      subjects: [
        { name: '전자기와 양자', semesters: [1] },
        { name: '화학 반응의 세계', semesters: [1] },
        { name: '생물의 유전', semesters: [1] },
        { name: '행성우주과학', semesters: [1] },
        { name: '고급 물리학', semesters: [1] },
        { name: '고급 생명과학', semesters: [1] },
        { name: '고급 화학', semesters: [1] },
        { name: '윤리와 사상', semesters: [1] },
        { name: '정치', semesters: [1] },
        { name: '법과 사회', semesters: [1] },
        { name: '도시의 미래 탐구', semesters: [1] },
        { name: '사회문제 탐구', semesters: [1] }
      ]
    },
    {
      id: '선택군10',
      grade: 3,
      semester: '2학기',
      selectCount: 1,
      credits: 3,
      description: '3학년 2학기 제2외국어 선택 (택1, 3학점)',
      subjects: [
        { name: '중국 문화', semesters: [2] },
        { name: '일본 문화', semesters: [2] }
      ]
    },
    {
      id: '선택군11',
      grade: 3,
      semester: '2학기',
      selectCount: 1,
      credits: 2,
      description: '3학년 2학기 예술 선택 (택1, 2학점)',
      subjects: [
        { name: '음악 연주와 창작', semesters: [2] },
        { name: '미술 창작', semesters: [2] }
      ]
    },
    {
      id: '선택군12',
      grade: 3,
      semester: '2학기',
      selectCount: 1,
      credits: 2,
      description: '3학년 2학기 교양 선택 (택1, 2학점)',
      subjects: [
        { name: '생태와 환경', semesters: [2] },
        { name: '인간과 철학', semesters: [2] },
        { name: '인간과 심리', semesters: [2] },
        { name: '교육의 이해', semesters: [2] },
        { name: '인간과 경제활동', semesters: [2] }
      ]
    },
    {
      id: '선택군13',
      grade: 3,
      semester: '2학기',
      selectCount: 4,
      credits: 3,
      description: '3학년 2학기 교과(군) 간 선택 1 (택4, 12학점)',
      subjects: [
        { name: '매체 의사소통', semesters: [2] },
        { name: '독서 토론과 글쓰기', semesters: [2] },
        { name: '수학과제 탐구', semesters: [2] },
        { name: '이산 수학', semesters: [2] },
        { name: '미디어 영어', semesters: [2] },
        { name: '심화 영어 독해와 작문', semesters: [2] }
      ]
    },
    {
      id: '선택군14',
      grade: 3,
      semester: '2학기',
      selectCount: 3,
      credits: 3,
      description: '3학년 2학기 교과(군) 간 선택 2 (택3, 9학점)',
      subjects: [
        { name: '과학의 역사와 문화', semesters: [2] },
        { name: '융합과학 탐구', semesters: [2] },
        { name: '기후변화와 환경생태', semesters: [2] },
        { name: '과학과제 연구', semesters: [2] },
        { name: '물리학 실험', semesters: [2] },
        { name: '생명과학 실험', semesters: [2] },
        { name: '화학 실험', semesters: [2] },
        { name: '윤리문제 탐구', semesters: [2] },
        { name: '금융과 경제생활', semesters: [2] },
        { name: '역사로 탐구하는 현대 세계', semesters: [2] },
        { name: '기후변화와 지속가능한 세계', semesters: [2] },
        { name: '여행지리', semesters: [2] }
      ]
    }
  ]
};

// 26. 위례한빛고등학교 (과학중점)
export const WIRYE_HANBIT_CURRICULUM: SchoolCurriculum = {
  id: 'wirye_hanbit',
  name: '위례한빛고등학교',
  shortName: '위례한빛고',
  typeBadge: '과학중점',
  district: '수정구',
  location: '경기 성남 수정구 위례',
  year: '2027학년도 입학생 (2022 개정)',
  description: '2027학년도 위례한빛고 공식 교육과정 편제표 (1학년 공통 및 2·3학년 교과군 간 선택 192학점 체계)',
  tags: ['일반고', '수정구', '위례', '위례한빛고', '공식편제', '2022 개정'],
  mandatory: {
    1: [
      { name: '공통국어1', semesters: [1], credit: 4 },
      { name: '공통국어2', semesters: [2], credit: 4 },
      { name: '공통수학1', semesters: [1], credit: 4 },
      { name: '공통수학2', semesters: [2], credit: 4 },
      { name: '공통영어1', semesters: [1], credit: 4 },
      { name: '공통영어2', semesters: [2], credit: 4 },
      { name: '한국사1', semesters: [1], credit: 3 },
      { name: '한국사2', semesters: [2], credit: 3 },
      { name: '통합사회1', semesters: [1], credit: 4 },
      { name: '통합사회2', semesters: [2], credit: 4 },
      { name: '통합과학1', semesters: [1], credit: 4 },
      { name: '통합과학2', semesters: [2], credit: 4 },
      { name: '과학탐구실험1', semesters: [1], credit: 1 },
      { name: '과학탐구실험2', semesters: [2], credit: 1 },
      { name: '체육1', semesters: [1], credit: 2 },
      { name: '체육2', semesters: [2], credit: 2 },
      { name: '음악↔미술', semesters: [1, 2], credit: 3 }
    ],
    2: [
      { name: '문학', semesters: [1], credit: 4 },
      { name: '대수', semesters: [1], credit: 4 },
      { name: '영어Ⅰ', semesters: [1], credit: 4 },
      { name: '운동과 건강', semesters: [1], credit: 2 },
      { name: '화법과 언어', semesters: [2], credit: 4 },
      { name: '미적분Ⅰ', semesters: [2], credit: 4 },
      { name: '영어Ⅱ', semesters: [2], credit: 4 },
      { name: '스포츠 생활1', semesters: [2], credit: 2 }
    ],
    3: [
      { name: '독서와 작문', semesters: [1], credit: 4 },
      { name: '확률과 통계', semesters: [1], credit: 4 },
      { name: '영어 독해와 작문', semesters: [1], credit: 4 },
      { name: '스포츠 문화', semesters: [1], credit: 1 },
      { name: '언어생활 탐구', semesters: [2], credit: 4 },
      { name: '실용 통계', semesters: [2], credit: 4 },
      { name: '심화 영어', semesters: [2], credit: 4 },
      { name: '스포츠 과학', semesters: [2], credit: 1 }
    ]
  },
  groups: [
    {
      id: '선택군1',
      grade: 2,
      semester: '1학기',
      selectCount: 1,
      credits: 3,
      description: '2학년 1학기 제2외국어/공학 선택 (택1, 3학점)',
      subjects: [
        { name: '일본어', semesters: [1] },
        { name: '중국어', semesters: [1] },
        { name: '언어생활과 한자', semesters: [1] },
        { name: '로봇과 공학세계', semesters: [1] }
      ]
    },
    {
      id: '선택군2',
      grade: 2,
      semester: '1학기',
      selectCount: 4,
      credits: 3,
      description: '2학년 1학기 교과(군) 간 선택 (택4, 12학점)',
      subjects: [
        { name: '물리학', semesters: [1] },
        { name: '화학', semesters: [1] },
        { name: '생명과학', semesters: [1] },
        { name: '지구과학', semesters: [1] },
        { name: '윤리와 사상', semesters: [1] },
        { name: '한국지리 탐구', semesters: [1] },
        { name: '세계사', semesters: [1] },
        { name: '법과 사회', semesters: [1] },
        { name: '데이터 과학', semesters: [1] }
      ]
    },
    {
      id: '선택군3',
      grade: 2,
      semester: '2학기',
      selectCount: 1,
      credits: 3,
      description: '2학년 2학기 제2외국어/지식재산 (택1, 3학점)',
      subjects: [
        { name: '일본어 회화', semesters: [2] },
        { name: '중국어 회화', semesters: [2] },
        { name: '한문 고전 읽기', semesters: [2] },
        { name: '지식 재산 일반', semesters: [2] }
      ]
    },
    {
      id: '선택군4',
      grade: 2,
      semester: '2학기',
      selectCount: 4,
      credits: 3,
      description: '2학년 2학기 교과(군) 간 선택 (택4, 12학점)',
      subjects: [
        { name: '기하', semesters: [2] },
        { name: '인공지능 수학', semesters: [2] },
        { name: '역학과 에너지', semesters: [2] },
        { name: '물질과 에너지', semesters: [2] },
        { name: '세포와 물질대사', semesters: [2] },
        { name: '지구시스템과학', semesters: [2] },
        { name: '현대사회와 윤리', semesters: [2] },
        { name: '세계시민과 지리', semesters: [2] },
        { name: '동아시아 역사 기행', semesters: [2] },
        { name: '정치', semesters: [2] },
        { name: '소프트웨어와 생활', semesters: [2] }
      ]
    },
    {
      id: '선택군5',
      grade: 3,
      semester: '1학기',
      selectCount: 1,
      credits: 2,
      description: '3학년 1학기 예술 선택 (택1, 2학점)',
      subjects: [
        { name: '음악 연주와 창작', semesters: [1] },
        { name: '미술 창작', semesters: [1] }
      ]
    },
    {
      id: '선택군6',
      grade: 3,
      semester: '1학기',
      selectCount: 1,
      credits: 3,
      description: '3학년 1학기 제2외국어/정보 (택1, 3학점)',
      subjects: [
        { name: '심화 일본어', semesters: [1] },
        { name: '관광 중국어', semesters: [1] },
        { name: '인공지능 기초', semesters: [1] }
      ]
    },
    {
      id: '선택군7',
      grade: 3,
      semester: '1학기',
      selectCount: 4,
      credits: 3,
      description: '3학년 1학기 교과(군) 간 선택 (택4, 12학점)',
      subjects: [
        { name: '주제 탐구 독서', semesters: [1] },
        { name: '미적분Ⅱ', semesters: [1] },
        { name: '심화 영어 독해와 작문', semesters: [1] },
        { name: '전자기와 양자', semesters: [1] },
        { name: '화학 반응의 세계', semesters: [1] },
        { name: '생물의 유전', semesters: [1] },
        { name: '행성우주과학', semesters: [1] },
        { name: '인문학과 윤리', semesters: [1] },
        { name: '도시의 미래 탐구', semesters: [1] },
        { name: '문화로 보는 한국사', semesters: [1] },
        { name: '경제', semesters: [1] }
      ]
    },
    {
      id: '선택군8',
      grade: 3,
      semester: '2학기',
      selectCount: 1,
      credits: 2,
      description: '3학년 2학기 예술 선택 (택1, 2학점)',
      subjects: [
        { name: '음악 감상과 비평', semesters: [2] },
        { name: '미술과 매체', semesters: [2] }
      ]
    },
    {
      id: '선택군9',
      grade: 3,
      semester: '2학기',
      selectCount: 1,
      credits: 2,
      description: '3학년 2학기 교양 선택 (택1, 2학점)',
      subjects: [
        { name: '진로와 직업', semesters: [2] },
        { name: '생태와 환경', semesters: [2] }
      ]
    },
    {
      id: '선택군10',
      grade: 3,
      semester: '2학기',
      selectCount: 1,
      credits: 3,
      description: '3학년 2학기 제2외국어/공학 선택 (택1, 3학점)',
      subjects: [
        { name: '일본 문화', semesters: [2] },
        { name: '중국 문화', semesters: [2] },
        { name: '창의 공학설계', semesters: [2] }
      ]
    },
    {
      id: '선택군11',
      grade: 3,
      semester: '2학기',
      selectCount: 4,
      credits: 3,
      description: '3학년 2학기 교과(군) 간 선택 (택4, 12학점)',
      subjects: [
        { name: '문학과 영상', semesters: [2] },
        { name: '전문 수학', semesters: [2] },
        { name: '미디어 영어', semesters: [2] },
        { name: '윤리문제 탐구', semesters: [2] },
        { name: '여행지리', semesters: [2] },
        { name: '역사로 탐구하는 현대 세계', semesters: [2] },
        { name: '금융과 경제생활', semesters: [2] },
        { name: '사회문제 탐구', semesters: [2] },
        { name: '정보과학', semesters: [2] }
      ]
    }
  ]
};

// 29. 성남외국어고등학교 (특목고 / 공립)
export const SEONGNAM_FL_CURRICULUM: SchoolCurriculum = {
  id: 'seongnam_fl',
  name: '성남외국어고등학교',
  shortName: '성남외고',
  typeBadge: '특목고',
  foundation: '공립',
  district: '분당구',
  location: '경기 성남시 분당구 백현동',
  year: '2027학년도 입학생 (2022 개정)',
  description: '영어·일본어·중국어·독일어 등 외국어 전공별 특화 교육과정을 운영하는 공립 특수목적고등학교로 전공별 상세 교육과정 편제표는 외부 링크(구글 스프레드시트)로 제공됩니다.',
  tags: ['특목고', '외고', '분당구', '국제·어문', '성남외고', '성남외국어고', '공립', '2022 개정'],
  mandatory: {
    1: [
      { name: '공통국어1', semesters: [1], credit: 3 },
      { name: '공통국어2', semesters: [2], credit: 3 },
      { name: '공통수학1', semesters: [1], credit: 3 },
      { name: '공통수학2', semesters: [2], credit: 3 },
      { name: '공통영어1', semesters: [1], credit: 3 },
      { name: '공통영어2', semesters: [2], credit: 3 },
      { name: '한국사1', semesters: [1], credit: 3 },
      { name: '한국사2', semesters: [2], credit: 3 },
      { name: '통합사회1', semesters: [1], credit: 3 },
      { name: '통합사회2', semesters: [2], credit: 3 },
      { name: '통합과학1', semesters: [1], credit: 3 },
      { name: '통합과학2', semesters: [2], credit: 3 },
      { name: '과학탐구실험1', semesters: [1], credit: 1 },
      { name: '과학탐구실험2', semesters: [2], credit: 1 },
      { name: '체육1', semesters: [1], credit: 2 },
      { name: '체육2', semesters: [2], credit: 2 }
    ],
    2: [
      { name: '문학', semesters: [1], credit: 3 },
      { name: '대수', semesters: [1], credit: 3 },
      { name: '스포츠 생활1', semesters: [1], credit: 2 },
      { name: '음악↔미술', semesters: [1, 2], credit: 3 },
      { name: '영미 문학 읽기↔인공지능 기초', semesters: [1, 2], credit: 3 },
      { name: '화법과 언어', semesters: [2], credit: 3 },
      { name: '미적분Ⅰ', semesters: [2], credit: 3 },
      { name: '스포츠 생활2', semesters: [2], credit: 2 }
    ],
    3: [
      { name: '독서와 작문', semesters: [1], credit: 3 },
      { name: '확률과 통계', semesters: [1], credit: 3 },
      { name: '스포츠 문화', semesters: [1], credit: 1 },
      { name: '인간과 심리', semesters: [1], credit: 2 },
      { name: '논리와 사고', semesters: [1], credit: 2 },
      { name: '독서 토론과 글쓰기', semesters: [2], credit: 3 },
      { name: '경제 수학', semesters: [2], credit: 3 },
      { name: '스포츠 과학', semesters: [2], credit: 1 },
      { name: '인간과 철학', semesters: [2], credit: 3 },
      { name: '논술', semesters: [2], credit: 3 }
    ]
  },
  groups: [],
  hasCurriculum: false,
  externalLink: 'https://docs.google.com/spreadsheets/d/1MwG1ZzWYLRdDaZNXVQoTfA9S0QhKJVZp/edit?gid=1199729268#gid=1199729268'
};

// 27. 성남고등학교 (자율형공립고)
export const SEONGNAM_HIGH_CURRICULUM: SchoolCurriculum = {
  id: 'seongnam',
  name: '성남고등학교',
  shortName: '성남고',
  typeBadge: '자율형공립고',
  district: '중원구',
  location: '경기 성남 중원구 시민로 61',
  year: '2027학년도 입학생 (2022 개정)',
  description: '2027학년도 성남고 공식 교육과정 편제표 (1학년 공통·학기제 교차 및 2·3학년 교과군 간 선택 192학점 체계)',
  tags: ['자율고', '중원구', '성남동', '성남고', '공식편제', '2022 개정'],
  mandatory: {
    1: [
      { name: '공통국어1', semesters: [1], credit: 4 },
      { name: '공통국어2', semesters: [2], credit: 4 },
      { name: '공통수학1', semesters: [1], credit: 4 },
      { name: '공통수학2', semesters: [2], credit: 4 },
      { name: '공통영어1', semesters: [1], credit: 4 },
      { name: '공통영어2', semesters: [2], credit: 4 },
      { name: '한국사1', semesters: [1], credit: 3 },
      { name: '한국사2', semesters: [2], credit: 3 },
      { name: '통합사회1', semesters: [1], credit: 4 },
      { name: '통합사회2', semesters: [2], credit: 4 },
      { name: '통합과학1', semesters: [1], credit: 4 },
      { name: '통합과학2', semesters: [2], credit: 4 },
      { name: '과학탐구실험1', semesters: [1], credit: 1 },
      { name: '과학탐구실험2', semesters: [2], credit: 1 },
      { name: '체육1', semesters: [1], credit: 2 },
      { name: '체육2', semesters: [2], credit: 2 },
      { name: '음악↔미술', semesters: [1, 2], credit: 3 }
    ],
    2: [
      { name: '문학', semesters: [1], credit: 4 },
      { name: '대수', semesters: [1], credit: 4 },
      { name: '영어Ⅰ', semesters: [1], credit: 4 },
      { name: '운동과 건강', semesters: [1], credit: 2 },
      { name: '화법과 언어', semesters: [2], credit: 4 },
      { name: '미적분Ⅰ', semesters: [2], credit: 4 },
      { name: '영어Ⅱ', semesters: [2], credit: 4 },
      { name: '스포츠 생활1', semesters: [2], credit: 2 }
    ],
    3: [
      { name: '독서와 작문', semesters: [1], credit: 4 },
      { name: '확률과 통계', semesters: [1], credit: 4 },
      { name: '영어 독해와 작문', semesters: [1], credit: 4 },
      { name: '스포츠 문화', semesters: [1], credit: 1 },
      { name: '독서 토론과 글쓰기', semesters: [2], credit: 4 },
      { name: '실용 통계', semesters: [2], credit: 4 },
      { name: '심화 영어', semesters: [2], credit: 4 },
      { name: '스포츠 과학', semesters: [2], credit: 1 }
    ]
  },
  groups: [
    {
      id: '선택군1',
      grade: 2,
      semester: '1학기',
      selectCount: 3,
      credits: 4,
      description: '2학년 1학기 교과(군) 간 선택 (택3, 과목당 4학점, 총 12학점)',
      subjects: [
        { name: '세계시민과 지리', semesters: [1] },
        { name: '세계사', semesters: [1] },
        { name: '사회와 문화', semesters: [1] },
        { name: '현대사회와 윤리', semesters: [1] },
        { name: '사회문제 탐구', semesters: [1] },
        { name: '물리학', semesters: [1] },
        { name: '화학', semesters: [1] },
        { name: '생명과학', semesters: [1] },
        { name: '지구과학', semesters: [1] },
        { name: '융합과학 탐구', semesters: [1] },
        { name: '프로그래밍', semesters: [1] }
      ]
    },
    {
      id: '선택군2',
      grade: 2,
      semester: '1학기',
      selectCount: 1,
      credits: 3,
      description: '2학년 1학기 외국어/정보 선택 (택1, 3학점)',
      subjects: [
        { name: '중국어', semesters: [1] },
        { name: '일본어', semesters: [1] },
        { name: '인공지능 기초', semesters: [1] }
      ]
    },
    {
      id: '선택군3',
      grade: 2,
      semester: '2학기',
      selectCount: 3,
      credits: 4,
      description: '2학년 2학기 교과(군) 간 선택 (택3, 과목당 4학점, 총 12학점)',
      subjects: [
        { name: '도시의 미래 탐구', semesters: [2] },
        { name: '동아시아 역사 기행', semesters: [2] },
        { name: '법과 사회', semesters: [2] },
        { name: '윤리와 사상', semesters: [2] },
        { name: '역학과 에너지', semesters: [2] },
        { name: '물질과 에너지', semesters: [2] },
        { name: '세포와 물질대사', semesters: [2] },
        { name: '지구시스템과학', semesters: [2] },
        { name: '기하', semesters: [2] },
        { name: '사물 인터넷과 센서 제어', semesters: [2] }
      ]
    },
    {
      id: '선택군4',
      grade: 2,
      semester: '2학기',
      selectCount: 1,
      credits: 3,
      description: '2학년 2학기 정보/외국어 선택 (택1, 3학점)',
      subjects: [
        { name: '데이터 과학', semesters: [2] },
        { name: '중국 문화', semesters: [2] },
        { name: '일본 문화', semesters: [2] }
      ]
    },
    {
      id: '선택군5',
      grade: 3,
      semester: '1학기',
      selectCount: 3,
      credits: 4,
      description: '3학년 1학기 교과(군) 간 선택 (택3, 과목당 4학점, 총 12학점)',
      subjects: [
        { name: '문학과 영상', semesters: [1] },
        { name: '미적분Ⅱ', semesters: [1] },
        { name: '경제 수학', semesters: [1] },
        { name: '인공지능 수학', semesters: [1] },
        { name: '심화 영어 독해와 작문', semesters: [1] },
        { name: '한국지리 탐구', semesters: [1] },
        { name: '경제', semesters: [1] },
        { name: '인문학과 윤리', semesters: [1] },
        { name: '국제 관계의 이해', semesters: [1] },
        { name: '역사 과제연구', semesters: [1] },
        { name: '전자기와 양자', semesters: [1] },
        { name: '화학 반응의 세계', semesters: [1] },
        { name: '생물의 유전', semesters: [1] },
        { name: '행성우주과학', semesters: [1] },
        { name: '과학과제 연구', semesters: [1] },
        { name: '물리학 실험', semesters: [1] },
        { name: '생명과학 실험', semesters: [1] },
        { name: '중국어 회화', semesters: [1] },
        { name: '일본어 회화', semesters: [1] },
        { name: '디지털 논리 회로', semesters: [1] },
        { name: '교육의 이해', semesters: [1] }
      ]
    },
    {
      id: '선택군6',
      grade: 3,
      semester: '1학기',
      selectCount: 1,
      credits: 3,
      description: '3학년 1학기 예술 선택 (택1, 3학점)',
      subjects: [
        { name: '음악 연주와 창작', semesters: [1] },
        { name: '미술 창작', semesters: [1] }
      ]
    },
    {
      id: '선택군7',
      grade: 3,
      semester: '2학기',
      selectCount: 3,
      credits: 5,
      description: '3학년 2학기 교과(군) 간 선택 (택3, 과목당 5학점, 총 15학점)',
      subjects: [
        { name: '독서 토론과 글쓰기', semesters: [2] },
        { name: '매체 의사소통', semesters: [2] },
        { name: '수학과 문화', semesters: [2] },
        { name: '세계 문화와 영어', semesters: [2] },
        { name: '여행지리', semesters: [2] },
        { name: '역사로 탐구하는 현대 세계', semesters: [2] },
        { name: '금융과 경제생활', semesters: [2] },
        { name: '윤리문제 탐구', semesters: [2] },
        { name: '기후변화와 지속가능한 세계', semesters: [2] },
        { name: '과학의 역사와 문화', semesters: [2] },
        { name: '기후변화와 환경생태', semesters: [2] },
        { name: '심화 중국어', semesters: [2] },
        { name: '심화 일본어', semesters: [2] },
        { name: '컴퓨터 네트워크', semesters: [2] },
        { name: '인간과 심리', semesters: [2] }
      ]
    },
    {
      id: '선택군8',
      grade: 3,
      semester: '2학기',
      selectCount: 1,
      credits: 3,
      description: '3학년 2학기 예술 선택 (택1, 3학점)',
      subjects: [
        { name: '음악 감상과 비평', semesters: [2] },
        { name: '미술 감상과 비평', semesters: [2] }
      ]
    }
  ]
};

// Helper function to get district of a school
export const getSchoolDistrict = (school: SchoolCurriculum): string => {
  if (school.district) return school.district;
  if (school.location.includes('분당')) return '분당구';
  if (school.location.includes('수정')) return '수정구';
  if (school.location.includes('중원')) return '중원구';
  return '기타';
};

// Schools verified with 100% official PDF uploaded by user
export const PDF_VERIFIED_SCHOOL_IDS = new Set<string>([
  'bundang',
  'bopyeong',
  'sunae',
  'bundang_daejin',
  'sungshin',
  'naksaeng',
  'dolma',
  'imae',
  'seohyeon',
  'neulblue',
  'eewoo',
  'pangyo',
  'yatap',
  'seongnam_girls',
  'hyosung',
  'hansol',
  'bokjeong',
  'pungsaeng',
  'taewon',
  'songrim',
  'bundang_jungang',
  'bulgok',
  'donggwang',
  'sungil',
  'seongnam',
  'bundang_yeongdeok',
  'unjung',
  'wirye_hanbit'
]);

// Helper to normalize any SchoolCurriculum (mandatory and groups) for seamless rendering
export const normalizeSchoolCurriculum = (school: SchoolCurriculum): SchoolCurriculum => {
  if (!school) return school;
  
  // Normalize mandatory: ensure school.mandatory[1], school.mandatory[2] and school.mandatory[3] exist with correct format
  const mandatory: Record<number | string, any> = { ...school.mandatory };
  [1, 2, 3].forEach(grade => {
    if (!mandatory[grade] || !Array.isArray(mandatory[grade]) || mandatory[grade].length === 0) {
      // Find keys like '1학년 1학기', '1학년 2학기' or '1-1', '1-2'
      const sem1Key = Object.keys(mandatory).find(k => k.includes(`${grade}학년`) && k.includes('1학기')) ||
                      Object.keys(mandatory).find(k => k.includes(`${grade}-1`));
      const sem2Key = Object.keys(mandatory).find(k => k.includes(`${grade}학년`) && k.includes('2학기')) ||
                      Object.keys(mandatory).find(k => k.includes(`${grade}-2`));
      const sem1List: any[] = sem1Key ? mandatory[sem1Key] || [] : [];
      const sem2List: any[] = sem2Key ? mandatory[sem2Key] || [] : [];
      
      const map = new Map<string, number[]>();
      sem1List.forEach(s => {
        if (!s || !s.name) return;
        const list = map.get(s.name) || [];
        if (!list.includes(1)) list.push(1);
        map.set(s.name, list);
      });
      sem2List.forEach(s => {
        if (!s || !s.name) return;
        const list = map.get(s.name) || [];
        if (!list.includes(2)) list.push(2);
        map.set(s.name, list);
      });
      
      if (map.size > 0) {
        mandatory[grade] = Array.from(map.entries()).map(([name, semesters]) => ({
          name,
          semesters
        }));
      }
    }

    // 1학기 과목 쭉 나오고, 2학기 과목 쭉 나오는 순서로 정렬 (1학기 전용 -> 양학기/교차 -> 2학기 전용)
    if (Array.isArray(mandatory[grade])) {
      const list = mandatory[grade];
      const sem1 = list.filter((s: any) => s && s.semesters?.includes(1) && !s.semesters?.includes(2));
      const both = list.filter((s: any) => s && s.semesters?.includes(1) && s.semesters?.includes(2));
      const sem2 = list.filter((s: any) => s && !s.semesters?.includes(1) && s.semesters?.includes(2));
      const others = list.filter((s: any) => s && !s.semesters?.includes(1) && !s.semesters?.includes(2));
      mandatory[grade] = [...sem1, ...both, ...sem2, ...others];
    }
  });

  // Normalize groups: ensure grade, semester, description exist!
  const groups = (school.groups || []).map((g) => {
    let gradeNum = g.grade;
    if (!gradeNum) {
      if (typeof g.targetGrade === 'number') gradeNum = g.targetGrade;
      else if (typeof g.targetGrade === 'string') {
        const parsed = parseInt(g.targetGrade.replace(/[^0-9]/g, ''), 10);
        if (!isNaN(parsed)) gradeNum = parsed;
      }
    }
    if (!gradeNum && g.name) {
      if (g.name.includes('2학년')) gradeNum = 2;
      else if (g.name.includes('3학년')) gradeNum = 3;
    }
    if (!gradeNum && g.description) {
      if (g.description.includes('2학년')) gradeNum = 2;
      else if (g.description.includes('3학년')) gradeNum = 3;
    }
    if (!gradeNum) gradeNum = 2;

    let semester = g.semester;
    if (!semester) {
      const text = `${g.name || ''} ${g.description || ''}`;
      if (text.includes('1학기')) semester = '1학기';
      else if (text.includes('2학기')) semester = '2학기';
      else semester = '전체';
    }

    const description = g.description || g.name || `${gradeNum}학년 ${semester} 선택과목군 [택${g.selectCount}]`;

    return {
      ...g,
      grade: gradeNum,
      semester,
      description
    };
  });

  return {
    ...school,
    mandatory,
    groups
  };
};

/**
 * 1학년 공통과목의 학점수를 반환하는 헬퍼 함수
 * 명시적 credit 속성이 없을 경우 2022 개정 교육과정 기준 학점 자동 추론
 */
export const getGrade1SubjectCredit = (subject: { name: string; credit?: number }): number => {
  if (typeof subject.credit === 'number' && subject.credit > 0) {
    return subject.credit;
  }
  const clean = subject.name.replace(/\s+/g, '');
  if (clean.includes('공통국어') || clean.includes('공통수학') || clean.includes('공통영어') || clean.includes('통합사회') || clean.includes('통합과학')) return 4;
  if (clean.includes('한국사')) return 3;
  if (clean.includes('과학탐구실험')) return 1;
  if (clean.includes('체육') || clean.includes('스포츠') || clean.includes('운동')) return (clean.includes('문화') || clean.includes('과학')) ? 1 : 2;
  if (clean.includes('음악') || clean.includes('미술') || clean.includes('정보') || clean.includes('기술·가정') || clean.includes('생활과학')) return 3;
  if (clean.includes('학문의기초와융합')) return 2;
  return 4;
};

export const getMandatorySubjectCredit = (subject: { name: string; credit?: number }, _grade?: number): number => {
  if (typeof subject.credit === 'number' && subject.credit > 0) {
    return subject.credit;
  }
  const clean = subject.name.replace(/\s+/g, '');
  if (clean.includes('공통국어') || clean.includes('공통수학') || clean.includes('공통영어') || clean.includes('통합사회') || clean.includes('통합과학')) return 4;
  if (clean.includes('한국사')) return 3;
  if (clean.includes('과학탐구실험')) return 1;
  if (clean.includes('체육') || clean.includes('스포츠') || clean.includes('운동')) return (clean.includes('문화') || clean.includes('과학')) ? 1 : 2;
  if (clean.includes('음악') || clean.includes('미술') || clean.includes('정보') || clean.includes('기술·가정') || clean.includes('생활과학')) return 3;
  if (clean.includes('학문의기초와융합')) return 2;
  if (clean.includes('문학') || clean.includes('독서') || clean.includes('대수') || clean.includes('미적분') || clean.includes('확률') || clean.includes('영어') || clean.includes('화법') || clean.includes('통계') || clean.includes('탐구') || clean.includes('수학')) return 4;
  return 4;
};

// 28. 성보경영고등학교 (특성화고 / 사립)
export const SEONGBO_HIGH_CURRICULUM: SchoolCurriculum = {
  id: 'seongbo',
  name: '성보경영고등학교',
  shortName: '성보경영고',
  typeBadge: '특성화고',
  foundation: '사립',
  district: '수정구',
  location: '경기 성남 수정구 논골로 82',
  year: '2027학년도 입학생 (2022 개정)',
  description: '보건간호과, 제과제빵과, 비주얼디자인과, 외식조리경영과 등 8개 특성화 전문학과를 운영하는 사립 특성화고등학교로 일반계고 선택과목 편제표 대상이 아닙니다.',
  tags: ['특성화고', '수정구', '성보경영고', '사립', '2022 개정'],
  mandatory: { 2: [], 3: [] },
  groups: [],
  hasCurriculum: false
};

// 29. 성남테크노과학고등학교 (특성화고 / 공립)
export const SEONGNAM_TECHNO_CURRICULUM: SchoolCurriculum = {
  id: 'seongnam_techno',
  name: '성남테크노과학고등학교',
  shortName: '성남테크노과학고',
  typeBadge: '특성화고',
  foundation: '공립',
  district: '중원구',
  location: '경기 성남시 중원구 금상로 134',
  year: '2027학년도 입학생 (2022 개정)',
  description: '전기전자, 스마트전자, 기계IT 등 첨단 미래 기술 인재를 양성하는 공립 특성화고등학교로 일반계고 선택과목 편제표 대상이 아닙니다.',
  tags: ['특성화고', '중원구', '성남테크노과학고', '공립', '2022 개정'],
  mandatory: { 2: [], 3: [] },
  groups: [],
  hasCurriculum: false
};

// 30. 성일정보고등학교 (특성화고 / 사립)
export const SUNGIL_INFO_CURRICULUM: SchoolCurriculum = {
  id: 'sungil_info',
  name: '성일정보고등학교',
  shortName: '성일정보고',
  typeBadge: '특성화고',
  foundation: '사립',
  district: '중원구',
  location: '경기 성남시 중원구 시민로 77',
  year: '2027학년도 입학생 (2022 개정)',
  description: '소프트웨어개발, 정보보안, 금융비즈니스 등 디지털 미래 인재를 양성하는 사립 특성화고등학교로 일반계고 선택과목 편제표 대상이 아닙니다.',
  tags: ['특성화고', '중원구', '성일정보고', '사립', '2022 개정'],
  mandatory: { 2: [], 3: [] },
  groups: [],
  hasCurriculum: false
};

// 31. 계원예술고등학교 (예술고 / 사립)
export const KAYWON_HIGH_CURRICULUM: SchoolCurriculum = {
  id: 'kaywon',
  name: '계원예술고등학교',
  shortName: '계원예술고',
  typeBadge: '예술고',
  foundation: '사립',
  district: '분당구',
  location: '경기 성남시 분당구 불정로 257',
  year: '2027학년도 입학생 (2022 개정)',
  description: '음악, 미술, 무용, 연극영화 등 예술 분야 전문 인재를 양성하는 사립 예술고등학교로 전공별 특화 교육과정을 운영합니다.',
  tags: ['예술고', '분당구', '계원예술고', '계원예고', '사립', '2022 개정'],
  mandatory: { 2: [], 3: [] },
  groups: [],
  hasCurriculum: false,
  externalLink: 'https://docs.google.com/spreadsheets/d/10Eg4xNqRnM38obns-OndbrQeyeGPRVTc/edit?usp=drive_link&ouid=115956131830918785013&rtpof=true&sd=true'
};

// 32. 분당경영고등학교 (특성화고 / 공립)
export const BUNDANG_MGT_CURRICULUM: SchoolCurriculum = {
  id: 'bundang_mgt',
  name: '분당경영고등학교',
  shortName: '분당경영고',
  typeBadge: '특성화고',
  foundation: '공립',
  district: '분당구',
  location: '경기 성남시 분당구 금곡로 7',
  year: '2027학년도 입학생 (2022 개정)',
  description: '경영, 회계, IT디자인, 스마트소프트웨어 등 미래 실무 인재를 양성하는 공립 특성화고등학교로 일반계고 선택과목 편제표 대상이 아닙니다.',
  tags: ['특성화고', '분당구', '분당경영고', '공립', '2022 개정'],
  mandatory: { 2: [], 3: [] },
  groups: [],
  hasCurriculum: false
};

// 33. 분당아람고등학교 (특성화고 / 공립)
export const BUNDANG_ARAM_CURRICULUM: SchoolCurriculum = {
  id: 'bundang_aram',
  name: '분당아람고등학교',
  shortName: '분당아람고',
  typeBadge: '특성화고',
  foundation: '공립',
  district: '분당구',
  location: '경기 성남시 분당구 야탑로 235',
  year: '2027학년도 입학생 (2022 개정)',
  description: '스마트소프트웨어, 베이커리경영, 호텔관광 등 실무 중심 직업교육을 선도하는 공립 특성화고등학교로 일반계고 선택과목 편제표 대상이 아닙니다.',
  tags: ['특성화고', '분당구', '분당아람고', '공립', '2022 개정'],
  mandatory: { 2: [], 3: [] },
  groups: [],
  hasCurriculum: false
};

// 34. 양영디지털고등학교 (특성화고 / 공립)
export const YANGYOUNG_DIGITAL_CURRICULUM: SchoolCurriculum = {
  id: 'yangyoung_digital',
  name: '양영디지털고등학교',
  shortName: '양영디지털고',
  typeBadge: '특성화고',
  foundation: '공립',
  district: '분당구',
  location: '경기 성남시 분당구 서현로 180번길 39',
  year: '2027학년도 입학생 (2022 개정)',
  description: '전자, 반도체, 정보통신, IT소프트웨어 등 첨단 디지털 기술 명장을 육성하는 공립 특성화고등학교로 일반계고 선택과목 편제표 대상이 아닙니다.',
  tags: ['특성화고', '분당구', '양영디지털고', '양영고', '공립', '2022 개정'],
  mandatory: { 2: [], 3: [] },
  groups: [],
  hasCurriculum: false
};

// 일반계고 선택과목 편제표가 제공되지 않는 특성화고 및 예술고 (클릭 비활성화 대상)
export const NO_CURRICULUM_SCHOOL_IDS = new Set<string>([
  'seongbo',
  'seongnam_techno',
  'sungil_info',
  'kaywon',
  'seongnam_fl',
  'bundang_mgt',
  'bundang_aram',
  'yangyoung_digital'
]);

export const isNoCurriculumSchool = (schoolOrId: string | SchoolCurriculum): boolean => {
  if (!schoolOrId) return false;
  const id = typeof schoolOrId === 'string' ? schoolOrId : schoolOrId.id;
  return NO_CURRICULUM_SCHOOL_IDS.has(id);
};

// All high schools in Seongnam grouped by district (fully normalized, 36개교 가나다 오름차순 정렬)
const RAW_SEONGNAM_SCHOOLS: SchoolCurriculum[] = [
  // 1. 분당구 (24개교: 계원예술고, 낙생고, 늘푸른고, 돌마고, 보평고, 분당경영고, 분당고, 분당대진고, 분당아람고, 분당영덕여고, 분당중앙고, 불곡고, 서현고, 성남외국어고, 송림고, 수내고, 야탑고, 양영디지털고, 운중고, 이매고, 이우고, 태원고, 판교고, 한솔고)
  KAYWON_HIGH_CURRICULUM,
  NAKSAENG_HIGH_CURRICULUM,
  NEULBLUE_HIGH_CURRICULUM,
  DOLMA_HIGH_CURRICULUM,
  BOPYEONG_HIGH_CURRICULUM,
  BUNDANG_MGT_CURRICULUM,
  BUNDANG_HIGH_CURRICULUM,
  BUNDANG_DAEJIN_CURRICULUM,
  BUNDANG_ARAM_CURRICULUM,
  BUNDANG_YEONGDEOK_CURRICULUM,
  BUNDANG_JUNGANG_CURRICULUM,
  BULGOK_HIGH_CURRICULUM,
  SEOHYEON_HIGH_CURRICULUM,
  SEONGNAM_FL_CURRICULUM,
  SONGRIM_HIGH_CURRICULUM,
  SUNAE_HIGH_CURRICULUM,
  YATAP_HIGH_CURRICULUM,
  YANGYOUNG_DIGITAL_CURRICULUM,
  UNJUNG_HIGH_CURRICULUM,
  IMAE_HIGH_CURRICULUM,
  EEWOO_HIGH_CURRICULUM,
  TAEWON_HIGH_CURRICULUM,
  PANGYO_HIGH_CURRICULUM,
  HANSOL_HIGH_CURRICULUM,

  // 2. 수정구 (5개교: 복정고, 성보경영고, 위례한빛고, 풍생고, 효성고)
  BOKJEONG_HIGH_CURRICULUM,
  SEONGBO_HIGH_CURRICULUM,
  WIRYE_HANBIT_CURRICULUM,
  PUNGSAENG_HIGH_CURRICULUM,
  HYOSUNG_HIGH_CURRICULUM,

  // 3. 중원구 (7개교: 동광고, 성남고, 성남여고, 성남테크노과학고, 성일고, 성일정보고, 숭신고)
  DONGGWANG_HIGH_CURRICULUM,
  SEONGNAM_HIGH_CURRICULUM,
  SEONGNAM_GIRLS_CURRICULUM,
  SEONGNAM_TECHNO_CURRICULUM,
  SUNGIL_HIGH_CURRICULUM,
  SUNGIL_INFO_CURRICULUM,
  SUNGSHIN_CURRICULUM
];

// 2027학년도 입학생 교육과정 편성표(PDF) 기준 편제로 교체 (학점은 표의 학기 칸 숫자 기준)
const applyPdfCurriculum = (school: SchoolCurriculum): SchoolCurriculum => {
  const pdf = PDF_CURRICULA[school.id];
  if (!pdf) return school;
  return { ...school, mandatory: pdf.mandatory, groups: pdf.groups };
};

export const ALL_SEONGNAM_SCHOOLS: SchoolCurriculum[] = RAW_SEONGNAM_SCHOOLS.map(applyPdfCurriculum).map(normalizeSchoolCurriculum);
export const INITIAL_SCHOOLS: SchoolCurriculum[] = ALL_SEONGNAM_SCHOOLS;

// 사립 고등학교 목록 (공립 / 사립 구분)
const PRIVATE_SCHOOL_IDS = new Set([
  'bundang_daejin',
  'naksaeng',
  'taewon',
  'songrim',
  'yatap',
  'eewoo',
  'bundang_yeongdeok',
  'hyosung',
  'seongbo',
  'pungsaeng',
  'sungshin',
  'donggwang',
  'sungil',
  'sungil_info',
  'kaywon'
]);

export const getSchoolFoundation = (school: SchoolCurriculum): '공립' | '사립' => {
  if (school.foundation === '공립' || school.foundation === '사립') {
    return school.foundation;
  }
  return PRIVATE_SCHOOL_IDS.has(school.id) ? '사립' : '공립';
};

export interface SchoolLinks {
  homepage?: string;
  alimi?: string;
  status26?: string;
}

// 성남시 관내 고등학교 외부 연동 링크 (홈페이지, 학교 알리미, 2026 교육과정 운영 현황)
export const SEONGNAM_SCHOOL_LINKS: Record<string, SchoolLinks> = {
  // === 분당구 (24개교) ===
  kaywon: {
    homepage: 'http://www.kaywon.hs.kr',
    alimi: 'https://www.schoolinfo.go.kr/ei/ss/Pneiss_b01_s0.do?SHL_IDF_CD=c9cde1fd-833a-4505-9954-ddc76971a532',
    status26: 'https://docs.google.com/spreadsheets/d/10Eg4xNqRnM38obns-OndbrQeyeGPRVTc/edit?usp=drive_link&ouid=115956131830918785013&rtpof=true&sd=true'
  },
  naksaeng: {
    homepage: 'https://naksaeng-h.goesn.kr',
    alimi: 'https://www.schoolinfo.go.kr/ei/ss/Pneiss_b01_s0.do?SHL_IDF_CD=3389f914-f033-4124-8a74-1a8925c19179',
    status26: 'https://drive.google.com/file/d/1Xrn7VfZTJDLVNCfQrFF8VUmIW5d97u-B/view'
  },
  neulblue: {
    homepage: 'https://npr-h.goesn.kr',
    alimi: 'https://www.schoolinfo.go.kr/ei/ss/Pneiss_b01_s0.do?SHL_IDF_CD=e6d71f36-ee3a-4e6b-ac71-9ed56f848d3c',
    status26: 'https://drive.google.com/file/d/1AN5PwHPUsWhpeyT6mCCVuvGxFPy32sGc/view'
  },
  dolma: {
    homepage: 'https://dolma-h.goesn.kr/dolma-h/main.do',
    alimi: 'https://www.schoolinfo.go.kr/ei/ss/Pneiss_b01_s0.do?SHL_IDF_CD=16241a82-89b7-46cd-b8bb-da898eb4ab96',
    status26: 'https://drive.google.com/file/d/1UjPe3GIstuLf3PSpVquu8rdzj834ym1g/view'
  },
  bopyeong: {
    homepage: 'http://bopyung-h.goesn.kr',
    alimi: 'https://www.schoolinfo.go.kr/ei/ss/Pneiss_b01_s0.do?SHL_IDF_CD=8f5b5596-169a-4804-b502-76a9cca4910d',
    status26: 'https://drive.google.com/file/d/1ZWaSXg3_c1jbnt5-4Lgp45-h7wCmq-Cs/view'
  },
  bundang_mgt: {
    homepage: 'https://bundangmgt-h.goesn.kr/',
    alimi: 'https://www.schoolinfo.go.kr/ei/ss/Pneiss_b01_s0.do?SHL_IDF_CD=a397cadd-74f5-4458-8490-498fec728207',
    status26: 'https://drive.google.com/file/d/1yr3Vz5zHSg_ZnSWfqPAMHh8wWW3tufID/view'
  },
  bundang: {
    homepage: 'https://bundang-h.goesn.kr/',
    alimi: 'https://www.schoolinfo.go.kr/ei/ss/Pneiss_b01_s0.do?SHL_IDF_CD=84305648-c09d-4233-ba25-e607c561435b',
    status26: 'https://drive.google.com/file/d/1YKmvETs04W8lJ206ut9AlxN1JGrY0tHh/view'
  },
  bundang_daejin: {
    homepage: 'https://bdj-h.goesn.kr/',
    alimi: 'https://www.schoolinfo.go.kr/ei/ss/Pneiss_b01_s0.do?SHL_IDF_CD=aa17077c-ee3a-4cf9-93ce-d99af3173193',
    status26: 'https://drive.google.com/file/d/1F_TCgAF2Oex6cnx-TThRhw8KON3HuELy/view'
  },
  bundang_aram: {
    homepage: 'https://bdar-h.goesn.kr',
    alimi: 'https://www.schoolinfo.go.kr/ei/ss/Pneiss_b01_s0.do?SHL_IDF_CD=a736e7ee-ceb4-4492-83bd-4b1d896ec309',
    status26: 'https://drive.google.com/file/d/1WiRTmgyMExKRG3fv8OvoQ-4q2cTCcZ3l/view'
  },
  bundang_yeongdeok: {
    homepage: 'http://bdyoungduk-h.goesn.kr',
    alimi: 'https://www.schoolinfo.go.kr/ei/ss/Pneiss_b01_s0.do?SHL_IDF_CD=e6bfc12c-404f-4458-bb85-f373e1089961',
    status26: 'https://drive.google.com/file/d/1_uyPatHiZss37AA40zYDqzKhis3R5Mji/view'
  },
  bundang_jungang: {
    homepage: 'https://bdja-h.goesn.kr',
    alimi: 'https://www.schoolinfo.go.kr/ei/ss/Pneiss_b01_s0.do?SHL_IDF_CD=a6321289-68ed-4231-b1bb-b57931ce5fc0',
    status26: 'https://drive.google.com/file/d/1EGg7vmjm6K548sOfV1582RKIjSqdadi7/view'
  },
  bulgok: {
    homepage: 'http://bulgok-h.goesn.kr',
    alimi: 'https://www.schoolinfo.go.kr/ei/ss/Pneiss_b01_s0.do?SHL_IDF_CD=9544070f-7acb-4d0c-a7cd-7a17a8a3e2cb',
    status26: 'https://drive.google.com/file/d/1b_F6Jwd6n4uHECfyhtk6aSv5yxxterMb/view'
  },
  seohyeon: {
    homepage: 'https://seohyun-h.goesn.kr/',
    alimi: 'https://www.schoolinfo.go.kr/ei/ss/Pneiss_b01_s0.do?SHL_IDF_CD=25e247dd-f559-423c-a63a-825c2b37e5a2',
    status26: 'https://drive.google.com/file/d/1Ov_kg3bEH8VNQ2xKCp3oZ-k8iRANWIjj/view'
  },
  seongnam_fl: {
    homepage: 'https://snfl-h.goesn.kr',
    alimi: 'https://www.schoolinfo.go.kr/ei/ss/Pneiss_b01_s0.do?SHL_IDF_CD=6c91c4af-ba5c-4ffe-9de9-af7b7d4f2825',
    status26: 'https://docs.google.com/spreadsheets/d/1MwG1ZzWYLRdDaZNXVQoTfA9S0QhKJVZp/edit?gid=1199729268#gid=1199729268'
  },
  songrim: {
    homepage: 'https://songlim-h.goesn.kr/songlim-h/main.do',
    alimi: 'https://www.schoolinfo.go.kr/ei/ss/Pneiss_b01_s0.do?SHL_IDF_CD=29c2345b-f96d-4a7e-a709-a70c40ff0c1e',
    status26: 'https://drive.google.com/file/d/1893uHIC7_9ac6GbYa-8N8tlA6CBpM0eb/view'
  },
  sunae: {
    homepage: 'http://sunae-h.goesn.kr',
    alimi: 'https://www.schoolinfo.go.kr/ei/ss/Pneiss_b01_s0.do?SHL_IDF_CD=85c72e46-942b-459e-8ff1-0da2b093dcfc',
    status26: 'https://drive.google.com/file/d/13-scayfK3pZDCsoJfvVd0a6wgFYZIVgO/view'
  },
  yatap: {
    homepage: 'https://yatap-h.goesn.kr/',
    alimi: 'https://www.schoolinfo.go.kr/ei/ss/Pneiss_b01_s0.do?SHL_IDF_CD=bb4c9b9d-9085-4f67-b42b-37257f463caf',
    status26: 'https://drive.google.com/file/d/1vkQfobWO0LbluFjFYi5sY0XQUtWLFmoq/view'
  },
  yangyoung_digital: {
    homepage: 'http://yy-h.goesn.kr',
    alimi: 'https://www.schoolinfo.go.kr/ei/ss/Pneiss_b01_s0.do?SHL_IDF_CD=f7a4acfb-afcc-4e55-91db-4938cfb7ffdb',
    status26: 'https://drive.google.com/file/d/11y8gy5a9GR1O5cdgtrhCOcHxuJIs6sco/view'
  },
  unjung: {
    homepage: 'https://unjung.hs.kr/',
    alimi: 'https://www.schoolinfo.go.kr/ei/ss/Pneiss_b01_s0.do?SHL_IDF_CD=27db6cc9-3528-4ccc-9a5d-980f9d777e99',
    status26: 'https://drive.google.com/file/d/1BECnTshx9pikqBoH-pXRYf12PTZPvmyP/view'
  },
  imae: {
    homepage: 'http://imae-h.goesn.kr',
    alimi: 'https://www.schoolinfo.go.kr/ei/ss/Pneiss_b01_s0.do?SHL_IDF_CD=744656cb-39a0-4269-b10b-1ae7ec9e2703',
    status26: 'https://drive.google.com/file/d/1Q9s9oZUKMN1oOlHFSduDUU1jwJSCoxKW/view'
  },
  eewoo: {
    homepage: 'https://ewoo-mh.goesn.kr/',
    alimi: 'https://www.schoolinfo.go.kr/ei/ss/Pneiss_b01_s0.do?SHL_IDF_CD=58b6eb5c-1db8-43cd-9619-596d9d326f1e',
    status26: 'https://drive.google.com/file/d/1fqZ-I3vE39yopEgqfwMI4Q8y2SV2D_kp/view'
  },
  taewon: {
    homepage: 'https://taewon-h.goesn.kr',
    alimi: 'https://www.schoolinfo.go.kr/ei/ss/Pneiss_b01_s0.do?SHL_IDF_CD=fe182b03-45de-4376-a3ed-faae35252931',
    status26: 'https://drive.google.com/file/d/1PPKfVXanhSGoMZAChxDAMsHLfDj5lEi_/view'
  },
  pangyo: {
    homepage: 'https://pangyo-h.goesn.kr/pangyo-h/main.do',
    alimi: 'https://www.schoolinfo.go.kr/ei/ss/Pneiss_b01_s0.do?SHL_IDF_CD=a2aa66b0-1f2f-4fcd-afd8-f1237a481ee5',
    status26: 'https://drive.google.com/file/d/12UKwYWMYE8ZG7y4H3xCRr0DZ7lBaZU7J/view'
  },
  hansol: {
    homepage: 'http://www.hansol.hs.kr',
    alimi: 'https://www.schoolinfo.go.kr/ei/ss/Pneiss_b01_s0.do?SHL_IDF_CD=0925c336-fad3-41be-a5c4-981a9e6c644c',
    status26: 'https://drive.google.com/file/d/1r73F9BTAzAYxZnVAK-pDlu5dw3q8YXN9/view'
  },

  // === 수정구 (5개교) ===
  bokjeong: {
    homepage: 'https://bokjeong-h.goesn.kr',
    alimi: 'https://www.schoolinfo.go.kr/ei/ss/Pneiss_b01_s0.do?SHL_IDF_CD=9536155f-2bf0-41f4-9a08-7d16e3207d55',
    status26: 'https://drive.google.com/file/d/12-y7ohUFVNN2oyZKPd9OaNgz-H8swQ19/view'
  },
  seongbo: {
    homepage: 'http://seongbo-h.goesn.kr',
    alimi: 'https://www.schoolinfo.go.kr/ei/ss/Pneiss_b01_s0.do?SHL_IDF_CD=d7d9fb18-e869-4214-bc62-a71fa86baf4a',
    status26: 'https://drive.google.com/file/d/1RWEp-B9yA9mOnWMz2NTWf9PVXwc9mKJI/view'
  },
  wirye_hanbit: {
    homepage: 'https://wiryehanbit-h.goesn.kr',
    alimi: 'https://www.schoolinfo.go.kr/ei/ss/Pneiss_b01_s0.do?SHL_IDF_CD=0b715b78-cbda-4d57-ad77-40f60fa1a262',
    status26: 'https://drive.google.com/file/d/1bQazTjPQAXXCySbf-QjJCgBhpYMn2Dw0/view'
  },
  pungsaeng: {
    homepage: 'https://ps.hs.kr',
    alimi: 'https://www.schoolinfo.go.kr/ei/ss/Pneiss_b01_s0.do?SHL_IDF_CD=d6b44f7a-cc3f-47b0-ad0d-5d7b4cf4f3f7',
    status26: 'https://drive.google.com/file/d/1bSdkpSuk6LxLSZbMy2bHjtkqq2SEANH1/view'
  },
  hyosung: {
    homepage: 'https://hyosung-h.goesn.kr',
    alimi: 'https://www.schoolinfo.go.kr/ei/ss/Pneiss_b01_s0.do?SHL_IDF_CD=b799cf3d-b8b0-4899-9aa4-8d474b769134',
    status26: 'https://drive.google.com/file/d/1blVtAP0p9Kow-ZoDn7oN7tyjbxrMTitn/view'
  },

  // === 중원구 (7개교) ===
  donggwang: {
    homepage: 'http://donggwang-h.goesn.kr',
    alimi: 'https://www.schoolinfo.go.kr/ei/ss/Pneiss_b01_s0.do?SHL_IDF_CD=7ed5e812-691f-4057-be4f-970fee0c8f37',
    status26: 'https://drive.google.com/file/d/1XJ4Qg7bzyh91QAVTiaP7ZPSp6yOw_lH8/view'
  },
  seongnam: {
    homepage: 'https://seongnam-h.goesn.kr',
    alimi: 'https://www.schoolinfo.go.kr/ei/ss/Pneiss_b01_s0.do?SHL_IDF_CD=030bbe42-9928-49d1-8064-1b2899654d7c',
    status26: 'https://drive.google.com/file/d/1q-q74Zt_2D_Qhox6RMtHCl9MPP6F35o3/view'
  },
  seongnam_girls: {
    homepage: 'http://seongnamgs-h.goesn.kr',
    alimi: 'https://www.schoolinfo.go.kr/ei/ss/Pneiss_b01_s0.do?SHL_IDF_CD=06483188-267f-4dcc-8ae6-85034d621290',
    status26: 'https://drive.google.com/file/d/1Lj95CVz2mSUFkUAilw3lBK9f4NgoH3D7/view'
  },
  seongnam_techno: {
    homepage: 'https://sts-h.goesn.kr/sts-h/main.do',
    alimi: 'https://www.schoolinfo.go.kr/ei/ss/Pneiss_b01_s0.do?SHL_IDF_CD=fbdaf249-d7c9-475d-affe-e1b1ec19418e',
    status26: 'https://drive.google.com/file/d/1GZ-5JCefBIgKG6mFC8s8DVqWe0D3YNuE/view'
  },
  sungil: {
    homepage: 'https://sungil-h.goesn.kr/sungil-h/main.do',
    alimi: 'https://www.schoolinfo.go.kr/ei/ss/Pneiss_b01_s0.do?SHL_IDF_CD=fa3bcdcd-5011-4fb6-959f-2a8512a8573e',
    status26: 'https://drive.google.com/file/d/1v5IVBEZeXGS3XB66KJ0ejJ3Oac-3FFql/view'
  },
  sungil_info: {
    homepage: 'http://www.sungil-i.kr',
    alimi: 'https://www.schoolinfo.go.kr/ei/ss/Pneiss_b01_s0.do?SHL_IDF_CD=8d3d990e-4b48-49af-99bf-97da51b7bc65',
    status26: 'https://drive.google.com/file/d/1O0B-ZHP5lYNQ59Me5HYxXYVc4T6aG_B9/view'
  },
  sungshin: {
    homepage: 'https://ssgh-h.goesn.kr/',
    alimi: 'https://www.schoolinfo.go.kr/ei/ss/Pneiss_b01_s0.do?SHL_IDF_CD=5aaf2ce9-7fec-42fa-947e-32e89e80c1a0',
    status26: 'https://drive.google.com/file/d/1z9N-PvEk3Mh_IL49pA65oldn0_238n2_/view'
  }
};

// Aliases for Korean school names (shortName & fullName)
(() => {
  const aliases: Record<string, string> = {
    '계원예술고': 'kaywon', '계원예고': 'kaywon', '계원예술고등학교': 'kaywon',
    '낙생고': 'naksaeng', '낙생고등학교': 'naksaeng',
    '늘푸른고': 'neulblue', '늘푸른고등학교': 'neulblue',
    '돌마고': 'dolma', '돌마고등학교': 'dolma',
    '보평고': 'bopyeong', '보평고등학교': 'bopyeong',
    '분당경영고': 'bundang_mgt', '분당경영고등학교': 'bundang_mgt',
    '분당고': 'bundang', '분당고등학교': 'bundang',
    '분당대진고': 'bundang_daejin', '분당대진고등학교': 'bundang_daejin', '대진고': 'bundang_daejin',
    '분당아람고': 'bundang_aram', '분당아람고등학교': 'bundang_aram',
    '분당영덕여고': 'bundang_yeongdeok', '분당영덕여자고등학교': 'bundang_yeongdeok', '영덕여고': 'bundang_yeongdeok',
    '분당중앙고': 'bundang_jungang', '분당중앙고등학교': 'bundang_jungang',
    '불곡고': 'bulgok', '불곡고등학교': 'bulgok',
    '서현고': 'seohyeon', '서현고등학교': 'seohyeon',
    '성남외국어고': 'seongnam_fl', '성남외고': 'seongnam_fl', '성남외국어고등학교': 'seongnam_fl',
    '송림고': 'songrim', '송림고등학교': 'songrim',
    '수내고': 'sunae', '수내고등학교': 'sunae',
    '야탑고': 'yatap', '야탑고등학교': 'yatap',
    '양영디지털고': 'yangyoung_digital', '양영디지털고등학교': 'yangyoung_digital', '양영고': 'yangyoung_digital',
    '운중고': 'unjung', '운중고등학교': 'unjung',
    '이매고': 'imae', '이매고등학교': 'imae',
    '이우고': 'eewoo', '이우고등학교': 'eewoo',
    '태원고': 'taewon', '태원고등학교': 'taewon',
    '판교고': 'pangyo', '판교고등학교': 'pangyo',
    '한솔고': 'hansol', '한솔고등학교': 'hansol',
    '복정고': 'bokjeong', '복정고등학교': 'bokjeong',
    '성보경영고': 'seongbo', '성보경영고등학교': 'seongbo',
    '위례한빛고': 'wirye_hanbit', '위례한빛고등학교': 'wirye_hanbit',
    '풍생고': 'pungsaeng', '풍생고등학교': 'pungsaeng',
    '효성고': 'hyosung', '효성고등학교': 'hyosung',
    '동광고': 'donggwang', '동광고등학교': 'donggwang',
    '성남고': 'seongnam', '성남고등학교': 'seongnam',
    '성남여고': 'seongnam_girls', '성남여자고등학교': 'seongnam_girls',
    '성남테크노과학고': 'seongnam_techno', '성남테크노과학고등학교': 'seongnam_techno', '성남테크노고': 'seongnam_techno',
    '성일고': 'sungil', '성일고등학교': 'sungil',
    '성일정보고': 'sungil_info', '성일정보고등학교': 'sungil_info',
    '숭신고': 'sungshin', '숭신고등학교': 'sungshin'
  };

  for (const [alias, id] of Object.entries(aliases)) {
    if (SEONGNAM_SCHOOL_LINKS[id] && !SEONGNAM_SCHOOL_LINKS[alias]) {
      SEONGNAM_SCHOOL_LINKS[alias] = SEONGNAM_SCHOOL_LINKS[id];
    }
  }
})();

export const getSchoolLinks = (schoolOrId: string | SchoolCurriculum): SchoolLinks => {
  if (!schoolOrId) return {};
  if (typeof schoolOrId === 'object') {
    return SEONGNAM_SCHOOL_LINKS[schoolOrId.id] ||
           SEONGNAM_SCHOOL_LINKS[schoolOrId.shortName] ||
           SEONGNAM_SCHOOL_LINKS[schoolOrId.name] || {};
  }
  return SEONGNAM_SCHOOL_LINKS[schoolOrId] || {};
};

