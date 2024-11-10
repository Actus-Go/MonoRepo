'use client';
import React, { useRef, useMemo } from 'react';
import Blocks from './Beam';

function BlockOne() {
  const containerRef = useRef(null);

  // Generate a random activeDivs pattern on each render
  const randomActiveDivs = useMemo(() => {
    const activeDivs = {};
    const numKeys = 16; // Number of keys (0-15)

    for (let i = 0; i < numKeys; i++) {
      const setSize = Math.floor(Math.random() * 3) + 1; // Random size between 1 and 3
      activeDivs[i] = new Set();

      while (activeDivs[i].size < setSize) {
        const randomNum = Math.floor(Math.random() * 16); // Random number between 0 and 15
        activeDivs[i].add(randomNum);
      }
    }
    return activeDivs;
  }, []);

  return (
    <div
      className="h-full overflow-hidden rounded-r-2xl bg-black before:absolute before:w-full before:h-full before:bg-gradient-to-t dark:before:from-[#070707] before:from-[#dbdbdb] before:z-[1] w-full relative"
      ref={containerRef}
    >
      <Blocks
        activeDivsClass="bg-[#f1ff51]/30"
        divClass="border-[#131212]"
        classname="w-full h-full"
        containerRef={containerRef}
        activeDivs={randomActiveDivs}
      />
    </div>
  );
}

export default BlockOne;