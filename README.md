# 2022 개정교육과정 선택과목 가이드 (성남지역)

성남시 고등학교 편제표와 대학 전공별 권장 선택과목을 한눈에 비교하는 웹앱입니다.
자료는 학과바이들(캠퍼스멘토), 각 시도교육청, 대학 권장과목 내용을 바탕으로 제작되었습니다.

- 제작: 숭신고등학교 김강석
- 버전: v1.02

## 주요 기능

- 학교별 교육과정 편제표 조회 및 학교 간 비교
- 대학 전공별 권장 선택과목 안내
- 과목 상세 정보 및 졸업 요건(학점) 검증
- (선택) Gemini AI로 편성표 PDF/텍스트를 분석해 학교 직접 등록

## 로컬 실행

Node.js 20 이상이 필요합니다.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # dist/ 에 정적 파일 생성
```

## AI 분석 기능과 API 키

AI 분석(PDF/텍스트 → 편제표 등록) 기능은 **사용자가 직접 발급한 Gemini API 키**로 동작합니다.
처음 사용할 때 키 입력창이 뜨며, 키는 해당 브라우저(localStorage)에만 저장되고 저장소나 빌드 결과물에는 포함되지 않습니다.
키 발급: https://aistudio.google.com/apikey

## GitHub Pages 배포

1. 저장소에 push (기본 브랜치 `main`)
2. 저장소 **Settings → Pages → Source** 를 **GitHub Actions** 로 설정
3. `.github/workflows/deploy.yml` 이 자동으로 빌드·배포합니다.

## 저작권

ⓒ 숭신고등학교 김강석 (cc by-nc)

출처를 밝히면 자유롭게 공유·변형할 수 있으나, 상업적 이용은 금지됩니다.
([CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/deed.ko))
