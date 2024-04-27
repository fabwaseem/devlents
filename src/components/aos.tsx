"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export const AOSInit = () => {
  useEffect(() => {
    AOS.init({
      // disable: function () {
      //   return window.innerWidth < 768;
      // },
    });
  }, []);

  useEffect(() => {
    const hero = document.getElementById("scene");

    function parallax(this: HTMLElement, a: MouseEvent) {
      const childrens = this.querySelectorAll(".parallax-effect");
      childrens.forEach((e: HTMLElement) => {
        const t = parseInt(e.getAttribute("parallax-value") ?? "0");
        if (t) {
          const x = (e.offsetWidth - a.pageX * t) / 90;
          const y = (e.offsetWidth - a.pageY * t) / 90;
          e.style.cssText = `transform: translateX(${x}px) translateY(${y}px); transition-duration: 0.1s;`;
        }
      });
    }
    if (window.innerWidth > 768) {
      hero?.addEventListener("mousemove", parallax);
    }

    // return hero?.removeEventListener("mousemove", parallax);
  }, []);

  useEffect(() => {
    const c = document.documentElement,
      d = parseInt(
        getComputedStyle(c).getPropertyValue("--marquee-elements-displayed"),
      ),
      e = document.querySelector(".marquee-content");
    if (e) {
      c.style.setProperty("--marquee-elements", String(e.children.length));
      for (let t = 0; t < d; t++) {
        const children = e.children[t];
        if (children) {
          e.appendChild(children.cloneNode(!0));
        }
      }
    }
  }, []);

  return null;
};
