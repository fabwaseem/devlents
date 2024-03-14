"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export const AOSInit = () => {
  useEffect(() => {
    AOS.init({
      disable: function () {
        return window.innerWidth < 800;
      },
    });
  }, []);

  useEffect(() => {
    let hero = document.getElementById("scene");

    function parallax(this: any, a: any) {
      this.querySelectorAll(".parallax-effect").forEach((e: any) => {
        var t = e.getAttribute("parallax-value"),
          x = (e.offsetWidth - a.pageX * t) / 90,
          y = (e.offsetWidth - a.pageY * t) / 90;
        e.style.cssText = `transform: translateX(${x}px) translateY(${y}px); transition-duration: 0.1s;`;
      });
    }
    hero?.addEventListener("mousemove", parallax);
  }, []);

  useEffect(() => {
    const c = document.documentElement,
      d = parseInt(getComputedStyle(c).getPropertyValue("--marquee-elements-displayed")),
      e = document.querySelector(".marquee-content");
    if (e) {
      c.style.setProperty("--marquee-elements", String(e.children.length));
      for (let t = 0; t < d; t++) e.appendChild(e.children[t].cloneNode(!0));
    }
  }, []);

  return null;
};
