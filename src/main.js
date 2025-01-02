import "./index.css";
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

let sections = gsap.utils.toArray("section");

sections.forEach((section, index) => {
  let images = section.querySelectorAll('img');
  let h2 = section.querySelector('h2');
  let p = section.querySelector('p');
  let button = section.querySelector('button');
  let imageContainers = section.querySelectorAll('.image-container');


  gsap.fromTo(
    section,
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      ease: "power2.out",
      scrollTrigger: {
        trigger: section,
        start: "top 90%",
        end: "bottom 50%",
        scrub: 1,
      },
    }
  );
  gsap.fromTo(
    section,
    { opacity: 1, x: index % 2 === 0 ? -150 : 150, scale: 0.9 },
    {
      opacity: 1,
      x: 0,
      scale: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: section,
        start: "top 90%",
        end: "bottom 50%",
        scrub: 1,
      },
    }
  );
  gsap.to(
    section,
    {
      opacity: 0,
      y: -50,
      ease: "power2.in",
      scrollTrigger: {
        trigger: section,
        start: "bottom 0%",
        end: "+=600",
        scrub: 1,
      },
    }
  );

  images.forEach(image => {
    gsap.fromTo(
      image,
      { scale: 0.8, opacity: 0, y: 50 },
      {
        scale: 1,
        opacity: 1,
        y: 0,
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
        y: -50,
        ease: "power2.in",
        scrollTrigger: {
          trigger: section,
          start: "bottom 0%",
          end: "+=600",
          scrub: 1,
        },
      }
    );
  });
  imageContainers.forEach(container => {
    gsap.fromTo(
      container,
      { scale: 0.8, opacity: 0, y: 50 },
      {
        scale: 1,
        opacity: 1,
        y: 0,
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
      container,
      {
        scale: 0.8,
        opacity: 0,
        y: -50,
        ease: "power2.in",
        scrollTrigger: {
          trigger: section,
          start: "bottom 0%",
          end: "+=600",
          scrub: 1,
        },
      }
    );
  })
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

const $ = (query, context = document) => context.querySelector(query);
const rad = Math.PI / 180;

const canvas1 = $("#stage1");
const canvas2 = $("#stage2");
const ctx1 = canvas1.getContext("2d");
const ctx2 = canvas2.getContext("2d");
let width = window.innerWidth;
let height = window.innerHeight;
canvas1.width = width;
canvas1.height = height;
canvas2.width = width;
canvas2.height = height;

const colors = [
  ["#b8d000", "#2175d9", "#ed1b24", "#35b4d6", "#ff9900", "#e30074"],
  ["#99eeff", "#3399cc", "#5bb4cc", "#2175d9", "#00aedb", "#a200ff"],
  ["#bf0000", "#ed1b24", "#ff3232", "#e30074", "#bf0060", "#f47835"],
  ["#22C41A", "#17e88d", "#b6ff26", "#8EFF21", "#4DD712", "#0F884A"],
  ["#b51bff", "#8B0C99", "#ff1cea", "#FF1488", "#c210e8", "#ff1996"]
];

const particles1 = [];
const particles2 = [];
const totalParticles = 150;

let x = width / 2;
let y = height / 2;

window.addEventListener("resize", resize);

function createParticles(particlesArray, ctx) {
  particlesArray.length = 0;
  for (let i = 0; i < totalParticles; i++) {
    particlesArray.push({
      x,
      y,
      radius: Math.random() * 4 + 3,
      color: colors[Math.floor(Math.random() * colors.length)][
        Math.floor(Math.random() * 6)
      ],
      angle: Math.random() * 360 * rad,
      velocity: Math.random() * 4 + 2,
      gravity: Math.random() * 0.4 + 0.2,
      alpha: 1
    });
  }
}

function createExplosion(particlesArray, ctx) {
  createParticles(particlesArray, ctx);

  particlesArray.forEach((particle) => {
    const duration = Math.random() * 4 + 3;
    const distance = particle.velocity * 200;

    const endX = particle.x + Math.cos(particle.angle) * distance;
    const endY = particle.y + Math.sin(particle.angle) * distance;

    gsap.to(particle, {
      x: endX,
      y: endY,
      alpha: 0,
      duration,
      ease: "power4.out",
      onUpdate: () => render(particlesArray, ctx)
    });
  });
}

function render(particlesArray, ctx) {
  ctx.clearRect(0, 0, width, height);
  particlesArray.forEach((particle) => {
    if (particle.alpha > 0) {
      ctx.globalAlpha = particle.alpha;
      ctx.fillStyle = particle.color;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  });
}

function resize() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas1.width = width;
  canvas1.height = height;
  canvas2.width = width;
  canvas2.height = height;
  x = width / 2;
  y = height / 2;
}

const svg = document.querySelector('.features svg');
gsap.to(svg, {
  yoyo: true,
  repeat: -1,
  duration: 0.7,
  y: 40,
  ease: "power1.inOut"
});

window.addEventListener('DOMContentLoaded', () => {
  createExplosion(particles1, ctx1);
  const button = document.querySelector('.cta button');
  button.addEventListener('click', () => createExplosion(particles2, ctx2));
})
