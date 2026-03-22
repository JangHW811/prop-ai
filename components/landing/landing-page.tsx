import {
  Award,
  Bot,
  Briefcase,
  Cloud,
  Code2,
  Coffee,
  ContactRound,
  Database,
  Globe,
  GraduationCap,
  Handshake,
  Home,
  Instagram,
  LaptopMinimal,
  Lightbulb,
  Lock,
  MapPin,
  Menu,
  MessageCircle,
  MessageSquareText,
  Phone,
  Plane,
  Rocket,
  Server,
  Shield,
  Smartphone,
  SquareStack,
  UserRound,
  UserRoundCog,
  Users,
  Wifi,
  Wrench,
  Laptop,
} from "lucide-react";

import { PrivacyModal } from "@/components/landing/privacy-modal";
import { LandingInteractions } from "@/components/landing/landing-interactions";
import { ContactForm } from "@/components/landing/contact-form";

type SectionHeaderProps = {
  eyebrow: string;
  title: React.ReactNode;
  description: React.ReactNode;
  id: string;
};

const techTags = [
  "Java",
  "TypeScript",
  "React",
  "React Native",
  "Next.js",
  "Spring",
  "Node.js",
  "Python",
  "Flutter",
  "GraphQL",
  "GCP / AWS",
  "PostgreSQL",
];

const projectCards = [
  {
    icon: Smartphone,
    title: "국내 대형 모빌리티 플랫폼",
    names: ["기아 FLEX 앱", "minda 홈페이지", "짐가니 프로젝트"],
    description:
      "국내 주요 자동차 브랜드의 전용 앱 서비스 설계·구축. React Native, Java, JPA 풀스택 개발 및 네이버맵 연동, 관리자 웹 프론트엔드 구현.",
    tags: ["React Native", "Java / JPA", "PostgreSQL"],
  },
  {
    icon: Briefcase,
    title: "글로벌 물류 기업 HR 시스템",
    names: ["DHL ePass 리뉴얼", "DHL my-HR 모바일"],
    description:
      "글로벌 물류 기업의 모바일 HR 시스템 리뉴얼. 웹·하이브리드 앱 프론트엔드 설계 및 구축, API 개발 수행.",
    tags: ["React", "Next.js", "TypeScript"],
  },
  {
    icon: SquareStack,
    title: "국내 주요 금융·카드사 앱",
    names: [
      "현대카드 페이퍼리스 2.0",
      "신한캐피탈 다이렉트 오토",
      "오케이저축은행 간편투자앱",
    ],
    description:
      "다수의 국내 금융사·캐피탈·저축은행 모바일 앱 및 웹 서비스 개발. 하이브리드 앱 공통 프론트엔드 설계, 결제 API 연동 수행.",
    tags: ["Java", "jQuery", "React"],
  },
  {
    icon: Wifi,
    title: "대형 통신사 마이데이터 시스템",
    names: ["LG유플러스 마이데이터", "하이큐썸 플랫폼"],
    description:
      "국내 주요 통신사의 마이데이터 시스템 구축. React 기반 하이브리드 앱 프론트엔드 설계·구축 및 공통 개발 수행.",
    tags: ["React", "TypeScript", "react-query"],
  },
  {
    icon: Home,
    title: "국내 대형 부동산 플랫폼",
    names: ["직방 앱 고도화", "다음부동산 앱 연동", "세스코 운영팀 시스템"],
    description:
      "국내 주요 부동산 앱 서비스 고도화. React Native, Google Map 연동, 시스템 운영 PL 역할 수행.",
    tags: ["React Native", "Google Maps", "MS-SQL"],
  },
  {
    icon: GraduationCap,
    title: "국내 주요 취업·교육 플랫폼",
    names: ["알바몬 홈페이지 리뉴얼", "미래엔 전자교과서", "라이크노벨 플랫폼"],
    description:
      "국내 대형 취업 포털 홈페이지 리뉴얼 및 전자교과서 개발. 웹·모바일 프론트엔드 설계구축, 공통 컴포넌트 개발 수행.",
    tags: ["React", "Next.js", "TypeScript"],
  },
];

