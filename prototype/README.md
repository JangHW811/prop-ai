# PropAI 홈페이지 - (주)프롭파이 PropAI Inc.

## 프로젝트 개요
웹·앱 개발 전문회사 (주)프롭파이 PropAI Inc.의 공식 홈페이지입니다.  
네이버 스타일의 그린·화이트 컬러 시스템으로 디자인된 완성형 랜딩페이지입니다.

---

## 완성된 기능

### 디자인
- ✅ **네이버 스타일 컬러 시스템** — Primary `#03C75A` (네이버 그린) + 화이트 + 밝은 배경 조합
- ✅ **완전 반응형** — 모바일/태블릿/데스크탑 모두 최적화
- ✅ **고정 헤더** — 스크롤 시 블러/그림자 효과, 햄버거 모바일 메뉴
- ✅ **스크롤 리빌 애니메이션** — IntersectionObserver 기반
- ✅ **타이핑 효과** — Hero 영역 문구 자동 전환

### 섹션 구성
| 섹션 | 내용 |
|------|------|
| Hero | 타이핑 카피 + 그라데이션 배경 + 통계 바 |
| About | 회사소개 + 아이디어→개발→런칭 3단계 |
| Tech Leadership | CTO 프로필 + 프로젝트 이력 6건 + 기술 역량 |
| Why PropAI | NDA/전문성/신뢰/낮은진입장벽 4카드 |
| Services | 앱/웹/UI-UX/백엔드/AI/유지보수 6카드 |
| Process | 5단계 타임라인 프로세스 |
| Quote Banner | 강렬한 인용구 + CTA |
| Contact | 상담폼(파일첨부·DB저장) + 연락처 + 팀소개 |
| Footer | 소셜·사이트맵·회사정보 |

### SEO
- ✅ `<title>` 최적화
- ✅ `<meta description>` 반영
- ✅ `<meta keywords>` 반영
- ✅ Open Graph (og:title/description/image/url) 설정
- ✅ Twitter Card 설정
- ✅ JSON-LD 구조화 데이터 (Organization + WebSite + ProfessionalService)
- ✅ Canonical URL 설정
- ✅ `robots.txt` 생성
- ✅ `sitemap.xml` 생성
- ✅ 시맨틱 HTML (header, main, section, article, footer, address)
- ✅ ARIA 접근성 속성

### 기능
- ✅ 상담 신청 폼 → `consultations` 테이블 DB 저장
- ✅ 파일 첨부 (드래그앤드롭, 클릭, 최대 5개, 10MB)
- ✅ 실시간 폼 유효성 검사
- ✅ 상담 완료 후 성공 화면 전환
- ✅ 플로팅 버튼 (전화/상담/TOP)
- ✅ 스크롤 진행에 따른 네비 활성화

---

## 파일 구조
```
index.html          메인 홈페이지
css/
  style.css         메인 스타일시트 (네이버 그린 컬러 시스템)
  responsive.css    반응형 추가 스타일
js/
  main.js           인터랙션·폼 제출 스크립트
robots.txt          검색엔진 크롤링 설정
sitemap.xml         사이트맵
README.md           프로젝트 문서
```

---

## 데이터 모델

### consultations 테이블
| 필드 | 타입 | 설명 |
|------|------|------|
| id | text | 고유 ID |
| name | text | 신청자 이름 |
| company | text | 회사명 |
| phone | text | 연락처 |
| email | text | 이메일 |
| service_type | text | 문의 유형 |
| message | rich_text | 상담 내용 |
| file_names | text | 첨부 파일명 목록 |
| file_count | number | 첨부 파일 수 |
| agreed | bool | 개인정보 동의 여부 |

---

## 컬러 시스템

| 변수 | 색상 | 용도 |
|------|------|------|
| `--primary` | `#03C75A` | 네이버 그린, 주요 포인트 |
| `--primary-dark` | `#02A94B` | 호버 상태 |
| `--primary-light` | `#E8FAF0` | 배경, 태그 |
| `--accent` | `#0068C8` | 보조 블루 |
| `--bg-light` | `#F5F7FA` | 섹션 배경 |
| `--text-dark` | `#1A1A1A` | 제목 텍스트 |

---

## 연락처 (회사 정보)
- **회사명**: (주)프롭파이 PropAI Inc.
- **대표**: 백 헌
- **CTO**: 장현웅
- **전화**: 063-715-2298
- **이메일**: propai@naver.com
- **홈페이지**: propai.kr
- **주소**: 전주시 덕진구 틀못4길 27
- **Instagram**: https://instagram.com/PropAI.Inc

---

## 권장 다음 단계
- [ ] og-image.jpg (1200×630) 실제 이미지 업로드 및 경로 교체
- [ ] 네이버 서치어드바이저 등록
- [ ] 구글 서치콘솔 등록
- [ ] favicon.ico 실제 파일 업로드
- [ ] 포트폴리오 / 작업 사례 섹션 추가
- [ ] FAQ 섹션 추가
