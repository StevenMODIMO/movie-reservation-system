"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="relative h-160 w-135 overflow-hidden rounded-xl">
      <Image
        src={slides[current].src}
        alt={slides[current].alt}
        fill
        priority
        className="object-cover"
      />
    </div>
  );
}
