"use client";
import Image from "next/image";
import { useState } from "react";

const slides = [
  {
    src: "/images/avatar.webp",
    alt: "Cinema hall",
  },
  {
    src: "/images/breaking.jfif",
    alt: "Movie posters",
  },
  {
    src: "/images/break.jfif",
    alt: "Popcorn and drinks",
  },
  {
    src: "/images/dune.jfif",
    alt: "Popcorn and drinks",
  },
  {
    src: "/images/goodfellas.jfif",
    alt: "Popcorn and drinks",
  },
  {
    src: "/images/knight.jfif",
    alt: "Popcorn and drinks",
  },
  {
    src: "/images/pulp.jfif",
    alt: "Popcorn and drinks",
  },
  {
    src: "/images/silo.jfif",
    alt: "Popcorn and drinks",
  },
  {
    src: "/images/the100.jfif",
    alt: "Popcorn and drinks",
  },
  {
    src: "/images/thrones.jfif",
    alt: "Popcorn and drinks",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % slides.length);

  const previous = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="hidden lg:block lg:relative w-100 h-100 overflow-hidden rounded-xl">
      <Image
        src={slides[current].src}
        alt={slides[current].alt}
        fill
        priority
        className="object-cover"
      />

      <button
        onClick={previous}
        className="absolute left-4 top-1/2 -translate-y-1/2"
      >
        ◀
      </button>

      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2"
      >
        ▶
      </button>
    </div>
  );
}
