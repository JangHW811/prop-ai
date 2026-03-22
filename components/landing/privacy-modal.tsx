"use client";

import { useAtom } from "jotai";
import {
  CalendarDays,
  CircleX,
  Info,
  Mail,
  Phone,
  Shield,
  UserRound,
} from "lucide-react";
import { useEffect, useRef } from "react";

import { privacyModalOpenAtom } from "@/components/landing/landing-state";

export function PrivacyModal() {
  const [isOpen, setIsOpen] = useAtom(privacyModalOpenAtom);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const triggerButtonRef = useRef<HTMLButtonElement | null>(null);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    if (!isOpen) {
      if (wasOpenRef.current) {
        triggerButtonRef.current?.focus();
        wasOpenRef.current = false;
      }
      return;
    }

    wasOpenRef.current = true;
    closeButtonRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, setIsOpen]);

  return (
    <>
      <button
        className="privacy-btn"
        id="privacyBtn"
        type="button"
        aria-label="개인정보처리방침 보기"
        ref={triggerButtonRef}
        onClick={() => setIsOpen(true)}
      >
        <Shield size={16} />
        <span>개인정보처리방침</span>
      </button>

      <div
        className="privacy-overlay"
        id="privacyOverlay"
        hidden={!isOpen}
        role="dialog"
        aria-modal="true"
        aria-labelledby="privacyModalTitle"
        onClick={() => setIsOpen(false)}
      >
        <div className="privacy-modal" onClick={(event) => event.stopPropagation()}>
          <div className="privacy-modal-header">
            <div className="privacy-modal-title-wrap">
              <Shield size={18} />
              <h2 id="privacyModalTitle">개인정보처리방침</h2>
            </div>
            <button
              className="privacy-modal-close"
              id="privacyClose"
              type="button"
              aria-label="닫기"
              ref={closeButtonRef}
              onClick={() => setIsOpen(false)}
            >
              <CircleX size={18} />
            </button>
          </div>

          <div className="privacy-modal-body">
            <p className="privacy-intro">
              <strong>(주)프롭파이 PropAI Inc.</strong>(이하 &apos;회사&apos;)는 고객님의 개인정보를 중요시하며,
              「정보통신망 이용촉진 및 정보보호에 관한 법률」 및 「개인정보 보호법」을 준수하고 있습니다.
              회사는 본 개인정보처리방침을 통하여 고객님께서 제공하시는 개인정보가 어떠한 용도와 방식으로
              이용되고 있으며, 개인정보보호를 위해 어떠한 조치가 취해지고 있는지 알려드립니다.
            </p>
            <p className="privacy-date">
              <CalendarDays size={14} /> 본 방침은 <strong>2025년 01월 01일</strong>부터 시행됩니다.
            </p>

            <div className="privacy-section">
              <h3><span className="privacy-num">1</span> 수집하는 개인정보 항목</h3>
              <p>회사는 상담 신청 및 서비스 제공을 위해 아래와 같은 개인정보를 수집하고 있습니다.</p>
              <ul>
                <li><strong>수집항목:</strong> 이름, 연락처(전화번호), 이메일 주소, 회사명/서비스명, 상담 내용, 첨부 파일</li>
                <li><strong>개인정보 수집방법:</strong> 홈페이지 상담 신청 폼, 이메일, 전화 상담</li>
              </ul>
            </div>

            <div className="privacy-section">
              <h3><span className="privacy-num">2</span> 개인정보의 수집 및 이용목적</h3>
              <p>회사는 수집한 개인정보를 다음의 목적을 위해 활용합니다.</p>
              <ul>
                <li><strong>서비스 제공 및 계약 이행:</strong> 웹·앱 개발 상담 및 견적 제공, 프로젝트 진행에 따른 커뮤니케이션</li>
                <li><strong>고객 관리:</strong> 본인 확인, 상담 이력 관리, 문의사항 처리, 고지사항 전달</li>
                <li><strong>마케팅 및 서비스 개선:</strong> 서비스 품질 향상, 신규 서비스 안내 (동의한 경우에 한함)</li>
              </ul>
            </div>

            <div className="privacy-section">
              <h3><span className="privacy-num">3</span> 개인정보의 보유 및 이용기간</h3>
              <p>회사는 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 단, 관계 법령에 따라 보존할 필요가 있는 경우 아래와 같이 일정 기간 보존합니다.</p>
              <table className="privacy-table">
                <thead>
                  <tr>
                    <th>보존 항목</th>
                    <th>보존 근거</th>
                    <th>보존 기간</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>계약 또는 청약철회에 관한 기록</td><td>전자상거래법</td><td>5년</td></tr>
                  <tr><td>대금결제 및 재화 공급에 관한 기록</td><td>전자상거래법</td><td>5년</td></tr>
                  <tr><td>소비자 불만 또는 분쟁처리에 관한 기록</td><td>전자상거래법</td><td>3년</td></tr>
                  <tr><td>상담 신청 및 문의 기록</td><td>회사 내부 방침</td><td>1년</td></tr>
                </tbody>
              </table>
            </div>

            <div className="privacy-section">
              <h3><span className="privacy-num">4</span> 개인정보의 파기 절차 및 방법</h3>
              <p>회사는 원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다.</p>
              <ul>
                <li><strong>파기 절차:</strong> 고객님이 제공하신 정보는 목적 달성 후 별도의 DB에 옮겨져 내부 방침 및 기타 관련 법령에 의한 정보보호 사유에 따라 일정 기간 저장된 후 파기됩니다.</li>
                <li><strong>파기 방법:</strong> 전자적 파일 형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제합니다.</li>
              </ul>
            </div>

            <div className="privacy-section">
              <h3><span className="privacy-num">5</span> 개인정보의 제3자 제공</h3>
              <p>회사는 고객님의 개인정보를 원칙적으로 외부에 제공하지 않습니다. 다만, 아래의 경우에는 예외로 합니다.</p>
              <ul>
                <li>고객님이 사전에 동의한 경우</li>
                <li>법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</li>
              </ul>
            </div>

            <div className="privacy-section">
              <h3><span className="privacy-num">6</span> 고객님의 권리와 행사 방법</h3>
              <p>고객님은 언제든지 등록되어 있는 본인의 개인정보를 조회하거나 수정할 수 있으며, 수집·이용·제공에 대한 동의를 철회할 수 있습니다.</p>
              <ul>
                <li>개인정보 조회·수정·삭제 요청은 이메일 또는 전화로 연락 주시면 처리해 드립니다.</li>
                <li>요청은 지체 없이 처리하겠습니다.</li>
              </ul>
            </div>

            <div className="privacy-section">
              <h3><span className="privacy-num">7</span> 개인정보 보호를 위한 기술적·관리적 대책</h3>
              <ul>
                <li><strong>기술적 대책:</strong> 개인정보는 암호화 처리되어 저장 및 관리되며, 해킹 등에 대비한 보안 조치를 취하고 있습니다.</li>
                <li><strong>관리적 대책:</strong> 개인정보를 취급하는 담당자를 최소화하고, 개인정보 취급 직원에 대한 교육을 정기적으로 실시합니다.</li>
              </ul>
            </div>

            <div className="privacy-section">
              <h3><span className="privacy-num">8</span> 쿠키(Cookie) 운영</h3>
              <p>회사는 이용자에게 최적화된 서비스를 제공하기 위해 쿠키를 사용할 수 있습니다. 쿠키는 웹 브라우저의 설정을 통해 거부할 수 있으나, 이 경우 일부 서비스 이용에 제한이 있을 수 있습니다.</p>
            </div>

            <div className="privacy-section">
              <h3><span className="privacy-num">9</span> 개인정보 관련 문의 (개인정보 보호책임자)</h3>
              <div className="privacy-contact-box">
                <div className="privacy-contact-item">
                  <UserRound size={16} />
                  <div>
                    <strong>개인정보 보호책임자</strong>
                    <span>백 헌 (대표이사)</span>
                  </div>
                </div>
                <div className="privacy-contact-item">
                  <Phone size={16} />
                  <div>
                    <strong>전화</strong>
                    <a href="tel:0637152298">063-715-2298</a>
                  </div>
                </div>
                <div className="privacy-contact-item">
                  <Mail size={16} />
                  <div>
                    <strong>이메일</strong>
                    <a href="mailto:propai@naver.com">propai@naver.com</a>
                  </div>
                </div>
              </div>
              <p className="privacy-agency">개인정보침해에 관한 신고나 상담이 필요한 경우 아래 기관에 문의하실 수 있습니다.</p>
              <ul>
                <li>개인정보침해신고센터: <a href="https://privacy.kisa.or.kr" target="_blank" rel="noopener noreferrer">privacy.kisa.or.kr</a> (국번없이 118)</li>
                <li>대검찰청 사이버수사과: <a href="https://www.spo.go.kr" target="_blank" rel="noopener noreferrer">www.spo.go.kr</a> (국번없이 1301)</li>
                <li>경찰청 사이버안전국: <a href="https://cyberbureau.police.go.kr" target="_blank" rel="noopener noreferrer">cyberbureau.police.go.kr</a> (국번없이 182)</li>
              </ul>
            </div>

            <p className="privacy-footer-note">
              <Info size={16} />
              <span>본 개인정보처리방침은 <strong>2025년 01월 01일</strong>부터 적용되며, 법령 및 회사 내부 정책에 따라 변경될 수 있습니다. 변경 시 홈페이지 공지를 통해 안내드립니다.</span>
            </p>
          </div>

          <div className="privacy-modal-footer">
            <button
              className="privacy-close-btn"
              id="privacyCloseBtn"
              type="button"
              onClick={() => setIsOpen(false)}
            >
              <CircleX size={16} /> 닫기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
