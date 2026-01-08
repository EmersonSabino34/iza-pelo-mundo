"use client";

import React, { useEffect, useState } from "react";

type SliderProps = {
  images: string[];
  auto?: boolean;
  interval?: number;
  altPrefix?: string;
  captions?: { pt?: string; en?: string }[];
  lang?: "pt" | "en";
};

export default function Slider({ images, auto = true, interval = 4000, altPrefix = "slide", captions, lang }: SliderProps) {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    if (!auto || images.length <= 1) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % images.length), interval);
    return () => clearInterval(t);
  }, [auto, images.length, interval]);

  useEffect(() => {
    setFade(true);
    const t = setTimeout(() => setFade(false), 500);
    return () => clearTimeout(t);
  }, [index]);

  function prev() {
    setIndex((i) => (i - 1 + images.length) % images.length);
  }

  function next() {
    setIndex((i) => (i + 1) % images.length);
  }

  if (!images || images.length === 0) return null;

  return (
    <div className="relative w-full">
      <div className="overflow-hidden rounded-md">
        <img
          src={images[index]}
          alt={`${altPrefix} ${index + 1}`}
          className={`w-full h-64 object-cover transition-opacity duration-500 ${fade ? "opacity-50" : "opacity-100"}`}
        />
        
        {captions && captions[index] && (
          <div className="absolute left-0 right-0 bottom-0 bg-black/50 text-white text-sm p-2 text-center">
            {captions[index][lang || "pt"] || ""}
          </div>
        )}
        
      </div>
      <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 p-2 rounded-full">
        ‹
      </button>
      <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 p-2 rounded-full">
        ›
      </button>
      <div className="absolute left-1/2 -translate-x-1/2 bottom-2 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-2 h-2 rounded-full ${i === index ? "bg-white" : "bg-white/40"}`}
          />
        ))}
      </div>
    </div>
  );
}
