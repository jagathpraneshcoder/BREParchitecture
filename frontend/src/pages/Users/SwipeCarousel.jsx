import React, { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

// Carousel images with names
const imgs = [
  { src: "/horizontal/icon1.png", name: "Brep Residence" },
  { src: "/horizontal/icon2.png", name: "Eswara Moorthy Residence" },
  { src: "/horizontal/icon3.png", name: "Ranjith Residence" },
  { src: "/horizontal/icon4.png", name: "Residence" },
];

const ONE_SECOND = 1000;
const AUTO_DELAY = ONE_SECOND * 5;
const DRAG_BUFFER = 50;

const SPRING_OPTIONS = {
  type: "spring",
  mass: 3,
  stiffness: 400,
  damping: 50,
};

export const SwipeCarousel = () => {
  const [imgIndex, setImgIndex] = useState(0);
  const dragX = useMotionValue(0);

  // Auto slide
  useEffect(() => {
    const intervalRef = setInterval(() => {
      const x = dragX.get();
      if (x === 0) {
        setImgIndex((pv) => (pv === imgs.length - 1 ? 0 : pv + 1));
      }
    }, AUTO_DELAY);
    return () => clearInterval(intervalRef);
  }, []);

  // Drag end handler
  const onDragEnd = () => {
    const x = dragX.get();
    if (x <= -DRAG_BUFFER && imgIndex < imgs.length - 1) setImgIndex((pv) => pv + 1);
    else if (x >= DRAG_BUFFER && imgIndex > 0) setImgIndex((pv) => pv - 1);
  };

  // Arrow navigation
  const prevImage = () => setImgIndex((pv) => (pv === 0 ? imgs.length - 1 : pv - 1));
  const nextImage = () => setImgIndex((pv) => (pv === imgs.length - 1 ? 0 : pv + 1));

  return (
    <div className="relative">
      {/* Fixed Full-Screen Carousel */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          style={{ x: dragX }}
          animate={{ translateX: `-${imgIndex * 100}%` }}
          transition={SPRING_OPTIONS}
          onDragEnd={onDragEnd}
          className="flex h-full w-full cursor-grab items-center active:cursor-grabbing"
        >
          <Images imgIndex={imgIndex} />
        </motion.div>

        {/* Left & Right Arrows */}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white text-4xl font-bold select-none"
        >
          &#10094;
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white text-4xl font-bold select-none"
        >
          &#10095;
        </button>

        {/* Centered Image Name */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <span className="text-white text-3xl font-bold bg-black/40 px-6 py-3 rounded">
            {imgs[imgIndex].name}
          </span>
        </div>

        {/* Optional Dots */}
        <Dots imgIndex={imgIndex} setImgIndex={setImgIndex} />
        {/* Optional Gradient Edges */}
        <GradientEdges />
      </div>

      {/* Transparent Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-20 px-4 py-3">
        <h1 className="text-white text-xl font-bold">My Navbar</h1>
      </nav>
    </div>
  );
};

// Carousel Images
const Images = ({ imgIndex }) => {
  return (
    <>
      {imgs.map((img, idx) => (
        <motion.div
          key={idx}
          style={{
            backgroundImage: `url(${img.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100vh",
            width: "100vw",
          }}
          animate={{ scale: imgIndex === idx ? 1 : 0.95 }}
          transition={SPRING_OPTIONS}
          className="shrink-0"
        />
      ))}
    </>
  );
};

// Dots
const Dots = ({ imgIndex, setImgIndex }) => (
  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
    {imgs.map((_, idx) => (
      <button
        key={idx}
        onClick={() => setImgIndex(idx)}
        className={`h-2 w-2 sm:h-3 sm:w-3 rounded-full transition-colors ${
          idx === imgIndex ? "bg-white" : "bg-neutral-500"
        }`}
      />
    ))}
  </div>
);

// Gradient Edges
const GradientEdges = () => (
  <>
    <div className="pointer-events-none absolute bottom-0 left-0 top-0 w-[10vw] max-w-[100px] bg-gradient-to-r from-black/50 to-black/0 z-0" />
    <div className="pointer-events-none absolute bottom-0 right-0 top-0 w-[10vw] max-w-[100px] bg-gradient-to-l from-black/50 to-black/0 z-0" />
  </>
);
