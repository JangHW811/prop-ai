/* =====================================================
   PropAI main.js
   - Header scroll effect
   - Hamburger menu
   - Scroll reveal
   - Typing effect
   - File upload
   - Form validation & submit
   - Floating top button
   ===================================================== */

(function () {
  'use strict';

  /* ─── Header Scroll ─── */
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  /* ─── Hamburger Menu ─── */
  const hamburger = document.getElementById('hamburger');
  const navMenu   = document.querySelector('.nav-menu');
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      hamburger.classList.toggle('active', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
    });
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ─── Scroll Reveal ─── */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || (i % 4) * 80;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ─── Typing Effect ─── */
  const typingEl = document.getElementById('typing-text');
  if (typingEl) {
    const phrases = [
      '대박 날 텐데...',
      '사업이 될 텐데...',
      '세상을 바꿀 텐데...',
      '수백억이 될 텐데...'
    ];
    let pi = 0, ci = 0, deleting = false;

    function type() {
      const current = phrases[pi];
      if (!deleting) {
        typingEl.textContent = current.slice(0, ci + 1);
        ci++;
        if (ci === current.length) {
          deleting = true;
          setTimeout(type, 2000);
          return;
        }
        setTimeout(type, 70);
      } else {
        typingEl.textContent = current.slice(0, ci - 1);
        ci--;
        if (ci === 0) {
          deleting = false;
          pi = (pi + 1) % phrases.length;
          setTimeout(type, 400);
          return;
        }
        setTimeout(type, 40);
      }
    }
    setTimeout(type, 800);
  }

  /* ─── Floating Top Button ─── */
  const topBtn = document.getElementById('topBtn');
  if (topBtn) {
    window.addEventListener('scroll', () => {
      topBtn.hidden = window.scrollY < 400;
    });
    topBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ─── Smooth anchor scroll (offset for fixed header) ─── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 72;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ─── File Upload ─── */
  const dropZone  = document.getElementById('fileDropZone');
  const fileInput = document.getElementById('f-files');
  const fileList  = document.getElementById('file-list');
  let attachedFiles = [];

  function formatBytes(bytes) {
    if (bytes < 1024) return bytes + 'B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + 'KB';
    return (bytes / (1024 * 1024)).toFixed(1) + 'MB';
  }

  function getFileIcon(name) {
    const ext = name.split('.').pop().toLowerCase();
    const map = {
      pdf: 'fa-file-pdf',
      doc: 'fa-file-word', docx: 'fa-file-word',
      ppt: 'fa-file-powerpoint', pptx: 'fa-file-powerpoint',
      xls: 'fa-file-excel', xlsx: 'fa-file-excel',
      hwp: 'fa-file-alt',
      jpg: 'fa-file-image', jpeg: 'fa-file-image', png: 'fa-file-image', gif: 'fa-file-image',
      zip: 'fa-file-archive',
      txt: 'fa-file-alt'
    };
    return 'fas ' + (map[ext] || 'fa-file');
  }

  function renderFiles() {
    fileList.innerHTML = '';
    attachedFiles.forEach((f, idx) => {
      const item = document.createElement('div');
      item.className = 'file-item';
      item.innerHTML = `
        <i class="${getFileIcon(f.name)} file-item-icon" aria-hidden="true"></i>
        <span class="file-item-name" title="${f.name}">${f.name}</span>
        <span class="file-item-size">${formatBytes(f.size)}</span>
        <button class="file-item-del" data-idx="${idx}" aria-label="${f.name} 삭제"><i class="fas fa-times" aria-hidden="true"></i></button>
      `;
      fileList.appendChild(item);
    });
    fileList.querySelectorAll('.file-item-del').forEach(btn => {
      btn.addEventListener('click', () => {
        attachedFiles.splice(Number(btn.dataset.idx), 1);
        renderFiles();
      });
    });
  }

  function addFiles(newFiles) {
    const allowed = ['pdf','doc','docx','ppt','pptx','xls','xlsx','hwp','jpg','jpeg','png','gif','zip','txt'];
    let errors = [];
    Array.from(newFiles).forEach(f => {
      const ext = f.name.split('.').pop().toLowerCase();
      if (!allowed.includes(ext)) { errors.push(`${f.name}: 지원하지 않는 형식`); return; }
      if (f.size > 10 * 1024 * 1024) { errors.push(`${f.name}: 10MB 초과`); return; }
      if (attachedFiles.length >= 5) { errors.push('최대 5개까지만 첨부 가능합니다'); return; }
      if (!attachedFiles.find(a => a.name === f.name && a.size === f.size)) {
        attachedFiles.push(f);
      }
    });
    if (errors.length) alert(errors.join('\n'));
    renderFiles();
  }

  if (dropZone && fileInput) {
    fileInput.addEventListener('change', () => { addFiles(fileInput.files); fileInput.value = ''; });
    dropZone.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') fileInput.click(); });
    dropZone.addEventListener('dragover', e => { e.preventDefault(); dropZone.classList.add('dragover'); });
    dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));
    dropZone.addEventListener('drop', e => {
      e.preventDefault();
      dropZone.classList.remove('dragover');
      addFiles(e.dataTransfer.files);
    });
  }

  /* ─── Form Validation & Submit ─── */
  const form       = document.getElementById('consultForm');
  const formWrap   = document.querySelector('.contact-form-wrap');
  const successBox = document.getElementById('formSuccess');
  const submitBtn  = document.getElementById('submitBtn');

  function setError(inputId, errId, msg) {
    const el = document.getElementById(inputId);
    const err = document.getElementById(errId);
    if (el) el.classList.toggle('error', !!msg);
    if (err) err.textContent = msg || '';
  }

  function validateForm() {
    let valid = true;

    const name = document.getElementById('f-name').value.trim();
    if (!name) { setError('f-name', 'err-name', '이름을 입력해 주세요.'); valid = false; }
    else        { setError('f-name', 'err-name', ''); }

    const phone = document.getElementById('f-phone').value.trim();
    if (!phone) { setError('f-phone', 'err-phone', '연락처를 입력해 주세요.'); valid = false; }
    else if (!/^[0-9\-+\s()]+$/.test(phone)) { setError('f-phone', 'err-phone', '올바른 연락처 형식으로 입력해 주세요.'); valid = false; }
    else { setError('f-phone', 'err-phone', ''); }

    const msg = document.getElementById('f-message').value.trim();
    if (!msg) { setError('f-message', 'err-message', '상담 내용을 입력해 주세요.'); valid = false; }
    else       { setError('f-message', 'err-message', ''); }

    const agree = document.getElementById('f-agree').checked;
    const errAgree = document.getElementById('err-agree');
    if (!agree) { if (errAgree) errAgree.textContent = '개인정보 수집·이용에 동의해 주세요.'; valid = false; }
    else        { if (errAgree) errAgree.textContent = ''; }

    return valid;
  }

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!validateForm()) return;

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 전송 중...';

      const fileNames = attachedFiles.map(f => f.name).join(', ');

      const payload = {
        name:         document.getElementById('f-name').value.trim(),
        company:      document.getElementById('f-company').value.trim(),
        phone:        document.getElementById('f-phone').value.trim(),
        email:        document.getElementById('f-email').value.trim(),
        service_type: document.getElementById('f-service').value,
        message:      document.getElementById('f-message').value.trim(),
        file_names:   fileNames,
        file_count:   attachedFiles.length,
        agreed:       true
      };

      try {
        const res = await fetch('tables/consultations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error('서버 오류');
        // 성공
        form.hidden = true;
        const header = formWrap.querySelector('.form-header');
        if (header) header.hidden = true;
        successBox.hidden = false;
      } catch (err) {
        console.error(err);
        alert('전송 중 오류가 발생했습니다. 잠시 후 다시 시도하거나 전화 문의 바랍니다.\n☎ 063-715-2298');
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> 상담 신청하기';
      }
    });
  }

  /* ─── Active nav highlight on scroll ─── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.style.fontWeight = link.getAttribute('href') === '#' + entry.target.id ? '700' : '';
          link.style.color = link.getAttribute('href') === '#' + entry.target.id ? 'var(--primary)' : '';
        });
      }
    });
  }, { threshold: 0.4 });
  sections.forEach(sec => sectionObserver.observe(sec));

  /* ─── 개인정보처리방침 모달 ─── */
  const privacyBtn     = document.getElementById('privacyBtn');
  const privacyOverlay = document.getElementById('privacyOverlay');
  const privacyClose   = document.getElementById('privacyClose');
  const privacyCloseBtn= document.getElementById('privacyCloseBtn');

  function openPrivacy() {
    privacyOverlay.hidden = false;
    document.body.style.overflow = 'hidden';
    privacyClose.focus();
  }
  function closePrivacy() {
    privacyOverlay.hidden = true;
    document.body.style.overflow = '';
    if (privacyBtn) privacyBtn.focus();
  }

  if (privacyBtn)      privacyBtn.addEventListener('click', openPrivacy);
  if (privacyClose)    privacyClose.addEventListener('click', closePrivacy);
  if (privacyCloseBtn) privacyCloseBtn.addEventListener('click', closePrivacy);
  if (privacyOverlay) {
    privacyOverlay.addEventListener('click', (e) => {
      if (e.target === privacyOverlay) closePrivacy();
    });
  }
  // ESC 키로 닫기
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && privacyOverlay && !privacyOverlay.hidden) closePrivacy();
  });

})();
