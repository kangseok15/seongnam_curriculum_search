// ============================================================================
// 2027학년도 입학생 교육과정 편성표(성남 28개교 PDF) 기준 편제 데이터
// - 학점은 PDF 표의 '1학년·2학년·3학년 / 1·2학기' 칸에 적힌 숫자(기본학점 열 아님)를 사용
// - mandatory[학년][].credit : 학기당 학점 / groups[].credits : 선택 과목 1개당 학기 학점
// - 자동 생성 파일: PDF 변경 시 재생성
// ============================================================================
import type { SelectionGroup } from './curriculumData';

export interface PdfMandatorySubject { name: string; semesters: number[]; credit: number; }
export interface PdfCurriculum {
  mandatory: Record<1 | 2 | 3, PdfMandatorySubject[]>;
  groups: SelectionGroup[];
}

export const PDF_CURRICULA: Record<string, PdfCurriculum> = {
  // 풍생고등학교
  "pungsaeng": {
    mandatory: {
      1: [
        { name: "공통국어1", semesters: [1], credit: 4 },
        { name: "공통국어2", semesters: [2], credit: 4 },
        { name: "공통수학1", semesters: [1], credit: 4 },
        { name: "공통수학2", semesters: [2], credit: 4 },
        { name: "공통영어1", semesters: [1], credit: 4 },
        { name: "공통영어2", semesters: [2], credit: 4 },
        { name: "한국사1", semesters: [1], credit: 3 },
        { name: "한국사2", semesters: [2], credit: 3 },
        { name: "통합사회1", semesters: [1], credit: 4 },
        { name: "통합사회2", semesters: [2], credit: 4 },
        { name: "통합과학1", semesters: [1], credit: 4 },
        { name: "통합과학2", semesters: [2], credit: 4 },
        { name: "과학탐구실험1", semesters: [1], credit: 1 },
        { name: "과학탐구실험2", semesters: [2], credit: 1 },
        { name: "체육1", semesters: [1], credit: 2 },
        { name: "체육2", semesters: [2], credit: 2 },
        { name: "정보", semesters: [1], credit: 3 },
        { name: "인공지능 기초", semesters: [2], credit: 3 },
      ],
      2: [
        { name: "문학", semesters: [1], credit: 4 },
        { name: "화법과 언어", semesters: [2], credit: 4 },
        { name: "대수", semesters: [1], credit: 4 },
        { name: "미적분Ⅰ", semesters: [2], credit: 4 },
        { name: "영어Ⅰ", semesters: [1], credit: 4 },
        { name: "영어Ⅱ", semesters: [2], credit: 4 },
        { name: "스포츠 생활1", semesters: [1], credit: 2 },
        { name: "스포츠 생활2", semesters: [2], credit: 2 },
        { name: "음악↔미술", semesters: [1, 2], credit: 3 },
      ],
      3: [
        { name: "독서와 작문", semesters: [1], credit: 3 },
        { name: "언어생활 탐구", semesters: [2], credit: 4 },
        { name: "확률과 통계", semesters: [1], credit: 3 },
        { name: "인공지능 수학", semesters: [2], credit: 4 },
        { name: "영어 독해와 작문", semesters: [1], credit: 3 },
        { name: "심화 영어", semesters: [2], credit: 4 },
        { name: "스포츠 과학", semesters: [1], credit: 1 },
        { name: "스포츠 문화", semesters: [2], credit: 1 },
        { name: "음악 연주와 창작↔미술 창작", semesters: [1, 2], credit: 2 },
      ],
    },
    groups: [
      {
        id: "선택군1", name: "2학년 1학기 교과(군) 간 선택 (택4)", grade: 2, targetGrade: 2, semester: "1학기",
        selectCount: 4, credits: 3,
        description: "2학년 1학기 교과(군) 간 선택 선택군1 (택4, 12학점)",
        subjects: [
          { name: "사회와 문화", semesters: [1] },
          { name: "세계시민과 지리", semesters: [1] },
          { name: "세계사", semesters: [1] },
          { name: "현대사회와 윤리", semesters: [1] },
          { name: "물리학", semesters: [1] },
          { name: "화학", semesters: [1] },
          { name: "생명과학", semesters: [1] },
          { name: "지구과학", semesters: [1] },
        ]
      },
      {
        id: "선택군2", name: "2학년 2학기 교과(군) 간 선택 (택4)", grade: 2, targetGrade: 2, semester: "2학기",
        selectCount: 4, credits: 3,
        description: "2학년 2학기 교과(군) 간 선택 선택군2 (택4, 12학점)",
        subjects: [
          { name: "경제", semesters: [2] },
          { name: "한국지리 탐구", semesters: [2] },
          { name: "동아시아 역사 기행", semesters: [2] },
          { name: "윤리와 사상", semesters: [2] },
          { name: "역학과 에너지", semesters: [2] },
          { name: "물질과 에너지", semesters: [2] },
          { name: "세포와 물질대사", semesters: [2] },
          { name: "지구시스템과학", semesters: [2] },
          { name: "기하", semesters: [2] },
          { name: "기술·가정", semesters: [2] },
        ]
      },
      {
        id: "선택군3", name: "3학년 1학기 교과(군) 간 선택 (택1)", grade: 3, targetGrade: 3, semester: "1학기",
        selectCount: 1, credits: 3,
        description: "3학년 1학기 교과(군) 간 선택 선택군3 (택1, 3학점)",
        subjects: [
          { name: "문학과 영상", semesters: [1] },
          { name: "미적분Ⅱ", semesters: [1] },
          { name: "세계 문화와 영어", semesters: [1] },
        ]
      },
      {
        id: "선택군4", name: "3학년 1학기 교과(군) 간 선택 (택3)", grade: 3, targetGrade: 3, semester: "1학기",
        selectCount: 3, credits: 3,
        description: "3학년 1학기 교과(군) 간 선택 선택군4 (택3, 9학점)",
        subjects: [
          { name: "정치", semesters: [1] },
          { name: "법과 사회", semesters: [1] },
          { name: "도시의 미래 탐구", semesters: [1] },
          { name: "인문학과 윤리", semesters: [1] },
          { name: "음악 감상과 비평", semesters: [1] },
          { name: "미술 감상과 비평", semesters: [1] },
          { name: "전자기와 양자", semesters: [1] },
          { name: "화학 반응의 세계", semesters: [1] },
          { name: "생물의 유전", semesters: [1] },
          { name: "행성우주과학", semesters: [1] },
          { name: "한문", semesters: [1] },
          { name: "중국어", semesters: [1] },
          { name: "일본어", semesters: [1] },
          { name: "물리학 실험", semesters: [1] },
          { name: "화학 실험", semesters: [1] },
          { name: "생명과학 실험", semesters: [1] },
          { name: "지구과학 실험", semesters: [1] },
        ]
      },
      {
        id: "선택군5", name: "3학년 2학기 교과(군) 간 선택 (택3)", grade: 3, targetGrade: 3, semester: "2학기",
        selectCount: 3, credits: 3,
        description: "3학년 2학기 교과(군) 간 선택 선택군5 (택3, 9학점)",
        subjects: [
          { name: "금융과 경제생활", semesters: [2] },
          { name: "여행지리", semesters: [2] },
          { name: "윤리문제 탐구", semesters: [2] },
          { name: "역사로 탐구하는 현대 세계", semesters: [2] },
          { name: "음악과 미디어", semesters: [2] },
          { name: "미술과 매체", semesters: [2] },
          { name: "과학의 역사와 문화", semesters: [2] },
          { name: "기후변화와 환경생태", semesters: [2] },
          { name: "융합과학 탐구", semesters: [2] },
          { name: "데이터 과학", semesters: [2] },
          { name: "과학과제 연구", semesters: [2] },
        ]
      },
      {
        id: "선택군6", name: "3학년 1학기 교과(군) 간 선택 (택1)", grade: 3, targetGrade: 3, semester: "1학기",
        selectCount: 1, credits: 3,
        description: "3학년 1학기 교과(군) 간 선택 선택군6 (택1, 3학점)",
        subjects: [
          { name: "생활과학 탐구", semesters: [1] },
          { name: "프로그래밍", semesters: [1] },
        ]
      },
      {
        id: "선택군7", name: "3학년 2학기 교과(군) 간 선택 (택1)", grade: 3, targetGrade: 3, semester: "2학기",
        selectCount: 1, credits: 3,
        description: "3학년 2학기 교과(군) 간 선택 선택군7 (택1, 3학점)",
        subjects: [
          { name: "언어생활과 한자", semesters: [2] },
          { name: "중국 문화", semesters: [2] },
          { name: "일본 문화", semesters: [2] },
        ]
      },
      {
        id: "선택군8", name: "3학년 1학기 교과(군) 간 선택 (택1)", grade: 3, targetGrade: 3, semester: "1학기",
        selectCount: 1, credits: 2,
        description: "3학년 1학기 교과(군) 간 선택 선택군8 (택1, 2학점)",
        subjects: [
          { name: "진로와 직업", semesters: [1] },
          { name: "논리와 사고", semesters: [1] },
          { name: "과학창의연구", semesters: [1] },
        ]
      },
      {
        id: "선택군9", name: "3학년 2학기 교과(군) 간 선택 (택1)", grade: 3, targetGrade: 3, semester: "2학기",
        selectCount: 1, credits: 2,
        description: "3학년 2학기 교과(군) 간 선택 선택군9 (택1, 2학점)",
        subjects: [
          { name: "진로와 직업", semesters: [2] },
          { name: "논리와 사고", semesters: [2] },
          { name: "생태와 환경", semesters: [2] },
          { name: "과학교양", semesters: [2] },
        ]
      },
    ]
  },
  // 분당고등학교
  "bundang": {
    mandatory: {
      1: [
        { name: "공통국어1", semesters: [1], credit: 4 },
        { name: "공통국어2", semesters: [2], credit: 4 },
        { name: "공통수학1", semesters: [1], credit: 4 },
        { name: "공통수학2", semesters: [2], credit: 4 },
        { name: "공통영어1", semesters: [1], credit: 4 },
        { name: "공통영어2", semesters: [2], credit: 4 },
        { name: "한국사1", semesters: [1], credit: 3 },
        { name: "한국사2", semesters: [2], credit: 3 },
        { name: "통합사회1", semesters: [1], credit: 4 },
        { name: "통합사회2", semesters: [2], credit: 4 },
        { name: "통합과학1", semesters: [1], credit: 4 },
        { name: "통합과학2", semesters: [2], credit: 4 },
        { name: "과학탐구실험1", semesters: [1], credit: 1 },
        { name: "과학탐구실험2", semesters: [2], credit: 1 },
        { name: "체육1", semesters: [1], credit: 2 },
        { name: "체육2", semesters: [2], credit: 2 },
        { name: "음악↔미술", semesters: [1, 2], credit: 3 },
      ],
      2: [
        { name: "문학", semesters: [1], credit: 4 },
        { name: "화법과 언어", semesters: [2], credit: 4 },
        { name: "대수", semesters: [1], credit: 4 },
        { name: "미적분Ⅰ", semesters: [2], credit: 4 },
        { name: "영어Ⅰ", semesters: [1], credit: 4 },
        { name: "영어Ⅱ", semesters: [2], credit: 4 },
        { name: "운동과 건강", semesters: [1], credit: 2 },
        { name: "스포츠 생활1", semesters: [2], credit: 2 },
      ],
      3: [
        { name: "독서와 작문", semesters: [1], credit: 3 },
        { name: "언어생활 탐구", semesters: [2], credit: 3 },
        { name: "확률과 통계", semesters: [1], credit: 3 },
        { name: "실용 통계", semesters: [2], credit: 3 },
        { name: "영어 독해와 작문", semesters: [1], credit: 3 },
        { name: "심화 영어", semesters: [2], credit: 3 },
        { name: "스포츠 문화", semesters: [1], credit: 1 },
        { name: "스포츠 과학", semesters: [2], credit: 1 },
        { name: "논술", semesters: [1], credit: 2 },
        { name: "생태와 환경", semesters: [2], credit: 2 },
      ],
    },
    groups: [
      {
        id: "선택군1", name: "2학년 1학기 교과(군) 간 선택 (택4)", grade: 2, targetGrade: 2, semester: "1학기",
        selectCount: 4, credits: 3,
        description: "2학년 1학기 교과(군) 간 선택 선택군1 (택4, 12학점)",
        subjects: [
          { name: "주제 탐구 독서", semesters: [1] },
          { name: "인공지능 수학", semesters: [1] },
          { name: "영어 발표와 토론", semesters: [1] },
          { name: "현대사회와 윤리", semesters: [1] },
          { name: "사회와 문화", semesters: [1] },
          { name: "경제", semesters: [1] },
          { name: "세계사", semesters: [1] },
          { name: "한국지리 탐구", semesters: [1] },
          { name: "과학과제 연구", semesters: [1] },
          { name: "물리학", semesters: [1] },
          { name: "생명과학", semesters: [1] },
          { name: "지구과학", semesters: [1] },
        ]
      },
      {
        id: "선택군2", name: "2학년 1학기 교과(군) 간 선택 (택1)", grade: 2, targetGrade: 2, semester: "1학기",
        selectCount: 1, credits: 3,
        description: "2학년 1학기 교과(군) 간 선택 선택군2 (택1, 3학점)",
        subjects: [
          { name: "한문", semesters: [1] },
          { name: "정보", semesters: [1] },
          { name: "중국어", semesters: [1] },
          { name: "일본어", semesters: [1] },
        ]
      },
      {
        id: "선택군3", name: "2학년 2학기 교과(군) 간 선택 (택4)", grade: 2, targetGrade: 2, semester: "2학기",
        selectCount: 4, credits: 3,
        description: "2학년 2학기 교과(군) 간 선택 선택군3 (택4, 12학점)",
        subjects: [
          { name: "독서 토론과 글쓰기", semesters: [2] },
          { name: "기하", semesters: [2] },
          { name: "세계 문화와 영어", semesters: [2] },
          { name: "윤리와 사상", semesters: [2] },
          { name: "법과 사회", semesters: [2] },
          { name: "정치", semesters: [2] },
          { name: "동아시아 역사 기행", semesters: [2] },
          { name: "세계시민과 지리", semesters: [2] },
          { name: "화학", semesters: [2] },
          { name: "역학과 에너지", semesters: [2] },
          { name: "세포와 물질대사", semesters: [2] },
        ]
      },
      {
        id: "선택군4", name: "2학년 2학기 교과(군) 간 선택 (택1)", grade: 2, targetGrade: 2, semester: "2학기",
        selectCount: 1, credits: 3,
        description: "2학년 2학기 교과(군) 간 선택 선택군4 (택1, 3학점)",
        subjects: [
          { name: "언어생활과 한자", semesters: [2] },
          { name: "인공지능 기초", semesters: [2] },
          { name: "중국어 회화", semesters: [2] },
          { name: "일본어 회화", semesters: [2] },
        ]
      },
      {
        id: "선택군5", name: "3학년 1학기 교과(군) 간 선택 (택4)", grade: 3, targetGrade: 3, semester: "1학기",
        selectCount: 4, credits: 3,
        description: "3학년 1학기 교과(군) 간 선택 선택군5 (택4, 12학점)",
        subjects: [
          { name: "문학과 영상", semesters: [1] },
          { name: "미적분Ⅱ", semesters: [1] },
          { name: "심화 영어 독해와 작문", semesters: [1] },
          { name: "인문학과 윤리", semesters: [1] },
          { name: "도시의 미래 탐구", semesters: [1] },
          { name: "금융과 경제생활", semesters: [1] },
          { name: "사회문제 탐구", semesters: [1] },
          { name: "물질과 에너지", semesters: [1] },
          { name: "전자기와 양자", semesters: [1] },
          { name: "화학 반응의 세계", semesters: [1] },
          { name: "생물의 유전", semesters: [1] },
          { name: "행성우주과학", semesters: [1] },
        ]
      },
      {
        id: "선택군6", name: "3학년 1학기 교과(군) 간 선택 (택1)", grade: 3, targetGrade: 3, semester: "1학기",
        selectCount: 1, credits: 3,
        description: "3학년 1학기 교과(군) 간 선택 선택군6 (택1, 3학점)",
        subjects: [
          { name: "한문 고전 읽기", semesters: [1] },
          { name: "데이터 과학", semesters: [1] },
          { name: "중국 문화", semesters: [1] },
          { name: "일본 문화", semesters: [1] },
        ]
      },
      {
        id: "선택군7", name: "3학년 2학기 교과(군) 간 선택 (택4)", grade: 3, targetGrade: 3, semester: "2학기",
        selectCount: 4, credits: 3,
        description: "3학년 2학기 교과(군) 간 선택 선택군7 (택4, 12학점)",
        subjects: [
          { name: "매체 의사소통", semesters: [2] },
          { name: "전문 수학", semesters: [2] },
          { name: "수학과제 탐구", semesters: [2] },
          { name: "미디어 영어", semesters: [2] },
          { name: "국제 관계의 이해", semesters: [2] },
          { name: "역사로 탐구하는 현대 세계", semesters: [2] },
          { name: "윤리문제 탐구", semesters: [2] },
          { name: "여행지리", semesters: [2] },
          { name: "기후변화와 지속가능한 세계", semesters: [2] },
          { name: "지구시스템과학", semesters: [2] },
          { name: "과학의 역사와 문화", semesters: [2] },
          { name: "융합과학 탐구", semesters: [2] },
          { name: "기후변화와 환경생태", semesters: [2] },
        ]
      },
      {
        id: "선택군8", name: "3학년 2학기 교과(군) 간 선택 (택1)", grade: 3, targetGrade: 3, semester: "2학기",
        selectCount: 1, credits: 3,
        description: "3학년 2학기 교과(군) 간 선택 선택군8 (택1, 3학점)",
        subjects: [
          { name: "생활과 한문", semesters: [2] },
          { name: "소프트웨어와 생활", semesters: [2] },
          { name: "심화 중국어", semesters: [2] },
          { name: "심화 일본어", semesters: [2] },
        ]
      },
      {
        id: "선택군9", name: "3학년 1학기 교과(군) 간 선택 (택1)", grade: 3, targetGrade: 3, semester: "1학기",
        selectCount: 1, credits: 2,
        description: "3학년 1학기 교과(군) 간 선택 선택군9 (택1, 2학점)",
        subjects: [
          { name: "음악 연주와 창작", semesters: [1] },
          { name: "미술 창작", semesters: [1] },
        ]
      },
      {
        id: "선택군10", name: "3학년 2학기 교과(군) 간 선택 (택1)", grade: 3, targetGrade: 3, semester: "2학기",
        selectCount: 1, credits: 2,
        description: "3학년 2학기 교과(군) 간 선택 선택군10 (택1, 2학점)",
        subjects: [
          { name: "음악 감상과 비평", semesters: [2] },
          { name: "미술 감상과 비평", semesters: [2] },
        ]
      },
    ]
  },
  // 서현고등학교
  "seohyeon": {
    mandatory: {
      1: [
        { name: "공통국어1", semesters: [1], credit: 4 },
        { name: "공통국어2", semesters: [2], credit: 4 },
        { name: "공통수학1", semesters: [1], credit: 4 },
        { name: "공통수학2", semesters: [2], credit: 4 },
        { name: "공통영어1", semesters: [1], credit: 3 },
        { name: "공통영어2", semesters: [2], credit: 3 },
        { name: "한국사1", semesters: [1], credit: 3 },
        { name: "한국사2", semesters: [2], credit: 3 },
        { name: "통합사회1", semesters: [1], credit: 3 },
        { name: "통합사회2", semesters: [2], credit: 3 },
        { name: "통합과학1", semesters: [1], credit: 4 },
        { name: "통합과학2", semesters: [2], credit: 4 },
        { name: "과학탐구실험1", semesters: [1], credit: 1 },
        { name: "과학탐구실험2", semesters: [2], credit: 1 },
        { name: "체육1", semesters: [1], credit: 2 },
        { name: "체육2", semesters: [2], credit: 2 },
        { name: "음악↔미술", semesters: [1, 2], credit: 2 },
        { name: "정보↔언어생활과 한자", semesters: [1, 2], credit: 3 },
      ],
      2: [
        { name: "문학", semesters: [1], credit: 4 },
        { name: "화법과 언어", semesters: [2], credit: 4 },
        { name: "대수", semesters: [1], credit: 4 },
        { name: "미적분Ⅰ", semesters: [2], credit: 4 },
        { name: "영어Ⅰ", semesters: [1], credit: 4 },
        { name: "영어Ⅱ", semesters: [2], credit: 4 },
        { name: "스포츠 생활1", semesters: [1], credit: 2 },
        { name: "스포츠 생활2", semesters: [2], credit: 2 },
      ],
      3: [
        { name: "독서와 작문", semesters: [1], credit: 3 },
        { name: "확률과 통계", semesters: [1], credit: 3 },
        { name: "영어 독해와 작문", semesters: [1], credit: 3 },
        { name: "스포츠 문화", semesters: [1], credit: 1 },
        { name: "스포츠 과학", semesters: [2], credit: 1 },
      ],
    },
    groups: [
      {
        id: "선택군1", name: "2학년 1학기 교과(군) 간 선택 (택4)", grade: 2, targetGrade: 2, semester: "1학기",
        selectCount: 4, credits: 3,
        description: "2학년 1학기 교과(군) 간 선택 선택군1 (택4, 12학점)",
        subjects: [
          { name: "문학과 영상", semesters: [1] },
          { name: "기하", semesters: [1] },
          { name: "인공지능 수학", semesters: [1] },
          { name: "미디어 영어", semesters: [1] },
          { name: "세계사", semesters: [1] },
          { name: "윤리와 사상", semesters: [1] },
          { name: "경제", semesters: [1] },
          { name: "세계시민과 지리", semesters: [1] },
          { name: "물리학", semesters: [1] },
          { name: "화학", semesters: [1] },
          { name: "생명과학", semesters: [1] },
        ]
      },
      {
        id: "선택군2", name: "2학년 2학기 교과(군) 간 선택 (택4)", grade: 2, targetGrade: 2, semester: "2학기",
        selectCount: 4, credits: 3,
        description: "2학년 2학기 교과(군) 간 선택 선택군2 (택4, 12학점)",
        subjects: [
          { name: "독서 토론과 글쓰기", semesters: [2] },
          { name: "미적분Ⅱ", semesters: [2] },
          { name: "경제 수학", semesters: [2] },
          { name: "세계 문화와 영어", semesters: [2] },
          { name: "역사로 탐구하는 현대 세계", semesters: [2] },
          { name: "현대사회와 윤리", semesters: [2] },
          { name: "사회와 문화", semesters: [2] },
          { name: "여행지리", semesters: [2] },
          { name: "지구과학", semesters: [2] },
          { name: "과학과제 연구", semesters: [2] },
          { name: "물질과 에너지", semesters: [2] },
          { name: "행성우주과학", semesters: [2] },
        ]
      },
      {
        id: "선택군3", name: "2학년 1학기 교과(군) 간 선택 (택1)", grade: 2, targetGrade: 2, semester: "1학기",
        selectCount: 1, credits: 3,
        description: "2학년 1학기 교과(군) 간 선택 선택군3 (택1, 3학점)",
        subjects: [
          { name: "중국어", semesters: [1] },
          { name: "일본어", semesters: [1] },
          { name: "인공지능 기초", semesters: [1] },
        ]
      },
      {
        id: "선택군4", name: "2학년 2학기 교과(군) 간 선택 (택1)", grade: 2, targetGrade: 2, semester: "2학기",
        selectCount: 1, credits: 3,
        description: "2학년 2학기 교과(군) 간 선택 선택군4 (택1, 3학점)",
        subjects: [
          { name: "중국어 회화", semesters: [2] },
          { name: "일본어 회화", semesters: [2] },
          { name: "데이터 과학", semesters: [2] },
        ]
      },
      {
        id: "선택군5", name: "3학년 1학기 교과(군) 간 선택 (택4)", grade: 3, targetGrade: 3, semester: "1학기",
        selectCount: 4, credits: 3,
        description: "3학년 1학기 교과(군) 간 선택 선택군5 (택4, 12학점)",
        subjects: [
          { name: "언어생활 탐구", semesters: [1] },
          { name: "전문 수학", semesters: [1] },
          { name: "고급 미적분", semesters: [1] },
          { name: "심화 영어", semesters: [1] },
          { name: "영미 문학 읽기", semesters: [1] },
          { name: "도시의 미래 탐구", semesters: [1] },
          { name: "법과 사회", semesters: [1] },
          { name: "윤리문제 탐구", semesters: [1] },
          { name: "사회문제 탐구", semesters: [1] },
          { name: "역학과 에너지", semesters: [1] },
          { name: "전자기와 양자", semesters: [1] },
          { name: "화학 반응의 세계", semesters: [1] },
          { name: "세포와 물질대사", semesters: [1] },
          { name: "생물의 유전", semesters: [1] },
          { name: "지구시스템과학", semesters: [1] },
          { name: "기후변화와 환경생태", semesters: [1] },
        ]
      },
      {
        id: "선택군6", name: "3학년 2학기 교과(군) 간 선택 (택7)", grade: 3, targetGrade: 3, semester: "2학기",
        selectCount: 7, credits: 3,
        description: "3학년 2학기 교과(군) 간 선택 선택군6 (택7, 21학점)",
        subjects: [
          { name: "매체 의사소통", semesters: [2] },
          { name: "주제 탐구 독서", semesters: [2] },
          { name: "실용 통계", semesters: [2] },
          { name: "수학과제 탐구", semesters: [2] },
          { name: "수학과 문화", semesters: [2] },
          { name: "심화 영어 독해와 작문", semesters: [2] },
          { name: "영어 발표와 토론", semesters: [2] },
          { name: "실생활 영어 회화", semesters: [2] },
          { name: "한국지리 탐구", semesters: [2] },
          { name: "금융과 경제생활", semesters: [2] },
          { name: "인문학과 윤리", semesters: [2] },
          { name: "기후변화와 지속가능한 세계", semesters: [2] },
          { name: "고급 물리학", semesters: [2] },
          { name: "고급 화학", semesters: [2] },
          { name: "고급 생명과학", semesters: [2] },
          { name: "고급 지구과학", semesters: [2] },
          { name: "과학의 역사와 문화", semesters: [2] },
        ]
      },
      {
        id: "선택군7", name: "3학년 1학기 교과(군) 간 선택 (택1)", grade: 3, targetGrade: 3, semester: "1학기",
        selectCount: 1, credits: 3,
        description: "3학년 1학기 교과(군) 간 선택 선택군7 (택1, 3학점)",
        subjects: [
          { name: "음악 감상과 비평", semesters: [1] },
          { name: "미술 창작", semesters: [1] },
        ]
      },
      {
        id: "선택군8", name: "3학년 2학기 교과(군) 간 선택 (택1)", grade: 3, targetGrade: 3, semester: "2학기",
        selectCount: 1, credits: 3,
        description: "3학년 2학기 교과(군) 간 선택 선택군8 (택1, 3학점)",
        subjects: [
          { name: "음악과 미디어", semesters: [2] },
          { name: "미술과 매체", semesters: [2] },
        ]
      },
      {
        id: "선택군9", name: "3학년 1학기 교과(군) 간 선택 (택1)", grade: 3, targetGrade: 3, semester: "1학기",
        selectCount: 1, credits: 2,
        description: "3학년 1학기 교과(군) 간 선택 선택군9 (택1, 2학점)",
        subjects: [
          { name: "일본 언어와 역사의 이해1", semesters: [1] },
          { name: "중국 언어와 역사의 이해1", semesters: [1] },
          { name: "인간과 심리", semesters: [1] },
        ]
      },
      {
        id: "선택군10", name: "3학년 2학기 교과(군) 간 선택 (택1)", grade: 3, targetGrade: 3, semester: "2학기",
        selectCount: 1, credits: 2,
        description: "3학년 2학기 교과(군) 간 선택 선택군10 (택1, 2학점)",
        subjects: [
          { name: "일본 언어와 역사의 이해2", semesters: [2] },
          { name: "중국 언어와 역사의 이해2", semesters: [2] },
          { name: "논리와 사고", semesters: [2] },
        ]
      },
      {
        id: "선택군11", name: "3학년 1학기 교과(군) 간 선택 (택1)", grade: 3, targetGrade: 3, semester: "1학기",
        selectCount: 1, credits: 2,
        description: "3학년 1학기 교과(군) 간 선택 선택군11 (택1, 2학점)",
        subjects: [
          { name: "과학창의연구", semesters: [1] },
          { name: "인공지능 생활 탐구", semesters: [1] },
          { name: "생태와 환경", semesters: [1] },
        ]
      },
      {
        id: "선택군12", name: "3학년 2학기 교과(군) 간 선택 (택1)", grade: 3, targetGrade: 3, semester: "2학기",
        selectCount: 1, credits: 2,
        description: "3학년 2학기 교과(군) 간 선택 선택군12 (택1, 2학점)",
        subjects: [
          { name: "과학교양", semesters: [2] },
          { name: "인공지능과 함께하는 세상", semesters: [2] },
          { name: "인간과 경제활동", semesters: [2] },
        ]
      },
    ]
  },
  // 수내고등학교
  "sunae": {
    mandatory: {
      1: [
        { name: "공통국어1", semesters: [1], credit: 4 },
        { name: "공통국어2", semesters: [2], credit: 4 },
        { name: "공통수학1", semesters: [1], credit: 4 },
        { name: "공통수학2", semesters: [2], credit: 4 },
        { name: "공통영어1", semesters: [1], credit: 4 },
        { name: "공통영어2", semesters: [2], credit: 4 },
        { name: "한국사1", semesters: [1], credit: 3 },
        { name: "한국사2", semesters: [2], credit: 3 },
        { name: "통합사회1", semesters: [1], credit: 4 },
        { name: "통합사회2", semesters: [2], credit: 4 },
        { name: "통합과학1", semesters: [1], credit: 4 },
        { name: "통합과학2", semesters: [2], credit: 4 },
        { name: "과학탐구실험1", semesters: [1], credit: 1 },
        { name: "과학탐구실험2", semesters: [2], credit: 1 },
        { name: "체육1", semesters: [1], credit: 2 },
        { name: "체육2", semesters: [2], credit: 2 },
        { name: "로봇과 공학세계↔프로그래밍", semesters: [1, 2], credit: 3 },
      ],
      2: [
        { name: "화법과 언어", semesters: [1], credit: 3 },
        { name: "문학", semesters: [2], credit: 4 },
        { name: "대수", semesters: [1], credit: 3 },
        { name: "미적분Ⅰ", semesters: [2], credit: 4 },
        { name: "영어Ⅰ", semesters: [1], credit: 3 },
        { name: "영어Ⅱ", semesters: [2], credit: 4 },
        { name: "스포츠 생활1", semesters: [1], credit: 2 },
        { name: "스포츠 생활2", semesters: [2], credit: 2 },
      ],
      3: [
        { name: "독서와 작문", semesters: [1], credit: 3 },
        { name: "주제 탐구 독서", semesters: [2], credit: 3 },
        { name: "확률과 통계", semesters: [1], credit: 3 },
        { name: "실용 통계", semesters: [2], credit: 3 },
        { name: "영어 독해와 작문", semesters: [1], credit: 3 },
        { name: "심화 영어 독해와 작문", semesters: [2], credit: 3 },
        { name: "스포츠 과학", semesters: [1], credit: 1 },
        { name: "스포츠 문화", semesters: [2], credit: 1 },
        { name: "논술", semesters: [1], credit: 2 },
        { name: "인간과 경제활동", semesters: [2], credit: 2 },
      ],
    },
    groups: [
      {
        id: "선택군1", name: "2학년 1학기 교과(군) 간 선택 (택1)", grade: 2, targetGrade: 2, semester: "1학기",
        selectCount: 1, credits: 3,
        description: "2학년 1학기 교과(군) 간 선택 선택군1 (택1, 3학점)",
        subjects: [
          { name: "문학과 영상", semesters: [1] },
          { name: "기하", semesters: [1] },
          { name: "미디어 영어", semesters: [1] },
        ]
      },
      {
        id: "선택군2", name: "2학년 1학기 교과(군) 간 선택 (택3)", grade: 2, targetGrade: 2, semester: "1학기",
        selectCount: 3, credits: 3,
        description: "2학년 1학기 교과(군) 간 선택 선택군2 (택3, 9학점)",
        subjects: [
          { name: "경제", semesters: [1] },
          { name: "국제 관계의 이해", semesters: [1] },
          { name: "세계시민과 지리", semesters: [1] },
          { name: "윤리와 사상", semesters: [1] },
          { name: "물리학", semesters: [1] },
          { name: "화학", semesters: [1] },
          { name: "생명과학", semesters: [1] },
          { name: "지구과학", semesters: [1] },
        ]
      },
      {
        id: "선택군3", name: "2학년 2학기 교과(군) 간 선택 (택3)", grade: 2, targetGrade: 2, semester: "2학기",
        selectCount: 3, credits: 3,
        description: "2학년 2학기 교과(군) 간 선택 선택군3 (택3, 9학점)",
        subjects: [
          { name: "정치", semesters: [2] },
          { name: "법과 사회", semesters: [2] },
          { name: "한국지리 탐구", semesters: [2] },
          { name: "현대사회와 윤리", semesters: [2] },
          { name: "동아시아 역사 기행", semesters: [2] },
          { name: "역학과 에너지", semesters: [2] },
          { name: "물질과 에너지", semesters: [2] },
          { name: "세포와 물질대사", semesters: [2] },
          { name: "지구시스템과학", semesters: [2] },
        ]
      },
      {
        id: "선택군4", name: "2학년 1학기 교과(군) 간 선택 (택1)", grade: 2, targetGrade: 2, semester: "1학기",
        selectCount: 1, credits: 3,
        description: "2학년 1학기 교과(군) 간 선택 선택군4 (택1, 3학점)",
        subjects: [
          { name: "음악", semesters: [1] },
          { name: "미술", semesters: [1] },
        ]
      },
      {
        id: "선택군5", name: "2학년 2학기 교과(군) 간 선택 (택1)", grade: 2, targetGrade: 2, semester: "2학기",
        selectCount: 1, credits: 3,
        description: "2학년 2학기 교과(군) 간 선택 선택군5 (택1, 3학점)",
        subjects: [
          { name: "음악 연주와 창작", semesters: [2] },
          { name: "미술 창작", semesters: [2] },
        ]
      },
      {
        id: "선택군6", name: "2학년 1학기 교과(군) 간 선택 (택1)", grade: 2, targetGrade: 2, semester: "1학기",
        selectCount: 1, credits: 3,
        description: "2학년 1학기 교과(군) 간 선택 선택군6 (택1, 3학점)",
        subjects: [
          { name: "일본어", semesters: [1] },
          { name: "중국어", semesters: [1] },
          { name: "언어생활과 한자", semesters: [1] },
        ]
      },
      {
        id: "선택군7", name: "2학년 2학기 교과(군) 간 선택 (택1)", grade: 2, targetGrade: 2, semester: "2학기",
        selectCount: 1, credits: 3,
        description: "2학년 2학기 교과(군) 간 선택 선택군7 (택1, 3학점)",
        subjects: [
          { name: "일본어 회화", semesters: [2] },
          { name: "중국어 회화", semesters: [2] },
          { name: "한문", semesters: [2] },
        ]
      },
      {
        id: "선택군8", name: "3학년 1학기 교과(군) 간 선택 (택4)", grade: 3, targetGrade: 3, semester: "1학기",
        selectCount: 4, credits: 3,
        description: "3학년 1학기 교과(군) 간 선택 선택군8 (택4, 12학점)",
        subjects: [
          { name: "언어생활 탐구", semesters: [1] },
          { name: "미적분Ⅱ", semesters: [1] },
          { name: "심화 영어", semesters: [1] },
          { name: "인공지능 수학", semesters: [1] },
          { name: "사회와 문화", semesters: [1] },
          { name: "도시의 미래 탐구", semesters: [1] },
          { name: "세계사", semesters: [1] },
          { name: "윤리문제 탐구", semesters: [1] },
          { name: "전자기와 양자", semesters: [1] },
          { name: "화학 반응의 세계", semesters: [1] },
          { name: "생물의 유전", semesters: [1] },
          { name: "행성우주과학", semesters: [1] },
          { name: "융합과학 탐구", semesters: [1] },
        ]
      },
      {
        id: "선택군9", name: "3학년 2학기 교과(군) 간 선택 (택4)", grade: 3, targetGrade: 3, semester: "2학기",
        selectCount: 4, credits: 3,
        description: "3학년 2학기 교과(군) 간 선택 선택군9 (택4, 12학점)",
        subjects: [
          { name: "매체 의사소통", semesters: [2] },
          { name: "전문 수학", semesters: [2] },
          { name: "실생활 영어 회화", semesters: [2] },
          { name: "인문학과 윤리", semesters: [2] },
          { name: "사회문제 탐구", semesters: [2] },
          { name: "금융과 경제생활", semesters: [2] },
          { name: "여행지리", semesters: [2] },
          { name: "기후변화와 지속가능한 세계", semesters: [2] },
          { name: "역사로 탐구하는 현대 세계", semesters: [2] },
          { name: "과학의 역사와 문화", semesters: [2] },
          { name: "기후변화와 환경생태", semesters: [2] },
          { name: "융합과학 탐구", semesters: [2] },
        ]
      },
      {
        id: "선택군10", name: "3학년 1학기 교과(군) 간 선택 (택1)", grade: 3, targetGrade: 3, semester: "1학기",
        selectCount: 1, credits: 2,
        description: "3학년 1학기 교과(군) 간 선택 선택군10 (택1, 2학점)",
        subjects: [
          { name: "음악과 미디어", semesters: [1] },
          { name: "미술과 매체", semesters: [1] },
        ]
      },
      {
        id: "선택군11", name: "3학년 2학기 교과(군) 간 선택 (택1)", grade: 3, targetGrade: 3, semester: "2학기",
        selectCount: 1, credits: 2,
        description: "3학년 2학기 교과(군) 간 선택 선택군11 (택1, 2학점)",
        subjects: [
          { name: "음악 감상과 비평", semesters: [2] },
          { name: "미술 감상과 비평", semesters: [2] },
        ]
      },
      {
        id: "선택군12", name: "3학년 1학기 교과(군) 간 선택 (택1)", grade: 3, targetGrade: 3, semester: "1학기",
        selectCount: 1, credits: 3,
        description: "3학년 1학기 교과(군) 간 선택 선택군12 (택1, 3학점)",
        subjects: [
          { name: "일본 문화", semesters: [1] },
          { name: "중국 문화", semesters: [1] },
          { name: "창의 공학 설계", semesters: [1] },
          { name: "한문 고전 읽기", semesters: [1] },
          { name: "인공지능 기초", semesters: [1] },
        ]
      },
      {
        id: "선택군13", name: "3학년 2학기 교과(군) 간 선택 (택1)", grade: 3, targetGrade: 3, semester: "2학기",
        selectCount: 1, credits: 3,
        description: "3학년 2학기 교과(군) 간 선택 선택군13 (택1, 3학점)",
        subjects: [
          { name: "심화 일본어", semesters: [2] },
          { name: "심화 중국어", semesters: [2] },
          { name: "지식 재산 일반", semesters: [2] },
          { name: "생활과 한문", semesters: [2] },
          { name: "소프트웨어와 생활", semesters: [2] },
        ]
      },
    ]
  },
  // 숭신고등학교
  "sungshin": {
    mandatory: {
      1: [
        { name: "공통국어1", semesters: [1], credit: 4 },
        { name: "공통국어2", semesters: [2], credit: 4 },
        { name: "공통수학1", semesters: [1], credit: 4 },
        { name: "공통수학2", semesters: [2], credit: 4 },
        { name: "공통영어1", semesters: [1], credit: 4 },
        { name: "공통영어2", semesters: [2], credit: 4 },
        { name: "한국사1", semesters: [1], credit: 3 },
        { name: "한국사2", semesters: [2], credit: 3 },
        { name: "통합사회1", semesters: [1], credit: 4 },
        { name: "통합사회2", semesters: [2], credit: 4 },
        { name: "통합과학1", semesters: [1], credit: 4 },
        { name: "통합과학2", semesters: [2], credit: 4 },
        { name: "과학탐구실험1", semesters: [1], credit: 1 },
        { name: "과학탐구실험2", semesters: [2], credit: 1 },
        { name: "체육1", semesters: [1], credit: 2 },
        { name: "체육2", semesters: [2], credit: 2 },
        { name: "정보↔미술", semesters: [1, 2], credit: 3 },
      ],
      2: [
        { name: "문학", semesters: [1], credit: 4 },
        { name: "독서와 작문", semesters: [2], credit: 4 },
        { name: "대수", semesters: [1], credit: 4 },
        { name: "미적분Ⅰ", semesters: [2], credit: 4 },
        { name: "영어Ⅰ", semesters: [1], credit: 4 },
        { name: "영어Ⅱ", semesters: [2], credit: 4 },
        { name: "스포츠 생활1", semesters: [1], credit: 2 },
        { name: "스포츠 생활2", semesters: [2], credit: 2 },
        { name: "기술·가정↔음악", semesters: [1, 2], credit: 3 },
      ],
      3: [
        { name: "화법과 언어", semesters: [1], credit: 4 },
        { name: "확률과 통계", semesters: [1], credit: 4 },
        { name: "영어 독해와 작문", semesters: [1], credit: 4 },
        { name: "스포츠 문화", semesters: [1], credit: 1 },
        { name: "스포츠 과학", semesters: [2], credit: 1 },
      ],
    },
    groups: [
      {
        id: "선택군1", name: "2학년 1학기 교과(군) 간 선택 (택1)", grade: 2, targetGrade: 2, semester: "1학기",
        selectCount: 1, credits: 3,
        description: "2학년 1학기 교과(군) 간 선택 선택군1 (택1, 3학점)",
        subjects: [
          { name: "인공지능과 피지컬 컴퓨팅", semesters: [1] },
          { name: "중국어", semesters: [1] },
          { name: "독일어", semesters: [1] },
          { name: "한문", semesters: [1] },
        ]
      },
      {
        id: "선택군2", name: "2학년 1학기 교과(군) 간 선택 (택3)", grade: 2, targetGrade: 2, semester: "1학기",
        selectCount: 3, credits: 3,
        description: "2학년 1학기 교과(군) 간 선택 선택군2 (택3, 9학점)",
        subjects: [
          { name: "주제 탐구 독서", semesters: [1] },
          { name: "인공지능 수학", semesters: [1] },
          { name: "세계시민과 지리", semesters: [1] },
          { name: "세계사", semesters: [1] },
          { name: "사회와 문화", semesters: [1] },
          { name: "현대사회와 윤리", semesters: [1] },
          { name: "정치", semesters: [1] },
          { name: "물리학", semesters: [1] },
          { name: "화학", semesters: [1] },
          { name: "생명과학", semesters: [1] },
          { name: "기후변화와 환경생태", semesters: [1] },
          { name: "인공지능 기초", semesters: [1] },
        ]
      },
      {
        id: "선택군3", name: "2학년 2학기 교과(군) 간 선택 (택1)", grade: 2, targetGrade: 2, semester: "2학기",
        selectCount: 1, credits: 3,
        description: "2학년 2학기 교과(군) 간 선택 선택군3 (택1, 3학점)",
        subjects: [
          { name: "기하", semesters: [2] },
          { name: "사물인터넷과 센서 제어", semesters: [2] },
          { name: "중국어 회화", semesters: [2] },
          { name: "독일어 회화", semesters: [2] },
          { name: "언어생활과 한자", semesters: [2] },
        ]
      },
      {
        id: "선택군4", name: "2학년 2학기 교과(군) 간 선택 (택3)", grade: 2, targetGrade: 2, semester: "2학기",
        selectCount: 3, credits: 3,
        description: "2학년 2학기 교과(군) 간 선택 선택군4 (택3, 9학점)",
        subjects: [
          { name: "문학과 영상", semesters: [2] },
          { name: "한국지리 탐구", semesters: [2] },
          { name: "동아시아 역사 기행", semesters: [2] },
          { name: "법과 사회", semesters: [2] },
          { name: "경제", semesters: [2] },
          { name: "윤리문제 탐구", semesters: [2] },
          { name: "역학과 에너지", semesters: [2] },
          { name: "물질과 에너지", semesters: [2] },
          { name: "세포와 물질대사", semesters: [2] },
          { name: "지구과학", semesters: [2] },
          { name: "소프트웨어와 생활", semesters: [2] },
        ]
      },
      {
        id: "선택군5", name: "3학년 1학기 교과(군) 간 선택 (택4)", grade: 3, targetGrade: 3, semester: "1학기",
        selectCount: 4, credits: 4,
        description: "3학년 1학기 교과(군) 간 선택 선택군5 (택4, 16학점)",
        subjects: [
          { name: "독서 토론과 글쓰기", semesters: [1] },
          { name: "미적분Ⅱ", semesters: [1] },
          { name: "여행지리", semesters: [1] },
          { name: "사회문제 탐구", semesters: [1] },
          { name: "기후변화와 지속가능한 세계", semesters: [1] },
          { name: "전자기와 양자", semesters: [1] },
          { name: "화학 반응의 세계", semesters: [1] },
          { name: "생물의 유전", semesters: [1] },
          { name: "지구시스템과학", semesters: [1] },
          { name: "데이터 과학", semesters: [1] },
          { name: "미술과 매체", semesters: [1] },
          { name: "교육의 이해", semesters: [1] },
        ]
      },
      {
        id: "선택군6", name: "3학년 2학기 교과(군) 간 선택 (택2)", grade: 3, targetGrade: 3, semester: "2학기",
        selectCount: 2, credits: 4,
        description: "3학년 2학기 교과(군) 간 선택 선택군6 (택2, 8학점)",
        subjects: [
          { name: "언어생활 탐구", semesters: [2] },
          { name: "경제 수학", semesters: [2] },
          { name: "세계 문화와 영어", semesters: [2] },
        ]
      },
      {
        id: "선택군7", name: "3학년 2학기 교과(군) 간 선택 (택5)", grade: 3, targetGrade: 3, semester: "2학기",
        selectCount: 5, credits: 4,
        description: "3학년 2학기 교과(군) 간 선택 선택군7 (택5, 20학점)",
        subjects: [
          { name: "매체 의사소통", semesters: [2] },
          { name: "영미 문학 읽기", semesters: [2] },
          { name: "사회문제 탐구", semesters: [2] },
          { name: "역사로 탐구하는 현대 세계", semesters: [2] },
          { name: "금융과 경제생활", semesters: [2] },
          { name: "행성우주과학", semesters: [2] },
          { name: "과학의 역사와 문화", semesters: [2] },
          { name: "미술 감상과 비평", semesters: [2] },
          { name: "인공지능 생활 탐구", semesters: [2] },
          { name: "생태와 환경", semesters: [2] },
          { name: "논술", semesters: [2] },
        ]
      },
    ]
  },
  // 분당중앙고등학교
  "bundang_jungang": {
    mandatory: {
      1: [
        { name: "공통국어1", semesters: [1], credit: 3 },
        { name: "공통국어2", semesters: [2], credit: 3 },
        { name: "공통수학1", semesters: [1], credit: 3 },
        { name: "공통수학2", semesters: [1], credit: 3 },
        { name: "대수", semesters: [2], credit: 3 },
        { name: "미적분Ⅰ", semesters: [2], credit: 3 },
        { name: "공통영어1", semesters: [1], credit: 3 },
        { name: "공통영어2", semesters: [2], credit: 3 },
        { name: "통합사회1", semesters: [1], credit: 3 },
        { name: "통합사회2", semesters: [2], credit: 3 },
        { name: "통합과학1", semesters: [1], credit: 3 },
        { name: "통합과학2", semesters: [1], credit: 3 },
        { name: "스포츠 과학", semesters: [1], credit: 1 },
        { name: "스포츠 문화", semesters: [2], credit: 1 },
        { name: "과학창의연구", semesters: [2], credit: 2 },
        { name: "인공지능 기초", semesters: [2], credit: 3 },
        { name: "심화 물리학", semesters: [1], credit: 2 },
        { name: "심화 화학", semesters: [1], credit: 2 },
        { name: "인간생활과 생명과학", semesters: [1], credit: 2 },
        { name: "지구과학개론", semesters: [1], credit: 2 },
        { name: "고급 물리학", semesters: [2], credit: 3 },
        { name: "고급 생명과학", semesters: [2], credit: 3 },
        { name: "화학 실험", semesters: [2], credit: 2 },
        { name: "지구과학 실험", semesters: [2], credit: 2 },
        { name: "프로그래밍", semesters: [1], credit: 2 },
      ],
      2: [
        { name: "미적분Ⅱ", semesters: [1], credit: 4 },
        { name: "기하", semesters: [1], credit: 3 },
        { name: "한국사1", semesters: [1], credit: 3 },
        { name: "한국사2", semesters: [2], credit: 3 },
        { name: "스포츠 생활1", semesters: [1], credit: 2 },
        { name: "스포츠 생활2", semesters: [2], credit: 2 },
        { name: "자연학술탐사", semesters: [1], credit: 1 },
        { name: "주제 탐구(R&E) 심화", semesters: [2], credit: 2 },
        { name: "전문 수학", semesters: [2], credit: 4 },
        { name: "고급 화학", semesters: [1], credit: 3 },
        { name: "고급 지구과학", semesters: [1], credit: 3 },
        { name: "물리학 실험", semesters: [1], credit: 2 },
        { name: "생명과학 실험", semesters: [1], credit: 2 },
        { name: "정보과학", semesters: [1], credit: 3 },
        { name: "인공지능 심화탐구", semesters: [2], credit: 3 },
      ],
      3: [
        { name: "음악", semesters: [1], credit: 2 },
        { name: "음악 연주와 창작", semesters: [2], credit: 3 },
        { name: "체육1", semesters: [1], credit: 2 },
        { name: "체육2", semesters: [2], credit: 2 },
        { name: "인간과 철학", semesters: [1], credit: 2 },
        { name: "AP 미적분학Ⅰ", semesters: [1], credit: 4 },
      ],
    },
    groups: [
      {
        id: "선택군1", name: "2학년 1학기 교과(군) 간 선택 (택2)", grade: 2, targetGrade: 2, semester: "1학기",
        selectCount: 2, credits: 3,
        description: "2학년 1학기 교과(군) 간 선택 선택군1 (택2, 6학점)",
        subjects: [
          { name: "문학", semesters: [1] },
          { name: "독서와 작문", semesters: [1] },
          { name: "영어Ⅰ", semesters: [1] },
          { name: "세계 문화와 영어", semesters: [1] },
        ]
      },
      {
        id: "선택군2", name: "2학년 2학기 교과(군) 간 선택 (택1)", grade: 2, targetGrade: 2, semester: "2학기",
        selectCount: 1, credits: 3,
        description: "2학년 2학기 교과(군) 간 선택 선택군2 (택1, 3학점)",
        subjects: [
          { name: "화법과 언어", semesters: [2] },
          { name: "영어Ⅱ", semesters: [2] },
        ]
      },
      {
        id: "선택군3", name: "3학년 1학기 교과(군) 간 선택 (택2)", grade: 3, targetGrade: 3, semester: "1학기",
        selectCount: 2, credits: 3,
        description: "3학년 1학기 교과(군) 간 선택 선택군3 (택2, 6학점)",
        subjects: [
          { name: "주제 탐구 독서", semesters: [1] },
          { name: "심화 영어 독해와 작문", semesters: [1] },
          { name: "사회문제 탐구", semesters: [1] },
        ]
      },
      {
        id: "선택군4", name: "3학년 2학기 교과(군) 간 선택 (택2)", grade: 3, targetGrade: 3, semester: "2학기",
        selectCount: 2, credits: 3,
        description: "3학년 2학기 교과(군) 간 선택 선택군4 (택2, 6학점)",
        subjects: [
          { name: "문학과 영상", semesters: [2] },
          { name: "심화 영어", semesters: [2] },
          { name: "기후변화와 지속가능한 세계", semesters: [2] },
        ]
      },
      {
        id: "선택군5", name: "2학년 2학기 교과(군) 간 선택 (택4)", grade: 2, targetGrade: 2, semester: "2학기",
        selectCount: 4, credits: 3,
        description: "2학년 2학기 교과(군) 간 선택 선택군5 (택4, 12학점)",
        subjects: [
          { name: "고급 대수", semesters: [2] },
          { name: "피지컬 AI", semesters: [2] },
          { name: "Conceptual 물리학Ⅰ", semesters: [2] },
          { name: "화학 원리 탐구", semesters: [2] },
          { name: "인공지능 기반 생명공학", semesters: [2] },
          { name: "지구환경 빅데이터 분석", semesters: [2] },
          { name: "전산 물리학", semesters: [2] },
        ]
      },
      {
        id: "선택군6", name: "3학년 1학기 교과(군) 간 선택 (택3)", grade: 3, targetGrade: 3, semester: "1학기",
        selectCount: 3, credits: 4,
        description: "3학년 1학기 교과(군) 간 선택 선택군6 (택3, 12학점)",
        subjects: [
          { name: "AP 프로그래밍과 문제해결", semesters: [1] },
          { name: "AP일반물리Ⅰ", semesters: [1] },
          { name: "AP일반화학Ⅰ", semesters: [1] },
          { name: "AP일반생물학", semesters: [1] },
          { name: "지구환경과학 세미나", semesters: [1] },
          { name: "생명과학융합과제연구", semesters: [1] },
        ]
      },
      {
        id: "선택군7", name: "3학년 2학기 교과(군) 간 선택 (택4)", grade: 3, targetGrade: 3, semester: "2학기",
        selectCount: 4, credits: 4,
        description: "3학년 2학기 교과(군) 간 선택 선택군7 (택4, 16학점)",
        subjects: [
          { name: "문제해결기법 탐구", semesters: [2] },
          { name: "물리 과제연구", semesters: [2] },
          { name: "화학 세미나", semesters: [2] },
          { name: "심화 생명과학 탐구", semesters: [2] },
          { name: "관측 천문학", semesters: [2] },
          { name: "정보과학 과제연구", semesters: [2] },
        ]
      },
    ]
  },
  // 늘푸른고등학교
  "neulblue": {
    mandatory: {
      1: [
        { name: "공통국어1", semesters: [1], credit: 4 },
        { name: "공통국어2", semesters: [2], credit: 4 },
        { name: "공통수학1", semesters: [1], credit: 4 },
        { name: "공통수학2", semesters: [2], credit: 4 },
        { name: "공통영어1", semesters: [1], credit: 4 },
        { name: "공통영어2", semesters: [2], credit: 4 },
        { name: "한국사1", semesters: [1], credit: 3 },
        { name: "한국사2", semesters: [2], credit: 3 },
        { name: "통합사회1", semesters: [1], credit: 4 },
        { name: "통합사회2", semesters: [2], credit: 4 },
        { name: "통합과학1", semesters: [1], credit: 4 },
        { name: "통합과학2", semesters: [2], credit: 4 },
        { name: "과학탐구실험1", semesters: [1], credit: 1 },
        { name: "과학탐구실험2", semesters: [2], credit: 1 },
        { name: "체육1", semesters: [1], credit: 2 },
        { name: "체육2", semesters: [2], credit: 2 },
        { name: "음악↔미술", semesters: [1], credit: 3 },
        { name: "음악↔미술", semesters: [2], credit: 3 },
      ],
      2: [
        { name: "화법과 언어", semesters: [1], credit: 3 },
        { name: "문학", semesters: [2], credit: 4 },
        { name: "대수", semesters: [1], credit: 4 },
        { name: "미적분Ⅰ", semesters: [2], credit: 4 },
        { name: "영어Ⅰ", semesters: [1], credit: 3 },
        { name: "영어Ⅱ", semesters: [2], credit: 4 },
        { name: "운동과 건강", semesters: [1], credit: 2 },
        { name: "스포츠 생활1", semesters: [2], credit: 2 },
        { name: "글로벌 이슈와 토론", semesters: [2], credit: 1 },
      ],
      3: [
        { name: "독서와 작문", semesters: [1], credit: 4 },
        { name: "독서 토론과 글쓰기", semesters: [2], credit: 4 },
        { name: "확률과 통계", semesters: [1], credit: 4 },
        { name: "전문 수학", semesters: [2], credit: 3 },
        { name: "영어 독해와 작문", semesters: [1], credit: 4 },
        { name: "심화 영어", semesters: [2], credit: 4 },
        { name: "스포츠 문화", semesters: [1], credit: 1 },
        { name: "스포츠 과학", semesters: [2], credit: 1 },
        { name: "주제 탐구(R&E) 심화", semesters: [1], credit: 1 },
      ],
    },
    groups: [
      {
        id: "선택군1", name: "2학년 1학기 교과(군) 간 선택 (택5)", grade: 2, targetGrade: 2, semester: "1학기",
        selectCount: 5, credits: 3,
        description: "2학년 1학기 교과(군) 간 선택 선택군1 (택5, 15학점)",
        subjects: [
          { name: "문학과 영상", semesters: [1] },
          { name: "기하", semesters: [1] },
          { name: "세계 문화와 영어", semesters: [1] },
          { name: "세계시민과 지리", semesters: [1] },
          { name: "윤리와 사상", semesters: [1] },
          { name: "사회와 문화", semesters: [1] },
          { name: "정치", semesters: [1] },
          { name: "물리학", semesters: [1] },
          { name: "화학", semesters: [1] },
          { name: "생명과학", semesters: [1] },
          { name: "지구과학", semesters: [1] },
          { name: "중국어", semesters: [1] },
          { name: "일본어", semesters: [1] },
          { name: "정보", semesters: [1] },
        ]
      },
      {
        id: "선택군2", name: "2학년 2학기 교과(군) 간 선택 (택4)", grade: 2, targetGrade: 2, semester: "2학기",
        selectCount: 4, credits: 3,
        description: "2학년 2학기 교과(군) 간 선택 선택군2 (택4, 12학점)",
        subjects: [
          { name: "인공지능 수학", semesters: [2] },
          { name: "세계사", semesters: [2] },
          { name: "현대사회와 윤리", semesters: [2] },
          { name: "한국지리 탐구", semesters: [2] },
          { name: "법과 사회", semesters: [2] },
          { name: "경제", semesters: [2] },
          { name: "역학과 에너지", semesters: [2] },
          { name: "물질과 에너지", semesters: [2] },
          { name: "생물의 유전", semesters: [2] },
          { name: "지구시스템과학", semesters: [2] },
          { name: "물리학 실험", semesters: [2] },
          { name: "화학 실험", semesters: [2] },
          { name: "중국어 회화", semesters: [2] },
          { name: "일본어 회화", semesters: [2] },
          { name: "인공지능 기초", semesters: [2] },
        ]
      },
      {
        id: "선택군3", name: "2학년 1학기 교과(군) 간 선택 (택1)", grade: 2, targetGrade: 2, semester: "1학기",
        selectCount: 1, credits: 2,
        description: "2학년 1학기 교과(군) 간 선택 선택군3 (택1, 2학점)",
        subjects: [
          { name: "음악 연주와 창작", semesters: [1] },
          { name: "미술 창작", semesters: [1] },
        ]
      },
      {
        id: "선택군4", name: "2학년 2학기 교과(군) 간 선택 (택1)", grade: 2, targetGrade: 2, semester: "2학기",
        selectCount: 1, credits: 2,
        description: "2학년 2학기 교과(군) 간 선택 선택군4 (택1, 2학점)",
        subjects: [
          { name: "음악과 미디어", semesters: [2] },
          { name: "미술 감상과 비평", semesters: [2] },
          { name: "미술과 매체", semesters: [2] },
        ]
      },
      {
        id: "선택군5", name: "3학년 1학기 교과(군) 간 선택 (택5)", grade: 3, targetGrade: 3, semester: "1학기",
        selectCount: 5, credits: 3,
        description: "3학년 1학기 교과(군) 간 선택 선택군5 (택5, 15학점)",
        subjects: [
          { name: "주제 탐구 독서", semesters: [1] },
          { name: "미적분Ⅱ", semesters: [1] },
          { name: "미디어 영어", semesters: [1] },
          { name: "동아시아 역사 기행", semesters: [1] },
          { name: "국제 관계의 이해", semesters: [1] },
          { name: "여행지리", semesters: [1] },
          { name: "윤리문제 탐구", semesters: [1] },
          { name: "사회문제 탐구", semesters: [1] },
          { name: "전자기와 양자", semesters: [1] },
          { name: "화학 반응의 세계", semesters: [1] },
          { name: "세포와 물질대사", semesters: [1] },
          { name: "행성우주과학", semesters: [1] },
          { name: "고급 물리학", semesters: [1] },
          { name: "고급 화학", semesters: [1] },
          { name: "융합과학 탐구", semesters: [1] },
          { name: "중국 문화", semesters: [1] },
          { name: "일본 문화", semesters: [1] },
          { name: "정보과학", semesters: [1] },
        ]
      },
      {
        id: "선택군6", name: "3학년 2학기 교과(군) 간 선택 (택5)", grade: 3, targetGrade: 3, semester: "2학기",
        selectCount: 5, credits: 3,
        description: "3학년 2학기 교과(군) 간 선택 선택군6 (택5, 15학점)",
        subjects: [
          { name: "언어생활 탐구", semesters: [2] },
          { name: "실용 통계", semesters: [2] },
          { name: "영미 문학 읽기", semesters: [2] },
          { name: "기후변화와 지속가능한 세계", semesters: [2] },
          { name: "금융과 경제생활", semesters: [2] },
          { name: "인문학과 윤리", semesters: [2] },
          { name: "기후변화와 환경생태", semesters: [2] },
          { name: "과학의 역사와 문화", semesters: [2] },
          { name: "과학과제 연구", semesters: [2] },
          { name: "중국 언어와 역사의 이해1", semesters: [2] },
          { name: "일본 언어와 역사의 이해1", semesters: [2] },
          { name: "인공지능 생활 탐구", semesters: [2] },
        ]
      },
      {
        id: "선택군7", name: "3학년 2학기 교과(군) 간 선택 (택1)", grade: 3, targetGrade: 3, semester: "2학기",
        selectCount: 1, credits: 2,
        description: "3학년 2학기 교과(군) 간 선택 선택군7 (택1, 2학점)",
        subjects: [
          { name: "인간과 심리", semesters: [2] },
          { name: "논리와 사고", semesters: [2] },
        ]
      },
    ]
  },
  // 송림고등학교
  "songrim": {
    mandatory: {
      1: [
        { name: "공통국어1", semesters: [1], credit: 4 },
        { name: "공통국어2", semesters: [2], credit: 4 },
        { name: "공통수학1", semesters: [1], credit: 4 },
        { name: "공통수학2", semesters: [2], credit: 4 },
        { name: "공통영어1", semesters: [1], credit: 4 },
        { name: "공통영어2", semesters: [2], credit: 4 },
        { name: "한국사1", semesters: [1], credit: 3 },
        { name: "한국사2", semesters: [2], credit: 3 },
        { name: "통합사회1", semesters: [1], credit: 4 },
        { name: "통합사회2", semesters: [2], credit: 4 },
        { name: "통합과학1", semesters: [1], credit: 4 },
        { name: "통합과학2", semesters: [2], credit: 4 },
        { name: "과학탐구실험1", semesters: [1], credit: 1 },
        { name: "과학탐구실험2", semesters: [2], credit: 1 },
        { name: "체육1", semesters: [1], credit: 2 },
        { name: "체육2", semesters: [2], credit: 2 },
        { name: "정보↔생활과학 탐구", semesters: [1, 2], credit: 3 },
      ],
      2: [
        { name: "문학", semesters: [1], credit: 3 },
        { name: "화법과 언어", semesters: [2], credit: 3 },
        { name: "대수", semesters: [1], credit: 3 },
        { name: "미적분Ⅰ", semesters: [2], credit: 3 },
        { name: "영어Ⅰ", semesters: [1], credit: 3 },
        { name: "영어Ⅱ", semesters: [2], credit: 3 },
        { name: "스포츠 생활1", semesters: [1], credit: 2 },
        { name: "스포츠 생활2", semesters: [2], credit: 2 },
        { name: "음악↔미술", semesters: [1, 2], credit: 3 },
      ],
      3: [
        { name: "독서와 작문", semesters: [1], credit: 4 },
        { name: "언어생활 탐구", semesters: [2], credit: 4 },
        { name: "확률과 통계", semesters: [1], credit: 4 },
        { name: "실용 통계", semesters: [2], credit: 4 },
        { name: "영어 독해와 작문", semesters: [1], credit: 4 },
        { name: "심화 영어 독해와 작문", semesters: [2], credit: 4 },
        { name: "스포츠 문화", semesters: [1], credit: 1 },
        { name: "스포츠 과학", semesters: [2], credit: 1 },
        { name: "미술 감상과 비평", semesters: [1], credit: 2 },
        { name: "미술과 매체", semesters: [2], credit: 2 },
      ],
    },
    groups: [
      {
        id: "선택군1", name: "2학년 1학기 교과(군) 간 선택 (택1)", grade: 2, targetGrade: 2, semester: "1학기",
        selectCount: 1, credits: 3,
        description: "2학년 1학기 교과(군) 간 선택 선택군1 (택1, 3학점)",
        subjects: [
          { name: "주제 탐구 독서", semesters: [1] },
          { name: "기하", semesters: [1] },
          { name: "세계 문화와 영어", semesters: [1] },
        ]
      },
      {
        id: "선택군2", name: "2학년 1학기 교과(군) 간 선택 (택3)", grade: 2, targetGrade: 2, semester: "1학기",
        selectCount: 3, credits: 3,
        description: "2학년 1학기 교과(군) 간 선택 선택군2 (택3, 9학점)",
        subjects: [
          { name: "세계시민과 지리", semesters: [1] },
          { name: "윤리와 사상", semesters: [1] },
          { name: "경제", semesters: [1] },
          { name: "정치", semesters: [1] },
          { name: "물리학", semesters: [1] },
          { name: "화학", semesters: [1] },
          { name: "생명과학", semesters: [1] },
          { name: "지구과학", semesters: [1] },
        ]
      },
      {
        id: "선택군3", name: "2학년 1학기 교과(군) 간 선택 (택1)", grade: 2, targetGrade: 2, semester: "1학기",
        selectCount: 1, credits: 3,
        description: "2학년 1학기 교과(군) 간 선택 선택군3 (택1, 3학점)",
        subjects: [
          { name: "한문", semesters: [1] },
          { name: "중국어", semesters: [1] },
          { name: "독일어", semesters: [1] },
          { name: "데이터 과학", semesters: [1] },
        ]
      },
      {
        id: "선택군4", name: "2학년 2학기 교과(군) 간 선택 (택1)", grade: 2, targetGrade: 2, semester: "2학기",
        selectCount: 1, credits: 3,
        description: "2학년 2학기 교과(군) 간 선택 선택군4 (택1, 3학점)",
        subjects: [
          { name: "문학과 영상", semesters: [2] },
          { name: "고급 대수", semesters: [2] },
          { name: "영미 문학 읽기", semesters: [2] },
        ]
      },
      {
        id: "선택군5", name: "2학년 2학기 교과(군) 간 선택 (택3)", grade: 2, targetGrade: 2, semester: "2학기",
        selectCount: 3, credits: 3,
        description: "2학년 2학기 교과(군) 간 선택 선택군5 (택3, 9학점)",
        subjects: [
          { name: "한국지리 탐구", semesters: [2] },
          { name: "인문학과 윤리", semesters: [2] },
          { name: "동아시아 역사 기행", semesters: [2] },
          { name: "사회와 문화", semesters: [2] },
          { name: "역학과 에너지", semesters: [2] },
          { name: "물질과 에너지", semesters: [2] },
          { name: "세포와 물질대사", semesters: [2] },
          { name: "지구시스템과학", semesters: [2] },
        ]
      },
      {
        id: "선택군6", name: "2학년 2학기 교과(군) 간 선택 (택1)", grade: 2, targetGrade: 2, semester: "2학기",
        selectCount: 1, credits: 3,
        description: "2학년 2학기 교과(군) 간 선택 선택군6 (택1, 3학점)",
        subjects: [
          { name: "언어생활과 한자", semesters: [2] },
          { name: "중국어 회화", semesters: [2] },
          { name: "독일어 회화", semesters: [2] },
          { name: "인공지능 기초", semesters: [2] },
        ]
      },
      {
        id: "선택군7", name: "3학년 1학기 교과(군) 간 선택 (택4)", grade: 3, targetGrade: 3, semester: "1학기",
        selectCount: 4, credits: 3,
        description: "3학년 1학기 교과(군) 간 선택 선택군7 (택4, 12학점)",
        subjects: [
          { name: "매체 의사소통", semesters: [1] },
          { name: "미적분Ⅱ", semesters: [1] },
          { name: "심화 영어Ⅰ", semesters: [1] },
          { name: "세계사", semesters: [1] },
          { name: "현대사회와 윤리", semesters: [1] },
          { name: "법과 사회", semesters: [1] },
          { name: "사회문제 탐구", semesters: [1] },
          { name: "전자기와 양자", semesters: [1] },
          { name: "화학 반응의 세계", semesters: [1] },
          { name: "생물의 유전", semesters: [1] },
          { name: "행성우주과학", semesters: [1] },
          { name: "프로그래밍", semesters: [1] },
        ]
      },
      {
        id: "선택군8", name: "3학년 2학기 교과(군) 간 선택 (택1)", grade: 3, targetGrade: 3, semester: "2학기",
        selectCount: 1, credits: 3,
        description: "3학년 2학기 교과(군) 간 선택 선택군8 (택1, 3학점)",
        subjects: [
          { name: "독서 토론과 글쓰기", semesters: [2] },
          { name: "고급 미적분", semesters: [2] },
          { name: "심화 영어Ⅱ", semesters: [2] },
        ]
      },
      {
        id: "선택군9", name: "3학년 2학기 교과(군) 간 선택 (택3)", grade: 3, targetGrade: 3, semester: "2학기",
        selectCount: 3, credits: 3,
        description: "3학년 2학기 교과(군) 간 선택 선택군9 (택3, 9학점)",
        subjects: [
          { name: "윤리문제 탐구", semesters: [2] },
          { name: "금융과 경제생활", semesters: [2] },
          { name: "기후변화와 지속가능한 세계", semesters: [2] },
          { name: "과학의 역사와 문화", semesters: [2] },
          { name: "기후변화와 환경생태", semesters: [2] },
          { name: "융합과학 탐구", semesters: [2] },
          { name: "소프트웨어와 생활", semesters: [2] },
        ]
      },
      {
        id: "선택군10", name: "3학년 1학기 교과(군) 간 선택 (택1)", grade: 3, targetGrade: 3, semester: "1학기",
        selectCount: 1, credits: 2,
        description: "3학년 1학기 교과(군) 간 선택 선택군10 (택1, 2학점)",
        subjects: [
          { name: "인간과 철학", semesters: [1] },
          { name: "인공지능 윤리", semesters: [1] },
          { name: "인간과 심리", semesters: [1] },
          { name: "삶과 종교", semesters: [1] },
        ]
      },
      {
        id: "선택군11", name: "3학년 2학기 교과(군) 간 선택 (택1)", grade: 3, targetGrade: 3, semester: "2학기",
        selectCount: 1, credits: 2,
        description: "3학년 2학기 교과(군) 간 선택 선택군11 (택1, 2학점)",
        subjects: [
          { name: "논리와 사고", semesters: [2] },
          { name: "논술", semesters: [2] },
          { name: "인간과 심리", semesters: [2] },
          { name: "삶과 종교", semesters: [2] },
        ]
      },
    ]
  },
  // 보평고등학교
  "bopyeong": {
    mandatory: {
      1: [
        { name: "공통국어1", semesters: [1], credit: 4 },
        { name: "공통국어2", semesters: [2], credit: 4 },
        { name: "공통수학1", semesters: [1], credit: 4 },
        { name: "공통수학2", semesters: [2], credit: 4 },
        { name: "공통영어1", semesters: [1], credit: 4 },
        { name: "공통영어2", semesters: [2], credit: 4 },
        { name: "한국사1", semesters: [1], credit: 3 },
        { name: "한국사2", semesters: [2], credit: 3 },
        { name: "통합사회1", semesters: [1], credit: 4 },
        { name: "통합사회2", semesters: [2], credit: 4 },
        { name: "과학탐구실험1", semesters: [1], credit: 1 },
        { name: "과학탐구실험2", semesters: [2], credit: 1 },
        { name: "통합과학1", semesters: [1], credit: 4 },
        { name: "통합과학2", semesters: [2], credit: 4 },
        { name: "체육1", semesters: [1], credit: 2 },
        { name: "체육2", semesters: [2], credit: 2 },
        { name: "음악↔미술", semesters: [1, 2], credit: 3 },
      ],
      2: [
        { name: "문학", semesters: [1], credit: 4 },
        { name: "독서와 작문", semesters: [2], credit: 4 },
        { name: "대수", semesters: [1], credit: 4 },
        { name: "미적분Ⅰ", semesters: [2], credit: 4 },
        { name: "영어Ⅰ", semesters: [1], credit: 4 },
        { name: "영어Ⅱ", semesters: [2], credit: 4 },
        { name: "스포츠 생활1", semesters: [1], credit: 2 },
        { name: "스포츠 생활2", semesters: [2], credit: 2 },
        { name: "정보", semesters: [1], credit: 3 },
        { name: "프로그래밍", semesters: [2], credit: 3 },
      ],
      3: [
        { name: "화법과 언어", semesters: [1], credit: 4 },
        { name: "확률과 통계", semesters: [1], credit: 4 },
        { name: "영어 독해와 작문", semesters: [1], credit: 3 },
        { name: "스포츠 문화", semesters: [1], credit: 1 },
        { name: "스포츠 과학", semesters: [2], credit: 1 },
      ],
    },
    groups: [
      {
        id: "선택군1", name: "2학년 1학기 교과(군) 간 선택 (택3)", grade: 2, targetGrade: 2, semester: "1학기",
        selectCount: 3, credits: 3,
        description: "2학년 1학기 교과(군) 간 선택 선택군1 (택3, 9학점)",
        subjects: [
          { name: "인공지능 수학", semesters: [1] },
          { name: "세계사", semesters: [1] },
          { name: "사회와 문화", semesters: [1] },
          { name: "한국지리 탐구", semesters: [1] },
          { name: "윤리와 사상", semesters: [1] },
          { name: "물리학", semesters: [1] },
          { name: "지구과학", semesters: [1] },
          { name: "과학과제 연구", semesters: [1] },
        ]
      },
      {
        id: "선택군2", name: "2학년 2학기 교과(군) 간 선택 (택3)", grade: 2, targetGrade: 2, semester: "2학기",
        selectCount: 3, credits: 3,
        description: "2학년 2학기 교과(군) 간 선택 선택군2 (택3, 9학점)",
        subjects: [
          { name: "기하", semesters: [2] },
          { name: "세계시민과 지리", semesters: [2] },
          { name: "법과 사회", semesters: [2] },
          { name: "인문학과 윤리", semesters: [2] },
          { name: "동아시아 역사 기행", semesters: [2] },
          { name: "화학", semesters: [2] },
          { name: "생명과학", semesters: [2] },
          { name: "융합과학 탐구", semesters: [2] },
        ]
      },
      {
        id: "선택군3", name: "2학년 1학기 교과(군) 간 선택 (택1)", grade: 2, targetGrade: 2, semester: "1학기",
        selectCount: 1, credits: 3,
        description: "2학년 1학기 교과(군) 간 선택 선택군3 (택1, 3학점)",
        subjects: [
          { name: "중국어", semesters: [1] },
          { name: "일본어", semesters: [1] },
        ]
      },
      {
        id: "선택군4", name: "2학년 2학기 교과(군) 간 선택 (택1)", grade: 2, targetGrade: 2, semester: "2학기",
        selectCount: 1, credits: 3,
        description: "2학년 2학기 교과(군) 간 선택 선택군4 (택1, 3학점)",
        subjects: [
          { name: "중국어 회화", semesters: [2] },
          { name: "일본어 회화", semesters: [2] },
        ]
      },
      {
        id: "선택군5", name: "3학년 1학기 교과(군) 간 선택 (택1)", grade: 3, targetGrade: 3, semester: "1학기",
        selectCount: 1, credits: 3,
        description: "3학년 1학기 교과(군) 간 선택 선택군5 (택1, 3학점)",
        subjects: [
          { name: "주제 탐구 독서", semesters: [1] },
          { name: "경제 수학", semesters: [1] },
          { name: "미적분Ⅱ", semesters: [1] },
          { name: "심화 영어", semesters: [1] },
        ]
      },
      {
        id: "선택군6", name: "3학년 1학기 교과(군) 간 선택 (택4)", grade: 3, targetGrade: 3, semester: "1학기",
        selectCount: 4, credits: 3,
        description: "3학년 1학기 교과(군) 간 선택 선택군6 (택4, 12학점)",
        subjects: [
          { name: "도시의 미래 탐구", semesters: [1] },
          { name: "사회문제 탐구", semesters: [1] },
          { name: "역사로 탐구하는 현대 세계", semesters: [1] },
          { name: "현대사회와 윤리", semesters: [1] },
          { name: "역학과 에너지", semesters: [1] },
          { name: "전자기와 양자", semesters: [1] },
          { name: "세포와 물질대사", semesters: [1] },
          { name: "생물의 유전", semesters: [1] },
          { name: "물질과 에너지", semesters: [1] },
          { name: "화학 반응의 세계", semesters: [1] },
          { name: "지구시스템과학", semesters: [1] },
          { name: "행성우주과학", semesters: [1] },
          { name: "인공지능 기초", semesters: [1] },
          { name: "중국 문화", semesters: [1] },
          { name: "일본 문화", semesters: [1] },
        ]
      },
      {
        id: "선택군7", name: "3학년 2학기 교과(군) 간 선택 (택3)", grade: 3, targetGrade: 3, semester: "2학기",
        selectCount: 3, credits: 3,
        description: "3학년 2학기 교과(군) 간 선택 선택군7 (택3, 9학점)",
        subjects: [
          { name: "독서 토론과 글쓰기", semesters: [2] },
          { name: "매체 의사소통", semesters: [2] },
          { name: "수학과제 탐구", semesters: [2] },
          { name: "세계 문화와 영어", semesters: [2] },
          { name: "영미 문학 읽기", semesters: [2] },
        ]
      },
      {
        id: "선택군8", name: "3학년 2학기 교과(군) 간 선택 (택5)", grade: 3, targetGrade: 3, semester: "2학기",
        selectCount: 5, credits: 3,
        description: "3학년 2학기 교과(군) 간 선택 선택군8 (택5, 15학점)",
        subjects: [
          { name: "여행지리", semesters: [2] },
          { name: "금융과 경제생활", semesters: [2] },
          { name: "윤리문제 탐구", semesters: [2] },
          { name: "기후변화와 지속가능한 세계", semesters: [2] },
          { name: "고급 물리학", semesters: [2] },
          { name: "고급 화학", semesters: [2] },
          { name: "고급 생명과학", semesters: [2] },
          { name: "고급 지구과학", semesters: [2] },
          { name: "과학의 역사와 문화", semesters: [2] },
          { name: "기후변화와 환경생태", semesters: [2] },
          { name: "데이터 과학", semesters: [2] },
          { name: "심화 중국어", semesters: [2] },
          { name: "심화 일본어", semesters: [2] },
        ]
      },
      {
        id: "선택군9", name: "3학년 1학기 교과(군) 간 선택 (택1)", grade: 3, targetGrade: 3, semester: "1학기",
        selectCount: 1, credits: 2,
        description: "3학년 1학기 교과(군) 간 선택 선택군9 (택1, 2학점)",
        subjects: [
          { name: "음악 감상과 비평", semesters: [1] },
          { name: "미술 창작", semesters: [1] },
        ]
      },
      {
        id: "선택군10", name: "3학년 2학기 교과(군) 간 선택 (택1)", grade: 3, targetGrade: 3, semester: "2학기",
        selectCount: 1, credits: 2,
        description: "3학년 2학기 교과(군) 간 선택 선택군10 (택1, 2학점)",
        subjects: [
          { name: "음악과 미디어", semesters: [2] },
          { name: "미술 감상과 비평", semesters: [2] },
        ]
      },
      {
        id: "선택군11", name: "3학년 2학기 교과(군) 간 선택 (택1)", grade: 3, targetGrade: 3, semester: "2학기",
        selectCount: 1, credits: 2,
        description: "3학년 2학기 교과(군) 간 선택 선택군11 (택1, 2학점)",
        subjects: [
          { name: "논술", semesters: [2] },
          { name: "생태와 환경", semesters: [2] },
          { name: "인간과 심리", semesters: [2] },
          { name: "인간과 경제활동", semesters: [2] },
        ]
      },
    ]
  },
  // 불곡고등학교
  "bulgok": {
    mandatory: {
      1: [
        { name: "공통국어1", semesters: [1], credit: 4 },
        { name: "공통국어2", semesters: [2], credit: 3 },
        { name: "공통수학1", semesters: [1], credit: 4 },
        { name: "공통수학2", semesters: [2], credit: 4 },
        { name: "공통영어1", semesters: [1], credit: 3 },
        { name: "공통영어2", semesters: [2], credit: 4 },
        { name: "한국사1", semesters: [1], credit: 3 },
        { name: "한국사2", semesters: [2], credit: 3 },
        { name: "통합사회1", semesters: [1], credit: 3 },
        { name: "통합사회2", semesters: [2], credit: 3 },
        { name: "통합과학1", semesters: [1], credit: 4 },
        { name: "통합과학2", semesters: [2], credit: 4 },
        { name: "과학탐구실험1", semesters: [1], credit: 1 },
        { name: "과학탐구실험2", semesters: [2], credit: 1 },
        { name: "체육1", semesters: [1], credit: 2 },
        { name: "체육2", semesters: [2], credit: 2 },
        { name: "음악↔미술", semesters: [1, 2], credit: 2 },
        { name: "정보↔기술·가정", semesters: [1, 2], credit: 3 },
      ],
      2: [
        { name: "문학", semesters: [1], credit: 4 },
        { name: "독서와 작문", semesters: [2], credit: 4 },
        { name: "대수", semesters: [1], credit: 4 },
        { name: "미적분Ⅰ", semesters: [2], credit: 4 },
        { name: "영어Ⅰ", semesters: [1], credit: 4 },
        { name: "영어Ⅱ", semesters: [2], credit: 4 },
        { name: "스포츠 생활1", semesters: [1], credit: 2 },
        { name: "스포츠 생활2", semesters: [2], credit: 2 },
      ],
      3: [
        { name: "화법과 언어", semesters: [1], credit: 4 },
        { name: "독서 토론과 글쓰기", semesters: [2], credit: 4 },
        { name: "확률과 통계", semesters: [1], credit: 3 },
        { name: "수학과 문화", semesters: [2], credit: 3 },
        { name: "영어 독해와 작문", semesters: [1], credit: 3 },
        { name: "심화 영어 독해와 작문", semesters: [2], credit: 3 },
        { name: "스포츠 문화", semesters: [1], credit: 1 },
        { name: "스포츠 과학", semesters: [2], credit: 1 },
      ],
    },
    groups: [
      {
        id: "선택군1", name: "2학년 1학기 교과(군) 간 선택 (택1)", grade: 2, targetGrade: 2, semester: "1학기",
        selectCount: 1, credits: 3,
        description: "2학년 1학기 교과(군) 간 선택 선택군1 (택1, 3학점)",
        subjects: [
          { name: "음악 감상과 비평", semesters: [1] },
          { name: "미술 감상과 비평", semesters: [1] },
        ]
      },
      {
        id: "선택군2", name: "2학년 2학기 교과(군) 간 선택 (택1)", grade: 2, targetGrade: 2, semester: "2학기",
        selectCount: 1, credits: 3,
        description: "2학년 2학기 교과(군) 간 선택 선택군2 (택1, 3학점)",
        subjects: [
          { name: "음악과 미디어", semesters: [2] },
          { name: "미술 창작", semesters: [2] },
        ]
      },
      {
        id: "선택군3", name: "2학년 1학기 교과(군) 간 선택 (택4)", grade: 2, targetGrade: 2, semester: "1학기",
        selectCount: 4, credits: 3,
        description: "2학년 1학기 교과(군) 간 선택 선택군3 (택4, 12학점)",
        subjects: [
          { name: "인공지능 수학", semesters: [1] },
          { name: "경제", semesters: [1] },
          { name: "세계시민과 지리", semesters: [1] },
          { name: "현대사회와 윤리", semesters: [1] },
          { name: "세계사", semesters: [1] },
          { name: "물리학", semesters: [1] },
          { name: "화학", semesters: [1] },
          { name: "지구과학", semesters: [1] },
          { name: "생명과학", semesters: [1] },
          { name: "일본어", semesters: [1] },
          { name: "중국어", semesters: [1] },
          { name: "소프트웨어와 생활", semesters: [1] },
        ]
      },
      {
        id: "선택군4", name: "2학년 2학기 교과(군) 간 선택 (택4)", grade: 2, targetGrade: 2, semester: "2학기",
        selectCount: 4, credits: 3,
        description: "2학년 2학기 교과(군) 간 선택 선택군4 (택4, 12학점)",
        subjects: [
          { name: "기하", semesters: [2] },
          { name: "사회와 문화", semesters: [2] },
          { name: "한국지리 탐구", semesters: [2] },
          { name: "윤리와 사상", semesters: [2] },
          { name: "동아시아 역사 기행", semesters: [2] },
          { name: "역학과 에너지", semesters: [2] },
          { name: "물질과 에너지", semesters: [2] },
          { name: "지구시스템과학", semesters: [2] },
          { name: "세포와 물질대사", semesters: [2] },
          { name: "일본어 회화", semesters: [2] },
          { name: "중국어 회화", semesters: [2] },
          { name: "인공지능 기초", semesters: [2] },
        ]
      },
      {
        id: "선택군5", name: "3학년 1학기 교과(군) 간 선택 (택6)", grade: 3, targetGrade: 3, semester: "1학기",
        selectCount: 6, credits: 3,
        description: "3학년 1학기 교과(군) 간 선택 선택군5 (택6, 18학점)",
        subjects: [
          { name: "주제 탐구 독서", semesters: [1] },
          { name: "미적분Ⅱ", semesters: [1] },
          { name: "경제 수학", semesters: [1] },
          { name: "영미 문학 읽기", semesters: [1] },
          { name: "심화 영어", semesters: [1] },
          { name: "정치", semesters: [1] },
          { name: "도시의 미래 탐구", semesters: [1] },
          { name: "인문학과 윤리", semesters: [1] },
          { name: "법과 사회", semesters: [1] },
          { name: "역사 과제연구", semesters: [1] },
          { name: "전자기와 양자", semesters: [1] },
          { name: "화학 반응의 세계", semesters: [1] },
          { name: "생물의 유전", semesters: [1] },
          { name: "행성우주과학", semesters: [1] },
          { name: "과학과제 연구", semesters: [1] },
          { name: "창의 공학 설계", semesters: [1] },
          { name: "데이터 과학", semesters: [1] },
          { name: "심화 일본어", semesters: [1] },
          { name: "중국 문화", semesters: [1] },
          { name: "인공지능 윤리", semesters: [1] },
        ]
      },
      {
        id: "선택군6", name: "3학년 2학기 교과(군) 간 선택 (택6)", grade: 3, targetGrade: 3, semester: "2학기",
        selectCount: 6, credits: 3,
        description: "3학년 2학기 교과(군) 간 선택 선택군6 (택6, 18학점)",
        subjects: [
          { name: "문학과 영상", semesters: [2] },
          { name: "수학과제 탐구", semesters: [2] },
          { name: "미디어 영어", semesters: [2] },
          { name: "세계 문화와 영어", semesters: [2] },
          { name: "사회문제 탐구", semesters: [2] },
          { name: "역사로 탐구하는 현대 세계", semesters: [2] },
          { name: "여행지리", semesters: [2] },
          { name: "윤리문제 탐구", semesters: [2] },
          { name: "금융과 경제생활", semesters: [2] },
          { name: "기후변화와 지속가능한 세계", semesters: [2] },
          { name: "기후변화와 환경생태", semesters: [2] },
          { name: "과학의 역사와 문화", semesters: [2] },
          { name: "융합과학 탐구", semesters: [2] },
          { name: "로봇과 공학세계", semesters: [2] },
          { name: "정보과학", semesters: [2] },
          { name: "일본 문화", semesters: [2] },
          { name: "심화 중국어", semesters: [2] },
          { name: "인간과 심리", semesters: [2] },
        ]
      },
    ]
  },
  // 낙생고등학교
  "naksaeng": {
    mandatory: {
      1: [
        { name: "공통국어1", semesters: [1], credit: 4 },
        { name: "공통국어2", semesters: [2], credit: 4 },
        { name: "공통수학1", semesters: [1], credit: 4 },
        { name: "공통수학2", semesters: [2], credit: 4 },
        { name: "공통영어1", semesters: [1], credit: 3 },
        { name: "공통영어2", semesters: [2], credit: 3 },
        { name: "한국사1", semesters: [1], credit: 3 },
        { name: "한국사2", semesters: [2], credit: 3 },
        { name: "통합사회1", semesters: [1], credit: 4 },
        { name: "통합사회2", semesters: [2], credit: 4 },
        { name: "통합과학1", semesters: [1], credit: 4 },
        { name: "통합과학2", semesters: [2], credit: 4 },
        { name: "과학탐구실험1", semesters: [1], credit: 1 },
        { name: "과학탐구실험2", semesters: [2], credit: 1 },
        { name: "체육1", semesters: [1], credit: 2 },
        { name: "체육2", semesters: [2], credit: 2 },
        { name: "음악", semesters: [1], credit: 2 },
        { name: "음악 연주와 창작", semesters: [2], credit: 2 },
        { name: "진로와 직업↔교육의 이해", semesters: [1, 2], credit: 2 },
      ],
      2: [
        { name: "문학", semesters: [1], credit: 4 },
        { name: "화법과 언어", semesters: [2], credit: 4 },
        { name: "대수", semesters: [1], credit: 4 },
        { name: "미적분Ⅰ", semesters: [2], credit: 4 },
        { name: "영어Ⅰ", semesters: [1], credit: 5 },
        { name: "영어Ⅱ", semesters: [2], credit: 5 },
        { name: "스포츠 생활1", semesters: [1], credit: 2 },
        { name: "스포츠 생활2", semesters: [2], credit: 2 },
        { name: "미술", semesters: [1], credit: 2 },
        { name: "미술 감상과 비평", semesters: [2], credit: 2 },
      ],
      3: [
        { name: "독서와 작문", semesters: [1], credit: 5 },
        { name: "주제 탐구 독서", semesters: [2], credit: 5 },
        { name: "심화 영어", semesters: [1], credit: 4 },
        { name: "심화 영어 독해와 작문", semesters: [2], credit: 4 },
        { name: "스포츠 과학", semesters: [1], credit: 1 },
        { name: "스포츠 문화", semesters: [2], credit: 1 },
      ],
    },
    groups: [
      {
        id: "선택군1", name: "2학년 2학기 교과(군) 간 선택 (택1)", grade: 2, targetGrade: 2, semester: "2학기",
        selectCount: 1, credits: 3,
        description: "2학년 2학기 교과(군) 간 선택 선택군1 (택1, 3학점)",
        subjects: [
          { name: "기하", semesters: [2] },
          { name: "미디어 영어", semesters: [2] },
        ]
      },
      {
        id: "선택군2", name: "2학년 1학기 교과(군) 간 선택 (택3)", grade: 2, targetGrade: 2, semester: "1학기",
        selectCount: 3, credits: 3,
        description: "2학년 1학기 교과(군) 간 선택 선택군2 (택3, 9학점)",
        subjects: [
          { name: "세계시민과 지리", semesters: [1] },
          { name: "사회와 문화", semesters: [1] },
          { name: "역사로 탐구하는 현대 세계", semesters: [1] },
          { name: "금융과 경제생활", semesters: [1] },
          { name: "현대사회와 윤리", semesters: [1] },
          { name: "윤리문제 탐구", semesters: [1] },
          { name: "국제 관계의 이해", semesters: [1] },
          { name: "한국지리 탐구", semesters: [1] },
          { name: "물리학", semesters: [1] },
          { name: "화학", semesters: [1] },
          { name: "생명과학", semesters: [1] },
          { name: "지구과학", semesters: [1] },
          { name: "역학과 에너지", semesters: [1] },
          { name: "물질과 에너지", semesters: [1] },
          { name: "세포와 물질대사", semesters: [1] },
          { name: "융합과학 탐구", semesters: [1] },
        ]
      },
      {
        id: "선택군3", name: "2학년 2학기 교과(군) 간 선택 (택3)", grade: 2, targetGrade: 2, semester: "2학기",
        selectCount: 3, credits: 3,
        description: "2학년 2학기 교과(군) 간 선택 선택군3 (택3, 9학점)",
        subjects: [
          { name: "세계시민과 지리", semesters: [2] },
          { name: "사회와 문화", semesters: [2] },
          { name: "역사로 탐구하는 현대 세계", semesters: [2] },
          { name: "금융과 경제생활", semesters: [2] },
          { name: "현대사회와 윤리", semesters: [2] },
          { name: "윤리문제 탐구", semesters: [2] },
          { name: "국제 관계의 이해", semesters: [2] },
          { name: "한국지리 탐구", semesters: [2] },
          { name: "물리학", semesters: [2] },
          { name: "화학", semesters: [2] },
          { name: "생명과학", semesters: [2] },
          { name: "지구과학", semesters: [2] },
          { name: "역학과 에너지", semesters: [2] },
          { name: "물질과 에너지", semesters: [2] },
          { name: "세포와 물질대사", semesters: [2] },
          { name: "융합과학 탐구", semesters: [2] },
        ]
      },
      {
        id: "선택군4", name: "2학년 1학기 교과(군) 간 선택 (택1)", grade: 2, targetGrade: 2, semester: "1학기",
        selectCount: 1, credits: 3,
        description: "2학년 1학기 교과(군) 간 선택 선택군4 (택1, 3학점)",
        subjects: [
          { name: "한문", semesters: [1] },
          { name: "중국어", semesters: [1] },
          { name: "인간과 철학", semesters: [1] },
          { name: "정보", semesters: [1] },
          { name: "인공지능 기초", semesters: [1] },
          { name: "언어생활과 한자", semesters: [1] },
          { name: "한문 고전 읽기", semesters: [1] },
          { name: "중국어 회화", semesters: [1] },
          { name: "일본어", semesters: [1] },
          { name: "일본어 회화", semesters: [1] },
        ]
      },
      {
        id: "선택군5", name: "3학년 1학기 교과(군) 간 선택 (택2)", grade: 3, targetGrade: 3, semester: "1학기",
        selectCount: 2, credits: 3,
        description: "3학년 1학기 교과(군) 간 선택 선택군5 (택2, 6학점)",
        subjects: [
          { name: "확률과 통계", semesters: [1] },
          { name: "기하", semesters: [1] },
          { name: "경제 수학", semesters: [1] },
          { name: "미적분Ⅱ", semesters: [1] },
          { name: "실용 통계", semesters: [1] },
          { name: "수학과제 탐구", semesters: [1] },
        ]
      },
      {
        id: "선택군6", name: "3학년 2학기 교과(군) 간 선택 (택1)", grade: 3, targetGrade: 3, semester: "2학기",
        selectCount: 1, credits: 3,
        description: "3학년 2학기 교과(군) 간 선택 선택군6 (택1, 3학점)",
        subjects: [
          { name: "확률과 통계", semesters: [2] },
          { name: "기하", semesters: [2] },
          { name: "경제 수학", semesters: [2] },
          { name: "미적분Ⅱ", semesters: [2] },
          { name: "실용 통계", semesters: [2] },
          { name: "수학과제 탐구", semesters: [2] },
        ]
      },
      {
        id: "선택군7", name: "3학년 1학기 교과(군) 간 선택 (택4)", grade: 3, targetGrade: 3, semester: "1학기",
        selectCount: 4, credits: 3,
        description: "3학년 1학기 교과(군) 간 선택 선택군7 (택4, 12학점)",
        subjects: [
          { name: "인문학과 윤리", semesters: [1] },
          { name: "여행지리", semesters: [1] },
          { name: "국제 관계의 이해", semesters: [1] },
          { name: "사회문제 탐구", semesters: [1] },
          { name: "기후변화와 지속가능한 세계", semesters: [1] },
          { name: "금융과 경제생활", semesters: [1] },
          { name: "역사로 탐구하는 현대 세계", semesters: [1] },
          { name: "기후변화와 환경생태", semesters: [1] },
          { name: "경제", semesters: [1] },
          { name: "화학 반응의 세계", semesters: [1] },
          { name: "역학과 에너지", semesters: [1] },
          { name: "물질과 에너지", semesters: [1] },
          { name: "세포와 물질대사", semesters: [1] },
          { name: "전자기와 양자", semesters: [1] },
          { name: "생물의 유전", semesters: [1] },
        ]
      },
      {
        id: "선택군8", name: "3학년 2학기 교과(군) 간 선택 (택2)", grade: 3, targetGrade: 3, semester: "2학기",
        selectCount: 2, credits: 3,
        description: "3학년 2학기 교과(군) 간 선택 선택군8 (택2, 6학점)",
        subjects: [
          { name: "인문학과 윤리", semesters: [2] },
          { name: "여행지리", semesters: [2] },
          { name: "국제 관계의 이해", semesters: [2] },
          { name: "사회문제 탐구", semesters: [2] },
          { name: "기후변화와 지속가능한 세계", semesters: [2] },
          { name: "기후변화와 환경생태", semesters: [2] },
          { name: "경제", semesters: [2] },
          { name: "화학 반응의 세계", semesters: [2] },
          { name: "역학과 에너지", semesters: [2] },
          { name: "물질과 에너지", semesters: [2] },
          { name: "세포와 물질대사", semesters: [2] },
          { name: "전자기와 양자", semesters: [2] },
          { name: "생물의 유전", semesters: [2] },
          { name: "과학의 역사와 문화", semesters: [2] },
          { name: "과학과제 연구", semesters: [2] },
          { name: "교육의 이해", semesters: [2] },
          { name: "보건", semesters: [2] },
        ]
      },
      {
        id: "선택군9", name: "3학년 2학기 교과(군) 간 선택 (택1)", grade: 3, targetGrade: 3, semester: "2학기",
        selectCount: 1, credits: 3,
        description: "3학년 2학기 교과(군) 간 선택 선택군9 (택1, 3학점)",
        subjects: [
          { name: "한문 고전 읽기", semesters: [2] },
          { name: "과학융합", semesters: [2] },
          { name: "생활과학2", semesters: [2] },
          { name: "인공지능 기초", semesters: [2] },
        ]
      },
      {
        id: "선택군10", name: "3학년 1학기 교과(군) 간 선택 (택1)", grade: 3, targetGrade: 3, semester: "1학기",
        selectCount: 1, credits: 2,
        description: "3학년 1학기 교과(군) 간 선택 선택군10 (택1, 2학점)",
        subjects: [
          { name: "음악과 미디어", semesters: [1] },
          { name: "미술과 매체", semesters: [1] },
        ]
      },
      {
        id: "선택군11", name: "3학년 1학기 교과(군) 간 선택 (택1)", grade: 3, targetGrade: 3, semester: "1학기",
        selectCount: 1, credits: 2,
        description: "3학년 1학기 교과(군) 간 선택 선택군11 (택1, 2학점)",
        subjects: [
          { name: "논리와 사고", semesters: [1] },
          { name: "논술", semesters: [1] },
          { name: "인간과 경제활동", semesters: [1] },
          { name: "과학교양", semesters: [1] },
          { name: "인간과 철학", semesters: [1] },
        ]
      },
      {
        id: "선택군12", name: "3학년 2학기 교과(군) 간 선택 (택1)", grade: 3, targetGrade: 3, semester: "2학기",
        selectCount: 1, credits: 4,
        description: "3학년 2학기 교과(군) 간 선택 선택군12 (택1, 4학점)",
        subjects: [
          { name: "논리와 사고", semesters: [2] },
          { name: "논술", semesters: [2] },
          { name: "인간과 경제활동", semesters: [2] },
          { name: "과학교양", semesters: [2] },
          { name: "인간과 철학", semesters: [2] },
        ]
      },
    ]
  },
  // 태원고등학교
  "taewon": {
    mandatory: {
      1: [
        { name: "공통국어1", semesters: [1], credit: 4 },
        { name: "공통국어2", semesters: [2], credit: 4 },
        { name: "공통수학1", semesters: [1], credit: 4 },
        { name: "공통수학1", semesters: [2], credit: 4 },
        { name: "공통영어1", semesters: [1], credit: 4 },
        { name: "공통영어2", semesters: [2], credit: 4 },
        { name: "한국사1", semesters: [1], credit: 3 },
        { name: "한국사2", semesters: [2], credit: 3 },
        { name: "통합사회1", semesters: [1], credit: 4 },
        { name: "통합사회2", semesters: [2], credit: 4 },
        { name: "통합과학1", semesters: [1], credit: 4 },
        { name: "통합과학2", semesters: [2], credit: 4 },
        { name: "과학탐구실험1", semesters: [1], credit: 1 },
        { name: "과학탐구실험2", semesters: [2], credit: 1 },
        { name: "체육1", semesters: [1], credit: 2 },
        { name: "체육2", semesters: [2], credit: 2 },
        { name: "음악↔미술", semesters: [1, 2], credit: 3 },
      ],
      2: [
        { name: "문학", semesters: [1], credit: 3 },
        { name: "독서와 작문", semesters: [2], credit: 3 },
        { name: "대수", semesters: [1], credit: 4 },
        { name: "미적분Ⅰ", semesters: [2], credit: 4 },
        { name: "영어Ⅰ", semesters: [1], credit: 3 },
        { name: "영어 독해와 작문", semesters: [2], credit: 3 },
        { name: "스포츠 생활1", semesters: [1], credit: 2 },
        { name: "스포츠 생활2", semesters: [2], credit: 2 },
      ],
      3: [
        { name: "화법과 언어", semesters: [1], credit: 3 },
        { name: "언어생활 탐구", semesters: [2], credit: 3 },
        { name: "확률과 통계", semesters: [1], credit: 4 },
        { name: "수학과제 탐구", semesters: [2], credit: 4 },
        { name: "영어Ⅱ", semesters: [1], credit: 4 },
        { name: "심화 영어", semesters: [2], credit: 4 },
        { name: "스포츠 문화", semesters: [1], credit: 1 },
        { name: "스포츠 과학", semesters: [2], credit: 1 },
        { name: "인문학적 통찰력", semesters: [1], credit: 2 },
        { name: "학문의 기초와 융합", semesters: [2], credit: 2 },
      ],
    },
    groups: [
      {
        id: "선택군1", name: "2학년 1학기 교과(군) 간 선택 (택4)", grade: 2, targetGrade: 2, semester: "1학기",
        selectCount: 4, credits: 3,
        description: "2학년 1학기 교과(군) 간 선택 선택군1 (택4, 12학점)",
        subjects: [
          { name: "주제 탐구 독서", semesters: [1] },
          { name: "영미 문학 읽기", semesters: [1] },
          { name: "인공지능 수학", semesters: [1] },
          { name: "세계시민과 지리", semesters: [1] },
          { name: "세계사", semesters: [1] },
          { name: "법과 사회", semesters: [1] },
          { name: "현대사회와 윤리", semesters: [1] },
          { name: "물리학", semesters: [1] },
          { name: "화학", semesters: [1] },
          { name: "생명과학", semesters: [1] },
          { name: "인공지능 기초", semesters: [1] },
        ]
      },
      {
        id: "선택군2", name: "2학년 2학기 교과(군) 간 선택 (택4)", grade: 2, targetGrade: 2, semester: "2학기",
        selectCount: 4, credits: 3,
        description: "2학년 2학기 교과(군) 간 선택 선택군2 (택4, 12학점)",
        subjects: [
          { name: "문학과 영상", semesters: [2] },
          { name: "영어 발표와 토론", semesters: [2] },
          { name: "기하", semesters: [2] },
          { name: "경제 수학", semesters: [2] },
          { name: "한국지리 탐구", semesters: [2] },
          { name: "동아시아 역사 기행", semesters: [2] },
          { name: "경제", semesters: [2] },
          { name: "윤리와 사상", semesters: [2] },
          { name: "역학과 에너지", semesters: [2] },
          { name: "물질과 에너지", semesters: [2] },
          { name: "세포와 물질대사", semesters: [2] },
          { name: "지구과학", semesters: [2] },
          { name: "데이터 과학", semesters: [2] },
        ]
      },
      {
        id: "선택군3", name: "2학년 1학기 교과(군) 간 선택 (택1)", grade: 2, targetGrade: 2, semester: "1학기",
        selectCount: 1, credits: 3,
        description: "2학년 1학기 교과(군) 간 선택 선택군3 (택1, 3학점)",
        subjects: [
          { name: "일본어", semesters: [1] },
          { name: "중국어", semesters: [1] },
        ]
      },
      {
        id: "선택군4", name: "2학년 2학기 교과(군) 간 선택 (택1)", grade: 2, targetGrade: 2, semester: "2학기",
        selectCount: 1, credits: 3,
        description: "2학년 2학기 교과(군) 간 선택 선택군4 (택1, 3학점)",
        subjects: [
          { name: "일본 문화", semesters: [2] },
          { name: "중국 문화", semesters: [2] },
        ]
      },
      {
        id: "선택군5", name: "2학년 1학기 교과(군) 간 선택 (택1)", grade: 2, targetGrade: 2, semester: "1학기",
        selectCount: 1, credits: 2,
        description: "2학년 1학기 교과(군) 간 선택 선택군5 (택1, 2학점)",
        subjects: [
          { name: "음악 연주와 창작", semesters: [1] },
          { name: "미술 창작", semesters: [1] },
        ]
      },
      {
        id: "선택군6", name: "2학년 2학기 교과(군) 간 선택 (택1)", grade: 2, targetGrade: 2, semester: "2학기",
        selectCount: 1, credits: 2,
        description: "2학년 2학기 교과(군) 간 선택 선택군6 (택1, 2학점)",
        subjects: [
          { name: "음악과 미디어", semesters: [2] },
          { name: "미술과 매체", semesters: [2] },
        ]
      },
      {
        id: "선택군7", name: "3학년 1학기 교과(군) 간 선택 (택4)", grade: 3, targetGrade: 3, semester: "1학기",
        selectCount: 4, credits: 3,
        description: "3학년 1학기 교과(군) 간 선택 선택군7 (택4, 12학점)",
        subjects: [
          { name: "독서 토론과 글쓰기", semesters: [1] },
          { name: "미적분Ⅱ", semesters: [1] },
          { name: "심화 영어 독해와 작문", semesters: [1] },
          { name: "사회와 문화", semesters: [1] },
          { name: "세계 문제와 미래 사회", semesters: [1] },
          { name: "기후변화와 지속가능한 세계", semesters: [1] },
          { name: "사회문제 탐구", semesters: [1] },
          { name: "전자기와 양자", semesters: [1] },
          { name: "화학 반응의 세계", semesters: [1] },
          { name: "생물의 유전", semesters: [1] },
          { name: "행성우주과학", semesters: [1] },
          { name: "지구시스템과학", semesters: [1] },
          { name: "기후변화와 환경생태", semesters: [1] },
        ]
      },
      {
        id: "선택군8", name: "3학년 2학기 교과(군) 간 선택 (택4)", grade: 3, targetGrade: 3, semester: "2학기",
        selectCount: 4, credits: 3,
        description: "3학년 2학기 교과(군) 간 선택 선택군8 (택4, 12학점)",
        subjects: [
          { name: "매체 의사소통", semesters: [2] },
          { name: "전문 수학", semesters: [2] },
          { name: "세계 문화와 영어", semesters: [2] },
          { name: "도시의 미래 탐구", semesters: [2] },
          { name: "사회과제 연구", semesters: [2] },
          { name: "여행지리", semesters: [2] },
          { name: "역사로 탐구하는 현대 세계", semesters: [2] },
          { name: "고급 물리학", semesters: [2] },
          { name: "고급 화학", semesters: [2] },
          { name: "고급 생명과학", semesters: [2] },
          { name: "과학의 역사와 문화", semesters: [2] },
          { name: "융합과학 탐구", semesters: [2] },
        ]
      },
      {
        id: "선택군9", name: "3학년 1학기 교과(군) 간 선택 (택1)", grade: 3, targetGrade: 3, semester: "1학기",
        selectCount: 1, credits: 3,
        description: "3학년 1학기 교과(군) 간 선택 선택군9 (택1, 3학점)",
        subjects: [
          { name: "로봇과 공학세계", semesters: [1] },
          { name: "소프트웨어와 생활", semesters: [1] },
        ]
      },
      {
        id: "선택군10", name: "3학년 2학기 교과(군) 간 선택 (택1)", grade: 3, targetGrade: 3, semester: "2학기",
        selectCount: 1, credits: 3,
        description: "3학년 2학기 교과(군) 간 선택 선택군10 (택1, 3학점)",
        subjects: [
          { name: "창의 공학 설계", semesters: [2] },
          { name: "인공지능 융합 프로젝트", semesters: [2] },
        ]
      },
    ]
  },
  // 성남여자고등학교
  "seongnam_girls": {
    mandatory: {
      1: [
        { name: "공통국어1", semesters: [1], credit: 4 },
        { name: "공통국어2", semesters: [2], credit: 4 },
        { name: "공통수학1", semesters: [1], credit: 4 },
        { name: "공통수학2", semesters: [2], credit: 4 },
        { name: "공통영어1", semesters: [1], credit: 4 },
        { name: "공통영어2", semesters: [2], credit: 4 },
        { name: "한국사1", semesters: [1], credit: 3 },
        { name: "한국사2", semesters: [2], credit: 3 },
        { name: "통합사회1", semesters: [1], credit: 3 },
        { name: "통합사회2", semesters: [2], credit: 3 },
        { name: "통합과학1", semesters: [1], credit: 3 },
        { name: "통합과학2", semesters: [2], credit: 3 },
        { name: "과학탐구실험1", semesters: [1], credit: 1 },
        { name: "과학탐구실험2", semesters: [2], credit: 1 },
        { name: "체육1", semesters: [1], credit: 2 },
        { name: "체육2", semesters: [2], credit: 2 },
        { name: "음악↔미술", semesters: [1, 2], credit: 2 },
        { name: "기술·가정↔정보", semesters: [1, 2], credit: 3 },
      ],
      2: [
        { name: "문학", semesters: [1], credit: 4 },
        { name: "독서와 작문", semesters: [2], credit: 4 },
        { name: "대수", semesters: [1], credit: 4 },
        { name: "미적분Ⅰ", semesters: [2], credit: 4 },
        { name: "영어Ⅰ", semesters: [1], credit: 4 },
        { name: "영어Ⅱ", semesters: [2], credit: 4 },
        { name: "스포츠 생활1", semesters: [1], credit: 2 },
        { name: "스포츠 생활2", semesters: [2], credit: 2 },
      ],
      3: [
        { name: "화법과 언어", semesters: [1], credit: 4 },
        { name: "주제 탐구 독서", semesters: [2], credit: 4 },
        { name: "확률과 통계", semesters: [1], credit: 4 },
        { name: "실용 통계", semesters: [2], credit: 3 },
        { name: "영어 독해와 작문", semesters: [1], credit: 3 },
        { name: "심화 영어 독해와 작문", semesters: [2], credit: 4 },
        { name: "스포츠 문화", semesters: [1], credit: 1 },
        { name: "스포츠 과학", semesters: [2], credit: 1 },
      ],
    },
    groups: [
      {
        id: "선택군1", name: "2학년 1학기 교과(군) 간 선택 (택5)", grade: 2, targetGrade: 2, semester: "1학기",
        selectCount: 5, credits: 3,
        description: "2학년 1학기 교과(군) 간 선택 선택군1 (택5, 15학점)",
        subjects: [
          { name: "언어생활 탐구", semesters: [1] },
          { name: "기하", semesters: [1] },
          { name: "세계 문화와 영어", semesters: [1] },
          { name: "세계사", semesters: [1] },
          { name: "사회와 문화", semesters: [1] },
          { name: "윤리와 사상", semesters: [1] },
          { name: "여행지리", semesters: [1] },
          { name: "윤리문제 탐구", semesters: [1] },
          { name: "물리학", semesters: [1] },
          { name: "화학", semesters: [1] },
          { name: "생명과학", semesters: [1] },
          { name: "과학의 역사와 문화일본어", semesters: [1] },
          { name: "중국어", semesters: [1] },
          { name: "인공지능 기초", semesters: [1] },
          { name: "음악 연주와 창작", semesters: [1] },
          { name: "미술 창작", semesters: [1] },
        ]
      },
      {
        id: "선택군2", name: "2학년 2학기 교과(군) 간 선택 (택5)", grade: 2, targetGrade: 2, semester: "2학기",
        selectCount: 5, credits: 3,
        description: "2학년 2학기 교과(군) 간 선택 선택군2 (택5, 15학점)",
        subjects: [
          { name: "독서 토론과 글쓰기", semesters: [2] },
          { name: "인공지능 수학", semesters: [2] },
          { name: "영미 문학 읽기", semesters: [2] },
          { name: "세계시민과 지리", semesters: [2] },
          { name: "인문학과 윤리", semesters: [2] },
          { name: "경제", semesters: [2] },
          { name: "사회문제 탐구", semesters: [2] },
          { name: "역사로 탐구하는 현대 세계", semesters: [2] },
          { name: "지구과학", semesters: [2] },
          { name: "세포와 물질대사", semesters: [2] },
          { name: "화학 반응의 세계", semesters: [2] },
          { name: "역학과 에너지", semesters: [2] },
          { name: "과학과제 연구", semesters: [2] },
          { name: "일본어 회화", semesters: [2] },
          { name: "중국어 회화", semesters: [2] },
          { name: "소프트웨어와 생활", semesters: [2] },
          { name: "음악 감상과 비평", semesters: [2] },
          { name: "미술 감상과 비평", semesters: [2] },
        ]
      },
      {
        id: "선택군3", name: "3학년 1학기 교과(군) 간 선택 (택5)", grade: 3, targetGrade: 3, semester: "1학기",
        selectCount: 5, credits: 3,
        description: "3학년 1학기 교과(군) 간 선택 선택군3 (택5, 15학점)",
        subjects: [
          { name: "문학과 영상", semesters: [1] },
          { name: "미적분Ⅱ", semesters: [1] },
          { name: "심화 영어", semesters: [1] },
          { name: "법과 사회", semesters: [1] },
          { name: "정치", semesters: [1] },
          { name: "한국지리 탐구", semesters: [1] },
          { name: "현대사회와 윤리", semesters: [1] },
          { name: "역사로 탐구하는 현대 세계", semesters: [1] },
          { name: "전자기와 양자", semesters: [1] },
          { name: "물질과 에너지", semesters: [1] },
          { name: "생물의 유전", semesters: [1] },
          { name: "지구시스템과학", semesters: [1] },
          { name: "행성우주과학", semesters: [1] },
          { name: "융합과학 탐구", semesters: [1] },
          { name: "일본 문화", semesters: [1] },
          { name: "중국 문화", semesters: [1] },
          { name: "데이터 과학", semesters: [1] },
          { name: "생활과학 탐구", semesters: [1] },
          { name: "음악과 미디어", semesters: [1] },
          { name: "미술과 매체", semesters: [1] },
        ]
      },
      {
        id: "선택군4", name: "3학년 2학기 교과(군) 간 선택 (택5)", grade: 3, targetGrade: 3, semester: "2학기",
        selectCount: 5, credits: 3,
        description: "3학년 2학기 교과(군) 간 선택 선택군4 (택5, 15학점)",
        subjects: [
          { name: "매체 의사소통", semesters: [2] },
          { name: "수학과 문화", semesters: [2] },
          { name: "미디어 영어", semesters: [2] },
          { name: "금융과 경제생활", semesters: [2] },
          { name: "동아시아 역사 기행", semesters: [2] },
          { name: "기후변화와 지속가능한 세계", semesters: [2] },
          { name: "여행지리", semesters: [2] },
          { name: "윤리문제 탐구", semesters: [2] },
          { name: "융합과학 탐구", semesters: [2] },
          { name: "과학의 역사와 문화", semesters: [2] },
          { name: "기후변화와 환경생태", semesters: [2] },
          { name: "심화 일본어", semesters: [2] },
          { name: "심화 중국어", semesters: [2] },
          { name: "정보과학", semesters: [2] },
          { name: "창의 공학 설계", semesters: [2] },
        ]
      },
      {
        id: "선택군5", name: "3학년 1학기 교과(군) 간 선택 (택1)", grade: 3, targetGrade: 3, semester: "1학기",
        selectCount: 1, credits: 2,
        description: "3학년 1학기 교과(군) 간 선택 선택군5 (택1, 2학점)",
        subjects: [
          { name: "인간과 심리", semesters: [1] },
          { name: "비판적 질문과 창의적 해결", semesters: [1] },
        ]
      },
      {
        id: "선택군6", name: "3학년 2학기 교과(군) 간 선택 (택1)", grade: 3, targetGrade: 3, semester: "2학기",
        selectCount: 1, credits: 2,
        description: "3학년 2학기 교과(군) 간 선택 선택군6 (택1, 2학점)",
        subjects: [
          { name: "논리와 사고", semesters: [2] },
          { name: "미디어정보리터러시", semesters: [2] },
        ]
      },
    ]
  },
  // 동광고등학교
  "donggwang": {
    mandatory: {
      1: [
        { name: "공통국어1", semesters: [1], credit: 4 },
        { name: "공통국어2", semesters: [2], credit: 4 },
        { name: "공통수학1", semesters: [1], credit: 4 },
        { name: "공통수학2", semesters: [2], credit: 4 },
        { name: "공통영어1", semesters: [1], credit: 4 },
        { name: "공통영어2", semesters: [2], credit: 4 },
        { name: "한국사1", semesters: [1], credit: 3 },
        { name: "한국사2", semesters: [2], credit: 3 },
        { name: "통합사회1", semesters: [1], credit: 4 },
        { name: "통합사회2", semesters: [2], credit: 4 },
        { name: "통합과학1", semesters: [1], credit: 4 },
        { name: "통합과학2", semesters: [2], credit: 4 },
        { name: "과학탐구실험1", semesters: [1], credit: 1 },
        { name: "과학탐구실험2", semesters: [2], credit: 1 },
        { name: "체육1", semesters: [1], credit: 2 },
        { name: "체육2", semesters: [2], credit: 2 },
        { name: "정보", semesters: [1], credit: 3 },
        { name: "인공지능 기초", semesters: [2], credit: 3 },
      ],
      2: [
        { name: "문학", semesters: [1], credit: 4 },
        { name: "독서와 작문", semesters: [2], credit: 4 },
        { name: "대수", semesters: [1], credit: 4 },
        { name: "미적분Ⅰ", semesters: [2], credit: 4 },
        { name: "영어Ⅰ", semesters: [1], credit: 4 },
        { name: "영어Ⅱ", semesters: [2], credit: 4 },
        { name: "스포츠 문화", semesters: [1], credit: 1 },
        { name: "스포츠 과학", semesters: [2], credit: 1 },
        { name: "음악↔미술", semesters: [1, 2], credit: 2 },
        { name: "논술↔논리와 사고", semesters: [1, 2], credit: 2 },
      ],
      3: [
        { name: "화법과 언어", semesters: [1], credit: 3 },
        { name: "독서 토론과 글쓰기", semesters: [2], credit: 3 },
        { name: "확률과 통계", semesters: [1], credit: 3 },
        { name: "실용 통계", semesters: [2], credit: 3 },
        { name: "영어 독해와 작문", semesters: [1], credit: 3 },
        { name: "심화 영어 독해와 작문", semesters: [2], credit: 3 },
        { name: "스포츠 생활1", semesters: [1], credit: 2 },
        { name: "스포츠 생활2", semesters: [2], credit: 2 },
      ],
    },
    groups: [
      {
        id: "선택군1", name: "2학년 1학기 교과(군) 간 선택 (택3)", grade: 2, targetGrade: 2, semester: "1학기",
        selectCount: 3, credits: 3,
        description: "2학년 1학기 교과(군) 간 선택 선택군1 (택3, 9학점)",
        subjects: [
          { name: "물리학", semesters: [1] },
          { name: "화학", semesters: [1] },
          { name: "생명과학", semesters: [1] },
          { name: "지구과학", semesters: [1] },
          { name: "세계시민과 지리", semesters: [1] },
          { name: "사회와 문화", semesters: [1] },
          { name: "현대사회와 윤리", semesters: [1] },
          { name: "동아시아 역사 기행", semesters: [1] },
        ]
      },
      {
        id: "선택군2", name: "2학년 2학기 교과(군) 간 선택 (택3)", grade: 2, targetGrade: 2, semester: "2학기",
        selectCount: 3, credits: 3,
        description: "2학년 2학기 교과(군) 간 선택 선택군2 (택3, 9학점)",
        subjects: [
          { name: "역학과 에너지", semesters: [2] },
          { name: "물질과 에너지", semesters: [2] },
          { name: "세포와 물질대사", semesters: [2] },
          { name: "지구시스템과학", semesters: [2] },
          { name: "한국지리 탐구", semesters: [2] },
          { name: "정치", semesters: [2] },
          { name: "경제", semesters: [2] },
          { name: "윤리문제 탐구", semesters: [2] },
          { name: "세계사", semesters: [2] },
        ]
      },
      {
        id: "선택군3", name: "2학년 1학기 교과(군) 간 선택 (택1)", grade: 2, targetGrade: 2, semester: "1학기",
        selectCount: 1, credits: 3,
        description: "2학년 1학기 교과(군) 간 선택 선택군3 (택1, 3학점)",
        subjects: [
          { name: "일본어", semesters: [1] },
          { name: "독일어", semesters: [1] },
        ]
      },
      {
        id: "선택군4", name: "2학년 2학기 교과(군) 간 선택 (택1)", grade: 2, targetGrade: 2, semester: "2학기",
        selectCount: 1, credits: 3,
        description: "2학년 2학기 교과(군) 간 선택 선택군4 (택1, 3학점)",
        subjects: [
          { name: "일본어 회화", semesters: [2] },
          { name: "독일어 회화", semesters: [2] },
          { name: "기하", semesters: [2] },
        ]
      },
      {
        id: "선택군5", name: "3학년 1학기 교과(군) 간 선택 (택5)", grade: 3, targetGrade: 3, semester: "1학기",
        selectCount: 5, credits: 3,
        description: "3학년 1학기 교과(군) 간 선택 선택군5 (택5, 15학점)",
        subjects: [
          { name: "주제 탐구 독서", semesters: [1] },
          { name: "미적분Ⅱ", semesters: [1] },
          { name: "세계 문화와 영어", semesters: [1] },
          { name: "전자기와 양자", semesters: [1] },
          { name: "화학 반응의 세계", semesters: [1] },
          { name: "생물의 유전", semesters: [1] },
          { name: "행성우주과학", semesters: [1] },
          { name: "융합과학 탐구", semesters: [1] },
          { name: "여행지리", semesters: [1] },
          { name: "윤리와 사상", semesters: [1] },
          { name: "사회문제 탐구", semesters: [1] },
          { name: "역사로 탐구하는 현대 세계", semesters: [1] },
          { name: "일본 문화", semesters: [1] },
          { name: "독일어권 문화", semesters: [1] },
        ]
      },
      {
        id: "선택군6", name: "3학년 2학기 교과(군) 간 선택 (택5)", grade: 3, targetGrade: 3, semester: "2학기",
        selectCount: 5, credits: 3,
        description: "3학년 2학기 교과(군) 간 선택 선택군6 (택5, 15학점)",
        subjects: [
          { name: "문학과 영상", semesters: [2] },
          { name: "전문 수학", semesters: [2] },
          { name: "실생활 영어 회화", semesters: [2] },
          { name: "물리학 실험", semesters: [2] },
          { name: "고급 화학", semesters: [2] },
          { name: "고급 생명과학", semesters: [2] },
          { name: "기후변화와 환경생태", semesters: [2] },
          { name: "과학의 역사와 문화", semesters: [2] },
          { name: "기후변화와 지속가능한 세계", semesters: [2] },
          { name: "인문학과 윤리", semesters: [2] },
          { name: "금융과 경제생활", semesters: [2] },
          { name: "현대 세계의 변화", semesters: [2] },
          { name: "심화 일본어", semesters: [2] },
          { name: "심화 독일어", semesters: [2] },
        ]
      },
      {
        id: "선택군7", name: "3학년 1학기 교과(군) 간 선택 (택1)", grade: 3, targetGrade: 3, semester: "1학기",
        selectCount: 1, credits: 3,
        description: "3학년 1학기 교과(군) 간 선택 선택군7 (택1, 3학점)",
        subjects: [
          { name: "음악 연주와 창작", semesters: [1] },
          { name: "미술 창작", semesters: [1] },
        ]
      },
      {
        id: "선택군8", name: "3학년 2학기 교과(군) 간 선택 (택1)", grade: 3, targetGrade: 3, semester: "2학기",
        selectCount: 1, credits: 3,
        description: "3학년 2학기 교과(군) 간 선택 선택군8 (택1, 3학점)",
        subjects: [
          { name: "음악 감상과 비평", semesters: [2] },
          { name: "미술과 매체", semesters: [2] },
        ]
      },
    ]
  },
  // 성일고등학교
  "sungil": {
    mandatory: {
      1: [
        { name: "공통국어1", semesters: [1], credit: 4 },
        { name: "공통국어2", semesters: [2], credit: 4 },
        { name: "공통수학1", semesters: [1], credit: 4 },
        { name: "공통수학2", semesters: [2], credit: 4 },
        { name: "공통영어1", semesters: [1], credit: 4 },
        { name: "공통영어2", semesters: [2], credit: 4 },
        { name: "한국사1", semesters: [1], credit: 3 },
        { name: "한국사2", semesters: [2], credit: 3 },
        { name: "통합사회1", semesters: [1], credit: 4 },
        { name: "통합사회2", semesters: [2], credit: 4 },
        { name: "통합과학1", semesters: [1], credit: 4 },
        { name: "통합과학2", semesters: [2], credit: 4 },
        { name: "과학탐구실험1", semesters: [1], credit: 1 },
        { name: "과학탐구실험2", semesters: [2], credit: 1 },
        { name: "체육1", semesters: [1], credit: 2 },
        { name: "체육2", semesters: [2], credit: 2 },
        { name: "음악↔미술", semesters: [1, 2], credit: 3 },
      ],
      2: [
        { name: "문학", semesters: [1], credit: 4 },
        { name: "화법과 언어", semesters: [2], credit: 4 },
        { name: "대수", semesters: [1], credit: 4 },
        { name: "미적분Ⅰ", semesters: [2], credit: 4 },
        { name: "영어Ⅰ", semesters: [1], credit: 4 },
        { name: "영어Ⅱ", semesters: [2], credit: 4 },
        { name: "운동과 건강", semesters: [1], credit: 2 },
        { name: "스포츠 생활1", semesters: [2], credit: 2 },
        { name: "정보", semesters: [1], credit: 3 },
        { name: "인공지능 기초", semesters: [2], credit: 3 },
      ],
      3: [
        { name: "독서와 작문", semesters: [1], credit: 3 },
        { name: "확률과 통계", semesters: [1], credit: 3 },
        { name: "영어 독해와 작문", semesters: [1], credit: 3 },
        { name: "스포츠 문화", semesters: [1], credit: 1 },
        { name: "스포츠 과학", semesters: [2], credit: 1 },
      ],
    },
    groups: [
      {
        id: "선택군1", name: "2학년 1학기 교과(군) 간 선택 (택1)", grade: 2, targetGrade: 2, semester: "1학기",
        selectCount: 1, credits: 3,
        description: "2학년 1학기 교과(군) 간 선택 선택군1 (택1, 3학점)",
        subjects: [
          { name: "주제 탐구 독서", semesters: [1] },
          { name: "기하", semesters: [1] },
          { name: "영어 발표와 토론", semesters: [1] },
        ]
      },
      {
        id: "선택군2", name: "2학년 2학기 교과(군) 간 선택 (택1)", grade: 2, targetGrade: 2, semester: "2학기",
        selectCount: 1, credits: 3,
        description: "2학년 2학기 교과(군) 간 선택 선택군2 (택1, 3학점)",
        subjects: [
          { name: "문학과 영상", semesters: [2] },
          { name: "실용 통계", semesters: [2] },
          { name: "세계 문화와 영어", semesters: [2] },
        ]
      },
      {
        id: "선택군3", name: "2학년 1학기 교과(군) 간 선택 (택3)", grade: 2, targetGrade: 2, semester: "1학기",
        selectCount: 3, credits: 3,
        description: "2학년 1학기 교과(군) 간 선택 선택군3 (택3, 9학점)",
        subjects: [
          { name: "물리학", semesters: [1] },
          { name: "화학", semesters: [1] },
          { name: "생명과학", semesters: [1] },
          { name: "지구과학", semesters: [1] },
          { name: "인문학과 윤리", semesters: [1] },
          { name: "경제", semesters: [1] },
          { name: "동아시아 역사 기행", semesters: [1] },
          { name: "한국지리 탐구", semesters: [1] },
        ]
      },
      {
        id: "선택군4", name: "2학년 2학기 교과(군) 간 선택 (택3)", grade: 2, targetGrade: 2, semester: "2학기",
        selectCount: 3, credits: 3,
        description: "2학년 2학기 교과(군) 간 선택 선택군4 (택3, 9학점)",
        subjects: [
          { name: "역학과 에너지", semesters: [2] },
          { name: "물질과 에너지", semesters: [2] },
          { name: "세포와 물질대사", semesters: [2] },
          { name: "지구시스템과학", semesters: [2] },
          { name: "현대사회와 윤리", semesters: [2] },
          { name: "사회와 문화", semesters: [2] },
          { name: "세계사", semesters: [2] },
          { name: "세계시민과 지리", semesters: [2] },
        ]
      },
      {
        id: "선택군5", name: "3학년 1학기 교과(군) 간 선택 (택1)", grade: 3, targetGrade: 3, semester: "1학기",
        selectCount: 1, credits: 3,
        description: "3학년 1학기 교과(군) 간 선택 선택군5 (택1, 3학점)",
        subjects: [
          { name: "언어생활 탐구", semesters: [1] },
          { name: "미적분Ⅱ", semesters: [1] },
          { name: "심화 영어", semesters: [1] },
        ]
      },
      {
        id: "선택군6", name: "3학년 2학기 교과(군) 간 선택 (택4)", grade: 3, targetGrade: 3, semester: "2학기",
        selectCount: 4, credits: 3,
        description: "3학년 2학기 교과(군) 간 선택 선택군6 (택4, 12학점)",
        subjects: [
          { name: "매체 의사소통", semesters: [2] },
          { name: "독서 토론과 글쓰기", semesters: [2] },
          { name: "수학과제 탐구", semesters: [2] },
          { name: "이산 수학", semesters: [2] },
          { name: "미디어 영어", semesters: [2] },
          { name: "심화 영어 독해와 작문", semesters: [2] },
        ]
      },
      {
        id: "선택군7", name: "3학년 1학기 교과(군) 간 선택 (택3)", grade: 3, targetGrade: 3, semester: "1학기",
        selectCount: 3, credits: 3,
        description: "3학년 1학기 교과(군) 간 선택 선택군7 (택3, 9학점)",
        subjects: [
          { name: "전자기와 양자", semesters: [1] },
          { name: "화학 반응의 세계", semesters: [1] },
          { name: "생물의 유전", semesters: [1] },
          { name: "행성우주과학", semesters: [1] },
          { name: "고급 물리학", semesters: [1] },
          { name: "고급 생명과학", semesters: [1] },
          { name: "고급 화학", semesters: [1] },
          { name: "윤리와 사상", semesters: [1] },
          { name: "정치", semesters: [1] },
          { name: "법과 사회", semesters: [1] },
          { name: "도시의 미래 탐구", semesters: [1] },
          { name: "사회문제 탐구", semesters: [1] },
        ]
      },
      {
        id: "선택군8", name: "3학년 2학기 교과(군) 간 선택 (택3)", grade: 3, targetGrade: 3, semester: "2학기",
        selectCount: 3, credits: 3,
        description: "3학년 2학기 교과(군) 간 선택 선택군8 (택3, 9학점)",
        subjects: [
          { name: "과학의 역사와 문화", semesters: [2] },
          { name: "융합과학 탐구", semesters: [2] },
          { name: "기후변화와 환경생태", semesters: [2] },
          { name: "과학과제 연구", semesters: [2] },
          { name: "물리학 실험", semesters: [2] },
          { name: "생명과학 실험", semesters: [2] },
          { name: "화학 실험", semesters: [2] },
          { name: "윤리문제 탐구", semesters: [2] },
          { name: "금융과 경제생활", semesters: [2] },
          { name: "역사로 탐구하는 현대 세계", semesters: [2] },
          { name: "기후변화와 지속가능한 세계", semesters: [2] },
          { name: "여행지리", semesters: [2] },
        ]
      },
      {
        id: "선택군9", name: "3학년 1학기 교과(군) 간 선택 (택1)", grade: 3, targetGrade: 3, semester: "1학기",
        selectCount: 1, credits: 2,
        description: "3학년 1학기 교과(군) 간 선택 선택군9 (택1, 2학점)",
        subjects: [
          { name: "음악 감상과 비평", semesters: [1] },
          { name: "미술 감상과 비평", semesters: [1] },
        ]
      },
      {
        id: "선택군10", name: "3학년 2학기 교과(군) 간 선택 (택1)", grade: 3, targetGrade: 3, semester: "2학기",
        selectCount: 1, credits: 2,
        description: "3학년 2학기 교과(군) 간 선택 선택군10 (택1, 2학점)",
        subjects: [
          { name: "음악 연주와 창작", semesters: [2] },
          { name: "미술 창작", semesters: [2] },
        ]
      },
      {
        id: "선택군11", name: "3학년 1학기 교과(군) 간 선택 (택1)", grade: 3, targetGrade: 3, semester: "1학기",
        selectCount: 1, credits: 3,
        description: "3학년 1학기 교과(군) 간 선택 선택군11 (택1, 3학점)",
        subjects: [
          { name: "중국어", semesters: [1] },
          { name: "일본어", semesters: [1] },
        ]
      },
      {
        id: "선택군12", name: "3학년 2학기 교과(군) 간 선택 (택1)", grade: 3, targetGrade: 3, semester: "2학기",
        selectCount: 1, credits: 3,
        description: "3학년 2학기 교과(군) 간 선택 선택군12 (택1, 3학점)",
        subjects: [
          { name: "중국 문화", semesters: [2] },
          { name: "일본 문화", semesters: [2] },
        ]
      },
      {
        id: "선택군13", name: "3학년 1학기 교과(군) 간 선택 (택1)", grade: 3, targetGrade: 3, semester: "1학기",
        selectCount: 1, credits: 2,
        description: "3학년 1학기 교과(군) 간 선택 선택군13 (택1, 2학점)",
        subjects: [
          { name: "생태와 환경", semesters: [1] },
          { name: "인간과 철학", semesters: [1] },
          { name: "인간과 심리", semesters: [1] },
          { name: "교육의 이해", semesters: [1] },
          { name: "인간과 경제활동", semesters: [1] },
        ]
      },
      {
        id: "선택군14", name: "3학년 2학기 교과(군) 간 선택 (택1)", grade: 3, targetGrade: 3, semester: "2학기",
        selectCount: 1, credits: 2,
        description: "3학년 2학기 교과(군) 간 선택 선택군14 (택1, 2학점)",
        subjects: [
          { name: "생태와 환경", semesters: [2] },
          { name: "인간과 철학", semesters: [2] },
          { name: "인간과 심리", semesters: [2] },
          { name: "교육의 이해", semesters: [2] },
          { name: "인간과 경제활동", semesters: [2] },
        ]
      },
    ]
  },
  // 분당영덕여자고등학교
  "bundang_yeongdeok": {
    mandatory: {
      1: [
        { name: "공통국어1", semesters: [1], credit: 4 },
        { name: "공통국어2", semesters: [2], credit: 4 },
        { name: "공통수학1", semesters: [1], credit: 4 },
        { name: "공통수학2", semesters: [2], credit: 4 },
        { name: "공통영어1", semesters: [1], credit: 3 },
        { name: "공통영어2", semesters: [2], credit: 3 },
        { name: "한국사1", semesters: [1], credit: 3 },
        { name: "한국사2", semesters: [2], credit: 3 },
        { name: "통합사회1", semesters: [1], credit: 3 },
        { name: "통합사회2", semesters: [2], credit: 3 },
        { name: "통합과학1", semesters: [1], credit: 4 },
        { name: "통합과학2", semesters: [2], credit: 4 },
        { name: "과학탐구실험1", semesters: [1], credit: 1 },
        { name: "과학탐구실험2", semesters: [2], credit: 1 },
        { name: "체육1", semesters: [1], credit: 2 },
        { name: "체육2", semesters: [2], credit: 2 },
        { name: "음악↔미술", semesters: [1, 2], credit: 3 },
        { name: "중국어↔언어생활과 한자", semesters: [1, 2], credit: 3 },
      ],
      2: [
        { name: "독서와 작문", semesters: [1], credit: 3 },
        { name: "문학", semesters: [2], credit: 3 },
        { name: "대수", semesters: [1], credit: 3 },
        { name: "확률과 통계", semesters: [1], credit: 3 },
        { name: "미적분Ⅰ", semesters: [2], credit: 3 },
        { name: "영어Ⅰ", semesters: [1], credit: 4 },
        { name: "영어Ⅱ", semesters: [2], credit: 4 },
        { name: "운동과 건강", semesters: [1], credit: 2 },
        { name: "스포츠 생활1", semesters: [2], credit: 2 },
        { name: "미술 창작↔음악과 융합", semesters: [1, 2], credit: 2 },
      ],
      3: [
        { name: "화법과 언어", semesters: [1], credit: 3 },
        { name: "독서 토론과 글쓰기", semesters: [2], credit: 3 },
        { name: "심화 영어", semesters: [1], credit: 4 },
        { name: "심화 영어 독해와 작문", semesters: [2], credit: 4 },
        { name: "스포츠 문화", semesters: [1], credit: 2 },
        { name: "스포츠 과학", semesters: [2], credit: 2 },
      ],
    },
    groups: [
      {
        id: "선택군1", name: "2학년 1학기 교과(군) 간 선택 (택3)", grade: 2, targetGrade: 2, semester: "1학기",
        selectCount: 3, credits: 3,
        description: "2학년 1학기 교과(군) 간 선택 선택군1 (택3, 9학점)",
        subjects: [
          { name: "세계시민과 지리", semesters: [1] },
          { name: "세계사", semesters: [1] },
          { name: "사회와 문화", semesters: [1] },
          { name: "현대사회와 윤리", semesters: [1] },
          { name: "물리학", semesters: [1] },
          { name: "화학", semesters: [1] },
          { name: "생명과학", semesters: [1] },
        ]
      },
      {
        id: "선택군2", name: "2학년 1학기 교과(군) 간 선택 (택1)", grade: 2, targetGrade: 2, semester: "1학기",
        selectCount: 1, credits: 3,
        description: "2학년 1학기 교과(군) 간 선택 선택군2 (택1, 3학점)",
        subjects: [
          { name: "정보", semesters: [1] },
          { name: "독일어", semesters: [1] },
          { name: "중국어 회화", semesters: [1] },
        ]
      },
      {
        id: "선택군3", name: "2학년 2학기 교과(군) 간 선택 (택1)", grade: 2, targetGrade: 2, semester: "2학기",
        selectCount: 1, credits: 3,
        description: "2학년 2학기 교과(군) 간 선택 선택군3 (택1, 3학점)",
        subjects: [
          { name: "기하", semesters: [2] },
          { name: "주제 탐구 독서", semesters: [2] },
          { name: "영어 발표와 토론", semesters: [2] },
        ]
      },
      {
        id: "선택군4", name: "2학년 2학기 교과(군) 간 선택 (택3)", grade: 2, targetGrade: 2, semester: "2학기",
        selectCount: 3, credits: 3,
        description: "2학년 2학기 교과(군) 간 선택 선택군4 (택3, 9학점)",
        subjects: [
          { name: "한국지리 탐구", semesters: [2] },
          { name: "동아시아 역사 기행", semesters: [2] },
          { name: "정치", semesters: [2] },
          { name: "법과 사회", semesters: [2] },
          { name: "경제", semesters: [2] },
          { name: "윤리와 사상", semesters: [2] },
          { name: "지구과학", semesters: [2] },
          { name: "역학과 에너지", semesters: [2] },
          { name: "전자기와 양자", semesters: [2] },
          { name: "화학 반응의 세계", semesters: [2] },
          { name: "세포와 물질대사", semesters: [2] },
          { name: "생물의 유전", semesters: [2] },
        ]
      },
      {
        id: "선택군5", name: "2학년 2학기 교과(군) 간 선택 (택1)", grade: 2, targetGrade: 2, semester: "2학기",
        selectCount: 1, credits: 3,
        description: "2학년 2학기 교과(군) 간 선택 선택군5 (택1, 3학점)",
        subjects: [
          { name: "데이터 과학", semesters: [2] },
          { name: "독일어권 문화", semesters: [2] },
          { name: "중국 문화", semesters: [2] },
        ]
      },
      {
        id: "선택군6", name: "3학년 1학기 교과(군) 간 선택 (택3)", grade: 3, targetGrade: 3, semester: "1학기",
        selectCount: 3, credits: 3,
        description: "3학년 1학기 교과(군) 간 선택 선택군6 (택3, 9학점)",
        subjects: [
          { name: "문학과 영상", semesters: [1] },
          { name: "매체 의사소통", semesters: [1] },
          { name: "세계 문화와 영어", semesters: [1] },
          { name: "미적분Ⅱ", semesters: [1] },
          { name: "경제 수학", semesters: [1] },
          { name: "통합수학Ⅰ", semesters: [1] },
          { name: "물질과 에너지", semesters: [1] },
          { name: "지구시스템과학", semesters: [1] },
          { name: "행성우주과학", semesters: [1] },
        ]
      },
      {
        id: "선택군7", name: "3학년 1학기 교과(군) 간 선택 (택2)", grade: 3, targetGrade: 3, semester: "1학기",
        selectCount: 2, credits: 4,
        description: "3학년 1학기 교과(군) 간 선택 선택군7 (택2, 8학점)",
        subjects: [
          { name: "도시의 미래 탐구", semesters: [1] },
          { name: "문화로 보는 한국사", semesters: [1] },
          { name: "국제 관계의 이해", semesters: [1] },
          { name: "인문학과 윤리", semesters: [1] },
          { name: "사회문제 탐구", semesters: [1] },
          { name: "고급 물리학", semesters: [1] },
          { name: "고급 화학", semesters: [1] },
          { name: "고급 생명과학", semesters: [1] },
          { name: "융합과학 탐구", semesters: [1] },
        ]
      },
      {
        id: "선택군8", name: "3학년 2학기 교과(군) 간 선택 (택3)", grade: 3, targetGrade: 3, semester: "2학기",
        selectCount: 3, credits: 3,
        description: "3학년 2학기 교과(군) 간 선택 선택군8 (택3, 9학점)",
        subjects: [
          { name: "언어생활 탐구", semesters: [2] },
          { name: "미디어 영어", semesters: [2] },
          { name: "전문 수학", semesters: [2] },
          { name: "수학과제 탐구", semesters: [2] },
          { name: "고급 미적분", semesters: [2] },
          { name: "실용 통계", semesters: [2] },
        ]
      },
      {
        id: "선택군9", name: "3학년 2학기 교과(군) 간 선택 (택2)", grade: 3, targetGrade: 3, semester: "2학기",
        selectCount: 2, credits: 4,
        description: "3학년 2학기 교과(군) 간 선택 선택군9 (택2, 8학점)",
        subjects: [
          { name: "여행지리", semesters: [2] },
          { name: "역사로 탐구하는 현대 세계", semesters: [2] },
          { name: "윤리문제 탐구", semesters: [2] },
          { name: "기후변화와 지속가능한 세계", semesters: [2] },
          { name: "과학의 역사와 문화", semesters: [2] },
          { name: "기후변화와 환경생태", semesters: [2] },
          { name: "고급 지구과학", semesters: [2] },
        ]
      },
      {
        id: "선택군10", name: "3학년 1학기 교과(군) 간 선택 (택1)", grade: 3, targetGrade: 3, semester: "1학기",
        selectCount: 1, credits: 2,
        description: "3학년 1학기 교과(군) 간 선택 선택군10 (택1, 2학점)",
        subjects: [
          { name: "인공지능과 함께하는 세상", semesters: [1] },
          { name: "주제 탐구(R&E) 심화", semesters: [1] },
          { name: "비판적 질문과 창의적 해결", semesters: [1] },
        ]
      },
      {
        id: "선택군11", name: "3학년 2학기 교과(군) 간 선택 (택1)", grade: 3, targetGrade: 3, semester: "2학기",
        selectCount: 1, credits: 2,
        description: "3학년 2학기 교과(군) 간 선택 선택군11 (택1, 2학점)",
        subjects: [
          { name: "생태와 환경", semesters: [2] },
          { name: "인간과 심리", semesters: [2] },
        ]
      },
    ]
  },
  // 돌마고등학교
  "dolma": {
    mandatory: {
      1: [
        { name: "공통국어1", semesters: [1], credit: 4 },
        { name: "공통국어2", semesters: [2], credit: 4 },
        { name: "공통수학1", semesters: [1], credit: 4 },
        { name: "공통수학2", semesters: [2], credit: 4 },
        { name: "공통영어1", semesters: [1], credit: 3 },
        { name: "공통영어2", semesters: [2], credit: 3 },
        { name: "한국사1", semesters: [1], credit: 3 },
        { name: "한국사2", semesters: [2], credit: 3 },
        { name: "통합사회1", semesters: [1], credit: 3 },
        { name: "통합사회2", semesters: [2], credit: 3 },
        { name: "통합과학1", semesters: [1], credit: 4 },
        { name: "통합과학2", semesters: [2], credit: 4 },
        { name: "과학탐구실험1", semesters: [1], credit: 1 },
        { name: "과학탐구실험2", semesters: [2], credit: 1 },
        { name: "체육1", semesters: [1], credit: 2 },
        { name: "체육2", semesters: [2], credit: 2 },
        { name: "미술↔음악", semesters: [1, 2], credit: 2 },
        { name: "정보↔지식 재산 일반", semesters: [1, 2], credit: 3 },
      ],
      2: [
        { name: "문학", semesters: [1], credit: 4 },
        { name: "화법과 언어", semesters: [2], credit: 4 },
        { name: "대수", semesters: [1], credit: 4 },
        { name: "미적분Ⅰ", semesters: [2], credit: 4 },
        { name: "영어Ⅰ", semesters: [1], credit: 4 },
        { name: "영어Ⅱ", semesters: [2], credit: 4 },
        { name: "스포츠 생활1", semesters: [1], credit: 2 },
        { name: "스포츠 생활2", semesters: [2], credit: 2 },
      ],
      3: [
        { name: "독서와 작문", semesters: [1], credit: 4 },
        { name: "언어생활 탐구", semesters: [2], credit: 3 },
        { name: "확률과 통계", semesters: [1], credit: 3 },
        { name: "수학과 문화", semesters: [2], credit: 3 },
        { name: "영어 독해와 작문", semesters: [1], credit: 3 },
        { name: "심화 영어 독해와 작문", semesters: [2], credit: 3 },
        { name: "스포츠 문화", semesters: [1], credit: 1 },
        { name: "스포츠 과학", semesters: [2], credit: 1 },
        { name: "비판적 질문과 창의적 해결", semesters: [2], credit: 1 },
      ],
    },
    groups: [
      {
        id: "선택군1", name: "2학년 1학기 교과(군) 간 선택 (택5)", grade: 2, targetGrade: 2, semester: "1학기",
        selectCount: 5, credits: 3,
        description: "2학년 1학기 교과(군) 간 선택 선택군1 (택5, 15학점)",
        subjects: [
          { name: "주제 탐구 독서", semesters: [1] },
          { name: "인공지능 수학", semesters: [1] },
          { name: "수학과제 탐구", semesters: [1] },
          { name: "영미 문학 읽기", semesters: [1] },
          { name: "세계시민과 지리", semesters: [1] },
          { name: "세계사", semesters: [1] },
          { name: "현대사회와 윤리", semesters: [1] },
          { name: "정치", semesters: [1] },
          { name: "물리학", semesters: [1] },
          { name: "화학", semesters: [1] },
          { name: "생명과학", semesters: [1] },
          { name: "지구과학", semesters: [1] },
          { name: "음악 감상과 비평", semesters: [1] },
          { name: "미술 창작", semesters: [1] },
          { name: "중국어", semesters: [1] },
          { name: "일본어", semesters: [1] },
          { name: "한문", semesters: [1] },
        ]
      },
      {
        id: "선택군2", name: "2학년 2학기 교과(군) 간 선택 (택5)", grade: 2, targetGrade: 2, semester: "2학기",
        selectCount: 5, credits: 3,
        description: "2학년 2학기 교과(군) 간 선택 선택군2 (택5, 15학점)",
        subjects: [
          { name: "문학과 영상", semesters: [2] },
          { name: "기하", semesters: [2] },
          { name: "경제 수학", semesters: [2] },
          { name: "직무 영어", semesters: [2] },
          { name: "한국지리 탐구", semesters: [2] },
          { name: "동아시아 역사 기행", semesters: [2] },
          { name: "경제", semesters: [2] },
          { name: "인문학과 윤리", semesters: [2] },
          { name: "법과 사회", semesters: [2] },
          { name: "역학과 에너지", semesters: [2] },
          { name: "물질과 에너지", semesters: [2] },
          { name: "세포와 물질대사", semesters: [2] },
          { name: "지구시스템과학", semesters: [2] },
          { name: "미술과 매체", semesters: [2] },
          { name: "음악 연주와 창작", semesters: [2] },
          { name: "프로그래밍", semesters: [2] },
          { name: "중국어 회화", semesters: [2] },
          { name: "일본어 회화", semesters: [2] },
          { name: "한문 고전 읽기", semesters: [2] },
        ]
      },
      {
        id: "선택군3", name: "3학년 1학기 교과(군) 간 선택 (택6)", grade: 3, targetGrade: 3, semester: "1학기",
        selectCount: 6, credits: 3,
        description: "3학년 1학기 교과(군) 간 선택 선택군3 (택6, 18학점)",
        subjects: [
          { name: "매체 의사소통", semesters: [1] },
          { name: "미적분Ⅱ", semesters: [1] },
          { name: "심화 영어", semesters: [1] },
          { name: "미디어 영어", semesters: [1] },
          { name: "도시의 미래 탐구", semesters: [1] },
          { name: "한국사 심화 탐구", semesters: [1] },
          { name: "윤리와 사상", semesters: [1] },
          { name: "국제 관계의 이해", semesters: [1] },
          { name: "사회와 문화", semesters: [1] },
          { name: "사회문제 탐구", semesters: [1] },
          { name: "전자기와 양자", semesters: [1] },
          { name: "화학 반응의 세계", semesters: [1] },
          { name: "생물의 유전", semesters: [1] },
          { name: "행성우주과학", semesters: [1] },
          { name: "융합과학 탐구", semesters: [1] },
          { name: "중국 문화", semesters: [1] },
          { name: "일본 문화", semesters: [1] },
          { name: "언어생활과 한자", semesters: [1] },
          { name: "로봇과 공학세계", semesters: [1] },
          { name: "데이터 과학", semesters: [1] },
          { name: "인간과 심리", semesters: [1] },
        ]
      },
      {
        id: "선택군4", name: "3학년 2학기 교과(군) 간 선택 (택6)", grade: 3, targetGrade: 3, semester: "2학기",
        selectCount: 6, credits: 3,
        description: "3학년 2학기 교과(군) 간 선택 선택군4 (택6, 18학점)",
        subjects: [
          { name: "독서 토론과 글쓰기", semesters: [2] },
          { name: "실용 통계", semesters: [2] },
          { name: "고급 대수", semesters: [2] },
          { name: "세계 문화와 영어", semesters: [2] },
          { name: "여행지리", semesters: [2] },
          { name: "역사로 탐구하는 현대 세계", semesters: [2] },
          { name: "윤리문제 탐구", semesters: [2] },
          { name: "금융과 경제생활", semesters: [2] },
          { name: "기후변화와 지속가능한 세계", semesters: [2] },
          { name: "과학의 역사와 문화", semesters: [2] },
          { name: "기후변화와 환경생태", semesters: [2] },
          { name: "미술 감상과 비평", semesters: [2] },
          { name: "관광 일본어", semesters: [2] },
          { name: "관광 중국어", semesters: [2] },
          { name: "언어생활과 한자", semesters: [2] },
          { name: "창의 공학 설계", semesters: [2] },
          { name: "생태와 환경", semesters: [2] },
          { name: "인간과 철학", semesters: [2] },
        ]
      },
    ]
  },
  // 위례한빛고등학교
  "wirye_hanbit": {
    mandatory: {
      1: [
        { name: "공통국어1", semesters: [1], credit: 4 },
        { name: "공통국어2", semesters: [2], credit: 4 },
        { name: "공통수학1", semesters: [1], credit: 4 },
        { name: "공통수학2", semesters: [2], credit: 4 },
        { name: "공통영어1", semesters: [1], credit: 3 },
        { name: "공통영어2", semesters: [2], credit: 3 },
        { name: "한국사1", semesters: [1], credit: 3 },
        { name: "한국사2", semesters: [2], credit: 3 },
        { name: "통합사회1", semesters: [1], credit: 3 },
        { name: "통합사회2", semesters: [2], credit: 3 },
        { name: "통합과학1", semesters: [1], credit: 4 },
        { name: "통합과학2", semesters: [2], credit: 4 },
        { name: "과학탐구실험1", semesters: [1], credit: 1 },
        { name: "과학탐구실험2", semesters: [2], credit: 1 },
        { name: "체육1", semesters: [1], credit: 2 },
        { name: "체육2", semesters: [2], credit: 2 },
        { name: "음악↔미술", semesters: [1], credit: 3 },
        { name: "미술↔음악", semesters: [2], credit: 3 },
        { name: "정보↔기술·가정/한문 택1", semesters: [1], credit: 3 },
        { name: "기술·가정/한문 택 1↔정보", semesters: [2], credit: 3 },
      ],
      2: [
        { name: "문학", semesters: [1], credit: 4 },
        { name: "독서와 작문", semesters: [2], credit: 4 },
        { name: "대수", semesters: [1], credit: 4 },
        { name: "미적분Ⅰ", semesters: [2], credit: 4 },
        { name: "영어Ⅰ", semesters: [1], credit: 4 },
        { name: "영어Ⅱ", semesters: [2], credit: 4 },
        { name: "스포츠 생활1", semesters: [1], credit: 2 },
        { name: "스포츠 생활2", semesters: [2], credit: 2 },
      ],
      3: [
        { name: "화법과 언어", semesters: [1], credit: 3 },
        { name: "독서 토론과 글쓰기", semesters: [2], credit: 3 },
        { name: "확률과 통계", semesters: [1], credit: 3 },
        { name: "실용 통계", semesters: [2], credit: 3 },
        { name: "영어 독해와 작문", semesters: [1], credit: 3 },
        { name: "심화 영어", semesters: [2], credit: 3 },
        { name: "스포츠 문화", semesters: [1], credit: 1 },
        { name: "스포츠 과학", semesters: [2], credit: 1 },
      ],
    },
    groups: [
      {
        id: "선택군1", name: "2학년 1학기 교과(군) 간 선택 (택4)", grade: 2, targetGrade: 2, semester: "1학기",
        selectCount: 4, credits: 3,
        description: "2학년 1학기 교과(군) 간 선택 선택군1 (택4, 12학점)",
        subjects: [
          { name: "물리학", semesters: [1] },
          { name: "화학", semesters: [1] },
          { name: "생명과학", semesters: [1] },
          { name: "지구과학", semesters: [1] },
          { name: "윤리와 사상", semesters: [1] },
          { name: "한국지리 탐구", semesters: [1] },
          { name: "세계사", semesters: [1] },
          { name: "법과 사회", semesters: [1] },
          { name: "데이터 과학", semesters: [1] },
        ]
      },
      {
        id: "선택군2", name: "2학년 2학기 교과(군) 간 선택 (택4)", grade: 2, targetGrade: 2, semester: "2학기",
        selectCount: 4, credits: 3,
        description: "2학년 2학기 교과(군) 간 선택 선택군2 (택4, 12학점)",
        subjects: [
          { name: "기하", semesters: [2] },
          { name: "인공지능 수학", semesters: [2] },
          { name: "역학과 에너지", semesters: [2] },
          { name: "물질과 에너지", semesters: [2] },
          { name: "세포와 물질대사", semesters: [2] },
          { name: "지구시스템과학", semesters: [2] },
          { name: "현대사회와 윤리", semesters: [2] },
          { name: "세계시민과 지리", semesters: [2] },
          { name: "동아시아 역사 기행", semesters: [2] },
          { name: "정치", semesters: [2] },
          { name: "소프트웨어와 생활", semesters: [2] },
        ]
      },
      {
        id: "선택군3", name: "2학년 1학기 교과(군) 간 선택 (택1)", grade: 2, targetGrade: 2, semester: "1학기",
        selectCount: 1, credits: 3,
        description: "2학년 1학기 교과(군) 간 선택 선택군3 (택1, 3학점)",
        subjects: [
          { name: "일본어", semesters: [1] },
          { name: "중국어", semesters: [1] },
          { name: "언어생활과 한자", semesters: [1] },
          { name: "로봇과 공학세계", semesters: [1] },
        ]
      },
      {
        id: "선택군4", name: "2학년 2학기 교과(군) 간 선택 (택1)", grade: 2, targetGrade: 2, semester: "2학기",
        selectCount: 1, credits: 3,
        description: "2학년 2학기 교과(군) 간 선택 선택군4 (택1, 3학점)",
        subjects: [
          { name: "일본어 회화", semesters: [2] },
          { name: "중국어 회화", semesters: [2] },
          { name: "한문 고전 읽기", semesters: [2] },
          { name: "지식 재산 일반", semesters: [2] },
        ]
      },
      {
        id: "선택군5", name: "3학년 1학기 교과(군) 간 선택 (택1)", grade: 3, targetGrade: 3, semester: "1학기",
        selectCount: 1, credits: 3,
        description: "3학년 1학기 교과(군) 간 선택 선택군5 (택1, 3학점)",
        subjects: [
          { name: "주제 탐구 독서", semesters: [1] },
          { name: "미적분Ⅱ", semesters: [1] },
          { name: "심화 영어 독해와 작문", semesters: [1] },
        ]
      },
      {
        id: "선택군6", name: "3학년 1학기 교과(군) 간 선택 (택3)", grade: 3, targetGrade: 3, semester: "1학기",
        selectCount: 3, credits: 3,
        description: "3학년 1학기 교과(군) 간 선택 선택군6 (택3, 9학점)",
        subjects: [
          { name: "전자기와 양자", semesters: [1] },
          { name: "화학 반응의 세계", semesters: [1] },
          { name: "생물의 유전", semesters: [1] },
          { name: "행성우주과학", semesters: [1] },
          { name: "인문학과 윤리", semesters: [1] },
          { name: "도시의 미래 탐구", semesters: [1] },
          { name: "문화로 보는 한국사", semesters: [1] },
          { name: "경제", semesters: [1] },
        ]
      },
      {
        id: "선택군7", name: "3학년 2학기 교과(군) 간 선택 (택1)", grade: 3, targetGrade: 3, semester: "2학기",
        selectCount: 1, credits: 3,
        description: "3학년 2학기 교과(군) 간 선택 선택군7 (택1, 3학점)",
        subjects: [
          { name: "문학과 영상", semesters: [2] },
          { name: "전문 수학", semesters: [2] },
          { name: "미디어 영어", semesters: [2] },
        ]
      },
      {
        id: "선택군8", name: "3학년 2학기 교과(군) 간 선택 (택4)", grade: 3, targetGrade: 3, semester: "2학기",
        selectCount: 4, credits: 3,
        description: "3학년 2학기 교과(군) 간 선택 선택군8 (택4, 12학점)",
        subjects: [
          { name: "기후변화와 환경생태", semesters: [2] },
          { name: "융합과학 탐구", semesters: [2] },
          { name: "윤리문제 탐구", semesters: [2] },
          { name: "여행지리", semesters: [2] },
          { name: "역사로 탐구하는 현대 세계", semesters: [2] },
          { name: "금융과 경제생활", semesters: [2] },
          { name: "사회문제 탐구", semesters: [2] },
          { name: "정보과학", semesters: [2] },
          { name: "심화 일본어", semesters: [2] },
          { name: "관광 중국어", semesters: [2] },
          { name: "논술", semesters: [2] },
          { name: "생활과학 탐구", semesters: [2] },
        ]
      },
      {
        id: "선택군9", name: "3학년 1학기 교과(군) 간 선택 (택1)", grade: 3, targetGrade: 3, semester: "1학기",
        selectCount: 1, credits: 3,
        description: "3학년 1학기 교과(군) 간 선택 선택군9 (택1, 3학점)",
        subjects: [
          { name: "인공지능 기초", semesters: [1] },
          { name: "일본 문화", semesters: [1] },
          { name: "중국 문화", semesters: [1] },
          { name: "창의 공학 설계", semesters: [1] },
        ]
      },
      {
        id: "선택군10", name: "3학년 1학기 교과(군) 간 선택 (택1)", grade: 3, targetGrade: 3, semester: "1학기",
        selectCount: 1, credits: 2,
        description: "3학년 1학기 교과(군) 간 선택 선택군10 (택1, 2학점)",
        subjects: [
          { name: "음악 연주와 창작", semesters: [1] },
          { name: "미술 창작", semesters: [1] },
        ]
      },
      {
        id: "선택군11", name: "3학년 2학기 교과(군) 간 선택 (택1)", grade: 3, targetGrade: 3, semester: "2학기",
        selectCount: 1, credits: 2,
        description: "3학년 2학기 교과(군) 간 선택 선택군11 (택1, 2학점)",
        subjects: [
          { name: "음악 감상과 비평", semesters: [2] },
          { name: "미술과 매체", semesters: [2] },
        ]
      },
      {
        id: "선택군12", name: "3학년 1학기 교과(군) 간 선택 (택1)", grade: 3, targetGrade: 3, semester: "1학기",
        selectCount: 1, credits: 2,
        description: "3학년 1학기 교과(군) 간 선택 선택군12 (택1, 2학점)",
        subjects: [
          { name: "진로와 직업", semesters: [1] },
          { name: "생태와 환경", semesters: [1] },
        ]
      },
    ]
  },
  // 운중고등학교
  "unjung": {
    mandatory: {
      1: [
        { name: "공통국어1", semesters: [1], credit: 4 },
        { name: "공통국어2", semesters: [2], credit: 4 },
        { name: "공통수학1", semesters: [1], credit: 4 },
        { name: "공통수학2", semesters: [2], credit: 4 },
        { name: "공통영어1", semesters: [1], credit: 4 },
        { name: "공통영어2", semesters: [2], credit: 4 },
        { name: "한국사1", semesters: [1], credit: 3 },
        { name: "한국사2", semesters: [2], credit: 3 },
        { name: "통합사회1", semesters: [1], credit: 4 },
        { name: "통합사회2", semesters: [2], credit: 4 },
        { name: "통합과학1", semesters: [1], credit: 4 },
        { name: "통합과학2", semesters: [2], credit: 4 },
        { name: "과학탐구실험1", semesters: [1], credit: 1 },
        { name: "과학탐구실험2", semesters: [2], credit: 1 },
        { name: "체육1", semesters: [1], credit: 2 },
        { name: "체육2", semesters: [2], credit: 2 },
        { name: "음악↔미술", semesters: [1, 2], credit: 3 },
      ],
      2: [
        { name: "문학", semesters: [1], credit: 4 },
        { name: "독서와 작문", semesters: [2], credit: 4 },
        { name: "대수", semesters: [1], credit: 4 },
        { name: "미적분Ⅰ", semesters: [2], credit: 4 },
        { name: "영어Ⅰ", semesters: [1], credit: 3 },
        { name: "영어Ⅱ", semesters: [2], credit: 3 },
        { name: "스포츠 과학", semesters: [1], credit: 1 },
        { name: "스포츠 문화", semesters: [2], credit: 1 },
      ],
      3: [
        { name: "화법과 언어", semesters: [1], credit: 3 },
        { name: "주제 탐구 독서", semesters: [2], credit: 3 },
        { name: "확률과 통계", semesters: [1], credit: 3 },
        { name: "전문 수학", semesters: [2], credit: 3 },
        { name: "영어 독해와 작문", semesters: [1], credit: 3 },
        { name: "심화 영어", semesters: [2], credit: 3 },
        { name: "스포츠 생활1", semesters: [1], credit: 2 },
        { name: "스포츠 생활2", semesters: [2], credit: 2 },
      ],
    },
    groups: [
      {
        id: "선택군1", name: "2학년 1학기 교과(군) 간 선택 (택3)", grade: 2, targetGrade: 2, semester: "1학기",
        selectCount: 3, credits: 3,
        description: "2학년 1학기 교과(군) 간 선택 선택군1 (택3, 9학점)",
        subjects: [
          { name: "세계시민과 지리", semesters: [1] },
          { name: "동아시아 역사 기행", semesters: [1] },
          { name: "사회와 문화", semesters: [1] },
          { name: "윤리와 사상", semesters: [1] },
          { name: "물리학", semesters: [1] },
          { name: "화학", semesters: [1] },
          { name: "지구과학", semesters: [1] },
          { name: "생명과학", semesters: [1] },
        ]
      },
      {
        id: "선택군2", name: "2학년 2학기 교과(군) 간 선택 (택3)", grade: 2, targetGrade: 2, semester: "2학기",
        selectCount: 3, credits: 3,
        description: "2학년 2학기 교과(군) 간 선택 선택군2 (택3, 9학점)",
        subjects: [
          { name: "도시의 미래 탐구", semesters: [2] },
          { name: "세계사", semesters: [2] },
          { name: "경제", semesters: [2] },
          { name: "현대사회와 윤리", semesters: [2] },
          { name: "화학 반응의 세계", semesters: [2] },
          { name: "역학과 에너지", semesters: [2] },
          { name: "지구시스템과학", semesters: [2] },
          { name: "세포와 물질대사", semesters: [2] },
        ]
      },
      {
        id: "선택군3", name: "2학년 1학기 교과(군) 간 선택 (택1)", grade: 2, targetGrade: 2, semester: "1학기",
        selectCount: 1, credits: 2,
        description: "2학년 1학기 교과(군) 간 선택 선택군3 (택1, 2학점)",
        subjects: [
          { name: "음악 연주와 창작", semesters: [1] },
          { name: "미술 창작", semesters: [1] },
        ]
      },
      {
        id: "선택군4", name: "2학년 2학기 교과(군) 간 선택 (택1)", grade: 2, targetGrade: 2, semester: "2학기",
        selectCount: 1, credits: 2,
        description: "2학년 2학기 교과(군) 간 선택 선택군4 (택1, 2학점)",
        subjects: [
          { name: "음악 감상과 비평", semesters: [2] },
          { name: "미술 감상과 비평", semesters: [2] },
        ]
      },
      {
        id: "선택군5", name: "2학년 1학기 교과(군) 간 선택 (택1)", grade: 2, targetGrade: 2, semester: "1학기",
        selectCount: 1, credits: 3,
        description: "2학년 1학기 교과(군) 간 선택 선택군5 (택1, 3학점)",
        subjects: [
          { name: "일본어", semesters: [1] },
          { name: "중국어", semesters: [1] },
          { name: "기술·가정", semesters: [1] },
        ]
      },
      {
        id: "선택군6", name: "2학년 2학기 교과(군) 간 선택 (택1)", grade: 2, targetGrade: 2, semester: "2학기",
        selectCount: 1, credits: 3,
        description: "2학년 2학기 교과(군) 간 선택 선택군6 (택1, 3학점)",
        subjects: [
          { name: "일본어 회화", semesters: [2] },
          { name: "중국어 회화", semesters: [2] },
          { name: "로봇과 공학세계", semesters: [2] },
        ]
      },
      {
        id: "선택군7", name: "2학년 1학기 교과(군) 간 선택 (택1)", grade: 2, targetGrade: 2, semester: "1학기",
        selectCount: 1, credits: 3,
        description: "2학년 1학기 교과(군) 간 선택 선택군7 (택1, 3학점)",
        subjects: [
          { name: "문학과 영상", semesters: [1] },
          { name: "기하", semesters: [1] },
          { name: "영어 발표와 토론", semesters: [1] },
          { name: "기후변화와 지속가능한 세계", semesters: [1] },
          { name: "정보", semesters: [1] },
        ]
      },
      {
        id: "선택군8", name: "2학년 2학기 교과(군) 간 선택 (택1)", grade: 2, targetGrade: 2, semester: "2학기",
        selectCount: 1, credits: 3,
        description: "2학년 2학기 교과(군) 간 선택 선택군8 (택1, 3학점)",
        subjects: [
          { name: "독서 토론과 글쓰기", semesters: [2] },
          { name: "인공지능 수학", semesters: [2] },
          { name: "미디어 영어", semesters: [2] },
          { name: "사회문제 탐구", semesters: [2] },
          { name: "인공지능 기초", semesters: [2] },
        ]
      },
      {
        id: "선택군9", name: "3학년 1학기 교과(군) 간 선택 (택2)", grade: 3, targetGrade: 3, semester: "1학기",
        selectCount: 2, credits: 3,
        description: "3학년 1학기 교과(군) 간 선택 선택군9 (택2, 6학점)",
        subjects: [
          { name: "한국지리 탐구", semesters: [1] },
          { name: "법과 사회", semesters: [1] },
          { name: "윤리문제 탐구", semesters: [1] },
          { name: "물질과 에너지", semesters: [1] },
          { name: "전자기와 양자", semesters: [1] },
          { name: "생명과학 실험", semesters: [1] },
        ]
      },
      {
        id: "선택군10", name: "3학년 2학기 교과(군) 간 선택 (택2)", grade: 3, targetGrade: 3, semester: "2학기",
        selectCount: 2, credits: 3,
        description: "3학년 2학기 교과(군) 간 선택 선택군10 (택2, 6학점)",
        subjects: [
          { name: "여행지리", semesters: [2] },
          { name: "금융과 경제생활", semesters: [2] },
          { name: "인문학과 윤리", semesters: [2] },
          { name: "기후변화와 환경생태", semesters: [2] },
          { name: "융합과학 탐구", semesters: [2] },
        ]
      },
      {
        id: "선택군11", name: "3학년 1학기 교과(군) 간 선택 (택2)", grade: 3, targetGrade: 3, semester: "1학기",
        selectCount: 2, credits: 3,
        description: "3학년 1학기 교과(군) 간 선택 선택군11 (택2, 6학점)",
        subjects: [
          { name: "인간과 심리", semesters: [1] },
          { name: "생태와 환경", semesters: [1] },
          { name: "심화 일본어", semesters: [1] },
          { name: "심화 중국어", semesters: [1] },
          { name: "소프트웨어와 생활", semesters: [1] },
          { name: "창의 공학 설계", semesters: [1] },
        ]
      },
      {
        id: "선택군12", name: "3학년 2학기 교과(군) 간 선택 (택2)", grade: 3, targetGrade: 3, semester: "2학기",
        selectCount: 2, credits: 3,
        description: "3학년 2학기 교과(군) 간 선택 선택군12 (택2, 6학점)",
        subjects: [
          { name: "논술", semesters: [2] },
          { name: "교육의 이해", semesters: [2] },
          { name: "일본 문화", semesters: [2] },
          { name: "중국 문화", semesters: [2] },
          { name: "데이터 과학", semesters: [2] },
          { name: "지식 재산 일반", semesters: [2] },
        ]
      },
      {
        id: "선택군13", name: "3학년 1학기 교과(군) 간 선택 (택2)", grade: 3, targetGrade: 3, semester: "1학기",
        selectCount: 2, credits: 3,
        description: "3학년 1학기 교과(군) 간 선택 선택군13 (택2, 6학점)",
        subjects: [
          { name: "언어생활 탐구", semesters: [1] },
          { name: "수학과제 탐구", semesters: [1] },
          { name: "미적분Ⅱ", semesters: [1] },
          { name: "생물의 유전", semesters: [1] },
          { name: "행성우주과학", semesters: [1] },
          { name: "화학 실험", semesters: [1] },
          { name: "영미 문학 읽기", semesters: [1] },
        ]
      },
      {
        id: "선택군14", name: "3학년 2학기 교과(군) 간 선택 (택2)", grade: 3, targetGrade: 3, semester: "2학기",
        selectCount: 2, credits: 3,
        description: "3학년 2학기 교과(군) 간 선택 선택군14 (택2, 6학점)",
        subjects: [
          { name: "매체 의사소통", semesters: [2] },
          { name: "경제 수학", semesters: [2] },
          { name: "과학의 역사와 문화", semesters: [2] },
          { name: "심화 영어 독해와 작문", semesters: [2] },
        ]
      },
    ]
  },
  // 이매고등학교
  "imae": {
    mandatory: {
      1: [
        { name: "공통국어1", semesters: [1], credit: 4 },
        { name: "공통국어2", semesters: [2], credit: 4 },
        { name: "공통수학1", semesters: [1], credit: 4 },
        { name: "공통수학2", semesters: [2], credit: 4 },
        { name: "공통영어1", semesters: [1], credit: 4 },
        { name: "공통영어2", semesters: [2], credit: 4 },
        { name: "한국사1", semesters: [1], credit: 3 },
        { name: "한국사2", semesters: [2], credit: 3 },
        { name: "통합사회1", semesters: [1], credit: 4 },
        { name: "통합사회2", semesters: [2], credit: 4 },
        { name: "통합과학1", semesters: [1], credit: 4 },
        { name: "통합과학2", semesters: [2], credit: 4 },
        { name: "과학탐구실험1", semesters: [1], credit: 1 },
        { name: "과학탐구실험2", semesters: [2], credit: 1 },
        { name: "체육1", semesters: [1], credit: 2 },
        { name: "체육2", semesters: [2], credit: 2 },
        { name: "기술·가정↔정보", semesters: [1, 2], credit: 3 },
      ],
      2: [
        { name: "문학", semesters: [1], credit: 4 },
        { name: "화법과 언어", semesters: [2], credit: 4 },
        { name: "대수", semesters: [1], credit: 4 },
        { name: "미적분Ⅰ", semesters: [2], credit: 4 },
        { name: "영어Ⅰ", semesters: [1], credit: 4 },
        { name: "영어Ⅱ", semesters: [2], credit: 4 },
        { name: "운동과 건강", semesters: [1], credit: 2 },
        { name: "스포츠 생활1", semesters: [2], credit: 2 },
        { name: "음악↔미술", semesters: [1, 2], credit: 3 },
      ],
      3: [
        { name: "독서와 작문", semesters: [1], credit: 4 },
        { name: "언어생활 탐구", semesters: [2], credit: 4 },
        { name: "확률과 통계", semesters: [1], credit: 4 },
        { name: "실용 통계", semesters: [2], credit: 4 },
        { name: "심화 영어", semesters: [1], credit: 3 },
        { name: "영어 독해와 작문", semesters: [2], credit: 3 },
        { name: "스포츠 문화", semesters: [1], credit: 1 },
        { name: "스포츠 과학", semesters: [2], credit: 1 },
      ],
    },
    groups: [
      {
        id: "선택군1", name: "2학년 1학기 교과(군) 간 선택 (택4)", grade: 2, targetGrade: 2, semester: "1학기",
        selectCount: 4, credits: 3,
        description: "2학년 1학기 교과(군) 간 선택 선택군1 (택4, 12학점)",
        subjects: [
          { name: "세계시민과 지리", semesters: [1] },
          { name: "세계사", semesters: [1] },
          { name: "사회와 문화", semesters: [1] },
          { name: "윤리와 사상", semesters: [1] },
          { name: "정치", semesters: [1] },
          { name: "물리학", semesters: [1] },
          { name: "화학", semesters: [1] },
          { name: "생명과학", semesters: [1] },
          { name: "지구과학", semesters: [1] },
          { name: "중국어", semesters: [1] },
          { name: "일본어", semesters: [1] },
          { name: "인공지능 기초", semesters: [1] },
        ]
      },
      {
        id: "선택군2", name: "2학년 2학기 교과(군) 간 선택 (택4)", grade: 2, targetGrade: 2, semester: "2학기",
        selectCount: 4, credits: 3,
        description: "2학년 2학기 교과(군) 간 선택 선택군2 (택4, 12학점)",
        subjects: [
          { name: "도시의 미래 탐구", semesters: [2] },
          { name: "동아시아 역사 기행", semesters: [2] },
          { name: "법과 사회", semesters: [2] },
          { name: "경제", semesters: [2] },
          { name: "인문학과 윤리", semesters: [2] },
          { name: "역학과 에너지", semesters: [2] },
          { name: "물질과 에너지", semesters: [2] },
          { name: "세포와 물질대사", semesters: [2] },
          { name: "지구시스템과학", semesters: [2] },
          { name: "기하", semesters: [2] },
          { name: "중국어 회화", semesters: [2] },
          { name: "일본어 회화", semesters: [2] },
          { name: "데이터 과학", semesters: [2] },
        ]
      },
      {
        id: "선택군3", name: "3학년 1학기 교과(군) 간 선택 (택5)", grade: 3, targetGrade: 3, semester: "1학기",
        selectCount: 5, credits: 3,
        description: "3학년 1학기 교과(군) 간 선택 선택군3 (택5, 15학점)",
        subjects: [
          { name: "문학과 영상", semesters: [1] },
          { name: "미적분Ⅱ", semesters: [1] },
          { name: "미디어 영어", semesters: [1] },
          { name: "여행지리", semesters: [1] },
          { name: "역사로 탐구하는 현대 세계", semesters: [1] },
          { name: "사회문제 탐구", semesters: [1] },
          { name: "현대사회와 윤리", semesters: [1] },
          { name: "전자기와 양자", semesters: [1] },
          { name: "화학 반응의 세계", semesters: [1] },
          { name: "생물의 유전", semesters: [1] },
          { name: "행성우주과학", semesters: [1] },
          { name: "과학과제 연구", semesters: [1] },
          { name: "인간과 심리", semesters: [1] },
          { name: "중국 문화", semesters: [1] },
          { name: "일본 문화", semesters: [1] },
          { name: "소프트웨어와 생활", semesters: [1] },
        ]
      },
      {
        id: "선택군4", name: "3학년 2학기 교과(군) 간 선택 (택5)", grade: 3, targetGrade: 3, semester: "2학기",
        selectCount: 5, credits: 3,
        description: "3학년 2학기 교과(군) 간 선택 선택군4 (택5, 15학점)",
        subjects: [
          { name: "주제 탐구 독서", semesters: [2] },
          { name: "인공지능 수학", semesters: [2] },
          { name: "세계 문화와 영어", semesters: [2] },
          { name: "금융과 경제생활", semesters: [2] },
          { name: "윤리문제 탐구", semesters: [2] },
          { name: "기후변화와 지속가능한 세계", semesters: [2] },
          { name: "과학의 역사와 문화", semesters: [2] },
          { name: "융합과학 탐구", semesters: [2] },
          { name: "기후변화와 환경생태", semesters: [2] },
          { name: "논술", semesters: [2] },
          { name: "심화 중국어", semesters: [2] },
          { name: "심화 일본어", semesters: [2] },
          { name: "프로그래밍", semesters: [2] },
        ]
      },
      {
        id: "선택군5", name: "3학년 1학기 교과(군) 간 선택 (택1)", grade: 3, targetGrade: 3, semester: "1학기",
        selectCount: 1, credits: 2,
        description: "3학년 1학기 교과(군) 간 선택 선택군5 (택1, 2학점)",
        subjects: [
          { name: "음악 연주와 창작", semesters: [1] },
          { name: "미술 창작", semesters: [1] },
        ]
      },
      {
        id: "선택군6", name: "3학년 2학기 교과(군) 간 선택 (택1)", grade: 3, targetGrade: 3, semester: "2학기",
        selectCount: 1, credits: 2,
        description: "3학년 2학기 교과(군) 간 선택 선택군6 (택1, 2학점)",
        subjects: [
          { name: "음악 감상과 비평", semesters: [2] },
          { name: "미술 감상과 비평", semesters: [2] },
        ]
      },
    ]
  },
  // 이우고등학교
  "eewoo": {
    mandatory: {
      1: [
        { name: "공통국어1", semesters: [1], credit: 4 },
        { name: "공통국어2", semesters: [2], credit: 4 },
        { name: "공통수학1 또는 기본수학1", semesters: [1], credit: 4 },
        { name: "공통수학2 또는 기본수학2", semesters: [2], credit: 4 },
        { name: "공통영어1", semesters: [1], credit: 4 },
        { name: "공통영어2", semesters: [2], credit: 4 },
        { name: "한국사1", semesters: [1], credit: 3 },
        { name: "한국사2", semesters: [2], credit: 3 },
        { name: "통합사회1", semesters: [1], credit: 4 },
        { name: "통합사회2", semesters: [2], credit: 4 },
        { name: "통합과학1", semesters: [1], credit: 4 },
        { name: "통합과학2", semesters: [2], credit: 4 },
        { name: "과학탐구실험1", semesters: [1], credit: 1 },
        { name: "과학탐구실험2", semesters: [2], credit: 1 },
        { name: "체육1", semesters: [1], credit: 2 },
        { name: "체육2", semesters: [2], credit: 2 },
        { name: "음악", semesters: [1], credit: 2 },
        { name: "미술", semesters: [1], credit: 2 },
        { name: "진로와 직업", semesters: [2], credit: 2 },
        { name: "기술·가정", semesters: [2], credit: 4 },
        { name: "지역사회와 공유지1", semesters: [1], credit: 2 },
      ],
      2: [
        { name: "운동과 건강", semesters: [1], credit: 2 },
        { name: "스포츠 생활1", semesters: [2], credit: 2 },
        { name: "공존의 윤리와 시민실천", semesters: [1], credit: 2 },
        { name: "지역사회와 공유지2", semesters: [2], credit: 2 },
      ],
      3: [
        { name: "스포츠 문화", semesters: [1], credit: 1 },
        { name: "스포츠 과학", semesters: [2], credit: 1 },
        { name: "지역사회와 공유지3", semesters: [1], credit: 2 },
      ],
    },
    groups: [
      {
        id: "선택군1", name: "2학년 1학기 교과(군) 간 선택 (택6)", grade: 2, targetGrade: 2, semester: "1학기",
        selectCount: 6, credits: 4,
        description: "2학년 1학기 교과(군) 간 선택 선택군1 (택6, 24학점)",
        subjects: [
          { name: "문학", semesters: [1] },
          { name: "대수", semesters: [1] },
          { name: "영어Ⅰ", semesters: [1] },
          { name: "세계 문화와 영어", semesters: [1] },
          { name: "미디어 영어", semesters: [1] },
          { name: "세계사", semesters: [1] },
          { name: "사회와 문화", semesters: [1] },
          { name: "세계시민과 지리", semesters: [1] },
          { name: "역사로 탐구하는 현대 세계", semesters: [1] },
          { name: "물리학", semesters: [1] },
          { name: "화학", semesters: [1] },
          { name: "생명과학", semesters: [1] },
          { name: "지구과학", semesters: [1] },
          { name: "인간과 철학", semesters: [1] },
          { name: "비판적 사고와 철학", semesters: [1] },
          { name: "서양현대철학의 이해", semesters: [1] },
          { name: "음악 감상과 비평", semesters: [1] },
          { name: "사진과 삶", semesters: [1] },
          { name: "영화와 삶", semesters: [1] },
          { name: "연극과 삶", semesters: [1] },
          { name: "독일어", semesters: [1] },
          { name: "프랑스어", semesters: [1] },
          { name: "중국어", semesters: [1] },
          { name: "일본어", semesters: [1] },
          { name: "3D 프린팅 활용 메이커교육", semesters: [1] },
          { name: "패션 디자인의 기초", semesters: [1] },
          { name: "리더십과 사회적 실천", semesters: [1] },
        ]
      },
      {
        id: "선택군2", name: "2학년 2학기 교과(군) 간 선택 (택5)", grade: 2, targetGrade: 2, semester: "2학기",
        selectCount: 5, credits: 4,
        description: "2학년 2학기 교과(군) 간 선택 선택군2 (택5, 20학점)",
        subjects: [
          { name: "화법과 언어", semesters: [2] },
          { name: "주제 탐구 독서", semesters: [2] },
          { name: "미적분Ⅰ", semesters: [2] },
          { name: "기하", semesters: [2] },
          { name: "인공지능 수학", semesters: [2] },
          { name: "경제 수학", semesters: [2] },
          { name: "영어Ⅱ", semesters: [2] },
          { name: "영어 발표와 토론", semesters: [2] },
          { name: "심화 영어", semesters: [2] },
          { name: "현대 세계의 변화", semesters: [2] },
          { name: "법과 사회", semesters: [2] },
          { name: "윤리와 사상", semesters: [2] },
          { name: "인문학과 윤리", semesters: [2] },
          { name: "역학과 에너지", semesters: [2] },
          { name: "물질과 에너지", semesters: [2] },
          { name: "세포와 물질대사", semesters: [2] },
          { name: "지구시스템과학", semesters: [2] },
          { name: "논리와 사고", semesters: [2] },
          { name: "음악 연주와 창작", semesters: [2] },
          { name: "미술사", semesters: [2] },
          { name: "사진 촬영", semesters: [2] },
          { name: "영화 제작 실습", semesters: [2] },
          { name: "연극 제작 실습", semesters: [2] },
          { name: "독일어권 문화", semesters: [2] },
          { name: "프랑스어권 문화", semesters: [2] },
          { name: "중국 문화", semesters: [2] },
          { name: "일본 문화", semesters: [2] },
        ]
      },
      {
        id: "선택군3", name: "2학년 2학기 교과(군) 간 선택 (택1)", grade: 2, targetGrade: 2, semester: "2학기",
        selectCount: 1, credits: 4,
        description: "2학년 2학기 교과(군) 간 선택 선택군3 (택1, 4학점)",
        subjects: [
          { name: "정치경제학으로 본 사회적 경제", semesters: [2] },
          { name: "기후변화와 환경생태", semesters: [2] },
          { name: "생태와 환경", semesters: [2] },
          { name: "글로컬 시대의 지역문화 이해1", semesters: [2] },
          { name: "생태농업1", semesters: [2] },
          { name: "도시의 미래 탐구", semesters: [2] },
        ]
      },
      {
        id: "선택군4", name: "3학년 1학기 교과(군) 간 선택 (택6)", grade: 3, targetGrade: 3, semester: "1학기",
        selectCount: 6, credits: 4,
        description: "3학년 1학기 교과(군) 간 선택 선택군4 (택6, 24학점)",
        subjects: [
          { name: "독서와 작문", semesters: [1] },
          { name: "확률과 통계", semesters: [1] },
          { name: "미적분Ⅱ", semesters: [1] },
          { name: "수학과제 탐구", semesters: [1] },
          { name: "영어 독해와 작문", semesters: [1] },
          { name: "세계 문화와 영어", semesters: [1] },
          { name: "미디어 영어", semesters: [1] },
          { name: "세계사", semesters: [1] },
          { name: "사회와 문화", semesters: [1] },
          { name: "세계시민과 지리", semesters: [1] },
          { name: "역사로 탐구하는 현대 세계", semesters: [1] },
          { name: "사회문제 탐구", semesters: [1] },
          { name: "현대사회와 윤리", semesters: [1] },
          { name: "인문학과 윤리", semesters: [1] },
          { name: "전자기와 양자", semesters: [1] },
          { name: "화학 반응의 세계", semesters: [1] },
          { name: "생물의 유전", semesters: [1] },
          { name: "행성우주과학", semesters: [1] },
          { name: "과학과제 연구", semesters: [1] },
          { name: "인간과 철학", semesters: [1] },
          { name: "논리와 사고", semesters: [1] },
          { name: "서양현대철학의 이해", semesters: [1] },
          { name: "음악 감상과 비평", semesters: [1] },
          { name: "미술 이론", semesters: [1] },
          { name: "사진과 삶", semesters: [1] },
          { name: "영화와 삶", semesters: [1] },
          { name: "연극과 삶", semesters: [1] },
          { name: "독일어", semesters: [1] },
          { name: "프랑스어", semesters: [1] },
          { name: "중국어", semesters: [1] },
          { name: "일본어", semesters: [1] },
          { name: "시민적 삶과 미래", semesters: [1] },
        ]
      },
      {
        id: "선택군5", name: "3학년 1학기 교과(군) 간 선택 (택1)", grade: 3, targetGrade: 3, semester: "1학기",
        selectCount: 1, credits: 4,
        description: "3학년 1학기 교과(군) 간 선택 선택군5 (택1, 4학점)",
        subjects: [
          { name: "인간과 경제", semesters: [1] },
          { name: "에너지와 탄소 중립", semesters: [1] },
          { name: "기후변화와 지속가능한 세계", semesters: [1] },
          { name: "생태농업2", semesters: [1] },
          { name: "글로컬 시대의 지역문화 이해2", semesters: [1] },
        ]
      },
      {
        id: "선택군6", name: "3학년 2학기 교과(군) 간 선택 (택6)", grade: 3, targetGrade: 3, semester: "2학기",
        selectCount: 6, credits: 4,
        description: "3학년 2학기 교과(군) 간 선택 선택군6 (택6, 24학점)",
        subjects: [
          { name: "문학과 영상", semesters: [2] },
          { name: "독서 토론과 글쓰기", semesters: [2] },
          { name: "이산 수학", semesters: [2] },
          { name: "실용 통계", semesters: [2] },
          { name: "영미 문학 읽기", semesters: [2] },
          { name: "심화 영어 독해와 작문", semesters: [2] },
          { name: "기후변화와 지속가능한 세계", semesters: [2] },
          { name: "여행지리", semesters: [2] },
          { name: "역사로 탐구하는 현대 세계", semesters: [2] },
          { name: "비교 문화", semesters: [2] },
          { name: "과학의 역사와 문화", semesters: [2] },
          { name: "논술", semesters: [2] },
          { name: "비판적 사고와 철학", semesters: [2] },
          { name: "예술과 미적경험에 대한 철학적 이해", semesters: [2] },
          { name: "독일어 회화", semesters: [2] },
          { name: "일본어 회화", semesters: [2] },
          { name: "프랑스어 회화", semesters: [2] },
          { name: "중국어 회화", semesters: [2] },
        ]
      },
    ]
  },
  // 성남고등학교
  "seongnam": {
    mandatory: {
      1: [
        { name: "공통국어1", semesters: [1], credit: 4 },
        { name: "공통국어2", semesters: [2], credit: 4 },
        { name: "공통수학1", semesters: [1], credit: 4 },
        { name: "공통수학2", semesters: [2], credit: 4 },
        { name: "공통영어1", semesters: [1], credit: 4 },
        { name: "공통영어2", semesters: [2], credit: 4 },
        { name: "한국사1", semesters: [1], credit: 3 },
        { name: "한국사2", semesters: [2], credit: 3 },
        { name: "통합사회1", semesters: [1], credit: 4 },
        { name: "통합사회2", semesters: [2], credit: 4 },
        { name: "통합과학1", semesters: [1], credit: 4 },
        { name: "통합과학2", semesters: [2], credit: 4 },
        { name: "과학탐구실험1", semesters: [1], credit: 1 },
        { name: "과학탐구실험2", semesters: [2], credit: 1 },
        { name: "체육1", semesters: [1], credit: 2 },
        { name: "체육2", semesters: [2], credit: 2 },
        { name: "기술·가정↔정보", semesters: [1, 2], credit: 3 },
      ],
      2: [
        { name: "문학", semesters: [1], credit: 4 },
        { name: "독서와 작문", semesters: [2], credit: 4 },
        { name: "대수", semesters: [1], credit: 4 },
        { name: "미적분Ⅰ", semesters: [2], credit: 4 },
        { name: "영어Ⅰ", semesters: [1], credit: 4 },
        { name: "영어Ⅱ", semesters: [2], credit: 4 },
        { name: "운동과 건강", semesters: [1], credit: 2 },
        { name: "스포츠 문화", semesters: [2], credit: 2 },
      ],
      3: [
        { name: "화법과 언어", semesters: [1], credit: 4 },
        { name: "주제 탐구 독서", semesters: [2], credit: 3 },
        { name: "확률과 통계", semesters: [1], credit: 4 },
        { name: "수학과제 탐구", semesters: [2], credit: 3 },
        { name: "영어 독해와 작문", semesters: [1], credit: 4 },
        { name: "미디어 영어", semesters: [2], credit: 3 },
        { name: "스포츠 생활1", semesters: [1], credit: 2 },
        { name: "스포츠 생활2", semesters: [2], credit: 2 },
      ],
    },
    groups: [
      {
        id: "선택군1", name: "2학년 1학기 교과(군) 간 선택 (택4)", grade: 2, targetGrade: 2, semester: "1학기",
        selectCount: 4, credits: 3,
        description: "2학년 1학기 교과(군) 간 선택 선택군1 (택4, 12학점)",
        subjects: [
          { name: "세계시민과 지리", semesters: [1] },
          { name: "세계사", semesters: [1] },
          { name: "사회와 문화", semesters: [1] },
          { name: "현대사회와 윤리", semesters: [1] },
          { name: "사회문제 탐구", semesters: [1] },
          { name: "물리학", semesters: [1] },
          { name: "화학", semesters: [1] },
          { name: "생명과학", semesters: [1] },
          { name: "지구과학", semesters: [1] },
          { name: "융합과학 탐구", semesters: [1] },
          { name: "프로그래밍", semesters: [1] },
        ]
      },
      {
        id: "선택군2", name: "2학년 2학기 교과(군) 간 선택 (택4)", grade: 2, targetGrade: 2, semester: "2학기",
        selectCount: 4, credits: 3,
        description: "2학년 2학기 교과(군) 간 선택 선택군2 (택4, 12학점)",
        subjects: [
          { name: "도시의 미래 탐구", semesters: [2] },
          { name: "동아시아 역사 기행", semesters: [2] },
          { name: "정치", semesters: [2] },
          { name: "법과 사회", semesters: [2] },
          { name: "윤리와 사상", semesters: [2] },
          { name: "역학과 에너지", semesters: [2] },
          { name: "물질과 에너지", semesters: [2] },
          { name: "세포와 물질대사", semesters: [2] },
          { name: "지구시스템과학", semesters: [2] },
          { name: "기하", semesters: [2] },
          { name: "사물인터넷과 센서 제어", semesters: [2] },
        ]
      },
      {
        id: "선택군3", name: "2학년 1학기 교과(군) 간 선택 (택1)", grade: 2, targetGrade: 2, semester: "1학기",
        selectCount: 1, credits: 3,
        description: "2학년 1학기 교과(군) 간 선택 선택군3 (택1, 3학점)",
        subjects: [
          { name: "중국어", semesters: [1] },
          { name: "일본어", semesters: [1] },
          { name: "인공지능 기초", semesters: [1] },
        ]
      },
      {
        id: "선택군4", name: "2학년 2학기 교과(군) 간 선택 (택1)", grade: 2, targetGrade: 2, semester: "2학기",
        selectCount: 1, credits: 3,
        description: "2학년 2학기 교과(군) 간 선택 선택군4 (택1, 3학점)",
        subjects: [
          { name: "데이터 과학", semesters: [2] },
          { name: "중국 문화", semesters: [2] },
          { name: "일본 문화", semesters: [2] },
        ]
      },
      {
        id: "선택군5", name: "3학년 1학기 교과(군) 간 선택 (택4)", grade: 3, targetGrade: 3, semester: "1학기",
        selectCount: 4, credits: 3,
        description: "3학년 1학기 교과(군) 간 선택 선택군5 (택4, 12학점)",
        subjects: [
          { name: "문학과 영상", semesters: [1] },
          { name: "미적분Ⅱ", semesters: [1] },
          { name: "경제 수학", semesters: [1] },
          { name: "인공지능 수학", semesters: [1] },
          { name: "심화 영어 독해와 작문", semesters: [1] },
          { name: "한국지리 탐구", semesters: [1] },
          { name: "경제", semesters: [1] },
          { name: "인문학과 윤리", semesters: [1] },
          { name: "국제 관계의 이해", semesters: [1] },
          { name: "역사 과제연구", semesters: [1] },
          { name: "전자기와 양자", semesters: [1] },
          { name: "화학 반응의 세계", semesters: [1] },
          { name: "생물의 유전", semesters: [1] },
          { name: "행성우주과학", semesters: [1] },
          { name: "과학과제 연구", semesters: [1] },
          { name: "물리학 실험", semesters: [1] },
          { name: "생명과학 실험", semesters: [1] },
          { name: "중국어 회화", semesters: [1] },
          { name: "일본어 회화", semesters: [1] },
          { name: "디지털 논리 회로", semesters: [1] },
          { name: "교육의 이해", semesters: [1] },
        ]
      },
      {
        id: "선택군6", name: "3학년 2학기 교과(군) 간 선택 (택5)", grade: 3, targetGrade: 3, semester: "2학기",
        selectCount: 5, credits: 3,
        description: "3학년 2학기 교과(군) 간 선택 선택군6 (택5, 15학점)",
        subjects: [
          { name: "독서 토론과 글쓰기", semesters: [2] },
          { name: "매체 의사소통", semesters: [2] },
          { name: "수학과 문화", semesters: [2] },
          { name: "세계 문화와 영어", semesters: [2] },
          { name: "여행지리", semesters: [2] },
          { name: "역사로 탐구하는 현대 세계", semesters: [2] },
          { name: "금융과 경제생활", semesters: [2] },
          { name: "윤리문제 탐구", semesters: [2] },
          { name: "기후변화와 지속가능한 세계", semesters: [2] },
          { name: "과학의 역사와 문화", semesters: [2] },
          { name: "기후변화와 환경생태", semesters: [2] },
          { name: "심화 중국어", semesters: [2] },
          { name: "심화 일본어", semesters: [2] },
          { name: "컴퓨터 네트워크", semesters: [2] },
          { name: "인간과 심리", semesters: [2] },
        ]
      },
      {
        id: "선택군7", name: "3학년 1학기 교과(군) 간 선택 (택1)", grade: 3, targetGrade: 3, semester: "1학기",
        selectCount: 1, credits: 3,
        description: "3학년 1학기 교과(군) 간 선택 선택군7 (택1, 3학점)",
        subjects: [
          { name: "음악 연주와 창작", semesters: [1] },
          { name: "미술 창작", semesters: [1] },
        ]
      },
      {
        id: "선택군8", name: "3학년 2학기 교과(군) 간 선택 (택1)", grade: 3, targetGrade: 3, semester: "2학기",
        selectCount: 1, credits: 3,
        description: "3학년 2학기 교과(군) 간 선택 선택군8 (택1, 3학점)",
        subjects: [
          { name: "음악 감상과 비평", semesters: [2] },
          { name: "미술 감상과 비평", semesters: [2] },
        ]
      },
    ]
  },
  // 판교고등학교
  "pangyo": {
    mandatory: {
      1: [
        { name: "공통국어1", semesters: [1], credit: 4 },
        { name: "공통국어2", semesters: [2], credit: 4 },
        { name: "공통수학1", semesters: [1], credit: 4 },
        { name: "공통수학2", semesters: [2], credit: 4 },
        { name: "공통영어1", semesters: [1], credit: 3 },
        { name: "공통영어2", semesters: [2], credit: 3 },
        { name: "한국사1", semesters: [1], credit: 3 },
        { name: "한국사2", semesters: [2], credit: 3 },
        { name: "통합사회1", semesters: [1], credit: 3 },
        { name: "통합사회2", semesters: [2], credit: 3 },
        { name: "통합과학1", semesters: [1], credit: 3 },
        { name: "통합과학2", semesters: [2], credit: 3 },
        { name: "과학탐구실험1", semesters: [1], credit: 1 },
        { name: "과학탐구실험2", semesters: [2], credit: 1 },
        { name: "체육1", semesters: [1], credit: 2 },
        { name: "체육2", semesters: [2], credit: 2 },
        { name: "음악↔미술", semesters: [1, 2], credit: 3 },
        { name: "정보↔로봇과 공학세계", semesters: [1, 2], credit: 3 },
        { name: "과제 탐구 및 발표 기초 또는 창의적사고와 협력적 소통 실습", semesters: [1], credit: 1 },
      ],
      2: [
        { name: "문학", semesters: [1], credit: 4 },
        { name: "화법과 언어", semesters: [2], credit: 4 },
        { name: "대수", semesters: [1], credit: 4 },
        { name: "미적분Ⅰ", semesters: [2], credit: 4 },
        { name: "영어Ⅰ", semesters: [1], credit: 4 },
        { name: "영어Ⅱ", semesters: [2], credit: 4 },
        { name: "스포츠 생활1", semesters: [1], credit: 2 },
        { name: "스포츠 생활2", semesters: [2], credit: 2 },
      ],
      3: [
        { name: "독서와 작문", semesters: [1], credit: 4 },
        { name: "주제 탐구 독서", semesters: [2], credit: 4 },
        { name: "확률과 통계", semesters: [1], credit: 4 },
        { name: "수학과제 탐구", semesters: [2], credit: 4 },
        { name: "영어 독해와 작문", semesters: [1], credit: 4 },
        { name: "심화 영어 독해와 작문", semesters: [2], credit: 4 },
        { name: "스포츠 문화", semesters: [1], credit: 1 },
        { name: "스포츠 과학", semesters: [2], credit: 1 },
        { name: "비판적 질문과 창의적 해결", semesters: [1], credit: 1 },
      ],
    },
    groups: [
      {
        id: "선택군1", name: "2학년 1학기 교과(군) 간 선택 (택5)", grade: 2, targetGrade: 2, semester: "1학기",
        selectCount: 5, credits: 3,
        description: "2학년 1학기 교과(군) 간 선택 선택군1 (택5, 15학점)",
        subjects: [
          { name: "인공지능 수학", semesters: [1] },
          { name: "물리학", semesters: [1] },
          { name: "화학", semesters: [1] },
          { name: "생명과학", semesters: [1] },
          { name: "지구과학", semesters: [1] },
          { name: "세계시민과 지리", semesters: [1] },
          { name: "세계사", semesters: [1] },
          { name: "사회와 문화", semesters: [1] },
          { name: "현대사회와 윤리", semesters: [1] },
          { name: "중국어", semesters: [1] },
          { name: "일본어", semesters: [1] },
          { name: "인공지능 기초", semesters: [1] },
        ]
      },
      {
        id: "선택군2", name: "2학년 2학기 교과(군) 간 선택 (택5)", grade: 2, targetGrade: 2, semester: "2학기",
        selectCount: 5, credits: 3,
        description: "2학년 2학기 교과(군) 간 선택 선택군2 (택5, 15학점)",
        subjects: [
          { name: "기하", semesters: [2] },
          { name: "역학과 에너지", semesters: [2] },
          { name: "물질과 에너지", semesters: [2] },
          { name: "세포와 물질대사", semesters: [2] },
          { name: "행성우주과학", semesters: [2] },
          { name: "한국지리 탐구", semesters: [2] },
          { name: "동아시아 역사 기행", semesters: [2] },
          { name: "법과 사회", semesters: [2] },
          { name: "윤리와 사상", semesters: [2] },
          { name: "중국어 회화", semesters: [2] },
          { name: "일본어 회화", semesters: [2] },
          { name: "프로그래밍", semesters: [2] },
        ]
      },
      {
        id: "선택군3", name: "3학년 1학기 교과(군) 간 선택 (택4)", grade: 3, targetGrade: 3, semester: "1학기",
        selectCount: 4, credits: 3,
        description: "3학년 1학기 교과(군) 간 선택 선택군3 (택4, 12학점)",
        subjects: [
          { name: "미적분Ⅱ", semesters: [1] },
          { name: "전자기와 양자", semesters: [1] },
          { name: "화학 반응의 세계", semesters: [1] },
          { name: "생물의 유전", semesters: [1] },
          { name: "지구시스템과학", semesters: [1] },
          { name: "생명과학 실험", semesters: [1] },
          { name: "도시의 미래 탐구", semesters: [1] },
          { name: "정치", semesters: [1] },
          { name: "경제", semesters: [1] },
          { name: "인문학과 윤리", semesters: [1] },
          { name: "중국 문화", semesters: [1] },
          { name: "일본 문화", semesters: [1] },
          { name: "창의 공학 설계", semesters: [1] },
          { name: "데이터 과학", semesters: [1] },
        ]
      },
      {
        id: "선택군4", name: "3학년 1학기 교과(군) 간 선택 (택1)", grade: 3, targetGrade: 3, semester: "1학기",
        selectCount: 1, credits: 3,
        description: "3학년 1학기 교과(군) 간 선택 선택군4 (택1, 3학점)",
        subjects: [
          { name: "융합과학 탐구", semesters: [1] },
          { name: "사회문제 탐구", semesters: [1] },
          { name: "음악과 미디어", semesters: [1] },
          { name: "미술과 매체", semesters: [1] },
          { name: "운동과 건강", semesters: [1] },
        ]
      },
      {
        id: "선택군5", name: "3학년 2학기 교과(군) 간 선택 (택4)", grade: 3, targetGrade: 3, semester: "2학기",
        selectCount: 4, credits: 4,
        description: "3학년 2학기 교과(군) 간 선택 선택군5 (택4, 16학점)",
        subjects: [
          { name: "과학의 역사와 문화", semesters: [2] },
          { name: "기후변화와 환경생태", semesters: [2] },
          { name: "과학창의연구", semesters: [2] },
          { name: "여행지리", semesters: [2] },
          { name: "금융과 경제생활", semesters: [2] },
          { name: "윤리문제 탐구", semesters: [2] },
          { name: "기후변화와 지속가능한 세계", semesters: [2] },
          { name: "심화 중국어", semesters: [2] },
          { name: "심화 일본어", semesters: [2] },
          { name: "지식 재산 일반", semesters: [2] },
          { name: "소프트웨어와 생활", semesters: [2] },
          { name: "음악 연주와 창작", semesters: [2] },
          { name: "미술 창작", semesters: [2] },
          { name: "운동과 건강", semesters: [2] },
          { name: "인간과 심리", semesters: [2] },
        ]
      },
      {
        id: "선택군6", name: "2학년 1학기 교과(군) 간 선택 (택1)", grade: 2, targetGrade: 2, semester: "1학기",
        selectCount: 1, credits: 1,
        description: "2학년 1학기 교과(군) 간 선택 선택군6 (택1, 1학점)",
        subjects: [
          { name: "과제 탐구 및 발표 심화", semesters: [1] },
          { name: "지속가능한 삶과 공동체 생활 탐구", semesters: [1] },
        ]
      },
    ]
  },
  // 야탑고등학교
  "yatap": {
    mandatory: {
      1: [
        { name: "공통국어1", semesters: [1], credit: 4 },
        { name: "공통국어2", semesters: [2], credit: 4 },
        { name: "공통수학1", semesters: [1], credit: 4 },
        { name: "공통수학2", semesters: [2], credit: 4 },
        { name: "공통영어1", semesters: [1], credit: 4 },
        { name: "공통영어2", semesters: [2], credit: 4 },
        { name: "한국사1", semesters: [1], credit: 3 },
        { name: "한국사2", semesters: [2], credit: 3 },
        { name: "통합사회1", semesters: [1], credit: 4 },
        { name: "통합사회2", semesters: [2], credit: 4 },
        { name: "통합과학1", semesters: [1], credit: 4 },
        { name: "통합과학2", semesters: [2], credit: 4 },
        { name: "과학탐구실험1", semesters: [1], credit: 1 },
        { name: "과학탐구실험2", semesters: [2], credit: 1 },
        { name: "체육1", semesters: [1], credit: 2 },
        { name: "체육2", semesters: [2], credit: 2 },
        { name: "음악↔미술", semesters: [1, 2], credit: 3 },
      ],
      2: [
        { name: "문학", semesters: [1], credit: 4 },
        { name: "화법과 언어", semesters: [2], credit: 4 },
        { name: "대수", semesters: [1], credit: 4 },
        { name: "미적분Ⅰ", semesters: [2], credit: 4 },
        { name: "영어Ⅰ", semesters: [1], credit: 4 },
        { name: "영어Ⅱ", semesters: [2], credit: 4 },
        { name: "스포츠 생활1", semesters: [1], credit: 2 },
        { name: "스포츠 생활2", semesters: [2], credit: 2 },
      ],
      3: [
        { name: "독서와 작문", semesters: [1], credit: 4 },
        { name: "주제 탐구 독서", semesters: [2], credit: 3 },
        { name: "확률과 통계", semesters: [1], credit: 4 },
        { name: "실용 통계", semesters: [2], credit: 3 },
        { name: "영어 독해와 작문", semesters: [1], credit: 3 },
        { name: "심화 영어 독해와 작문", semesters: [2], credit: 3 },
        { name: "스포츠 문화", semesters: [1], credit: 1 },
        { name: "스포츠 과학", semesters: [2], credit: 2 },
        { name: "논리와 사고", semesters: [2], credit: 2 },
        { name: "논술", semesters: [2], credit: 2 },
      ],
    },
    groups: [
      {
        id: "선택군1", name: "2학년 1학기 교과(군) 간 선택 (택5)", grade: 2, targetGrade: 2, semester: "1학기",
        selectCount: 5, credits: 3,
        description: "2학년 1학기 교과(군) 간 선택 선택군1 (택5, 15학점)",
        subjects: [
          { name: "독서 토론과 글쓰기", semesters: [1] },
          { name: "기하", semesters: [1] },
          { name: "영미 문학 읽기", semesters: [1] },
          { name: "세계시민과 지리", semesters: [1] },
          { name: "사회와 문화", semesters: [1] },
          { name: "정치", semesters: [1] },
          { name: "현대사회와 윤리", semesters: [1] },
          { name: "물리학", semesters: [1] },
          { name: "화학", semesters: [1] },
          { name: "생명과학", semesters: [1] },
          { name: "지구과학", semesters: [1] },
          { name: "일본어", semesters: [1] },
          { name: "중국어", semesters: [1] },
          { name: "정보", semesters: [1] },
        ]
      },
      {
        id: "선택군2", name: "2학년 2학기 교과(군) 간 선택 (택5)", grade: 2, targetGrade: 2, semester: "2학기",
        selectCount: 5, credits: 3,
        description: "2학년 2학기 교과(군) 간 선택 선택군2 (택5, 15학점)",
        subjects: [
          { name: "문학과 영상", semesters: [2] },
          { name: "미적분Ⅱ", semesters: [2] },
          { name: "미디어 영어", semesters: [2] },
          { name: "기후변화와 지속가능한 세계", semesters: [2] },
          { name: "법과 사회", semesters: [2] },
          { name: "경제", semesters: [2] },
          { name: "윤리와 사상", semesters: [2] },
          { name: "역학과 에너지", semesters: [2] },
          { name: "물질과 에너지", semesters: [2] },
          { name: "세포와 물질대사", semesters: [2] },
          { name: "지구시스템과학", semesters: [2] },
          { name: "일본어 회화", semesters: [2] },
          { name: "중국어 회화", semesters: [2] },
          { name: "인공지능 기초", semesters: [2] },
        ]
      },
      {
        id: "선택군3", name: "3학년 1학기 교과(군) 간 선택 (택5)", grade: 3, targetGrade: 3, semester: "1학기",
        selectCount: 5, credits: 3,
        description: "3학년 1학기 교과(군) 간 선택 선택군3 (택5, 15학점)",
        subjects: [
          { name: "언어생활 탐구", semesters: [1] },
          { name: "수학과제 탐구", semesters: [1] },
          { name: "심화 영어", semesters: [1] },
          { name: "한국지리 탐구", semesters: [1] },
          { name: "세계사", semesters: [1] },
          { name: "금융과 경제생활", semesters: [1] },
          { name: "사회문제 탐구", semesters: [1] },
          { name: "인문학과 윤리", semesters: [1] },
          { name: "전자기와 양자", semesters: [1] },
          { name: "화학 반응의 세계", semesters: [1] },
          { name: "생물의 유전", semesters: [1] },
          { name: "행성우주과학", semesters: [1] },
          { name: "융합과학 탐구", semesters: [1] },
          { name: "인간과 심리", semesters: [1] },
          { name: "보건", semesters: [1] },
        ]
      },
      {
        id: "선택군4", name: "3학년 2학기 교과(군) 간 선택 (택4)", grade: 3, targetGrade: 3, semester: "2학기",
        selectCount: 4, credits: 3,
        description: "3학년 2학기 교과(군) 간 선택 선택군4 (택4, 12학점)",
        subjects: [
          { name: "매체 의사소통", semesters: [2] },
          { name: "수학과 문화", semesters: [2] },
          { name: "세계 문화와 영어", semesters: [2] },
          { name: "여행지리", semesters: [2] },
          { name: "역사로 탐구하는 현대 세계", semesters: [2] },
          { name: "국제 관계의 이해", semesters: [2] },
          { name: "윤리문제 탐구", semesters: [2] },
          { name: "과학의 역사와 문화", semesters: [2] },
          { name: "기후변화와 환경생태", semesters: [2] },
          { name: "일본 언어와 역사의 이해1", semesters: [2] },
          { name: "중국 언어와 역사의 이해1", semesters: [2] },
        ]
      },
      {
        id: "선택군5", name: "3학년 1학기 교과(군) 간 선택 (택1)", grade: 3, targetGrade: 3, semester: "1학기",
        selectCount: 1, credits: 2,
        description: "3학년 1학기 교과(군) 간 선택 선택군5 (택1, 2학점)",
        subjects: [
          { name: "음악 연주와 창작", semesters: [1] },
          { name: "미술 창작", semesters: [1] },
        ]
      },
      {
        id: "선택군6", name: "3학년 2학기 교과(군) 간 선택 (택1)", grade: 3, targetGrade: 3, semester: "2학기",
        selectCount: 1, credits: 2,
        description: "3학년 2학기 교과(군) 간 선택 선택군6 (택1, 2학점)",
        subjects: [
          { name: "음악 감상과 비평", semesters: [2] },
          { name: "미술 감상과 비평", semesters: [2] },
        ]
      },
    ]
  },
  // 분당대진고등학교
  "bundang_daejin": {
    mandatory: {
      1: [
        { name: "공통국어1", semesters: [1], credit: 4 },
        { name: "공통국어2", semesters: [2], credit: 4 },
        { name: "공통수학1", semesters: [1], credit: 4 },
        { name: "공통수학2", semesters: [2], credit: 4 },
        { name: "공통영어1", semesters: [1], credit: 3 },
        { name: "공통영어2", semesters: [2], credit: 3 },
        { name: "한국사1", semesters: [1], credit: 3 },
        { name: "한국사2", semesters: [2], credit: 3 },
        { name: "통합사회1", semesters: [1], credit: 3 },
        { name: "통합사회2", semesters: [2], credit: 3 },
        { name: "통합과학1", semesters: [1], credit: 4 },
        { name: "통합과학2", semesters: [2], credit: 4 },
        { name: "과학탐구실험1", semesters: [1], credit: 1 },
        { name: "과학탐구실험2", semesters: [2], credit: 1 },
        { name: "체육1", semesters: [1], credit: 2 },
        { name: "체육2", semesters: [2], credit: 2 },
        { name: "음악↔미술", semesters: [1, 2], credit: 2 },
        { name: "기술·가정↔정보", semesters: [1, 2], credit: 3 },
      ],
      2: [
        { name: "문학", semesters: [1], credit: 4 },
        { name: "화법과 언어", semesters: [2], credit: 4 },
        { name: "대수", semesters: [1], credit: 4 },
        { name: "미적분Ⅰ", semesters: [2], credit: 4 },
        { name: "영어Ⅰ", semesters: [1], credit: 4 },
        { name: "영어Ⅱ", semesters: [2], credit: 4 },
        { name: "스포츠 생활1", semesters: [1], credit: 2 },
        { name: "스포츠 생활2", semesters: [2], credit: 2 },
      ],
      3: [
        { name: "독서와 작문", semesters: [1], credit: 4 },
        { name: "주제 탐구 독서", semesters: [2], credit: 4 },
        { name: "확률과 통계", semesters: [1], credit: 4 },
        { name: "실용 통계", semesters: [2], credit: 4 },
        { name: "영어 독해와 작문", semesters: [1], credit: 4 },
        { name: "심화 영어", semesters: [2], credit: 4 },
        { name: "스포츠 과학", semesters: [1], credit: 2 },
        { name: "스포츠 문화", semesters: [2], credit: 2 },
        { name: "음악 감상과 비평↔미술 창작", semesters: [1, 2], credit: 3 },
      ],
    },
    groups: [
      {
        id: "선택군1", name: "2학년 1학기 교과(군) 간 선택 (택4)", grade: 2, targetGrade: 2, semester: "1학기",
        selectCount: 4, credits: 3,
        description: "2학년 1학기 교과(군) 간 선택 선택군1 (택4, 12학점)",
        subjects: [
          { name: "사회와 문화", semesters: [1] },
          { name: "현대사회와 윤리", semesters: [1] },
          { name: "한국지리 탐구", semesters: [1] },
          { name: "동아시아 역사 기행", semesters: [1] },
          { name: "물리학", semesters: [1] },
          { name: "화학", semesters: [1] },
          { name: "생명과학", semesters: [1] },
          { name: "지구과학", semesters: [1] },
        ]
      },
      {
        id: "선택군2", name: "2학년 2학기 교과(군) 간 선택 (택4)", grade: 2, targetGrade: 2, semester: "2학기",
        selectCount: 4, credits: 3,
        description: "2학년 2학기 교과(군) 간 선택 선택군2 (택4, 12학점)",
        subjects: [
          { name: "기하", semesters: [2] },
          { name: "경제", semesters: [2] },
          { name: "윤리와 사상", semesters: [2] },
          { name: "세계시민과 지리", semesters: [2] },
          { name: "세계사", semesters: [2] },
          { name: "역학과 에너지", semesters: [2] },
          { name: "물질과 에너지", semesters: [2] },
          { name: "세포와 물질대사", semesters: [2] },
          { name: "지구시스템과학", semesters: [2] },
        ]
      },
      {
        id: "선택군3", name: "2학년 1학기 교과(군) 간 선택 (택1)", grade: 2, targetGrade: 2, semester: "1학기",
        selectCount: 1, credits: 3,
        description: "2학년 1학기 교과(군) 간 선택 선택군3 (택1, 3학점)",
        subjects: [
          { name: "일본어", semesters: [1] },
          { name: "중국어", semesters: [1] },
          { name: "한문", semesters: [1] },
        ]
      },
      {
        id: "선택군4", name: "2학년 2학기 교과(군) 간 선택 (택1)", grade: 2, targetGrade: 2, semester: "2학기",
        selectCount: 1, credits: 3,
        description: "2학년 2학기 교과(군) 간 선택 선택군4 (택1, 3학점)",
        subjects: [
          { name: "일본어 회화", semesters: [2] },
          { name: "중국어 회화", semesters: [2] },
          { name: "언어생활과 한자", semesters: [2] },
        ]
      },
      {
        id: "선택군5", name: "3학년 1학기 교과(군) 간 선택 (택3)", grade: 3, targetGrade: 3, semester: "1학기",
        selectCount: 3, credits: 3,
        description: "3학년 1학기 교과(군) 간 선택 선택군5 (택3, 9학점)",
        subjects: [
          { name: "문학과 영상", semesters: [1] },
          { name: "미적분Ⅱ", semesters: [1] },
          { name: "세계 문화와 영어", semesters: [1] },
          { name: "법과 사회", semesters: [1] },
          { name: "정치", semesters: [1] },
          { name: "인문학과 윤리", semesters: [1] },
          { name: "여행지리", semesters: [1] },
          { name: "역사로 탐구하는 현대 세계", semesters: [1] },
          { name: "전자기와 양자", semesters: [1] },
          { name: "화학 반응의 세계", semesters: [1] },
          { name: "생물의 유전", semesters: [1] },
          { name: "행성우주과학", semesters: [1] },
        ]
      },
      {
        id: "선택군6", name: "3학년 2학기 교과(군) 간 선택 (택3)", grade: 3, targetGrade: 3, semester: "2학기",
        selectCount: 3, credits: 3,
        description: "3학년 2학기 교과(군) 간 선택 선택군6 (택3, 9학점)",
        subjects: [
          { name: "언어생활 탐구", semesters: [2] },
          { name: "수학과제 탐구", semesters: [2] },
          { name: "미디어 영어", semesters: [2] },
          { name: "금융과 경제생활", semesters: [2] },
          { name: "윤리문제 탐구", semesters: [2] },
          { name: "사회문제 탐구", semesters: [2] },
          { name: "기후변화와 지속가능한 세계", semesters: [2] },
          { name: "융합과학 탐구", semesters: [2] },
          { name: "기후변화와 환경생태", semesters: [2] },
          { name: "과학의 역사와 문화", semesters: [2] },
        ]
      },
      {
        id: "선택군7", name: "3학년 1학기 교과(군) 간 선택 (택1)", grade: 3, targetGrade: 3, semester: "1학기",
        selectCount: 1, credits: 3,
        description: "3학년 1학기 교과(군) 간 선택 선택군7 (택1, 3학점)",
        subjects: [
          { name: "생태와 환경", semesters: [1] },
          { name: "생활과 한문", semesters: [1] },
          { name: "데이터 과학", semesters: [1] },
        ]
      },
      {
        id: "선택군8", name: "3학년 2학기 교과(군) 간 선택 (택1)", grade: 3, targetGrade: 3, semester: "2학기",
        selectCount: 1, credits: 3,
        description: "3학년 2학기 교과(군) 간 선택 선택군8 (택1, 3학점)",
        subjects: [
          { name: "논술", semesters: [2] },
          { name: "한문 고전 읽기", semesters: [2] },
          { name: "인공지능 기초", semesters: [2] },
        ]
      },
    ]
  },
  // 효성고등학교
  "hyosung": {
    mandatory: {
      1: [
        { name: "공통국어1", semesters: [1], credit: 4 },
        { name: "공통국어2", semesters: [2], credit: 4 },
        { name: "공통수학1", semesters: [1], credit: 4 },
        { name: "공통수학2", semesters: [2], credit: 4 },
        { name: "공통영어1", semesters: [1], credit: 4 },
        { name: "공통영어2", semesters: [2], credit: 4 },
        { name: "한국사1", semesters: [1], credit: 3 },
        { name: "한국사2", semesters: [2], credit: 3 },
        { name: "통합사회1", semesters: [1], credit: 4 },
        { name: "통합사회2", semesters: [2], credit: 4 },
        { name: "통합과학1", semesters: [1], credit: 4 },
        { name: "통합과학2", semesters: [2], credit: 4 },
        { name: "과학탐구실험1", semesters: [1], credit: 1 },
        { name: "과학탐구실험2", semesters: [2], credit: 1 },
        { name: "체육1", semesters: [1], credit: 2 },
        { name: "체육2", semesters: [2], credit: 2 },
        { name: "음악↔미술", semesters: [1, 2], credit: 3 },
      ],
      2: [
        { name: "문학", semesters: [1], credit: 4 },
        { name: "독서와 작문", semesters: [2], credit: 4 },
        { name: "대수", semesters: [1], credit: 4 },
        { name: "미적분Ⅰ", semesters: [2], credit: 4 },
        { name: "영어Ⅰ", semesters: [1], credit: 3 },
        { name: "영어Ⅱ", semesters: [2], credit: 3 },
        { name: "스포츠 문화", semesters: [1], credit: 1 },
        { name: "스포츠 과학", semesters: [2], credit: 1 },
      ],
      3: [
        { name: "화법과 언어", semesters: [1], credit: 3 },
        { name: "독서 토론과 글쓰기", semesters: [2], credit: 3 },
        { name: "확률과 통계", semesters: [1], credit: 4 },
        { name: "실용 통계", semesters: [2], credit: 4 },
        { name: "영어 독해와 작문", semesters: [1], credit: 3 },
        { name: "영미 문학 읽기", semesters: [2], credit: 3 },
        { name: "스포츠 생활1", semesters: [1], credit: 2 },
        { name: "스포츠 생활2", semesters: [2], credit: 2 },
        { name: "논리와 사고↔논술", semesters: [1, 2], credit: 3 },
        { name: "진로와 직업↔교육의 이해", semesters: [1, 2], credit: 2 },
      ],
    },
    groups: [
      {
        id: "선택군1", name: "2학년 1학기 교과(군) 간 선택 (택4)", grade: 2, targetGrade: 2, semester: "1학기",
        selectCount: 4, credits: 3,
        description: "2학년 1학기 교과(군) 간 선택 선택군1 (택4, 12학점)",
        subjects: [
          { name: "현대사회와 윤리", semesters: [1] },
          { name: "동아시아 역사 기행", semesters: [1] },
          { name: "정치", semesters: [1] },
          { name: "세계시민과 지리", semesters: [1] },
          { name: "물리학", semesters: [1] },
          { name: "화학", semesters: [1] },
          { name: "생명과학", semesters: [1] },
          { name: "지구과학", semesters: [1] },
        ]
      },
      {
        id: "선택군2", name: "2학년 2학기 교과(군) 간 선택 (택4)", grade: 2, targetGrade: 2, semester: "2학기",
        selectCount: 4, credits: 3,
        description: "2학년 2학기 교과(군) 간 선택 선택군2 (택4, 12학점)",
        subjects: [
          { name: "기하", semesters: [2] },
          { name: "인공지능 수학", semesters: [2] },
          { name: "인문학과 윤리", semesters: [2] },
          { name: "역사로 탐구하는 현대 세계", semesters: [2] },
          { name: "법과 사회", semesters: [2] },
          { name: "도시의 미래 탐구", semesters: [2] },
          { name: "역학과 에너지", semesters: [2] },
          { name: "물질과 에너지", semesters: [2] },
          { name: "생물의 유전", semesters: [2] },
          { name: "행성우주과학", semesters: [2] },
        ]
      },
      {
        id: "선택군3", name: "2학년 1학기 교과(군) 간 선택 (택1)", grade: 2, targetGrade: 2, semester: "1학기",
        selectCount: 1, credits: 2,
        description: "2학년 1학기 교과(군) 간 선택 선택군3 (택1, 2학점)",
        subjects: [
          { name: "미술 창작", semesters: [1] },
          { name: "음악 연주와 창작", semesters: [1] },
        ]
      },
      {
        id: "선택군4", name: "2학년 2학기 교과(군) 간 선택 (택1)", grade: 2, targetGrade: 2, semester: "2학기",
        selectCount: 1, credits: 2,
        description: "2학년 2학기 교과(군) 간 선택 선택군4 (택1, 2학점)",
        subjects: [
          { name: "미술과 매체", semesters: [2] },
          { name: "음악과 미디어", semesters: [2] },
        ]
      },
      {
        id: "선택군5", name: "2학년 1학기 교과(군) 간 선택 (택1)", grade: 2, targetGrade: 2, semester: "1학기",
        selectCount: 1, credits: 3,
        description: "2학년 1학기 교과(군) 간 선택 선택군5 (택1, 3학점)",
        subjects: [
          { name: "일본어", semesters: [1] },
          { name: "스페인어", semesters: [1] },
          { name: "정보", semesters: [1] },
        ]
      },
      {
        id: "선택군6", name: "2학년 2학기 교과(군) 간 선택 (택1)", grade: 2, targetGrade: 2, semester: "2학기",
        selectCount: 1, credits: 3,
        description: "2학년 2학기 교과(군) 간 선택 선택군6 (택1, 3학점)",
        subjects: [
          { name: "일본어 회화", semesters: [2] },
          { name: "스페인어 회화", semesters: [2] },
          { name: "인공지능 기초", semesters: [2] },
        ]
      },
      {
        id: "선택군7", name: "3학년 1학기 교과(군) 간 선택 (택4)", grade: 3, targetGrade: 3, semester: "1학기",
        selectCount: 4, credits: 3,
        description: "3학년 1학기 교과(군) 간 선택 선택군7 (택4, 12학점)",
        subjects: [
          { name: "미적분Ⅱ", semesters: [1] },
          { name: "여행지리", semesters: [1] },
          { name: "윤리와 사상", semesters: [1] },
          { name: "사회와 문화", semesters: [1] },
          { name: "사회문제 탐구", semesters: [1] },
          { name: "전자기와 양자", semesters: [1] },
          { name: "화학 반응의 세계", semesters: [1] },
          { name: "세포와 물질대사", semesters: [1] },
          { name: "지구시스템과학", semesters: [1] },
        ]
      },
      {
        id: "선택군8", name: "3학년 2학기 교과(군) 간 선택 (택4)", grade: 3, targetGrade: 3, semester: "2학기",
        selectCount: 4, credits: 3,
        description: "3학년 2학기 교과(군) 간 선택 선택군8 (택4, 12학점)",
        subjects: [
          { name: "경제", semesters: [2] },
          { name: "한국지리 탐구", semesters: [2] },
          { name: "윤리문제 탐구", semesters: [2] },
          { name: "금융과 경제생활", semesters: [2] },
          { name: "기후변화와 지속가능한 세계", semesters: [2] },
          { name: "과학과제 연구", semesters: [2] },
          { name: "고급 물리학", semesters: [2] },
          { name: "고급 화학", semesters: [2] },
          { name: "고급 생명과학", semesters: [2] },
          { name: "고급 지구과학", semesters: [2] },
          { name: "융합과학 탐구", semesters: [2] },
          { name: "과학의 역사와 문화", semesters: [2] },
          { name: "기후변화와 환경생태", semesters: [2] },
        ]
      },
    ]
  },
  // 한솔고등학교
  "hansol": {
    mandatory: {
      1: [
        { name: "공통국어1", semesters: [1], credit: 4 },
        { name: "공통국어2", semesters: [2], credit: 4 },
        { name: "공통수학1", semesters: [1], credit: 4 },
        { name: "공통수학2", semesters: [2], credit: 4 },
        { name: "공통영어1", semesters: [1], credit: 4 },
        { name: "공통영어2", semesters: [2], credit: 4 },
        { name: "한국사1", semesters: [1], credit: 3 },
        { name: "한국사2", semesters: [2], credit: 3 },
        { name: "통합사회1", semesters: [1], credit: 4 },
        { name: "통합사회2", semesters: [2], credit: 4 },
        { name: "통합과학1", semesters: [1], credit: 4 },
        { name: "통합과학2", semesters: [2], credit: 4 },
        { name: "과학탐구실험1", semesters: [1], credit: 1 },
        { name: "과학탐구실험2", semesters: [2], credit: 1 },
        { name: "체육1", semesters: [1], credit: 2 },
        { name: "체육2", semesters: [2], credit: 2 },
        { name: "음악↔미술", semesters: [1, 2], credit: 3 },
      ],
      2: [
        { name: "문학", semesters: [1], credit: 4 },
        { name: "화법과 언어", semesters: [2], credit: 4 },
        { name: "대수", semesters: [1], credit: 4 },
        { name: "미적분Ⅰ", semesters: [2], credit: 4 },
        { name: "영어Ⅰ", semesters: [1], credit: 4 },
        { name: "영어Ⅱ", semesters: [2], credit: 4 },
        { name: "스포츠 생활1", semesters: [1], credit: 2 },
        { name: "스포츠 생활2", semesters: [2], credit: 2 },
      ],
      3: [
        { name: "독서와 작문", semesters: [1], credit: 3 },
        { name: "독서 토론과 글쓰기", semesters: [2], credit: 3 },
        { name: "확률과 통계", semesters: [1], credit: 3 },
        { name: "수학과제 탐구", semesters: [2], credit: 3 },
        { name: "영어 독해와 작문", semesters: [1], credit: 3 },
        { name: "심화 영어 독해와 작문", semesters: [2], credit: 3 },
        { name: "스포츠 과학", semesters: [1], credit: 1 },
        { name: "스포츠 문화", semesters: [2], credit: 1 },
      ],
    },
    groups: [
      {
        id: "선택군1", name: "2학년 1학기 교과(군) 간 선택 (택4)", grade: 2, targetGrade: 2, semester: "1학기",
        selectCount: 4, credits: 3,
        description: "2학년 1학기 교과(군) 간 선택 선택군1 (택4, 12학점)",
        subjects: [
          { name: "주제 탐구 독서", semesters: [1] },
          { name: "세계 문화와 영어", semesters: [1] },
          { name: "인공지능 수학", semesters: [1] },
          { name: "세계사", semesters: [1] },
          { name: "윤리와 사상", semesters: [1] },
          { name: "정치", semesters: [1] },
          { name: "경제", semesters: [1] },
          { name: "한국지리 탐구", semesters: [1] },
          { name: "물리학", semesters: [1] },
          { name: "화학", semesters: [1] },
          { name: "생명과학", semesters: [1] },
          { name: "지구과학", semesters: [1] },
        ]
      },
      {
        id: "선택군2", name: "2학년 2학기 교과(군) 간 선택 (택4)", grade: 2, targetGrade: 2, semester: "2학기",
        selectCount: 4, credits: 3,
        description: "2학년 2학기 교과(군) 간 선택 선택군2 (택4, 12학점)",
        subjects: [
          { name: "영어 발표와 토론", semesters: [2] },
          { name: "기하", semesters: [2] },
          { name: "동아시아 역사 기행", semesters: [2] },
          { name: "현대사회와 윤리", semesters: [2] },
          { name: "법과 사회", semesters: [2] },
          { name: "여행지리", semesters: [2] },
          { name: "역학과 에너지", semesters: [2] },
          { name: "물질과 에너지", semesters: [2] },
          { name: "세포와 물질대사", semesters: [2] },
          { name: "지구시스템과학", semesters: [2] },
        ]
      },
      {
        id: "선택군3", name: "2학년 1학기 교과(군) 간 선택 (택1)", grade: 2, targetGrade: 2, semester: "1학기",
        selectCount: 1, credits: 3,
        description: "2학년 1학기 교과(군) 간 선택 선택군3 (택1, 3학점)",
        subjects: [
          { name: "정보", semesters: [1] },
          { name: "로봇과 공학세계", semesters: [1] },
          { name: "일본어", semesters: [1] },
          { name: "중국어", semesters: [1] },
        ]
      },
      {
        id: "선택군4", name: "2학년 2학기 교과(군) 간 선택 (택1)", grade: 2, targetGrade: 2, semester: "2학기",
        selectCount: 1, credits: 3,
        description: "2학년 2학기 교과(군) 간 선택 선택군4 (택1, 3학점)",
        subjects: [
          { name: "인공지능 기초", semesters: [2] },
          { name: "생활과학 탐구", semesters: [2] },
          { name: "일본어 회화", semesters: [2] },
          { name: "중국어 회화", semesters: [2] },
        ]
      },
      {
        id: "선택군5", name: "3학년 1학기 교과(군) 간 선택 (택4)", grade: 3, targetGrade: 3, semester: "1학기",
        selectCount: 4, credits: 3,
        description: "3학년 1학기 교과(군) 간 선택 선택군5 (택4, 12학점)",
        subjects: [
          { name: "문학과 영상", semesters: [1] },
          { name: "심화 영어", semesters: [1] },
          { name: "미적분Ⅱ", semesters: [1] },
          { name: "경제 수학", semesters: [1] },
          { name: "역사로 탐구하는 현대 세계", semesters: [1] },
          { name: "인문학과 윤리", semesters: [1] },
          { name: "사회와 문화", semesters: [1] },
          { name: "사회문제 탐구", semesters: [1] },
          { name: "세계시민과 지리", semesters: [1] },
          { name: "전자기와 양자", semesters: [1] },
          { name: "화학 반응의 세계", semesters: [1] },
          { name: "생물의 유전", semesters: [1] },
          { name: "행성우주과학", semesters: [1] },
          { name: "융합과학 탐구", semesters: [1] },
        ]
      },
      {
        id: "선택군6", name: "3학년 2학기 교과(군) 간 선택 (택4)", grade: 3, targetGrade: 3, semester: "2학기",
        selectCount: 4, credits: 3,
        description: "3학년 2학기 교과(군) 간 선택 선택군6 (택4, 12학점)",
        subjects: [
          { name: "언어생활 탐구", semesters: [2] },
          { name: "미디어 영어", semesters: [2] },
          { name: "전문 수학", semesters: [2] },
          { name: "역사로 탐구하는 현대 세계", semesters: [2] },
          { name: "윤리문제 탐구", semesters: [2] },
          { name: "금융과 경제생활", semesters: [2] },
          { name: "기후변화와 지속가능한 세계", semesters: [2] },
          { name: "융합과학 탐구", semesters: [2] },
          { name: "과학의 역사와 문화", semesters: [2] },
          { name: "기후변화와 환경생태", semesters: [2] },
        ]
      },
      {
        id: "선택군7", name: "3학년 1학기 교과(군) 간 선택 (택1)", grade: 3, targetGrade: 3, semester: "1학기",
        selectCount: 1, credits: 3,
        description: "3학년 1학기 교과(군) 간 선택 선택군7 (택1, 3학점)",
        subjects: [
          { name: "정보과학", semesters: [1] },
          { name: "창의 공학 설계", semesters: [1] },
          { name: "일본 문화", semesters: [1] },
          { name: "중국 문화", semesters: [1] },
        ]
      },
      {
        id: "선택군8", name: "3학년 2학기 교과(군) 간 선택 (택1)", grade: 3, targetGrade: 3, semester: "2학기",
        selectCount: 1, credits: 3,
        description: "3학년 2학기 교과(군) 간 선택 선택군8 (택1, 3학점)",
        subjects: [
          { name: "소프트웨어와 생활", semesters: [2] },
          { name: "지식 재산 일반", semesters: [2] },
          { name: "심화 일본어", semesters: [2] },
          { name: "심화 중국어", semesters: [2] },
        ]
      },
      {
        id: "선택군9", name: "3학년 1학기 교과(군) 간 선택 (택1)", grade: 3, targetGrade: 3, semester: "1학기",
        selectCount: 1, credits: 2,
        description: "3학년 1학기 교과(군) 간 선택 선택군9 (택1, 2학점)",
        subjects: [
          { name: "미술 창작", semesters: [1] },
          { name: "미술 감상과 비평", semesters: [1] },
          { name: "음악 감상과 비평", semesters: [1] },
        ]
      },
      {
        id: "선택군10", name: "3학년 2학기 교과(군) 간 선택 (택1)", grade: 3, targetGrade: 3, semester: "2학기",
        selectCount: 1, credits: 2,
        description: "3학년 2학기 교과(군) 간 선택 선택군10 (택1, 2학점)",
        subjects: [
          { name: "미술 창작", semesters: [2] },
          { name: "미술과 매체", semesters: [2] },
          { name: "음악과 미디어", semesters: [2] },
        ]
      },
      {
        id: "선택군11", name: "3학년 1학기 교과(군) 간 선택 (택1)", grade: 3, targetGrade: 3, semester: "1학기",
        selectCount: 1, credits: 2,
        description: "3학년 1학기 교과(군) 간 선택 선택군11 (택1, 2학점)",
        subjects: [
          { name: "생태와 환경", semesters: [1] },
          { name: "인간과 경제활동", semesters: [1] },
        ]
      },
      {
        id: "선택군12", name: "3학년 2학기 교과(군) 간 선택 (택1)", grade: 3, targetGrade: 3, semester: "2학기",
        selectCount: 1, credits: 2,
        description: "3학년 2학기 교과(군) 간 선택 선택군12 (택1, 2학점)",
        subjects: [
          { name: "생태와 환경", semesters: [2] },
          { name: "인간과 경제활동", semesters: [2] },
        ]
      },
    ]
  },
  // 복정고등학교
  "bokjeong": {
    mandatory: {
      1: [
        { name: "공통국어1", semesters: [1], credit: 4 },
        { name: "공통국어2", semesters: [2], credit: 4 },
        { name: "공통수학1", semesters: [1], credit: 4 },
        { name: "공통수학2", semesters: [2], credit: 4 },
        { name: "공통영어1", semesters: [1], credit: 4 },
        { name: "공통영어2", semesters: [2], credit: 4 },
        { name: "한국사1", semesters: [1], credit: 3 },
        { name: "한국사2", semesters: [2], credit: 3 },
        { name: "통합사회1", semesters: [1], credit: 4 },
        { name: "통합사회2", semesters: [2], credit: 4 },
        { name: "통합과학1", semesters: [1], credit: 4 },
        { name: "통합과학2", semesters: [2], credit: 4 },
        { name: "과학탐구실험1", semesters: [1], credit: 1 },
        { name: "과학탐구실험2", semesters: [2], credit: 1 },
        { name: "체육1", semesters: [1], credit: 2 },
        { name: "체육2", semesters: [2], credit: 2 },
        { name: "기술·가정↔정보", semesters: [1, 2], credit: 3 },
      ],
      2: [
        { name: "문학", semesters: [1], credit: 3 },
        { name: "독서와 작문", semesters: [2], credit: 3 },
        { name: "대수", semesters: [1], credit: 4 },
        { name: "미적분Ⅰ", semesters: [2], credit: 4 },
        { name: "영어Ⅰ", semesters: [1], credit: 3 },
        { name: "영어Ⅱ", semesters: [2], credit: 3 },
        { name: "운동과 건강", semesters: [1], credit: 2 },
        { name: "스포츠 문화", semesters: [2], credit: 2 },
        { name: "음악 감상과 비평↔미술 창작", semesters: [1, 2], credit: 2 },
      ],
      3: [
        { name: "화법과 언어", semesters: [1], credit: 3 },
        { name: "확률과 통계", semesters: [1], credit: 3 },
        { name: "영어 독해와 작문", semesters: [1], credit: 3 },
        { name: "스포츠 생활1", semesters: [1], credit: 2 },
        { name: "스포츠 생활2", semesters: [2], credit: 2 },
      ],
    },
    groups: [
      {
        id: "선택군1", name: "2학년 1학기 교과(군) 간 선택 (택4)", grade: 2, targetGrade: 2, semester: "1학기",
        selectCount: 4, credits: 3,
        description: "2학년 1학기 교과(군) 간 선택 선택군1 (택4, 12학점)",
        subjects: [
          { name: "주제 탐구 독서", semesters: [1] },
          { name: "기하", semesters: [1] },
          { name: "세계 문화와 영어", semesters: [1] },
          { name: "정치", semesters: [1] },
          { name: "경제", semesters: [1] },
          { name: "한국지리 탐구", semesters: [1] },
          { name: "세계사", semesters: [1] },
          { name: "윤리와 사상", semesters: [1] },
          { name: "물리학", semesters: [1] },
          { name: "화학", semesters: [1] },
          { name: "생명과학", semesters: [1] },
          { name: "지구과학", semesters: [1] },
        ]
      },
      {
        id: "선택군2", name: "2학년 2학기 교과(군) 간 선택 (택4)", grade: 2, targetGrade: 2, semester: "2학기",
        selectCount: 4, credits: 3,
        description: "2학년 2학기 교과(군) 간 선택 선택군2 (택4, 12학점)",
        subjects: [
          { name: "문학과 영상", semesters: [2] },
          { name: "인공지능 수학", semesters: [2] },
          { name: "미디어 영어", semesters: [2] },
          { name: "법과 사회", semesters: [2] },
          { name: "사회와 문화", semesters: [2] },
          { name: "세계시민과 지리", semesters: [2] },
          { name: "동아시아 역사 기행", semesters: [2] },
          { name: "현대사회와 윤리", semesters: [2] },
          { name: "역학과 에너지", semesters: [2] },
          { name: "물질과 에너지", semesters: [2] },
          { name: "생물의 유전", semesters: [2] },
          { name: "지구시스템과학", semesters: [2] },
        ]
      },
      {
        id: "선택군3", name: "2학년 1학기 교과(군) 간 선택 (택1)", grade: 2, targetGrade: 2, semester: "1학기",
        selectCount: 1, credits: 3,
        description: "2학년 1학기 교과(군) 간 선택 선택군3 (택1, 3학점)",
        subjects: [
          { name: "일본어", semesters: [1] },
          { name: "중국어", semesters: [1] },
        ]
      },
      {
        id: "선택군4", name: "2학년 2학기 교과(군) 간 선택 (택1)", grade: 2, targetGrade: 2, semester: "2학기",
        selectCount: 1, credits: 3,
        description: "2학년 2학기 교과(군) 간 선택 선택군4 (택1, 3학점)",
        subjects: [
          { name: "일본어 회화", semesters: [2] },
          { name: "중국어 회화", semesters: [2] },
        ]
      },
      {
        id: "선택군5", name: "3학년 1학기 교과(군) 간 선택 (택4)", grade: 3, targetGrade: 3, semester: "1학기",
        selectCount: 4, credits: 3,
        description: "3학년 1학기 교과(군) 간 선택 선택군5 (택4, 12학점)",
        subjects: [
          { name: "독서 토론과 글쓰기", semesters: [1] },
          { name: "현대문학의 감상과 이해", semesters: [1] },
          { name: "미적분Ⅱ", semesters: [1] },
          { name: "경제 수학", semesters: [1] },
          { name: "심화 영어", semesters: [1] },
          { name: "심화 영어 독해와 작문", semesters: [1] },
          { name: "사회문제 탐구", semesters: [1] },
          { name: "인문학과 윤리", semesters: [1] },
          { name: "도시의 미래 탐구", semesters: [1] },
          { name: "한국사 심화 탐구", semesters: [1] },
          { name: "전자기와 양자", semesters: [1] },
          { name: "화학 반응의 세계", semesters: [1] },
          { name: "세포와 물질대사", semesters: [1] },
          { name: "행성우주과학", semesters: [1] },
          { name: "융합과학 탐구", semesters: [1] },
        ]
      },
      {
        id: "선택군6", name: "3학년 2학기 교과(군) 간 선택 (택4)", grade: 3, targetGrade: 3, semester: "2학기",
        selectCount: 4, credits: 3,
        description: "3학년 2학기 교과(군) 간 선택 선택군6 (택4, 12학점)",
        subjects: [
          { name: "언어생활 탐구", semesters: [2] },
          { name: "매체 의사소통", semesters: [2] },
          { name: "수학과제 탐구", semesters: [2] },
          { name: "실용 통계", semesters: [2] },
          { name: "수학과 문화", semesters: [2] },
          { name: "영어 발표와 토론", semesters: [2] },
          { name: "실생활 영어 회화", semesters: [2] },
        ]
      },
      {
        id: "선택군7", name: "3학년 2학기 교과(군) 간 선택 (택3)", grade: 3, targetGrade: 3, semester: "2학기",
        selectCount: 3, credits: 3,
        description: "3학년 2학기 교과(군) 간 선택 선택군7 (택3, 9학점)",
        subjects: [
          { name: "여행지리", semesters: [2] },
          { name: "역사로 탐구하는 현대 세계", semesters: [2] },
          { name: "금융과 경제생활", semesters: [2] },
          { name: "윤리문제 탐구", semesters: [2] },
          { name: "과학의 역사와 문화", semesters: [2] },
          { name: "기후변화와 환경생태", semesters: [2] },
          { name: "융합과학 탐구", semesters: [2] },
        ]
      },
      {
        id: "선택군8", name: "3학년 1학기 교과(군) 간 선택 (택1)", grade: 3, targetGrade: 3, semester: "1학기",
        selectCount: 1, credits: 3,
        description: "3학년 1학기 교과(군) 간 선택 선택군8 (택1, 3학점)",
        subjects: [
          { name: "심화 일본어", semesters: [1] },
          { name: "심화 중국어", semesters: [1] },
          { name: "지식 재산 일반", semesters: [1] },
          { name: "인공지능 기초", semesters: [1] },
        ]
      },
      {
        id: "선택군9", name: "3학년 2학기 교과(군) 간 선택 (택1)", grade: 3, targetGrade: 3, semester: "2학기",
        selectCount: 1, credits: 3,
        description: "3학년 2학기 교과(군) 간 선택 선택군9 (택1, 3학점)",
        subjects: [
          { name: "일본 문화", semesters: [2] },
          { name: "중국 문화", semesters: [2] },
          { name: "창의 공학 설계", semesters: [2] },
          { name: "데이터 과학", semesters: [2] },
        ]
      },
      {
        id: "선택군10", name: "3학년 1학기 교과(군) 간 선택 (택1)", grade: 3, targetGrade: 3, semester: "1학기",
        selectCount: 1, credits: 3,
        description: "3학년 1학기 교과(군) 간 선택 선택군10 (택1, 3학점)",
        subjects: [
          { name: "음악", semesters: [1] },
          { name: "미술", semesters: [1] },
        ]
      },
      {
        id: "선택군11", name: "3학년 2학기 교과(군) 간 선택 (택1)", grade: 3, targetGrade: 3, semester: "2학기",
        selectCount: 1, credits: 3,
        description: "3학년 2학기 교과(군) 간 선택 선택군11 (택1, 3학점)",
        subjects: [
          { name: "음악과 미디어", semesters: [2] },
          { name: "미술과 매체", semesters: [2] },
        ]
      },
    ]
  },
};
