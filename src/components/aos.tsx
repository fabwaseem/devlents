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

  return null;
};
