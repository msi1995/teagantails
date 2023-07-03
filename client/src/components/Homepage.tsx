import { Navbar } from "./Navbar";
import { useState, useEffect, useRef } from "react";
import "../index.css";
import "../animations.css";
import bg_video from "../assets/Dogslowmocompress.mp4";

const heroTextIntro: string = `Hi, I'm Teagan.`;
const heroTextBase: string = `I `;
const heroTextTypewrite: string[] = [
  "'d love to take care of all of your furry friends",
  "provide care for dogs, cats, birds, farm animals, and more",
  "am a former veterinary assistant",
  "am comfortable administering medication (injection, oral, topical)",
  "can provide basic obedience training",
  "can handle animals with difficult temperaments"
];

export const Homepage = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentSentence, setCurrentSentence] = useState("");
  const typeTimeoutRef: any = useRef<number | undefined>(undefined);

  useEffect(() => {
    const sentence = heroTextTypewrite[currentIndex];
    let displayedSentence = "";
    let delay; // Delay between each character (typing speed)
    let isDeleting = false;
    let deleteCount = 1; // Number of characters to delete at a time

    const type = () => {
      if (isDeleting) {
        displayedSentence = sentence.slice(
          0,
          displayedSentence.length - deleteCount
        );
      } else {
        displayedSentence = sentence.slice(0, displayedSentence.length + 1);
      }

      setCurrentSentence(displayedSentence);

      if (isDeleting) {
        delay = 35; // Delay between each backspace (backspacing speed)
      } else {
        delay = 60; // Delay between each character (typing speed)
      }

      if (!isDeleting && displayedSentence === sentence) {
        // Start backspacing after the sentence is fully typed
        isDeleting = true;
        delay = 1500; // Delay before backspacing starts
      } else if (isDeleting && displayedSentence === "") {
        // Move to the next sentence after backspacing is complete
        setCurrentIndex(
          (prevIndex) => (prevIndex + 1) % heroTextTypewrite.length
        );
        isDeleting = false;
        delay = 100;
      }

      typeTimeoutRef.current = setTimeout(type, delay);
    };

    type();

    return () => clearTimeout(typeTimeoutRef.current);
  }, [currentIndex]);

  const isMuted = useRef(true);

  return (
    <>
      <video
        autoPlay
        loop
        muted={isMuted.current}
        playsInline
        className="parallax-video absolute top-0 left-0 w-full h-full object-cover opacity-100"
      >
        <source src={bg_video} type="video/mp4" />
      </video>
      <div className="w-full p-0 m-0 flex flex-col min-h-screen">
        <Navbar />
        <div className="flex flex-col items-center justify-center flex-grow">
          <div className="text-center sm:mb-80">
            <h1 className="sm:text-7xl text-3xl font-bold text-white mb-4">
              {heroTextIntro}
            </h1>
            <h2 className="sm:text-3xl text-lg font-bold text-white">
              {heroTextBase + currentSentence}{" "}
              <span className="cursor visible" />
            </h2>
          </div>
        </div>
      </div>
      {/*maybe add back later <div className="relative sm:h-96 h-52 min-w-viewport bg-white ">
        <section className="hidden sm:block bg-[radial-gradient(150rem_10rem_at_top,theme(colors.fuchsia.200),white)] items-center relative isolate overflow-x-clip bg-white px-6 py-12 sm:py-22 lg:px-8 lg:py-32"></section>
      </div> */}
    </>
  );
};
