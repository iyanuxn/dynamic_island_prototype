import React, { useState, useEffect, useRef } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";

import iPhone from "./assets/iPhoneBody.png";
import Airpods from "./assets/airpods.png";
import statusBar from "./assets/statusBar.png";
import wallpaper from "./assets/wallpaper.png";
import wallpaper2 from "./assets/wallpaper.jpg";
import wallpaper3 from "./assets/wallpaper2.jpg";
import wallpaper4 from "./assets/wallpaper3.jpg";
import wallpaper5 from ".//assets/wallpaper4.jpg";
import idea from "./assets/idea.png";

import RadialProgressBar from "../src/components/radial-progress-bar";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [progress, setProgress] = useState(80);
  const [expand, setExpand] = useState(false);
  const [currentWallpaper, setCurrentWallpaper] = useState(wallpaper);

  const notchRef = useRef(null);
  const airpodsRef = useRef(null);
  const infoRef = useRef(null);
  const titleRef = useRef(null);
  const phoneContainerRef = useRef(null);
  const phoneRef = useRef(null);

  const wallpapers = [
    wallpaper,
    wallpaper2,
    wallpaper3,
    wallpaper4,
    wallpaper5,
  ];

  useEffect(() => {
    // set a random wallpaper after every reload
    const randomWallpaper =
      wallpapers[Math.floor(Math.random() * wallpapers.length)];
    setCurrentWallpaper(randomWallpaper);

    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      setTime(`${hours}:${minutes}`);

      const options = { weekday: "long", month: "long", day: "numeric" };
      const currentDate = now.toLocaleDateString(undefined, options);
      setDate(currentDate);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // on click outside collapse the notch
  const handleClickOutside = (event) => {
    if (notchRef.current && !notchRef.current.contains(event.target)) {
      setExpand(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // notch expand function
  const toggleExpand = () => {
    setExpand(!expand);
  };

  // notch animation
  useEffect(() => {
    if (expand) {
      const timeline = gsap.timeline();
      timeline
        .to(notchRef.current, {
          width: "93%",
          padding: "1rem",
          duration: 0.3,
          ease: "back.out(1.7)",
        })
        .to(airpodsRef.current, { height: "3rem", duration: 0.3 }, "-=0.2")
        .to(
          infoRef.current,
          { scale: 1, opacity: 1, duration: 0.3, ease: "power1.in" },
          "-=0.2"
        );
    } else {
      const timeline = gsap.timeline();
      timeline
        .to(infoRef.current, {
          scale: 0,
          opacity: 0,
          duration: 0.3,
        })
        .to(airpodsRef.current, { height: "1.5rem", duration: 0.3 }, "-=0.2")
        .to(
          notchRef.current,
          { width: "12rem", padding: "0.5rem", duration: 0.3 },
          "-=0.2"
        );
    }
  }, [expand]);

  // onload title animation
  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1, ease: "back.out(1.2)" }
    );
  }, []);


  // sorry excuse for scroll in animation
  useEffect(() => {
    const timeline = gsap.timeline();
    timeline
      .fromTo(
        titleRef.current,
        { y: 0, opacity: 1 },
        {
          y: 500,
          opacity: 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: phoneContainerRef.current,
            scrub: 2,
            start: "top 400",
            end: "top 100",
            toggleActions: "restart none reverse none",
          },
        }
      )
      .fromTo(
        phoneRef.current,
        {
          y: 500,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: phoneContainerRef.current,
            scrub: 1,
            start: "top center",
            end: "top top",
            toggleActions: "restart none reverse none",
          },
        }
      );
  }, []);

  return (
    <>
      {/* Desktop and desktop only abeg */}
      <div className="text-white 2xl:container 2xl:mx-auto md:flex hidden flex-col items-center">
        {/* title */}
        <div
          ref={titleRef}
          className="h-screen bg-clip-text bg-gradient-to-tr from-white via-neutral-200 to-neutral-400 flex items-center justify-center text-8xl tracking-tight font-bold text-center text-transparent"
        >
          Introducing <br />
          Apple's Dynamic Island
        </div>
        {/* prototype */}
        <div
          ref={phoneContainerRef}
          className="h-screen overflow-hidden group cursor-pointer"
        >
          <div ref={phoneRef} className="relative flex flex-col items-center">
            <div className="w-[91%] absolute mt-[9.7rem] z-20 flex flex-col items-center">
              <img src={statusBar} alt="Status bar" />
              {/* Notch */}
              <div
                ref={notchRef}
                onClick={toggleExpand}
                className="min-h-10 h-auto flex justify-between items-center w-auto min-w-48 z-50 bg-black rounded-[4rem] absolute  origin-top cursor-pointer -top-2"
              >
                <div className="flex items-end gap-3.5">
                  <img ref={airpodsRef} src={Airpods} alt="" />
                  <AnimatePresence>
                    {expand ? (
                      <div
                        ref={infoRef}
                        className="flex flex-col text-sm tracking-tighter"
                      >
                        <span className="text-white/50 font-light">
                          Connected
                        </span>
                        <span className="text-lg font-medium">
                          Iyanu's Airpods
                        </span>
                      </div>
                    ) : null}
                  </AnimatePresence>
                </div>
                <RadialProgressBar
                  progress={progress}
                  size={expand ? 54 : 26}
                  strokeWidth={expand ? 4.5 : 3}
                  color="#4EEB77"
                  hidden={!expand}
                />
              </div>
            </div>
            {/* Phone */}
            <img src={iPhone} alt="iPhone" className="w-[30rem] mt-28" />
            {/* Date and Time */}
            <div className="absolute z-10 mt-72 text-center">
              {/* Date */}
              <div className="text-white text-2xl tracking-tight font-medium mb-2">
                {date}
              </div>
              {/* Time */}
              <div className="text-white text-8xl -tracking-wide font-bold">
                {time}
              </div>
            </div>
            {/* Wallpaper */}
            <div className="w-[27.4rem] opacity-10 group-hover:opacity-100 transition-all duration-300 ease-in-out h-[59.6rem] absolute mt-[8.23rem] rounded-bl-[3.7rem] rounded-br-[3.7rem] rounded-tr-[3rem] rounded-tl-[3rem] overflow-hidden">
              <img
                src={currentWallpaper}
                alt="Wallpaper"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Mobile people can suffer */}
      <div className="flex md:hidden items-center justify-center h-screen">
        {/* dissapointment modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 10,
            ease: "easeInOut",
          }}
          className="w-80 h-fit rounded-2xl bg-gradient-to-br from-white to-neutral-400 p-1"
        >
          <div className="bg-[#101010] relative h-full w-full rounded-2xl flex flex-col items-center gap-3 p-5 text-white">
            <img src={idea} alt="" className="absolute -top-32 w-40 right-0" />
            <span className="font-semibold italic text-lg">
              Here's an idea: View it on your PC
            </span>
            <span className="text-sm text-justify">
              I can't believe you tried to view this masterpiece on your MOBILE
              PHONE! What an insult! And no, don't even think about switching to
              desktop mode on your phone—it will never do justice to the
              greatness of this site. So, put down your phone, grab your PC, and
              experience this site the way it was meant to be seen!
              <p>
                PS, there's no mobile view because the{" "}
                <a
                  className="underline font-semibold"
                  href="https://x.com/iyanusama"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  dev{" "}
                </a>{" "}
                was lazy :) Mobile lives actually matter.
              </p>
            </span>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default App;