const skillCards = [
  {
    icon: Smartphone,
    title: "모바일 앱 개발",
    description:
      "iOS·Android 네이티브 및 React Native·Flutter 크로스플랫폼 앱 개발",
  },
  {
    icon: LaptopMinimal,
    title: "웹 프론트엔드",
    description:
      "React, Next.js, TypeScript 기반의 현대적이고 최적화된 웹 서비스 구축",
  },
  {
    icon: Server,
    title: "백엔드 & API",
    description:
      "Java Spring, Node.js, Python 기반의 안정적인 서버 및 API 설계·구현",
  },
  {
    icon: Cloud,
    title: "클라우드 & 인프라",
    description:
      "GCP, AWS 기반의 클라우드 인프라 운영 및 서버리스 함수 개발",
  },
];

const whyCards = [
  {
    number: "01",
    icon: Shield,
    title: (
      <>
        NDA 기반 비밀보장으로
        <br />
        안전한 아이디어 상담
      </>
    ),
    description:
      "상담 초기 단계부터 비밀유지계약(NDA)을 체결하여 고객님의 소중한 사업 자산을 가장 안전하게 보호합니다. \"내 아이디어를 뺏기면 어떡하지?\" 하는 걱정, 완전히 내려놓으셔도 좋습니다.",
  },
  {
    number: "02",
    icon: Award,
    title: (
      <>
        웹·앱 개발 전문성과
        <br />
        압도적 역량
      </>
    ),
    description:
      "최고 수준의 개발 역량을 갖춘 전문가들이 투입됩니다. 단순한 코딩을 넘어, 시장에서 통하는 UI/UX와 안정적인 시스템 구축까지. 아이디어가 실제 비즈니스로 작동하도록 빈틈없이 개발합니다.",
  },
  {
    number: "03",
    icon: Handshake,
    title: (
      <>
        기획부터 런칭까지
        <br />
        함께하는 든든한 파트너
      </>
    ),
    description:
      "우리는 단순한 외주 제작사가 아닙니다. 대표님의 비즈니스가 성공해야 프롭파이도 성공한다는 믿음으로, 기획부터 런칭 이후까지 함께 고민하는 진정한 IT 파트너가 되어 드립니다.",
  },
  {
    number: "04",
    icon: MessageCircle,
    title: (
      <>
        완벽한 기획서가
        <br />
        없어도 괜찮습니다
      </>
    ),
    description:
      "단순한 스케치 한 장, 머릿속 생각의 조각만 가지고 오셔도 충분합니다. 전문가들이 편안한 대화를 통해 아이디어를 구체적인 비즈니스 모델과 IT 솔루션으로 다듬어 드립니다.",
  },
];

const services = [
  {
    icon: Smartphone,
    title: "앱 개발",
    tone: "green",
    description:
      "iOS·Android 네이티브 및 크로스플랫폼 앱 개발. 아이디어를 실제 사용자 경험으로 연결합니다.",
    items: ["React Native / Flutter", "iOS / Android 네이티브", "앱스토어 배포 지원"],
  },
  {
    icon: Globe,
    title: "웹 개발",
    tone: "blue",
    description:
      "브랜드 홈페이지, 플랫폼, 관리자 시스템 등 목적에 맞는 웹 서비스를 설계하고 구축합니다.",
    items: ["React / Next.js", "반응형 웹 디자인", "SEO 최적화 포함"],
  },
  {
    icon: UserRoundCog,
    title: "UI/UX 기획 & 디자인",
    tone: "orange",
    description:
      "사용자가 쉽게 이해하고 자연스럽게 이용할 수 있도록 구조와 화면을 설계합니다.",
    items: ["사용자 경험 설계", "화면 설계 (Wireframe)", "프로토타입 제작"],
  },
  {
    icon: Database,
    title: "백엔드 & 시스템",
    tone: "purple",
    description:
      "안정적인 데이터 처리와 서비스 운영을 위한 서버 및 API 시스템 환경을 구현합니다.",
    items: ["Java Spring / Node.js", "REST API 설계", "DB 설계 및 최적화"],
  },
  {
    icon: Bot,
    title: "AI 기능 연동",
    tone: "teal",
    description:
      "챗봇, 추천 알고리즘, 자연어 처리 등 AI 기능을 서비스에 자연스럽게 통합합니다.",
    items: ["AI API 연동", "챗봇 / 자동화", "데이터 분석 연동"],
  },
  {
    icon: Wrench,
    title: "유지보수 & 운영",
    tone: "red",
    description:
      "런칭 이후에도 서비스가 안정적으로 운영될 수 있도록 지속적으로 지원합니다.",
    items: ["버그 수정 & 업데이트", "성능 모니터링", "기능 고도화"],
  },
];

