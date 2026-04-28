import React from 'react';
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

// Split the array into columns
function chunk(array, columns) {
  const chunks = Array.from({ length: columns }, () => []);
  array.forEach((item, index) => {
    chunks[index % columns].push(item);
  });
  return chunks;
}

export function ThreeDMarquee({ images, className }) {
  const columns = chunk(images, 4);
  const extendedColumns = [...columns, ...columns, ...columns];

  return (
    <div
      className={cn(
        "relative flex h-[600px] md:h-[800px] w-full flex-row items-center justify-center gap-4 overflow-hidden [perspective:1000px]",
        className
      )}
      style={{
        maskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)"
      }}
    >
      <div className="flex h-full w-[200vw] md:w-[150vw] flex-row items-start justify-center gap-4 [transform:scale(1.5)_rotateX(20deg)_rotateZ(-20deg)_skewY(8deg)] md:[transform:scale(1)_rotateX(20deg)_rotateZ(-20deg)_skewY(8deg)]">
        {extendedColumns.map((col, idx) => (
          <div
            key={idx}
            className="flex flex-col gap-4 shrink-0"
          >
            <motion.div
              animate={{
                y: idx % 2 === 0 ? ["0%", "-50%"] : ["-50%", "0%"],
              }}
              transition={{
                repeat: Infinity,
                ease: "linear",
                duration: 25 + idx * 5,
              }}
              className="flex flex-col gap-4 w-32 md:w-48"
            >
              {[...col, ...col, ...col].map((img, index) => (
                <div
                  key={index}
                  className="relative h-48 md:h-64 w-full shrink-0 overflow-hidden rounded-xl bg-neutral-900 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10"
                >
                  <img
                    src={img}
                    alt={`marquee-${idx}-${index}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}
