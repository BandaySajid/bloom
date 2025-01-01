import "./index.css";
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let sections = gsap.utils.toArray("section");

sections.forEach((section, index) => {
  let image = section.querySelector('img');
  let h2 = section.querySelector('h2');
  let p = section.querySelector('p');
  let button = section.querySelector('button');


  gsap.fromTo(
    section,
    { opacity: 0, y: 50, rotation: -5 }, // Added initial y offset, rotation for a more dramatic entrance
    {
      opacity: 1,
      y: 0,
      rotation: 0,
      ease: "power2.out", // Added easing for a smoother animation
      scrollTrigger: {
        trigger: section,
        start: "top 90%", // Adjusted start point for a later reveal
        end: "bottom 50%", // Adjusted end point for a longer reveal
        scrub: 1,
      },
    }
  );
  gsap.fromTo(
    section,
    { opacity: 1, x: index % 2 === 0 ? -150 : 150, scale: 0.9, rotation: 2 }, // Added scale and rotation for emphasis
    {
      opacity: 1,
      x: 0,
      scale: 1,
      rotation: 0,
      ease: "power2.out", // Added easing for a smoother animation
      scrollTrigger: {
        trigger: section,
        start: "top 90%", // Adjusted start point for a later reveal
        end: "bottom 50%", // Adjusted end point for a longer reveal
        scrub: 1,
      },
    }
  );
  gsap.to(
    section,
    {
      opacity: 0,
      y: -50,
      rotation: 5, // Added rotation for a more dramatic exit
      ease: "power2.in", // Added easing for a smoother animation
      scrollTrigger: {
        trigger: section,
        start: "bottom 0%",
        end: "+=600", // Increased fade-out duration and distance for a longer effect
        scrub: 1,
      },
    }
  );

  if (image) {
    gsap.fromTo(
      image,
      { scale: 0.8, opacity: 0, rotation: -10 },
      {
        scale: 1,
        opacity: 1,
        rotation: 0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 50%",
          scrub: 1,
        },
      }
    );
    gsap.to(
      image,
      {
        scale: 0.8,
        opacity: 0,
        rotation: 10,
        ease: "power2.in",
        scrollTrigger: {
          trigger: section,
          start: "bottom 0%",
          end: "+=600",
          scrub: 1,
        },
      }
    );
  }
  if (h2) {
    h2.addEventListener('mouseover', () => {
      gsap.to(h2, { scale: 1.1, duration: 0.2 });
    });
    h2.addEventListener('mouseout', () => {
      gsap.to(h2, { scale: 1, duration: 0.2 });
    });
  }
  if (p) {
    p.addEventListener('mouseover', () => {
      gsap.to(p, { scale: 1.1, duration: 0.2 });
    });
    p.addEventListener('mouseout', () => {
      gsap.to(p, { scale: 1, duration: 0.2 });
    });
  }
  if (button) {
    button.addEventListener('mouseover', () => {
      gsap.to(button, { scale: 1.1, duration: 0.2 });
    });
    button.addEventListener('mouseout', () => {
      gsap.to(button, { scale: 1, duration: 0.2 });
    });
  }
});
