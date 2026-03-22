"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const phrases = [
  "대박 날 텐데...",
  "사업이 될 텐데...",
  "세상을 바꿀 텐데...",
  "수백억이 될 텐데...",
];

export function LandingInteractions() {
  useGSAP(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      gsap.set(".reveal", { opacity: 1, y: 0 });
      return;
    }

    gsap.utils.toArray<HTMLElement>(".reveal").forEach((element, index) => {
      gsap.fromTo(
        element,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: (index % 4) * 0.05,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
          },
        },
      );
    });

    gsap.to(".shape-1", {
      yPercent: -18,
      xPercent: 10,
      ease: "none",
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.to(".shape-2", {
      yPercent: 14,
      xPercent: -8,
      ease: "none",
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.to(".shape-3", {
      yPercent: -10,
      ease: "none",
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.fromTo(
      ".big-quote",
      { y: 32, opacity: 0.7 },
      {
        y: -24,
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".quote-banner",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      },
    );
  }, []);

  useEffect(() => {
    const header = document.getElementById("header");
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.querySelector<HTMLElement>(".nav-menu");
    const topBtn = document.getElementById("topBtn");
    const typingEl = document.getElementById("typing-text");
    const sections = Array.from(document.querySelectorAll<HTMLElement>("section[id]"));
    const navLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>(".nav-menu a[href^='#']"));

    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timer: number | undefined;

    const handleScroll = () => {
      if (header) {
        header.classList.toggle("scrolled", window.scrollY > 40);
      }
      if (topBtn) {
        topBtn.hidden = window.scrollY < 400;
      }
    };

    const syncActiveLink = () => {
      const current = sections.find((section) => {
        const top = section.getBoundingClientRect().top;
        return top <= 140 && top > -section.offsetHeight + 140;
      });

      navLinks.forEach((link) => {
        link.classList.toggle("active", current ? link.getAttribute("href") === `#${current.id}` : false);
      });
    };

    const type = () => {
      if (!typingEl) {
        return;
      }

      const current = phrases[phraseIndex];
      if (!deleting) {
        typingEl.textContent = current.slice(0, charIndex + 1);
        charIndex += 1;
        if (charIndex === current.length) {
          deleting = true;
          timer = window.setTimeout(type, 1800);
          return;
        }
        timer = window.setTimeout(type, 70);
        return;
      }

      typingEl.textContent = current.slice(0, charIndex - 1);
      charIndex -= 1;
      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        timer = window.setTimeout(type, 400);
        return;
      }
      timer = window.setTimeout(type, 40);
    };

    const closeMenu = () => {
      if (!navMenu || !hamburger) {
        return;
      }
      navMenu.classList.remove("open");
      hamburger.classList.remove("active");
      hamburger.setAttribute("aria-expanded", "false");
    };

    const toggleMenu = () => {
      if (!navMenu || !hamburger) {
        return;
      }
      const open = navMenu.classList.toggle("open");
      hamburger.classList.toggle("active", open);
      hamburger.setAttribute("aria-expanded", String(open));
    };

    const handleAnchorClick = (event: Event) => {
      const link = event.currentTarget as HTMLAnchorElement;
      const href = link.getAttribute("href");
      if (!href?.startsWith("#")) {
        return;
      }
      const target = document.querySelector<HTMLElement>(href);
      if (!target) {
        return;
      }
      event.preventDefault();
      const offset = 72;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
      closeMenu();
    };

    hamburger?.addEventListener("click", toggleMenu);
    navLinks.forEach((link) => link.addEventListener("click", handleAnchorClick));
    document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((link) => {
      if (!navLinks.includes(link)) {
        link.addEventListener("click", handleAnchorClick);
      }
    });

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("scroll", syncActiveLink);

    handleScroll();
    syncActiveLink();
    if (typingEl) {
      timer = window.setTimeout(type, 800);
    }

    return () => {
      hamburger?.removeEventListener("click", toggleMenu);
      navLinks.forEach((link) => link.removeEventListener("click", handleAnchorClick));
      document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((link) => {
        if (!navLinks.includes(link)) {
          link.removeEventListener("click", handleAnchorClick);
        }
      });
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", syncActiveLink);
      if (timer) {
        window.clearTimeout(timer);
      }
    };
  }, []);

  return null;
}
