import React from 'react';
import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from "motion/react"

const transition = {
    duration: 4,
    repeat: Infinity,
    repeatType: "reverse",
    ease: "easeInOut",
}

const PATH =
"M 1190.73 310.28 L 1338.45 484.76 L 2071.73 1506.96"

const PATH_2 =
"M -416.68 719.93 C -297.06 685.85 572.55 629.03 431.98 318.88 C 391.97 230.61 54.78 202.9 157.89 490.62 C 215.99 652.72 980.13 349.43 1127.42 277.97"


function Mountain({ windowWidth }) {
  return (
    <div className="relative">
        <Flag />
      <div
        className="
          relative
          top-[250px]
          right-[60vw]
          w-[170vw]
        ">
        <div>
          <img
            src="/mountain.svg"
            alt="Mountain"
            className="
              w-full
              h-auto
              max-w-none
              max-h-none
              rotate-[-15deg]
              z-[1]
            "
            draggable={false}
          />
          <HunkyDory windowWidth={windowWidth}/>
        </div>
      </div>
    </div>
  );
}


function Flag() {
    return (
        <div
            className="
                absolute
                top-[250px]
                left-[1vw]
                w-[20vw]
                z-[2]
                rotate-[-35deg]
                flex
                items-center
                justify-center
            "
        >
            <img
                src="/flag.svg"
                alt="Flag"
                className="w-full h-auto block"
                draggable="false"
                style={{ display: 'block' }}
            />
            <span
                className="
                    absolute
                    inset-0
                    flex
                    items-center
                    justify-center
                    text-[2.2vw] font-bold
                    top-[-5vw]
                    left-[3vw]
                    text-black
                    select-none
                    rotate-[15deg]
                    pointer-events-none
                "
                style={{
                  fontFamily: 'Bohemian Typewriter',
                  letterSpacing: '0.07em',
                }}
            >
                about
            </span>
        </div>
    );
}


function HunkyDory({ windowWidth }) {

    const container = useRef(null);
    const { scrollY } = useScroll({
        target: container,
        offset: ["start end", "end start"]
    });

    const threshold = windowWidth * 0.1;
    const speed = 0.8
    console.log("Threshold", threshold)

    const translateY = useTransform(
        scrollY, 
        [0, threshold, threshold + windowWidth / 6], 
        [0, threshold, threshold + windowWidth * 0.06]
    );

    const rotate = useTransform(scrollY, [threshold, threshold + windowWidth / 6], [-54, -15]);
    const startOffset = useTransform(
        scrollY, 
        [threshold, threshold + windowWidth / 6, threshold + speed * windowWidth], 
        ["40%", "30%", "110%"]
    );

    return (
      <motion.div
        ref={container}
        style={{ y: translateY, rotate }}
        className="
          absolute top-[-17%] left-[0%] w-[100%] h-auto z-[2]
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2091 1533"
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            d={PATH}
            id="hunkyPath"
            fill="transparent"
            strokeWidth="12"
            strokeLinecap="round"
          />
          <motion.text
            className="text-[6em] fill-black"
            style={{ fontFamily: "Bohemian Typewriter", letterSpacing: "0.05em" }}
            dominantBaseline="central"
            textAnchor="middle"
          >
            <motion.textPath href="#hunkyPath" style={{ startOffset }}>
              Hunky Dory
            </motion.textPath>
          </motion.text>
        </svg>
      </motion.div>
    );
  }

function Article({ windowWidth }) {
  return (
    <div className="relative top-[120px] sm:top-[0px]
    lg:top-[-170px] xl:top-[-250px] w-full h-[5000px] bg-[#48A75C] [overflow-x:clip]">
      <div className="h-[70vw] md:h-[0]"></div>
      <BoxHunkyDory windowWidth={windowWidth} />
    </div>
  )
}


function BoxHunkyDory({ windowWidth }) {
  const container = useRef(null);
  const { scrollY } = useScroll({
      target: container,
      offset: ["start end", "end start"]
  });

  useEffect(() => {
      scrollY.on('change', e => console.log(e))
  }, [])

  const threshold = windowWidth;
  const speed = 1.5


  const startOffset = useTransform(
      scrollY, 
      [threshold, threshold + speed * windowWidth], 
      ["110%", "-10%"]
  );

  return (
    <div
      ref={container}
      className="sticky top-[0] w-full h-[50vw]"
    >
      <motion.div
        className="absolute top-[-20vw] md:top-[-10vw] w-[250%]
        md:w-[200%] left-[-95%] md:left-[-67%] h-auto z-[3]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="-1000 0 2200 1100"
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            d={PATH_2}
            id="hunkyPath2"
            fill="transparent"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <motion.text
            className="text-[6em] fill-black"
            style={{ fontFamily: "Bohemian Typewriter", letterSpacing: "0.05em" }}
            dominantBaseline="central"
            textAnchor="middle"
          >
            <motion.textPath href="#hunkyPath2" startOffset={startOffset}>
              Hunky Dory
            </motion.textPath>
          </motion.text>
        </svg>
      </motion.div>
      <HdBox />
    </div>
  );
}


function HdBox() {
  return (
    <div className="absolute top-[50%] left-1/2 -translate-x-1/2
    -translate-y-1/2 w-[20vw] h-[20vw] md:w-[15vw] md:h-[15vw] bg-red-500 z-[2]">
    </div>
  )
}


export default function Home() {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        function handleResize() {
            setWindowWidth(window.innerWidth);
        }
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    
    return (
        <div className="relative w-screen min-h-screen bg-[#bedbff]">
          <div className="[overflow-x:clip]">
            <Mountain windowWidth={windowWidth}/>
          </div>
            <Article windowWidth={windowWidth}/>
        </div>
    );
}