const processSteps = [
  {
    number: "01",
    title: "상담 및 아이디어 검토",
    description:
      "고객의 아이디어와 목표를 이해하고, 개발 방향을 함께 정리합니다. 복잡한 기획서 없이 편안한 대화로 시작합니다.",
    tag: "무료 상담",
    icon: Coffee,
  },
  {
    number: "02",
    title: "NDA 체결 및 범위 정의",
    description:
      "비밀유지계약(NDA)을 체결하여 아이디어를 안전하게 보호하고, 핵심 기능과 개발 범위를 구체화합니다.",
    tag: "비밀보장",
    icon: Lock,
  },
  {
    number: "03",
    title: "기획 및 UI/UX 설계",
    description:
      "아이디어를 실제 서비스 구조와 화면 흐름으로 구체화합니다. 사용자 경험 중심의 기획 및 디자인을 완성합니다.",
    tag: "기획·디자인",
    icon: UserRoundCog,
  },
  {
    number: "04",
    title: "개발 및 테스트",
    description:
      "안정적인 웹·앱 서비스를 목표로 기능 구현과 품질 검증을 진행합니다. 중간 결과물을 공유하며 투명하게 진행합니다.",
    tag: "개발·QA",
    icon: Code2,
  },
  {
    number: "05",
    title: "런칭 및 운영 지원",
    description:
      "서비스 오픈 이후에도 필요한 개선과 운영 방향을 함께 고민합니다. 단순 납품이 아닌 장기적 파트너십을 지향합니다.",
    tag: "런칭·운영",
    icon: Rocket,
  },
];

function SectionHeader({ eyebrow, title, description, id }: SectionHeaderProps) {
  return (
    <div className="section-header reveal">
      <p className="section-eyebrow">{eyebrow}</p>
      <h2 id={id}>{title}</h2>
      <p className="section-desc">{description}</p>
    </div>
  );
}

