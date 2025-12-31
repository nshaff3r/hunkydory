import React from 'react';
import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from "motion/react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesDown } from '@fortawesome/free-solid-svg-icons';

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


function Mountain({ windowWidth, setAbout, bounce }) {
  return (
    <div className="relative">
        <Flag setAbout={setAbout} bounce={bounce}/>
      <div
        className="
          relative
          top-[50vw] md:top-[15vw] lg:top-[10vw] xl:top-[8vw]
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


function Flag({ setAbout, bounce }) {

    return (
        <div>
            <style>{`
                @keyframes bounce-click {
                    0%, 100% { transform: translateY(0) rotate(-35deg); }
                    50% { transform: translateY(-3vw) rotate(-35deg); }
                }
                .animate-bounce-click {
                    animation: bounce-click 0.7s ease-in-out;
                }
            `}</style>
            <div
                onClick={() => setAbout(true)}
                className={`
                    absolute
                    top-[50vw] md:top-[15vw] lg:top-[10vw] xl:top-[7vw]
                    left-[1vw]
                    w-[20vw]
                    z-[2]
                    rotate-[-35deg]
                    hover:rotate-[-25deg]
                    transition-transform
                    duration-300
                    flex
                    items-center
                    justify-center
                    cursor-pointer
                    ${bounce ? 'animate-bounce-click' : ''}
                `}
                style={{ cursor: "url('/fish.png'), auto" }}
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
          pointer-events-none selection-none
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
    <div className="relative top-[20vw]
    md:top-[-15vw] lg:top-[-20vw] xl:top-[-25vw]
    mb-[3vw] md:mb-[-15vw] lg:mb-[-20vw] xl:mb-[-25vw]
    w-full h-[450vw] md:h-[320vw] bg-[#48A75C] [overflow-x:clip]">
      <div className="h-[70vw] sm:h-[0]"></div>
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
      className="sticky top-[30%] sm:top-[10%] md:top-[0] w-full h-[50vw]"
    >
      <motion.div
        className="absolute top-[-20vw] md:top-[-11vw] w-[250%]
        md:w-[200%] left-[-96%] md:left-[-67%] h-auto z-[3]
        pointer-events-none selection-none"
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
      <HdBox scrollY={scrollY} windowWidth={windowWidth}/>
    </div>
  );
}


function HdBox({ scrollY, windowWidth }) {

  const threshold = windowWidth * 2.3;
  const speed = 0.4;
  const [isClickable, setIsClickable] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (value) => {
      setIsClickable(value > threshold + speed * 2 * windowWidth);
    });
    return () => unsubscribe();
  }, [scrollY, windowWidth]);

  const side_size = useTransform(
      scrollY, 
      [threshold, threshold + speed * windowWidth], 
      [windowWidth > 700 ? "10vw": "20vw", windowWidth > 700 ? "20vw": "35vw"]
  );

  const font_size = useTransform(
    scrollY, 
    [threshold, threshold + speed * 2 * windowWidth], 
    ["5vw", "10vw"]
);

  const opacity_scroll = useTransform(
    scrollY, 
    [threshold, threshold + speed * 2 *windowWidth], 
    ["1", "0"]
  )

  return (
    <div className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-[2]">
      <motion.div 
        style={{ 
            height: side_size,
            width: side_size,
        }}
        whileHover={isClickable ? { y: -15 } : undefined}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <a 
          href="/hdv1.pdf" 
          className={`block w-full h-full ${!isClickable ? 'pointer-events-none' : ''}`}
          style={isClickable ? { cursor: "url('/fish.png'), auto" } : undefined}
        >
        <div 
          className="bg-[#bedbff] rounded-xl shadow-inner relative w-full h-full"
          style={{ 
              boxShadow: "inset 0 0 5px 1px rgba(14, 17, 32, 0.35)",
          }}
        >
          <motion.div
            className="absolute inset-0 flex items-center
            justify-center rounded-xl pointer-events-none bg-[#bedbff]"
            style={{
              fontFamily: 'Bohemian Typewriter',
              fontSize: font_size,
              opacity: opacity_scroll,
            }}
          >
            <img src="/vol1.png" alt="vol1 link"/>
          </motion.div>
          <img src="/hdv1-thumbnail.png" alt="vol1 thumbnail"
          className="w-full h-full rounded-xl object-cover"/>
        </div>
      </a>
      </motion.div>
    </div>
  )
}


function Footer() {
  return (
    <div className="relative bg-[#51372C] w-full h-[17vw]
    md:h-[15vw] lg:h-[10vw] z-[2]">
      
      <p className="text-[#72564a] absolute
      bottom-[1vw] right-[1.5vw] text-[3vw] md:text-[2.5vw]
      lg:text-[1.7vw] text-right leading-relaxed mb-[1vw] md:mb-[0]
      font-['Helvetica','Arial',sans-serif]">
          <a style={{ cursor: "url('/fish.png'), auto" }}
          className="underline"
          href="mailto:hello@hunkydory.world">hello@hunkydory.world</a>
        <br />
        Website by{' '}
        <a href="https://github.com/nshaff3r" className="underline"
        style={{ fontFamily: "Helvetica, Arial, sans-serif",
          cursor: "url('/fish.png'), auto"
         }}>
          Nolan Shaffer
        </a>
      </p>
    </div>
  )
}

function Trees() {
  const treeCount = 1;
  return (
    <div className="absolute bottom-[14vw] md:bottom-[13vw]
    lg:bottom-[8vw] left-[5vw] lg:left-[10vw] w-full z-[5] flex 
    [overflow-x:clip] ">
      {[...Array(treeCount)].map((_, i) => (
        <img 
          key={i}
          src="/tree.svg" 
          alt="tree"
          className="w-[12vw] z-[5] flex-shrink-0 ml-[0px]"
          draggable={false}
          style={{ pointerEvents: "auto" }}
        />
      ))}
    </div>
  )
}

function About({ trigger, onAnimationEnd }) {
  return (
    <div>
      <style>{`
        @keyframes slide-across {
          0% { right: -100%; }
          30% { right: 0%; }
          70% { right: 0%; }
          100% { right: 100%; }
        }
      `}</style>
      <img 
        className="absolute top-[25vw] md:top-[5vw] w-full z-[10]"
        style={{
          right: '-100%',
          animation: trigger ? 'slide-across 10s ease-in-out forwards' : 'none',
        }}
        onAnimationEnd={onAnimationEnd}
        src="/about.svg" 
        alt="about" 
      />
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

    const [about, setAbout] = useState(false);
    
    return (
        <div className="relative w-screen min-h-screen bg-[#bedbff]
        [overflow-x:clip]"
        style={{ cursor: "url('/fish2.png'), auto" }}>
          <style>{`
            @keyframes upDown {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-10px); }
            }
            ::selection {
              background: #48A75C;
              color: #bedbff;
            }
          `}</style>
          <div className="absolute left-0 top-[90vh] xl:top-[85vh]
          w-screen flex justify-center z-[10]">
            <FontAwesomeIcon
              icon={faAnglesDown}
              className="text-black text-[7vw]"
              style={{ animation: "upDown 1.5s ease-in-out infinite" }}
            />
          </div>
            <Mountain windowWidth={windowWidth} setAbout={setAbout} bounce={about}/>
            <About trigger={about} onAnimationEnd={() => setAbout(false)}/>
            <Article windowWidth={windowWidth}/>
            <Trees />
            <Footer />
        </div>
    );
}