export function LandingPage() {
  return (
    <>
      <LandingInteractions />
      <header id="header" role="banner">
        <nav className="nav-wrap" aria-label="메인 내비게이션">
          <a href="#hero" className="logo" aria-label="프롭파이 홈으로">
            <span className="logo-icon">P</span>
            <span className="logo-text">
              PropAI<span className="logo-sub"> 프롭파이</span>
            </span>
          </a>
          <ul className="nav-menu" role="list">
            <li><a href="#about">회사소개</a></li>
            <li><a href="#tech">기술력</a></li>
            <li><a href="#why">차별점</a></li>
            <li><a href="#services">서비스</a></li>
            <li><a href="#process">진행방식</a></li>
            <li><a href="#contact" className="nav-cta">무료 상담</a></li>
          </ul>
          <button className="hamburger" type="button" id="hamburger" aria-label="메뉴 열기" aria-expanded="false">
            <Menu size={20} />
          </button>
        </nav>
      </header>

      <main>
        <section id="hero" aria-labelledby="hero-title">
          <div className="hero-bg-shapes" aria-hidden="true">
            <div className="shape shape-1" />
            <div className="shape shape-2" />
            <div className="shape shape-3" />
          </div>
          <div className="container hero-inner">
            <p className="hero-eyebrow">웹·앱 개발 전문회사</p>
            <h1 id="hero-title">
              <span className="typing-wrap">
                &quot;이거 앱으로 만들면
                <br />
                <em id="typing-text">대박 날 텐데...</em>&quot;
              </span>
            </h1>
            <p className="hero-desc">
              머릿속에만 묻어둔 수백억짜리 아이디어가 있으신가요?
              <br />
              <strong>프롭파이</strong>가 당신의 상상을 완벽한 현실로 <strong>구현</strong>해 드립니다.
            </p>
            <div className="hero-cta-wrap">
              <a href="#contact" className="btn-primary">
                <MessageSquareText size={18} /> 무료 상담 신청
              </a>
              <a href="tel:0637152298" className="btn-secondary">
                <Phone size={18} /> 063-715-2298
              </a>
            </div>
            <div className="hero-stats" aria-label="핵심 수치">
              <div className="stat-item">
                <strong>15<span>년+</span></strong>
                <span>CTO 개발 경력</span>
              </div>
              <div className="stat-divider" aria-hidden="true" />
              <div className="stat-item">
                <strong>NDA</strong>
                <span>비밀보장 계약</span>
              </div>
              <div className="stat-divider" aria-hidden="true" />
              <div className="stat-item">
                <strong>0원</strong>
                <span>초기 상담 비용</span>
              </div>
            </div>
          </div>
          <div className="hero-scroll-hint" aria-hidden="true">
            <span />
          </div>
        </section>

        <section id="about" className="section" aria-labelledby="about-title">
          <div className="container">
            <SectionHeader
              id="about-title"
              eyebrow="About PropAI"
              title={<>아이디어만 있어도<br />시작할 수 있는 개발 파트너</>}
              description={<>개발 지식이 없어도, 기획서가 없어도 괜찮습니다.<br />프롭파이가 대화를 통해 비즈니스 모델을 구체화해 드립니다.</>}
            />
            <div className="about-content">
              <div className="about-text reveal">
                <blockquote>
                  <p>&quot;이거 앱으로 만들면 대박 날 텐데…&quot;</p>
                </blockquote>
                <p>누구나 한 번쯤 일상을 바꾸고 큰 수익을 낼 수 있는 혁신적인 아이디어를 떠올립니다. 하지만 대부분은 <strong>&apos;개발을 몰라서&apos;</strong>, <strong>&apos;어떻게 시작해야 할지 막막해서&apos;</strong> 그 소중한 아이디어를 머릿속에만 저장해 둡니다.</p>
                <p>그것은 수십억, 수백억의 매출을 만들어낼 수 있는 <strong>잠재적 보물</strong>입니다. 이제, 그 보물을 세상 밖으로 꺼낼 시간입니다.</p>
                <div className="about-profile">
                  <div className="profile-item">
                    <UserRound size={20} />
                    <div>
                      <strong>백 헌</strong>
                      <span>대표이사 CEO</span>
                    </div>
                  </div>
                  <div className="profile-item">
                    <Laptop size={20} />
                    <div>
                      <strong>장현웅</strong>
                      <span>기술이사 CTO</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="about-steps reveal">
                <div className="step-card">
                  <div className="step-icon"><Lightbulb size={24} /></div>
                  <h3>아이디어</h3>
                  <p>스케치 한 장, 메모 몇 줄, 머릿속 생각의 조각</p>
                </div>
                <div className="step-arrow" aria-hidden="true">→</div>
                <div className="step-card">
                  <div className="step-icon"><Code2 size={24} /></div>
                  <h3>개발</h3>
                  <p>전문가 팀이 비즈니스 모델부터 IT 솔루션으로 구체화</p>
                </div>
                <div className="step-arrow" aria-hidden="true">→</div>
                <div className="step-card">
                  <div className="step-icon"><Rocket size={24} /></div>
                  <h3>런칭</h3>
                  <p>실제 시장에 통하는 완성된 서비스로 세상에 출시</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="tech" className="section section-gray" aria-labelledby="tech-title">
          <div className="container">
            <SectionHeader
              id="tech-title"
              eyebrow="Tech Leadership"
              title={<>15년+ 검증된 기술 역량으로<br />당신의 아이디어를 현실로</>}
              description={<>프롭파이 CTO는 국내외 대형 프로젝트에서 검증된<br />풀스택 개발 역량을 보유하고 있습니다.</>}
            />
            <div className="cto-card reveal">
              <div className="cto-avatar" aria-hidden="true">
                <span>CTO</span>
              </div>
              <div className="cto-info">
                <h3>장현웅 <span>CTO · 기술이사</span></h3>
                <p className="cto-summary">모바일·웹·백엔드를 아우르는 15년+ 풀스택 기술 리더십 보유. 공공, 금융, 모빌리티, 통신, 부동산, 교육 분야의 대형 프로젝트 다수 수행.</p>
                <div className="tech-tags" aria-label="보유 기술 스택">
                  {techTags.map((tag) => (
                    <span className="tag" key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="project-grid">
              {projectCards.map(({ icon: Icon, title, names, description, tags }) => (
                <article className="project-card reveal" key={title}>
                  <div className="project-icon"><Icon size={22} /></div>
                  <h3>{title}</h3>
                  <div className="project-names">
                    {names.map((name) => (
                      <span className="pname" key={name}>{name}</span>
                    ))}
                  </div>
                  <p>{description}</p>
                  <div className="project-tags">
                    {tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
            <div className="skill-cards reveal">
              {skillCards.map(({ icon: Icon, title, description }) => (
                <article className="skill-card" key={title}>
                  <div className="skill-icon"><Icon size={22} /></div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="why" className="section" aria-labelledby="why-title">
          <div className="container">
            <SectionHeader
              id="why-title"
              eyebrow="Why PropAI"
              title={<>왜 프롭파이(PropAI)와<br />함께해야 할까요?</>}
              description="프롭파이가 선택받는 4가지 핵심 이유"
            />
            <div className="why-grid">
              {whyCards.map(({ number, icon: Icon, title, description }) => (
                <article className="why-card reveal" key={number}>
                  <div className="why-number">{number}</div>
                  <div className="why-icon"><Icon size={22} /></div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="section section-gray" aria-labelledby="services-title">
          <div className="container">
            <SectionHeader
              id="services-title"
              eyebrow="Our Services"
              title={<>프롭파이의<br />웹·앱 개발 서비스</>}
              description="아이디어 실현에 필요한 모든 기술을 한 곳에서"
            />
            <div className="services-grid">
              {services.map(({ icon: Icon, title, tone, description, items }) => (
                <article className="service-card reveal" key={title}>
                  <div className={`service-icon ${tone}`}><Icon size={22} /></div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <ul>
                    {items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="process" className="section" aria-labelledby="process-title">
          <div className="container">
            <SectionHeader
              id="process-title"
              eyebrow="Our Process"
              title={<>아이디어가 서비스가 되는<br />개발 프로세스</>}
              description="상담부터 런칭까지, 5단계로 완성됩니다"
            />
            <div className="process-list">
              {processSteps.map(({ number, title, description, tag, icon: Icon }, index) => (
                <article className="process-item reveal" key={number}>
                  <div className="process-step">
                    <div className="process-badge">{number}</div>
                    {index < processSteps.length - 1 ? <div className="process-line" aria-hidden="true" /> : null}
                  </div>
                  <div className="process-content">
                    <h3>{title}</h3>
                    <p>{description}</p>
                    <span className="process-tag"><Icon size={16} /> {tag}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="quote-banner" aria-label="핵심 메시지">
          <div className="container">
            <blockquote className="big-quote reveal">
              <p>망설이는 지금 이 순간에도<br />누군가는 비슷한 아이디어를 실행하고 있을지 모릅니다.</p>
              <cite>당신의 상상이 현실이 되는 곳, 프롭파이(Propai)</cite>
            </blockquote>
            <div className="reveal">
              <a href="#contact" className="btn-primary btn-lg">
                <Plane size={18} /> 지금 바로 무료 상담 신청
              </a>
            </div>
          </div>
        </section>

        <section id="contact" className="section" aria-labelledby="contact-title">
          <div className="container">
            <SectionHeader
              id="contact-title"
              eyebrow="Contact Us"
              title={<>웹·앱 개발 상담이<br />필요하신가요?</>}
              description={<>지금 머릿속에 있는 아이디어를 편하게 들려주세요.<br />따뜻한 커피 한잔과 함께, 대표님의 빛나는 아이디어를 듣고 싶습니다.</>}
            />
            <div className="contact-wrap">
              <ContactForm />

              <aside className="contact-info reveal" aria-label="연락처 및 팀 소개">
                <div className="contact-card">
                  <h3><ContactRound size={18} /> 연락처</h3>
                  <address>
                    <ul className="contact-list">
                      <li>
                        <Phone size={16} />
                        <div>
                          <strong>전화 상담</strong>
                          <a href="tel:0637152298">063-715-2298</a>
                        </div>
                      </li>
                      <li>
                        <MessageCircle size={16} />
                        <div>
                          <strong>이메일</strong>
                          <a href="mailto:propai@naver.com">propai@naver.com</a>
                        </div>
                      </li>
                      <li>
                        <Globe size={16} />
                        <div>
                          <strong>홈페이지</strong>
                          <a href="https://propai.kr" target="_blank" rel="noopener noreferrer">propai.kr</a>
                        </div>
                      </li>
                      <li>
                        <MapPin size={16} />
                        <div>
                          <strong>방문 상담</strong>
                          <span>전주시 덕진구 틀못4길 27</span>
                        </div>
                      </li>
                      <li>
                        <Instagram size={16} />
                        <div>
                          <strong>인스타그램</strong>
                          <a href="https://instagram.com/PropAI.Inc" target="_blank" rel="noopener noreferrer">@PropAI.Inc</a>
                        </div>
                      </li>
                    </ul>
                  </address>
                </div>

                <div className="team-card">
                  <h3><Users size={18} /> 팀 소개</h3>
                  <div className="team-member">
                    <div className="member-avatar ceo" aria-hidden="true">CEO</div>
                    <div>
                      <strong>백 헌</strong>
                      <span>대표이사</span>
                      <p>비즈니스 기획 및 고객 전략 총괄</p>
                    </div>
                  </div>
                  <div className="team-member">
                    <div className="member-avatar cto" aria-hidden="true">CTO</div>
                    <div>
                      <strong>장현웅</strong>
                      <span>기술이사</span>
                      <p>15년+ 풀스택 개발 기술 총괄</p>
                    </div>
                  </div>
                </div>

                <div className="nda-badge">
                  <Shield size={24} />
                  <div>
                    <strong>NDA 비밀보장 계약</strong>
                    <span>상담 즉시 비밀유지계약 체결</span>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>

      <footer id="footer" role="contentinfo">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <a href="#hero" className="logo footer-logo" aria-label="프롭파이 홈으로">
                <span className="logo-icon">P</span>
                <span className="logo-text">
                  PropAI<span className="logo-sub"> 프롭파이</span>
                </span>
              </a>
              <p>당신의 상상이 현실이 되는 곳,<br />웹·앱 개발 전문 파트너 프롭파이.</p>
              <div className="social-links" aria-label="소셜 미디어">
                <a href="https://instagram.com/PropAI.Inc" target="_blank" rel="noopener noreferrer" aria-label="인스타그램">
                  <Instagram size={16} />
                </a>
              </div>
            </div>
            <nav className="footer-nav" aria-label="푸터 내비게이션">
              <h3>바로가기</h3>
              <ul>
                <li><a href="#about">회사소개</a></li>
                <li><a href="#tech">기술력</a></li>
                <li><a href="#why">차별점</a></li>
                <li><a href="#services">서비스</a></li>
                <li><a href="#process">진행방식</a></li>
                <li><a href="#contact">무료 상담</a></li>
              </ul>
            </nav>
            <div className="footer-contact">
              <h3>연락처</h3>
              <address>
                <p><Phone size={16} /> <a href="tel:0637152298">063-715-2298</a></p>
                <p><MessageCircle size={16} /> <a href="mailto:propai@naver.com">propai@naver.com</a></p>
                <p><Globe size={16} /> <a href="https://propai.kr" target="_blank" rel="noopener noreferrer">propai.kr</a></p>
                <p><MapPin size={16} /> 전주시 덕진구 틀못4길 27</p>
              </address>
            </div>
            <div className="footer-company">
              <h3>회사 정보</h3>
              <p>(주)프롭파이 PropAI Inc.</p>
              <p>대표이사: 백 헌</p>
              <p>CTO: 장현웅</p>
              <p>사업자등록번호: 559-88-03846</p>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-bottom-links">
              <PrivacyModal />
            </div>
            <div className="footer-bottom-copy">
              <p>&copy; 2025 (주)프롭파이 PropAI Inc. All Rights Reserved.</p>
              <p>웹·앱 개발 전문회사 | 사업자등록번호: 559-88-03846 | 전주시 덕진구 틀못4길 27</p>
            </div>
          </div>
        </div>
      </footer>

      <div className="floating-btns" aria-hidden="true">
        <a className="float-btn float-call" href="tel:0637152298" aria-label="전화 상담">
          <Phone size={18} />
        </a>
        <a className="float-btn float-consult" href="#contact" aria-label="무료 상담">
          <MessageSquareText size={18} />
        </a>
        <a className="float-btn float-top" id="topBtn" href="#hero" aria-label="맨 위로" hidden>
          <Rocket size={18} />
        </a>
      </div>
    </>
  );
}
